import React from "react";
import see_icon from "../../public/assets/Eye.png";
import NFTs from "./NFTs";
import Trending2 from "./Trending2";
import TopCreaters from "./TopCreaters";
import BrowseMarketPlace from "./BrowseMarketPlace";

export default function Trending() {
    return (
        // <div className=" items-center justify-center min-h-screen ">
        <>
            <div className="trending  items-center justify-center mx-auto w-[85%]">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div className="left_trending  mt-10 mb-8">
                        <h1 className="text-2xl font-bold text-white">Discover More NFTs</h1>
                        <p className="text-gray-600">Explore New Trending NFTs</p>
                    </div>

                    <div className="right_trending ">
                        <a
                            className="group inline-flex items-center rounded-[20px] w-[150px] p-[2px] border border-[#A259FF] "
                            href="/BrowseMarketPlace"
                        >
                            <img src={see_icon} alt="Arrow Icon" className="ml-5" />
                            <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                                See All
                            </span>
                        </a>
                    </div>
                </div>
                
                <NFTs count={3} />



            </div>
            <Trending2></Trending2>
        </>




    );
}
