"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { ArrowRight, ChevronDownIcon, Loader2 } from "lucide-react";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Spinner } from "@/components/ui/spinner";

// 🧠 store
import { useBookingStore } from "@/store/useBookingStore";

const Hero = () => {
  const router = useRouter();

  const payment = useBookingStore((state) => state.payment);
  const updatePayment = useBookingStore((state) => state.updatePayment);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormComplete = payment.phone.trim() !== "" && consent;

  const handleQuote = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/booking");
    }, 2000);
  };
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-16 md:pb-32">
      <div className="absolute sm:-top-[590px] md:-top-[550px] lg:-top-[400px] inset-0 -z-10 w-full h-full hidden sm:block">
        <Image
          src="/hero_splash-light.svg"
          alt="Decorative colorful background shapes (light)"
          fill
          className=" opacity-90 dark:hidden"
          priority
        />

        <Image
          src="/hero-splash-dark.svg"
          alt="Decorative colorful background shapes (dark)"
          fill
          className="opacity-90 hidden dark:block"
          priority
        />
      </div>
      <div className="absolute inset-0 -z-10 block sm:hidden animate-gradient">
        <div className="w-full h-full opacity-90" />
      </div>

      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-[64px] md:text-6xl font-extrabold text-[#1F2937] dark:text-white md:mt-5">
          Reclaim your time, <br />
          love your{" "}
          <span className="text-[#6A4AAD] underline decoration-2 decoration-[#6A4AAD]">
            home.
          </span>
        </h1>

        <p className="mt-3 text-[#666666] dark:text-gray-300 text-base sm:text-xl max-w-2xl mx-auto hidden sm:block">
          Let our trusted, professional cleaners handle the chores, so
          <br /> you can focus on what matters most. Book your spotless clean
          <br /> in just 60 seconds.
        </p>
        <p className="mt-3 text-[#666666] dark:text-gray-300 text-base sm:text-xl max-w-2xl mx-auto block sm:hidden">
          Let our trusted, professional cleaners handle the chores, so you can
          focus on what matters most. Book your spotless clean in just 60
          seconds.
        </p>
        <p className="mt-3 text-[#6A4AAD] dark:text-[#6A4AAD] font-semibold text-base sm:text-xl max-w-2xl mx-auto">
          Proudly serving • Palmbeach • Broward • Miami-Dade
        </p>

        <div className="flex justify-center items-center mt-5">
          <Image
            src="/hero_banner.svg"
            alt="Hero Image"
            width={736}
            height={491}
            className="rounded-sm"
          />
        </div>

        <div className="mt-10 mb-10 bg-white dark:bg-[#1E1E1E] border-[0.2px] border-[#C8BCDF] dark:border-gray-800 rounded-xl py-6 sm:p-8 px-4 max-w-[750px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-start">
              Book Cleaning
            </h3>
            <Link href="/serviceCatalog">
              <div className="block sm:hidden text-[#6A4AAD] cursor-pointer gap-1 flex">
                <p>Service Catalog</p>
                <ArrowRight />
              </div>
            </Link>
            <Link href="/serviceCatalog">
              <div className="flex gap-1 items-center cursor-pointer">
                <p className="hidden sm:block text-[#6A4AAD]">
                  Not sure what you need? View our service catalogue
                </p>
                <ArrowRight className="text-[#6A4AAD] hidden sm:block" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            <div>
              <label
                htmlFor="Phone Number"
                className="block text-start text-[14px] text-[#666]"
              >
                Phone Number
              </label>
              <Input
                value={payment.phone}
                className="w-full"
                placeholder="Enter your Phone number"
                onChange={(e) => updatePayment("phone", e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-start text-[14px] text-[#666]"
              >
                Email Address
              </label>
              <Input
                value={payment.email}
                className="w-full"
                placeholder="Enter your Email address"
                onChange={(e) => updatePayment("email", e.target.value)}
              />
            </div>
          </div>

          <Button
            className="w-full py-6 mt-6 text-white cursor-pointer disabled:cursor-not-allowed"
            onClick={handleQuote}
            disabled={loading || !isFormComplete}
          >
            {loading ? (
              <span className="flex items-center gap-2 justify-center">
                <Spinner />
              </span>
            ) : (
              "Get a Quote"
            )}
          </Button>

          <div className="mt-3 flex items-start space-x-2 text-xs text-gray-500 dark:text-gray-400">
            <Checkbox
              id="consent"
              checked={consent}
              onCheckedChange={(checked) => setConsent(!!checked)}
              className="mt-0.5 border-gray-400"
            />
            <label
              htmlFor="consent"
              className="leading-snug cursor-pointer text-[12px] sm:text-xs text-start"
            >
              You agree to receive SMS and/or email messages from DariMaids
              regarding your quote request, service updates, and exclusive
              offers. You may opt out at any time.{" "}
              <Link
                href="/termsandconditions"
                className="text-[#6A4AAD] underline hover:text-[#5a3b99]"
              >
                Terms & Privacy Policy
              </Link>
              .
            </label>
          </div>
        </div>

        {/* <div>
          <Image
            src="/klin.svg"
            alt="Clients and Partner logos"
            width={1112}
            height={500}
          />
        </div> */}

        <div className="flex flex-col justify-center items-cemter mt-[60px]">
          <p className="mb-1 text-gray-500 dark:text-gray-400 text-sm">
            Join 10,000+ happy clients
          </p>
          <Image
            src="/clients.svg"
            alt="Clients and Partner logos"
            width={1112}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
