"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  _id: string;
  name: string;
  currentPrice: number;
  image: string[];
}

interface DeliveryFormProps {
  product: Product;
}

export default function DeliveryForm({ product }: DeliveryFormProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const stripe = await stripePromise;

      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product,
          delivery: form,
        }),
      });

      const data = await res.json();

      if (data.id) {
        await stripe?.redirectToCheckout({ sessionId: data.id });
      } else {
        alert("Checkout session failed. Please try again.");
      }
    } catch (error) {
      console.error("Stripe Checkout Error:", error);
      alert("Payment could not be processed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      {/* Product Summary */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src={product.image[0]}
          alt={product.name}
          width={100}
          height={100}
          className="w-30 h-30 object-cover rounded-md border"
        />
        <div>
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p className="text-gray-700 font-bold">₹{product.currentPrice}</p>
        </div>
      </div>

      {/* Delivery Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <Input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <Input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <Input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        />
        <Input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
        />
        <Input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700 transition"
        >
          {loading ? "Processing..." : "Place Order & Pay"}
        </Button>
      </form>
    </div>
  );
}
