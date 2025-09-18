import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const { product, delivery } = await req.json();

    if (!product || !product._id || !product.currentPrice) {
      return NextResponse.json(
        { error: "Invalid product data" },
        { status: 400 }
      );
    }


    if (
      !delivery ||
      !delivery.name ||
      !delivery.phone ||
      !delivery.address ||
      !delivery.city ||
      !delivery.state ||
      !delivery.pincode
    ) {
      return NextResponse.json(
        { error: "Invalid delivery details" },
        { status: 400 }
      );
    }

    // 🔹 Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: product.name,
              images: product.image?.length ? [product.image[0]] : [],
            },
            unit_amount: Math.round(product.currentPrice * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        productId: product._id,
        customerName: delivery.name,
        customerPhone: delivery.phone,
        customerAddress: `${delivery.address}, ${delivery.city}, ${delivery.state}, ${delivery.pincode}`,
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
    });

    return NextResponse.json({ id: session.id });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


