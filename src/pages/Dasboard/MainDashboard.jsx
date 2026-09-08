import { AuthContext } from "../../provider/AuthContext";

import useAxiosSecure from "../../Hook/useAxiosSecure";

import VolunteerDashboardHome from "./VolunteerDashboardHome";
import { useEffect, useState } from "react";
import AdminDashboardHome from "./AdminDashboardHome";
import DonorDashboardHome from "./DonorDashboardHome";
import { RiseLoader } from "react-spinners";

const MainDashboard = () => {
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);

  useEffect(() => {
    axiosSecure
      .get("/user-profile")
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosSecure]);
  if (!profile) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <RiseLoader />
      </div>
    );
  }

  if (profile.role === "volunteer") {
    return <VolunteerDashboardHome />;
  } else if (profile.role === "admin") {
    return <AdminDashboardHome />;
  } else {
    return <DonorDashboardHome />;
  }
};

export default MainDashboard;
