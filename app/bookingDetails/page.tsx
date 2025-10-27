"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
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
        <div className="rounded-[8px] bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[829px]">
          <h1 className="font-semibold text-xl">Booking Summary</h1>

          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-[8px] p-5">
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Name</span>
                  <span className="font-medium">George Olufemi</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Phone number
                  </span>
                  <span className="font-medium">+234810109892</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Email Address
                  </span>
                  <span className="font-medium">george@usecentry.com</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Address Line 1
                  </span>
                  <span className="font-medium">
                    2nd House, Redemption Estate
                  </span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Address Line 2
                  </span>
                  <span className="font-medium">Off Two-lane Rd</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    ZIP Code
                  </span>
                  <span className="font-medium">542110</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Province
                  </span>
                  <span className="font-medium">North Darkota</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    State
                  </span>
                  <span className="font-medium">South Carolina</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>
              </div>
            </div>

            {/* Booking Information Section */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Booking Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Service
                  </span>
                  <span className="font-medium">Deep clean/Move in</span>
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
                  <span className="font-medium">
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
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            <div className="flex justify-center">
              <Button
                onClick={() => router.push("/bookingSuccess")}
                className="w-full text-white px-8 py-5 rounded-lg font-semibold transition-colors duration-300"
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
