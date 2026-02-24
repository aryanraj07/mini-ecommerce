import { RootState } from "@/app/store";
import { createSelector } from "@reduxjs/toolkit";
import { CartProduct } from "@/types/cartItem";
const cartSelector = (state: RootState) => state.cart.cart;

export const selectCartTotalCount = (state: RootState) =>
  state.cart.cart.length;

export const isItemInCart = (id: number) => (state: RootState) =>
  state.cart.cart.some((item) => item.id === id);
