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
  Home,
  Ruler,
  Dog,
  Sparkles,
  Tag,
  Phone,
  Mail,
  User,
  Hash,
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
    setEmail(savedEmail);
  }, []);

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
    const parts = services.split("-");
    const bedCount = parts.find((part) => part.match(/^\d+$/)) || "0";
    const hasBed = services.includes("bed");
    const hasBath = services.includes("bath");

    let result = [];
    if (bedCount !== "0" && hasBed)
      result.push(`${bedCount} Bed${bedCount !== "1" ? "s" : ""}`);
    if (hasBath) result.push("Bath");

    return result.join(", ");
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "successful":
      case "completed":
        return "success";
      case "pending":
        return "pending";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const formatTime = (time: string) => {
    if (!time) return "Not set";
    const [hours, minutes] = time.split(":").slice(0, 2);
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatPets = (pets: string) => {
    if (pets === "none") return "No Pets";
    return pets.charAt(0).toUpperCase() + pets.slice(1);
  };

  const formatLastCleaning = (lastCleaning: string) => {
    if (!lastCleaning) return "Not specified";
    if (lastCleaning === "1-week") return "Within 1 week";
    if (lastCleaning === "2-weeks") return "Within 2 weeks";
    if (lastCleaning === "1-month") return "Within 1 month";
    if (lastCleaning === "more-than-month") return "More than 1 month";
    return lastCleaning;
  };

  const SkeletonCard = () => (
    <Card className="bg-[#F9FAFB] dark:bg-[#121212] rounded-xl shadow-sm p-5 space-y-4 border border-gray-200 dark:border-gray-700">
      <Skeleton className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full bg-gray-300 dark:bg-gray-700 rounded" />
        <Skeleton className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 rounded" />
        <Skeleton className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>
      <Skeleton className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 rounded" />
    </Card>
  );

  const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full mb-4">
        <AlertTriangle className="text-red-500 dark:text-red-400" size={40} />
      </div>
      <p className="text-red-600 dark:text-red-400 mb-3 font-medium">
        Something went wrong while loading bookings.
      </p>
      <Button
        onClick={onRetry}
        className="flex items-center gap-2 bg-[#6A4AAD] hover:bg-[#5b3a9a] text-white"
      >
        <RefreshCcw size={16} /> Retry
      </Button>
    </div>
  );

  const BookingCard = ({
    booking,
    isPending = false,
  }: {
    booking: any;
    isPending?: boolean;
  }) => (
    <Card
      className="  dark:from-[#121212] dark:to-[#1a1a1a] rounded-xl transition-all duration-300 cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-[#6A4AAD]/30 dark:hover:border-[#6A4AAD]/50"
      onClick={() => handleViewBooking(booking._id)}
    >
      <CardContent className="space-y-4">
        {/* Header with service type and delete button */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#6A4AAD]/10 dark:bg-[#6A4AAD]/20 rounded-lg">
              <Home className="text-[#6A4AAD]" size={20} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                {formatServiceType(booking.serviceType)}
              </h2>
              {/* <p className="text-xs text-gray-500 dark:text-gray-400">
                Ref: {booking.bookingReference}
              </p> */}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteBooking(booking._id);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {/* Service Details Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded">
              <Users size={14} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Service
              </p>
              <p className="font-medium">{formatServices(booking.services)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded">
              <Calendar
                size={14}
                className="text-green-600 dark:text-green-400"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Date</p>
              <p className="font-medium">
                {new Date(booking.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded">
              <Clock
                size={14}
                className="text-purple-600 dark:text-purple-400"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Time</p>
              <p className="font-medium">{formatTime(booking.time)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-900/30 rounded">
              <MapPin
                size={14}
                className="text-amber-600 dark:text-amber-400"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">
                Location
              </p>
              <p className="font-medium truncate">{booking.city}</p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Ruler size={12} />
            <span>{booking.squareFootage} sqft</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <Dog size={12} />
            <span>{formatPets(booking.pets)}</span>
          </div>
          {booking.addon && (
            <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
              <Sparkles size={12} />
              <span className="truncate max-w-[100px]">
                {booking.addon.split(",")[0]}
              </span>
            </div>
          )}
        </div>

        {/* Footer with price and status */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded">
              <CreditCard
                size={14}
                className="text-emerald-600 dark:text-emerald-400"
              />
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400 text-xs">Total</p>
              <p className="font-bold text-lg text-gray-800 dark:text-gray-100">
                ${booking.charge}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant={getStatusVariant(booking.status)}
              className="text-xs font-medium"
            >
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
            {isPending && (
              <Badge variant="outline" className="text-xs">
                Pending
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-[286px] bg-linear-to-b from-gray-50 to-white dark:from-[#0D0D0D] dark:to-[#1a1a1a] text-gray-800 dark:text-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-center sm:text-left">
          Your Bookings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 text-center sm:text-left">
          Manage and view all your cleaning service bookings
        </p>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="flex gap-2 mb-8 bg-gray-100 dark:bg-[#1a1a1a] rounded-xl p-1.5">
            <TabsTrigger
              value="active"
              className="flex-1 py-3 text-center data-[state=active]:bg-[#6A4AAD] data-[state=active]:text-white transition-all font-medium"
            >
              Active Bookings
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 py-3 text-center data-[state=active]:bg-[#6A4AAD] data-[state=active]:text-white  transition-all font-medium"
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
                  <BookingCard key={booking._id} booking={booking} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Calendar
                    className="text-gray-400 dark:text-gray-500"
                    size={40}
                  />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2 font-medium">
                  No active bookings found
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
                  Your confirmed bookings will appear here. Book a service to
                  get started!
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
                  <BookingCard
                    key={booking._id}
                    booking={booking}
                    isPending={true}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-linear-to-br from-gray-100 to-gray-200 dark:from-[#1a1a1a] dark:to-[#2a2a2a] rounded-full flex items-center justify-center">
                  <Clock
                    className="text-gray-400 dark:text-gray-500"
                    size={40}
                  />
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg mb-2 font-medium">
                  No pending bookings found
                </p>
                <p className="text-gray-400 dark:text-gray-500 text-sm max-w-md mx-auto">
                  Your pending booking requests will appear here once submitted
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[85vh] overflow-y-auto dark:bg-[#121212] dark:text-gray-100 rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-linear-to-r from-[#6A4AAD] to-[#8B5FCC] rounded-lg">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <DialogTitle className="text-2xl font-bold">
                  Booking Details
                </DialogTitle>
                <DialogDescription className="text-gray-600 dark:text-gray-400">
                  Complete information about your booking
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          {selectedBooking ? (
            <div className="mt-4 space-y-6">
              {/* Booking Reference */}
              <div className="bg-linear-to-r from-[#6A4AAD]/10 to-[#8B5FCC]/10 dark:from-[#6A4AAD]/20 dark:to-[#8B5FCC]/20 p-4 rounded-xl border border-[#6A4AAD]/20">
                <div className="flex items-center gap-2 mb-2">
                  <Hash size={18} className="text-[#6A4AAD]" />
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    Booking Reference
                  </p>
                </div>
                <p className="font-mono text-lg font-bold text-gray-800 dark:text-gray-100">
                  {selectedBooking.bookingReference}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Service Information */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Home size={20} className="text-[#6A4AAD]" />
                    Service Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Service Type
                      </p>
                      <p className="font-medium">
                        {formatServiceType(selectedBooking.serviceType)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Services Included
                      </p>
                      <p className="font-medium">
                        {formatServices(selectedBooking.services)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Frequency
                      </p>
                      <p className="font-medium capitalize">
                        {selectedBooking.frequency}
                      </p>
                    </div>
                    {selectedBooking.addon && (
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Add-ons
                        </p>
                        <p className="font-medium">{selectedBooking.addon}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Schedule Information */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Calendar size={20} className="text-[#6A4AAD]" />
                    Schedule
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Date
                      </p>
                      <p className="font-medium">
                        {new Date(selectedBooking.date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Time
                      </p>
                      <p className="font-medium">
                        {formatTime(selectedBooking.time)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="font-medium">{selectedBooking.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <Ruler size={20} className="text-[#6A4AAD]" />
                    Property Details
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Square Footage
                      </p>
                      <p className="font-medium">
                        {selectedBooking.squareFootage} sqft
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last Cleaning
                      </p>
                      <p className="font-medium">
                        {formatLastCleaning(selectedBooking.lastCleaning)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Pets
                      </p>
                      <p className="font-medium">
                        {formatPets(selectedBooking.pets)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <CreditCard size={20} className="text-[#6A4AAD]" />
                    Payment & Status
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Charge
                      </p>
                      <p className="font-bold text-2xl text-green-600 dark:text-green-400">
                        ${selectedBooking.charge}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Booking Status
                      </p>
                      <Badge
                        variant={getStatusVariant(selectedBooking.status)}
                        className="text-sm font-medium py-1 px-3"
                      >
                        {selectedBooking.status.charAt(0).toUpperCase() +
                          selectedBooking.status.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Assignment Status
                      </p>
                      <Badge
                        variant={
                          selectedBooking.isAssigned ? "default" : "secondary"
                        }
                        className="text-sm font-medium py-1 px-3"
                      >
                        {selectedBooking.isAssigned ? "Assigned" : "Unassigned"}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Cleaners Assigned
                      </p>
                      <p className="font-medium">
                        {selectedBooking.assignedCleanerCount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Address */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                  <MapPin size={20} className="text-[#6A4AAD]" />
                  Service Location
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="font-medium">{selectedBooking.address}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        City
                      </p>
                      <p className="font-medium">{selectedBooking.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        County
                      </p>
                      <p className="font-medium">{selectedBooking.county}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedBooking.specialInstructions && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100 flex items-center gap-2">
                    <FileText size={20} className="text-[#6A4AAD]" />
                    Special Instructions
                  </h3>
                  <p className="text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    {selectedBooking.specialInstructions}
                  </p>
                </div>
              )}

              {/* Meta Information */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                  Meta Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Created At
                    </p>
                    <p className="font-medium">
                      {new Date(selectedBooking.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Acceptance Code
                    </p>
                    <p className="font-medium font-mono">
                      {selectedBooking.acceptantCode}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Spinner />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent className="dark:bg-[#121212] dark:text-gray-100 rounded-2xl">
          <AlertDialogHeader>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <AlertTriangle
                  className="text-red-600 dark:text-red-400"
                  size={24}
                />
              </div>
              <AlertDialogTitle className="text-xl font-bold">
                Delete Booking
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
              Are you sure you want to delete this booking? This action cannot
              be undone and all booking information will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3">
            <AlertDialogCancel
              onClick={() => {
                setDeleteDialogOpen(false);
                setBookingToDelete(null);
              }}
              className="border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
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
