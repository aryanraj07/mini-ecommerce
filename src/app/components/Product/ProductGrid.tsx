"use client";

import { useSelector } from "react-redux";
import ProductCard from "../common/ProductCard";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ProductSkeleton from "../skelton/ProductSkelton";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { fetchFilterdProducts } from "@/features/products/productThunk";
import { ProductPreview } from "@/types/types";

const ProductGrid = ({ products, isFetching }) => {
  if (isFetching && products.length === 0) {
    return [...Array(8)].map((_, i) => <ProductSkeleton key={i} />);
  }
  if (!products?.length) {
    return <p>No products matched your search</p>;
  }
  return (
    <>
      {products.map((product: ProductPreview) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </>
  );
};

export default ProductGrid;
