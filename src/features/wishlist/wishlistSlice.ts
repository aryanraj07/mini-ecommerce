import { createSlice } from "@reduxjs/toolkit";
interface WishListState {
  wishlist: number[];
}
let storedWishlist: number[] = [];
if (typeof window !== "undefined") {
  try {
    const savedWishlist = localStorage.getItem("wishlist");
    storedWishlist = savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (err) {
    storedWishlist = [];
  }
}
const initialState: WishListState = {
  wishlist: storedWishlist,
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      // get the id from the action payload
      // if the product already exist then filter out
      //else push the product id in the wishlist
      const productId = action.payload;
      const existingProduct = state.wishlist.find((item) => item === productId);
      if (existingProduct) {
        state.wishlist = state.wishlist.filter((item) => item !== productId);
      } else {
        state.wishlist.push(productId);
      }
    },
  },
});
export const { toggleWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
