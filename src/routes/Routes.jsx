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
import Donate from "../pages/Donate";
import PaymentSuccess from "../pages/PaymentSuccess";
import SearchRequest from "../pages/SearchRequest";

import UserProfile from "../pages/UserProfile";
import AdminRoute from "./AdminRoute";
import RequestDetails from "../pages/Dasboard/RequestDetails";
import EditRequest from "../pages/Dasboard/EditRequest";
import AllRequests from "../pages/AllRequests";
import DonationRequests from "../pages/DonationRequests";
import GuestRoute from "../pages/GuestRoute";

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
        element: (
          <GuestRoute>
            <LoginPage></LoginPage>
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <RegisterPage></RegisterPage>
          </GuestRoute>
        ),
      },
      {
        path: "/donate",
        element: (
          <PrivateRoute>
            <Donate></Donate>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "/search-request",
        element: <SearchRequest></SearchRequest>,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests></DonationRequests>,
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
        element: (
          <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        ),
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "my-request",
        element: <MyRequest></MyRequest>,
      },
      {
        path: "all-requests",
        element: <AllRequests></AllRequests>,
      },
      {
        path: "user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "request-details/:id",
        element: <RequestDetails></RequestDetails>,
      },
      {
        path: "edit-request/:id",
        element: <EditRequest></EditRequest>,
      },
    ],
  },
]);

export default router;
