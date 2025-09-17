"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string[];
  description: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  const getAllProduct = async () => {
    try {
      const res = await axios.post(
        "https://server-two-brown.vercel.app/api/product/list",
        {}
      );
      setProducts(res.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer"
              onClick={() => router.push(`/product/${product._id}`)}
            >
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md mb-2"
              />
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-gray-600">
                ₹{product.currentPrice}{" "}
                <del className="text-red-400">₹{product.originalPrice}</del>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
