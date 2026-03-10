"use client";
import ProductCard from "../common/ProductCard";
import ProductSkeleton from "../skelton/ProductSkelton";
import { ProductPreview, ProductsOutput } from "@/types/types";
interface ProductGridProps {
  products: ProductPreview[];
  isFetching: boolean;
}
const ProductGrid = ({ products, isFetching }: ProductGridProps) => {
  if (isFetching && products.length === 0) {
    return [...Array(8)].map((_, i) => <ProductSkeleton key={i} />);
  }

  if (!products?.length) {
    return <p>No products matched your search</p>;
  }
  return (
    <>
      {products.map((product: ProductPreview) => (
        <li key={product.id}>
          <ProductCard product={product} showRemove={false} variant="default" />
        </li>
      ))}
    </>
  );
};

export default ProductGrid;
