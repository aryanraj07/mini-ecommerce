"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { CartItem } from "@/types/types";
import { showCustomToast } from "@/utils/showToast";
import { useTRPC } from "@/utils/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
type CartQueryData = {
  cartItem: CartItem[];
};
const AddToCartButton = ({
  id,
  image,
}: {
  id: number;
  image: string | null;
}) => {
  const trpc = useTRPC();

  const queryClient = useQueryClient();
  const addToCartMutation = useMutation(
    trpc.cartItem.addToCart.mutationOptions({
      onMutate: async (variables) => {
        // here parametere varaibles: hold the data we pass in mutation product id and quantity
        // now we will cancel any get query  request   of cart so that this optimistic update should not affect that while we are doing this
        await queryClient.cancelQueries({
          queryKey: trpc.cartItem.getCart.queryKey(),
        });
        // store the preivous cart state so that we could return
        const previousCart = queryClient.getQueryData(
          trpc.cartItem.getCart.queryKey(),
        );
        //optimistically update cache now
        queryClient.setQueryData(
          trpc.cartItem.getCart.queryKey(),
          (old: CartQueryData | undefined) => {
            //old is current cached data
            if (!old) return old;
            const existing = old.cartItem.find(
              (item: CartItem) => item.productId === variables.productId,
            );
            if (!existing) return old;

            return {
              ...old,
              cartItem: old.cartItem.map((item: CartItem) =>
                item.productId === variables.productId
                  ? {
                      ...item,
                      quantity: item.quantity + (variables.quantity ?? 0),
                    }
                  : item,
              ),
            };
          },
        );
        return { previousCart };
        // here we return context which get passed to onerror
      },
      // Rollback on error
      onError: (_err, _variables, context) => {
        if (context?.previousCart) {
          queryClient.setQueryData(
            trpc.cartItem.getCart.queryKey(),
            context.previousCart,
          );
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: trpc.cartItem.getCart.queryKey(),
        });
      },
    }),
  );
  const router = useRouter();
  const handleAddToCart = () => {
    // if is authenitcated call the api
    //  else dispatch the addTocart

    addToCartMutation.mutate(
      {
        productId: id,
        quantity: 1,
      },
      {
        onSuccess: () => {
          showCustomToast("Item added to cart", image, () =>
            router.push("/cart"),
          );
        },
        onError: (err) => {
          console.log("ERROR", err);
        },
      },
    );
  };
  return (
    <button
      className="px-6 py-3 bg-black text-white rounded-md  hover:bg-gray-700 transition"
      onClick={handleAddToCart}
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
