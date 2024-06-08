import Link from "next/link";
import { getUser, logoutUser } from "@/app/api/auth";
import getCategories from "@/app/lib/getCategories";
import {
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiLogOut,
  FiMenu,
} from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import SearchBar from "@/app/components/food/SearchBar";
import Drawer from "./Drawer";

const NavBar = async () => {
  const user = await getUser();
  const categories = await getCategories();

  return (
    <header style={{ backgroundColor: "darkslategrey" }}>
      <div className="flex items-center justify-between p-4">
        <Drawer user={user} categories={categories} />
        <div className="hidden md:block flex-grow">
          <SearchBar />
        </div>
        <div className="flex items-center space-x-4 xs:none">
          {user?.is_staff && (
            <Link href="/dashboard">
              <span className="text-white">
                <RiDashboardLine className="inline-block" /> Dashboard
              </span>
            </Link>
          )}
          {user ? (
            <>
              <Link href="/cart">
                <span className="text-white">
                  <FiShoppingCart className="inline-block" /> Cart
                </span>
              </Link>
              <Link href="/my-account/orders">
                <span className="hidden md:block text-white">
                  <FiPackage className="inline-block" /> Orders
                </span>
              </Link>
              <Link href="/my-account/profile">
                <span className="hidden md:block text-white">
                  <FiUser className="inline-block" /> Profile
                </span>
              </Link>
              <button
                onClick={logoutUser}
                className="hidden md:block text-white"
              >
                <FiLogOut className="inline-block " /> Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login">
                <span className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  <FiUser className="inline-block " /> Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="text-white hover:text-gray-300 px-3 py-2 rounded-md text-sm font-medium">
                  <FiUser className="inline-block " /> Register
                </span>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
