


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";  // Import react-hot-toast

const VerifyEmail = () => {
  const location = useLocation(); // Get current location from the router
  const navigate = useNavigate(); // Use navigate hook for page redirection
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      // Parse the query parameters using URLSearchParams
      const query = new URLSearchParams(location.search);
      const token = query.get("token"); // Extract the token from the query
      console.log("Extracted token:", token);

      if (!token) {
        setMessage("Invalid or missing token.");
        return;
      }

      try {
        // Make a GET request to verify the token
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/verify-email?token=${token}`);
        setMessage(res.data.message); // Set the response message

        // Show success toast after successful verification
        toast.success("Email verified successfully! You can now log in.");

        // Redirect to login page after 3 seconds
        setTimeout(() => {
          navigate("/login");  // Navigate to login page
        }, 2000);

      } catch (error) {
        setMessage(error.response?.data?.message || "An error occurred."); // Handle errors
      }
    };

    verifyEmail(); // Call the email verification function
  }, [location.search, navigate]); // Dependency array: re-run the effect if location.search changes

  return (
    <div className="flex items-center justify-center h-screen bg-[#2b2b2b]">
      <div className="p-6 bg-white rounded shadow">
        <h1 className="text-xl font-bold mb-4">Email Verification</h1>
        <p>{message}</p> {/* Display the verification message */}
      </div>
    </div>
  );
};

export default VerifyEmail;
