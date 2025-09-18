// app/product/[id]/page.tsx

import ProductDetailPage from "@/component/ProductDetailPage";
import { getProductById, getProductByCategory, getAllProducts } from "@/actions/product";
import BackButton from "@/component/BackButton";

interface Props {
  params: { id: string };
}

// Pre-render pages at build time
export async function generateStaticParams() {
  const products = await getAllProducts(1, 100); // Fetch first 100 products
  return products.data.map((product) => ({
    id: product._id,
  }));
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductById(params.id);

  if (!product) {
    return (
      <div className="text-center py-20 text-red-500">
        Product not found or failed to load.
      </div>
    );
  }

  // Suggested products
  const suggestedProducts =
    product.data.category?.length > 0
      ? await getProductByCategory(product.data.category[0]._id)
      : [];

  // More products
  const otherProductResponse = await getAllProducts();
  const moreProducts = Array.isArray(otherProductResponse.data)
    ? otherProductResponse.data
    : [];

  return (
    <div >
      <ProductDetailPage
        product={product.data}
        suggestedProducts={Array.isArray(suggestedProducts) ? suggestedProducts : suggestedProducts?.data}
        moreProducts={moreProducts}
      />
    </div>
  );
}