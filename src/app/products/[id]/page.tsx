import DetailsEntry from "@/app/products/[id]/DetailsEntry";
import ProductSkeleton from "@/app/components/skelton/ProductSkelton";
import { Suspense } from "react";
interface PageProps {
  params: Promise<{ id: string }>;
}

const ProductDetailsPage = ({ params }: PageProps) => {
  
  return (
    <Suspense fallback={<ProductSkeleton />}>
      <DetailsEntry params={params} />
    </Suspense>
  );
};

export default ProductDetailsPage;
