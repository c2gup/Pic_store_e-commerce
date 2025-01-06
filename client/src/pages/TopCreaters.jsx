import React, { useState } from "react";
import data from "../../data/Data"; // Import the JSON file directly
import rank_icon from "../../public/assets/RocketLaunch.png";
import BrowseCategory from "./BrowseCategory";
import { Link, useNavigate } from "react-router-dom";

export default function TopCreaters() {
  const [dataList, setDataList] = useState(data); // Use the imported data
  const navigate = useNavigate(); // For navigation

  // Function to handle card clicks
  const handleClick = (id) => {
    navigate(`/creator-details/${id}`); // Navigate to a detailed page for the creator
  };

  return (
    <>
      <div className="flex justify-center w-[90%] m-auto items-center flex-col">
        <div className="min-h-screen bg-cover bg-center">
          <div className="upper_creaters flex justify-between items-center">
            <div className="left_upper_creater p-5 m-5">
              <h1 className="text-3xl font-serif font-bold text-white">
                Top Creators
              </h1>
              <p className="text-slate-400">
                Checkout Top Rated Creators On The NFT Marketplace
              </p>
            </div>
            <div className="right_trending mr-10">
              <Link
                to="/TopCreatersPart2"
                className="group inline-flex items-center rounded-[20px] w-[200px] p-[2px] border border-[#A259FF] hover:text-white focus:outline-none"
              >
                <img src={rank_icon} alt="Arrow Icon" className="ml-5" />
                <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                  View Rankings
                </span>
              </Link>
            </div>
          </div>

          <div className="stucked2 flex flex-wrap justify-center gap-10 mx-auto my-10">
            {dataList.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="bg-[#3B3B3B] flex justify-center items-center flex-col p-4 rounded-lg shadow-lg relative w-[21%] h-[250px] cursor-pointer"
                onClick={() => handleClick(item.id)} // Call handleClick with item ID
              >
                {/* ID in top-left corner */}
                <div className="absolute top-3 left-3 bg-[#2B2B2B] text-gray-500 py-1 px-2 rounded-[100%] text-sm">
                  {item.id}
                </div>

                {/* Image (Centered and Rounded) */}
                <div className="flex justify-center mb-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 rounded-full"
                  />
                </div>

                {/* Name and Total Sales */}
                <h2 className="text-center text-xl font-bold text-white">
                  {item.name}
                </h2>
                <p className="text-center flex text-lg text-white mt-2">
                  <span>Total Sales:</span> {item.totalSales}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BrowseCategory />
    </>
  );
}
