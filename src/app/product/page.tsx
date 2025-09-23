'use client';

import { useState, useEffect } from "react";
import { getAllProducts } from "@/actions/product";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  image: string[];
  currentPrice: number;
  originalPrice: number;
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
  });
  const [perPage, setPerPage] = useState(9);
  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchProducts = async (page = 1, limit = perPage) => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllProducts(page, limit, {
        createdAt: "true",
        order: "-1",
      });
      setProducts(data);
      setPagination(pagination);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts(pagination.currentPage, perPage);
  }, [pagination.currentPage, perPage]);

  const handlePrev = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  return (
    <div className="p-6 md:px-12 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Products
      </h1>

      {/* Page Size Selector */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Products per page:</span>
          <Select value={perPage.toString()} onValueChange={(value) => { setPerPage(Number(value)); setPagination(prev => ({ ...prev, currentPage: 1 })); }}>
            <SelectTrigger className="w-24 border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[6, 9, 12, 15, 18].map((num) => (
                <SelectItem key={num} value={num.toString()}>{num}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="text-gray-600 mt-2 md:mt-0">
          Page {pagination.currentPage} of {pagination.totalPages} ({pagination.totalProducts} products)
        </div>
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="flex gap-1">
            {[...Array(3)].map((_, idx) => (
              <span
                key={idx}
                className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
                style={{ animationDelay: `${idx * 0.2}s` }}
              ></span>
            ))}
          </div>
        </div>
      ) : products.length === 0 ? (
        <p className="text-center py-20 text-gray-500">No products found.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link key={product._id} href={`/product/${product._id}`}>
                <Card className="hover:shadow-lg transition hover:scale-105 cursor-pointer">
                  <CardHeader className="p-0">
                    <Image
                      src={product.image[0]}
                      alt={product.name}
                      width={500}
                      height={500}
                      className="w-full h-48 object-cover rounded-t-md"
                    />
                  </CardHeader>
                  <CardContent className="space-y-1">
                    <CardTitle className="text-lg line-clamp-2">{product.name}</CardTitle>
                    <p className="text-gray-700">
                      ₹{product.currentPrice} <del className="text-red-400">{product.originalPrice}</del>
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
            <Button onClick={handlePrev} disabled={pagination.currentPage === 1} variant="outline">
              Previous
            </Button>
            <Button onClick={handleNext} disabled={pagination.currentPage === pagination.totalPages} variant="outline">
              Next
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
