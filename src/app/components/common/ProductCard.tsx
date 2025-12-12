import { Product } from "@/types/products";
import Image from "next/image";
import React from "react";
import RatingStars from "../product/RatingStars";
import Link from "next/link";
import { IoMdCloseCircle } from "react-icons/io";
import { WishlistType } from "@/types/wishlist";
import { CiHeart } from "react-icons/ci";
import AddToCartButton from "./AddToCartButton";
import WishlistButton from "./WishlistButton";
interface PropsType {
  product: Product | WishlistType;
  onRemove?: () => void;
  showRemove?: boolean;
  variant?: "full" | "wishlist";
}

const ProductCard = ({
  product,
  onRemove,
  showRemove,
  variant = "full",
}: PropsType) => {
  const { id, title, image, price } = product;
  const description = "description" in product ? product.description : null;
  const rating = "rating" in product ? product.rating : null;
  const category = "category" in product ? product.category : null;

  return (
    <div className=" relative group border border-gray-200 shadow-md rounded-xl overflow-hidden px-4 py-6">
      <Link href={`/products/${id}`} className="block ">
        {/* iMAGE */}
        <div className="relative bg-gray-50 overflow-hidden w-full h-48 md:h-56 lg:h-62">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain group-hover:scale-110 transition-transform"
          />
          {showRemove && (
            <IoMdCloseCircle
              size={20}
              color="white"
              onClick={onRemove}
              className="absolute top-1 right-1"
            />
          )}
        </div>
        <div className="content p-4 space-y-2 relative ">
          <h3 className="font-semibold line-clamp-1 text-gray-900 group-hover:text-black text-sm sm:text-base">
            {title}
          </h3>
          {variant === "full" && (
            <>
              <p className="capitalize text-xs text-gray-500">{category}</p>
              <p className="line-clamp-2 text-sm text-gray-600 h-10">
                {description}
              </p>
              {rating && (
                <div className="star flex items-center gap-1 text-sm text-gray-700">
                  <RatingStars rating={rating.rate} />
                  <span className="text-xs text-gray-500">{rating.count}</span>
                </div>
              )}
            </>
          )}
          <p className="text-lg text-gray-900 font-bold">${price.toFixed(2)}</p>
        </div>
      </Link>
      {variant === "wishlist" && (
        <div className="w-full">
          <AddToCartButton id={id} image={image} />
        </div>
      )}
      {variant === "full" && (
        <div className="absolute bottom-40  z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 w-full bg-white flex items-center justify-center py-2">
          <WishlistButton id={id} image={image} />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
