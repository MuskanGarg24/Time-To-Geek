import axios from "axios";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Register.css";

const VerifyOTP = () => {
  // states
  const [otp, setOtp] = useState("");
  const { userId } = useParams();
  const navigate = useNavigate();

  // OTP verification function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://timetogeek.onrender.com/api/auth/verifyOTP",
        { userId, otp }
      );
      const verified = response.data.status;

      if (verified === "VERIFIED") {
        // If the OTP is successfully verified, navigate to /login
        navigate("/login");
      } else {
        alert("Incorrect OTP!");
      }
    } catch (error) {
      alert("Error verifying OTP. Please try again later.");
    }
  };

  return (
    <>
      <h4 className="otpHead">
        OTP has been sent to your email. Enter your OTP here to verify your
        account.
      </h4>
      <div className="inputOTPdiv">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your OTP"
            onChange={(e) => {
              setOtp(e.target.value);
            }}
            className="otpInput"
          />
          <button type="submit" className="OTPButton">
            VERIFY
          </button>
        </form>
      </div>
    </>
  );
};

export default VerifyOTP;
