"use client";
import { addToCart } from "@/features/cart/cartSlice";
import { makeSelectWishlisted } from "@/features/wishlist/selectors";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { showCustomToast } from "@/utils/showToast";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Variable } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishlistButton = ({ id, image }: { id: number; image: string }) => {
  const dispatch = useAppDispatch();
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const router = useRouter();
  const selectIsWishlisted = makeSelectWishlisted(id);
  const isWishlisted = useAppSelector(selectIsWishlisted);
  const isAuthenticated = useAppSelector((state) => !!state.user.user);

  // first on click i have to wishlist the item when not login
  //store to localstorage
  //if login call the api and store to database

  const removeMutation = useMutation(
    trpc.wishlistItems.removeFromWishList.mutationOptions({
      onMutate: async (variables) => {
        dispatch(toggleWishlist(variables.productId));
        await queryClient.cancelQueries({
          queryKey: trpc.wishlistItems.getWishlist.queryKey(),
        });

        const previous = queryClient.getQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
        );

        queryClient.setQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
          (old: any[] | undefined) =>
            old?.filter((item) => item.productId !== variables.productId),
        );

        return { previous };
      },

      onError: (_err, _vars, context) => {
        dispatch(toggleWishlist(_vars.productId));
        if (context?.previous) {
          queryClient.setQueryData(
            trpc.wishlistItems.getWishlist.queryKey(),
            context.previous,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.wishlistItems.getWishlist.queryKey(),
        });
      },
    }),
  );
  const addMutation = useMutation(
    trpc.wishlistItems.addToWishlist.mutationOptions({
      onMutate: async (variables) => {
        await queryClient.cancelQueries({
          queryKey: trpc.wishlistItems.getWishlist.queryKey(),
        });
        dispatch(toggleWishlist(variables.productId));

        const previous = queryClient.getQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
        );

        queryClient.setQueryData(
          trpc.wishlistItems.getWishlist.queryKey(),
          (old: any[] | undefined) => [
            ...(old ?? []),
            { productId: variables.productId },
          ],
        );

        return { previous };
      },

      onError: (_err, _vars, context) => {
        dispatch(toggleWishlist(_vars.productId));
        if (context?.previous) {
          queryClient.setQueryData(
            trpc.wishlistItems.getWishlist.queryKey(),
            context.previous,
          );
        }
      },

      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.wishlistItems.getWishlist.queryKey(),
        });
      },
    }),
  );

  const handleWishlist = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAuthenticated) {
      dispatch(toggleWishlist(id));
      return;
    }
    if (isWishlisted) {
      removeMutation.mutate({ productId: id });
    } else {
      addMutation.mutate({ productId: id });
    }

    // await dispatch(wishlistProduct(id)).unwrap();

    // showCustomToast(
    //   isWishlisted ? "Removed from wishlist" : "Added to wishlist",
    //   image,
    //   () => router.push("/wishlist"),
    // );
  };

  return (
    <button
      className={`self-start min-w-40  wishlist-container flex items-center gap-2 cursor-pointer px-6 py-2  rounded-lg border transition-all   ${
        isWishlisted
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-700 border-gray-200 shadow-sm hover:shadow-lg hover:shadow-gray-300/40 hover:-translate-y-[2px]"
      }  hover:shadow-md flex justify-center`}
      onClick={handleWishlist}
    >
      {isWishlisted ? (
        <FaHeart className="text-red-500 " />
      ) : (
        <FaRegHeart className="text-gray-600" />
      )}
      {isWishlisted ? "Wishlisted" : "Wishlist"}
    </button>
  );
};

export default WishlistButton;
