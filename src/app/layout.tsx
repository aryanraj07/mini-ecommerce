import type { Metadata } from "next";

import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import Header from "./layout/Header";
import StorageSync from "./components/cart/Storage";
import { Suspense } from "react";
import ReactQueryProvider from "@/provider/ReactQueryProvider";

import AuthLoader from "./components/AuthLoader";
import { createPublicTRPCClient } from "@/utils/fetchServerData";
import FiltersHydrator from "./components/FiltersHydrator";

export const metadata: Metadata = {
  title: "Mini Ecommerce App",
  description: "Welcome to Ecommerece App",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={null}>
          <ReactQueryProvider>
            <ReduxProvider>
              <FiltersHydrator />

              <AuthLoader />

              <Header />
              <StorageSync />
              <main className="pt-16">{children}</main>
            </ReduxProvider>
          </ReactQueryProvider>
        </Suspense>
      </body>
    </html>
  );
}
