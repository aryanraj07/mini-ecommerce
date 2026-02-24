import Image from "next/image";
import React from "react";
interface ProductImageProps {
  thumbnail: string;
  title: string;
  discountPercentage: number;
  stock: number;
}
const ProductImage = ({
  thumbnail,
  title,
  discountPercentage,
  stock,
}: ProductImageProps) => {
  return (
    <div className="relative h-52 bg-gray-50 overflow-hidden">
      <Image
        src={thumbnail}
        alt={title}
        fill
        sizes="(max-width:768px) 100vw, 33vw"
        className="object-contain group-hover:scale-110 transition-transform duration-300"
      />

      {/* Discount badge */}
      {discountPercentage && (
        <span className="absolute top-2 left-2 bg-[#E16249] text-white text-xs px-2 py-1 rounded-md font-semibold">
          {Math.round(discountPercentage)}% OFF
        </span>
      )}

      {/* Stock badge */}
      {stock === 0 && (
        <span className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded-md">
          Out of stock
        </span>
      )}
    </div>
  );
};

export default ProductImage;
