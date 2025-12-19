import React from "react";
import { Outlet } from "react-router";
import Aside from "../components/Aside/Aside";

const DashboardLayout = () => {
  return (
    <div className="flex dark:bg-gray-900">
      <Aside></Aside>

      <div className="border-2 flex-1">
        {" "}
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashboardLayout;
