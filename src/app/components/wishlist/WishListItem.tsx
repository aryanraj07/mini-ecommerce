"use client";
import { WishlistItem } from "@/types/wishlist";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCross } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
interface WishlistProp {
  data: WishlistItem;
}
const WishListItem = ({ data }: WishlistProp) => {
  const { id, image, title, price } = data;
  return (
    <Link
      href={`/products/${id}`}
      className="block group bg-white border border-gray-200 overflow-hidden transition-all duration-300  shadow-lg py-4 rounded-xl"
    >
      <div className="relative product-card-img-container w-full h-48 sm:h-56 md:h-64 img-container  bg-gray-50 flex items-center justify-center  ">
        <Image
          alt={title}
          src={image}
          fill
          className="object-contain group-hover:scale-110 transition-transform"
        />
        <div className="cross-btn absolute top-2 righ-0 z-2  p-2 rounded-full">
          <IoMdCloseCircle size={24} color="white" />
        </div>
      </div>
      {/* Card content */}
      <div className="p-4 space-y-2">
        <p className="font-semibold text-gray-900 text-sm sm:text-base groupp-hover:text-black line-clamp-1">
          {title}
        </p>
        <p className="text-lg text-gray-900 font-bold">${price.toFixed(2)}</p>
        <button className="bg-black text-white px-6 py-3 transitionn rounded-md">
          Add To Cart
        </button>
      </div>
    </Link>
  );
};

export default WishListItem;
