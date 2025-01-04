import React from "react";
import see_icon from "../../public/assets/Eye.png";
import NFTs from "./NFTs";
import Trending2 from "./Trending2";
import TopCreaters from "./TopCreaters";

export default function Trending() {
    return (
        // <div className=" items-center justify-center min-h-screen ">
            <div className="trending  items-center justify-center mx-auto">
                {/* Header Section */}
                <div className="flex justify-between items-center">
                    <div className="left_trending p-5 m-5">
                        <h1 className="text-2xl font-bold text-white">Discover More NFTs</h1>
                        <p className="text-gray-600">Explore New Trending NFTs</p>
                    </div>

                    <div className="right_trending mr-10">
                        <a
                            className="group inline-flex items-center rounded-[20px] w-[150px] p-[2px] border border-[#A259FF] hover:text-white focus:outline-none"
                            href="#"
                        >
                            <img src={see_icon} alt="Arrow Icon" className="ml-5" />
                            <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                                See All
                            </span>
                        </a>
                    </div>
                </div>
<div></div>
                {/* Cards Section */}
                <div className="CARDS flex gap-10 justify-center ">
                    <NFTs />
                    <NFTs />
                    <NFTs />
                </div>
                <Trending2></Trending2>
              
            
            </div>
            
            
        
    );
}
