"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import ProductCard from "../common/ProductCard";
import { Suspense, useEffect, useState } from "react";
import { useTRPC } from "@/utils/trpc";

import { useQuery } from "@tanstack/react-query";

const Wishlist = () => {
  const trpc = useTRPC();
  const { data, isLoading } = useQuery(
    trpc.wishlistItems.getWishlist.queryOptions(),
  );
  console.log(data);
  if (isLoading) {
    return (
      <div>
        <h3>My Wishlists</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          Loading...
        </div>
      </div>
    );
  }
  return (
    <div>
      <h3 className="">
        My Wishlists <span>{data?.length} items</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cold-2  md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center]">
        {data?.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            variant={"wishlist"}
            showRemove={true}
          />
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
