"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FiPackage, FiUser, FiLogOut, FiMenu } from "react-icons/fi";
import { RiDashboardLine } from "react-icons/ri";
import SearchBar from "@/app/components/food/SearchBar";

const Drawer = ({ user, categories }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawerList = () => (
    <div
      className="w-64"
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h6 className="text-center text-lg font-semibold">Categories</h6>
      <ul>
        {categories?.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.name}`}>
              <span className="block px-4 py-2 hover:bg-gray-200">
                {category.name}
              </span>
            </Link>
          </li>
        ))}
        {isMobile && (
          <>
            <hr className="my-2" />
            {user ? (
              <>
                <li>
                  {user?.is_staff && (
                    <Link href="/dashboard">
                      <span className="block px-4 py-2 hover:bg-gray-200">
                        <RiDashboardLine className="inline-block mr-2" />{" "}
                        Dashboard
                      </span>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/my-account/orders">
                    <span className="block px-4 py-2 hover:bg-gray-200">
                      <FiPackage className="inline-block  " /> Orders
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/my-account/profile">
                    <span className="block px-4 py-2 hover:bg-gray-200">
                      <FiUser className="inline-block  " /> My Account
                    </span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logoutUser}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    <FiLogOut className="inline-block  " /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">
                    <span className="block px-4 py-2 hover:bg-gray-200">
                      <FiUser className="inline-block  " /> Login
                    </span>
                  </Link>
                </li>
                <li>
                  <Link href="/signup">
                    <span className="block px-4 py-2 hover:bg-gray-200">
                      <FiUser className="inline-block  " /> Register
                    </span>
                  </Link>
                </li>
              </>
            )}
          </>
        )}
      </ul>
      {isMobile && (
        <>
          <div className="p-4">
            <SearchBar onItemClick={() => setIsDrawerOpen(false)} />
          </div>
        </>
      )}
    </div>
  );

  return (
    <>
      <button
        onClick={toggleDrawer(true)}
        className="text-white focus:outline-none"
      >
        <FiMenu className="w-6 h-6" />
      </button>
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-gray-600 bg-opacity-50 z-50"
          onClick={toggleDrawer(false)}
        >
          <div
            className="fixed inset-y-0 left-0 bg-white z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {drawerList()}
          </div>
        </div>
      )}
    </>
  );
};

export default Drawer;
