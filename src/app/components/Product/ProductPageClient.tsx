// ProductPageClient.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

interface ProductsPageClientProps {
  initialData: ProductsOutput;
}
import Filters from "./Filters";
import ProductGrid from "./ProductGrid";
import { Suspense, useEffect, useState } from "react";
import Dropdown from "../Dropdown";
import { sortedOptions } from "@/constants";
import { setSearch, setSortValue } from "@/features/filters/filterSlice";

import { useTRPC } from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import PaginationButton from "../common/PaginationButton";
import { ProductsOutput } from "@/types/types";

const ProductPageClient = ({ initialData }: ProductsPageClientProps) => {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.filter.selected);
  const { priceRange, category, brand, tag, rating } = filters;
  const page = filters.page;

  const { sort, search } = useAppSelector((state) => state.filter);

  const trpc = useTRPC();

  const { data, isFetching } = useQuery(
    trpc.products.getAllProducts.queryOptions(
      {
        min: priceRange.min,
        max: priceRange.max,
        category,
        brand,
        tag,
        rating,
        page,
        limit: 20,
        sort,
        search,
      },
      {
        initialData: page === 1 ? initialData : undefined,
        staleTime: 0,
        retry: false,
        refetchOnWindowFocus: false,
      },
    ),
  );
  console.log(data);

  const products = data?.products ?? [];

  const meta = data?.meta;
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [filters, sort]);

  const { total = 0 } = meta ?? {};
  return (
    <div className="flex">
      <div className="w-72 sticky top-0 p-6 ">
        <Filters />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-5">
          <h2>{total} Products</h2>
          <Dropdown
            options={sortedOptions}
            onChange={(option) => {
              dispatch(setSortValue(option.value));
            }}
            placeholder="Select Category"
            value={sort}
          />
        </div>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-content-center flex-1">
          <ProductGrid products={products} isFetching={isFetching} />
          {meta && (
            <PaginationButton
              currentPage={meta.current_page}
              lastPage={meta.last_page}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default ProductPageClient;
