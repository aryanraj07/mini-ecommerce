"use client";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { Toaster } from "react-hot-toast";
import { useMobile } from "@/hooks/useMobile";
interface childrenType {
  children: React.ReactNode;
}
const ReduxProvider: React.FC<childrenType> = ({ children }) => {
  const isMobile = useMobile();
  return (
    <Provider store={store}>
      {children}
      <Toaster
        position={isMobile ? "bottom-center" : "top-center"}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#222",
            color: "#fff",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />
    </Provider>
  );
};

export default ReduxProvider;
