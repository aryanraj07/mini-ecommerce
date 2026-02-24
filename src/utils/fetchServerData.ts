import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "api-types";

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:8000/trpc",
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
    }),
  ],
});
export default trpc;
