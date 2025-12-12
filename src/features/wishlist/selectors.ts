import { RootState } from "@/app/store";
import { WishlistType } from "@/types/wishlist";

import { createSelector } from "@reduxjs/toolkit";
const selectWishlist = (state: RootState) => state.wishlist.wishlist;
const selectProduct = (state: RootState) => state.products.allproducts;
export const selectwishlistProductsWithData = createSelector(
  [selectWishlist, selectProduct],
  (wishlist, allproducts): WishlistType[] =>
    wishlist
      .map((wishlistItem) => {
        const product = allproducts.find((item) => item.id === wishlistItem);
        return product
          ? {
              id: product.id,
              title: product.title,
              image: product.image,
              price: product.price,
            }
          : null;
      })
      .filter((item): item is WishlistType => item !== null)
);

export const isWIshlistedSelector = (productId: number) => (state: RootState) =>
  state.wishlist.wishlist.includes(productId);
