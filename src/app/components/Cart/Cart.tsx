"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Summary from "./Summary";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { CartProduct } from "@/types/cartItem";

import {
  addToCart,
  decreaseQuantity,
  removeFromCart,
} from "@/features/cart/cartSlice";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductCard from "../common/ProductCard";
import { CartItem } from "@/types/types";
import CartItemCard from "./CartItemCard";

const Cart = () => {
  const trpc = useTRPC();
  const cartQuery = trpc.cartItem.getCart.queryOptions();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const truncateText = (text: string, limit = 40) => {
    if (!text) {
      return "";
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  const { data, isFetching } = useQuery(trpc.cartItem.getCart.queryOptions());
  const addMutation = useMutation(
    trpc.cartItem.addToCart.mutationOptions({
      async onMutate(variables) {
        await queryClient.cancelQueries(cartQuery);

        const previousCart = queryClient.getQueryData(cartQuery.queryKey);

        queryClient.setQueryData(cartQuery.queryKey, (old: any) => {
          if (!old) return old;

          const updatedItems = old.cartItem.map((item: CartItem) =>
            item.productId === variables.productId
              ? { ...item, quantity: item.quantity + variables.quantity }
              : item,
          );

          return {
            ...old,
            cartItem: updatedItems,
          };
        });

        return { previousCart };
      },

      onError(_, __, context) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
      },

      onSettled() {
        queryClient.invalidateQueries(cartQuery);
      },
    }),
  );
  const updateMutation = useMutation(
    trpc.cartItem.updateQuantity.mutationOptions({
      async onMutate(variables) {
        await queryClient.cancelQueries(cartQuery);

        const previousCart = queryClient.getQueryData(cartQuery.queryKey);

        queryClient.setQueryData(cartQuery.queryKey, (old: any) => {
          if (!old) return old;

          const updatedItems = old.cartItem.map((item: CartItem) =>
            item.productId === variables.productId
              ? { ...item, quantity: variables.quantity }
              : item,
          );

          return {
            ...old,
            cartItem: updatedItems,
          };
        });

        return { previousCart };
      },

      onError(_, __, context) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
      },

      onSettled() {
        queryClient.invalidateQueries(cartQuery);
      },
    }),
  );
  const removeMutation = useMutation(
    trpc.cartItem.removeFromCart.mutationOptions({
      async onMutate(variables) {
        await queryClient.cancelQueries(cartQuery);

        const previousCart = queryClient.getQueryData(cartQuery.queryKey);

        queryClient.setQueryData(cartQuery.queryKey, (old: any) => {
          if (!old) return old;

          const updatedItems = old.cartItem.filter(
            (item: CartItem) => item.productId !== variables.productId,
          );

          return {
            ...old,
            cartItem: updatedItems,
          };
        });

        return { previousCart };
      },

      onError(_, __, context) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
      },

      onSettled() {
        queryClient.invalidateQueries(cartQuery);
      },
    }),
  );
  const cartItems = data?.cartItem ?? [];
  const summary = data?.summary;
  return (
    <div className="container-custom py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="cart-items w-full lg:w-3/4 bg-white p-6 rounded-xl shadow-sm">
          <h1 className="text-2xl font-bold mb-6">
            Cart # <span>{cartItems?.length} items</span>
          </h1>
          {cartItems?.length === 0 ? (
            <p className="text-center text-gray-500 py-2">
              Your cart is empty{" "}
            </p>
          ) : (
            <ul className="cart-items-wrapper space-y-4">
              {cartItems?.map((item: CartItem) => (
                <li key={item.productId}>
                  <CartItemCard
                    item={item}
                    onIncrease={() =>
                      addMutation.mutate({
                        productId: item.productId,
                        quantity: 1,
                      })
                    }
                    onDecrease={() => {
                      if (item.quantity === 1) {
                        removeMutation.mutate({
                          productId: item.productId,
                        });
                      } else {
                        updateMutation.mutate({
                          productId: item.productId,
                          quantity: item.quantity - 1,
                        });
                      }
                    }}
                    onRemove={() =>
                      removeMutation.mutate({
                        productId: item.productId,
                      })
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {summary && (
          <div className="cart-items lg:w-1/4 ">
            <Summary summary={summary} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
