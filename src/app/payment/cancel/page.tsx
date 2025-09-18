"use client";

import Link from "next/link";
import { XCircle } from "lucide-react";

const CancelPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md text-center">
        {/* Cancel Icon */}
        <XCircle className="w-20 h-20 text-red-500 mx-auto mb-6" />

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Payment Canceled ❌
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-8">
          Your payment was canceled. No money has been deducted from your
          account. You can try again or continue browsing products.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/products"
            className="px-6 py-3 rounded-lg bg-black text-white hover:bg-gray-800 transition"
          >
            Continue Shopping
          </Link>
          <Link
            href="/cart"
            className="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
          >
            Retry Payment
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CancelPage;
