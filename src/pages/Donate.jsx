import React, { useContext } from "react";
import useAxios from "../Hook/useAxios";
import { AuthContext } from "../provider/AuthContext";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();

    const donatedAmount = e.target.donatedAmount.value;

    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donatedAmount,
      donorEmail,
      donorName,
    };

    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        console.log(res.data);

        window.location.href = res.data.url;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4">
      <form
        onSubmit={handleCheckout}
        className="bg-white rounded-2xl shadow-sm p-8 w-full max-w-md"
      >
        <h1 className="text-3xl font-bold text-gray-900">Give Fund</h1>

        <p className="text-gray-500 mt-2 mb-6">
          Support BloodBond and help us continue our mission.
        </p>

        <input
          name="donatedAmount"
          type="number"
          min="1"
          step="1"
          required
          placeholder="Enter amount in USD"
          className="input input-bordered w-full"
        />

        <button type="submit" className="btn btn-primary w-full mt-4">
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Donate;
