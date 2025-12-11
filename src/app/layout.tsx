import type { Metadata } from "next";
import { Montserrat, Lato } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./ReduxProvider";
import { lato, montserrat } from "@/lib/fonts";
import Header from "./layout/Header";
import StorageSync from "./components/cart/Storage";

export const metadata: Metadata = {
  title: "Mini Ecommerce App",
  description: "Welcome to Ecommerece App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${lato.variable}`}>
        <ReduxProvider>
          <Header />
          <StorageSync />
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
