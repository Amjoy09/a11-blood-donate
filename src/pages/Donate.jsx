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

    const formData = { donatedAmount, donorEmail, donorName };

    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.url;
      })
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form
        onSubmit={handleCheckout}
        className="flex justify-center items-center min-h-screen gap-4"
      >
        <input
          name="donatedAmount"
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
