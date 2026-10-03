import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthContext";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { Link } from "react-router";
import { MailOpen } from "lucide-react";

const DonorDashboardHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    newRequests: [],
    inProgressRequests: [],
    completedRequests: [],
  });
  const [requestLoading, setRequestLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/user-profile")
      .then((res) => {
        setProfile(res.data);
        setProfileLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setProfileLoading(false);
      });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure
      .get("/donor-dashboard")
      .then((res) => {
        console.log("Donor Dashboard:", res.data);
        setDashboardData(res.data);
        setRequestLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setRequestLoading(false);
      });
  }, [axiosSecure]);

  if (profileLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      {/* Welcome Section */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center gap-5">
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "Donor"}
            className="w-16 h-16 rounded-full object-cover border-4 border-white shadow"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xl">
            {user?.displayName?.charAt(0) || "D"}
          </div>
        )}

        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Welcome back, {user?.displayName || "Donor"}! 👋
          </h2>

          <p className="text-gray-500 mt-2">
            Thank you for being a BloodBond hero. Your donation can help save a
            life.
          </p>
        </div>
      </div>

      {/* Donor Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {/* Blood Group */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Blood Group</p>

          <h3 className="text-3xl font-bold text-red-600 mt-2">
            {profile?.blood || "N/A"}
          </h3>
        </div>

        {/* Location */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">Location</p>

          <h3 className="text-xl font-bold text-gray-800 mt-2">
            {profile?.upazila}, {profile?.district}
          </h3>
        </div>

        {/* Status */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-sm text-gray-500">{profile?.status}</p>

          <h3 className="text-xl font-bold text-green-600 mt-2">Active</h3>
        </div>
      </div>

      {/* Donation Requests */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Donation Requests
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* New Requests */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">New Requests</p>

            <h3 className="text-3xl font-bold text-gray-900 mt-2">
              {dashboardData?.newRequests?.length}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Matching your blood and location
            </p>
          </div>

          {/* Pending */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">In Progress</p>

            <h3 className="text-3xl font-bold text-yellow-500 mt-2">
              {dashboardData?.inProgressRequests?.length}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Donations you have accepted
            </p>
          </div>

          {/* Accepted */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Completed</p>

            <h3 className="text-3xl font-bold text-green-600 mt-2">
              {dashboardData?.completedRequests?.length}
            </h3>
            <p className="text-xs text-gray-400 mt-2">
              Donations you have completed
            </p>
          </div>
        </div>
      </div>

      {/* Recent Requests */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-bold text-gray-900">Recent Requests</h3>

          <Link
            to={"/donation-requests"}
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            View All
          </Link>
        </div>

        {requestLoading ? (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500">Loading requests...</p>
          </div>
        ) : dashboardData.newRequests.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-gray-500">No new donation requests right now.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {dashboardData.newRequests.slice(0, 3).map((request) => (
              <div
                key={request._id}
                className="bg-white rounded-2xl shadow-sm p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Request Information */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">
                      {request.blood_group} Blood Needed
                    </h4>
                    <p className="text-gray-500 mt-1">
                      Requester: {request.requester_email}
                    </p>
                    <p className="text-gray-500">
                      📍 {request.recipient_upazila},{" "}
                      {request.recipient_district}
                    </p>

                    <p className="text-gray-500">{request.hospital_name}</p>
                    <p className="text-sm text-yellow-600 font-semibold mt-2 capitalize">
                      {request.donation_status}
                    </p>
                  </div>

                  {/* Button */}
                  <Link
                    to={`/dashboard/request-details/${request._id}`}
                    className="bg-red-600 text-white font-semibold px-5 py-2.5 rounded-xl hover:bg-red-700 transition"
                  >
                    View Request
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Quick Actions</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <Link
            to="/donation-requests"
            className="bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition block"
          >
            <h4 className="text-lg font-bold text-gray-900">View Requests</h4>

            <p className="text-sm text-gray-500 mt-1">
              See people who need your help.
            </p>
          </Link>

          <Link
            to={"/dashboard/user-profile"}
            className="bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition"
          >
            <h4 className="text-lg font-bold text-gray-900">Update Profile</h4>

            <p className="text-sm text-gray-500 mt-1">
              Keep your donor information updated.
            </p>
          </Link>

          <Link
            to={"/dashboard/donation-history"}
            className="bg-white rounded-2xl shadow-sm p-6 text-left hover:shadow-md transition"
          >
            <h4 className="text-lg font-bold text-gray-900">
              Donation History
            </h4>

            <p className="text-sm text-gray-500 mt-1">
              See your previous donations.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DonorDashboardHome;
