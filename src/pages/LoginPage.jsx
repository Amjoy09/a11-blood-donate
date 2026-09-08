import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast } from "react-toastify";

import { AuthContext } from "../provider/AuthContext";

import logoImg from "../assets/bloodlogo.webp";

const LoginPage = () => {
  const { setUser, loginUser } = use(AuthContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;

    setLoading(true);

    try {
      const userCredential = await loginUser(email, pass);

      const loggedInUser = userCredential.user;

      setUser(loggedInUser);

      toast.success("Login Successful 🩸");

      const redirectTo = location.state?.from || "/";

      navigate(redirectTo, { replace: true });
    } catch (error) {
      console.log(error);

      toast.error("Login failed! Please check your email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-red-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-gray-900">
        {/* LEFT SIDE */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-red-700 to-red-950 p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-red-400 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white p-2 rounded-xl">
                <img
                  src={logoImg}
                  alt="BloodBond Logo"
                  className="w-12 h-12 rounded-full"
                />
              </div>

              <h1 className="text-4xl font-black tracking-tight">
                Blood<span className="text-red-200">Bond</span>
              </h1>
            </div>

            {/* Heading */}
            <h2 className="text-5xl font-extrabold leading-tight mb-6">
              Welcome <br /> Back Hero ❤️
            </h2>

            <p className="text-red-100 text-lg leading-relaxed">
              Continue your journey of saving lives. Login and connect with
              people who need blood urgently.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Track donation requests easily</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Become part of a life-saving community</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white"></div>

                <p>Help patients during emergencies</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-gray-900 px-6 sm:px-10 lg:px-14 py-10 text-white">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <img src={logoImg} alt="logo" className="w-10 h-10 rounded-full" />

            <h1 className="text-3xl font-black">
              Blood<span className="text-red-500">Bond</span>
            </h1>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-2">Login</h2>

            <p className="text-gray-400">
              Access your account and continue helping humanity.
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  required
                  placeholder="Enter your password"
                  className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500 transition"
                />

                {/* Eye Button */}
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-400"
                >
                  {showPass ? <IoMdEye size={24} /> : <IoMdEyeOff size={24} />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-red-400 hover:text-red-300 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 transition-all duration-300 text-white font-bold py-3 rounded-xl cursor-pointer disabled:opacity-50"
            >
              {loading ? "Logging In..." : "Login"}
            </button>

            {/* Register Link */}
            <p className="text-center text-gray-400 pt-2">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-red-400 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>

          {/* Footer Text */}
          <div className="mt-10 text-center text-xs text-gray-500">
            Blood donation is a small act with a massive impact ❤️
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
