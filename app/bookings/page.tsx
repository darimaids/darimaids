"use client";

import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// components
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

// icons
import {
  AlertTriangle,
  Trash2,
  RefreshCcw,
  Calendar,
  Clock,
  MapPin,
  Users,
  CreditCard,
  FileText,
} from "lucide-react";

// api
import {
  getBookings,
  getPendingBookings,
  getBookingInfo,
  deleteBooking,
} from "@/services/booking/customerBooking";
import { Spinner } from "@/components/ui/spinner";

const BookingsPage = () => {
  const queryClient = useQueryClient();
  const [email, setEmail] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState<string | null>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    // console.log("savedEmail: ", savedEmail);
    setEmail(savedEmail);
  }, []);

  // console.log("Email in BookingsPage: ", email);

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["bookings", email],
    queryFn: () => getBookings(email!),
    enabled: !!email,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
    refetch: refetchPending,
  } = useQuery({
    queryKey: ["pendingBookings", email],
    queryFn: () => getPendingBookings(email!),
    enabled: !!email,
    retry: 1,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: 1000 * 60 * 5,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Failed to delete booking.");
      setDeleteDialogOpen(false);
      setBookingToDelete(null);
    },
  });

  const handleViewBooking = async (bookingId: string) => {
    try {
      const res = await getBookingInfo(bookingId);
      if (res?.success) {
        setSelectedBooking(res.data);
        setDialogOpen(true);
      }
    } catch {
      toast.error("Failed to load booking details.");
    }
  };

  const handleDeleteBooking = (bookingId: string) => {
    setBookingToDelete(bookingId);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (bookingToDelete) {
      deleteMutation.mutate(bookingToDelete);
    }
  };

  const formatServiceType = (serviceType: string) => {
    return serviceType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatServices = (services: string) => {
    return services
      .split("-")
      .map((word) =>
        word === "bed"
          ? "Bed"
          : word === "bath"
          ? "Bath"
          : word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ");
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "successful":
        return "default";
      case "pending":
        return "secondary";
      case "completed":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "Not set";
    return time.split(":").slice(0, 2).join(":");
  };

  const SkeletonCard = () => (
    <Card className="bg-[#F9FAFB] dark:bg-[#121212] rounded-lg shadow-sm p-5 space-y-3">
      <Skeleton className="h-5 w-1/2 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
      <Skeleton className="h-4 w-1/4 bg-gray-300 dark:bg-gray-700" />
    </Card>
  );

  const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertTriangle className="text-red-500 mb-3" size={40} />
      <p className="text-red-600 dark:text-red-400 mb-3 font-medium">
        Something went wrong while loading bookings.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2 bg-[#6A4AAD] text-white px-4 py-2 rounded-md hover:bg-[#5b3a9a] transition"
      >
        <RefreshCcw size={16} /> Retry
      </button>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6 text-center sm:text-left">
        Your Bookings
      </h1>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="flex gap-2 mb-6 bg-gray-100 dark:bg-[#1a1a1a] rounded-lg p-1">
          <TabsTrigger
            value="active"
            className="flex-1 py-2 text-center data-[state=active]:bg-[#6A4AAD] data-[state=active]:text-white rounded-md transition"
          >
            Active Bookings
          </TabsTrigger>
          <TabsTrigger
            value="pending"
            className="flex-1 py-2 text-center data-[state=active]:bg-[#6A4AAD] data-[state=active]:text-white rounded-md transition"
          >
            Pending Bookings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {bookingsLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : bookingsError ? (
            <ErrorState onRetry={refetchBookings} />
          ) : bookingsData?.data?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookingsData.data.map((booking: any) => (
                <Card
                  key={booking._id}
                  className="bg-[#F9FAFB] dark:bg-[#121212] hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => handleViewBooking(booking._id)}
                >
                  <CardContent className=" py-3 space-y-3">
                    <div className="flex justify-between items-start">
                      <h2 className="font-semibold text-lg text-[#6A4AAD]">
                        {formatServiceType(booking.serviceType)}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBooking(booking._id);
                        }}
                        className=" text-red-500 hover:text-red-700 transition-colors p-1 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={16} />
                        <span>{formatServices(booking.services)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{formatTime(booking.time)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span className="truncate">{booking.address}</span>
                      </div>

                      <Badge
                        variant={getStatusVariant(booking.status)}
                        className="text-xs"
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm">
                        {/* <CreditCard size={16} className="text-green-600" /> */}
                        <span className="font-semibold text-lg">
                          ${booking.charge}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.cleaners} cleaner
                        {booking.cleaners > 1 ? "s" : ""}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No active bookings found
              </p>
              <p className="text-gray-400 text-sm">
                Your confirmed bookings will appear here
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="pending">
          {pendingLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
            </div>
          ) : pendingError ? (
            <ErrorState onRetry={refetchPending} />
          ) : pendingData?.data?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingData.data.map((booking: any) => (
                <Card
                  key={booking._id}
                  className="bg-[#F9FAFB] dark:bg-[#121212] hover:shadow-lg transition cursor-pointer border border-gray-200 dark:border-gray-700"
                  onClick={() => handleViewBooking(booking._id)}
                >
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h2 className="font-semibold text-lg text-[#6A4AAD]">
                        {formatServiceType(booking.serviceType)}
                      </h2>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBooking(booking._id);
                        }}
                        className=" text-red-500 hover:text-red-700 transition-colors p-1 rounded"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    {/* Service Details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Users size={16} />
                        <span>{formatServices(booking.services)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar size={16} />
                        <span>
                          {new Date(booking.date).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Clock size={16} />
                        <span>{formatTime(booking.time)}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span className="truncate">{booking.address}</span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                      >
                        Pending
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-2 text-sm">
                        {/* <CreditCard size={16} className="text-green-600" /> */}
                        <span className="font-semibold text-lg">
                          ${booking.charge}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {booking.cleaners} cleaner
                        {booking.cleaners > 1 ? "s" : ""}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-4">
                No pending bookings found
              </p>
              <p className="text-gray-400 text-sm">
                Your pending booking requests will appear here
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[550px] dark:bg-[#121212] dark:text-gray-100 max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText size={20} />
              Booking Details
            </DialogTitle>
            <DialogDescription>
              Complete information about your booking
            </DialogDescription>
          </DialogHeader>

          {selectedBooking ? (
            <div className="mt-4 space-y-4">
              {/* Booking Reference */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Booking Reference
                </p>
                <p className="font-mono text-lg">
                  {selectedBooking.bookingReference}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Service Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                    <Users size={16} />
                    Service Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service Type:</span>
                      <span className="font-medium">
                        {formatServiceType(selectedBooking.serviceType)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Service:</span>
                      <span className="font-medium">
                        {formatServices(selectedBooking.services)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Cleaners:</span>
                      <span className="font-medium">
                        {selectedBooking.cleaners}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Frequency:</span>
                      <span className="font-medium capitalize">
                        {selectedBooking.frequency}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                    <Calendar size={16} />
                    Schedule
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date:</span>
                      <span className="font-medium">
                        {new Date(selectedBooking.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time:</span>
                      <span className="font-medium">
                        {formatTime(selectedBooking.time)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Duration:</span>
                      <span className="font-medium">
                        {selectedBooking.duration}
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
                  {selectedBooking.address}
                </p>
              </div>

              {/* Payment & Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD] flex items-center gap-2">
                    <CreditCard size={16} />
                    Payment
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Charge:</span>
                      <span className="font-medium text-green-600">
                        ${selectedBooking.charge}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Payment Status:</span>
                      <Badge
                        variant={
                          selectedBooking.isPaid ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {selectedBooking.isPaid ? "Paid" : "Pending"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD]">Status</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Booking Status:</span>
                      <Badge
                        variant={getStatusVariant(selectedBooking.status)}
                        className="text-xs"
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() +
                          selectedBooking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Assigned:</span>
                      <Badge
                        variant={
                          selectedBooking.isAssigned ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {selectedBooking.isAssigned ? "Yes" : "No"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedBooking.specialInstructions && (
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#6A4AAD]">
                    Special Instructions
                  </h3>
                  <p className="text-sm bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                    {selectedBooking.specialInstructions}
                  </p>
                </div>
              )}

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Created:</span>
                  <span>
                    {new Date(selectedBooking.createdAt).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated:</span>
                  <span>
                    {new Date(selectedBooking.updatedAt).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <Skeleton className="h-5 w-2/3 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-[#121212] dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle size={20} />
              Delete Booking
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this booking? This action cannot
              be undone and all booking information will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialogOpen(false);
                setBookingToDelete(null);
              }}
              className="border-gray-300 dark:border-gray-600"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              disabled={deleteMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleteMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <Spinner />
                </div>
              ) : (
                "Delete Booking"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookingsPage;
