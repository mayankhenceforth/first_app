"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getAllOrders } from "@/actions/order";

interface Order {
  _id: string;
  product: {
    name: string;
    price: number;
    image: string;
  };
  delivery: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  status: "Paid" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const statusColors: Record<Order["status"], string> = {
    Paid: "text-green-600",
    Processing: "text-blue-600",
    Shipped: "text-indigo-600",
    Delivered: "text-green-700",
    Cancelled: "text-red-600",
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getAllOrders();
        setOrders(data);
      } catch (err) {
        console.error("Orders fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="p-6 text-gray-600">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return <p className="p-6 text-gray-600">No orders found.</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <Link
            key={order._id}
            href={`/orders/${order._id}`}
            className="block border rounded-lg p-4 shadow hover:shadow-md transition"
          >
            <div className="flex gap-4">
              <img
                src={order.product.image}
                alt={order.product.name}
                className="w-24 h-24 object-cover rounded-md border"
              />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-xl font-semibold">{order.product.name}</h2>
                  <p className="text-gray-600">₹{order.product.price}</p>
                  <p className="text-sm text-gray-500">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm mt-2">
                  <span className="font-semibold">Status:</span>{" "}
                  <span className={statusColors[order.status]}>{order.status}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
