"use client";

import DashboardNavigation from "@/app/components/dashboard/dashboardNavigation";
import { useContext, useEffect } from "react";
import AuthContext from "../authentication/AuthContext";
import { redirect } from "next/navigation";

const Layout = ({ children }) => {
  let { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.is_staff && !loading) {
      redirect("/login");
    }
  }, [user, loading]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 pt-4">
      <div className="md:col-span-1">
        <DashboardNavigation />
      </div>
      <main className="md:col-span-3 p-3">{children}</main>
    </div>
  );
};

export default Layout;
