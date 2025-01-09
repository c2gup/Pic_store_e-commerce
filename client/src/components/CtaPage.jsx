import React from "react";

import { cardData } from "../../data/CtaData";
import sice from "/assets/Photo.png";

function CtaPage() {
  return (
    <div className="sm:bg-[#2B2B2B] pt-10 flex flex-col   sm:h-[1270px] ">
      <div className="sm:ml-28 p-4">
        <h1 className="text-4xl font-spaceMono font-bold text-[#ffff]">
          How It Works 
        </h1>
        <p className="text-[#ffff] sm:text-2xl mt-3">
          Find Out How To Get Started
        </p>
      </div>
      <div className="sm:w-[85%] sm:h-[500px] p-2 sm:p-0 sm:mt-10 m-auto flex  sm:flex-none  flex-col sm:flex-row sm:flex-wrap sm:gap-5 justify-center">
        {cardData.map((card) => ( 
          <div
            key={card.id}
            className="sm:w-[31%]  sm:mt-10 mt-3   sm:flex-none sm:flex-col flex  bg-[#3B3B3B] rounded-3xl overflow-hidden transition hover:shadow-lg"
          >
            <div className=" flex     justify-center items-center">
              <img alt={card.title} src={card.image} className=" w-[100%]  sm:w-[80%]" />
            </div>
            <div className="p-4 sm:p-6">
              <a href="#">
                <h3 className="mt-0.5 text-2xl sm:text-xl font-bold font-spaceMono text-center text-[#ffff] ">
                  {card.title}
                </h3>
              </a>
              <p className="mt-2 line-clamp-3  text-center text-xs sm:text-base text-[#ffff]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="sm:bg-[#3B3B3B] flex-col sm:flex-row rounded-3xl flex sm:m-auto sm:mt-28 sm:w-[82%] sm:h-[423px] "> 
        <div className="sm:w-[50%]  sm:flex sm:items-center ">
          <div className="sm:p-12 p-5 ">
            <img src={sice} alt="" className="w-[100%]  " />
          </div>
        </div>

        <div className="sm:p-14  sm:mt-10 sm:w-[50%]  ">
          <div className="flex  sm:flex-col md:flex-row items-center justify-between">
            <div className="  ">
              <h2 className="sm:text-4xl px-5 sm:p-0 text-3xl font-spaceMono text-[#ffff]   font-semibold ">
                Join Our Weekly Digest
              </h2>
              <p className="sm:text-xl text-sm mt-2 sm:mb-6 w-[89%]  px-5 sm:p-0 sm:mt-5 font-sans text-[#CCCCCC] sm:w-[80%]">
                Get Exclusive Promotions & Updates Straight To Your Inbox.
              </p>
              <div className="flex flex-col sm:flex-none gap-2 sm:gap-0 p-4 sm:flex-row items-center">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="sm:rounded-l-md w-[100%] rounded-full  px-4 py-4 sm:px-6 sm:4py-2 border-t border-l border-b border-gray-700 focus:outline-none focus:ring-0 focus:ring-purple-500"
                />
                <button className="bg-purple-500 w-[100%] hover:bg-purple-700 pointer text-white font-bold py-4 px-6 sm:rounded-r-md rounded-full border-t border-r border-b border-gray-700">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CtaPage;
