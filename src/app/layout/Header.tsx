"use client";
import { setSearchTerms } from "@/features/products/productsSlice";
import { debounce } from "@/utils/debounce";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import "@/styles/layout/Header.css";
const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const dispatchSearch = useMemo(
    () =>
      debounce((value) => {
        dispatch(setSearchTerms(value));
      }, 500),
    [dispatch]
  );
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    dispatchSearch(val);
  };
  const pathname = usePathname();
  useEffect(() => {
    setShowSearch(pathname === "/products");
  }, [pathname]);
  return (
    <nav className="container-custom header-section">
      <div className="flex justify-between items-center gap-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide text-gray-900"
        >
          Ecommerce
        </Link>
        <div className="flex items-center gap-3">
          {showSearch && (
            <div className="product-search-input hidden sm:flex gap-2  items-center  bg-white focus-within:ring-2 focus-within:ring-gray-300  border border-gray-300 rounded-lg px-3 py-2 ">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search Products..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="outline-none text-sm  px-2 text-gray-600 placeholder:text-gray-400 bg-transparent"
                name="search"
              />
            </div>
          )}
          <Link href={"/cart"} className="relative">
            <FiShoppingCart size={22} className="text-gray-700" />
          </Link>
        </div>
      </div>
      {showSearch && (
        <div className="mt-3 sm:hidden  flex items-center gap-2  border bordergra-300 rounded-lg py-2 px-3 bg-white transition-all">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="outline-none text-sm text-gray-600 placeholder:text-gray-400 bg-transparent w-full"
          />
        </div>
      )}
    </nav>
  );
};

export default Header;
