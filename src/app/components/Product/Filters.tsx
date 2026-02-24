"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import PriceRangeSlider from "./PriceRangeSlider";
import {
  setPriceRange,
  clearFilters,
  toggleCategory,
  toggleBrand,
  toggleTag,
  setRating,
} from "@/features/filters/filterSlice";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { title } from "process";

const MAX_VISIBLE = 8;

const Filters = () => {
  const dispatch = useAppDispatch();

  const available = useAppSelector((state) => state.filter.available);
  const selected = useAppSelector((state) => state.filter.selected);

  const {
    categories = [],
    brands = [],
    tags = [],
    ratingRange = { max: 5 },
  } = available ?? {};

  /* ---------------- UI state ---------------- */
  const [categorySearch, setCategorySearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);

  /* ---------------- helpers ---------------- */

  const filterList = (list: any[], search: string) =>
    list.filter((i) => i.value?.toLowerCase().includes(search.toLowerCase()));

  const categoriesFiltered = useMemo(
    () => filterList(categories, categorySearch),
    [categories, categorySearch],
  );

  const brandsFiltered = useMemo(
    () => filterList(brands, brandSearch),
    [brands, brandSearch],
  );

  const tagsFiltered = useMemo(
    () => filterList(tags, tagSearch),
    [tags, tagSearch],
  );

  const categoriesVisible = showAllCategories
    ? categoriesFiltered
    : categoriesFiltered.slice(0, MAX_VISIBLE);

  const brandsVisible = showAllBrands
    ? brandsFiltered
    : brandsFiltered.slice(0, MAX_VISIBLE);

  /* ---------------- reusable checkbox list ---------------- */
  if (!available) return null;
  const renderList = ({
    title,
    list,
    visible,
    search,
    setSearch,
    selectedValues,
    toggleAction,
    showAll,
    setShowAll,
  }: any) => (
    <div>
      <h3 className="text-sm font-semibold mb-2">{title}</h3>

      <div className="flex items-center gap-2 mb-2">
        <Search size={16} />
        <input
          type="text"
          placeholder={`Search ${title}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded px-2 py-1 text-sm w-full"
        />
      </div>

      <div className="space-y-2">
        {visible.map(({ value, count }) => (
          <label
            key={value}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedValues?.includes(value)}
                onChange={() => dispatch(toggleAction(value))}
              />
              <span>{value}</span>
            </div>
            <span className="text-xs text-gray-500">({count})</span>
          </label>
        ))}
      </div>

      {setShowAll && list.length > MAX_VISIBLE && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-xs text-pink-600 mt-2 text-center"
        >
          {showAll ? "Show less" : `+ ${list.length - MAX_VISIBLE} more`}
        </button>
      )}
    </div>
  );

  /* ---------------- UI ---------------- */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between border-b pb-3">
        <span className="font-semibold">Filters</span>
        <button
          className="text-sm text-red-500"
          onClick={() => dispatch(clearFilters())}
        >
          Clear All
        </button>
      </div>

      {/* Price */}
      <PriceRangeSlider />

      {/* Categories */}
      {renderList({
        title: "Categories",
        list: categoriesFiltered,
        visible: showAllCategories
          ? categoriesFiltered
          : categoriesFiltered.slice(0, MAX_VISIBLE),
        search: categorySearch,
        setSearch: setCategorySearch,
        selectedValues: selected.category,
        toggleAction: toggleCategory,
        showAll: showAllCategories,
        setShowAll: setShowAllCategories,
      })}

      {/* Brands */}
      {renderList({
        title: "Brands",
        list: brandsFiltered,
        visible: showAllBrands
          ? brandsFiltered
          : brandsFiltered.slice(0, MAX_VISIBLE),
        search: brandSearch,
        setSearch: setBrandSearch,
        selectedValues: selected.brand,
        toggleAction: toggleBrand,
        showAll: showAllBrands,
        setShowAll: setShowAllBrands,
      })}

      {/* Tags (show all, no show-more) */}
      {renderList({
        title: "Tags",
        list: tagsFiltered,
        visible: tagsFiltered,
        search: tagSearch,
        setSearch: setTagSearch,
        selectedValues: selected.tag,
        toggleAction: toggleTag,
      })}

      {/* Rating */}
      <div>
        <h3 className="text-sm font-semibold mb-2">Rating</h3>

        <div className="space-y-2">
          {Array.from({ length: ratingRange.max }, (_, i) => {
            const rating = i + 1;
            return (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="radio"
                  name="rating"
                  checked={selected.rating === rating}
                  onChange={() => dispatch(setRating(rating))}
                />
                <span>{rating} ★ & up</span>
              </label>
            );
          })}
          <button onClick={() => dispatch(setRating(0))}>Clear Rating</button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
