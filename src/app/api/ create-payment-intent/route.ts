import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { product, delivery } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: product.currentPrice * 100,
      currency: "inr",
      automatic_payment_methods: { enabled: true },
      metadata: {
        productId: product._id,
        customerName: delivery.name,
        customerPhone: delivery.phone,
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
