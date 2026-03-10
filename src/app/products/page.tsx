import { cacheLife, cacheTag, updateTag } from "next/cache";
import { Product } from "@/types/products";

import { Suspense } from "react";
import ProductSkeleton from "../components/skelton/ProductSkelton";
import ProductPageClient from "../components/product/ProductPageClient";
import { revalidateTag } from "next/cache";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/hooks/hooks";
import fetchData from "@/utils/fetchData";
import { createPublicTRPCClient } from "@/utils/fetchServerData";

const page = async () => {
  "use cache";
  cacheTag("products");
  cacheLife("hours");
  const trpc = createPublicTRPCClient();
  const initialData = await trpc.products.getAllProducts.query({
    page: 1,
    limit: 20,
  });

  return (
    <div className="container-custom">
      {/* ONE Suspense boundary for client logic */}

      <Suspense
      fallback={
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-content-center">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        }
      >
        <ProductPageClient initialData={initialData} />
      </Suspense>
    </div>
  );
};

export default page;
