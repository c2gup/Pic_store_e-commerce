// import React from 'react'
import React, { useState } from "react";
import NFTs from "./NFTs";

export default function BrowseMarketPlace2() {
    const [activeFilter, setActiveFilter] = useState("NFTs"); // Default active filter
        const filters = [
            { label: "NFTs", count: 20 },
            { label: "Collection", count: 5 },
        ];
    
  return (
    
    <div>
        <div className="w-full bg-[#3B3B3B]">
                <div className="w-[85%] flex m-auto pt-10 pb-10  flex-col">
                    <NFTs count={filters.find((f) => f.label === activeFilter)?.count || 20} />

                </div>
            </div>
    </div>
  )
}
