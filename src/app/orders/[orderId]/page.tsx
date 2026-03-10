import { Suspense } from "react";
import OrderSinglePage from "./OrderSinglePage";

interface PageProps {
  params: { orderId: string };
}

export default function Page({ params }: PageProps) {
  return (
    <Suspense fallback={<p className="p-8">Loading order...</p>}>
      <OrderSinglePage orderId={params.orderId} />
    </Suspense>
  );
}
