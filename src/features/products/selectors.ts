import { RootState } from "@/app/store";
import { Product } from "@/types/products";
import { createSelector } from "@reduxjs/toolkit";
import { CartItem } from "../cart/cartSlice";
import { CartProduct } from "@/types/cartItem";
const cartSelector = (state: RootState) => state.cart.cart;
const productSelector = (state: RootState) => state.products.allproducts;

export const selectCartWithDetails = createSelector(
  [cartSelector, productSelector],
  (cart, allproducts) =>
    cart
      .map((cartItem) => {
        const product = allproducts.find((item) => item.id === cartItem.id);
        return product ? { ...product, quantity: cartItem.quantity } : null;
      })
      .filter((item): item is CartProduct => item !== null)
);
export const createCartSummary = createSelector(
  [selectCartWithDetails],
  (cart: CartProduct[]) => {
    const subTotal = cart.reduce(
      (sum: number, item) => sum + item?.price * item.quantity,
      0
    );
    const tax = subTotal * 0.1;
    const shipping = subTotal > 0 ? 0 : 0;
    const total = subTotal + tax + shipping;
    return { subTotal, tax, shipping, total };
    //get the cartItems with data
  }
);
export const selectCartTotalCount = createSelector(
  [cartSelector],
  (cart): number => cart.length
);
