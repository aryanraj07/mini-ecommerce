"use client";
import { useAppSelector } from "@/hooks/hooks";
import { Product } from "@/types/products";
import React, { useEffect, useRef, useState } from "react";
import ProductCard from "../common/ProductCard";
import {
  selectCategoryFiltered,
  selectRelatedProuct,
} from "@/features/products/selectors";

const RelatedProducts = ({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) => {
  return (
    <div className="">
      <h1 className="">Related Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-content-center">
        {relatedProducts.map((p) => (
          <li className="" key={p.id}>
            <ProductCard product={p} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RelatedProducts;
