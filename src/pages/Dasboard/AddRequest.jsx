import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hook/useAxios";
import useAxiosSecure from "../../Hook/useAxiosSecure";

export default function AddRequest() {
  const { user } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [upazila, setUpazila] = useState("");
  const [district, setDistrict] = useState("");

  const axiosInstance = useAxios();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data.upazilas);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data.districts);
    });
  }, []);

  const handleRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const requester_name = form.requester_name.value;
    const requester_email = form.requester_email.value;
    const recipient_name = form.recipient_name.value;
    const recipient_district = district;
    const recipient_upazila = upazila;
    const hospital_name = form.hospital_name.value;
    const blood_group = form.blood_group.value;

    const formData = {
      requester_name,
      requester_email,
      recipient_name,
      recipient_district,
      recipient_upazila,
      hospital_name,
      blood_group,
      donation_status: "pending",
    };

    axiosSecure
      .post("/requests", formData)
      .then((res) => {
        alert(res.data.insertedId);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="max-w-3xl mx-auto bg-white border rounded-2xl shadow-sm p-6 my-10">
      <h2 className="text-xl font-semibold mb-6">Blood Donation Request</h2>

      <form onSubmit={handleRequest} className="space-y-5">
        {/* Requester Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Requester Name
            </label>
            <input
              name="requester_name"
              type="text"
              value={user?.displayName}
              readOnly
              className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Requester Email
            </label>
            <input
              name="requester_email"
              type="email"
              value={user?.email}
              readOnly
              className="w-full rounded-lg border bg-gray-100 px-3 py-2 text-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Recipient Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Name
            </label>
            <input
              name="recipient_name"
              type="text"
              placeholder="Recipient full name"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Blood Group
            </label>
            <select
              name="blood_group"
              className="w-full rounded-lg border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Select blood group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">District</label>
            <select
              name="recipient_district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="w-full rounded-lg border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              {districts.map((d) => (
                <option value={d?.name} key={d?.id}>
                  {d?.name} ({d?.bn_name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Upazila</label>
            <select
              name="recipient_upazila"
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="w-full rounded-lg border bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              <option value="">Select upazila</option>
              {upazilas.map((u) => (
                <option value={u?.name} key={u?.id}>
                  {u?.name} ({u?.bn_name})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Hospital & Address */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Hospital Name
          </label>
          <input
            name="hospital_name"
            type="text"
            placeholder="e.g Dhaka Medical College Hospital"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Full Address</label>
          <input
            name="full_address"
            type="text"
            placeholder="e.g Zahir Raihan Rd, Dhaka"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        {/* Date & Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Donation Date
            </label>
            <input
              type="date"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Donation Time
            </label>
            <input
              type="time"
              className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Request Message
          </label>
          <textarea
            rows="4"
            placeholder="Explain why blood is urgently needed"
            className="w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-300"
          />
        </div>

        <input type="hidden" name="donation_status" value="pending" />
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-red-800 text-white py-2.5 rounded-xl hover:bg-red-600 transition cursor-pointer"
          >
            Request Blood Donation
          </button>
        </div>
      </form>
    </div>
  );
}
