import React from "react";
import { IoIosHeart  } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ImageCard from "./ImageCard";


function PhotoGalllary() {
  return (
    <>
      <div className="my-20 bg-white flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold my-14">Photos</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-20">
          <ImageCard
            title="The Beach"
            author="coder29"
            img="https://images.pexels.com/photos/3238764/pexels-photo-3238764.jpeg"
            price={10}
            icon1={
              <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
            }
            icon2={
              <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
            }
          />
        </div>
      </div>
    </>
  );
}

export default PhotoGalllary;
