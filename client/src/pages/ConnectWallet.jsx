import React from 'react'
import connectBg from "../../public/assets/connectBg.png";
import bt1 from "../../public/assets/anup.png";
import bt2 from "../../public/assets/anup2.png";
import bt3 from "../../public/assets/anupam.png";


export default function ConnectWallet() {
    return (
        <div className='flex bg-[#2B2B2B] '>
            {/* <p className='text-white'>I am connect</p> */}
            <div className="w-[50%]  ml-0  pl-0  overflow-hidden">
                <img src={connectBg} alt="" className=" h-[550px] w-[850px]  " />
            </div>
            <div className='flex  flex-col ml-14  m-auto'>
                <h1 className=" text-5xl  font-medium leading-tight text-white">
                    Connect Wallet
                </h1>
                <p className='mt-2  text-[22px] text-gray-300 '>
                    Choose a Wallet your want to Connect. <br /> There are Several Wallet providers
                </p>

                <div className="mt-6">
                    <a
                        className="group inline-flex items-center rounded-[10px] bg-[#3B3B3B] w-[300px] p-[2px] border border-[#A259FF] focus:outline-none"
                        href="https://github.com/anupkushwaha8081"
                    >
                        <img src={bt1} alt="Arrow Icon" className="ml-5" />
                        <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                            Anup Kushwaha
                        </span>
                    </a>
                </div>
                {/* Anup2 */}
                <div className="mt-3">
                    <a
                        className="group inline-flex items-center rounded-[10px] bg-[#3B3B3B] w-[300px] p-[2px] border border-[#A259FF] focus:outline-none"
                        href="https://leetcode.com/u/anupkushwaha8081/"
                    >
                        <img src={bt2} alt="Arrow Icon" className="ml-5" />
                        <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                            Wallet Connect
                        </span>
                    </a>
                </div>

                {/* anupam */}
                <div className="mt-3">
                    <a
                        className="group inline-flex items-center rounded-[10px] bg-[#3B3B3B] w-[300px] p-[2px] border border-[#A259FF] focus:outline-none"
                        href="https://github.com/c2gup/Pic_store_e-commerce"
                    >
                        <img src={bt3} alt="Arrow Icon" className="ml-5" />
                        <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                            Anupam Gupta
                        </span>
                    </a>
                </div>



            </div>
        </div>
    )
}
