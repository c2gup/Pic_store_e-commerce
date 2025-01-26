// // 

// import React, { useState } from "react";
// import data from "../../data/Data"; // Import the JSON file directly
// import rank_icon from "../../public/assets/RocketLaunch.png";
// import BrowseCategory from "./BrowseCategory";
// import { Link, useNavigate } from "react-router-dom";

// export default function TopCreaters() {
//   const [dataList, setDataList] = useState(data); // Use the imported data
//   const navigate = useNavigate(); // For navigation

//   // Function to handle card clicks
//   const handleClick = (id) => {
//     navigate(`/creator-details/${id}`); // Navigate to a detailed page for the creator
//   };

//   return (
//     <>
//       <div className="flex justify-center w-[90%] m-auto items-center flex-col">
//         <div className="min-h-screen bg-cover bg-center">
//           {/* Upper Section */}
//           <div className="upper_creaters flex flex-col lg:flex-row justify-between items-center p-5 lg:p-0">
//             <div className="left_upper_creater p-5 lg:m-5 text-center lg:text-left">
//               <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white">
//                 Top Creators
//               </h1>
//               <p className="text-slate-400 text-sm lg:text-base">
//                 Checkout Top Rated Creators On The NFT Marketplace
//               </p>
//             </div>
//             <div className="right_trending lg:mr-10 mt-5 lg:mt-0">
//               <Link
//                 to="/TopCreatersPart2"
//                 className="group inline-flex items-center rounded-[20px] w-[200px] p-[2px] border border-[#A259FF] hover:text-white focus:outline-none"
//               >
//                 <img src={rank_icon} alt="Arrow Icon" className="ml-5" />
//                 <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
//                   View Rankings
//                 </span>
//               </Link>
//             </div>
//           </div>

//           {/* Cards Section */}
//           <div className="stucked2 flex flex-wrap justify-center gap-4 lg:gap-10 mx-auto my-10">
//             {dataList.slice(0, 8).map((item) => (
//               <div
//                 key={item.id}
//                 className="bg-[#3B3B3B] flex flex-col sm:flex-row items-center p-4 rounded-lg shadow-lg relative w-full sm:w-[90%] md:w-[45%] lg:w-[21%] h-auto sm:h-[150px] cursor-pointer"
//                 onClick={() => handleClick(item.id)} // Call handleClick with item ID
//               >
//                 {/* ID in top-left corner */}
//                 <div className="absolute top-3 left-3 bg-[#2B2B2B] text-gray-500 py-1 px-2 rounded-[100%] text-sm">
//                   {item.id}
//                 </div>

//                 {/* Image on the left for small devices */}
//                 <div className="flex justify-center sm:justify-start mb-4 sm:mb-0 sm:mr-4">
//                   <img
//                     src={item.photo}
//                     alt={item.name}
//                     className="w-20 h-20 rounded-full"
//                   />
//                 </div>

//                 {/* Content on the right for small devices */}
//                 <div className="text-center sm:text-left">
//                   <h2 className="text-xl font-bold text-white">{item.name}</h2>
//                   <p className="text-lg text-white mt-2">
//                     <span>Total Sales:</span> {item.totalSales}
//                   </p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <BrowseCategory />
//     </>
//   );
// }




import React, { useState } from "react";
import data from "../../data/Data"; // Import the JSON file directly
import rank_icon from "../../public/assets/RocketLaunch.png";
import BrowseCategory from "./BrowseCategory";
import { Link, useNavigate } from "react-router-dom";

export default function TopCreaters() {
  const [dataList, setDataList] = useState(data); // Use the imported data
  const navigate = useNavigate(); // For navigation

  // Function to handle card clicks
  const handleClick = (id) => {
    navigate(`/creator-details/${id}`); // Navigate to a detailed page for the creator
  };

  return (
    <>
      <div className="flex justify-center w-[90%] m-auto items-center flex-col">
        <div className="min-h-screen bg-cover bg-center">
          {/* Upper Section */}
          <div className="upper_creaters flex flex-col lg:flex-row justify-between items-center p-5 lg:p-0">
            <div className="left_upper_creater p-5 lg:m-5 text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-white">
                Top Creators
              </h1>
              <p className="text-slate-400 text-sm lg:text-base">
                Checkout Top Rated Creators On The NFT Marketplace
              </p>
            </div>
            <div className="right_trending lg:mr-10 mt-5 lg:mt-0">
              <Link
                to="/TopCreatersPart2"
                className="group inline-flex items-center rounded-[20px] w-[200px] p-[2px] border border-[#A259FF] hover:text-white focus:outline-none"
              >
                <img src={rank_icon} alt="Arrow Icon" className="ml-5" />
                <span className="block text-white rounded-full px-3 py-3 text-sm font-medium group-hover:bg-transparent">
                  View Rankings
                </span>
              </Link>
            </div>
          </div>

          {/* Cards Section */}
          <div className="stucked2 flex flex-wrap justify-center gap-4 lg:gap-10 mx-auto my-10">
            {dataList.slice(0, 8).map((item) => (
              <div
                key={item.id}
                className="bg-[#3B3B3B] flex flex-col sm:flex-row items-center p-4 rounded-lg shadow-lg relative w-full sm:w-[90%] md:w-[45%] lg:w-[21%] h-auto sm:h-[150px] cursor-pointer"
                onClick={() => handleClick(item.id)} // Call handleClick with item ID
              >
                {/* ID in top-left corner */}
                <div className="absolute top-3 left-3 bg-[#2B2B2B] text-gray-500 py-1 px-2 rounded-[100%] text-sm">
                  {item.id}
                </div>

                {/* Image on the left for small devices */}
                <div className="flex justify-start sm:justify-start mb-4 sm:mb-0 sm:mr-4">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-20 h-20 rounded-full"
                  />
                </div>

                {/* Content on the right for small devices */}
                <div className="text-left sm:text-left">
                  <h2 className="text-xl font-bold text-white">{item.name}</h2>
                  <p className="text-lg text-white mt-2">
                    <span>Total Sales:</span> {item.totalSales}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <BrowseCategory />
    </>
  );
}