"use client";

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAbout } from "@/services/about/aboutus";
import { Skeleton } from "@/components/ui/skeleton";

interface AboutData {
  _id: string;
  title: string;
  description: string;
  location: string;
  openTime: string;
  closingTime: string;
  createdAt: string;
  updatedAt: string;
}

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const { data, isLoading } = useQuery<{ success: boolean; data: AboutData[] }>(
    {
      queryKey: ["about"],
      queryFn: getAbout,
    }
  );

  const about = data?.data[0];

  // Scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#6A4AAD] z-50 transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Hero Section */}
      <div className="bg-[#6A4AAD] w-full h-[498px] text-center flex flex-col justify-center items-center px-4 text-white">
        {" "}
        <h1 className="text-5xl font-bold">About Darimaids</h1>{" "}
        <p className="text-[#E3E3E3] text-xl mt-2 max-w-2xl">
          {" "}
          We're on a mission to help you reclaim your time by providing
          exceptional cleaning services you can trust.{" "}
        </p>{" "}
      </div>

      {/* Story Section */}
      <div className="py-16 px-6 sm:px-[286px] bg-white dark:bg-[#1E1E1E] transition-colors duration-300">
        <div className="text-center mb-10">
          {isLoading ? (
            <>
              <Skeleton className="h-8 w-1/3 mx-auto mb-2" />
              <Skeleton className="h-4 w-1/2 mx-auto" />
            </>
          ) : (
            <>
              <h2 className="text-[#1F2937] dark:text-white text-2xl font-semibold">
                {about?.title || "Our Story"}
              </h2>
            </>
          )}
        </div>

        <div className="mx-auto text-[#1F2937] dark:text-gray-300 space-y-4 text-base leading-relaxed">
          {isLoading ? (
            <>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </>
          ) : (
            about?.description
              .split("\n")
              .map((line, idx) => <p key={idx}>{line}</p>)
          )}
        </div>

        {/* Hours Section */}
        <div className="mt-16 bg-[#FAFAFA] dark:bg-[#2B2B2B] p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-center mb-6 text-[#1F2937] dark:text-gray-100">
            Our Hours
          </h3>
          {isLoading ? (
            <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
              {about?.openTime} - {about?.closingTime}
            </p>
          )}
        </div>

        {/* Location Section */}
        <div className="mt-16 bg-[#FAFAFA] dark:bg-[#2B2B2B] p-8 rounded-xl shadow-sm">
          <h3 className="text-2xl font-semibold text-center mb-6 text-[#1F2937] dark:text-gray-100">
            Our Location
          </h3>
          {isLoading ? (
            <Skeleton className="h-6 w-1/2 mx-auto mb-4" />
          ) : (
            <div className="text-center text-[#1F2937] dark:text-gray-300 mb-4">
              📍 {about?.location}
            </div>
          )}
          <div className="rounded-xl overflow-hidden shadow-sm h-[350px]">
            {!isLoading && (
              <iframe
                src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_KEY&q=${encodeURIComponent(
                  about?.location || "Miami Beach"
                )}`}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            )}
            {isLoading && <Skeleton className="h-full w-full" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
