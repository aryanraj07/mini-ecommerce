import Image from "next/image";
import RatingStars from "../product/RatingStars";
import ButtonContainer from "./ButtonContainer";
import WishlistButton from "../common/WishlistButton";

import { Product } from "@/types/products";
import RelatedProducts from "./RelatedProducts";

const ProductDetails = async ({ product, relatedProducts }) => {
  const {
    image,
    title,
    category,
    price,
    rating,
    description,
    id: productId,
  } = product;
  return (
    <>
      <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2  gap-8 p-6 max-auto ">
        <div className="relative w-full h-[400px] md:h-[600px] bg-gray-100 rounded-lg shadow-sm">
          <Image
            src={image}
            alt={title}
            fill
            className="object-contain p-4"
            priority
            sizes="100vw"
          />
        </div>
        <div className="product-details-container flex flex-col gap-5">
          <p className="category text-sm text-gray-500 capitalize">
            {category}
          </p>
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight line-clamp-1">
            {title}
          </h1>
          <h3 className="font-bold text-2xl ">${price}</h3>
          <div className=" flex items-center  gap-2 border-b pb-3">
            <RatingStars rating={rating.rate} />
            <span className="text-sm text-gray-600">({rating.count})</span>
          </div>
          <div className="product-desctiption">
            <h4 className="font-semibold mb-1 ">Description</h4>
            <p className="text-gray-700 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>

          <ButtonContainer id={productId} image={image} />
          <WishlistButton id={productId} image={image} />
        </div>
      </div>
      <RelatedProducts relatedProducts={relatedProducts} />
    </>
  );
};

export default ProductDetails;
