import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { AuthProvider } from "@/authentication/AuthContext";
import Footer from "@/components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "YummyFood",
  description: "Best food delivery service in town",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Header />
          <ToastContainer />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
