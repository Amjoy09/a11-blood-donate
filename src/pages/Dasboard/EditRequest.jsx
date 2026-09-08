import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../Hook/useAxiosSecure";

const EditRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const axiosSecure = useAxiosSecure();

  const [request, setRequest] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/request-detail/${id}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosSecure, id]);

  const handleUpdateRequest = async (e) => {
    e.preventDefault();

    const form = e.target;
    const recipient_name = form.recipient_name.value;
    const blood_group = form.blood_group.value;
    const recipient_district = form.recipient_district.value;
    const recipient_upazila = form.recipient_upazila.value;
    const hospital_name = form.hospital_name.value;
    const donation_date = form.donation_date.value;
    const donation_time = form.donation_time.value;
    const message = form.message.value;

    const updatedRequest = {
      recipient_name,
      blood_group,
      recipient_district,
      recipient_upazila,
      hospital_name,
      donation_date,
      donation_time,
      message,
    };

    try {
      const res = await axiosSecure.patch(
        `/update-request/${id}`,
        updatedRequest,
      );

      navigate("/dashboard/my-request");

      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data.message);
      console.log(error);
    }
  };

  if (!request) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <div className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Edit Donation Request</h1>

        <form onSubmit={handleUpdateRequest}>
          {/* Recipient Name */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Recipient Name</label>

            <input
              type="text"
              name="recipient_name"
              defaultValue={request.recipient_name}
              className="input input-bordered w-full"
            />
          </div>

          {/* Hospital */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Hospital Name</label>

            <input
              type="text"
              name="hospital_name"
              defaultValue={request.hospital_name}
              className="input input-bordered w-full"
            />
          </div>

          {/* Message */}

          <div className="mb-4">
            <label className="block font-semibold mb-2">Message</label>

            <textarea
              name="message"
              defaultValue={request.message}
              className="textarea textarea-bordered w-full"
            />
          </div>

          <div className="mb-4">
            <label className="block font-semibold mb-2">Blood Group</label>

            <select
              name="blood_group"
              defaultValue={request.blood_group}
              className="select select-bordered w-full"
            >
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

          <div className="mb-4">
            <label className="block font-semibold mb-2">District</label>
            <input
              type="text"
              name="recipient_district"
              defaultValue={request.recipient_district}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Upazila</label>
            <input
              type="text"
              name="recipient_upazila"
              defaultValue={request.recipient_upazila}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Donation Date</label>
            <input
              type="date"
              name="donation_date"
              defaultValue={request.donation_date}
              className="input input-bordered w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-2">Donation Time</label>
            <input
              type="time"
              name="donation_time"
              defaultValue={request.donation_time}
              className="input input-bordered w-full"
            />
          </div>

          <button type="submit" className="btn btn-error text-white">
            Update Request
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRequest;
