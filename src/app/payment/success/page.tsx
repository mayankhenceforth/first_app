"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

const Success = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Payment Successful 🎉
                </h1>

                <p className="text-gray-600 mb-8">
                    Thank you for your purchase! Your order has been placed and will be
                    processed soon. We’ve sent you an email confirmation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/product"
                        className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/orders"
                        className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Success;
