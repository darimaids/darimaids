"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

// components
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// icons
import { CheckCircle } from "lucide-react";

//api
import { getFaqs } from "@/services/faq/faqs";

const Body = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["faqs"],
    queryFn: getFaqs,
  });

  return (
    <div className="bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300 text-[#1F2937] dark:text-gray-200">
      <section className="py-20 px-6 md:px-[290px]">
        <div>
          <h2 className="text-3xl font-bold mb-2 text-center">
            Why Choose Darimaids?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-14 text-center">
            We’re not just another cleaning service — here’s why thousands of
            homeowners trust us with their homes.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-12">
          <div className="max-w-[500px]">
            <ul className="space-y-5">
              {[
                {
                  title: "Thoroughly Vetted Cleaners",
                  desc: "We interview, background check, and continuously rate all our professionals. Only the best join our team.",
                },
                {
                  title: "100% Satisfaction Guarantee",
                  desc: "If you’re not completely happy, we’ll return and fix it at no additional cost. Your peace of mind is guaranteed.",
                },
                {
                  title: "Transparent, Upfront Estimates",
                  desc: "Get a clear estimate before scheduling. Final pricing is based on the actual condition and level of detail your home requires, always with your approval.",
                },
                {
                  title: "Easy Online Management",
                  desc: "Book, reschedule, manage, and communicate with ease through our platform. Fast, simple, and convenient. Total control at your fingertips",
                },
                {
                  title: "All Supplies Included",
                  desc: "Our professionals arrive fully equipped with tools and eco-friendly cleaning products. You provide nothing but access.",
                },
              ].map((item, index) => (
                <li key={index} className="flex gap-3 items-start">
                  <CheckCircle className="text-[#6A4AAD] w-5 h-5 mt-1 shrink-0" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
            <Image
              src="/cleaner.svg"
              alt="Professional cleaner (light)"
              width={400}
              height={450}
              className="object-cover w-full dark:hidden"
            />
            <Image
              src="/cleaner.svg"
              alt="Professional cleaner (dark)"
              width={400}
              height={450}
              className="object-cover w-full hidden dark:block"
            />
          </div>
        </div>
      </section>

      <Link href="/booking">
        <aside className="py-5 px-6 cursor-pointer md:px-[290px]">
          <Button className="w-full py-6">
            <p className="text-base sm:text-lg">
              Schedule your First clean today!
            </p>
          </Button>
        </aside>
      </Link>

      <section className="py-10 px-6 md:px-[290px]">
        <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg mb-14 text-center">
          Three easy steps from booking to bliss. No surprises, just results.
        </p>

        <div className="space-y-24">
          {/* Step 1 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Tell Us a Bit About You
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up in just 30 seconds with your email or social login. This
                helps us save your details for faster booking next time and let
                you track all your cleanings in one place.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/first-light.svg"
                alt="Create Account Form (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/first-dark.svg"
                alt="Create Account Form (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Schedule Cleaning</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Select your service, frequency, and address. See your final,
                all-inclusive price before you book. No hidden fees, no
                surprises — just transparent pricing and full control.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/second-light.svg"
                alt="Booking Form (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/second-dark.svg"
                alt="Booking Form (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="max-w-[439px] text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">
                Confirm booking & Relax
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Pay using secure payment channels — your details are safely
                encrypted and charged only after the job is complete. Sit back
                and relax while we handle the rest.
              </p>
            </div>
            <div className="relative w-full sm:max-w-md mx-auto lg:mx-0">
              <Image
                src="/third-light.svg"
                alt="Booking Confirmation (light)"
                width={400}
                height={300}
                className="w-full h-auto dark:hidden"
              />
              <Image
                src="/third-dark.svg"
                alt="Booking Confirmation (dark)"
                width={400}
                height={300}
                className="w-full h-auto hidden dark:block"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="py-5 px-6 text-center md:px-[290px] mb-10">
        <p className="text-lg font-semibold">
          Serving major cities across South Florida, including Boca Raton,
          Delray Beach, West Palm Beach, Fort Lauderdale, Coral Springs,
          Hollywood, Miami, Miami Beach and more
        </p>
      </div>

      <section className="bg-[#6A4AAD] py-20 text-center px-6 relative overflow-hidden h-[450px] flex flex-col justify-center items-center text-[#EADDCD]">
        <div className="absolute left-0 md:left-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <img src="/half-logo-left.svg" alt="Darimaids Logo" />
        </div>
        <div className="absolute right-0 md:right-0 top-1/2 transform -translate-y-1/2 opacity-20">
          <img src="/half-logo-right.svg" alt="Darimaids Logo" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold mb-1">Hassle-free cancellation</h2>
          <p className=" mb-8">
            Your first clean is just a click away. Book your trusted cleaning
            service now!
          </p>
          <Link href="/booking">
            <Button className="bg-[#EADDCD] text-[#6A4AAD] hover:bg-[#e2d5ff] px-8 py-4 rounded-lg font-semibold sm:py-5 sm:px-[120px] transition-all duration-500">
              Book your first clean
            </Button>
          </Link>
          <p className="text-xs mt-1">
            No commitments. Easy booking. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 px-6  bg-[#FAFAFA] dark:bg-[#0F0F0F] transition-colors duration-300">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold text-[#1F2937] dark:text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Got questions? We’ve got answers. Here’s everything you need to know
            before booking your next cleaning.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="w-3/4">
                      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full animate-pulse"></div>
                    </div>
                    <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full animate-pulse" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {isError && <p className="text-red-500">Failed to load FAQs</p>}

          {!isLoading && data?.data?.length > 0 && (
            <Accordion type="single" collapsible className="space-y-3">
              {data.data.map((faq: any, index: any) => (
                <AccordionItem key={faq._id} value={`faq-${index}`}>
                  <AccordionTrigger className="text-base">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </div>
      </section>
    </div>
  );
};

export default Body;
