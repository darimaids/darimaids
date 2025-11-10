"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// icons
import { ArrowRight, ChevronDownIcon, Loader2 } from "lucide-react";

// components
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

// data
import {
  SERVICE_TYPES,
  CLEANING_TYPES,
  REOCCURENCE_OPTIONS,
} from "@/data/cleaningOptions";

// 🧠 store
import { useBookingStore } from "@/store/useBookingStore";
import { Spinner } from "@/components/ui/spinner";

const Hero = () => {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  const isFormComplete = phone.trim() !== "" && consent;

  const handleQuote = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/booking");
    }, 2000);
  };
  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-16 md:pb-32">
      <div className="absolute -top-[100px] inset-0 -z-10 w-full h-full hidden sm:block">
        <Image
          src="/hero_splash-light.svg"
          alt="Decorative colorful background shapes (light)"
          fill
          className="object-cover object-center opacity-90 dark:hidden"
          priority
        />

        <Image
          src="/hero-splash-dark.svg"
          alt="Decorative colorful background shapes (dark)"
          fill
          className="object-cover object-center opacity-90 hidden dark:block"
          priority
        />
      </div>
      <div className="absolute inset-0 -z-10 block sm:hidden animate-gradient">
        <div className="w-full h-full bg-linear-to-br from-[#6A4AAD] via-[#CBE8BE] to-[#05CDC2] opacity-90" />
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
            {/* <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Service Type
              </label>
              <Select
                value={localForm.serviceType}
                onValueChange={(value) => handleChange("serviceType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  {SERVICE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* 
            <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Type of cleaning
              </label>
              <Select
                value={localForm.cleaningType}
                onValueChange={(value) => handleChange("cleaningType", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select cleaning type" />
                </SelectTrigger>
                <SelectContent>
                  {CLEANING_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            <div>
              <label
                htmlFor="Phone Number"
                className="block text-start text-[14px] text-[#666]"
              >
                Phone Number
              </label>
              <Input
                className="w-full"
                placeholder="Enter your Phone number"
                onChange={(e) => setPhone(e.target.value)}
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
                className="w-full"
                placeholder="Enter your Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Reoccurence
              </label>
              <Select
                value={localForm.reoccurrence}
                onValueChange={(value) => handleChange("reoccurrence", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  {REOCCURENCE_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            {/* <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Date
              </label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between font-normal py-5"
                  >
                    {localForm.date
                      ? localForm.date.toLocaleDateString()
                      : "Select date"}
                    <ChevronDownIcon className="ml-2" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={localForm.date}
                    onSelect={(date) => {
                      handleChange("date", date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div> */}
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
                href="/terms-and-privacy"
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
