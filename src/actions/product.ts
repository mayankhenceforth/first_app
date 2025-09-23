import { Product } from "@/types/product";
import axios from "axios";
import { setupCache } from "axios-cache-interceptor";

interface ProductResponse {
  data: Product[];
  pagination: {
    totalProducts: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
  fromCache?: boolean;
}

const api = setupCache(axios.create(), {
  ttl: 1000 * 60,
});

export async function getAllProducts(
  page: number = 1,
  limit: number = 10,
  sort: Record<string, string> = {}
): Promise<ProductResponse> {
  try {
    const res = await api.post(
      `https://server-two-brown.vercel.app/api/product/list?page=${page}&limit=${limit}`,
      { sort }
    );

    return {
      data: res.data.data,
      pagination: res.data.pagination || {
        totalProducts: res.data.totalProducts,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        limit: res.data.limit,
      },
      fromCache: res.cached
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    return {
      data: [],
      pagination: { totalProducts: 0, totalPages: 0, currentPage: page, limit },
      fromCache: false,
    };
  }
}

export async function getProductById(id: string) {
  try {
    const res = await api.get(
      `https://server-two-brown.vercel.app/api/product/view/${id}`
    );

    return {
      data: res.data.data,
      fromCache: res.cached,
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { data: null, fromCache: false };
  }
}

// Get products by category
export async function getProductByCategory(c_id: string) {
  try {
    const res = await api.post(
      `https://server-two-brown.vercel.app/api/product/productBycategory`,
      { id: c_id }
    );

    return {
      data: res.data.data,
      fromCache: res.cached,
    };
  } catch (error) {
    console.error("Error fetching category products:", error);
    return { data: [], fromCache: false };
  }
}