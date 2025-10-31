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

// icons
import { AlertTriangle, Trash2, RefreshCcw } from "lucide-react";

// api
import {
  getBookings,
  getPendingBookings,
  getBookingInfo,
  deleteBooking,
} from "@/services/booking/customerBooking";

const BookingsPage = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    setEmail(savedEmail);
  }, []);

  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    isError: bookingsError,
    refetch: refetchBookings,
  } = useQuery({
    queryKey: ["bookings", email],
    queryFn: () => getBookings({ email }),
    enabled: !!email,
  });

  const {
    data: pendingData,
    isLoading: pendingLoading,
    isError: pendingError,
    refetch: refetchPending,
  } = useQuery({
    queryKey: ["pendingBookings", email],
    queryFn: () => getPendingBookings({ email }),
    enabled: !!email,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBooking,
    onSuccess: () => {
      toast.success("Booking deleted successfully!", {
        position: "top-center",
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      queryClient.invalidateQueries({ queryKey: ["pendingBookings"] });
    },
    onError: (error: any) => {
      console.error(error);
      toast.error("Failed to delete booking.");
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
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteMutation.mutate(bookingId);
    }
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
                  className="relative bg-[#F9FAFB] dark:bg-[#121212] hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleViewBooking(booking._id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBooking(booking._id);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                  <CardContent className="p-5 space-y-2">
                    <h2 className="font-semibold text-lg text-[#6A4AAD]">
                      {booking.serviceType}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.services}
                    </p>
                    <p className="text-sm">
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p className="text-sm">
                      <strong>Charge:</strong> ${booking.charge}
                    </p>
                    <p
                      className={`text-sm font-medium ${
                        booking.status === "successful"
                          ? "text-green-600"
                          : "text-yellow-500"
                      }`}
                    >
                      {booking.status}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No bookings found for this account.
            </p>
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
                  className="relative bg-[#F9FAFB] dark:bg-[#121212] hover:shadow-lg transition cursor-pointer"
                  onClick={() => handleViewBooking(booking._id)}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteBooking(booking._id);
                    }}
                    className="absolute top-3 right-3 text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={20} />
                  </button>
                  <CardContent className="p-5 space-y-2">
                    <h2 className="font-semibold text-lg text-[#6A4AAD]">
                      {booking.serviceType}
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {booking.services}
                    </p>
                    <p className="text-sm">
                      <strong>Date:</strong>{" "}
                      {new Date(booking.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm">
                      <strong>Time:</strong> {booking.time}
                    </p>
                    <p className="text-sm">
                      <strong>Charge:</strong> ${booking.charge}
                    </p>
                    <p className="text-yellow-600 text-sm font-medium">
                      Pending
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No pending bookings found.
            </p>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[480px] dark:bg-[#121212] dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>
              Full information about your booking
            </DialogDescription>
          </DialogHeader>

          {selectedBooking ? (
            <div className="mt-4 space-y-3 text-sm">
              <p>
                <strong>Booking Ref:</strong> {selectedBooking.bookingReference}
              </p>
              <p>
                <strong>Service Type:</strong> {selectedBooking.services}
              </p>
              <p>
                <strong>Address:</strong> {selectedBooking.address}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedBooking.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Time:</strong> {selectedBooking.time}
              </p>
              <p>
                <strong>Amount Paid:</strong> ${selectedBooking.amountPaid}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedBooking.status === "successful"
                      ? "text-green-600"
                      : "text-yellow-500"
                  }`}
                >
                  {selectedBooking.status}
                </span>
              </p>
              {selectedBooking.specialInstructions && (
                <p>
                  <strong>Special Instructions:</strong>{" "}
                  {selectedBooking.specialInstructions}
                </p>
              )}
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
    </div>
  );
};

export default BookingsPage;
