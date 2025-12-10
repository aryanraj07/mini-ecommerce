"use client";

import { useEffect, useState } from "react";
import Dropdown from "./Dropdown";
import ProductCard from "./Product/ProductCard";
import "@/styles/components/Product/Product.css";

import {
  setCategory,
  setProducts,
  setSort,
} from "@/features/products/productsSlice";
import { log } from "node:console";
import { Product } from "@/types/products";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ProductSkelton from "./skelton/ProductSkelton";
interface PropsType {
  products: Product[];
}
export interface OptionsType {
  value: string;
  label: string;
}
const Products = ({ products }: PropsType) => {
  const [loading, setLoading] = useState(false);
  const category = useAppSelector((s) => s.products.category);
  const sort = useAppSelector((s) => s.products.sort);

  const dispatch = useAppDispatch();
  const categoryOptions = [
    { value: "all", label: "All" },
    { value: "menClothing", label: "Mens's Clothing" },
    { value: "womensClothing", label: "Womens's Clothing" },
    { value: "jewelery", label: "Jewelery" },
    { value: "electronics", label: "Electronics" },
  ];

  const sortOptions = [
    { value: "low", label: "Price-Low to High" },
    { value: "high", label: "Price-High to Low" },
    { value: "highestRated", label: "Highest Rated" },
    { value: "z-a", label: "Name-Z to A" },
  ];
  // dispatching the product data to the redux
  useEffect(() => {
    dispatch(setProducts(products));
    localStorage.setItem("products", JSON.stringify(products));
  }, [dispatch, products]);
  const filteredProducts = useAppSelector((s) => s.products.filteredProducts);
  const product = useAppSelector((s) => s.products.allproducts);
  useEffect(() => {
    setLoading(true);
    const delay = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(delay);
  }, [filteredProducts]);
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
                onChange={(option) => dispatch(setCategory(option.value))}
                options={[
                  { value: "all", label: "All" },
                  { value: "men's clothing", label: "Mens's Clothing" },
                  { value: "women's clothing", label: "Womens's Clothing" },
                  { value: "jewelery", label: "Jewelery" },
                  { value: "electronics", label: "Electronics" },
                ]}
                placeholder="All Categories"
              />
            </div>
            {/* Sort Container */}
            <div className="sort-container w-full sm:w-auto flex flex-col sm:flex-row  sm:items-center gap-2">
              <span className="block text-sm font-medium mb-1">Sort</span>
              <Dropdown
                value={sort}
                onChange={(option) => dispatch(setSort(option.value))}
                options={[
                  { value: "low", label: "Price-Low to High" },
                  { value: "high", label: "Pricpe-High to Low" },
                  { value: "highestRated", label: "Highest Rated" },
                  { value: "z-a", label: "Name-Z to A" },
                ]}
                placeholder="Price Low to High"
              />
            </div>
          </div>
        </div>
        <ul className="product-card-container grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4  justify-items-center ">
          {/* <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center"> */}
          {loading
            ? [...Array(8)].map((_, i) => (
                <li key={i} className="w-full">
                  <ProductSkelton />
                </li>
              ))
            : filteredProducts.map((product: Product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
        </ul>

        {filteredProducts.length === 0 && (
          <p className="mt-10 text-center text-gray-500 text-lg">
            No products match your search filters
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
