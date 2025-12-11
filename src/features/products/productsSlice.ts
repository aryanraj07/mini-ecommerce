"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/products";
interface ProductState {
  allproducts: Product[];
  filteredProducts: Product[];
  wishlist: number[];
  category: string;
  sort: string;
  searchTerm: string;
}
interface SortFn {
  a: Product;
  b: Product;
}
let savedProducts: Product[] = [];
let savedWishlist: number[] = [];

if (typeof window !== "undefined") {
  try {
    const storeedProduct = localStorage.getItem("products");
    const storedWishlist = localStorage.getItem("wishlist");
    savedProducts = storeedProduct ? JSON.parse(storeedProduct) : [];
    savedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (err) {
    savedProducts = [];
    savedWishlist = [];
  }
}
const initialState: ProductState = {
  allproducts: savedProducts,
  filteredProducts: [],
  wishlist: savedWishlist,
  category: "all",
  sort: "low",
  searchTerm: "",
};
const sortMethods: Record<
  ProductState["sort"],
  (a: Product, b: Product) => number
> = {
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  highestRated: (a, b) =>
    b.rating.rate - a.rating.rate || b.rating.count - a.rating.count,
  "z-a": (a, b) => b.title.localeCompare(a.title),
};
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    loadProducts: (state) => {
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) state.allproducts = JSON.parse(savedProducts);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.allproducts = action.payload;
      state.filteredProducts = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("products", JSON.stringify(action.payload));
      }
    },
    setSearchTerms: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload.toLowerCase();
      state.filteredProducts = state.allproducts.filter((p) =>
        p.title.toLowerCase().includes(state.searchTerm)
      );
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
      state.filteredProducts = state.allproducts.filter((p) =>
        state.category === "all" ? true : p.category === state.category
      );
    },
    setSort: (state, action: PayloadAction<ProductState["sort"]>) => {
      state.sort = action.payload;
      state.filteredProducts = [...state.filteredProducts].sort(
        sortMethods[state.sort]
      );
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
