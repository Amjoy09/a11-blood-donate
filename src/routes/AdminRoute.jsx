import { Navigate } from "react-router";
import { use } from "react";
import { AuthContext } from "../provider/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, role, loading } = use(AuthContext);

  if (loading) {
    return <span>Loading...</span>;
  }

  if (!user || role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
