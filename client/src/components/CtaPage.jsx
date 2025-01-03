import React from "react";

import { cardData } from "../../data/CtaData";
import sice from "/assets/Photo.png";

function CtaPage() {
  return (
    <div className="bg-[#2B2B2B] pt-10  h-[1270px] ">
      <div className="ml-28">
        <h1 className="text-4xl font-spaceMono font-bold text-[#ffff]">
          How It Works
        </h1>
        <p className="text-[#ffff] text-2xl mt-3">
          Find Out How To Get Started
        </p>
      </div>
      <div className="w-[85%] h-[500px] mt-10 m-auto flex flex-wrap gap-5 justify-center">
        {cardData.map((card) => (
          <div
            key={card.id}
            className="w-[31%] mt-10 bg-[#3B3B3B] rounded-3xl overflow-hidden transition hover:shadow-lg"
          >
            <div className="flex     justify-center items-center">
              <img alt={card.title} src={card.image} className=" w-[80%]" />
            </div>
            <div className="p-4 sm:p-6">
              <a href="#">
                <h3 className="mt-0.5 text-xl font-bold font-spaceMono text-center text-[#ffff] ">
                  {card.title}
                </h3>
              </a>
              <p className="mt-2 line-clamp-3  text-center text-base text-[#ffff]">
                {card.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#3B3B3B]  rounded-3xl flex m-auto mt-28 w-[82%] h-[423px] ">
        <div className="w-[50%]  flex items-center ">
          <div className="p-12 ">
            <img src={sice} alt="" className="w-[100%]" />
          </div>
        </div>

        <div className="p-14 mt-10 w-[50%]  ">
          <div className="flex  flex-col md:flex-row items-center justify-between">
            <div className="  ">
              <h2 className="text-4xl font-spaceMono text-[#ffff]   font-bold ">
                Join Our Weekly Digest
              </h2>
              <p className="text-xl mb-6 mt-5 font-sans text-[#CCCCCC] w-[80%]">
                Get Exclusive Promotions & Updates Straight To Your Inbox.
              </p>
              <div className="flex items-center">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="rounded-l-md px-6 py-4 border-t border-l border-b border-gray-700 focus:outline-none focus:ring-0 focus:ring-purple-500"
                />
                <button className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-r-md border-t border-r border-b border-gray-700">
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
