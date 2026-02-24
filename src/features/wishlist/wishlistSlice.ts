import axiosInstance from "@/styles/auth/axiosInstance";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { log } from "node:console";
import toast from "react-hot-toast";
interface WishListState {
  wishlist: number[];
}

const initialState: WishListState = {
  wishlist: [],
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      console.log(id);

      if (state.wishlist.includes(id)) {
        state.wishlist = state.wishlist.filter((item) => item != id);
      } else {
        state.wishlist.push(id);
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
});
export const { setWishlist, toggleWishlist } = wishListSlice.actions;
export default wishListSlice.reducer;
