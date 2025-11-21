"use client";

import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51SJEfSPswVTOHNbwc1khNBWmcW7BeprU7JOGnoDKcMscDpqpsIQSCjpS2IKGaFV1Bm2TgrwK1VLzMZOR1FWCtq5U002l1v5XNh"
);

export default function StripeProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // No provider wrapping needed - Elements will be used per page
  return <>{children}</>;
}

export { stripePromise };
