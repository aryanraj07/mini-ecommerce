"use client";

import React, { CSSProperties, useState } from "react";
import Image from "next/image";
import RatingStars from "../product/RatingStars";
import ButtonContainer from "./ButtonContainer";
import WishlistButton from "../common/WishlistButton";
import { ProductItem, ReviewItem, TagItem } from "@/types/types";
interface ProductDescProps {
  product: ProductItem;
}

const ProductDesc = ({ product }: ProductDescProps) => {
  const {
    id,
    title,
    description,
    price = 0,
    discountPercentage = 0,
    rating = 0,
    stock = 0,
    images = [],
    thumbnail,
    category,
    brand,
    tags = [],
    reviews = [],
  } = product;

  const productImages: string[] =
    images && images.length > 0
      ? images.filter(Boolean)
      : thumbnail
        ? [thumbnail]
        : [];
  const [selectedImage, setSelectedImage] = useState(productImages[0]);
  const [zoomStyle, setZoomStyle] = useState<CSSProperties>({});

  const discountedPrice =
    discountPercentage && price - (price * discountPercentage) / 100;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* LEFT SIDE - IMAGES */}
      <div className="flex gap-4">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3">
          {productImages.map((img, index) => (
            <div
              key={index}
              className={`relative w-20 h-20 border rounded-md cursor-pointer ${
                selectedImage === img ? "border-black" : "border-gray-300"
              }`}
              onClick={() => setSelectedImage(img)}
            >
              <Image
                src={img}
                alt={title}
                fill
                className="object-contain p-2"
              />
            </div>
          ))}
        </div>

        {/* Main Image with Zoom */}
        <div
          className="relative w-full h-[500px] bg-gray-100 rounded-lg overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setZoomStyle({})}
        >
          {zoomStyle.backgroundImage ? (
            <div className="w-full h-full" style={zoomStyle} />
          ) : (
            <Image
              src={selectedImage}
              alt={title}
              fill
              className="object-contain p-6"
              priority
            />
          )}
        </div>
      </div>

      {/* RIGHT SIDE - DETAILS */}
      <div className="flex flex-col gap-6">
        {/* Brand & Category */}
        <div className="text-sm text-gray-500">
          {brand?.name} / {category?.name}
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold">{title}</h1>

        {/* Rating */}
        <div className="flex items-center gap-2">
          {rating && <RatingStars rating={rating} />}
          <span className="text-sm text-gray-600">
            ({reviews?.length || 0} Reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-4">
          {discountedPrice && (
            <span className="text-3xl font-bold text-black">
              ${discountedPrice.toFixed(2)}
            </span>
          )}
          <span className="text-lg line-through text-gray-400">${price}</span>
          <span className="text-green-600 font-medium">
            {discountPercentage}% OFF
          </span>
        </div>

        {/* Stock */}
        <div>
          {stock > 0 ? (
            <span className="text-green-600 font-medium">
              In Stock ({stock})
            </span>
          ) : (
            <span className="text-red-500 font-medium">Out of Stock</span>
          )}
        </div>

        {/* Tags */}
        <div className="flex gap-2 flex-wrap">
          {tags?.map((tag: TagItem) => (
            <span
              key={tag.id}
              className="bg-gray-200 px-3 py-1 rounded-full text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Description */}
        <div>
          <h4 className="font-semibold mb-2">Product Description</h4>
          <p className="text-gray-700 leading-relaxed">{description}</p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <ButtonContainer id={id} image={selectedImage} />
          <WishlistButton id={id} image={selectedImage} />
        </div>
      </div>

      {/* REVIEWS SECTION */}
      <div className="md:col-span-2 mt-10 border-t pt-6">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>

        {reviews && reviews.length > 0 ? (
          reviews.map((review: ReviewItem, index: number) => (
            <div key={index} className="border-b pb-4 mb-4">
              <div className="flex items-center gap-2">
                <RatingStars rating={review.rating} />
                <span className="text-sm text-gray-500">
                  {review.reviewerName}
                </span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductDesc;
