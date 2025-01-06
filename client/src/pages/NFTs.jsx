import React, { useState, useEffect } from "react";
import TrendData from "../../data/Trending"; // Import JSON data

export default function NFTs({ count }) {
  const [cards, setCards] = useState([]);
//   const handleClick = (id) => {
//     // Navigate to the detailed page of the clicked item using the id
//     navigate(`/creator-details/${id}`);
// };


  useEffect(() => {
    // Load cards based on count or show all cards if count is not provided
    const displayCards = count ? TrendData.slice(0, count) : TrendData;
    setCards(displayCards);
  }, [count]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {cards.map((card, index) => (
        <div key={index} className="card bg-[#2f2f2f] h-[400px] rounded-lg shadow-lg text-white">
          {/* Image Section */}
          <div className="relative">
            <img
              src={card.image}
              alt={card.title}
              className="w-full h-[250px] object-cover rounded-t-lg"
            />
          </div>

          {/* Content Section */}
          <div className="p-4">
            <h2 className="text-xl font-bold">{card.title}</h2>
            <div className="Stuck flex items-center mt-2" 
            // onClick={() => handleClick(item.id)} 
            >
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
