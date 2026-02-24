import type { Metadata } from "next";
// import Script from "next/script";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import Header from "./layout/Header";
import StorageSync from "./components/cart/Storage";
import { Suspense } from "react";
import ReduxHydrator from "./components/ReduxHydrator";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import trpc from "@/utils/fetchServerData";
import AuthLoader from "./components/AuthLoader";

export const metadata: Metadata = {
  title: "Mini Ecommerce App",
  description: "Welcome to Ecommerece App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  "use cache";
  const filters = await trpc.filters.getFilterData.query();

  // const filters = await getFilters();
  // const products = await getProductsRoutes();
  // console.log(products);

  return (
    <html lang="en">
      <body>
        {/* <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="beforeInteractive"
        /> */}
        <ReactQueryProvider>
          <ReduxProvider>
            <ReduxHydrator filtersData={filters} />
            <AuthLoader />
            <Suspense fallback="null">
              <Header />
            </Suspense>
            <StorageSync />
            {children}
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
