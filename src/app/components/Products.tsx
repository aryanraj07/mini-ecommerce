"use client";

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";

import "@/styles/components/Product/Product.css";

import { setCategory, setSort } from "@/features/products/productsSlice";
import { Product } from "@/types/products";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ProductSkelton from "./skelton/ProductSkelton";
import ProductCard from "./common/ProductCard";
import { selectSortedProducts } from "@/features/products/selectors";
export type SortType = "none" | "low" | "high" | "highestRated" | "z-a";

export interface SortOptionType {
  value: SortType;
  label: string;
}
export interface CategoryOptionType {
  value: string;
  label: string;
}
// export interface OptionsType {
//   value: string;
//   label: string;
// }
const Products = () => {
  const [loading, setLoading] = useState(false);

  const { sort, category } = useAppSelector((s) => s.products);

  const dispatch = useAppDispatch();
  const categoryOptions: CategoryOptionType[] = [
    { value: "all", label: "All" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
    { value: "jewelery", label: "Jewelery" },
    { value: "electronics", label: "Electronics" },
  ];

  const sortOptions: SortOptionType[] = [
    { value: "low", label: "Price - Low to High" },
    { value: "high", label: "Price - High to Low" },
    { value: "highestRated", label: "Highest Rated" },
    { value: "z-a", label: "Name - Z to A" },
  ];

  // dispatching the product data to the redux
  const productsToShow = useAppSelector(selectSortedProducts);

  useEffect(() => {
    const start = setTimeout(() => setLoading(true), 0);
    const stop = setTimeout(() => setLoading(false), 400);

    return () => {
      clearTimeout(start);
      clearTimeout(stop);
    };
  }, [productsToShow]);
  return (
    <div>
      <div>
        <div className="product-head">
          {/* Filters  */}
          <div className="filter-container flex flex-col sm:flex-row  items-start sm:items-center justify-between py-4 gap-6">
            <div className="category-container w-full sm:w-auto flex flex-col sm:flex-row  sm:items-center gap-2">
              <span className="block text-sm font-medium ">Category</span>
              <Dropdown
                value={category}
                options={categoryOptions}
                onChange={(option) => dispatch(setCategory(option.value))}
                placeholder="All Categories"
              />
            </div>
            {/* Sort Container */}
            <div className="sort-container w-full sm:w-auto flex flex-col sm:flex-row  sm:items-center gap-2">
              <span className="block text-sm font-medium mb-1">Sort</span>
              <Dropdown
                value={sort}
                onChange={(option) => dispatch(setSort(option.value))}
                options={sortOptions}
                placeholder="Sort Products"
              />
            </div>
          </div>
        </div>
        <ul className="product-card-container grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 justify-items-center ">
          {loading
            ? [...Array(8)].map((_, i) => (
                <li key={i} className="w-full">
                  <ProductSkelton />
                </li>
              ))
            : productsToShow.map((product: Product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
        </ul>

        {productsToShow.length === 0 && (
          <p className="mt-10 text-center text-gray-500 text-lg">
            No products match your search filters
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
