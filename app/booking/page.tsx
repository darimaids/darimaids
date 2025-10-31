"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
import { Spinner } from "@/components/ui/spinner";

// data
import {
  SERVICE_TYPES,
  CLEANING_TYPES,
  REOCCURENCE_OPTIONS,
} from "@/data/cleaningOptions";
import { SERVICES } from "@/data/services";

// icons
import { ChevronDownIcon, TriangleAlert } from "lucide-react";

// store
import { useBookingStore } from "@/store/useBookingStore";

const Booking = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const booking = useBookingStore((state) => state.booking);
  const payment = useBookingStore((state) => state.payment);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const updatePayment = useBookingStore((state) => state.updatePayment);

  const [totalPrice, setTotalPrice] = useState(0);
  const [basePrice, setBasePrice] = useState(0);
  const [addonsPrice, setAddonsPrice] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const COUNTIES = ["Palm Beach", "Broward", "Miami-Dade"];
  const STATES = ["Florida", "North Carolina", "Alaska", "New York", "New Hampshire"];
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

  //* recalculate pricing whenever relevant booking data changes
  useEffect(() => {
    calculatePricing();
  }, [
    booking.serviceType,
    booking.cleaningType,
    booking.squareFootage,
    booking.bedrooms,
    booking.bathrooms,
    booking.selectedAddons,
    booking.reoccurrence,
  ]);

  const calculatePricing = () => {
    let base = 0;
    const addons = booking.selectedAddons.length * 25;

    switch (booking.serviceType) {
      case "standard-cleaning":
        switch (booking.cleaningType) {
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
            base = booking.squareFootage
              ? Math.max(290, parseFloat(booking.squareFootage) * 0.18)
              : 0;
            break;
        }
        break;
      case "deep-cleaning":
        base = booking.squareFootage
          ? parseFloat(booking.squareFootage) * 0.23
          : 0;
        break;
      case "move-in-out":
        switch (booking.cleaningType) {
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
            base = booking.squareFootage
              ? Math.max(350, parseFloat(booking.squareFootage) * 0.3)
              : 0;
            break;
        }
        break;
      case "white-glove":
        base = 200;
        if (booking.bedrooms) base += (parseInt(booking.bedrooms) - 1) * 50;
        if (booking.bathrooms) base += (parseInt(booking.bathrooms) - 1) * 50;
        if (booking.squareFootage && parseFloat(booking.squareFootage) > 2000) {
          base = Math.max(base, parseFloat(booking.squareFootage) * 0.2);
        }
        break;
      case "airbnb-turnover":
        base = 140;
        if (booking.bedrooms && parseInt(booking.bedrooms) > 1)
          base += (parseInt(booking.bedrooms) - 1) * 40;
        if (booking.bathrooms && parseInt(booking.bathrooms) > 1)
          base += (parseInt(booking.bathrooms) - 1) * 40;
        if (booking.squareFootage && parseFloat(booking.squareFootage) > 1200) {
          base = Math.max(base, parseFloat(booking.squareFootage) * 0.23);
        }
        break;
      case "custom-clean":
        base = 130;
        break;
    }

    let discount = 0;
    switch (booking.reoccurrence) {
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
    // setTotalPrice(base + addons - discount);
    const total = base + addons - discount;
    setTotalPrice(total);
    updateBooking("totalPrice", total);
  };

  const handleAddonChange = (addon: string, checked: boolean) => {
    const current = booking.selectedAddons;
    const updated = checked
      ? [...current, addon]
      : current.filter((a) => a !== addon);
    updateBooking("selectedAddons", updated);
  };

  const getServiceDescription = () => {
    const service = SERVICES.find(
      (s) =>
        s.id === booking.serviceType.replace("-cleaning", "") ||
        s.id === booking.serviceType
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
        <div className="w-full lg:w-[70%] space-y-5">
          <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">Booking</h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Service Type *
                  </label>
                  <Select
                    value={booking.serviceType}
                    onValueChange={(value) =>
                      updateBooking("serviceType", value)
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Type of Cleaning *
                  </label>
                  <Select
                    value={booking.cleaningType}
                    onValueChange={(value) =>
                      updateBooking("cleaningType", value)
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Square Foot Est. *
                  </label>
                  <Input
                    placeholder="Enter square footage"
                    value={booking.squareFootage}
                    onChange={(e) =>
                      updateBooking("squareFootage", e.target.value)
                    }
                    type="number"
                  />
                </div>

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Number of Bedrooms *
                  </label>
                  <Select
                    value={booking.bedrooms}
                    onValueChange={(value) => updateBooking("bedrooms", value)}
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Number of Bathrooms *
                  </label>
                  <Select
                    value={booking.bathrooms}
                    onValueChange={(value) => updateBooking("bathrooms", value)}
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Last Time You Had a Cleaning *
                  </label>
                  <Select
                    value={booking.lastCleaning}
                    onValueChange={(value) =>
                      updateBooking("lastCleaning", value)
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

                <div className="sm:col-span-2">
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Street Address *
                  </label>
                  <Input
                    placeholder="Enter your street address"
                    value={booking.address}
                    onChange={(e) => updateBooking("address", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    City *
                  </label>
                  <Input
                    placeholder="Enter your city"
                    value={booking.city}
                    onChange={(e) => updateBooking("city", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Zip Code *
                  </label>
                  <Input
                    placeholder="Enter zip code"
                    value={booking.zipCode}
                    onChange={(e) => updateBooking("zipCode", e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    State *
                  </label>
                  <Select
                    value={booking.state}
                    onValueChange={(value) => updateBooking("state", value)}
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    County *
                  </label>
                  <Select
                    value={booking.county}
                    onValueChange={(value) => updateBooking("county", value)}
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Any Pets? *
                  </label>
                  <Select
                    value={booking.pets}
                    onValueChange={(value) => updateBooking("pets", value)}
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

                <div>
                  <label className="block text-[14px] text-[#666] dark:text-gray-300 mb-1">
                    Reoccurrence
                  </label>
                  <Select
                    value={booking.reoccurrence}
                    onValueChange={(value) =>
                      updateBooking("reoccurrence", value)
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
                        {booking.date
                          ? booking.date.toLocaleDateString()
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
                        selected={booking.date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          updateBooking(
                            "date",
                            date ? new Date(date) : undefined
                          );
                          setOpen(false);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              {booking.serviceType && (
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    {getServiceDescription()}
                  </p>
                </div>
              )}

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
                        checked={booking.selectedAddons.includes(addon)}
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

          <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">
              Special Instructions (Optional)
            </h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-4">
              <Textarea
                placeholder="Any special requests or instructions for our cleaning team..."
                value={booking.specialRequests}
                onChange={(e) =>
                  updateBooking("specialRequests", e.target.value)
                }
                rows={4}
              />
            </div>
          </div>

          {/* Discounts */}
          <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5">
            <h1 className="font-semibold text-xl">Discount Code</h1>
            <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-4">
              <Input
                placeholder="Enter discount code"
                value={booking.discountCode}
                onChange={(e) => updateBooking("discountCode", e.target.value)}
              />
            </div>
          </div>

          {/* Disclaimers */}
          <div className="rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 px-6 py-5">
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
          <div className="sticky top-6 bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 rounded-xl">
            <h1 className="font-semibold text-xl mb-4">Booking Summary</h1>
            <div className="bg-white dark:bg-[#1A1A1A] rounded-xl p-4 space-y-4">
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-200">
                  Service
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {SERVICE_TYPES.find((s) => s.value === booking.serviceType)
                    ?.label || "Not selected"}
                </p>
                {booking.cleaningType && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {
                      CLEANING_TYPES.find(
                        (c) => c.value === booking.cleaningType
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
                    <span>Add-ons ({booking.selectedAddons.length}):</span>
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

              {booking.selectedAddons.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 dark:text-gray-200 text-sm mb-2">
                    Selected Add-ons:
                  </h4>
                  <ul className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
                    {booking.selectedAddons.map((addon, index) => (
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
                value={payment.fullName}
                onChange={(e) => updatePayment("fullName", e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">Email</label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={payment.email}
                onChange={(e) => {
                  const value = e.target.value;
                  updatePayment("email", value);
                  localStorage.setItem("userEmail", value);
                }}
              />
            </div>

            <div>
              <label className="text-sm font-medium block mb-1">
                Phone Number
              </label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={payment.phone}
                onChange={(e) => updatePayment("phone", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button
              className="w-full"
              disabled={loading}
              onClick={() => {
                setLoading(true);
                console.log("Proceeding with:", { booking, payment });

                setTimeout(() => {
                  setLoading(false);
                  setDialogOpen(false);
                  router.push("/bookingDetails");
                }, 4000);
              }}
            >
              {loading ? <Spinner /> : "Proceed"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Booking;
