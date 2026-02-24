// TODO : Implement the api and make the data dynamic
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import RatingStars from "./RatingStars";
import "@/styles/components/Product/Product.css";
import { Product } from "@/types/products";
interface PropsType {
  product: Product;
}
const ProductCard = ({ product }: PropsType) => {
  const { image, title, category, description, price, rating } = product;
  return (
    <div>
      {/* <div className="product-card p-4 shadow-md"> */}
      <Link
        href={`/products/${product?.id}`}
        className="block group roundex-xl bg-white border border-gray-200 overflow-hidden transition-all duration-300 "
      >
        <div className="relative product-card-img-container w-full h-48 sm:h-56 md:h-64 bg-gray-50 overflow-hidden flex items-center justify-center">
          <Image
            alt="product image"
            src={image}
            fill
            className="object-contain group-hover:scale-110 transition-transform"
          />
        </div>

        <div className="p-4 space-y-2">
          <h3 className="font-semibold line-clamp-1 text-gray-900 text-sm sm:text-base group-hover:text-black">
            {title}
          </h3>
          <p className="text-xs text-gray-500 capitalize">{category}</p>
          <p className="line-clamp-2 text-sm text-gray-600 h-10">
            {description}
          </p>
          <div className="star flex items-center gap-1 text-sm text-gray-700 ">
            <RatingStars rating={rating.rate} />
            <span className="text-xs text-gray-500">
              {"("}
              {rating?.count}
              {`)`}
            </span>
          </div>
          <p className="text-lg text-gray-900 font-bold">${price.toFixed(2)}</p>
        </div>
      </Link>
    </div>
    // </div>
  );
};

export default ProductCard;
