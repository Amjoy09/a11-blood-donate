import React, { useEffect, useState } from "react";
import { use } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router";
import { FaHandHoldingHeart, FaTint, FaUsers } from "react-icons/fa";
import StatisticCard from "../../components/StatisticCard";
import { RiseLoader } from "react-spinners";

const VolunteerDashboardHome = () => {
  const [recentRequests, setRecentRequests] = useState([]);
  const [statistics, setStatistics] = useState(null);

  const { user } = use(AuthContext);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/my-request?page=0&size=3")
      .then((res) => {
        setRecentRequests(res.data.result);
      })
      .catch((error) => console.log(error));

    axiosSecure
      .get("/statistics")
      .then((res) => {
        setStatistics(res.data);
      })
      .catch((error) => {
        console.log(error);
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

      {recentRequests.length > 0 && (
        <div className="">
          {" "}
          <h2 className="text-2xl font-bold mt-10 mb-5 text-center">
            Your Recent Donation Requests
          </h2>
          <div className="space-y-4">
            {recentRequests.map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-xl shadow-md p-5 border"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold">
                    {request.recipient_name}
                  </h3>

                  <span className="badge badge-error">
                    {request.blood_group}
                  </span>
                </div>

                <div className="mt-3 space-y-2">
                  <p>
                    <strong>Date:</strong> {request.donation_date}
                  </p>

                  <p>
                    <strong>District:</strong> {request.recipient_district}
                  </p>

                  <p>
                    <strong>Status:</strong> {request.donation_status}
                  </p>
                </div>

                <div className="mt-5 flex justify-end">
                  <Link
                    to={`/dashboard/request-details/${request._id}`}
                    className="btn btn-error btn-sm text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <Link to="/dashboard/my-request" className="btn btn-error text-white">
          View My All Requests
        </Link>
      </div>
    </div>
  );
};

export default VolunteerDashboardHome;
