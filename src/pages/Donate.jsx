import React, { useContext } from "react";
import useAxios from "../Hook/useAxios";
import { AuthContext } from "../provider/AuthProvider";

const Donate = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;

    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };

    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };
  return (
    <div>
      <form
        onSubmit={handleCheckout}
        className="flex justify-center items-center min-h-screen gap-4"
      >
        <input
          name="donateAmount"
          type="text"
          placeholder="Type Here"
          className="input"
        />
        <button type="submit" className=" btn btn-primary">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;
