import  { useEffect, useState } from "react";
import { IoIosHeart } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import ImageCard from "./ImageCard";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setAllPosts } from "../../store/slices/postSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Home from "../pages/Home";

function PhotoGalllary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const posts = useSelector((state) => state.posts.allPosts);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [loading, setLoading] = useState(false);
  const [page, setpage] = useState(1);

  const [activeFilter, setActiveFilter] = useState("NFTs"); // Default active filter
  const filters = [
      { label: "NFTs", count: 20 },
      { label: "Collection", count: 5 },
  ];




  const getAllPosts = async () => {
    if (loading) return;
    setLoading(true);
    
    const params = { page, limit: 6 };
  
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/post/getAll`,
        { params }
      );
  
      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const { data, pagination } = response.data;
  
      if (data.length === 0) {
        console.warn("No more posts available.");
        return;
      }
  
      dispatch(setAllPosts(data));
  
      console.log(`Fetched page ${pagination.currentPage} of ${pagination.totalPages}`);
    } catch (error) {
      console.error("Error fetching posts:", error.message);
    } finally {
      setLoading(false);
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

  const handlePaymentVerify = (
    orderData,
    id,
    postUrl,
    author,
    title,
    price
  ) => {
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
          toast.error(
            error.response?.data?.message || "Payment verification failed."
          );
        }
      },
    };

    const razorpayWindow = new window.Razorpay(options);
    razorpayWindow.open();
  };

  useEffect(() => {
    getAllPosts();
  }, [page]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (

 <div>
        
        <div className="w-[85%] flex  m-auto  flex-col">
                {/* Header Section */}
                <div className="left_upper_creater mb-5 mt-[200px] ">
                    <h1 className="text-4xl leading-tight font-bold text-white">
                        Browse MarketPlace
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Browse through more than 50k NFTs on the NFT Marketplace.
                    </p>
                </div>
                {/* Search Bar */}
                <Home />
                <div className="w-[85%] flex m-auto flex-col">
                    {/* Filter Section */}
                    <div className="flex justify-between mt-[100px] mb-4 w-full">
                        <div className="flex flex-col items-center w-full">
                            <div className="grid grid-cols-2 text-gray-400 w-full">
                                {filters.map((filter) => (
                                    <button
                                        key={filter.label} // Use the label as a unique key
                                        onClick={() => setActiveFilter(filter.label)} // Set active filter by label
                                        className={`relative px-2 py-1 text-center ${activeFilter === filter.label
                                                ? "text-white font-bold"
                                                : "hover:text-white"
                                            }`}
                                    >
                                        {filter.label}{" "}
                                        <span
                                            className={`ml-1 py-1 px-2 rounded-full text-sm ${activeFilter === filter.label
                                                    ? "bg-[#858584] text-gray-200"
                                                    : "bg-[#3B3B3B] text-gray-500"
                                                }`}
                                        >
                                            ({filter.count})
                                        </span>
                                        {activeFilter === filter.label && (
                                            <span className="absolute bottom-0 left-0 top-10 w-full h-[2px] bg-[#3B3B3B]"></span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                </div>

            </div>



        <div className="my-2 bg-[#2b2b2b] w-[85%] m-auto flex flex-col justify-center items-center">
          

          <div className="grid mt-5  sm:grid-cols-3 gap-5 bg-20">
            {posts?.map((post) => (
              <ImageCard
                key={post._id}
                title={post.title}
                author={post.author}
                img={post.image}
                price={post.price}
                tags={post?.tags}
                icon1={
                  <FaShoppingCart
                    className="text-2xl text-black cursor-pointer hover:scale-110 transition-all ease-linear duration-300"
                    title="Cart"
                    onClick={() =>
                      purchaseImage(
                        post.price,
                        post._id,
                        post.image,
                        post.author,
                        post.title
                      )
                    }
                  />
                }
                icon2={
                  <IoIosHeart className="text-2xl text-red-500 cursor-pointer hover:scale-110 transition-all ease-linear duration-300" />
                }
              />
            ))}
          </div>

          {/* buttons */}
          <div className="flex mt-10 space-x-3">
            {/* Previous Button */}
            <button
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setpage((prev) => prev - 1)}
            >
              <FaArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {/* Next Button */}
            <button
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => setpage((prev) => prev + 1)}
            >
              Next
              <FaArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>


        </div>
      )}
    </>
  );
}

export default PhotoGalllary;
