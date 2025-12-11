"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";

export default function StorageSync() {
  const { allproducts } = useAppSelector((state) => state.products);
  const cart = useAppSelector((s) => s.cart.cart);
  const wishlist = useAppSelector((s) => s.wishlist.wishlist);

  // Sync Cart
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  // Sync Wishlist
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Sync Products (only if product list changes)
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("products", JSON.stringify(allproducts));
    }
  }, [allproducts]);

  return null;
}
