import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { AuthContext } from "../provider/AuthProvider";
import auth from "../firebase/firebase.config";
import axios from "axios";

const RegisterPage = () => {
  const [showPass, setShowPass] = useState(false);
  const { registerWithEmailPassword, setUser, handleGoogleSignin } =
    useContext(AuthContext);

  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("./district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const pass = e.target.password.value;
    const name = e.target.name.value;
    const photoUrl = e.target.photoUrl;
    const file = photoUrl.files[0];
    const blood = e.target.blood.value;

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (pass.length < 6) {
      toast("Password must be at least 6 characters!");
      return;
    }
    if (!uppercase.test(pass)) {
      toast("Password must contain at least one uppercase letter!");
      return;
    }
    if (!lowercase.test(pass)) {
      toast("Password must contain at least one lowercase letter!");
      return;
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=1c0d41d0526dec9cad2c3fd2ac8031b3`,
      { image: file },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    const mainPhotoUrl = res.data.data.display_url;

    const formData = {
      email,
      pass,
      name,
      mainPhotoUrl,
      blood,
      district,
      upazila,
    };

    console.log(formData);

    if (res.data.success == true) {
      registerWithEmailPassword(email, pass)
        .then((userCredential) => {
          updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: mainPhotoUrl,
          })
            .then(() => {
              setUser(userCredential.user);
              axios
                .post(`http://localhost:5000/users`, formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              toast("Sign Up Successful!");
              return;
            })
            .catch((error) => {
              console.log(error);
              toast("Failed to update profile. Please try again!");
              return;
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // const googleSignup = () => {
  //   handleGoogleSignin()
  //     .then((result) => {
  //       const user = result.user;
  //       setUser(user);
  //       toast("Sign Up with Google successfully");
  //       return;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div className="py-10 md:bg-blue-500 bg-none">
      <div className="md:w-4/12 w-11/12 border-2 mx-auto px-7 py-8 rounded-lg bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-7">Sign Up</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-xl font-semibold">Name</label>
          <input
            className="border border-gray-400 py-3 px-3 mb-4 rounded-sm"
            name="name"
            placeholder="Your Name"
            type="text"
          />
          <label className="text-xl font-semibold">Email</label>
          <input
            className="border border-gray-400 py-3 px-3 mb-4 rounded-sm"
            type="email"
            name="email"
            placeholder="Your Email"
          />
          <label className="text-xl font-semibold">Photo URL</label>
          <input
            className="border border-gray-400 py-3 px-3 mb-4 rounded-sm"
            type="file"
            name="photoUrl"
            placeholder="Photo URL"
          />

          <select
            name="blood"
            defaultValue="Choose Blood Group"
            className="select"
          >
            <option selected>Choose Blood Group</option>

            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B-</option>
            <option value="C+">C+</option>
            <option value="C-">C-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>

          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="select"
          >
            <option selected>Choose District</option>

            {districts.map((d) => (
              <option value={d?.name} key={d?.id}>
                {d?.name} ({d?.bn_name})
              </option>
            ))}
          </select>
          <select
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            className="select"
          >
            <option selected>Choose Upazila</option>

            {upazilas.map((u) => (
              <option value={u?.name} key={u?.id}>
                {u?.name} ({u?.bn_name})
              </option>
            ))}
          </select>

          <label className="text-xl font-semibold">Password</label>
          <div className=" flex">
            <input
              className="border border-gray-400 w-full py-3 mb-4 px-3 rounded-sm relative"
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
                <IoMdEye
                  size={26}
                  className="absolute top-192 right-15 md:right-137"
                />
              ) : (
                <IoMdEyeOff
                  size={26}
                  className="absolute top-192 right-15 md:right-137"
                />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-400 text-center text-white text-xl font-semibold py-3 rounded-sm cursor-pointer"
          >
            Sign Up
          </button>
          <p className="text-[18px] font-semibold text-center">
            Already Have an Account?{" "}
            <Link
              to="/login"
              className="text-blue-400 hover:underline text-[20px]"
            >
              Login
            </Link>
          </p>
          {/* <button
            onClick={googleSignup}
            className="text-center text-lg font-semibold border border-gray-400 py-2.5 px-3 mt-3 rounded-sm flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white hover:font-normal cursor-pointer"
          >
            <FcGoogle size={24} />
            Login With Google
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
