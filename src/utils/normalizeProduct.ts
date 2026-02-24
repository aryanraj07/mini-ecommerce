import { ProductDetails } from "@/types/types";

export function normalizeProduct(p: ProductDetails) {
  return {
    ...p,
    price: p.price ?? 0,
    discountPercentage: p.discountPercentage ?? 0,
    rating: p.rating ?? 0,
    stock: p.stock ?? 0,
    images: p.images?.filter(Boolean) ?? [],
    thumbnail: p.thumbnail ?? "",
    tags: p.tags ?? [],
    reviews: p.reviews ?? [],
  };
}
