import { headers } from "next/headers";
import products from "@/app/data/products.json";
import Products from "../components/Products";

const page = async () => {
  return (
    <div className="container-custom ">
      <Products products={products} />
    </div>
  );
};

export default page;
