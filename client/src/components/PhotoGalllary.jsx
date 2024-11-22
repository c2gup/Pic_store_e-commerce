import React, { useEffect } from "react";
import { IoIosHeart  } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ImageCard from "./ImageCard";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";








function PhotoGalllary() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
const posts = useSelector((state) => state.posts.allPosts);
const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const getAllPosts = async () => {

    if(posts.length >0) return;
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/post/getAll`); // Ensure the URL is correct
        
        if (response.status !== 200) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

      
        const {data} = response.data;

        console.log(data); // Handle the data as needed
        dispatch(setAllPosts(data));

    } catch (error) {
        console.error('Error fetching posts:', error.message || error);
    }
};


useEffect(()=>{
  getAllPosts();
})


  return (
    <>
      <div className="my-2 bg-white flex flex-col justify-center items-center">
        <h3 className="text-3xl font-semibold my-2">Photos</h3>

        <div className="grid sm:grid-cols-3 gap-5 bg-20">
          {
            posts?.map(
              (post) => {
                return( 
                  <ImageCard
            title={post.title}
            author={post.author}
            img={post.image}
            price={post.price}
            icon1={
              <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
            }
            icon2={
              <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
            }
          />
                )
              }
            )
          }
         
       
         
       
        
        </div>
       
      </div>
    </>
  );
}

export default PhotoGalllary;
