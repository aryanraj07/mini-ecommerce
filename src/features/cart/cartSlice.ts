"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  quantity: number;
}
interface CartState {
  cart: CartItem[];
}
const initialState: CartState = {
  cart: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((item) => item.id === productId);

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.cart.push({ id: productId, quantity: 1 });
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((item) => item.id === productId);
      if (!existingProduct) return;

      if (existingProduct.quantity > 1) {
        existingProduct.quantity -= 1;
      } else {
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      }
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },
  },
});
export const { addToCart, removeFromCart, decreaseQuantity } =
  cartSlice.actions;
export default cartSlice.reducer;
