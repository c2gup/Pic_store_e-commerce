// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMyPosts } from "../../../store/slices/postSlice";
// import toast from "react-hot-toast";
// import DashboardHeader from "../DashboardHeader";
// import ImageCard from "../ImageCard";
// import { IoArrowDownCircle } from "react-icons/io5";
// function PhotosPurchaser() {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts.myPosts);
 
//   const getPosts = async () => {
//     try {
//       if (posts.length > 0) return; // Prevents multiple requests if posts are already fetched
  
//       const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/myPosts", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("accessToken"), // Pass token in header
//         },
//       });
  
//       // Directly access the data from the response (no need to await res.data)
//       const { data } = res; // `res.data` already contains the data you need
  
//       console.log("post data", data);
  
//       // Dispatch action to store the posts in your state
//       dispatch(setMyPosts(data)); // Update your Redux state with the fetched posts
//     } catch (error) {
//       console.error("Error fetching analytics data:", error);
//     }
//   };
  

//   useEffect(() => {
//     getPosts();
//   }, []);
//   return (
//     <>
//       <DashboardHeader />
//       <div className="mx-8 grid md-grid-cols-3 lg:grid-cols-4 gap-4">
//         {posts?.map((_id, title, postUrl, author, price) => {
//           return (
//             <div>
//               <ImageCard
//                 key={_id}
//                 title={title}
//                 price={price}
//                 author={author}
//                 icon2={<IoArrowDownCircle title="download now" className="text-2xl text-red-500 cursior-pointer hover:scale-110 transition-all ease-linear duration-300"   />}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default PhotosPurchaser;



// import axios from "axios";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMyPosts } from "../../../store/slices/postSlice";
// import toast from "react-hot-toast";
// import DashboardHeader from "../DashboardHeader";
// import ImageCard from "../ImageCard";
// import { IoArrowDownCircle } from "react-icons/io5";

// function PhotosPurchaser() {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts.myPosts);

//   const getPosts = async () => {
//     try {
//       // if (posts.length > 0) return; // Prevents multiple requests if posts are already fetched
  
//       const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/myPosts", {
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("accessToken"), // Pass token in header
//         },
//       });
  
//       const { data } =  await res.data; // `res.data` already contains the data you need
  
//       console.log("post data", data); // Check if the backend response is correct
  

//         dispatch(setMyPosts(data)); // Update Redux state if there are posts
  
      
//     } catch (error) {
//       console.error("Error fetching analytics data:", error);
//     }
//   };
  
// console.log("Thisis uour ",posts);
//   useEffect(() => {
//     getPosts();
//   }, []);

//   const donwloadImage = async (image, title)=>{
//     try {
//       const response = await fetch(image);

//       if(!response.ok) throw new Error("Fiald to download image");

//       const blob = await response.blob();

//       const url = URL.createObjectURL(blob);

//       const a = document.createElement("a");
//       a.href = url;
//       a.download = `${title}.jpg`;

//       document.body.appendChild(a);

//       a.click();

//       document.body.removeChild(a);


      
//     } catch (error) {
//       console.log("Error downloading image",error);
//     }
//   }

//   return (
//     <>
//       <DashboardHeader />
      
//       <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {posts?.map((post) => {
//           const { _id, title, postUrl, author, price } = posts; // Destructure the post object here
//            (
   
//               <ImageCard
//               key={_id}
//                 title={title}
//                 price={price}
//                 author={author}
//                 icon2={
//                   <IoArrowDownCircle
//                     title="download now"
                 
//                     className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"

//                     onClick={()=>donwloadImage(postUrl,title)}
//                   />
//                 }
//               />
         
//           );
//         })}
//       </div>
//     </>
//   );
// }

// export default PhotosPurchaser;



import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyPosts } from "../../../store/slices/postSlice";
import DashboardHeader from "../DashboardHeader";
import ImageCard from "../ImageCard";
import { IoArrowDownCircle } from "react-icons/io5";

function PhotosPurchaser() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.myPosts);

  const getPosts = async () => {
    try {
      // Fetch posts only if not already loaded
      if (posts.length > 0) return;

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/myPosts`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      const {data} = res.data; // Extract response data
      console.log("Fetched posts:", data);

      // Dispatch the fetched posts to Redux state
      if (data?.length > 0) {
        dispatch(setMyPosts(data));
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    getPosts();
  }, []); // Dependency array to fetch only on component mount

  const downloadImage = async (imageUrl, title) => {
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to download image");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="mx-8 grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {posts?.map((post) => {
          const { _id, title, postUrl, author, price } = post; // Destructure each post object
          return (
            <ImageCard
              key={_id}
              title={title}
              price={price}
              author={author}
              img={postUrl}
              icon2={
                <IoArrowDownCircle
                  title="Download now"
                  className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  onClick={() => downloadImage(postUrl, title)}
                />
              }
            />
          );
        })}
      </div>
    </>
  );
}

export default PhotosPurchaser;

