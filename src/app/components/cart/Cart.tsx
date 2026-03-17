"use client";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Summary from "./Summary";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";

import {
  AddToCartInput,
  UpdateCartInput,
  RemoveCartInput,
} from "@/types/types";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { CartItem } from "@/types/types";
import CartItemCard from "./CartItemCard";
import { useState } from "react";
type CartQueryData = {
  cartItem: CartItem[];
};
type RemoveContext = {
  previousCart?: CartQueryData;
  previousSelected?: number[];
};
const Cart = () => {
  const trpc = useTRPC();
  const cartQuery = trpc.cartItem.getCart.queryOptions();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { data: summary } = useQuery(
    trpc.cartItem.getCartSummary.queryOptions(
      { cartItemIds: selectedItems },
      { enabled: selectedItems.length > 0 },
    ),
  );
  const handleSelect = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const dispatch = useAppDispatch();

  const queryClient = useQueryClient();
  const truncateText = (text: string, limit = 40) => {
    if (!text) {
      return "";
    }
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };
  const invalidateCartAndSummary = () => {
    queryClient.invalidateQueries(cartQuery);
    queryClient.invalidateQueries({
      queryKey: trpc.cartItem.getCartSummary.queryKey(),
    });
  };

  const { data, isFetching } = useQuery(trpc.cartItem.getCart.queryOptions());
  const addMutation = useMutation(
    trpc.cartItem.addToCart.mutationOptions({
      async onMutate(variables: AddToCartInput) {
        await queryClient.cancelQueries(cartQuery);

        const previousCart = queryClient.getQueryData(cartQuery.queryKey);

        queryClient.setQueryData(
          cartQuery.queryKey,
          (old: CartQueryData | undefined) => {
            if (!old) return old;

            const updatedItems = old.cartItem.map((item: CartItem) =>
              item.productId === variables.productId
                ? {
                    ...item,
                    quantity: item.quantity + (variables.quantity ?? 1),
                  }
                : item,
            );

            return {
              ...old,
              cartItem: updatedItems,
            };
          },
        );

        return { previousCart };
      },

      onError(
        _error: unknown,
        _variables: AddToCartInput,
        context: { previousCart?: CartQueryData } | undefined,
      ) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
      },

      onSettled() {
        invalidateCartAndSummary();
      },
    }),
  );
  const updateMutation = useMutation(
    trpc.cartItem.updateQuantity.mutationOptions({
      async onMutate(variables: UpdateCartInput) {
        await queryClient.cancelQueries(cartQuery);
        const previousCart = queryClient.getQueryData(cartQuery.queryKey);
        queryClient.setQueryData(
          cartQuery.queryKey,
          (old: CartQueryData | undefined) => {
            if (!old) return old;

            const updatedItems = old.cartItem.map((item: CartItem) =>
              item.id === variables.cartItemId
                ? { ...item, quantity: variables.quantity ?? item.quantity }
                : item,
            );

            return {
              ...old,
              cartItem: updatedItems,
            };
          },
        );

        return { previousCart };
      },

      onError(
        _error: unknown,
        _variables: UpdateCartInput,
        context: { previousCart?: CartQueryData } | undefined,
      ) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
      },

      onSettled() {
        invalidateCartAndSummary();
      },
    }),
  );

  const removeMutation = useMutation(
    trpc.cartItem.removeFromCart.mutationOptions({
      async onMutate(variables: RemoveCartInput): Promise<RemoveContext> {
        await queryClient.cancelQueries(cartQuery);

        const previousCart = queryClient.getQueryData(cartQuery.queryKey);
        const previousSelected = selectedItems;
        queryClient.setQueryData(
          cartQuery.queryKey,
          (old: CartQueryData | undefined) => {
            if (!old) return old;

            const updatedItems = old.cartItem.filter(
              (item: CartItem) => item.id !== variables.cartItemId,
            );

            return {
              ...old,
              cartItem: updatedItems,
            };
          },
        );
        setSelectedItems((prev) =>
          prev.filter((id) => id !== variables.cartItemId),
        );
        return { previousCart, previousSelected };
      },

      onError(
        _: unknown,
        __: RemoveCartInput,
        context: RemoveContext | undefined,
      ) {
        if (context?.previousCart) {
          queryClient.setQueryData(cartQuery.queryKey, context.previousCart);
        }
        if (context?.previousSelected) {
          if (context?.previousSelected) {
            setSelectedItems(context.previousSelected);
          }
        }
      },

      onSettled() {
        invalidateCartAndSummary();
      },
    }),
  );
  const cartItems = data?.cartItem ?? [];
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
                <li key={item.id}>
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
                          cartItemId: item.id,
                        });
                      } else {
                        updateMutation.mutate({
                          cartItemId: item.id,
                          quantity: item.quantity - 1,
                        });
                      }
                    }}
                    onRemove={() =>
                      removeMutation.mutate({
                        cartItemId: item.id,
                      })
                    }
                    selectedItems={selectedItems}
                    onSelectItem={handleSelect}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {summary && (
          <div className="cart-items lg:w-1/4 ">
            <Summary summary={summary} selectedItems={selectedItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
