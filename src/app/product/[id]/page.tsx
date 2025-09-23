
import ProductDetailPage from "@/component/ProductDetailPage";
import { getProductById, getProductByCategory, getAllProducts } from "@/actions/product";
import { Product } from "@/types/product";

interface Props {
  params: { id: string };
}

export async function generateStaticParams() {
  const response = await getAllProducts(1, 100); 
  const products = Array.isArray(response.data) ? response.data : [];

  return products.map((product) => ({
    id: product._id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const { id } = params;

  const productResponse = await getProductById(id);
  const product = productResponse?.data;

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product not found or failed to load.
      </div>
    );
  }

  let suggestedProducts: Product[] = [];
  if (product.category?.length) {
    const suggestedResponse = await getProductByCategory(product.category[0]._id);
    suggestedProducts = Array.isArray(suggestedResponse?.data)
      ? suggestedResponse.data
      : [];
  }


  const otherResponse = await getAllProducts();
  const moreProducts:Product[] = Array.isArray(otherResponse?.data)
    ? otherResponse.data.filter((p) => p._id !== id)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <ProductDetailPage
        product={product}
        suggestedProducts={suggestedProducts}
        moreProducts={moreProducts as Product[]}
      />
    </div>
  );
}
