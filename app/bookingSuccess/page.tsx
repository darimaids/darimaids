import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CalendarDays, Share2 } from "lucide-react";
import Link from "next/link";

const page = () => {
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
          <div className="bg-[#EFEDF7] w-[227px] h-[38px] py-2.5 rounded-full text-[#6A4AAD]">
            <p className="font-bold mb-6">
              Booking ID: <span className="font-bold">#DM-4892-175</span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center">
        <div className="rounded-[8px] bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[631px]">
          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-[8px] p-6">
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Service
                </span>
                <span className="font-medium text-right">
                  Deep clean/Move in
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Date</span>
                <span className="font-medium">25th October 2025</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Time</span>
                <span className="font-medium">4PM - 5PM</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Frequency
                </span>
                <span className="font-medium text-right">
                  One-time re-occurence (No discount)
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Cleaners
                </span>
                <span className="font-medium">2 Cleaners</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Duration
                </span>
                <span className="font-medium">3 Hours</span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Add-ons
                </span>
                <span className="font-medium text-right max-w-[200px]">
                  Inside fridge, Oven interior, Wall washing, Laundry
                </span>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">
                  Cleaner
                </span>
                <Link href="/">
                  <span className="font-medium text-blue-600 dark:text-blue-400 cursor-pointer">
                    Go to My Bookings
                  </span>
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
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
            className="w-[50%] text-[#6A4AAD] dark:text-[#6A4AAD] font-medium py-5 rounded-[8px] cursor-pointer border border-[#6A4AAD]"
          >
            <Share2 />
            Share Booking
          </Button>
        </div>
      </div>

      <div className="flex justify-center mt-5">
        <div className="w-[632px] bg-[#FEF6EE] rounded-[8px] px-4 py-6">
          <h3 className="font-semibold text-lg mb-4 text-[#F2A358]">
            What happens next?
          </h3>
          <ul className="space-y-2 dark: text-black">
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

export default page;
