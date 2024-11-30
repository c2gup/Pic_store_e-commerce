import React, { useEffect } from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../../store/slices/authSlice";
import { setMyPosts } from "../../../store/slices/postSlice";
import axios from "axios";
import ImageCard from "../ImageCard";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      // Ensure the token exists in localStorage
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }
  
      if (posts.length > 0) return; // Prevents multiple requests if posts are already fetched
  
      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/myPosts", {
        headers: {
          Authorization: "Bearer " + token, // Pass token in header
        },
      });
  
      const  {data}  = res.data; // Directly access the data from the response
      console.log("post data", data);
      dispatch(setMyPosts(data)); // Update your Redux state with the fetched posts
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        {/* Dashboard header will be here */}
        <DashboardHeader />
        {/* Image add component will be here */}
        <ImageAdd />
      </div>

      {/* Section where all the images are displayed */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 bg-transparent sm:bg-white p-2 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
        {posts.length &&
          posts?.map(({ _id, title, image, author, price }) => {
            return (
              <ImageCard
                key={_id}
                id={_id}
                title={title}
                img={image}
                author={author}
                price={price}
                icon1={
                  <BiSolidMessageSquareEdit
                    title="Edit"
                    className="text-3xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                }
                icon2={
                  <MdDelete
                    title="Delete"
                    className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  />
                }
              />
            );
          })}
      </div>
    </div>
  );
};

export default PhotoManagement;

