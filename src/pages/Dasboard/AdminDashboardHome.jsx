import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { RiseLoader } from "react-spinners";
import StatisticCard from "../../components/StatisticCard";
import { FaHandHoldingHeart, FaTint, FaUsers } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthContext";

const AdminDashboardHome = () => {
  const [statistics, setStatistics] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axiosSecure
      .get("/statistics")
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((error) => {
        console.log(error.response?.data);
      });
  }, [axiosSecure]);

  if (!statistics) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader />
      </div>
    );
  }
  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName}! 👋</h1>

        <p className="text-gray-500 mt-2">
          Thank you for being a part of BloodBond.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <StatisticCard
          title="Total Users"
          count={statistics.totalUsers}
          icon={<FaUsers />}
        />

        <StatisticCard
          title="Total Requests"
          count={statistics.totalRequests}
          icon={<FaTint />}
        />

        <StatisticCard
          title="Total Funding"
          count={`$${statistics.totalFunding}`}
          icon={<FaHandHoldingHeart />}
        />
      </div>
    </div>
  );
};

export default AdminDashboardHome;
