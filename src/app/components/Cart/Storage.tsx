"use client";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppSelector } from "@/hooks/hooks";

export default function StorageSync() {
  const wishlist = useAppSelector((s) => s.wishlist.wishlist);
  const isAuthenticated = useSelector((state) => state);
  // Sync Cart

  // Sync Wishlist
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("localWishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  // Sync Products (only if product list changes)

  return null;
}
