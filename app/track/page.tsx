"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { trackBooking } from "@/services/booking/customerBooking";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import {
  Loader2,
  Search,
  FileText,
  Hash,
  Home,
  Calendar,
  Ruler,
  CreditCard,
  MapPin,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Badge } from "@/components/ui/badge";

interface BookingDetails {
  bookingReference: string;
  serviceType: string;
  services: string;
  frequency: string;
  addon?: string;
  date: string;
  time: string;
  duration: string;
  squareFootage: number;
  lastCleaning: string;
  pets: string;
  charge: number;
  status: string;
  isAssigned: boolean;
  assignedCleanerCount: number;
  address: string;
  city: string;
  county: string;
  specialInstructions?: string;
  createdAt: string;
  acceptantCode: string;
}

interface DetailProps {
  label: string;
  value: React.ReactNode;
}

const Detail = ({ label, value }: DetailProps) => (
  <div>
    <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

const TrackPage = () => {
  const [bookingId, setBookingId] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingDetails | null>(
    null
  );

  const formatServiceType = (serviceType: string): string => {
    return serviceType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const formatServices = (services: string): string => {
    const parts = services.split("-");
    const bedCount = parts.find((part) => part.match(/^\d+$/)) || "0";
    const hasBed = services.includes("bed");
    const hasBath = services.includes("bath");

    const result: string[] = [];
    if (bedCount !== "0" && hasBed)
      result.push(`${bedCount} Bed${bedCount !== "1" ? "s" : ""}`);
    if (hasBath) result.push("Bath");

    return result.join(", ");
  };

  const getStatusVariant = (
    status: string
  ):
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "pending" => {
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

  const formatTime = (time: string): string => {
    if (!time) return "Not set";
    const [hours, minutes] = time.split(":").slice(0, 2);
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? "PM" : "AM";
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const formatPets = (pets: string): string => {
    if (pets === "none") return "No Pets";
    return pets.charAt(0).toUpperCase() + pets.slice(1);
  };

  const formatLastCleaning = (lastCleaning: string): string => {
    if (!lastCleaning) return "Not specified";
    if (lastCleaning === "1-week") return "Within 1 week";
    if (lastCleaning === "2-weeks") return "Within 2 weeks";
    if (lastCleaning === "1-month") return "Within 1 month";
    if (lastCleaning === "more-than-month") return "More than 1 month";
    return lastCleaning;
  };

  const { refetch, isFetching } = useQuery({
    queryKey: ["track-booking", bookingId],
    queryFn: async () => {
      if (!bookingId) return null;
      const res = await trackBooking(bookingId);
      return res?.data as BookingDetails;
    },
    enabled: false,
  });

  const handleSearch = async () => {
    if (!bookingId.trim()) {
      toast.error("Please enter a booking ID.");
      return;
    }

    try {
      const result = await refetch();
      if (result.data) {
        setSelectedBooking(result.data);
        setDialogOpen(true);
      } else {
        toast.error("No booking found for this ID.");
      }
    } catch (error) {
      toast.error("Unable to fetch booking. Try again.");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="py-16 px-4 sm:px-8 md:px-12 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 h-[500px]">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Track Your Booking</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Enter your Booking Reference to view your cleaning details.
        </p>
      </div>

      {/* Search Box */}
      <div className="max-w-xl mx-auto flex gap-3 mt-6">
        <Input
          placeholder="Enter Booking ID (e.g. darimaid-176457...)"
          value={bookingId}
          onChange={(e) => setBookingId(e.target.value)}
          onKeyDown={handleKeyDown}
          className="h-12 border-[#6A4AAD] focus-visible:ring-[#6A4AAD]"
        />

        <Button
          onClick={handleSearch}
          disabled={isFetching}
          className="h-12 px-6 bg-[#6A4AAD] hover:bg-[#5e3fa0] text-white"
        >
          {isFetching ? <Spinner /> : 
          <>
          
          <Search size={20} />
          <p>Search</p>
          </>
          }
        </Button>
      </div>

      {/* Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto dark:bg-[#121212] rounded-2xl">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-[#6A4AAD] rounded-lg">
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

          {!selectedBooking ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin" size={30} />
            </div>
          ) : (
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
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Home size={20} className="text-[#6A4AAD]" />
                    Service Details
                  </h3>

                  <div className="space-y-3">
                    <Detail
                      label="Service Type"
                      value={formatServiceType(selectedBooking.serviceType)}
                    />
                    <Detail
                      label="Services Included"
                      value={formatServices(selectedBooking.services)}
                    />
                    <Detail
                      label="Frequency"
                      value={selectedBooking.frequency}
                    />
                    {selectedBooking.addon && (
                      <Detail label="Add-ons" value={selectedBooking.addon} />
                    )}
                  </div>
                </div>

                {/* Schedule */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Calendar size={20} className="text-[#6A4AAD]" />
                    Schedule
                  </h3>

                  <div className="space-y-3">
                    <Detail
                      label="Date"
                      value={new Date(selectedBooking.date).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    />

                    <Detail
                      label="Time"
                      value={formatTime(selectedBooking.time)}
                    />
                    <Detail label="Duration" value={selectedBooking.duration} />
                  </div>
                </div>

                {/* Property */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Ruler size={20} className="text-[#6A4AAD]" />
                    Property Details
                  </h3>

                  <div className="space-y-3">
                    <Detail
                      label="Square Footage"
                      value={`${selectedBooking.squareFootage} sqft`}
                    />
                    <Detail
                      label="Last Cleaning"
                      value={formatLastCleaning(selectedBooking.lastCleaning)}
                    />
                    <Detail
                      label="Pets"
                      value={formatPets(selectedBooking.pets)}
                    />
                  </div>
                </div>

                {/* Payment & Status */}
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <CreditCard size={20} className="text-[#6A4AAD]" />
                    Payment & Status
                  </h3>

                  <div className="space-y-3">
                    <Detail
                      label="Total Charge"
                      value={`$${selectedBooking.charge}`}
                    />

                    <Detail
                      label="Booking Status"
                      value={
                        <Badge
                          variant={getStatusVariant(selectedBooking.status)}
                        >
                          {selectedBooking.status}
                        </Badge>
                      }
                    />

                    <Detail
                      label="Assignment Status"
                      value={
                        <Badge
                          variant={
                            selectedBooking.isAssigned ? "default" : "secondary"
                          }
                        >
                          {selectedBooking.isAssigned
                            ? "Assigned"
                            : "Unassigned"}
                        </Badge>
                      }
                    />

                    <Detail
                      label="Cleaners Assigned"
                      value={selectedBooking.assignedCleanerCount}
                    />
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <MapPin size={20} className="text-[#6A4AAD]" />
                  Service Location
                </h3>

                <Detail label="Address" value={selectedBooking.address} />

                <div className="grid grid-cols-2 gap-4">
                  <Detail label="City" value={selectedBooking.city} />
                  <Detail label="County" value={selectedBooking.county} />
                </div>
              </div>

              {/* Special Instructions */}
              {selectedBooking.specialInstructions && (
                <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FileText size={20} className="text-[#6A4AAD]" />
                    Special Instructions
                  </h3>

                  <p className="text-sm bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    {selectedBooking.specialInstructions}
                  </p>
                </div>
              )}

              {/* Meta */}
              <div className="space-y-4 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
                <h3 className="font-semibold text-lg">Meta Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Detail
                    label="Created At"
                    value={new Date(
                      selectedBooking.createdAt
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  />

                  <Detail
                    label="Acceptance Code"
                    value={selectedBooking.acceptantCode}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackPage;
