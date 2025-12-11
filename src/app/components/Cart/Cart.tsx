"use client";
import {} from "@/features/products/productsSlice";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Summary from "./Summary";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { CartProduct } from "@/types/cartItem";
import { selectCartWithDetails } from "@/features/products/selectors";
import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/cart/cartSlice";

const Cart = () => {
  const cart = useAppSelector(selectCartWithDetails);
  console.log(cart);

  const dispatch = useAppDispatch();
  const truncateText = (text: string, limit = 40) => {
    if (!text) {
      return "";
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  return (
    <div className="container-custom py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="cart-items w-full lg:w-3/4 bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-6">
            Cart # <span>{cart.length} items</span>
          </h1>
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-2">
              Your cart is empty{" "}
            </p>
          ) : (
            <ul className="cart-items-wrapper space-y-4">
              {cart.map((item: CartProduct) => (
                <li
                  key={item.id}
                  className="flex flex-col sm:flex-row border rounded-lg p-4 gap-4 hover:shadow-md transition-shadow"
                >
                  <div className="relative img-container h-28 w-28 mx-auto sm:mx-0  bg-gray-100  rounded-lg">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="cart-content flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between   w-full">
                    <div className="left-content flex flex-col gap-1 ">
                      <h3 className="font-semibold text-gray-900 wrap-break-word">
                        {truncateText(item.title, 35)}
                      </h3>
                      <p className="text-sm text-gray-500 wrap-break-word">
                        {truncateText(item.description, 35)}
                      </p>
                      <div className="card-category flex items-center gap-2 text-sm">
                        <p className="text-gray-600">{item.category}</p>
                        <div className="rating flex gap-2 items-center text-yellow-500 ">
                          <FaStar size={14} />
                          <span>{item.rating.rate}</span>
                          <span className="text-gray-400">
                            {item.rating.count}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="right-contetn flex flex-col items-end gap-2 sm:gap-3">
                      <p className="text-lg text-semibold text-gray-800">
                        ${item.price}
                      </p>
                      <div className=" quantity-container flex items-center border rounded-md overflow-hidden">
                        <button
                          onClick={() => dispatch(decreaseQuantity(item.id))}
                          className="cursor-pointer px-3 py-1 border-r hover:bg-gray-200"
                        >
                          -
                        </button>
                        <span className="px-4">{item.quantity}</span>
                        <button
                          className="cursor-pointer px-3 py-1 border-l hover:bg-gray-200"
                          onClick={() => dispatch(addToCart(item.id))}
                        >
                          +
                        </button>
                      </div>
                      <button
                        className="text-red-500 text-sm hover:underline"
                        onClick={() => dispatch(removeFromCart(item.id))}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-items lg:w-1/4 ">
          <Summary />
        </div>
      </div>
    </div>
  );
};

export default Cart;
