import { createPublicTRPCClient } from "@/utils/fetchServerData";

export async function getProducts() {
  const trpc = createPublicTRPCClient();

  return trpc.products.getAllProducts.query({
    page: 1,
    limit: 20,
  });
}
