import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import { AppRouter } from "api-types";

export function createPublicTRPCClient() {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: process.env.BACKEND_URL + "/trpc",
      }),
    ],
  });
}

export function createServerTRPCClient(cookie: string | null) {
  return createTRPCProxyClient<AppRouter>({
    links: [
      httpBatchLink({
        url: "http://localhost:8000/trpc",
        fetch(url, options) {
          return fetch(url, {
            ...options,
            headers: {
              ...options?.headers,
              cookie: cookie ?? "",
            },
          });
        },
      }),
    ],
  });
}
