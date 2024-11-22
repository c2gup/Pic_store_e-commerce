import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";
import Analytics from "../components/Analytics";


const SellerDashboard = () => {
  return (
    <div className="flex   flex-col sm:flex-row">
      <DashboardSidebar />
      <div>{/* we will change the pages through switch case here */} </div>
      <PhotoManagement />
      {/* <Analytics/> */}
    </div>
  );
};

export default SellerDashboard;
