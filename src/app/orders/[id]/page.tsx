
import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "@/component/BackButton";
import Image from "next/image";

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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`, {
      cache: "no-store",
    });
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
        <BackButton href="/orders" label="Back to Orders" />

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-gray-900">Order Details</h1>

        {/* Product Card */}
        <Card className="flex flex-col md:flex-row gap-6 p-6">
          <Image
            src={order.product.image}
            alt={order.product.name}
            width={300}
            height={300}
            className="w-full md:w-1/3 object-cover"
          />
          
          <CardContent className="flex-1 flex flex-col justify-between">
            <div className="space-y-2">
              <CardHeader className="p-0">
                <CardTitle className="text-2xl font-semibold">{order.product.name}</CardTitle>
              </CardHeader>
              <p className="text-gray-700 text-lg font-medium">₹{order.product.price}</p>
              <p className="text-gray-500 text-sm">
                Ordered on: {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <Badge className={`mt-4 ${statusColors[order.status]}`}>
              {order.status}
            </Badge>
          </CardContent>
        </Card>

        {/* Delivery Details Card */}
        <Card className="p-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-4">Delivery Details</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          </CardContent>
        </Card>

        {/* Optional Actions */}
        <div className="flex gap-4">
          <Link href="/orders">
            <Button variant="secondary">Back to Orders</Button>
          </Link>
          {order.status !== "Cancelled" && (
            <Button variant="destructive">Cancel Order</Button>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error(error);
    return notFound();
  }
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/orders`);
    const orders: Order[] = await res.json();

    return orders.map((order) => ({ id: order._id }));
  } catch (error) {
    console.error("Error fetching orders for static params:", error);
    return [];
  }
}
