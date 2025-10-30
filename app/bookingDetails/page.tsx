"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

// components
import { Button } from "@/components/ui/button";
import { InfoRow } from "@/components/ui/inforow";
import { Divider } from "@/components/ui/divider";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

// store
import { useBookingStore } from "@/store/useBookingStore";

// api
import { createBooking } from "@/services/booking/customerBooking";

const BookingDetailsPage = () => {
  const router = useRouter();
  const { booking, payment } = useBookingStore();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        fullName: payment.fullName,
        email: payment.email,
        phoneNumber: payment.phone,
        address: booking.address,
        province: booking.state,
        zipCode: booking.zipCode,
        services: booking.cleaningType || booking.serviceType,
        cleaners: booking.bedrooms || "1",
        date: booking.date
          ? booking.date.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        time: "10am", // You can make this dynamic later if needed
        serviceType: booking.serviceType || "Standard cleaning",
        duration: "3hrs",
        addon:
          booking.selectedAddons.length > 0
            ? booking.selectedAddons.join(", ")
            : "none",
        specialInstructions: booking.specialRequests || "",
        frequency: booking.reoccurrence || "one-time",
        charge: booking.totalPrice?.toString() || "0",
      };

      const response = await createBooking(payload);
      return response;
    },
    onSuccess: (res: any) => {
      if (res?.success && res?.data?.checkoutUrl) {
        window.open(res.data.checkoutUrl, "_blank");
      } else {
        toast.info("Booking created, but no checkout URL found.");
      }
    },
    onError: (error: any) => {
      console.error("Booking creation failed:", error);
      toast.error("Failed to create booking. Please try again.");
    },
  });

  const handleBooking = () => {
    mutate();
  };

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-center items-center mb-8">
        <div className="relative w-[400px] h-[100px]">
          <Image
            src="/step2.svg"
            alt="Light Mode Step"
            fill
            className="object-contain block dark:hidden"
          />
          <Image
            src="/step2-dark.svg"
            alt="Dark Mode Step"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[829px]">
          <h1 className="font-semibold text-xl">Booking Summary</h1>

          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-5">
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <InfoRow label="Name" value={payment.fullName} />
                <Divider />
                <InfoRow label="Phone number" value={payment.phone} />
                <Divider />
                <InfoRow label="Email Address" value={payment.email} />
                <Divider />
                <InfoRow label="Street Address" value={booking.address} />
                <Divider />
                <InfoRow label="City" value={booking.city} />
                <Divider />
                <InfoRow label="ZIP Code" value={booking.zipCode} />
                <Divider />
                <InfoRow label="County" value={booking.county} />
                <Divider />
                <InfoRow label="State" value={booking.state} />
              </div>
            </div>

            {/* Booking Information */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Booking Information
              </h2>
              <div className="space-y-3">
                <InfoRow
                  label="Service"
                  value={
                    booking.serviceType
                      ? booking.serviceType.replace("-", " ").toUpperCase()
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Cleaning Type"
                  value={
                    booking.cleaningType
                      ? booking.cleaningType.replace("-", " ")
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Square Footage"
                  value={
                    booking.squareFootage
                      ? `${booking.squareFootage} sqft`
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Bedrooms"
                  value={booking.bedrooms ? `${booking.bedrooms}` : "N/A"}
                />
                <Divider />
                <InfoRow
                  label="Bathrooms"
                  value={booking.bathrooms ? `${booking.bathrooms}` : "N/A"}
                />
                <Divider />
                <InfoRow
                  label="Date"
                  value={
                    booking.date
                      ? booking.date.toLocaleDateString()
                      : "Not selected"
                  }
                />
                <Divider />
                <InfoRow
                  label="Reoccurrence"
                  value={booking.reoccurrence || "One-time"}
                />
                <Divider />
                <InfoRow label="Pets" value={booking.pets || "N/A"} />
                <Divider />
                <InfoRow
                  label="Add-ons"
                  value={
                    booking.selectedAddons.length > 0
                      ? booking.selectedAddons.join(", ")
                      : "No add-ons selected"
                  }
                />
                <Divider />
                <InfoRow
                  label="Special Requests"
                  value={booking.specialRequests || "None"}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            {/* Total Summary */}
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total Estimate:</span>
              <span>
                $
                {booking.totalPrice
                  ? booking.totalPrice.toFixed(2)
                  : "Calculated at confirmation"}
              </span>
            </div>

            {/* Pay Button */}
            <div className="flex justify-center">
              <Button
                disabled={isPending}
                onClick={handleBooking}
                className="w-full text-white px-8 py-5 rounded-lg font-semibold transition-colors duration-300"
              >
                {isPending ? <Spinner /> : "Pay"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailsPage;
