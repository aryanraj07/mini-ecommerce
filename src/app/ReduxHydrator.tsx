import { setProducts } from "@/features/products/productsSlice";
import { useAppDispatch } from "@/hooks/hooks";
import React, { useEffect } from "react";

const ReduxHydrator = () => {
  const disptatch = useAppDispatch();
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      disptatch(setProducts(JSON.parse(saved)));
    }
  }, []);
  return null;
};

export default ReduxHydrator;
