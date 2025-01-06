import React, { useState } from "react";
import BrowseMarketPlace2 from "./BrowseMarketPlace2";
import Home from "./Home"

export default function BrowseMarketPlace() {
    const [activeFilter, setActiveFilter] = useState("NFTs"); // Default active filter
    const filters = [
        { label: "NFTs", count: 20 },
        { label: "Collection", count: 5 },
    ];

    return (
        <div >

            <div className="w-[85%] flex  m-auto  flex-col">
                {/* Header Section */}
                <div className="left_upper_creater mb-5 mt-[200px] ">
                    <h1 className="text-4xl leading-tight font-bold text-white">
                        Browse MarketPlace
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Browse through more than 50k NFTs on the NFT Marketplace.
                    </p>
                </div>
                {/* Search Bar */}
                <Home />
                <div className="w-[85%] flex m-auto flex-col">
                    {/* Filter Section */}
                    <div className="flex justify-between mt-[100px] mb-4 w-full">
                        <div className="flex flex-col items-center w-full">
                            <div className="grid grid-cols-2 text-gray-400 w-full">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.label} // Use the label as a unique key
                                        onClick={() => setActiveFilter(filter.label)} // Set active filter by label
                                        className={`relative px-2 py-1 text-center ${activeFilter === filter.label
                                                ? "text-white font-bold"
                                                : "hover:text-white"
                                            }`}
                                    >
                                        {filter.label}{" "}
                                        <span
                                            className={`ml-1 py-1 px-2 rounded-full text-sm ${activeFilter === filter.label
                                                    ? "bg-[#858584] text-gray-200"
                                                    : "bg-[#3B3B3B] text-gray-500"
                                                }`}
                                        >
                                            ({filter.count})
                                        </span>
                                        {activeFilter === filter.label && (
                                            <span className="absolute bottom-0 left-0 top-10 w-full h-[2px] bg-[#3B3B3B]"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                </div>

            </div>
            <BrowseMarketPlace2/>
            






        </div>
    );
}
