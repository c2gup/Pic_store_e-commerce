import React from 'react';
import { motion } from "framer-motion";
import NFTs from './NFTs';
import hero_icon from "../../public/assets/Rocket.png";
import HeroSectionPart2 from './HeroSectionPart2';
import HeroImg from "../../public/assets/hero.png"
import user5 from "../../public/assets/img5.png"
// import BrowseMarketPlace from './BrowseMarketPlace';
// import ProfileCard from './ProfileCard';
// import CreatorDetails from './CreatorDetails';


export default function HeroSection() {
    return (<>
    {/* <CreatorDetails/> */}
    {/* <TopCreatersPart2></TopCreatersPart2> */}
    {/* <ProfileCard/> */}
    <div className="flex justify-between items-center h-[600px] mx-auto w-[85%] ">
            {/* Left Section */}
            <div className="HeroSection_left w-1/2">
                <h1 className="text-6xl font-bold text-white leading-tight">
                    Discover <br />Digital Art & <br />Collect NFTs
                </h1>
                <p className="text-[24px] text-gray-300 leading-relaxed mt-5">
                    NFT Marketplace UI created with Anima For Figma. Collect, Buy, and Sell Art From More <br />
                    Than 20k NFT Artists.
                </p>
                <div className="mt-6">
                    <a
                        className="group inline-flex items-center rounded-[20px] bg-[#A259FF] w-[220px] p-[2px] border focus:outline-none"
                        href="/BrowseMarketPlace"
                    >
                        <img src={hero_icon} alt="Arrow Icon" className="ml-5" />
                        <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                            Get Started
                        </span>
                    </a>
                </div>
                <div className="flex text-white mt-8 space-x-16">
                    <div>
                        <p className="text-2xl font-bold">240k+</p>
                        <p className="text-sm">Total Sale</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">100k+</p>
                        <p className="text-sm">Auctions</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold">240k+</p>
                        <p className="text-sm">Artists</p>
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 flex items-center justify-end pr-5 right-20">
            <motion.div
                    animate={{
                        rotateY: [-45, 45, -45], // Flip left, then right, then back to left
                    }}
                    transition={{
                        duration: 5, // Time for one full flip cycle
                        repeat: Infinity, // Repeat indefinitely
                        ease: "easeInOut", // Smooth easing
                    }}
                >
                    <div className="bg-[#3B3B3B] rounded-2xl">
                        <img src={HeroImg} alt="" srcset="" />
                        <h1 className='text-xl font-medium text-white pl-4'>Space Walking</h1>
                        <div className="flex rounded-full w-[150px]  pl-4 p-2">
                                  <img src={user5} alt="Avatar" className="w-6 h-6 rounded-full" />
                                  <p className="ml-2 text-sm text-white">Anup Kushwaha</p>
                                </div>
                    </div>
                </motion.div>
            </div>

        </div>
    {/* <BrowseMarketPlace/> */}

            <HeroSectionPart2></HeroSectionPart2>
            

    </>
        
        
    );
}
