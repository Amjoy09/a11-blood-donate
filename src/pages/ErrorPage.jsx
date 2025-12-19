import React from "react";
import errImg from "../assets/error-404.png";
import { useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div>
      <div className="flex justify-center">
        <img src={errImg} alt="" />
      </div>
      <p className="text-6xl font-semibold text-purple-700 text-center">
        Page Not Found
      </p>
      <p className="text-4xl font-semibold text-red-600 mb-4 text-center mt-4">
        {error.message}
      </p>
    </div>
  );
};

export default ErrorPage;
