"use client";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="container-custom flex items-center justify-center min-h-screen">
      <Link href={"/products"} className="primary-btn">
        View Products
      </Link>
    </div>
  );
};

export default Home;
