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
    <div className="  bg-[#2B2B2B] min-h-screen flex m-auto  w-full">
      <div className="w-[50%]  ml-0  pl-0  overflow-hidden">
        <img src={contact_image} alt="" className=" h-[700px] w-[850px]  " />
      </div>

      <div className=" m-auto  mt-30 rounded-3xl items-center  py-10   sm:w-[30vw]">
      <div className="mb-2 flex justify-center">
            <svg
              width="50"
              height="56"
              viewBox="0 0 50 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                fill="White"
              />
            </svg>
          </div>
        <h1 className="text-center text-2xl font-bold leading-tight text-white">
          Create your Account
        </h1>
        <p className="text-gray-500 text-center text-1xl mt-3 ">
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
