"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, Share2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";

const BookingSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
        </div>
      }
    >
      <BookingSuccessContent />
    </Suspense>
  );
};

const BookingSuccessContent = () => {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState<any>(null);

  useEffect(() => {
    const dataParam = searchParams.get("data");
    if (dataParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(dataParam));
        setBookingData(parsed);
      } catch (err) {
        console.error("Failed to parse booking data:", err);
      }
    }
  }, [searchParams]);
  
  if (!bookingData) {
    return (
      <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-[286px]">
        <Skeleton className="h-10 w-[400px] mx-auto mb-8" />
        <Skeleton className="h-8 w-[227px] mx-auto mb-10 rounded-full" />
        <div className="space-y-4 max-w-[631px] mx-auto">
          {Array.from({ length: 8 }).map((_, idx) => (
            <Skeleton key={idx} className="h-6 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const { booking, user } = bookingData;

  return (
    <div className="py-12 px-4 sm:px-8 md:px-16 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-center items-center mb-8">
        <div className="relative w-[400px] h-[100px]">
          <Image
            src="/step3.svg"
            alt="Light Mode Step"
            fill
            className="object-contain block dark:hidden"
          />
          <Image
            src="/step3-dark.svg"
            alt="Dark Mode Step"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>

      <div className="text-center">
        <h1 className="font-bold text-2xl mb-2">Payment Successful</h1>
        <p className="mb-6 text-[#666] dark:text-gray-400">
          Your booking has been confirmed. Our team is excited to make your home
          sparkle!
        </p>
        <div className="flex justify-center items-center mb-10">
          <div className="bg-[#EFEDF7] dark:bg-[#3C3C3C] w-auto px-4 h-[38px] py-1.5 rounded-full text-[#6A4AAD] dark:text-[#F2A358]">
            <p className="font-bold mb-6">
              Booking ID:{" "}
              <span className="font-bold uppercase">
                {booking.bookingReference}
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[631px]">
          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-6">
            <div className="space-y-4 mb-6">
              <InfoRow label="Name" value={user.fullName} />
              <InfoRow label="Service" value={booking.serviceType} />
              <InfoRow
                label="Date"
                value={new Date(booking.date).toLocaleDateString()}
              />
              <InfoRow label="Time" value={booking.time} />
              <InfoRow label="Frequency" value={booking.frequency} />
              <InfoRow
                label="Cleaners"
                value={`${booking.cleaners} Cleaners`}
              />
              <InfoRow label="Duration" value={booking.duration} />
              <InfoRow label="Charge" value={`$${booking.charge || "None"}`} />
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Cleaner
                </span>
                <Link href="/bookings">
                  <span className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer">
                    Go to My Bookings
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-[631px] flex gap-2 items-center">
          <Button className="w-[50%] dark:text-white font-medium py-5">
            <CalendarDays />
            Add to Calendar
          </Button>
          <Button
            variant={"outline"}
            className="w-[50%] text-[#6A4AAD] dark:text-[#6A4AAD] font-medium py-5 rounded-lg cursor-pointer border border-[#6A4AAD]"
          >
            <Share2 />
            Share Booking
          </Button>
        </div>
      </div>

      {/* Updated light/dark yellow section */}
      <div className="flex justify-center mt-5">
        <div className="w-[632px] rounded-xl px-4 py-6 bg-[#FEF6EE] dark:bg-[#594713]">
          <h3 className="font-semibold text-lg mb-4 text-[#F2A358] dark:text-[#FFD580]">
            What happens next?
          </h3>
          <ul className="space-y-2 text-black dark:text-gray-200">
            <li>
              • You'll receive a confirmation email with all booking details
            </li>
            <li>
              • Your assigned cleaner will contact you before your appointment
            </li>
            <li>
              • Our team will arrive at your scheduled time with all your
              supplies
            </li>
            <li>• After service, you will receive a satisfaction survey</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

interface InfoRowProps {
  label: string;
  value: string | number;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex justify-between">
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
    <span className="font-medium text-right capitalize">{value}</span>
  </div>
  // <div className="border-t border-gray-200 dark:border-gray-700 my-2" />;
);

export default BookingSuccessPage;
