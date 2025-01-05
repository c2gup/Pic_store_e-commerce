import React, { useState, useEffect } from 'react';
import TrendData from "../../data/Trending";  // Import JSON data

export default function NFTs() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    // Set the card data when the component mounts
    setCards(TrendData);
  }, []);

  return (
    <div className=" rounded-lg flex space-x-10 w-[100%] overflow-hidden shadow-lg text-white">
      {cards.map((card, index) => (
        <div key={index}>
          {/* Image Section */}
          <div className="relative">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-64 object-cover"
            />
          </div>

          {/* Content Section */}
          <div className="p-4 bg-[#3c3c3b]">
            <h2 className="text-xl font-bold">{card.title}</h2>
            <div className="flex items-center mt-2">
              <img
                src={card.avatar}
                alt="Avatar"
                className="w-6 h-6 rounded-full"
              />
              <p className="ml-2 text-sm">{card.name}</p>
            </div>

            <div className="flex justify-between items-center mt-4 text-gray-400">
              <div>
                <p className="text-xs">Price</p>
                <p className="text-sm font-bold text-white">{card.price}</p>
              </div>
              <div>
                <p className="text-xs">Highest Bid</p>
                <p className="text-sm font-bold text-white">{card.highestBid}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
