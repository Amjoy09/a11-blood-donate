import React, { use, useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";
import { AuthContext } from "../../provider/AuthContext";
import { RiseLoader } from "react-spinners";
import { toast } from "react-toastify";

const RequestDetails = () => {
  const [request, setRequest] = useState(null);
  const [profile, setProfile] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = use(AuthContext);

  const isAcceptedDonor = request?.donor_email === user?.email;
  const isAdmin = profile?.role === "admin";

  useEffect(() => {
    axiosSecure
      .get(`/request-detail/${id}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosSecure
      .get("/user-profile")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, id]);

  const handleConfirmDonation = async () => {
    try {
      const res = await axiosSecure.patch(`/request-accept/${id}`);
      console.log(res.data);

      const updateRequest = await axiosSecure.get(`/request-detail/${id}`);

      setRequest(updateRequest.data);

      toast.success("Donation request accepted");
      setShowModal(false);
    } catch (error) {
      console.log(error.response?.data);
      console.log(error);
    }
  };

  const handleDone = async () => {
    try {
      await axiosSecure.patch(`/request-done/${id}`);

      const updateRequest = await axiosSecure.get(`/request-detail/${id}`);

      setRequest(updateRequest.data);

      toast.success("Blood Donation done");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = async () => {
    try {
      await axiosSecure.patch(`/request-cancel/${id}`);

      const updateRequest = await axiosSecure.get(`/request-detail/${id}`);

      setRequest(updateRequest.data);

      toast.success("Blood Donation Cancelled");
    } catch (error) {
      console.log(error);
    }
  };

  if (!request) {
    return (
      <h2 className="items-center flex justify-center min-h-screen">
        <RiseLoader />
      </h2>
    );
  }
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden">
        {/* Header */}

        <div className="bg-red-600 text-white p-6">
          <h1 className="text-3xl font-bold">Blood Donation Request</h1>

          <p className="opacity-90 mt-2">Help save a life by donating blood</p>
        </div>

        {/* Body */}

        <div className="p-6 md:p-8 space-y-6">
          {/* Recipient */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">
              Recipient Name
            </h3>

            <p className="text-xl font-semibold">{request.recipient_name}</p>
          </div>

          {/* Blood Group */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Blood Group</h3>

            <span className="badge badge-error badge-lg">
              {request.blood_group}
            </span>
          </div>

          {/* Location */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Location</h3>

            <p>
              {request.recipient_upazila}, {request.recipient_district}
            </p>
          </div>

          {/* Hospital */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Hospital</h3>

            <p>{request.hospital_name}</p>
          </div>

          {/* Date */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Donation Date</h3>

            <p>{request.donation_date}</p>
          </div>

          {/* Time */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Donation Time</h3>

            <p>{request.donation_time}</p>
          </div>

          {/* Status */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Status</h3>

            <span className="badge badge-warning">
              {request.donation_status}
            </span>
          </div>

          {/* Message */}

          <div>
            <h3 className="text-sm text-gray-500 font-medium">Message</h3>

            <p className="leading-relaxed">{request.message}</p>
          </div>

          {/* Donate Button */}
          {/* Action Section */}

          {request.donation_status === "done" && (
            <div className="space-y-3">
              <div className="alert alert-success">
                <span>Donation Completed Successfully</span>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <h4 className="font-semibold mb-2">Completed Donor</h4>

                <p>{request.donor_name}</p>

                <p className="text-sm text-gray-500">{request.donor_email}</p>
              </div>
            </div>
          )}

          {request.donation_status === "pending" && (
            <button
              className="btn btn-error text-white"
              disabled={isAdmin}
              onClick={() => {
                !isAdmin && setShowModal(true);
              }}
            >
              {isAdmin ? "Admins cannot donate" : "Donate Blood"}
            </button>
          )}

          {request.donation_status === "inprogress" && isAcceptedDonor && (
            <div className="space-y-4">
              <div className="alert alert-success">
                <span>You Accepted This Request</span>
              </div>

              <div className="flex gap-3">
                <button onClick={handleDone} className="btn btn-success">
                  Donation Done
                </button>

                <button onClick={handleCancel} className="btn btn-warning">
                  Cancel Request
                </button>
              </div>
            </div>
          )}

          {request.donation_status === "inprogress" && !isAcceptedDonor && (
            <div className="space-y-3">
              <div className="alert alert-info">
                <span>Request Already Accepted</span>
              </div>

              <div className="bg-gray-50 border rounded-xl p-4">
                <h4 className="font-semibold mb-2">Accepted Donor</h4>

                <p>{request.donor_name}</p>

                <p className="text-sm text-gray-500">{request.donor_email}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6">Confirm Blood Donation</h2>

            <div className="space-y-4">
              <div>
                <label className="font-semibold block mb-2">Donor Name</label>

                <input
                  type="text"
                  value={user?.displayName || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div>
                <label className="font-semibold block mb-2">Donor Email</label>

                <input
                  type="text"
                  value={user?.email || ""}
                  readOnly
                  className="input input-bordered w-full"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleConfirmDonation}
                  className="btn btn-error flex-1 text-white"
                >
                  Confirm Donation
                </button>

                <button
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline flex-1"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestDetails;
