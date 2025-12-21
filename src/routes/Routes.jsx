import { createBrowserRouter } from "react-router";
import RootLayout from "../rootLayout/RootLayout";
import Home from "../pages/Home";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../pages/Dasboard/MainDashboard";

import AddRequest from "../pages/Dasboard/AddRequest";
import AllUsers from "../pages/Dasboard/AllUsers";
import PrivateRoute from "./PrivateRoute";
import MyRequest from "../pages/MyRequest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    hydrateFallbackElement: <p>Loading...</p>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <LoginPage></LoginPage>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MainDashboard></MainDashboard>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "my-request",
        element: <MyRequest></MyRequest>,
      },
    ],
  },
]);

export default router;
