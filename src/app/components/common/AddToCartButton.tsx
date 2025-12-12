import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { showCustomToast } from "@/utils/showToast";
import { useRouter } from "next/navigation";

const AddToCartButton = ({ id, image }: { id: number; image: string }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(addToCart(id));
    showCustomToast("Item added to cart", image, () => router.push("/cart"));
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
