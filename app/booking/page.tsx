"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  SERVICE_TYPES,
  CLEANING_TYPES,
  REOCCURENCE_OPTIONS,
} from "@/data/cleaningOptions";
import { SERVICES } from "@/data/services";
import { ChevronDownIcon, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";

interface BookingState {
  serviceType: string;
  cleaningType: string;
  squareFootage: string;
  bedrooms: string;
  bathrooms: string;
  address: string;
  city: string;
  zipCode: string;
  state: string;
  county: string;
  phone: string;
  email: string;
  date: Date | undefined;
  reoccurrence: string;
  lastCleaning: string;
  pets: string;
  specialRequests: string;
  selectedAddons: string[];
  discountCode: string;
}

const Booking = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [bookingState, setBookingState] = useState<BookingState>({
    serviceType: "",
    cleaningType: "",
    squareFootage: "",
    bedrooms: "",
    bathrooms: "",
    address: "",
    city: "",
    zipCode: "",
    state: "",
    county: "",
    phone: "",
    email: "",
    date: undefined,
    reoccurrence: "",
    lastCleaning: "",
    pets: "",
    specialRequests: "",
    selectedAddons: [],
    discountCode: "",
  });

  const [totalPrice, setTotalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const COUNTIES = ["Palm Beach", "Broward", "Miami-Dade"];
  const STATES = ["FL"];
  const LAST_CLEANING_OPTIONS = [
    { value: "1-week", label: "1 Week Ago" },
    { value: "1-month", label: "1 Month Ago" },
    { value: "3-plus-months", label: "3+ Months Ago" },
  ];
  const PET_OPTIONS = [
    { value: "none", label: "No Pets" },
    { value: "small", label: "Small Pets" },
    { value: "large", label: "Large Pets" },
  ];

  const ADD_ONS = [
    "Appliance Cleaning",
    "Cabinet Cleaning",
    "Grout Scrubbing",
    "Window Cleaning",
    "Linen Service",
    "Laundry",
    "Balcony/Patio",
    "Toaster/Oven",
    "Inside Fridge",
  ];

  useEffect(() => {
    calculatePricing();
  }, [bookingState]);

  const calculatePricing = () => {
    let base = 0;
    const addons = bookingState.selectedAddons.length * 25;

    switch (bookingState.serviceType) {
      case "standard-cleaning":
        switch (bookingState.cleaningType) {
          case "studio":
            base = 130;
            break;
          case "2-bed-1-bath":
            base = 180;
            break;
          case "2-bed-2-bath":
            base = 230;
            break;
          case "3-bed-2-bath":
            base = 290;
            break;
          case "1500-sqft-plus":
            base = bookingState.squareFootage
              ? Math.max(290, parseFloat(bookingState.squareFootage) * 0.18)
              : 0;
            break;
        }
        break;

      case "deep-cleaning":
        base = bookingState.squareFootage
          ? parseFloat(bookingState.squareFootage) * 0.23
          : 0;
        break;

      case "move-in-out":
        switch (bookingState.cleaningType) {
          case "studio":
            base = 250;
            break;
          case "2-bed-1-bath":
            base = 290;
            break;
          case "2-bed-2-bath":
            base = 325;
            break;
          case "3-bed-2-bath":
            base = 350;
            break;
          case "1500-sqft-plus":
            base = bookingState.squareFootage
              ? Math.max(350, parseFloat(bookingState.squareFootage) * 0.3)
              : 0;
            break;
        }
        break;

      case "white-glove":
        base = 200;
        if (bookingState.bedrooms)
          base += (parseInt(bookingState.bedrooms) - 1) * 50;
        if (bookingState.bathrooms)
          base += (parseInt(bookingState.bathrooms) - 1) * 50;
        if (
          bookingState.squareFootage &&
          parseFloat(bookingState.squareFootage) > 2000
        ) {
          base = Math.max(base, parseFloat(bookingState.squareFootage) * 0.2);
        }
        break;

      case "airbnb-turnover":
        base = 140;
        if (bookingState.bedrooms && parseInt(bookingState.bedrooms) > 1) {
          base += (parseInt(bookingState.bedrooms) - 1) * 40;
        }
        if (bookingState.bathrooms && parseInt(bookingState.bathrooms) > 1) {
          base += (parseInt(bookingState.bathrooms) - 1) * 40;
        }
        if (
          bookingState.squareFootage &&
          parseFloat(bookingState.squareFootage) > 1200
        ) {
          base = Math.max(base, parseFloat(bookingState.squareFootage) * 0.23);
        }
        break;

      case "custom-clean":
        base = 130;
        break;
    }

    let discount = 0;
    switch (bookingState.reoccurrence) {
      case "weekly":
        discount = base * 0.15;
        break;
      case "bi-weekly":
        discount = base * 0.1;
        break;
      case "monthly":
        discount = base * 0.05;
        break;
    }

    setBasePrice(base);
    setAddonsPrice(addons);
    setDiscountAmount(discount);
    setTotalPrice(base + addons - discount);
  };

  const handleInputChange = (field: keyof BookingState, value: any) => {
    setBookingState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAddonChange = (addon: string, checked: boolean) => {
    if (checked) {
      setBookingState((prev) => ({
        ...prev,
        selectedAddons: [...prev.selectedAddons, addon],
      }));
    } else {
      setBookingState((prev) => ({
        ...prev,
        selectedAddons: prev.selectedAddons.filter((a) => a !== addon),
      }));
    }
  };

  const getServiceDescription = () => {
    const service = SERVICES.find(
      (s) =>
        s.id === bookingState.serviceType.replace("-cleaning", "") ||
        s.id === bookingState.serviceType
    );
    return service?.description || "";
  };

  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300">
      <div className="flex justify-center items-center mb-8">
        <div className="relative w-[400px] h-[100px]">
          <Image
            src="/step1.svg"
            alt="Light Mode Step"
            fill
            className="object-contain block dark:hidden"
          />
          <Image
            src="/step1-dark.svg"
            alt="Dark Mode Step"
            fill
            className="object-contain hidden dark:block"
          />
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Section */}
        <div className="w-full lg:w-[70%] space-y-5">
          {/* Booking Form */}
          <div className="rounded-[8px] bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">Booking</h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-[8px] p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Service Type */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Service Type *
                  </label>
                  <Select
                    value={bookingState.serviceType}
                    onValueChange={(value) =>
                      handleInputChange("serviceType", value)
                    }
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
                </div>

                {/* Type of Cleaning */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Type of Cleaning *
                  </label>
                  <Select
                    value={bookingState.cleaningType}
                    onValueChange={(value) =>
                      handleInputChange("cleaningType", value)
                    }
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
                </div>

                {/* Square Footage */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Square Foot Est. *
                  </label>
                  <Input
                    placeholder="Enter square footage"
                    value={bookingState.squareFootage}
                    onChange={(e) =>
                      handleInputChange("squareFootage", e.target.value)
                    }
                    type="number"
                  />
                </div>

                {/* Number of Bedrooms */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Number of Bedrooms *
                  </label>
                  <Select
                    value={bookingState.bedrooms}
                    onValueChange={(value) =>
                      handleInputChange("bedrooms", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select bedrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Number of Bathrooms */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Number of Bathrooms *
                  </label>
                  <Select
                    value={bookingState.bathrooms}
                    onValueChange={(value) =>
                      handleInputChange("bathrooms", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select bathrooms" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Last Cleaning */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Last Time You Had a Cleaning *
                  </label>
                  <Select
                    value={bookingState.lastCleaning}
                    onValueChange={(value) =>
                      handleInputChange("lastCleaning", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select last cleaning" />
                    </SelectTrigger>
                    <SelectContent>
                      {LAST_CLEANING_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Street Address *
                  </label>
                  <Input
                    placeholder="Enter your street address"
                    value={bookingState.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                  />
                </div>

                {/* City */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    City *
                  </label>
                  <Input
                    placeholder="Enter your city"
                    value={bookingState.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                  />
                </div>

                {/* Zip Code */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Zip Code *
                  </label>
                  <Input
                    placeholder="Enter zip code"
                    value={bookingState.zipCode}
                    onChange={(e) =>
                      handleInputChange("zipCode", e.target.value)
                    }
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    State *
                  </label>
                  <Select
                    value={bookingState.state}
                    onValueChange={(value) => handleInputChange("state", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {STATES.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* County */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    County *
                  </label>
                  <Select
                    value={bookingState.county}
                    onValueChange={(value) =>
                      handleInputChange("county", value)
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select county" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTIES.map((county) => (
                        <SelectItem key={county} value={county}>
                          {county}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    placeholder="Enter phone number"
                    value={bookingState.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                  />
                </div>

                
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Email *
                  </label>
                  <Input
                    placeholder="Enter email address"
                    value={bookingState.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                  />
                </div> */}

                {/* Pets */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Any Pets? *
                  </label>
                  <Select
                    value={bookingState.pets}
                    onValueChange={(value) => handleInputChange("pets", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select pet option" />
                    </SelectTrigger>
                    <SelectContent>
                      {PET_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Reoccurrence */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Reoccurrence
                  </label>
                  <Select
                    value={bookingState.reoccurrence}
                    onValueChange={(value) =>
                      handleInputChange("reoccurrence", value)
                    }
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
                </div>

                {/* Date */}
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Date
                  </label>
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="date"
                        className="w-full justify-between font-normal py-5"
                      >
                        {bookingState.date
                          ? bookingState.date.toLocaleDateString()
                          : "Select date"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={bookingState.date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          handleInputChange("date", date);
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {/* Service Description */}
              {bookingState.serviceType && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {getServiceDescription()}
                  </p>
                </div>
              )}

              {/* Add-ons Section */}
              <div className="mt-8">
                <h2 className="text-lg font-semibold text-[#1F2937] dark:text-gray-100 mb-3">
                  Add-ons ($25 each)
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Select extra services to enhance your cleaning experience.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ADD_ONS.map((addon, idx) => (
                    <div
                      key={idx}
                      className="flex items-center space-x-2 rounded-md border border-gray-200 dark:border-gray-700 p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <Checkbox
                        id={`addon-${idx}`}
                        checked={bookingState.selectedAddons.includes(addon)}
                        onCheckedChange={(checked) =>
                          handleAddonChange(addon, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`addon-${idx}`}
                        className="text-sm text-[#1F2937] dark:text-gray-200 cursor-pointer flex-1"
                      >
                        {addon}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[8px] bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">
              Special Instructions (Optional)
            </h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-[8px] p-4">
              <Textarea
                placeholder="Any special requests or instructions for our cleaning team..."
                value={bookingState.specialRequests}
                onChange={(e) =>
                  handleInputChange("specialRequests", e.target.value)
                }
                rows={4}
              />
            </div>
          </div>

          {/* Discounts */}
          <div className="rounded-[8px] bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">Discount Code</h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-[8px] p-4">
              <Input
                placeholder="Enter discount code"
                value={bookingState.discountCode}
                onChange={(e) =>
                  handleInputChange("discountCode", e.target.value)
                }
              />
            </div>
          </div>

          {/* Disclaimers */}
          <div className="rounded-[8px] bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-6 py-5">
            <div className="flex gap-2 items-center">
              <TriangleAlert className="text-amber-800 dark:text-amber-400" />
              <h1 className="font-semibold text-xl text-amber-800 dark:text-amber-300">
                Important Information
              </h1>
            </div>
            <div className="mt-4 space-y-3 text-sm text-amber-700 dark:text-amber-300">
              <p>
                <strong>Pricing Notice:</strong> All prices shown are estimates.
              </p>
              <p>
                <strong>Square Footage:</strong> Homes larger than 1500 sq ft
                may have adjusted rates.
              </p>
              <p>
                <strong>Final Pricing:</strong> Confirmed after brief on-site
                assessment.
              </p>
              <p>
                <strong>Deposit:</strong> A deposit may be required to confirm
                booking.
              </p>
              <p>
                <strong>Travel Fees:</strong> May apply outside our service
                area.
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Booking Summary */}
        <div className="w-full lg:w-[30%]">
          <div className="sticky top-6 bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 rounded-[8px]">
            <h1 className="font-semibold text-xl mb-4">Booking Summary</h1>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-[8px] p-4 space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                  Service
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {SERVICE_TYPES.find(
                    (s) => s.value === bookingState.serviceType
                  )?.label || "Not selected"}
                </p>
                {bookingState.cleaningType && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {
                      CLEANING_TYPES.find(
                        (c) => c.value === bookingState.cleaningType
                      )?.label
                    }
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Price:</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>

                {addonsPrice > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Add-ons ({bookingState.selectedAddons.length}):</span>
                    <span>${addonsPrice.toFixed(2)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount:</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {bookingState.selectedAddons.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-200 text-sm mb-2">
                    Selected Add-ons:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {bookingState.selectedAddons.map((addon, index) => (
                      <li key={index}>• {addon}</li>
                    ))}
                  </ul>
                </div>
              )}

              <Button
                className="w-full text-white"
                onClick={() => setDialogOpen(true)}
              >
                Continue to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px] dark:bg-[#121212] dark:text-gray-100">
          <DialogHeader>
            <DialogTitle>You’re almost there!</DialogTitle>
            <DialogDescription>
              We just need a few details to process booking
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium block mb-1">
                Full Name
              </label>
              <Input
                placeholder="Enter your full name"
                value={paymentDetails.fullName}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    fullName: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={paymentDetails.email}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    email: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={paymentDetails.phone}
                onChange={(e) =>
                  setPaymentDetails({
                    ...paymentDetails,
                    phone: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              className="w-full"
              onClick={() => {
                console.log("Proceeding with:", paymentDetails);
                router.push("/bookingDetails");
                setDialogOpen(false);
              }}
            >
              Proceed
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Booking;
