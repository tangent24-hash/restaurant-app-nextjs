import React from "react";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./authentication/AuthContext";

export const metadata = {
  title: "YummyFood",
  description: "Best food delivery service in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <Header />
              {children}
              <Footer />
              <ToastContainer />
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
