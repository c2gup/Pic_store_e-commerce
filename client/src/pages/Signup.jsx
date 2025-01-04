import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import contact_image from "../../public/assets/ImagePlace.png";
import user_icon from "../../public/assets/User.png";
import password_icon from "../../public/assets/LockKey.png";
import email_icon from "../../public/assets/EnvelopeSimple.png";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState(""); // No default selected here

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Account Type Selected:", accountType); // Log selected account type for debugging

    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/api/signup",
        {
          username,
          email,
          password,
          accountType,
        }
      );
      const data = res.data;

      if (data.success) {
        setUsername("");
        setEmail("");
        setPassword("");
        setAccountType("");
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="  bg-[#2B2B2B] min-h-screen flex  w-full">
      <div className="w-[50%]  ml-0  pl-0  overflow-hidden">
        <img src={contact_image} alt="" className=" h-[700px] w-[850px]  " />
      </div>

      <div className="  mt-20 rounded-3xl items-center  py-10 ml-20  sm:w-[27vw]">
        <h1 className="text-4xl mt-10 text-white font-bold text-center mb-4">
          Create Account
        </h1>
        <p className="text-white text-center text-1xl m-5 ">
          Welcome! Enter Your Details And Start <br /> Creating, Collecting And
          Selling images.
        </p>
        <form onSubmit={handleSignup}>
          {/* Username */}
          <div className="mb-5">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>
            <div className="relative">
              <img
                src={user_icon}
                alt="icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow-md rounded-[30cm] w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>
            <div className="relative">
              <img
                src={email_icon}
                alt="Email Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow-md rounded-[30cm] w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>
            <div className="relative">
              <img
                src={password_icon}
                alt="Password Icon"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md rounded-[30cm] w-full pl-10 pr-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
              />
            </div>
          </div>

          {/* Account Type Selection */}
          <div className="mb-5 rounded-[30cm]">
            <label
              htmlFor="accountType"
              className="block text-sm font-medium text-gray-700 mb-2"
            ></label>
            <select
              id="accountType"
              value={accountType} // Binding the selected value
              onChange={(e) => setAccountType(e.target.value)}
              className="shadow-md rounded-[30cm] w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-black focus:border-black"
            >
              <option value="" disabled>
                Select Account Type
              </option>{" "}
              {/* Disabled by default */}
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {/* Log in link */}
          <div className="flex items-center justify-end mb-5  ">
            <Link className="text-xs text-white" to="/login">
              Log In With Account
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 rounded-full shadow-md text-sm font-medium text-white bg-[#A259FF]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
