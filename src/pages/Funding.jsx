import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import useAxios from "../Hook/useAxios";

const Funding = () => {
  const axiosInstance = useAxios();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosInstance
      .get("/payments")
      .then((res) => {
        console.log("Funding Data:", res.data);

        setPayments(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [axiosInstance]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              Funding
            </h1>

            <p className="text-gray-500 mt-2">
              See how users are supporting BloodBond.
            </p>
          </div>

          <Link
            to="/donate"
            className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 transition text-center"
          >
            Give Fund
          </Link>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <span className="loading loading-spinner loading-lg text-red-600"></span>
          </div>
        ) : payments.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <h2 className="text-xl font-bold text-gray-800">No Funding Yet</h2>

            <p className="text-gray-500 mt-2">
              Be the first person to support BloodBond.
            </p>

            <Link
              to="/donate"
              className="inline-block mt-5 bg-red-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-red-700 transition"
            >
              Give Fund
            </Link>
          </div>
        ) : (
          /* Funding table */
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-600">
                      #
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-600">
                      Donor Name
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-600">
                      Fund Amount
                    </th>

                    <th className="text-left px-6 py-4 text-sm font-bold text-gray-600">
                      Funding Date
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((payment, index) => (
                    <tr
                      key={payment._id}
                      className="border-b border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {index + 1}
                      </td>

                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-800">
                          {payment.donorName || "Anonymous"}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="font-bold text-green-600">
                          ${payment.amount}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(payment.paidAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Funding;
