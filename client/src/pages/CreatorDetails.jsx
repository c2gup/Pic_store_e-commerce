import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "../../data/Data"; 
import userbaground from "../../public/assets/userBg.png";
import yt1 from "../../public/assets/CD1.png";
import yt2 from "../../public/assets/CD2.png";
import yt3 from "../../public/assets/CD3.png";
import yt4 from "../../public/assets/CD4.png";
import yt5 from "../../public/assets/CD5.png";
import BrowseMarketPlace2 from './BrowseMarketPlace2';

const CreatorDetails = () => {
    const handleClick = (id) => {
        // Navigate to the detailed page of the clicked item using the id
        navigate(`/creator-details/${id}`);
    };
    const { id } = useParams(); // Get the id from the URL
    const creator = data.find(item => item.id === parseInt(id, 10)); // Parse id to match number type
    const [activeFilter, setActiveFilter] = useState("Created");

    if (!creator) {
        return <div className='pt-[500px] border'>Creator not found</div>;
    }

    return (
        <>
            <div className="relative w-full h-[300px] overflow-hidden">
                <img
                    src={userbaground}
                    alt="User background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
            <div className="w-[85%] mt-16 flex m-auto flex-col">
                <div className="absolute top-[335px]">
                    <img
                        src={creator.photo}
                        alt={creator.name}
                        className="w-34 h-24"
                    />
                </div>
                <div className="flex justify-between">
                    <h1 className="text-3xl text-white font-serif font-bold">{creator.name}</h1>
                    <div className='CD_right border border-[#A259FF] rounded-2xl w-[120px]'>
                        <span className="block font-semibold text-white rounded-full p-3 text-sm">
                            + Follow
                        </span>
                    </div>
                </div>
                <div className='flex justify-between items-center'>
                    <div className="CD_left text-white">
                        <div className='flex gap-[150px] mt-5 ml-0'>
                            <div>
                                <p className='text-xl font-bold'>{creator.totalSales}+</p>
                                <p className='text-sm text-gray-400'>NFTs Sold</p>
                            </div>
                            <div>
                                <p className='text-xl font-bold'>{creator.volume}+</p>
                                <p className='text-sm text-gray-400'>Volume</p>
                            </div>
                            <div>
                                <p className='text-xl font-bold'>{creator.change}</p>
                                <p className='text-sm text-gray-400'>Change</p>
                            </div>
                        </div>
                        <h1 className='text-xl mt-8 text-gray-500'>Bio</h1>
                        <p className='text-md text-gray-200'>{creator.bio || "No bio available."}</p>
                        <h3 className='text-xl mt-8 text-gray-500'>Links</h3>
                        <div className='flex gap-6'>
                            <a href="#"><img src={yt1} alt="YouTube 1" /></a>
                            <a href="#"><img src={yt2} alt="YouTube 2" /></a>
                            <a href="#"><img src={yt3} alt="YouTube 3" /></a>
                            <a href="#"><img src={yt4} alt="YouTube 4" /></a>
                            <a href="#"><img src={yt5} alt="YouTube 5" /></a>
                        </div>
                    </div>
                </div>
                <div className="w-[100%] mb-5 mt-2 m-auto bg-[#3B3B3B]">
                    <hr className="border-t-1 border-gray-500" />
                </div>
            </div>
            <div className="w-[85%] flex m-auto flex-col">
    <div className="flex justify-between mt-[50px] mb-4 w-full">
        <div className="flex flex-col items-center w-full">
            <div className="grid grid-cols-3 text-gray-400 w-full">
                {[
                    { label: "Created", count: 20 },
                    { label: "Owned", count: 5 },
                    { label: "Collections", count: 5 }
                ].map((filter) => (
                    <button
                        key={filter.label}
                        onClick={() => setActiveFilter(filter.label)}
                        className={`relative px-2 py-1 text-center ${activeFilter === filter.label
                            ? "text-white font-bold"
                            : "hover:text-white"
                            }`}
                    >
                        {filter.label}
                        <span
                            className={`ml-2 py-1 px-2 rounded-full text-sm ${activeFilter === filter.label
                                ? "bg-[#858584] text-gray-200"
                                : "bg-[#3B3B3B] text-gray-500"
                                }`}
                        >
                            ({filter.count})
                        </span>
                        {activeFilter === filter.label && (
                            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white"></span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
</div>

            <BrowseMarketPlace2 />
        </>
    );
};

export default CreatorDetails;
