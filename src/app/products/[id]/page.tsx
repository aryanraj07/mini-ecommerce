import ProductDetails from "@/app/components/ProductDetails/ProductDetails";
import products from "@/app/data/products.json";
const ProductDetailsPage = async ({ params }: { params: { id: string } }) => {
  const resolvedParams = await params;
  const productId = Number(resolvedParams.id);

  const product = products.find((p) => p.id === productId);
  // TODO : Show not found page here
  if (!product) {
    return <div className="text-red">Product not found 🚫</div>;
  }
  return (
    <>
      <ProductDetails product={product} />
    </>
  );
};

export default ProductDetailsPage;
