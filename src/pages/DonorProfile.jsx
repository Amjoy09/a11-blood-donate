import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxios from "../Hook/useAxios";

const DonorProfile = () => {
  const { id } = useParams();
  const axiosInstance = useAxios();

  const [donor, setDonor] = useState(null);
  const [showContact, setShowContact] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get(`donor-profile/${id}`)
      .then((res) => {
        setDonor(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosInstance, id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span>Loading donor profile...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          {/* Donor Photo Section */}
          <div className="relative inline-block mb-4">
            {donor.photoURL ? (
              <img
                src={donor.photoURL}
                alt={donor.name}
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md mx-auto"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-gray-200 border-4 border-white shadow-md mx-auto flex items-center justify-center text-gray-500 font-bold text-2xl">
                {donor.name?.charAt(0) || "D"}
              </div>
            )}
          </div>

          <h2 className="text-3xl font-bold text-gray-900">{donor.name}</h2>

          <p className="text-6xl font-extrabold text-red-600 mt-4">
            {donor.blood}
          </p>

          <span className="inline-block mt-4 px-4 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
            Active Donor
          </span>
        </div>

        <div className="border-t border-gray-200 my-8"></div>

        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Location</h3>

          <p className="text-gray-600">
            {donor.upazila}, {donor.district}
          </p>
        </div>

        <div className="mt-8">
          <button
            onClick={() => setShowContact(true)}
            type="button"
            className="w-full bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 transition"
          >
            Contact Donor
          </button>

          {showContact && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl">
              <p className="text-sm text-gray-500">Donor Email</p>

              <p className="font-semibold text-black mt-1">{donor.email}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;
