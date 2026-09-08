import React, { use } from "react";
import { Navigate } from "react-router";
import { Loader } from "lucide-react";
import { AuthContext } from "../provider/AuthContext";

const GuestRoute = ({ children }) => {
  const { user, loading, roleLoading } = use(AuthContext);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center animate-spin [animation-duration:2s] min-h-screen">
        <Loader size={35} />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default GuestRoute;
