"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string[];
  description: string;
}

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (!id) return;
    console.log(id)

    axios
      .get(`https://server-two-brown.vercel.app/api/product/view/${id}`)
      .then((res) => {
        console.log("✅ API Request:", res.config.url);
        setProduct(res.data.data);
      })
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <img
        src={product.image[0]}
        alt={product.name}
        className="w-64 h-64 object-cover rounded-md mb-4"
      />
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <p className="mt-4 text-lg">
        ₹{product.currentPrice}{" "}
        <del className="text-red-400">₹{product.originalPrice}</del>
      </p>
    </div>
  );
};

export default ProductDetailPage;
