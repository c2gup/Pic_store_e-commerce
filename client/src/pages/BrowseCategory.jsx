import React, { useState, useEffect } from 'react';
import browseData from '../../data/BrowseData';

export default function BrowseCategory() {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        // Set the card data when the component mounts
        setCards(browseData);
    }, []);

    return (
        <div className="w-[85%] m-auto items-center flex-col">
            <h1 className="text-3xl mb-10 mt-10 font-serif font-bold text-white">
                Browse Category
            </h1>
            <div className="grid md:grid-cols-4 gap-10">
    {cards.map((card, index) => (
        <div key={index} className="bg-[#3B3B3B] mb-8 rounded-xl">
            {/* Image Section */}
            <div className="relative w-full h-56 overflow-hidden rounded-lg">
                <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                />
            </div>
            <p className="pl-5 m-7 ml-0 text-sm text-white font-bold">{card.name}</p>
        </div>
    ))}
</div>

        </div>
    );
}
