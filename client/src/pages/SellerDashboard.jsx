import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";
import Analytics from "../components/Analytics";
import Orders from "../components/Order";
import { useSelector } from "react-redux";


const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab);
  return (
    <div className="flex   flex-col sm:flex-row">
      <DashboardSidebar />
     <div>
      {
        (()=>{
          switch(tab){
            case "photos-management":
              return <PhotoManagement/>;

            case "analytics":
              return <Analytics/> ;
            case "orders":
              return <Orders/>;
        default:
              return<PhotoManagement/>;      
          }
        })()
      }
     </div>
    </div>
  );
};

export default SellerDashboard;

// import React, { useEffect, useRef } from "react";
// import { gsap } from "gsap";
// import DashboardSidebar from "../components/DashboardSidebar";
// import PhotoManagement from "../components/seller/PhotoManagement";
// import Analytics from "../components/Analytics";
// import Orders from "../components/Order";
// import { useSelector } from "react-redux";

// const SellerDashboard = () => {
//   const tab = useSelector((state) => state.nav.tab);
//   const contentRef = useRef(null); // Reference to animate content

//   useEffect(() => {
//     // GSAP transition for content
//     if (contentRef.current) {
//       gsap.fromTo(
//         contentRef.current,
//         { opacity: 0, y: 20 },
//         { opacity: 1, y: 0, duration: 0.5 }
//       );
//     }
//   }, [tab]); // Re-run animation when `tab` changes

//   return (
//     <div className="flex flex-col sm:flex-row">
//       <DashboardSidebar />
//       <div ref={contentRef}>
//         {(() => {
//           switch (tab) {
//             case "photos-management":
//               return <PhotoManagement />;
//             case "analytics":
//               return <Analytics />;
//             case "orders":
//               return <Orders />;
//             default:
//               return <PhotoManagement />;
//           }
//         })()}
//       </div>
//     </div>
//   );
// };

// export default SellerDashboard;
