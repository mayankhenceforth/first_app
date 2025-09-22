'use server'
import { demoOrders } from "@/app/api/orders/route";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
export async function getAllOrders() {
    const res = await axios.get(`${baseUrl}/api/orders`);
    return res.data;
}

export async function getOrderById(id: string) {
   
}
