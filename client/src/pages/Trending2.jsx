import React from 'react';
import card1 from "../../public/assets/Image1.png";
import see_icon from "../../public/assets/Eye.png";

export default function Trending2() {
  return (
    <div className="min-h-screen text-white h-[500px] flex mt-20  w-full  bg-[url('https://t4.ftcdn.net/jpg/05/66/95/57/360_F_566955794_YYCRaL9DkZub8MhObK7VUmlApJLTJ0jx.jpg')] bg-cover bg-center">
      
      {/* Content Section */}
      <div className=" p-4  mt-[350px] ml-[60px] w-[80%]   justify-end ">
        {/* Top Section */}
        <div className="flex rounded-full w-[150px] bg-[#2B2B2B] p-2">
          <img src={card1} alt="Avatar" className="w-6 h-6 rounded-full" />
          <p className="ml-2 text-sm">MoonDancer</p>
        </div>
        {/* Title Section */}
        <h1 className="text-4xl font-bold mb-4 mt-3">Magic Mushrooms</h1>
        <div className="right_trending">
          <a
            className="group inline-flex items-center rounded-[20px] w-[150px] p-[2px] border bg-white hover:text-white focus:outline-none"
            href="#"
          >
            <img src={see_icon} alt="Arrow Icon" className="ml-5" />
            <span className="block text-black rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
              See All
            </span>
          </a>
        </div>
      </div>

      {/* Timer Section */}
      <div className=" mr-10 mb-20 mt-[450px] ">
        <div className="bg-[#3B3B3B] flex flex-col p-4 rounded-lg text-center shadow-md">
          <div className="text-sm uppercase font-medium mb-2">Auction ends in:</div>
          <div className="flex items-center space-x-2 text-lg font-bold">
            <div>
              <p>59</p>
              <p className="text-xs font-medium uppercase">Hours</p>
            </div>
            <span>:</span>
            <div>
              <p>59</p>
              <p className="text-xs font-medium uppercase">Minutes</p>
            </div>
            <span>:</span>
            <div>
              <p>59</p>
              <p className="text-xs font-medium uppercase">Seconds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
