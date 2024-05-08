"use client";

import withStaff from "@/authentication/withStaff";
import DashboardNavigation from "@/components/dashboard/dashboardNavigation";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 pt-4">
      <div className="md:col-span-1">
        <DashboardNavigation />
      </div>
      <main className="md:col-span-3 p-3">{children}</main>
    </div>
  );
};

export default withStaff(Layout);
