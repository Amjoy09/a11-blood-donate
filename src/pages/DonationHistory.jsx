import React, { use, useEffect, useState } from "react";
import { Link } from "react-router";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { AuthContext } from "../provider/AuthContext";

const DonationHistory = () => {
  const { user } = use(AuthContext);

  const axiosSecure = useAxiosSecure();

  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure
      .get("/donation-history")
      .then((res) => {
        console.log("Donation History:", res.data);

        setDonations(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-red-600"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-red-600 hover:underline"
          >
            ← Back to Dashboard
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-5">
            Donation History
          </h1>

          <p className="text-gray-500 mt-2">Your completed blood donations.</p>
        </div>

        {/* Empty State */}
        {donations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="text-5xl mb-4">🩸</div>

            <h2 className="text-xl font-bold text-gray-800">
              No Donation History Yet
            </h2>

            <p className="text-gray-500 mt-2">
              You have not completed any blood donations yet.
            </p>

            <Link
              to="/donation-requests"
              className="inline-block mt-5 bg-red-600 text-white font-semibold px-5 py-3 rounded-xl hover:bg-red-700 transition"
            >
              Find Donation Requests
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  {/* Donation information */}
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <span className="text-red-600 font-bold">
                          {donation.blood_group}
                        </span>
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-gray-900">
                          {donation.blood_group} Blood Donation
                        </h2>

                        <p className="text-sm text-gray-500">
                          Completed Donation
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-2">
                      <p className="text-gray-600">
                        <span className="font-semibold">Location:</span>{" "}
                        {donation.recipient_upazila},{" "}
                        {donation.recipient_district}
                      </p>

                      <p className="text-gray-600 break-all">
                        <span className="font-semibold">Requester:</span>{" "}
                        {donation.requester_email}
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <div className="md:text-right">
                    <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm">
                      Completed
                    </span>

                    <div className="mt-4">
                      <Link
                        to={`/dashboard/request-details/${donation._id}`}
                        className="text-sm font-semibold text-red-600 hover:underline"
                      >
                        View Request
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DonationHistory;
