"use client";
import { selectCart, selectCartSummary } from "@/features/products/selectors";
import React from "react";
import { useSelector } from "react-redux";

const Summary = () => {
  const cart = useSelector(selectCart);
  const { subtotal, tax, shipping, total } = useSelector(selectCartSummary);

  return (
    <div className="bg-white p-6 rounded-xl shadow-md sticky top-24 space-y-6">
      <h3 className="text-xl text-gray-900 border-b pb-3 font-semibold">
        Order Sumarry
      </h3>
      <div className="space-y-2 text-gray-700">
        <div className="flex justify-between text-sm">
          <span>Subtotal </span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Shipping </span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-smr">
          <span>Tax </span>
          <span>${tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4  flex justify-between items-center">
        <p className="font-semibold text-lg text-gray-900">Total</p>
        <p className="text-xl text-black font-bold">${total.toFixed(2)}</p>
      </div>
      <div className="flex flex-col gap-3 pt-2">
        <button className="px-6 py-3 bg-black text-white rounded-md  hover:bg-gray-700 transition">
          Proceed to Checkout
        </button>
        <button className="px-6 py-3 bg-white text-black rounded-md  hover:bg-gray-700 hover:text-white transition-all">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Summary;
