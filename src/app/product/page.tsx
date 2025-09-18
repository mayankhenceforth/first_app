"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "@/actions/product";
import Link from "next/link";

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

  const fetchProducts = async (page = 1, limit = perPage) => {
    setLoading(true);
    try {
      const { data, pagination } = await getAllProducts(page, limit, {
        createdAt: true,
        order: -1,
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
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage - 1,
      }));
    }
  };

  const handleNext = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({
        ...prev,
        currentPage: prev.currentPage + 1,
      }));
    }
  };

  const handlePerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPerPage(Number(e.target.value));
    setPagination((prev) => ({ ...prev, currentPage: 1 }));
  };

  return (
    <div className="p-6 md:px-12 container mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center md:text-left">
        Products
      </h1>

      {/* Page Size Selector */}
      <div className="mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-gray-700">
          Products per page:{" "}
          <select
            value={perPage}
            onChange={handlePerPageChange}
            className="border border-gray-300 rounded p-1 focus:ring-2 focus:ring-blue-400"
          >
            {[6, 9, 12, 15, 18].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        <div className="text-gray-600 mt-2 md:mt-0">
          Page {pagination.currentPage} of {pagination.totalPages} (
          {pagination.totalProducts} products)
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
              <Link
                key={product._id}
                href={`/product/${product._id}`}
                className="block border rounded-lg p-4 shadow hover:shadow-lg transition hover:scale-105 bg-white"
              >
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-2"
                />
                <h2 className="text-lg font-semibold line-clamp-2 text-gray-800">
                  {product.name}
                </h2>
                <p className="text-gray-700 mt-1">
                  ₹{product.currentPrice}{" "}
                  <del className="text-red-400">{product.originalPrice}</del>
                </p>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center items-center gap-4 flex-wrap">
            <button
              onClick={handlePrev}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;
