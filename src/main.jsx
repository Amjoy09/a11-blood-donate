import { createRoot } from "react-dom/client";
import "./index.css";
import router from "./routes/Routes.jsx";
import { RouterProvider } from "react-router";
import AuthProvider from "./provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
    <ToastContainer position="top-center" />
  </>
);
