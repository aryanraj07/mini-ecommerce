import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/products";
interface ProductState {
  allproducts: Product[];
  category: string;
  sort: "none" | "low" | "high" | "highestRated" | "z-a";
  searchTerm: string;
}

const initialState: ProductState = {
  allproducts: [],
  category: "all",
  sort: "none",
  searchTerm: "",
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.allproducts = action.payload;
    },
    setSearchTerms: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.toLowerCase();
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSort: (state, action: PayloadAction<ProductState["sort"]>) => {
      state.sort = action.payload;
    },
  },
});
export const {
  setProducts,
  setSort,
  setCategory,
  setSearchTerms,
  loadProducts,
} = productSlice.actions;
export default productSlice.reducer;
