import type { inferRouterOutputs, inferRouterInputs } from "@trpc/server";
import { AppRouter } from "api-types";
type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;
export type User = RouterOutput["users"]["me"];
export type ProductsOutput = RouterOutput["products"]["getAllProducts"];
export type ProductItem =
  RouterOutput["products"]["getSingleProduct"]["product"];
export type WishlistItem = RouterOutput["wishlistItems"]["getWishlist"];
export type ReviewItem = NonNullable<
  RouterOutput["products"]["getSingleProduct"]["product"]["reviews"]
>[number];
export type MeOutput = RouterOutput["users"]["me"];
export type TagItem = NonNullable<
  RouterOutput["products"]["getSingleProduct"]["product"]["tags"]
>[number];
export type ProductPreview = NonNullable<
  RouterOutput["products"]["getAllProducts"]["products"]
>[number];

// cart
export type CartOutput = RouterOutput["cartItem"]["getCart"];
export type CartItem = NonNullable<
  RouterOutput["cartItem"]["getCart"]["cartItem"]
>[number];
export type CartItems = RouterOutput["cartItem"]["getCart"];
export type CartSummary = RouterOutput["cartItem"]["getCartSummary"];
export type CheckoutOutput = RouterOutput["order"]["checkout"];

export type AddToCartInput = RouterInputs["cartItem"]["addToCart"];
export type UpdateCartInput = RouterInputs["cartItem"]["updateQuantity"];
export type RemoveCartInput = RouterInputs["cartItem"]["removeFromCart"];
export type AddToWishlist = RouterInputs["wishlistItems"]["addToWishlist"];
export type RemoveWishlist =
  RouterInputs["wishlistItems"]["removeFromWishList"];
export type SummaryType = RouterOutput["cartItem"]["getCartSummary"];
export type FilterDataOutput = RouterOutput["filters"]["getFilterData"];
export type OrdersOutput = RouterOutput["order"]["getMyOrders"];
export type OrderItem = NonNullable<
  RouterOutput["order"]["getMyOrders"]
>[number];
export type OrderItemItem = NonNullable<
  RouterOutput["order"]["getMyOrders"]
>[number];

// login
export type UsersendOtpInput = RouterInputs["users"]["sendOtp"];
export type UserVerifyOtpInput = RouterInputs["users"]["verifyOtp"];
export type SendOtpOutput = RouterOutput["users"]["sendOtp"];
export type VerifyOtpOutput = RouterOutput["users"]["verifyOtp"];
// order
export type OrderItem = RouterOutput["order"]["getOrdderById"];
