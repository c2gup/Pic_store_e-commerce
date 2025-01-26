// 


import React, { useState, useEffect } from 'react';
import cardData from '../../data/Card_hero'; 

export default function HeroSectionPart2() {
  const [dataList, setDataList] = useState(cardData); // Directly use imported data

  return (
    <div className="justify-between items-center mt-[80px] lg:h-[600px] mx-auto w-[90%] lg:w-[85%]">
      <div className="text-center lg:text-left">
        <h1 className='text-2xl lg:text-3xl font-bold text-white leading-tight'>Trending Collection</h1>
        <p className='text-sm lg:text-[16px] text-gray-400 mt-2'>
          Checkout Our Weekly Updated Trending Collection.
        </p>
      </div>

      <div className='flex flex-col lg:flex-row items-center mt-10 justify-center w-[100%] lg:h-[350px] space-y-8 lg:space-y-0 lg:space-x-8'>
        {dataList.map((card, index) => (
          <div key={index} className="w-full lg:w-1/3 h-auto lg:h-[300px]">
            <img src={card.image} alt="" className='w-full h-[200px] lg:h-[280px] object-cover rounded-lg' />
            <div className='flex mt-5 justify-center space-x-2'>
              {card.subImages.map((subImage, idx) => (
                <img key={idx} src={subImage} alt="" className='w-1/3 h-[80px] lg:h-[100px] object-cover rounded-lg' />
              ))}
              <p className='text-xl lg:text-2xl flex items-center font-bold text-white p-4 lg:p-5 bg-[#A259FF] rounded-[20px]'>
                {card.count}
              </p>
            </div>
            <h1 className='text-lg font-semibold mt-5 text-white leading-tight text-center lg:text-left'>
              {card.title}
            </h1>
            <div className="flex justify-center lg:justify-start items-center mt-2">
              <img src={card.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
              <p className="ml-2 text-sm text-white">{card.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}