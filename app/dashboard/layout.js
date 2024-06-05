import DashboardNavigation from "@/app/components/dashboard/dashboardNavigation";
import { redirect } from "next/navigation";
import { getUser } from "../api/auth";
import { Suspense } from "react";


const Layout = async ({ children }) => {




  return (
    <div className="grid grid-cols-1 md:grid-cols-4 pt-4">
      <div className="md:col-span-1">
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardNavigation />
        </Suspense>
      </div>
      <main className="md:col-span-3 p-3">{children}</main>
    </div>
  );
};

export default Layout;
