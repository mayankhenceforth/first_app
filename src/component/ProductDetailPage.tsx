"use client";

import { useState } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import ProductCard from "./ProductCard";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
    more_details: {}
}

interface ProductDetailPageProps {
    product: Product;
    suggestedProducts?: Product[];
    moreProducts?: Product[]
}

export default function ProductDetailPage({
    product,
    suggestedProducts = [],
    moreProducts = []
}: ProductDetailPageProps) {
    const [selectedImage, setSelectedImage] = useState(product.image[0]);

    return (
        <div className="conatiner max-w-6xl mx-auto px-6 py-10">
            {/* Product Main Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:h-[650px]">
                {/* Images */}
                <div className="h-full lg:sticky top-0">
                    <div className="w-full h-[500px] flex items-center justify-center rounded-xl shadow-md bg-white ">
                        {selectedImage && (
                            <img
                                src={selectedImage}
                                alt={product.name}

                                className="object-contain rounded-lg"
                            />
                        )}
                    </div>

                    <div className="flex gap-4 mt-4 overflow-x-auto justify-center">
                        {product.image.map((img, idx) => (
                            <img
                                key={idx}
                                src={img}
                                alt={`${product.name} thumbnail ${idx + 1}`}
                                onClick={() => setSelectedImage(img)}
                                className={`w-24 h-24 object-cover rounded-md border cursor-pointer transition ${selectedImage === img ? "border-black" : "border-gray-300"
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="overflow-y-scroll">
                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                    <p className="mt-4 text-gray-600 whitespace-pre-line">{product.description}</p>

                    <div className="mt-4 flex gap-6 text-lg font-bold text-gray-900">
                        <p>Unit: <span className="font-medium">{product.unit}</span></p>
                        <p>Stock: <span className="font-medium">{product.stock}</span></p>
                    </div>

                    <div className="mt-6 flex items-center gap-4">
                        <p className="text-2xl font-semibold text-gray-900">₹{product.currentPrice}</p>
                        <del className="text-gray-400">₹{product.originalPrice}</del>
                    </div>

                    <div className="mt-8 flex gap-4 flex-wrap">
                        <Button >Add To Cart</Button>
                        <Link href={`/delivery_details?productId=${product._id}`}

                            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow hover:bg-green-700 transition"
                        >
                            Buy Now with Stripe
                        </Link>

                    </div>

                    {/* More Features */}
                    {product.more_details && Object.keys(product.more_details).length > 0 && (
                        <div className="border-[1px] p-3 border-gray-200 rounded-xl flex flex-col gap-4 mt-6">
                            <h2 className="font-semibold text-lg text-gray-800">More Details</h2>
                            <div className="flex flex-col gap-2 my-2">
                                {Object.entries(product.more_details).map(([key, value], index) => (
                                    <div key={index} className="flex gap-2 items-baseline text-gray-700 capitalize">
                                        <p className="font-semibold text-md text-gray-800">{key}:</p>
                                        <p className="font-normal text-md text-gray-700 leading-loose">
                                            {value as string}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Suggested Products */}
            {suggestedProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">Suggested Products</h2>
                    <div className="flex gap-6 overflow-x-auto pb-2 flex-wrap ">
                        {suggestedProducts.map((p) => (
                            <ProductCard key={p._id} p={p} />
                        ))}
                    </div>
                </div>
            )}
            {/* Others Products */}
            {moreProducts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-6">More Products</h2>
                    <div className="flex gap-6 overflow-x-auto pb-2 flex-wrap">
                        {moreProducts.map((p) => (
                            <ProductCard key={p._id} p={p} />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
