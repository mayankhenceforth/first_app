'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart, ArrowLeft, Zap } from 'lucide-react';
import { Product } from '@/types/product';

interface ProductDetailPageProps {
  product: Product;
  suggestedProducts?: Product[];
  moreProducts?: Product[];
}

export default function ProductDetailPage({
  product,
  suggestedProducts = [],
  moreProducts = [],
}: ProductDetailPageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(product.image[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [zoom, setZoom] = useState({ show: false, x: 0, y: 0 });

  const discountPercentage =
    product.originalPrice > product.currentPrice
      ? Math.round(((product.originalPrice - product.currentPrice) / product.originalPrice) * 100)
      : 0;

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(`Added ${quantity} ${product.name} to cart`);
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoom({ show: true, x, y });
  };

  const handleMouseLeave = () => {
    setZoom({ show: false, x: 0, y: 0 });
  };

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-700 transition-colors">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-gray-700 transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 max-w-[200px] truncate" title={product.name}>
          {product.name}
        </span>
      </div>

      {/* Back Button for Mobile */}
      <div className="md:hidden mb-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/products">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
          </Link>
        </Button>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        {/* Images Section */}
        <div className="flex flex-col lg:flex-row-reverse gap-5 justify-center items-center lg:items-start">
          {/* Main Image with Zoom */}
          <div
            className="relative max-w-[500px] md:h-[600px] aspect-square rounded-xl bg-gray-100 flex items-center justify-center overflow-hidden shadow-md"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-label="Product image with zoom"
          >
            {selectedImage ? (
              <Image
                src={selectedImage}
                alt={product.name}
                width={500}
                height={500}
                sizes="(max-width: 768px) 100vw, 500px"
                className={`object-contain w-full h-full transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'
                  }`}
                onLoadingComplete={() => setImageLoading(false)}
                onError={() => setImageLoading(false)}
              />
            ) : (
              <div className="text-gray-500 text-center">No image available</div>
            )}

            {/* Zoomed Image */}
            {zoom.show && selectedImage && (
              <div className="absolute top-0 left-full ml-4 w-64 h-64 border border-gray-300 rounded-lg overflow-hidden hidden lg:block pointer-events-none">
                <div
                  className="w-full h-full bg-no-repeat bg-contain"
                  style={{
                    backgroundImage: `url(${selectedImage})`,
                    backgroundPosition: `${zoom.x}% ${zoom.y}%`,
                    backgroundSize: '200%',
                  }}
                />
              </div>
            )}

            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"
                  aria-label="Loading image"
                ></div>
              </div>
            )}

            {/* Discount Badge */}
            {discountPercentage > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {discountPercentage}% OFF
              </div>
            )}
          </div>

          {/* Thumbnails */}
          <div className="mt-4 flex lg:flex-col justify-center gap-3 pb-2">
            {product.image.length > 0 ? (
              product.image.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedImage(img);
                    setImageLoading(true);
                  }}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-md border-2 overflow-hidden transition-all ${selectedImage === img
                      ? 'border-blue-500 ring-2 ring-blue-200'
                      : 'border-gray-300 hover:border-gray-400'
                    }`}
                  aria-label={`Select image ${idx + 1}`}
                >
                  <Image src={img} alt={`${product.name} thumbnail ${idx + 1}`} fill className="object-cover" />
                </button>
              ))
            ) : (
              <div className="text-gray-500 text-sm">No thumbnails available</div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col lg:h-[650px] overflow-y-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>

          {/* Price */}
          <div className="flex items-center gap-4 my-4">
            <p className="text-3xl font-bold text-gray-900">₹{product.currentPrice.toLocaleString()}</p>
            {product.originalPrice > product.currentPrice && (
              <del className="text-xl text-gray-500">₹{product.originalPrice.toLocaleString()}</del>
            )}
          </div>

          {/* Stock */}
          <div className="mb-6">
            {product.stock > 0 ? (
              <p className="text-green-600 font-medium flex items-center">
                <Zap className="w-4 h-4 mr-1" /> In Stock ({product.stock} available)
              </p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {product.description || 'No description available.'}
            </p>
          </div>

          {/* Unit */}
          <div className="mb-6">
            <p className="text-gray-700">
              <span className="font-medium">Unit:</span> {product.unit || 'N/A'}
            </p>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1 || product.stock === 0}
                className="p-2 rounded-l-md border border-gray-300 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 border-t border-b border-gray-300 bg-white min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity >= product.stock || product.stock === 0}
                className="p-2 rounded-r-md border border-gray-300 bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Increase quantity"
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
              aria-label="Add to cart"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </>
              )}
            </Button>

            <Button
              asChild
              size="lg"
              className="flex-1 bg-green-600 hover:bg-green-700"
              disabled={product.stock === 0}
            >
              <Link
                href={`/delivery_details?productId=${product._id}&quantity=${quantity}`}
                className="flex items-center justify-center gap-2"
                aria-label="Buy now"
              >
                Buy Now
              </Link>
            </Button>
          </div>

          {/* More Details */}
          {product.more_details && Object.keys(product.more_details).length > 0 && (
            <div className="border rounded-lg p-5 bg-gray-50">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.more_details).map(([key, value], index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-sm font-medium text-gray-600 capitalize">{key}</span>
                    <span className="text-gray-900">{String(value) || 'N/A'}</span>
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
