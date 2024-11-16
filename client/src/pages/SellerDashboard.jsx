import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";

const SellerDashboard = () => {
  return (
    <div className="flex   flex-col sm:flex-row">s
      <DashboardSidebar />
      <div>{/* we will change the pages through switch case here */} </div>
      <PhotoManagement />
    </div>
  );
};

export default SellerDashboard;
