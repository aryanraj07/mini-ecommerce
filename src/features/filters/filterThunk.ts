import { createAsyncThunk } from "@reduxjs/toolkit";
import { setPriceRange, setSearchQuery, setSortValue } from "./filterSlice";
import { setPage } from "../products/productsSlice";
// import { fetchFilterdProducts } from "../products/productsSlice";

// export const fetchProductOnPriceChange = createAsyncThunk(
//   "filter/fetchProductOnPriceChange",
//   async ({ min, max }, { dispatch }) => {
//     dispatch(setPriceRange({ min, max }));
//     dispatch(setPage(1));
//     await dispatch(fetchFilterdProducts());
//   },
// );
// export const fetchProductsOnSortValue = createAsyncThunk(
//   "filter/fetchProductOnPriceChange",
//   async (value: string, { dispatch }) => {
//     dispatch(setSortValue(value));
//     dispatch(setPage(1));
//     await dispatch(fetchFilterdProducts());
//   },
// );
// export const fetchProductsOnSearchValue = createAsyncThunk(
//   "filter/fetchProductOnPriceChange",
//   async (value, { dispatch }) => {
//     dispatch(setSearchQuery(value));
//     dispatch(setPage(1));
//     await dispatch(fetchFilterdProducts());
//   },
// );
