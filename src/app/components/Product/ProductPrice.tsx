import React from "react";
interface ProductPriceProps {
  price: number;
  discountedPrice: number | null;
  discountPercentage: number | null;
  variant: string;
}
const ProductPrice = ({
  price,
  discountedPrice,
  discountPercentage,
  variant,
}: ProductPriceProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-gray-900">
          ${discountedPrice ? discountedPrice.toFixed(2) : price.toFixed(2)}
        </span>

        {discountPercentage && (
          <span className="text-sm line-through text-gray-400">
            ${price.toFixed(2)}
          </span>
        )}
      </div>
    </>
  );
};

export default ProductPrice;
