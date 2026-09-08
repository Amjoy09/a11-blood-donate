import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => setUsers(res.data));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChangeStatus = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
      });
  };

  const handleChangeRole = (email, role) => {
    axiosSecure
      .patch(`/update/user/role?email=${email}&role=${role}`)
      .then(() => {
        fetchUsers();
      });
  };

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200 bg-white mt-6">
      <table className="table table-zebra">
        {/* Head */}
        <thead className="bg-red-50 text-gray-700">
          <tr>
            <th className="py-4">SL</th>
            <th className="py-4">Name</th>
            <th className="py-4">Role</th>
            <th className="py-4">Status</th>
            <th className="py-4 text-center">Action</th>
          </tr>
        </thead>

        <tbody>
          {/* Extra gap between rows */}
          <tr className="h-3 bg-transparent"></tr>

          {users.map((user, index) => (
            <tr
              key={user._id}
              className="hover:bg-red-50 transition-all duration-200"
            >
              <th>{index + 1}</th>

              <td className="py-5">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="mask mask-squircle h-14 w-14 border border-red-200">
                      <img src={user?.photoURL} alt="User" />
                    </div>
                  </div>

                  <div>
                    <div className="font-bold text-gray-800">{user?.name}</div>

                    <div className="text-sm text-gray-500">{user?.email}</div>
                  </div>
                </div>
              </td>

              <td className="py-5">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleChangeRole(user?.email, "donor")}
                    className={`btn btn-xs ${
                      user?.role === "donor" ? "bg-red-600 text-white" : ""
                    }`}
                  >
                    Donor
                  </button>

                  <button
                    onClick={() => handleChangeRole(user?.email, "volunteer")}
                    className={`btn btn-xs ${
                      user?.role === "volunteer"
                        ? "bg-green-600 text-white"
                        : ""
                    }`}
                  >
                    Volunteer
                  </button>

                  <button
                    onClick={() => handleChangeRole(user?.email, "admin")}
                    className={`btn btn-xs ${
                      user?.role === "admin" ? "bg-blue-600 text-white" : ""
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </td>

              <td>
                <span
                  className={`badge badge-sm px-3 py-3 font-medium text-white ${
                    user?.status === "active" ? "bg-green-600" : "bg-red-600"
                  }`}
                >
                  {user?.status}
                </span>
              </td>

              <td className="text-center">
                {user?.status === "active" ? (
                  <button
                    onClick={() => handleChangeStatus(user?.email, "blocked")}
                    className="btn btn-sm bg-red-600 hover:bg-red-700 text-white border-none rounded-xl"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleChangeStatus(user?.email, "active")}
                    className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-none rounded-xl"
                  >
                    Unblock
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
