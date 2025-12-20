import React, { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Loader } from "lucide-react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const { user, loading, roleLoading } = useContext(AuthContext);

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center animate-spin [animation-duration:2s] min-h-screen">
        <Loader size={35} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={"/login"}></Navigate>;
  }
  return children;
};

export default PrivateRoute;
