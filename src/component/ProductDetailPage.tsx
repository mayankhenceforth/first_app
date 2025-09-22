"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart, ArrowLeft, Zap } from "lucide-react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  _id: string;
  name: string;
  currentPrice: number;
  originalPrice: number;
  image: string[];
  description: string;
  unit: string;
  stock: number;
  category?: string[];
  subCategory?: string[];
  more_details: {};
}

interface ProductDetailPageProps {
  product: Product;
  suggestedProducts?: Product[];
  moreProducts?: Product[];
}

export default function ProductDetailPage({
  product,
  suggestedProducts = [],
  moreProducts = []
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState(product.image[0]);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.currentPrice) / product.originalPrice) * 100
  );

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
   console.log("Product add the cart")
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/product" className="hover:text-gray-700 transition-colors">
          Product
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 truncate">{product.name}</span>
      </div>

      {/* Back Button for Mobile */}
      <div className="md:hidden mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </Button>
      </div>

      {/* Product Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Images Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-5 justify-center items-center lg:items-start">
          {/* Main Image */}
          <div className="relative max-w-[500px] md:h-[600px] aspect-square rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-md">
            {selectedImage && (
              <img
                src={selectedImage}
                alt={product.name}
                className={`object-contain w-full h-full transition-opacity duration-300 ${
                  imageLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setImageLoading(false)}
              />
            )}
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          <div className="mt-4 flex lg:flex-col justify-center gap-3 pb-2">
            {product.image.map((img, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedImage(img);
                  setImageLoading(true);
                }}
                className={`flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all ${
                  selectedImage === img 
                    ? "border-blue-500 ring-2 ring-blue-200" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={img}
                  alt={`${product.name} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col lg:h-[650px] overflow-y-scroll">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
          
          {/* Price Section */}
          <div className="flex items-center gap-4 my-4">
            <p className="text-3xl font-bold text-gray-900">₹{product.currentPrice.toLocaleString()}</p>
            {product.originalPrice > product.currentPrice && (
              <del className="text-xl text-gray-500">₹{product.originalPrice.toLocaleString()}</del>
            )}
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-medium flex items-center">
                <Zap className="w-4 h-4 mr-1" />
                In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>

          {/* Unit Information */}
          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Unit:</span> {product.unit}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity <= 1}
                className="p-2 rounded-l-md border border-gray-300 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300 bg-white min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity >= product.stock}
                className="p-2 rounded-r-md border border-gray-300 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isLoading}
              size="lg"
              className="flex-1 flex items-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add To Cart
                </>
              )}
            </Button>
            
            <Button asChild size="lg" className="flex-1 bg-green-600 hover:bg-green-700">
              <Link 
                href={`/delivery_details?productId=${product._id}&quantity=${quantity}`}
                className="flex items-center justify-center gap-2"
              >
                Buy Now
              </Link>
            </Button>
          </div>

          {/* More Details Section */}
          {product.more_details && Object.keys(product.more_details).length > 0 && (
            <div className="border rounded-lg p-5 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.more_details).map(([key, value], index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600 capitalize">{key}</span>
                    <span className="text-gray-900">{value as string}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Suggested Products */}
      {suggestedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">Suggested Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {suggestedProducts.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        </section>
      )}

      {/* More Products */}
      {moreProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {moreProducts.map((p) => (
              <ProductCard key={p._id} p={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}