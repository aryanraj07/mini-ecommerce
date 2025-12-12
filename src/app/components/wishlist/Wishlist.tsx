"use client";
import { selectwishlistProductsWithData } from "@/features/wishlist/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import WishListItem from "./WishListItem";
import ProductCard from "../common/ProductCard";
import { removeFromWishList } from "@/features/wishlist/wishlistSlice";

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector(selectwishlistProductsWithData);
  return (
    <div>
      <h3 className="">
        My Wishlists <span>{wishlist.length} items</span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cold-2  md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center]">
        {wishlist &&
          wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              redirectUrl={`/wishlist`}
              variant={"wishlist"}
              showRemove={true}
              onRemove={() => dispatch(removeFromWishList(product.id))}
            />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
