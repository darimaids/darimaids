import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const { paymentMethodId, userId } = await request.json();

    // Here you would typically:
    // 1. Get or create a Stripe customer for this user
    // 2. Attach the payment method to the customer
    // 3. Save the payment method ID in your database

    // Example: Create a customer and attach payment method
    const customer = await stripe.customers.create({
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
      metadata: {
        userId: userId || "guest",
      },
    });

    // TODO: Save customer.id and paymentMethodId to your database
    // associated with the user

    return NextResponse.json({
      success: true,
      customerId: customer.id,
      message: "Payment method saved successfully",
    });
  } catch (err: any) {
    console.error("Error saving payment method:", err);
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
