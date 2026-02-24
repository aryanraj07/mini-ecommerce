"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import WishlistButton from "./WishlistButton";
import { ProductItem, ProductPreview, WishlistItem } from "@/types/types";

import ProductImage from "../product/ProductImage";
import ProductMeta from "../product/ProductMeta";
import ProductPrice from "../product/ProductPrice";
import ProudctAction from "../product/ProudctAction";
interface ProductCardProps {
  product: ProductPreview;
  variant: string;
  showRemove: boolean;
}

const ProductCard = ({ product, variant, showRemove }: ProductCardProps) => {
  const {
    id,
    title,
    price,
    discountPercentage,
    discountedPrice,
    rating,
    stock,
    thumbnail,
    category,
    brand,
    tags,
    brandName,
  } = product;
  return (
    <Link
      href={`/products/${id}`}
      className="group block bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <ProductImage
        thumbnail={thumbnail}
        title={title}
        discountPercentage={discountPercentage}
        stock={stock}
      />
      <ProductMeta rating={rating} brandName={brandName} />
      <ProductPrice
        price={price}
        variant={variant}
        discountPercentage={discountPercentage}
        discountedPrice={discountedPrice}
      />
      <ProudctAction id={id} thumbnail={thumbnail} />
      {/* ================= IMAGE ================= */}

      {/* ================= CONTENT ================= */}
      <div className="p-4 space-y-2">
        {/* brand */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {brand?.name}
        </p>

        {/* title */}
        <h3 className="font-semibold text-sm line-clamp-1 group-hover:text-black">
          {title}
        </h3>

        {/* description */}

        {/* rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} fill="black" />
          <span>{rating?.toFixed(1) ?? 0}</span>
        </div>

        {/* price */}

        {/* tags */}
        {/* {tags?.length > 0 && (
          <div className="flex flex-wrap gap-1 pt-1">
            {tags.map((t) => (
              <span
                key={t.id}
                className="text-[10px] px-2 py-0.5 bg-gray-100 rounded-md text-gray-600"
              >
                {t.name}
              </span>
            ))}
          </div>
        )} */}

        {/* category */}
        <p className="text-xs text-gray-400 capitalize">{category?.name}</p>
      </div>
    </Link>
  );
};

export default ProductCard;
