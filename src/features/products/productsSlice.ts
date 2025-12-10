"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types/products";
import { CartItem } from "@/types/cart";
interface ProductState {
  allproducts: Product[];
  filteredProducts: Product[];
  wishlist: number[];
  category: string;
  sort: string;
  searchTerm: string;
  cart: CartItem[];
}
interface SortFn {
  a: Product;
  b: Product;
}
let savedCart: CartItem[] = [];
let savedProducts: Product[] = [];
let savedWishlist: number[] = [];

if (typeof window !== "undefined") {
  try {
    const storedCart = localStorage.getItem("cart");
    const storeedProduct = localStorage.getItem("products");
    const storedWishlist = localStorage.getItem("wishlist");
    savedCart = storedCart ? JSON.parse(storedCart) : [];
    savedProducts = storeedProduct ? JSON.parse(storeedProduct) : [];
    savedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
  } catch (err) {
    savedCart = [];
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
  cart: savedCart,
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
    addToCart: (state, action: PayloadAction<number>) => {
      // store the productId
      // first we find if it existing in cart
      //if existing in cart increase its quantity by 1
      //else find the product from al Products
      // if product found store the product in the cart with all required value and quantity as 1
      const productId = action.payload;
      const existingProduct = state.cart.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        state.allproducts.map((p) => console.log(p));
        const product = state.allproducts.find((p) => p.id === productId);
        console.log(product);

        if (product) {
          state.cart.push({ ...product, quantity: 1 });
        }
      }
    },

    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingProduct = state.cart.find((p) => p.id === productId);
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity -= 1;
        } else {
          state.cart = state.cart.filter((p) => p.id !== productId);
        }
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart = state.cart.filter((p) => p.id !== action.payload);
    },
    toggleWishlist: (state, action: PayloadAction<number>) => {
      const productId = action.payload;

      if (state.wishlist.includes(productId)) {
        state.wishlist = state.wishlist.filter((id) => id !== productId);
      } else {
        state.wishlist = [...state.wishlist, action.payload];
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
        console.log(state.wishlist);
      }
    },
  },
});
export const {
  setProducts,
  setSort,
  setCategory,
  setSearchTerms,
  addToCart,
  removeFromCart,
  toggleWishlist,
  decreaseQuantity,
} = productSlice.actions;
export default productSlice.reducer;
