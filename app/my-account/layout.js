"use client";
import SideNav from "@/app/components/myaccount/sidenav";
// import { useContext, useEffect } from "react";
// import AuthContext from "../authentication/AuthContext";
import { redirect } from "next/navigation";
import { getUser } from "../api/auth";

const Layout = ({ children }) => {
  // const { user, loading } = useContext(AuthContext);
  const user = getUser;

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-1">
        <SideNav />
      </div>
      <main className="md:col-span-3 p-3">{children}</main>
    </div>
  );
};

export default Layout;
