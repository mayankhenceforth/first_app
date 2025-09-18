export interface Product {
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
  more_details: Record<string, string>;
}

export interface ProductResponse {
  data: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
  };
}