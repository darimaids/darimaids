import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: 5000, // $50
            product_data: {
              name: "Cleaning Service Deposit",
            },
          },
          quantity: 1,
        },
      ],

      mode: "payment",
      return_url:
        "https://www.darimaids.com/return?session_id={CHECKOUT_SESSION_ID}",
    });

    return NextResponse.json({
      clientSecret: session.client_secret,
    });
  } catch (error: any) {
    console.error("Stripe error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
