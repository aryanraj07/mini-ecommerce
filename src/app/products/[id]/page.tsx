import DetailsEntry from "@/app/products/[id]/DetailsEntry";
import { Suspense } from "react";
import ProductDetailsSkeleton from "@/app/components/productDetails/ProductDetailsSkelton";
interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = ({ params }: PageProps) => {
  return <DetailsEntry params={params} />;
};

export default ProductDetailsPage;
