import { Star } from "lucide-react";
import React from "react";
interface ProductMetaProps {
  rating: number;
  brandName: string;
}
const ProductMeta = ({ rating, brandName }: ProductMetaProps) => {
  return (
    <>
      {/* description */}
      <div className="p-4 space-y-2">
        {/* brand */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {brandName}
        </p>
        {/* rating */}
        <div className="flex items-center gap-1 text-sm">
          <Star size={14} fill="black" />
          <span>{rating?.toFixed(1) ?? 0}</span>
        </div>
      </div>
    </>
  );
};

export default ProductMeta;
