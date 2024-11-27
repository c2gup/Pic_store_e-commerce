// import React, { useEffect } from "react";
// import { IoIosHeart } from "react-icons/io";
// import { FaShoppingCart } from "react-icons/fa";
// import ImageCard from "./ImageCard";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { useDispatch, useSelector } from "react-redux";
// import { setAllPosts } from "../../store/slices/postSlice";
// import { Navigate, useNavigate } from "react-router-dom";

// function PhotoGalllary() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const posts = useSelector((state) => state.posts.allPosts);
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const abs =  import.meta.env.VITE_RAZORPAY_KEY_ID;

//   console.log("abs",abs);
//   const getAllPosts = async () => {
//     if (posts.length > 0) return;
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_API_URL}/api/post/getAll`
//       ); // Ensure the URL is correct

//       if (response.status !== 200) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const { data } = response.data;

//       console.log(data); // Handle the data as needed
//       dispatch(setAllPosts(data));
//     } catch (error) {
//       console.error("Error fetching posts:", error.message || error);
//     }
//   };



//   // const purchaseImage = async (price, id, postUrl, author, title) => {
//   //   if (!isAuthenticated) {
//   //     toast.error("please login to purchase image ");
//   //     navigate("/login");
//   //     return;
//   //   }

//   //   try {
      
//   //     const res = await axios.post(
//   //       import.meta.env.VITE_API_URL + "/api/payment/generate",

//   //       {
//   //         price: price, 
//   //       },
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   //         },
//   //         withCredentials: true,
//   //       }
//   //     );

//   //     const data = await res.data;
//   //     console.log("Razorpay data: ", data); 
//   //      handlePaymentVerify(data, id, postUrl, author, title, price); // Open Razorpay after generating the order

//   //   } catch (error) {
//   //     toast.error(error.response.data.message);
//   //   }
//   // };

//   // const handlePaymentVerify = async(
//   //   data,
//   //   id,
//   //   postUrl,
//   //   author,
//   //   title,
//   //   price

//   // )=>{
//   //   const options ={
//   //    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Correct usage

//   //     amount :data.amount,
//   //     currency:data.currency,
//   //     name:"Anupma Gupta",
//   //     order_id:data.id,
//   //     theme:{
//   //       color:"#5f63b8",
//   //     },

//   //     handler: async (response)=>{
//   //       try {
         
//   //         const res = await axios.post(import.meta.env.VITE_API_URL+"/api/payment/verify",{
//   //           razorpay_order_id: response.razorpay_order_id,
//   //           razorpay_payment_id: response.razorpay_payment_id,
//   //           razorpay_signature: response.razorpay_signature,
//   //           postId:id,
//   //           postUrl,
//   //           author,
//   //           title,
//   //           price,
          
//   //         },
          
          
          
//   //         {
            
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//   //           },
            
//   //           withCredentials:true,
//   //         });

//   //         console.log(response); 
//   //         const data = await res.data;
//   //         toast.success("Payment successful! Image purchased.");
//   //       } catch (error) {
//   //         toast.error(error.response.data.message);
//   //       }
//   //     }
//   //   };

//   //   const razorpayWindow = new window.Razorpay(options);
//   //   razorpayWindow.open();
//   // }

//   const purchaseImage = async (price, id, postUrl, author, title) => {
//     if (!isAuthenticated) {
//       toast.error("Please login to purchase image.");
//       navigate("/login");
//       return;
//     }
  
//     try {
//       const res = await axios.post(
//         `${import.meta.env.VITE_API_URL}/api/payment/generate`,
//         { price },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//           },
//           withCredentials: true,
//         }
//       );
  
//       const data = await res.data;
//       console.log("Razorpay data: ", data);
//       handlePaymentVerify(data, id, postUrl, author, title, price); // Open Razorpay after generating the order
  
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error initiating payment.");
//     }
//   };
  
//   const handlePaymentVerify = async (
//     data,
//     id,
//     postUrl,
//     author,
//     title,
//     price
//   ) => {
//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: data.amount,
//       currency: data.currency,
//       name: "Anupma Gupta",
//       order_id: data.id,
//       theme: { color: "#5f63b8" },
//       handler: async (response) => {
//         try {
//           console.log("Razorpay Response: ", response); // Log for debugging
  
//           const res = await axios.post(
//             `${import.meta.env.VITE_API_URL}/api/payment/verify`,
//             {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature, // Include the signature
//               postId: id,
//               postUrl,
//               author,
//               title,
//               price,
//             },
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//               },
//               withCredentials: true,
//             }
//           );
  
//           toast.success("Payment successful! Image purchased.");
//         } catch (error) {
//           toast.error(error.response?.data?.message || "Payment verification failed!");
//         }
//       },
//     };
  
//     const razorpayWindow = new window.Razorpay(options);
//     razorpayWindow.open();
//   };
  
  



//   useEffect(() => {
//     getAllPosts();
//   },[]);

//   return (
//     <>
//       <div className="my-2 bg-white flex flex-col justify-center items-center">
//         <h3 className="text-3xl font-semibold my-2">Photos</h3>

//         <div className="grid sm:grid-cols-3 gap-5 bg-20">
//           {posts?.map((post) => {
//             return (
//               <ImageCard
//                 key={post._id}
//                 title={post.title}
//                 author={post.author}
//                 img={post.image}
//                 price={post.price}
//                 icon1={
//                   <FaShoppingCart className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                  
//                   title="Cart"
//                   onClick={()=>
//                     purchaseImage(post.price, post._id, post.image, post.author, post.title)}
                  
//                   />
//                 }
//                 icon2={
//                   <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
//                 }
//               />
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// export default PhotoGalllary;

import React, { useEffect } from "react";
import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ImageCard from "./ImageCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";

function PhotoGalllary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const getAllPosts = async () => {
    if (posts.length > 0) return;

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/getAll`
      );
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const { data } = response.data;
      dispatch(setAllPosts(data));
    } catch (error) {
      console.error("Error fetching posts:", error.message || error);
    }
  };

  const purchaseImage = async (price, id, postUrl, author, title) => {
    if (!isAuthenticated) {
      toast.error("Please log in to purchase images.");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/payment/generate`,
        { price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );

      const { data } = res.data; // Access Razorpay order data
      handlePaymentVerify(data, id, postUrl, author, title, price);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error initiating payment.");
    }
  };

  const handlePaymentVerify = (orderData, id, postUrl, author, title, price) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: orderData.amount, // Amount in paise
      currency: orderData.currency,
      name: "Photo Gallery",
      description: title,
      order_id: orderData.id,
      theme: { color: "#5f63b8" },
      handler: async (response) => {
        try {
          await axios.post(
            `${import.meta.env.VITE_API_URL}/api/payment/verify`,
            {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              postId: id,
              postUrl,
              author,
              title,
              price,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
              withCredentials: true,
            }
          );

          toast.success("Payment successful! Image purchased.");
        } catch (error) {
          toast.error(error.response?.data?.message || "Payment verification failed.");
        }
      },
    };

    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="my-2 bg-white flex flex-col justify-center items-center">
      <h3 className="text-3xl font-semibold my-2">Photos</h3>

      <div className="grid sm:grid-cols-3 gap-5 bg-20">
        {posts?.map((post) => (
          <ImageCard
            key={post._id}
            title={post.title}
            author={post.author}
            img={post.image}
            price={post.price}
            icon1={
              <FaShoppingCart
                className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                title="Cart"
                onClick={() =>
                  purchaseImage(post.price, post._id, post.image, post.author, post.title)
                }
              />
            }
            icon2={
              <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
            }
          />
        ))}
      </div>
    </div>
  );
}

export default PhotoGalllary;
