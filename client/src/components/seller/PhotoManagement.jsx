// import  { useEffect } from "react";
// import DashboardHeader from "../DashboardHeader";
// import ImageAdd from "../ImageAdd";
// import { useDispatch, useSelector } from "react-redux";


// import { setMyPosts } from "../../../store/slices/postSlice";
// import axios from "axios";
// import ImageCard from "../ImageCard";
// import { BiSolidMessageSquareEdit } from "react-icons/bi";
// import { MdDelete } from "react-icons/md";

// const PhotoManagement = () => {
//   const posts = useSelector((state) => state.posts.myPosts);
//   const dispatch = useDispatch();

//   const getPosts = async () => {
//     try {
//       // Ensure the token exists in localStorage
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("No access token found.");
//         return;
//       }
  
//       if (posts.length > 0) return; // Prevents multiple requests if posts are already fetched
  
//       const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/myPosts", {
//         headers: {
//           Authorization: "Bearer " + token, // Pass token in header
//         },
//       });
  
//       const  {data}  = res.data; // Directly access the data from the response
//       console.log("post data", data);
//       dispatch(setMyPosts(data)); // Update your Redux state with the fetched posts
//     } catch (error) {
//       console.error("Error fetching posts:", error);
//     }
//   };

//   const handleDelete = async (postId) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       if (!token) {
//         console.error("No access token found.");
//         return;
//       }

//       const res = await axios.delete(
//         `${import.meta.env.VITE_API_URL}/api/post/delete/${postId}`,
//         {
//           headers: {
//             Authorization: "Bearer " + token,
//           },
//         }
//       );

//       if (res.data.success) {
//         // Remove the deleted post from the state
//         const updatedPosts = posts.filter((post) => post._id !== postId);
//         dispatch(setMyPosts(updatedPosts));
//         console.log("Post deleted successfully");
//       }
//     } catch (error) {
//       console.error("Error deleting post:", error.response?.data?.message || error.message);
//     }
//   };
  

//   useEffect(() => {
//     getPosts();
//   }, []);

//   return (
//     <div className="flex flex-col sm:flex-row">
//       <div>
//         {/* Dashboard header will be here */}
//         <DashboardHeader />
//         {/* Image add component will be here */}
//         <ImageAdd />
//       </div>

//       {/* Section where all the images are displayed */}
//       <div className="grid mt-32 grid-cols-1 sm:grid-cols-2 gap-5  bg-transparent sm:bg-[#2B2B2B] p-2 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
//         {posts.length &&
//           posts?.map(({ _id, title, image, author, price }) => {
//             return (
//               <ImageCard
//                 key={_id}
//                 id={_id}
//                 title={title}
//                 img={image}
//                 author={author}
//                 price={price}
//                 icon1={
//                   <BiSolidMessageSquareEdit
//                     title="Edit"
//                     className="text-3xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
//                   />
//                 }
//                 icon2={
//                   <MdDelete
//                   title="Delete"
//                   onClick={() => handleDelete(_id)} // Add onClick handler
//                   className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
//                 />
//                 }
//               />
//             );
//           })}
//       </div>
//     </div>
//   );
// };

// export default PhotoManagement;



import { useEffect, useState } from "react";
import DashboardHeader from "../DashboardHeader";
import ImageAdd from "../ImageAdd";
import { useDispatch, useSelector } from "react-redux";
import { setMyPosts } from "../../../store/slices/postSlice";
import axios from "axios";
import ImageCard from "../ImageCard";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const PhotoManagement = () => {
  const posts = useSelector((state) => state.posts.myPosts);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);
  const [postToEdit, setPostToEdit] = useState(null);

  const getPosts = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }
  
      if (posts.length > 0) return;

      const res = await axios.get(import.meta.env.VITE_API_URL + "/api/post/myPosts", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
  
      const { data } = res.data;
      console.log("post data", data);
      dispatch(setMyPosts(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("No access token found.");
        return;
      }

      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/post/delete/${postId}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.data.success) {
        const updatedPosts = posts.filter((post) => post._id !== postId);
        dispatch(setMyPosts(updatedPosts));
        console.log("Post deleted successfully");
      }
    } catch (error) {
      console.error("Error deleting post:", error.response?.data?.message || error.message);
    } finally {
      setShowModal(false);
      setPostToDelete(null);
    }
  };

  const openDeleteModal = (postId) => {
    setPostToDelete(postId);
    setShowModal(true);
  };

  const handleEditClick = (post) => {
    console.log("Editing post:", post); // Debug here
    setPostToEdit(post);
  };

  const handlePostUpdate = (updatedPost) => {
    const updatedPosts = posts.map((post) =>
      post._id === updatedPost._id ? updatedPost : post
    );
    dispatch(setMyPosts(updatedPosts));
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="flex flex-col sm:flex-row">
      <div>
        <DashboardHeader />
        <ImageAdd
          postToEdit={postToEdit}
          setPostToEdit={setPostToEdit}
          onUpdate={handlePostUpdate}

        />
      </div>

      <div className="grid mt-32 grid-cols-1 sm:grid-cols-2 gap-5 bg-transparent sm:bg-[#2B2B2B] p-2 w-[90vw] sm:w-[55vw] sm:h-[95vh] sm:overflow-y-scroll rounded-lg mx-auto sm:mx-0">
        {posts.length &&
          posts?.map(({ _id, title, image, author, price, tags, publicId }) => (
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
                  onClick={() => handleEditClick({ _id, title, image, author, price, tags, publicId })}
                  className="text-3xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                />
              }
              icon2={
                <MdDelete
                  title="Delete"
                  onClick={() => openDeleteModal(_id)}
                  className="text-3xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                />
              }
            />
          ))}
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this post?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(postToDelete)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoManagement;