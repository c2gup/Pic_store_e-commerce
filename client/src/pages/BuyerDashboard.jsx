import React from "react";
import DashboardSidebar from "../components/DashboardSidebar";
import PhotoManagement from "../components/seller/PhotoManagement";
import Analytics from "../components/Analytics";
import Orders from "../components/Order";
import { useSelector } from "react-redux";
import PhotosPurchaser from "../components/buyer/PhotosPurchaser";

function BuyerDashboard() {
  const tab = useSelector((state) => state.nav.tab);
  return (
    <div className="flex   flex-col sm:flex-row">
      <DashboardSidebar />
     <div>
      {/* {
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
      } */}

      <PhotosPurchaser/>
     </div>
    </div>
  );
}

export default BuyerDashboard
