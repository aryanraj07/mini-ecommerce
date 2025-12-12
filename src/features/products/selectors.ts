import { createSelector } from "@reduxjs/toolkit";
import { setSearchTerms } from "./productsSlice";
import { RootState } from "@/app/store";
import { Product } from "@/types/products";

export const sortMethods = {
  low: (a: Product, b: Product) => a.price - b.price,
  high: (a: Product, b: Product) => b.price - a.price,
  highestRated: (a: Product, b: Product) =>
    b.rating.rate - a.rating.rate || b.rating.count - a.rating.count,
  "z-a": (a: Product, b: Product) => b.title.localeCompare(a.title),
};
export const selectSearchFiltered = createSelector(
  [
    (state: RootState) => state.products.allproducts,
    (state: RootState) => state.products.searchTerm,
  ],
  (allproducts, term) =>
    term
      ? allproducts.filter((item) =>
          item.title.toLowerCase().includes(term.toLowerCase())
        )
      : allproducts
);
export const selectCategoryFiltered = createSelector(
  [selectSearchFiltered, (state: RootState) => state.products.category],
  (products, category) =>
    // if category==="all "return product else apply category=== prodyct.category
    category === "all"
      ? products
      : products.filter((item) => item.category === category)
);
export const selectSortedProducts = createSelector(
  [selectCategoryFiltered, (state: RootState) => state.products.sort],
  (products, sort) =>
    sort === "none" ? products : [...products].sort(sortMethods[sort])
);
