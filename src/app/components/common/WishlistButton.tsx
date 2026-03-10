"use client";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/utils/trpc";

interface WishlistButtonProps {
  id: number;
  image: string | null;
}

const WishlistButton = ({ id }: WishlistButtonProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { data: wishlist = [] } = useQuery(
    trpc.wishlistItems.getWishlist.queryOptions(undefined, {
      staleTime: 1000 * 60 * 5,
    }),
  );
  const wishlistSet = new Set(wishlist);
  const isWishlisted = wishlistSet.has(id);

  const addMutation = useMutation(
    trpc.wishlistItems.addToWishlist.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries(
          trpc.wishlistItems.getWishlist.queryOptions(),
        );

        const previous = queryClient.getQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
        );

        queryClient.setQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
          (old: typeof wishlist | undefined) => [
            ...(old ?? []),
            variables.productId,
          ],
        );

        return { previous };
      },

      onError: (_err, _vars, context) => {
        if (context?.previous) {
          queryClient.setQueryData(
            trpc.wishlistItems.getWishlist.queryKey(),
            context.previous,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries(
          trpc.wishlistItems.getWishlist.queryOptions(),
        );
      },
    }),
  );

  const removeMutation = useMutation(
    trpc.wishlistItems.removeFromWishList.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries(
          trpc.wishlistItems.getWishlist.queryOptions(),
        );

        const previous = queryClient.getQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
        );

        queryClient.setQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
          (old: typeof wishlist | undefined) =>
            old?.filter((item) => item !== variables.productId),
        );

        return { previous };
      },

      onError: (_err, _vars, context) => {
        if (context?.previous) {
          queryClient.setQueryData(
            trpc.wishlistItems.getWishlist.queryKey(),
            context.previous,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries(
          trpc.wishlistItems.getWishlist.queryOptions(),
        );
      },
    }),
  );

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeMutation.mutate({ productId: id });
    } else {
      addMutation.mutate({ productId: id });
    }
  };

  return (
    <button
      onClick={handleWishlist}
      className={`flex items-center gap-2 px-6 py-2 rounded-lg border transition ${
        isWishlisted
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-700 border-gray-200"
      }`}
    >
      {isWishlisted ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      {isWishlisted ? "Wishlisted" : "Wishlist"}
    </button>
  );
};

export default WishlistButton;
