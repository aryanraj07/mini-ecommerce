"use client";
import { addToCart } from "@/features/cart/cartSlice";
import { isWIshlistedSelector } from "@/features/wishlist/selectors";
import { toggleWishlist } from "@/features/wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { showCustomToast } from "@/utils/showToast";
import { useRouter } from "next/navigation";

import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const WishlistButton = ({ id, image }: { id: number; image: string }) => {
  const isWishlisted = useAppSelector(isWIshlistedSelector(id));
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(toggleWishlist(id));
    showCustomToast(
      isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      image,
      () => router.push("/wishlist")
    );
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
