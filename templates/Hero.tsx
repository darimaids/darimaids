"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import { ArrowRight } from "lucide-react";
import { ChevronDownIcon } from "lucide-react";

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

// data
import {
  SERVICE_TYPES,
  CLEANING_TYPES,
  REOCCURENCE_OPTIONS,
} from "@/data/cleaningOptions";

const Hero = () => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-16 md:pb-32">
      <div className="absolute -top-[100px] inset-0 -z-10 w-full h-full hidden sm:block">
        {/* Light mode image */}
        <Image
          src="/hero_splash-light.svg"
          alt="Decorative colorful background shapes (light)"
          fill
          className="object-cover object-center opacity-90 dark:hidden"
          priority
        />
        {/* Dark mode image */}
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

        <div className="mt-10 bg-white dark:bg-[#1E1E1E] border-[0.2px] border-[#C8BCDF] dark:border-gray-800 rounded-[8px] py-6 sm:p-8 px-4 max-w-[750px] mx-auto">
          <div className="flex justify-between items-center mb-[24px]">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 text-start">
              Book Cleaning
            </h3>
            <Link href="/serviceCatalog">
              <div className="block sm:hidden text-[#6A4AAD] cursor-pointer gap-1">
                <p>Service catalogue</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-[32px]">
            <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Service Type
              </label>
              <Select>
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
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Type of cleaning
              </label>
              <Select>
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
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-start text-[14px] text-[#666]"
              >
                Address
              </label>
              <Input className="w-full" placeholder="Enter your address" />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-start text-[14px] text-[#666]"
              >
                County/Province
              </label>
              <Input
                className="w-full"
                placeholder="Enter your county/province"
              />
            </div>

            <div>
              <label
                htmlFor="serviceType"
                className="block text-start text-[14px] text-[#666]"
              >
                Reoccurence
              </label>
              <Select>
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
            </div>

            <div>
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
                    id="date"
                    className="w-full justify-between font-normal py-5"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {/* <button className="w-full mt-6 bg-[#6A4AAD] hover:bg-[#5a3b99] text-white font-medium rounded-lg py-3 transition cursor-pointer">
            Get a Quote
          </button> */}
          <Link href="/booking">
            <Button className="w-full py-6 mt-6">Get a Quote</Button>
          </Link>
        </div>

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
