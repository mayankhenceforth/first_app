"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeliveryForm from "@/component/DeliveryForm";
import { getProductById } from "@/actions/product";

export default function DeliveryDetailsPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  console.log('product id:',productId)

  useEffect(() => {
    if (productId) {
       getProductById(productId).then((res) => {
        setProduct(res.data);
        setLoading(false);
      });
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-red-500">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Delivery Details</h1>
      <DeliveryForm product={product} />
    </div>
  );
}
