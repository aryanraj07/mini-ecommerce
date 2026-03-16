import type { Metadata } from "next";

import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import Header from "./layout/Header";
import { Suspense } from "react";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import AuthLoader from "./components/AuthLoader";
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
        <ReactQueryProvider>
          <ReduxProvider>
            <Suspense fallback={null}>
              <FiltersHydrator />
            </Suspense>
            <AuthLoader />
            <Header />
            <main className="pt-16">{children}</main>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
