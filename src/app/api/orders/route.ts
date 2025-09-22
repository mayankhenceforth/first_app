import { NextResponse } from "next/server";

const image = 'https://res.cloudinary.com/dmedhsl41/image/upload/v1756895682/user_apis/download%20%281%29.png'

export const demoOrders = [
  {
    _id: "ord_001",
    product: {
      name: "iPhone 15 Pro",
      price: 129999,
      image: image,
    },
    delivery: {
      name: "Mayank Maurya",
      phone: "9876543210",
      address: "123 MG Road",
      city: "Lucknow",
      state: "UP",
      pincode: "226001",
    },
    status: "Paid",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ord_002",
    product: {
      name: "Samsung Galaxy S24",
      price: 99999,
      image: image,
    },
    delivery: {
      name: "Rahul Sharma",
      phone: "9123456780",
      address: "45 Nehru Nagar",
      city: "Delhi",
      state: "Delhi",
      pincode: "110001",
    },
    status: "Shipped",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ord_003",
    product: {
      name: "MacBook Pro M3",
      price: 189999,
      image: image,
    },
    delivery: {
      name: "Priya Singh",
      phone: "9871203456",
      address: "7 Civil Lines",
      city: "Kanpur",
      state: "UP",
      pincode: "208001",
    },
    status: "Processing",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ord_004",
    product: {
      name: "Sony WH-1000XM5",
      price: 29999,
      image: image,
    },
    delivery: {
      name: "Ankit Verma",
      phone: "9998765432",
      address: "22 Park Street",
      city: "Kolkata",
      state: "WB",
      pincode: "700016",
    },
    status: "Delivered",
    createdAt: new Date().toISOString(),
  },
  {
    _id: "ord_005",
    product: {
      name: "Apple Watch Ultra 2",
      price: 89999,
      image: image,
    },
    delivery: {
      name: "Sneha Patel",
      phone: "9823456789",
      address: "11 Satellite Area",
      city: "Ahmedabad",
      state: "Gujarat",
      pincode: "380015",
    },
    status: "Paid",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(demoOrders);
}

// Optional: Get order by ID
export async function getOrderById(id: string) {
  return demoOrders.find((order) => order._id === id) || null;
}
