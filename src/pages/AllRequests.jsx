import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import { Link } from "react-router";
import Swal from "sweetalert2";

const AllRequests = () => {
  const [allRequests, setAllRequests] = useState([]);
  const [totalRequest, setTotalRequest] = useState(0);
  const [docsPerPage, setDocsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "badge-warning";

      case "inprogress":
        return "badge-info";

      case "done":
        return "badge-success";

      case "canceled":
        return "badge-error";

      default:
        return "badge-neutral";
    }
  };

  const handleDelete = async (id, recipientName) => {
    const result = await Swal.fire({
      title: `Delete Donation Request of <span style="color:#dc2626;font-weight:bold">${recipientName}</span>?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) {
      return;
    }
    try {
      const response = await axiosSecure.delete(`/all-requests/${id}`);

      if (response.data.deletedCount > 0) {
        const remainingRequests = allRequests.filter(
          (request) => request._id !== id,
        );

        setAllRequests(remainingRequests);

        Swal.fire({
          title: "Deleted!",
          text: "Donation request has been deleted.",
          icon: "success",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: "Failed to delete the request.",
        icon: "error",
      });
    }
  };

  useEffect(() => {
    axiosSecure
      .get(`/all-requests?page=${currentPage - 1}&size=${docsPerPage}`)
      .then((res) => {
        setAllRequests(res.data.result);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, currentPage, docsPerPage, totalRequest]);

  const totalPages = Math.ceil(totalRequest / docsPerPage);

  const pages = [...Array(totalPages).keys()].map((i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="">
      {allRequests.length > 0 ? (
        <div className="p-3 md:p-6">
          {/* Table Section */}

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
            <table className="table table-zebra min-w-150">
              <thead className="bg-red-50">
                <tr>
                  <th>SL</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Schedule</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Donor</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {allRequests.map((request, index) => (
                  <tr
                    key={request._id}
                    className="hover:bg-red-50 transition-colors duration-200"
                  >
                    <th>
                      {currentPage * docsPerPage - docsPerPage + (index + 1)}
                    </th>
                    <td className="font-medium">{request.recipient_name}</td>

                    <td>
                      <div className="text-sm">
                        <p className="text-gray-500">
                          {request.recipient_upazila}
                        </p>
                        <p>{request.recipient_district}</p>
                      </div>
                    </td>

                    {/* Schedule */}

                    <td>
                      <div className="text-sm">
                        <p>{request.donation_date}</p>
                        <p className="text-gray-500">{request.donation_time}</p>
                      </div>
                    </td>

                    {/* Blood */}

                    <td>
                      <span className="badge badge-error">
                        {request.blood_group}
                      </span>
                    </td>

                    {/* Status */}

                    <td>
                      <span
                        className={`badge ${getStatusClass(
                          request.donation_status,
                        )}`}
                      >
                        {request.donation_status}
                      </span>
                    </td>

                    {/* Donor */}

                    <td>
                      {request.donor_name || (
                        <span className="text-gray-400">Not Assigned</span>
                      )}
                    </td>

                    {/* Actions */}

                    <td>
                      <div className="flex flex-wrap gap-2">
                        <Link
                          to={`/dashboard/request-details/${request._id}`}
                          className="btn btn-xs btn-info"
                        >
                          View
                        </Link>

                        <Link
                          to={`/dashboard/edit-request/${request._id}`}
                          className="btn btn-xs btn-warning"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(request._id, request.recipient_name)
                          }
                          className="btn btn-xs btn-error text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="flex justify-center items-center min-h-screen text-3xl font-semibold">
          No Request Found
        </p>
      )}

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="btn btn-sm md:btn-md"
          >
            Prev
          </button>

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`btn btn-sm md:btn-md ${
                page === currentPage
                  ? "bg-red-600 text-white border-red-600"
                  : ""
              }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="btn btn-sm md:btn-md"
          >
            Next
          </button>
        </div>
      )}

      {/* Page Size Selector */}

      <div className="flex justify-center mt-6">
        <select
          value={docsPerPage}
          onChange={(e) => {
            setDocsPerPage(Number(e.target.value));
            setCurrentPage(1);
          }}
          className="select select-bordered"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={15}>15 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default AllRequests;
