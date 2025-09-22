import { notFound } from "next/navigation";
import Link from "next/link";
import BackButton from "@/component/BackButton";

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
  status: "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  createdAt: string;
}

interface OrderPageProps {
  params: { id: string };
}

export default async function OrderPage({ params }: OrderPageProps) {
  const { id } = params;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
    const orders: Order[] = await res.json();
    const order = orders.find((o) => o._id === id);

    if (!order) return notFound();

    const statusColors: Record<string, string> = {
      Pending: "bg-yellow-100 text-yellow-800",
      Processing: "bg-blue-100 text-blue-800",
      Shipped: "bg-indigo-100 text-indigo-800",
      Delivered: "bg-green-100 text-green-800",
      Cancelled: "bg-red-100 text-red-800",
    };

    return (
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        {/* Back Button */}
        <BackButton href="/orders" label="Back to Orders" />

        <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>

        {/* Product Section */}
        <div className="flex flex-col md:flex-row gap-6 border rounded-xl shadow p-6 bg-white">
          <img
            src={order.product.image}
            alt={order.product.name}
            className="w-full md:w-48 h-48 object-cover rounded-lg border"
          />
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-gray-900">{order.product.name}</h2>
              <p className="text-gray-700 text-lg font-medium">₹{order.product.price}</p>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span
              className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-semibold ${statusColors[order.status]}`}
            >
              {order.status}
            </span>
          </div>
        </div>

        {/* Delivery Section */}
        <div className="border rounded-xl shadow p-6 bg-white">
          <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">Name</p>
              <p className="text-gray-600">{order.delivery.name}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Phone</p>
              <p className="text-gray-600">{order.delivery.phone}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Address</p>
              <p className="text-gray-600">{order.delivery.address}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">City</p>
              <p className="text-gray-600">{order.delivery.city}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">State</p>
              <p className="text-gray-600">{order.delivery.state}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Pincode</p>
              <p className="text-gray-600">{order.delivery.pincode}</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

// src/app/orders/[id]/page.tsx

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
    const orders: Order[] = await res.json();

    // Return array of params matching [id] in route
    return orders.map((order) => ({
      id: order._id,
    }));
  } catch (error) {
    console.error("Error fetching orders for static params:", error);
    return [];
  }
}

