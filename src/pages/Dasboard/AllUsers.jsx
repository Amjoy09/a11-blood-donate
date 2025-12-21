import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);

  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        console.log(res.data);
        fetchUsers();
      });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Address</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users.map((user) => (
              <tr>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.mainPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {user?.upazila}
                  </span>

                  <span className="badge badge-ghost badge-sm">
                    {user?.district}
                  </span>
                </td>
                <td>{user?.status == "active" ? "Active" : "Blocked"}</td>
                <th className="space-x-3">
                  {user?.status == "active" ? (
                    <button
                      onClick={() => handleStatusChange(user?.email, "blocked")}
                      className="btn text-md btn-ghost btn-xs bg-red-600 text-white"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user?.email, "active")}
                      className="btn text-md btn-ghost btn-xs bg-green-600 text-white"
                    >
                      Activate
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
