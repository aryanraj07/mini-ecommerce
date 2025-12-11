"use client";
import { WishlistItem } from "@/types/wishlist";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaCross } from "react-icons/fa";
interface WishlistProp {
  data: WishlistItem;
}
const WishListItem = ({ data }: WishlistProp) => {
  const { id, image, title, price } = data;
  return (
    <Link href={`/prodcts/${id}`} className="shadow-lg py-4 rounded-lg">
      <div className="img-container relative h-54 w-54 bg-gray-500  ">
        <Image alt={title} src={image} fill />
        <div className="cross-btn absolute top-2 righ-1 z-2 bg-white p-2 rounded-full">
          <FaCross size={14} />
        </div>
      </div>
      <div className="content flex flex-col ">
        <p className="line-clamp-1 text-ellipsis text-gray-800 text-xl">
          {title}
        </p>
        <p>${price.toFixed(2)}</p>
        <button className="">Add To Cart</button>
      </div>
    </Link>
  );
};

export default WishListItem;
