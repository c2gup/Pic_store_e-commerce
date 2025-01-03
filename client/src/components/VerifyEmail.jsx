import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  const [message, setMessage] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setMessage("Invalid or missing token.");
        return;
      }

      try {
        const res = await axios.get(`/api/auth/verify-email?token=${token}`);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred.");
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default VerifyEmail;
