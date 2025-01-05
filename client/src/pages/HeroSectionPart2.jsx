import React, { useState, useEffect } from 'react';
import cardData from '../../data/Card_hero'; 

export default function HeroSectionPart2() {
  const [dataList, setDataList] = useState(cardData); // Directly use imported data

  return (
    <div className="justify-between items-center mt-[80px] h-[600px] mx-auto w-[85%]">
      <div className="">
        <h1 className='text-3xl font-bold text-white leading-tight'>Trending Collection</h1>
        <p className='text-sm font-[24px] text-gray-400'>Checkout Our Weekly Updated Trending Collection .</p>
      </div>

      <div className='flex items-center mt-10 justify-center w-[100%] h-[350px] space-x-16'>
        {dataList.map((card, index) => (
          <div key={index} className="mt-5 w-1/3 h-[300px]">
            <img src={card.image} alt="" className='w-[100%] h-[280px]' />
            <div className='flex mt-5 justify-center space-x-2'>
              {card.subImages.map((subImage, idx) => (
                <img key={idx} src={subImage} alt="" className='w-1/3' />
              ))}
              <p className='text-2xl flex items-center font-bold text-white p-5  bg-[#A259FF] rounded-[20px]'>{card.count}</p>
            </div>
            <h1 className='text-lg font-semibold mt-5 text-white leading-tight'>
              {card.title}
            </h1>
            <div className="flex rounded-full w-[150px] pt-2 text-white leading-tight">
              <img src={card.avatar} alt="Avatar" className="w-6 h-6 rounded-full" />
              <p className="ml-2 text-sm">{card.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
