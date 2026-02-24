import ProductDesc from "@/app/components/productDetails/ProductDesc";
import trpc from "@/utils/fetchServerData";
import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";

const DetailsEntry = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const data = await trpc.products.getSingleProduct.query({ id });
  console.log(data);
  return (
    <>
      <ProductDesc product={data.product} />
    </>
  );
};

export default DetailsEntry;
