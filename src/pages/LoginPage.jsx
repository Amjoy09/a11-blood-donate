import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { GrGoogle } from "react-icons/gr";
import { Link, useLocation, useNavigate } from "react-router";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { toast, ToastContainer } from "react-toastify";
import auth from "../firebase/firebase.config";
import { AuthContext } from "../provider/AuthProvider";

const LoginPage = () => {
  const { setUser, handleGoogleSignin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;

    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        toast("Login Successful!");
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        toast("Login failed! Please check your email or password.");
      });
  };

  const googleSignin = () => {
    handleGoogleSignin()
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast("Google Login Successful!");
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      })
      .catch((err) => {
        console.log(err);
        toast("Google Login failed!");
      });
  };

  const handleForget = () => {
    navigate(`/forget/${email}`);
  };

  return (
    <div className="py-10 md:bg-blue-500 bg-none">
      <div className="md:w-4/12 w-11/12 border-2 mx-auto px-7 py-8 rounded-lg bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-7">Login</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-xl font-semibold">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-400 py-3 px-3 mb-4 rounded-sm"
            type="email"
            name="email"
            placeholder="Your Email"
          />

          <label className="text-xl font-semibold">Password</label>
          <div className="relative flex">
            <input
              className="border border-gray-400 w-full py-3 mb-4 px-3 rounded-sm"
              type={showPass ? "text" : "password"}
              name="password"
              placeholder="Type Password"
            />

            <button
              onClick={() => {
                setShowPass(!showPass);
              }}
            >
              {showPass ? (
                <IoMdEye size={26} className="absolute top-3 left-100" />
              ) : (
                <IoMdEyeOff size={26} className="absolute top-3 left-100" />
              )}
            </button>
          </div>
          <button
            onClick={handleForget}
            className="text-lg font-semibold hover:underline cursor-pointer"
          >
            Forget Password?
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-center text-white text-xl font-semibold py-3 mt-3 rounded-sm cursor-pointer"
          >
            Login
          </button>
          <button
            onClick={googleSignin}
            className="text-center text-lg font-semibold border border-gray-400 py-2.5 px-3 mt-3 rounded-sm flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white hover:font-normal cursor-pointer"
          >
            <FcGoogle size={24} />
            Login With Google
          </button>
          <p className="text-[18px] font-semibold text-center">
            Don't Have an Account?{" "}
            <Link
              to="/register"
              className="text-blue-400 hover:underline text-[20px]"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
