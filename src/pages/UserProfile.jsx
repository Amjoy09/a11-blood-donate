import React, { useCallback, useEffect, useState } from "react";
import useAxiosSecure from "../Hook/useAxiosSecure";
import axios from "axios";
import { toast } from "react-toastify";
import { imageUploadKey } from "../api/imageUpload";

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  const fetchUserInfo = useCallback(async () => {
    const res = await axiosSecure.get("/user-profile");
    setUserInfo(res.data);
  }, [axiosSecure]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const handleSave = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      let photoURL = userInfo.photoURL;

      if (selectedFile) {
        const imageData = new FormData();

        imageData.append("image", selectedFile);

        const uploadRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imageUploadKey}`,
          imageData,
        );

        photoURL = uploadRes.data.data.display_url;
      }

      const updatedUser = {
        ...userInfo,
        photoURL,
      };

      const res = await axiosSecure.patch("/user-profile", updatedUser);

      if (res.data.modifiedCount > 0) {
        toast.success("Profile Updated");
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl border border-red-100 p-8">
      {/* Profile Header */}

      <div className="mb-15">
        <figure>
          <img
            className="w-32 h-32
md:w-48 md:h-48
lg:w-60 lg:h-60 rounded-full border-2 border-pink-800 m-auto"
            src={preview || userInfo?.photoURL}
            alt="User Profile Image"
          />
        </figure>
        <p className="text-center text-4xl font-semibold">{userInfo?.name}</p>
        <p className="text-center text-2xl font-light">{userInfo.email}</p>
        <div className="flex gap-4 justify-center mt-4">
          <span
            className={`badge text-xl py-4 ${
              userInfo.status === "active" ? "badge-success" : "badge-error"
            }`}
          >
            {userInfo.status}
          </span>

          <span
            className={`badge text-lg py-4 ${
              userInfo.role === "admin"
                ? "badge-error"
                : userInfo.role === "volunteer"
                  ? "badge-warning"
                  : "badge-success"
            }`}
          >
            {userInfo.role}
          </span>
        </div>
      </div>

      {/* User Information Form */}

      <form className="flex flex-col gap-4">
        {/* Name */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">Name</label>

          <input
            className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
            name="name"
            value={userInfo.name || ""}
            disabled={!editMode}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        {/* Email */}
        <div>
          <label className="font-semibold text-gray-700 mb-2 block">
            Email
          </label>

          <input
            className="w-full border border-gray-300 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none py-3 px-4 rounded-xl transition-all"
            disabled
            value={userInfo.email || ""}
          />
        </div>
        {/* Photo */}
        {editMode && (
          <div>
            <label className="font-semibold text-gray-700 mb-2 block">
              Profile Photo
            </label>

            <input
              className="w-full border border-gray-300 file:bg-red-600 file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg file:mr-4 py-2 px-3 rounded-xl"
              type="file"
              name="photoUrl"
              accept="image/*"
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setPreview(URL.createObjectURL(e.target.files[0]));
              }}
            />
          </div>
        )}
        {/* Blood Group */}
        <select
          name="blood"
          value={userInfo.blood || ""}
          className="select select-bordered w-full rounded-xl"
          disabled={!editMode}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              blood: e.target.value,
            })
          }
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
          value={userInfo.district}
          disabled={!editMode}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              district: e.target.value,
            })
          }
          className="select select-bordered w-full rounded-xl"
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
          value={userInfo.upazila}
          disabled={!editMode}
          onChange={(e) =>
            setUserInfo({
              ...userInfo,
              upazila: e.target.value,
            })
          }
          className="select select-bordered w-full rounded-xl"
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
      </form>

      {editMode ? (
        <button
          disabled={loading}
          onClick={handleSave}
          className="btn btn-primary mt-7 text-xl py-6"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      ) : (
        <button
          className="btn btn-primary mt-7 text-xl py-6"
          onClick={() => setEditMode(true)}
        >
          Edit Profile
        </button>
      )}

      <button
        className="btn btn-neutral mt-7 text-xl py-6 ml-5"
        type="button"
        onClick={() => {
          setEditMode(false);
          setPreview("");
          setSelectedFile(null);
          fetchUserInfo();
        }}
      >
        Cancel
      </button>
    </div>
  );
};

export default UserProfile;
