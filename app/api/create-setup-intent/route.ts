import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST() {
  try {
    // Create a SetupIntent to collect payment method details
    const setupIntent = await stripe.setupIntents.create({
      payment_method_types: ["card"],
      // Optionally attach to a customer
      // customer: 'cus_xxxxx',
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
