"use client";

import { SummaryType } from "@/types/types";
import { useTRPC } from "@/utils/trpc";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SummaryProps {
  summary: SummaryType;
}

const Summary = ({ summary }: SummaryProps) => {
  const trpc = useTRPC();
  const router = useRouter();
  // const checkoutMutation = useMutation(trpc.order.checkout.mutationOptions());

  // const verifyPaymentMutation = useMutation(
  //   trpc.order.verifyPayment.mutationOptions(),
  // );

  // const handleCheckout = async () => {
  //   const data = await checkoutMutation.mutateAsync();
  //   if (!(window as any).Razorpay) {
  //     alert("Razorpay SDK failed to load");
  //     return;
  //   }
  //   const options = {
  //     key: data.key,
  //     amount: data.amount,
  //     currency: data.currency,
  //     order_id: data.razorpayOrderId,
  //     name: "Your Store",
  //     description: "Order Payment",

  //     handler: async function (response: any) {
  //       await verifyPaymentMutation.mutateAsync({
  //         razorpay_order_id: response.razorpay_order_id,
  //         razorpay_payment_id: response.razorpay_payment_id,
  //         razorpay_signature: response.razorpay_signature,
  //       });
  //       router.push("/success");
  //     },

  //     theme: {
  //       color: "#000000",
  //     },
  //   };

  //   const rzp = new (window as any).Razorpay(options);
  //   rzp.open();
  // };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md sticky top-24 space-y-6 border border-gray-100">
      <h3 className="text-xl font-semibold border-b pb-3">Order Summary</h3>

      <div className="space-y-3 text-gray-700 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${summary.total.toFixed(2)}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Discount</span>
          <span>- ${summary.discount.toFixed(2)}</span>
        </div>
      </div>

      <div className="border-t pt-4 flex justify-between items-center">
        <p className="font-semibold text-lg">Total</p>
        <p className="text-xl font-bold">${summary.payable.toFixed(2)}</p>
      </div>

      <div className="flex flex-col gap-3 pt-2">
        <button
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
          // onClick={handleCheckout}
        >
          Proceed to Checkout
        </button>

        <button className="px-6 py-3 bg-gray-100 text-gray-800 rounded-xl hover:bg-gray-200 transition">
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Summary;
