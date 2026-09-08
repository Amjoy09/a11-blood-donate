import React, { use, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

import auth from "../firebase/firebase.config";
import axios from "axios";
import logoImg from "../assets/bloodlogo.webp";
import { AuthContext } from "../provider/AuthContext";
import { imageUploadKey } from "../api/imageUpload";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const { registerWithEmailPassword, setUser, logoutUser } = use(AuthContext);

  const navigate = useNavigate();

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    axios.get("./upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value;
    const pass = form.password.value;
    const confirmPass = form.confirmPassword.value;
    const name = form.name.value;
    const blood = form.blood.value;

    const photoUrl = form.photoUrl;
    const file = photoUrl.files[0];

    // Password Validation

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(pass)) {
      return toast.error(
        "Use 8+ characters with uppercase, lowercase, number & symbol.",
      );
    }

    // Confirm Password Validation

    if (pass !== confirmPass) {
      return toast.error("Passwords do not match!");
    }

    // Image Validation

    if (!file) {
      return toast.error("Please upload a profile image!");
    }

    try {
      setLoading(true);

      // Upload image to imgbb

      const imageData = new FormData();
      imageData.append("image", file);

      const imageUploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
        imageData,
      );

      const mainPhotoUrl = imageUploadRes.data.data.display_url;

      // Create Firebase User

      const userCredential = await registerWithEmailPassword(email, pass);

      // Update User Profile

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: mainPhotoUrl,
      });

      setUser(userCredential.user);

      // Save User in Database

      const formData = {
        email,
        name,
        blood,
        district,
        upazila,
        photoURL: mainPhotoUrl,
        role: "donor",
        status: "active",
      };

      await axios.post("http://localhost:5000/users", formData);

      toast.success("Account Created Successfully!");

      // Logout after registration for better UX

      await logoutUser();

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast.error(error.message || "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg border border-red-100 shadow-2xl rounded-3xl p-8 md:p-10">
        {/* Logo */}

        <div className="flex flex-col items-center mb-6">
          <div className="p-1.5 rounded-lg border border-red-500 bg-gray-800">
            <img
              className="h-10 w-10 rounded-full"
              src={logoImg}
              alt="BloodBond Logo"
            />
          </div>

          <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-800">
            Blood<span className="text-red-600">Bond</span>
          </h2>

          <p className="text-sm text-gray-500 mt-2 text-center">
            Join our life-saving donor community
          </p>
        </div>

        {/* Heading */}

        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800">
          Create Your Account
        </h1>

        {/* Form */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name */}

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Name
            </label>

            <input
              className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
              name="name"
              placeholder="Your Name"
              type="text"
              required
            />
          </div>

          {/* Email */}

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Email
            </label>

            <input
              className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </div>

          {/* Photo */}

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Profile Photo
            </label>

            <input
              className="w-full border border-gray-300 file:bg-red-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 py-2 px-3 rounded-xl"
              type="file"
              name="photoUrl"
              accept="image/*"
              required
            />
          </div>

          {/* Blood Group */}

          <select
            name="blood"
            defaultValue=""
            className="select select-bordered w-full rounded-xl"
            required
          >
            <option value="" disabled>
              Choose Blood Group
            </option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          {/* District */}

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select select-bordered w-full rounded-xl"
            required
          >
            <option value="" disabled>
              Choose District
            </option>

            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} ({d.bn_name})
              </option>
            ))}
          </select>

          {/* Upazila */}

          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select select-bordered w-full rounded-xl"
            required
          >
            <option value="" disabled>
              Choose Upazila
            </option>

            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name} ({u.bn_name})
              </option>
            ))}
          </select>

          {/* Password */}

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Password
            </label>

            <div className="relative">
              <input
                className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
                type={showPass ? "text" : "password"}
                name="password"
                placeholder="Type Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute top-3 right-4 text-gray-500"
              >
                {showPass ? <IoMdEye size={24} /> : <IoMdEyeOff size={24} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}

          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Confirm Password
            </label>

            <div className="relative">
              <input
                className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
                type={showConfirmPass ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                required
              />

              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute top-3 right-4 text-gray-500"
              >
                {showConfirmPass ? (
                  <IoMdEye size={24} />
                ) : (
                  <IoMdEyeOff size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}

          <button
            disabled={loading}
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white text-lg font-semibold py-3 rounded-xl transition-all shadow-lg hover:shadow-red-200 cursor-pointer disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>

          {/* Login Link */}

          <p className="text-center text-gray-600 font-medium">
            Already Have an Account?{" "}
            <Link
              to="/login"
              className="text-red-600 hover:text-red-700 font-bold"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
