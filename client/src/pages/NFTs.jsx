import React from 'react';
import card1 from "../../public/assets/Image1.png"


export default function NFTs() {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden  shadow-lg  text-white">
      {/* Image Section */}
      <div className="relative">
        <img
          src={card1}
          alt="Distant Galaxy"
          className="w-full h-64 object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 bg-[#3c3c3b] ">
        <h2 className="text-xl font-bold">Distant Galaxy</h2>
        <div className="flex items-center mt-2">
          <img
            src={card1}
            alt="Avatar"
            className="w-6 h-6 rounded-full"
          />
          <p className="ml-2 text-sm">MoonDancer</p>
        </div>

        <div className="flex justify-between items-center mt-4 text-gray-400">
          <div>
            <p className="text-xs">Price</p>
            <p className="text-sm font-bold text-white">1.63 ETH</p>
          </div>
          <div>
            <p className="text-xs">Highest Bid</p>
            <p className="text-sm font-bold text-white">0.33 wETH</p>
          </div>
        </div>
      </div>
    </div>
  )
}
