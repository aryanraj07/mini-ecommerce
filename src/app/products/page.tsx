import { Suspense } from "react";
import ProductSkeleton from "@/app/components/skelton/ProductSkelton";
import ProductPageClient from "@/app/components/product/ProductPageClient";
import { getProducts } from "@/helpers/getProducts";

export default async function Page() {
  // "use cache";

  // cacheTag("products");
  // cacheLife("hours");

  // const trpc = createPublicTRPCClient();

  // const initialData = await trpc.products.getAllProducts.query({
  //   page: 1,
  //   limit: 20,
  // });
  const initialData = await getProducts();

  return (
    <div className="container-custom">
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
}
