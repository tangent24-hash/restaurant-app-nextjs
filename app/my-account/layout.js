"use client";
import SideNav from "@/app/components/myaccount/sidenav";
import withAuth from "../authentication/withAuth";

const Layout = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-1">
        <SideNav />
      </div>
      <main className="md:col-span-3 p-3">{children}</main>
    </div>
  );
};

export default withAuth(Layout);
