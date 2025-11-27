"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/provider/StripeProvider";

// components
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { InfoRow } from "@/components/ui/inforow";
import { Divider } from "@/components/ui/divider";
import { Spinner } from "@/components/ui/spinner";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// store
import { useBookingStore } from "@/store/useBookingStore";

// api
import { createBooking } from "@/services/booking/customerBooking";

function PaymentCardForm({
  onSuccess,
  onError,
}: {
  onSuccess: (paymentMethodId: string) => void;
  onError: (error: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);

    const { error: submitError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/return`,
      },
      redirect: "if_required",
    });

    if (submitError) {
      onError(submitError.message || "An error occurred");
      setLoading(false);
    } else if (setupIntent && setupIntent.status === "succeeded") {
      setLoading(false);
      onSuccess(setupIntent.payment_method as string);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "accordion" }} />

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? <Spinner /> : "Save Card Securely"}
      </Button>
    </form>
  );
}

// Payment Dialog Wrapper
function PaymentDialog({
  open,
  onOpenChange,
  onPaymentMethodSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPaymentMethodSaved: (paymentMethodId: string) => void;
}) {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open && !clientSecret) {
      fetch("/api/create-setup-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch((err) => {
          console.error("Error:", err);
          // setError("Failed to load payment form. Please try again.");
          toast.error("Failed to load payment form. Please try again.");
        });
    }
  }, [open, clientSecret]);

  const handleSuccess = (paymentMethodId: string) => {
    toast.success("Card saved securely!");
    onPaymentMethodSaved(paymentMethodId);
    onOpenChange(false);
  };

  const handleError = (errorMsg: string) => {
    setError(errorMsg);
    toast.error(errorMsg);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
          <DialogDescription className="pt-2 space-y-2">
            <p>
              Your card will be securely saved but{" "}
              <strong>not charged now</strong>.
            </p>
            <p className="text-sm">
              Payment will only be processed after your service is completed to
              your satisfaction.
            </p>
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          {!clientSecret && !error && (
            <div className="text-center py-8 justify-center flex items-center">
              <Spinner />
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-4 rounded">
              {error}
            </div>
          )}

          {clientSecret && !error && (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: "stripe",
                },
              }}
            >
              <PaymentCardForm
                onSuccess={handleSuccess}
                onError={handleError}
              />
            </Elements>
          )}
        </div>

        <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
          🔒 Secured by Stripe. Your information is encrypted and secure.
        </div>
      </DialogContent>
    </Dialog>
  );
}

const BookingDetailsPage = () => {
  const router = useRouter();
  const { booking, payment } = useBookingStore();
  const updateBooking = useBookingStore((state) => state.updateBooking);

  const [consentChecked, setConsentChecked] = useState(false);
  const [termsChecked, setTermsChecked] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [paymentMethodId, setPaymentMethodId] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const payload = {
        fullName: payment.firstName,
        email: payment.email,
        phoneNumber: payment.phone,
        address: booking.address,
        city: booking.city,
        province: booking.state,
        county: booking.county,
        zipCode: booking.zipCode,
        services: booking.cleaningType || booking.serviceType,
        cleaners: "1",
        streetNumber: booking.streetNumber || "N/A",
        date: booking.date
          ? booking.date.toISOString().split("T")[0]
          : new Date().toISOString().split("T")[0],
        time: booking.time,
        serviceType: booking.serviceType || "Standard cleaning",
        duration: "Approx. 3 hours",
        addon:
          booking.selectedAddons.length > 0
            ? booking.selectedAddons.join(", ")
            : "none",
        specialInstructions: booking.specialRequests || "",
        frequency: booking.reoccurrence || "one-time",
        charge: booking.totalPrice?.toString() || "0",
        stripePaymentMethodId: paymentMethodId, // Include payment method ID
      };

      const response = await createBooking(payload);
      return response;
    },
    onSuccess: (res: any) => {
      if (res?.success && res?.data) {
        router.push(
          `/bookingSuccess?data=${encodeURIComponent(JSON.stringify(res.data))}`
        );
      } else {
        toast.info("Booking created but something went wrong.");
      }
    },
    onError: (error: any) => {
      console.error("Booking creation failed:", error);
      toast.error(error || "Failed to create booking. Please try again.");
    },
  });

  const handlePaymentMethodSaved = (pmId: string) => {
    setPaymentMethodId(pmId);
  };

  const handleConfirmBooking = () => {
    // Validation checks
    if (!consentChecked || !termsChecked) {
      toast.error("Please accept both consent and terms to continue.");
      return;
    }

    if (!paymentMethodId) {
      toast.error("Please add a payment method before confirming.");
      return;
    }

    mutate();
  };

  const isConfirmDisabled =
    isPending || !consentChecked || !termsChecked || !paymentMethodId;

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

      <div className="flex justify-center items-center mb-5">
        <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[829px]">
          <h1 className="font-semibold text-xl">Booking Summary</h1>

          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-5">
            {/* Personal Information */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <InfoRow
                  label="Name"
                  value={`${payment.firstName} ${payment.lastName}`}
                />
                <Divider />
                <InfoRow label="Phone number" value={payment.phone} />
                <Divider />
                <InfoRow label="Email Address" value={payment.email} />
                <Divider />
                <InfoRow label="Street Address" value={booking.address} />
                <Divider />
                <InfoRow label="City" value={booking.city} />
                <Divider />
                <InfoRow label="ZIP Code" value={booking.zipCode} />
                <Divider />
                <InfoRow label="County" value={booking.county} />
                <Divider />
                <InfoRow label="State" value={booking.state} />
              </div>
            </div>

            {/* Booking Information */}
            <div className="mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Booking Information
              </h2>
              <div className="space-y-3">
                <InfoRow
                  label="Service"
                  value={
                    booking.serviceType
                      ? booking.serviceType.replace("-", " ").toUpperCase()
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Cleaning Type"
                  value={
                    booking.cleaningType
                      ? booking.cleaningType.replace("-", " ")
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Square Footage"
                  value={
                    booking.squareFootage
                      ? `${booking.squareFootage} sqft`
                      : "N/A"
                  }
                />
                <Divider />
                <InfoRow
                  label="Date"
                  value={
                    booking.date
                      ? booking.date.toLocaleDateString()
                      : "Not selected"
                  }
                />
                <Divider />
                <InfoRow
                  label="Time"
                  value={booking.time ? booking.time : "Not selected"}
                />
                <Divider />
                <InfoRow
                  label="Duration"
                  value={booking.duration ? booking.duration : "Not selected"}
                />
                <Divider />
                <InfoRow
                  label="Reoccurrence"
                  value={booking.reoccurrence || "One-time"}
                />
                <Divider />
                <InfoRow label="Pets" value={booking.pets || "N/A"} />
                <Divider />
                <InfoRow
                  label="Add-ons"
                  value={
                    booking.selectedAddons.length > 0
                      ? booking.selectedAddons.join(", ")
                      : "No add-ons selected"
                  }
                />
                <Divider />
                <InfoRow
                  label="Special Requests"
                  value={booking.specialRequests || "None"}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-6"></div>

            {/* Total Summary */}
            <div className="flex justify-between text-lg font-semibold mb-6">
              <span>Total Estimate:</span>
              <span>
                $
                {booking.totalPrice
                  ? booking.totalPrice.toFixed(2)
                  : "Calculated at confirmation"}
              </span>
            </div>

            {/* Payment Method Section */}
            <div className="mb-6 p-4 bg-[#F9FAFB] dark:bg-[#0D0D0D] rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold text-base mb-1">
                    Payment Method
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {paymentMethodId
                      ? "Card saved securely"
                      : "Add a card to secure your booking"}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPaymentDialogOpen(true)}
                  className="min-w-[100px]"
                >
                  {paymentMethodId ? "Change Card" : "Add Card"}
                </Button>
              </div>

              {!paymentMethodId && (
                <div className="text-xs text-gray-500 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded border border-blue-200 dark:border-blue-800">
                  💳 <strong>No charge today:</strong> Your card will only be
                  charged after service completion. We collect payment details
                  now to secure your booking.
                </div>
              )}

              {paymentMethodId && (
                <div className="text-xs text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 p-3 rounded border border-green-200 dark:border-green-800">
                  Payment method secured. You'll be charged $
                  {booking.totalPrice?.toFixed(2) || "0.00"} after service
                  completion.
                </div>
              )}
            </div>

            {/* Consent Checkboxes */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms-consent"
                  checked={termsChecked}
                  onCheckedChange={(checked) =>
                    setTermsChecked(checked as boolean)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="terms-consent"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer"
                >
                  I have read and agree to DariMaids{" "}
                  <a
                    href="/terms-and-conditions"
                    className="text-[#6A4AAD] underline hover:text-[#5a3b99]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Terms & Conditions
                  </a>{" "}
                  and cancellation policy.
                </Label>
              </div>

              <div className="flex items-start space-x-3">
                <Checkbox
                  id="sms-consent"
                  checked={consentChecked}
                  onCheckedChange={(checked) =>
                    setConsentChecked(checked as boolean)
                  }
                  className="mt-1"
                />
                <Label
                  htmlFor="sms-consent"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer"
                >
                  By confirming, you authorize DariMaids to contact you via
                  SMS(Text) and/or email notifications at the contact
                  information provided regarding your booking, service
                  reminders, and related offers. You can reply 'STOP' to opt out
                  at any time or text 'HELP' for assistance. Message and data
                  rates may apply.{" "}
                  <a
                    href="/privacy-policy"
                    className="text-[#6A4AAD] underline hover:text-[#5a3b99]"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Privacy Policy
                  </a>
                </Label>
              </div>
            </div>

            {/* Confirm Button */}
            <div className="flex justify-center">
              <Button
                disabled={isConfirmDisabled}
                onClick={handleConfirmBooking}
                className="w-full text-white px-8 py-5 rounded-lg font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending ? <Spinner /> : "Confirm Booking"}
              </Button>
            </div>

            {/* {isConfirmDisabled && !isPending && (
              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-3">
                {!paymentMethodId && "Please add a payment method to continue"}
                {paymentMethodId &&
                  (!consentChecked || !termsChecked) &&
                  "Please accept all required terms"}
              </p>
            )} */}
          </div>
        </div>
      </div>

      {/* Discounts */}
      <div className="flex justify-center items-center">
        <div className="rounded-xl bg-[#F9FAFB] dark:bg-[#121212] px-6 py-5 w-[829px]">
          <h1 className="font-semibold text-xl">Discount Code</h1>
          <div className="mt-4 bg-white dark:bg-[#1A1A1A] rounded-xl p-4">
            <Input
              placeholder="Enter discount code"
              value={booking.discountCode}
              onChange={(e) => updateBooking("discountCode", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <PaymentDialog
        open={paymentDialogOpen}
        onOpenChange={setPaymentDialogOpen}
        onPaymentMethodSaved={handlePaymentMethodSaved}
      />
    </div>
  );
};

export default BookingDetailsPage;
