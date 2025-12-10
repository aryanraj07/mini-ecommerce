"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function StorageSync() {
  const { cart, wishlist, allproducts } = useSelector(
    (state: any) => state.products
  );

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
