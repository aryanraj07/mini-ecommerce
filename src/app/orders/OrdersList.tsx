import { createServerTRPCClient } from "@/utils/fetchServerData";
import { headers } from "next/headers";
import Link from "next/link";
import OrderCard from "../components/order/OrderCard";

export default async function OrdersList() {
  const headerStore = await headers();
  const cookie = headerStore.get("cookie");

  const trpc = createServerTRPCClient(cookie);

  const orders = await trpc.order.getMyOrders.query();

  if (!orders || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <Link
          key={order.id}
          href={`/orders/${order.id}`}
          className="block border rounded-lg p-5 hover:shadow-md transition"
        >
          <OrderCard order={order} />
        </Link>
      ))}
    </div>
  );
}
