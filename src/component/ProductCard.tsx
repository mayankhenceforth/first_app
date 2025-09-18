import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  _id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string[];
}

interface ProductCardProps {
  p: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ p }) => {
  return (
    <Link
      href={`/product/${p._id}`}
      className="w-56 p-2 border border-gray-200 rounded-lg shadow hover:shadow-xl transition flex-shrink-0"
    >
      <div className="relative w-full h-40">
        <Image
          src={p.image?.[0] || "/placeholder.png"}
          alt={p.name}
          fill
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="p-3">
        <h3 className="text-lg font-semibold line-clamp-2">{p.name}</h3>
        <div className="flex gap-2">
          <p className="text-gray-600 mt-1">₹{p.currentPrice}</p>
          <del>
            <p className="text-red-400 mt-1">₹{p.originalPrice}</p>
          </del>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
