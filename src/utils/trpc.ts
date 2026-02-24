// import { createTRPCReact } from "@trpc/react-query";
import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "api-types";
export const { TRPCProvider, useTRPC, useTRPCClient } =
  createTRPCContext<AppRouter>();
// import type { AppRouter } from "../../../../Ecommerce/app/mini-ecommerce-backend/src/server/index";
