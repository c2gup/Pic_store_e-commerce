// 

import React from 'react';
import connectBg from "../../public/assets/connectBg.png";
import bt1 from "../../public/assets/anup.png";
import bt2 from "../../public/assets/anup2.png";
import bt3 from "../../public/assets/anupam.png";

export default function ConnectWallet() {
    return (
        <div className='flex flex-col lg:flex-row bg-[#2B2B2B] min-h-screen'>
            {/* Image Section */}
            <div className="lg:w-[50%] w-full lg:h-screen h-[300px] overflow-hidden">
                <img
                    src={connectBg}
                    alt="Connect Background"
                    className="w-full h-full object-cover"
                />
            </div>

            {/* Content Section */}
            <div className='flex flex-col lg:w-[50%] w-full lg:ml-14 ml-0 lg:mt-0 mt-6 p-6 lg:p-0'>
                <h1 className="text-4xl lg:text-5xl font-medium leading-tight text-white">
                    Connect Wallet
                </h1>
                <p className='mt-2 text-lg lg:text-[22px] text-gray-300'>
                    Choose a Wallet you want to Connect. <br /> There are Several Wallet providers
                </p>

                {/* Wallet Buttons */}
                <div className="mt-6 space-y-3">
                    {/* Anup Kushwaha */}
                    <a
                        className="group flex items-center rounded-[10px] bg-[#3B3B3B] w-full lg:w-[300px] p-2 border border-[#A259FF] focus:outline-none hover:bg-[#A259FF] transition-colors"
                        href="https://github.com/anupkushwaha8081"
                    >
                        <img src={bt1} alt="Anup Kushwaha" className="ml-2 w-8 h-8" />
                        <span className="block text-white px-3 py-2 text-sm font-medium">
                            Anup Kushwaha
                        </span>
                    </a>

                    {/* Wallet Connect */}
                    <a
                        className="group flex items-center rounded-[10px] bg-[#3B3B3B] w-full lg:w-[300px] p-2 border border-[#A259FF] focus:outline-none hover:bg-[#A259FF] transition-colors"
                        href="https://leetcode.com/u/anupkushwaha8081/"
                    >
                        <img src={bt2} alt="Wallet Connect" className="ml-2 w-8 h-8" />
                        <span className="block text-white px-3 py-2 text-sm font-medium">
                            Wallet Connect
                        </span>
                    </a>

                    {/* Anupam Gupta */}
                    <a
                        className="group flex items-center rounded-[10px] bg-[#3B3B3B] w-full lg:w-[300px] p-2 border border-[#A259FF] focus:outline-none hover:bg-[#A259FF] transition-colors"
                        href="https://github.com/c2gup/Pic_store_e-commerce"
                    >
                        <img src={bt3} alt="Anupam Gupta" className="ml-2 w-8 h-8" />
                        <span className="block text-white px-3 py-2 text-sm font-medium">
                            Anupam Gupta
                        </span>
                    </a>
                </div>
            </div>
        </div>
    );
}