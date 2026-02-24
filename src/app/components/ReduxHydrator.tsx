"use client";
import { setInitialFilters } from "@/features/filters/filterSlice";
import { setProducts } from "@/features/products/productsSlice";
import { useAppDispatch } from "@/hooks/hooks";
import axiosInstance from "@/styles/auth/axiosInstance";
import { Product } from "@/types/products";
import React, { useEffect, useRef } from "react";

const ReduxHydrator = ({ filtersData }) => {
  const dispatch = useAppDispatch();
  const filterRef = useRef(false);
  useEffect(() => {
    if (filtersData || !filterRef.current) {
      filterRef.current = true;
      dispatch(setInitialFilters(filtersData));
    }
  }, [filtersData, dispatch]);

  return null;
};

export default ReduxHydrator;
