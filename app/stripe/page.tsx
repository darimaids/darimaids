// page to test the stripe card ssave integration

"use client";

import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { stripePromise } from "@/provider/StripeProvider";

// IMPORTANT: This uses SetupIntent to collect card info WITHOUT charging

// Component that contains the form
function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    // Confirm the setup
    const { error: submitError, setupIntent } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/return`,
      },
      redirect: "if_required", // Don't redirect, handle success here
    });

    if (submitError) {
      setError(submitError.message || "An error occurred");
      setLoading(false);
    } else if (setupIntent && setupIntent.status === "succeeded") {
      setSuccess(true);
      setLoading(false);

      // Save the payment method ID to your database
      console.log("Payment method ID:", setupIntent.payment_method);

      // You can now save this payment_method ID to your database
      // and use it later to charge the customer
      await fetch("/api/save-payment-method", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: setupIntent.payment_method,
          // userId: yourUserId, // Add your user ID here
        }),
      });
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="text-green-600 text-xl font-semibold mb-2">
          ✓ Card saved successfully!
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Your payment method has been securely saved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement options={{ layout: "accordion" }} />

      {error && (
        <div className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded">
          {error}
        </div>
      )}

      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : "Save Card"}
      </Button>
    </form>
  );
}

// Main component
const StripeTest = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Fetch the SetupIntent client secret
    fetch("/api/create-setup-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret))
      .catch((err) => console.error("Error:", err));
  }, []);

  if (!clientSecret) {
    return (
      <div className="py-12 px-4 text-center">
        <div className="animate-pulse">Loading payment form...</div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 lg:px-[286px] bg-white dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-2">Add Payment Method</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        Your card information will be securely saved for future bookings.
      </p>

      <Elements
        stripe={stripePromise}
        options={{
          clientSecret,
          appearance: {
            theme: "stripe",
          },
        }}
      >
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default StripeTest;
