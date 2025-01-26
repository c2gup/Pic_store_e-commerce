// 

import React from "react";
import see_icon from "../../public/assets/Eye.png";
import NFTs from "./NFTs";
import Trending2 from "./Trending2";
import TopCreaters from "./TopCreaters";
import BrowseMarketPlace from "./BrowseMarketPlace";

export default function Trending() {
    return (
        <>
            <div className="trending items-center justify-center mx-auto w-full md:w-[90%] lg:w-[85%] px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-10 mb-8">
                    <div className="left_trending text-center sm:text-left mb-4 sm:mb-0">
                        <h1 className="text-2xl font-bold text-white">Discover More NFTs</h1>
                        <p className="text-gray-600">Explore New Trending NFTs</p>
                    </div>

                    <div className="right_trending">
                        <a
                            className="group inline-flex items-center rounded-[20px] w-[150px] p-[2px] border border-[#A259FF] hover:bg-[#A259FF] transition-colors duration-300"
                            href="/BrowseMarketPlace"
                        >
                            <img src={see_icon} alt="Arrow Icon" className="ml-5" />
                            <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                                See All
                            </span>
                        </a>
                    </div>
                </div>

                {/* NFTs Section */}
                <div className="w-full">
                    <NFTs count={3} />
                </div>
            </div>

            {/* Trending2 Section */}
            {/* <div className="w-full">
                <Trending2 />
            </div> */}
        </>
    );
}