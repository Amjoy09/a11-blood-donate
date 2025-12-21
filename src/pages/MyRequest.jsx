import React, { useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";

const MyRequest = () => {
  const [totalRequests, setTotalRequests] = useState([0]);
  const [myRequests, setMyRequests] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        setMyRequests(res.data.request);
        setTotalRequests(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPages = Math.ceil(totalRequests / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()].map((e) => e + 1);

  //   console.log(numberOfPages);
  //   console.log(myRequests);
  //   console.log(totalRequests);
  //    console.log(pages);

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="text-4xl font-bold">
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>S/N</th>
              <th>Name</th>
              <th>Hospital Name</th>
              <th>Blood Group</th>
            </tr>
          </thead>
          <tbody>
            {myRequests.map((request, i) => (
              <tr>
                <th>{currentPage * 10 + (i + 1) - 10}</th>
                <td>{request?.recipient_name}</td>
                <td>{request?.hospital_name}</td>
                <td>{request?.blood_group}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-center mt-12 gap-4">
          <button onClick={handlePrev} className="btn">
            Prev
          </button>
          {pages.map((page) => (
            <button
              onClick={() => setCurrentPage(page)}
              className={`btn ${
                page === currentPage ? "bg-[#435585] text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button onClick={handleNext} className="btn">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
