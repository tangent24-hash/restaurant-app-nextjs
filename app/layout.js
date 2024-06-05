import React from "react";

import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/app/components/header/Header";
// import { AuthProvider } from "@/app/authentication/AuthContext";
import Footer from "@/app/components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YummyFood",
  description: "Best food delivery service in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
