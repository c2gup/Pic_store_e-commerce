import React from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for React Router v6
import data from "../../data/Data"; // Import the JSON file directly

export default function TopCreatersPart2() {
    const [activeFilter, setActiveFilter] = useState("Today");
    const [dataList, setDataList] = useState(data); // Use the imported data
    const navigate = useNavigate(); // Initialize the navigate function

    const filters = ["Today", "This Week", "This Month", "All Time"];

    const handleClick = (id) => {
        // Navigate to the detailed page of the clicked item using the id
        navigate(`/creator-details/${id}`);
    };

    return (
        <div className='w-[85%] flex m-auto flex-col'>
            <div className="left_upper_creater mt-5 mb-[50px]">
                <h1 className="text-3xl font-serif font-bold text-white">
                    Top Creators
                </h1>
                <p className="text-slate-400">
                    Checkout Top Rated Creators On The NFT Marketplace
                </p>
            </div>

            <div className="flex justify-between m-auto mb-4 w-full">
                <div className="flex flex-col items-center w-full">
                    <div className="grid grid-cols-4 text-gray-400 w-full">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`relative px-2 py-1 text-center ${activeFilter === filter
                                    ? "text-white font-bold"
                                    : "hover:text-white"
                                    }`}
                            >
                                {filter}
                                {activeFilter === filter && (
                                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#3B3B3B]"></span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-lg">
                <div className="grid grid-cols-[60px,1fr,1fr,1fr,1fr] gap-4 text-gray-500 font-bold border p-3 rounded-2xl border-gray-400 mb-5">
                    <h1 className='ml-4'>#</h1>
                    <h1>Artist</h1>
                    <h1>Change</h1>
                    <h1>NFTs Sold</h1>
                    <h1>Volume</h1>
                </div>
                {data.map((item) => (
                    <div
                        key={item.id}
                        className="grid grid-cols-[60px,1fr,1fr,1fr,1fr] gap-4 mb-5 bg-[#3B3B3B] rounded-2xl text-white h-[50px]"
                        // onClick={() => handleClick(item.id)} // Trigger handleClick on click
                    >
                        <div className="w-[20px] h-[20px] flex ml-5 m-auto items-center justify-center p-3 rounded-2xl bg-[#2B2B2B] text-white">
                            {item.id}
                        </div>
                        <div className="stucked flex items-center cursor-pointer gap-2 ml-0" 
                        onClick={() => handleClick(item.id)} 
                        
                        >

                            <img
                                src={item.photo}
                                alt={item.artist}
                                className="w-12 h-12 p-2 rounded-full"
                            />
                            {item.name}
                        </div>
                        <div className="text-green-400 font-medium flex items-center">{item.change}</div>
                        <div className="text-gray-400 flex items-center">{item.totalSales}</div>
                        <div className="text-gray-400 flex items-center">{item.volume}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
