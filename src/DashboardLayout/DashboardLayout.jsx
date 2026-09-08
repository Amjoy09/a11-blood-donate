import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Aside />

      <main className="lg:ml-80 p-4 md:p-6 pt-20 lg:pt-6">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
