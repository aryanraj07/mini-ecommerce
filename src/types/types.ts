import type { inferRouterOutputs } from "@trpc/server";
import { AppRouter } from "api-types";
type RouterOutput = inferRouterOutputs<AppRouter>;
export type User = RouterOutput["users"]["me"];
export type ProductsOutput = RouterOutput["products"]["getAllProducts"];
export type ProductItem =
  RouterOutput["products"]["getSingleProduct"]["product"];
export type WishlistItem = RouterOutput["wishlistItems"]["getWishlist"];
export type ReviewItem = NonNullable<
  RouterOutput["products"]["getSingleProduct"]["product"]["reviews"]
>[number];
export type TagItem = NonNullable<
  RouterOutput["products"]["getSingleProduct"]["product"]["tags"]
>[number];
export type ProductPreview = NonNullable<
  RouterOutput["products"]["getAllProducts"]["products"]
>[number];
export type CartItem = NonNullable<
  RouterOutput["cartItem"]["getCart"]["cartItem"]
>[number];
export type SummaryType = RouterOutput["cartItem"]["getCartSummary"];
export type FilterDataOutput = RouterOutput["filters"]["getFilterData"];
export type OrderItem = NonNullable<
  RouterOutput["order"]["getMyOrders"]
>[number];
export type OrderItemItem = NonNullable<
  RouterOutput["order"]["getMyOrders"]
>[number];
