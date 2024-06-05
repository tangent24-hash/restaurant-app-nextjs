import React from "react";

import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/header/Header";
import Footer from "./components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <Header />
            {children}
            <Footer />
            <ToastContainer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
