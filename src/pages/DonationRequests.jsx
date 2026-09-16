import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const DonationRequests = () => {
  const [search, setSearch] = useState({
    blood: "",
    district: "",
    upazila: "",
  });
  const [requests, setRequests] = useState([]);
  const [totalRequests, setTotalRequests] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [docsPerPage, setDocsPerPage] = useState(10);
  const [districts, setDistricts] = useState([]);
  const [upazilas, SetUpazilas] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost:5000/donation-requests?page=${
          currentPage - 1
        }&size=${docsPerPage}&blood=${encodeURIComponent(search.blood)}&district=${encodeURIComponent(search.district)}&upazila=${encodeURIComponent(search.upazila)}`,
      )
      .then((res) => {
        setRequests(res.data.result);
        setTotalRequests(res.data.totalRequest);
      })
      .catch((err) => console.log(err));

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      SetUpazilas(res.data.upazilas);
    });
  }, [currentPage, docsPerPage, search.blood, search.district, search.upazila]);

  const totalPages = Math.ceil(totalRequests / docsPerPage);

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

  const handleSearchChange = (e) => {
    const { name, value } = e.target;

    setSearch((prev) => {
      if (name === "district") {
        return {
          ...prev,
          district: value,
          upazila: "",
        };
      }

      return {
        ...prev,
        [name]: value,
      };
    });
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setSearch({
      blood: "",
      district: "",
      upazila: "",
    });

    setCurrentPage(1);
  };

  const selectedDistrict = districts.find(
    (district) => district.name === search.district,
  );

  console.log(selectedDistrict);

  const filteredUpazilas = selectedDistrict
    ? upazilas.filter((upazila) => upazila.district_id === selectedDistrict.id)
    : [];

  console.log(filteredUpazilas);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-6">Blood Donation Requests</h1>
        <div className="bg-white shadow rounded-xl p-6 mb-6 ">
          <h2 className="text-xl font-semibold mb-4">
            Search Blood Donation Requests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              name="blood"
              onChange={handleSearchChange}
              className="select select-bordered w-full"
              value={search.blood}
            >
              <option value="">All Blood Groups</option>

              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>

            <select
              name="district"
              value={search.district}
              onChange={handleSearchChange}
              className="select select-bordered w-full"
            >
              <option value="">All Districts</option>

              {districts.map((district) => (
                <option key={district.id} value={district.name}>
                  {district.name}
                </option>
              ))}
            </select>

            <select
              name="upazila"
              value={search.upazila}
              onChange={handleSearchChange}
              className="select select-bordered w-full"
            >
              <option value="">All Upazilas</option>

              {filteredUpazilas.map((upazila) => (
                <option key={upazila.id} value={upazila.name}>
                  {upazila.name} ({upazila.bn_name})
                </option>
              ))}
            </select>
            <button
              onClick={handleClearFilters}
              className="btn bg-black text-white"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>

      {requests.length === 0 ? (
        <p className="text-center text-2xl font-semibold py-20">
          No Donation Requests Found
        </p>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="table table-zebra min-w-175">
            <thead className="bg-red-50">
              <tr>
                <th>SL</th>
                <th>Recipient</th>
                <th>Location</th>
                <th>Schedule</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request, index) => (
                <tr
                  key={request._id}
                  className="hover:bg-red-50 transition-colors duration-200"
                >
                  <th>{(currentPage - 1) * docsPerPage + index + 1}</th>
                  <td className="font-medium">{request.recipient_name}</td>
                  <td>
                    <div className="text-sm">
                      <p className="text-gray-500">
                        {request.recipient_upazila}
                      </p>

                      <p>{request.recipient_district}</p>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p>{request.donation_date}</p>

                      <p className="text-gray-500">{request.donation_time}</p>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-error">
                      {request.blood_group}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${getStatusClass(request.donation_status)}`}
                    >
                      {request.donation_status}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/dashboard/request-details/${request._id}`}
                      className="btn btn-sm btn-info"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
        </div>
      )}
    </div>
  );
};

export default DonationRequests;
