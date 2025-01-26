// 

import React from 'react';
import { motion } from "framer-motion";
import NFTs from './NFTs';
import hero_icon from "/assets/Rocket.png";
import HeroSectionPart2 from './HeroSectionPart2';
import HeroImg from "/assets/hero.png";
import user5 from "/assets/img5.png";
import BrowseMarketPlace from './BrowseMarketPlace';
// import ProfileCard from './ProfileCard';
// import CreatorDetails from './CreatorDetails';

export default function HeroSection() {
    return (
        <>
            {/* <CreatorDetails/> */}
            {/* <TopCreatersPart2></TopCreatersPart2> */}
            {/* <ProfileCard/> */}
            <div className="flex flex-col lg:flex-row justify-between items-center lg:h-[600px] mx-auto w-[90%] lg:w-[85%] py-10 lg:py-0">
                {/* Left Section */}
                <div className="HeroSection_left w-full lg:w-1/2 text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                        Discover <br />Digital Art & <br />Collect NFTs
                    </h1>
                    <p className="text-lg lg:text-[24px] text-gray-300 leading-relaxed mt-5">
                        NFT Marketplace UI created with Anima For Figma. Collect, Buy, and Sell Art From More <br className="hidden lg:block" />
                        Than 20k NFT Artists.
                    </p>
                    <div className="mt-6 flex justify-center lg:justify-start">
                        <a
                            className="group inline-flex items-center rounded-[20px] bg-[#A259FF] w-[220px] p-[2px] border focus:outline-none"
                            href="/Photos"
                        >
                            <img src={hero_icon} alt="Arrow Icon" className="ml-5" />
                            <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                                Get Started
                            </span>
                        </a>
                    </div>
                    <div className="flex justify-center lg:justify-start text-white mt-8 space-x-8 lg:space-x-16">
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
                <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-10 lg:mt-0 lg:pr-5">
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
                            <img src={HeroImg} alt="NFT Art" className="w-full" />
                            <h1 className='text-xl font-medium text-white pl-4 mt-4'>Space Walking</h1>
                            <div className="flex items-center pl-4 p-2">
                                <img src={user5} alt="Avatar" className="w-6 h-6 rounded-full" />
                                <p className="ml-2 text-sm text-white">Anup Kushwaha</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

        
            {/* <BrowseMarketPlace/> */}
            <HeroSectionPart2 />
        </>
    );
}