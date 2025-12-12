"use client";
import Image from "next/image";
import RatingStars from "../product/RatingStars";
import { useAppDispatch } from "@/hooks/hooks";
import { Product } from "@/types/products";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { addToCart } from "@/features/cart/cartSlice";
import WishlistButton from "../common/WishlistButton";
import AddToCartButton from "../common/AddToCartButton";
interface ProductType {
  product: Product;
}
const ProductDetails = ({ product }: ProductType) => {
  const dispatch = useAppDispatch();
  const { image, title, category, price, rating, description, id } = product;
  const router = useRouter();
  const showCustomToast = (
    message: string,
    img: string,
    onClick: () => void
  ) => {
    toast.custom((t) => (
      <div
        onClick={() => {
          toast.dismiss(t.id);
          onClick();
        }}
        className={`${
          t.visible ? "animate-toast-in" : "animate-toast-out"
        } flex items-center gap-3 cursor-pointer
      bg-white border border-gray-200 rounded-xl shadow-md
      px-3 py-3 w-[240px] sm:w-[300px]
      transition-all hover:shadow-lg`}
      >
        <div className="relative w-10 h-10 bg-gray-100 rounded-md shadow-sm">
          <Image src={img} alt="img" fill className="object-contain" />
        </div>

        <div className="flex flex-col text-xs sm:text-sm text-gray-900 leading-tight">
          <span className="font-medium">{message}</span>
          <span className="text-blue-600 underline pt-1">Tap to view →</span>
        </div>
      </div>
    ));
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id));
    showCustomToast("Item added to cart", image, () => router.push("/cart"));
  };
  return (
    <div className="max-w-6xl grid grid-cols-1 md:grid-cols-2  gap-8 p-6 max-auto">
      <div className="relative w-full h-[400px] md:h-[600px] bg-gray-100 rounded-lg shadow-sm">
        <Image src={image} alt={title} fill className="object-contain p-4" />
      </div>
      <div className="product-details-container flex flex-col gap-5">
        <p className="category text-sm text-gray-500 capitalize">{category}</p>
        <h1 className="text-2xl md:text-3xl font-semibold leading-tight line-clamp-1">
          {title}
        </h1>
        <h3 className="font-bold text-2xl ">${price}</h3>
        <div className=" flex items-center  gap-2 border-b pb-3">
          {/* <p>{rating}</p> */}
          <RatingStars rating={rating.rate} />
          <span className="text-sm text-gray-600">({rating.count})</span>
        </div>
        <div className="product-desctiption">
          <h4 className="font-semibold mb-1 ">Description</h4>
          <p className="text-gray-700 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
        <div className="btn-container flex items-center gap-3 p-2">
          <button
            className="px-6 py-3 bg-black text-white rounded-md  hover:bg-gray-700 transition"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
          <AddToCartButton id={id} image={image} />
          <button className=" px-6 py-3 bg-black text-white rounded-md  hover:bg-gray-700 transition">
            Buy Now
          </button>
        </div>
        <WishlistButton id={id} image={image} />
      </div>
    </div>
  );
};

export default ProductDetails;
