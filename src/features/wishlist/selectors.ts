import { RootState } from "@/app/store";
import { WishlistItem } from "@/types/wishlist";
import { createSelector } from "@reduxjs/toolkit";
const selectWishlist = (state: RootState) => state.wishlist.wishlist;
const selectProduct = (state: RootState) => state.products.allproducts;
export const selectwishlistProductsWithData = createSelector(
  [selectWishlist, selectProduct],
  (wishlist, allproducts): WishlistItem[] =>
    //get the list of wishlist items
    // map the wishlist and get the product from finding from the allproducts
    //return the details from the product
    wishlist
      .map((wishlistItem) => {
        const product = allproducts.find((item) => item.id === wishlistItem);
        return product
          ? {
              id: product.id,
              image: product.image,
              title: product.title,
              price: product.price,
            }
          : null;
      })
      .filter((item): item is WishlistItem => item !== null)
);
