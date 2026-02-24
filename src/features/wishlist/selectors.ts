import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";

const selectwishlists = (state: RootState) => state.wishlist.wishlist;
export const makeSelectWishlisted = (id: number) =>
  createSelector([selectwishlists], (wishlist) => wishlist.includes(id));
export const makeSelectWishlistCount = createSelector(
  [selectwishlists],
  (wishlist) => wishlist.length,
);
