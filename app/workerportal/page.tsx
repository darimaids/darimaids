"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// icons
import {
  Calendar,
  Clock,
  MapPin,
  User,
  CheckCircle,
  XCircle,
  PlayCircle,
  AlertTriangle,
  FileText,
  CreditCard,
  Users,
  Home,
  Check,
} from "lucide-react";

// api
import { viewProfile } from "@/services/auth/authentication";
import {
  getAllAssignedBookings,
  acceptorrejectBooking,
  viewBookingInfo,
  updateBookingStatus,
} from "@/services/worker/workersFeed";
import { Spinner } from "@/components/ui/spinner";

const WorkersPage = () => {
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  console.log("selectedBooking: ", selectedBooking);
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [actionType, setActionType] = useState<
    "accept" | "reject" | "complete" | null
  >(null);

  const queryClient = useQueryClient();

  // Get worker profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ["viewProfile"],
    queryFn: viewProfile,
  });

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["assignedBookings"],
    queryFn: getAllAssignedBookings,
  });
  // console.log("bookingsData: ", bookingsData);

  const acceptRejectMutation = useMutation({
    mutationFn: acceptorrejectBooking,
    onSuccess: (data) => {
      toast.success(
        `Booking ${
          actionType === "accept" ? "accepted" : "rejected"
        } successfully!`
      );
      queryClient.invalidateQueries({ queryKey: ["assignedBookings"] });
      setActionDialogOpen(false);
      setActionType(null);
    },
    onError: (error: any) => {
      toast.error(`Failed to ${actionType} booking: ${error.message}`);
    },
  });

  // Mutation for updating booking status
  const updateStatusMutation = useMutation({
    mutationFn: updateBookingStatus,
    onSuccess: (data) => {
      toast.success("Booking marked as completed!");
      queryClient.invalidateQueries({ queryKey: ["assignedBookings"] });
      setDetailsDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(`Failed to update booking: ${error.message}`);
    },
  });

  // Handle viewing booking details
  const handleViewBooking = async (assignment: any) => {
    setSelectedBooking(assignment);
    try {
      const bookingInfo = await viewBookingInfo(assignment.bookingId._id);
      if (bookingInfo?.success) {
        setBookingDetails(bookingInfo.data);
        setDetailsDialogOpen(true);
      }
    } catch (error) {
      toast.error("Failed to load booking details");
    }
  };

  // Handle accept/reject actions
  const handleBookingAction = (assignment: any, type: "accept" | "reject") => {
    setSelectedBooking(assignment);
    setActionType(type);
    setActionDialogOpen(true);
  };

  // Handle complete booking
  const handleCompleteBooking = (assignment: any) => {
    setSelectedBooking(assignment);
    setActionType("complete");
    setActionDialogOpen(true);
  };

  // Confirm action
  const confirmAction = () => {
    if (!selectedBooking || !actionType) return;

    if (actionType === "complete") {
      updateStatusMutation.mutate(selectedBooking.bookingId._id);
    } else {
      acceptRejectMutation.mutate(selectedBooking?.bookingId?._id);
    }
  };

  // Get status badge variant and text
  const getStatusInfo = (assignment: any) => {
    if (assignment.status === "completed") {
      return {
        variant: "default" as const,
        text: "Completed",
        color: "text-green-600",
        bgColor: "bg-green-100 dark:bg-green-900",
      };
    }
    if (assignment.isAccepted) {
      return {
        variant: "default" as const,
        text: "Accepted",
        color: "text-blue-600",
        bgColor: "bg-blue-100 dark:bg-blue-900",
      };
    }
    if (assignment.status === "pending") {
      return {
        variant: "secondary" as const,
        text: "Pending",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100 dark:bg-yellow-900",
      };
    }
    if (assignment.status === "rejected") {
      return {
        variant: "destructive" as const,
        text: "Rejected",
        color: "text-red-600",
        bgColor: "bg-red-100 dark:bg-red-900",
      };
    }
    return {
      variant: "secondary" as const,
      text: "Pending",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100 dark:bg-yellow-900",
    };
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Skeleton loader for bookings
  const BookingSkeleton = () => (
    <Card className="bg-[#F9FAFB] dark:bg-[#121212] rounded-lg shadow-sm p-5 space-y-3">
      <Skeleton className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700" />
      </div>
    </Card>
  );

  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-bold text-2xl mb-2">
          Welcome,{" "}
          {profileLoading ? "..." : profileData?.data?.fullName || "Worker"}!
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your assigned cleaning bookings and provide excellent service.
        </p>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Assigned Bookings</h2>
          <Button
            variant="outline"
            onClick={() => refetchBookings()}
            disabled={bookingsLoading}
            className="cursor-pointer"
          >
            Refresh
          </Button>
        </div>

        {bookingsLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <BookingSkeleton key={i} />
              ))}
          </div>
        ) : bookingsError ? (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <AlertTriangle className="mx-auto text-red-500 mb-3" size={40} />
            <p className="text-red-600 dark:text-red-400 mb-3 font-medium">
              Failed to load bookings
            </p>
            <Button onClick={() => refetchBookings()}>Try Again</Button>
          </div>
        ) : bookingsData?.data?.length ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookingsData.data.map((assignment: any) => {
              const statusInfo = getStatusInfo(assignment);
              return (
                <Card
                  key={assignment._id}
                  className="bg-[#F9FAFB] dark:bg-[#121212] hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700"
                >
                  <CardContent className="p-5 space-y-4">
                    {/* Header with Status */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <Badge
                          variant={statusInfo.variant}
                          className="text-xs w-fit"
                        >
                          {statusInfo.text}
                        </Badge>
                        {/* {assignment.isAccepted &&
                          statusInfo.text !== "Completed" && (
                            <Badge
                              variant="outline"
                              className="text-xs w-fit bg-green-50 text-green-700 border-green-200 dark:bg-green-900 dark:text-green-300 dark:border-green-700"
                            >
                              <Check size={12} className="mr-1" />
                              Accepted
                            </Badge>
                          )} */}
                      </div>
                      <span className="text-xs text-gray-500">
                        {formatDate(assignment.createdAt)}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span className="truncate">
                          {assignment.bookingId.address}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <User size={16} />
                        <span>Assigned to you</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CreditCard size={16} />
                        <span>
                          Payment: {assignment.isPaid ? "Paid" : "Pending"}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => handleViewBooking(assignment)}
                      >
                        <FileText size={14} className="mr-1" />
                        View Details
                      </Button>

                      {!assignment.isAccepted &&
                        assignment.status === "pending" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              className="flex-1 text-xs bg-green-600 hover:bg-green-700"
                              onClick={() =>
                                handleBookingAction(assignment, "accept")
                              }
                              disabled={acceptRejectMutation.isPending}
                            >
                              <CheckCircle size={14} className="mr-1" />
                              Accept
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="flex-1 text-xs"
                              onClick={() =>
                                handleBookingAction(assignment, "reject")
                              }
                              disabled={acceptRejectMutation.isPending}
                            >
                              <XCircle size={14} className="mr-1" />
                              Reject
                            </Button>
                          </div>
                        )}

                      {assignment.isAccepted &&
                        assignment.status !== "completed" && (
                          <Button
                            size="sm"
                            className="w-full text-xs bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleCompleteBooking(assignment)}
                            disabled={updateStatusMutation.isPending}
                          >
                            <PlayCircle size={14} className="mr-1" />
                            Mark as Completed
                          </Button>
                        )}

                      {assignment.status === "completed" && (
                        <div className="text-center py-2">
                          <Badge
                            variant="default"
                            className="text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          >
                            <Check size={12} className="mr-1" />
                            Service Completed
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-lg">
            <Home className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
              No assigned bookings
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm">
              New cleaning assignments will appear here
            </p>
          </div>
        )}
      </div>

      {/* Booking Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="sm:max-w-[550px] dark:bg-[#121212] dark:text-gray-100 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText size={20} />
              Booking Details
            </DialogTitle>
            <DialogDescription>
              Complete information about the cleaning assignment
            </DialogDescription>
          </DialogHeader>

          {bookingDetails ? (
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                    <Home size={16} />
                    Service Information
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Type:</span>
                      <span className="font-medium">
                        {bookingDetails.serviceType}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-medium">
                        {bookingDetails.services}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cleaners:</span>
                      <span className="font-medium">
                        {bookingDetails.cleaners}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                    <Calendar size={16} />
                    Schedule
                  </h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">
                        {new Date(bookingDetails.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium">{bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">
                        {bookingDetails.duration}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-2">
                <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                  <MapPin size={16} />
                  Address
                </h3>
                <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  {bookingDetails.address}
                </p>
              </div>

              {/* Payment */}
              <div className="space-y-2">
                <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                  <CreditCard size={16} />
                  Payment
                </h3>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Charge:</span>
                    <span className="font-medium text-green-600">
                      ${bookingDetails.charge}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Payment Status:</span>
                    <Badge
                      variant={bookingDetails.isPaid ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {bookingDetails.isPaid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {bookingDetails.specialInstructions && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD]">
                    Special Instructions
                  </h3>
                  <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {bookingDetails.specialInstructions}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              <Skeleton className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <AlertDialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
        <AlertDialogContent className="dark:bg-[#121212] dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle
                size={20}
                className={
                  actionType === "accept"
                    ? "text-green-600"
                    : actionType === "reject"
                    ? "text-red-600"
                    : "text-blue-600"
                }
              />
              {actionType === "accept" && "Accept Booking"}
              {actionType === "reject" && "Reject Booking"}
              {actionType === "complete" && "Complete Booking"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              {actionType === "accept" &&
                "Are you sure you want to accept this booking? This will confirm your availability for the cleaning service."}
              {actionType === "reject" &&
                "Are you sure you want to reject this booking? This action cannot be undone and the booking will be assigned to another cleaner."}
              {actionType === "complete" &&
                "Mark this booking as completed? Please ensure all cleaning tasks have been finished before confirming."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setActionDialogOpen(false);
                setActionType(null);
              }}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={
                acceptRejectMutation.isPending || updateStatusMutation.isPending
              }
              className={
                actionType === "accept"
                  ? "bg-green-600 hover:bg-green-700"
                  : actionType === "reject"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }
            >
              {acceptRejectMutation.isPending ||
              updateStatusMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <Spinner />
                </div>
              ) : (
                <>
                  {actionType === "accept" && "Accept Booking"}
                  {actionType === "reject" && "Reject Booking"}
                  {actionType === "complete" && "Complete Booking"}
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WorkersPage;
