"use client";
import { setProducts } from "@/features/products/productsSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useEffect, useState } from "react";
import productsJSON from "@/app/data/products.json";

const ReduxHydrator = () => {
  const [ready, setReady] = useState(false);
  const disptatch = useAppDispatch();
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      disptatch(setProducts(JSON.parse(saved)));
    } else {
      disptatch(setProducts(productsJSON));
      localStorage.setItem("products", JSON.stringify(productsJSON));
    }
    setTimeout(() => setReady(true), 0);
  }, []);
  if (!ready) return null;
  return null;
};

export default ReduxHydrator;
