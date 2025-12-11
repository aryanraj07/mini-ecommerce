"use client";
import { selectwishlistProductsWithData } from "@/features/wishlist/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import WishListItem from "./WishListItem";

const Wishlist = () => {
  const wishlist = useAppSelector(selectwishlistProductsWithData);
  return (
    <div>
      <h3 className="">
        My Wishlists <span>{wishlist.length} items</span>
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 justify-items-center]">
        {wishlist &&
          wishlist.map((item) => <WishListItem data={item} key={item.id} />)}
      </div>
    </div>
  );
};

export default Wishlist;
