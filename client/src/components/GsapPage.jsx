import React from 'react';
import { Route, Routes , useLocation} from 'react-router-dom';
import LogIn from '../pages/Login'; // Assuming LogIn is a default export
import Signup from '../pages/Signup'; // Assuming Signup is a default export
import SellerDashboard from '../pages/SellerDashboard';
import BuyerDashboard  from '../pages/BuyerDashboard';
import Footer from "./Footer";
import ConnectWallet from '../pages/ConnectWallet';
import TopCreatersPart2 from '../pages/TopCreatersPart2';
import BrowseMarketPlace from '../pages/BrowseMarketPlace';
import CreatorDetails from '../pages/CreatorDetails';
// import Profile from '../pages/Profile'; 

 // Assuming Home is a default export
 import gsap from "gsap";
 import { useEffect, useRef } from "react";
import Homesection from '../pages/Homesection';
import ProtectedRoute from './ProtectedRoute';
import PhotoGalllary from './PhotoGalllary';

import VerifyEmail from './VerifyEmail';

export default function GsapPage() {

      const nodeRef = useRef(null);
  const location = useLocation();
  console.log("The location is : ", location);


  useEffect(() => {
    if (nodeRef.current) {
      gsap.fromTo(nodeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 });
    }
  }, [location]);

  return (
    <div ref={nodeRef}>
      <Routes location={location} >
        <Route path="/" element={<Homesection />} />
        <Route path="/login" element={<ProtectedRoute children={<LogIn />} requiresAuth={false} />} />
        <Route path="/signup" element={
            <ProtectedRoute children={<Signup />} requiresAuth={false} />
          } />
        <Route path="/verify-email" element={
            <ProtectedRoute children={<VerifyEmail />} requiresAuth={false} />
          } />
          <Route path="/ConnectWallet" element={
            <ProtectedRoute children={<ConnectWallet />} requiresAuth={false} />
          }/>
          <Route path="/TopCreatersPart2" element={
            <ProtectedRoute children={<TopCreatersPart2 />} requiresAuth={false} />
          }/>
          <Route path="/BrowseMarketPlace" element={
            <ProtectedRoute children={<BrowseMarketPlace/>} requiresAuth={false} />
          }/>
          <Route path="/Photos" element={
            <ProtectedRoute children={<PhotoGalllary/>} requiresAuth={false} />
          }/>
          {/* <Route path="/CreatorDetails" element={
            <ProtectedRoute children={<CreatorDetails/>} requiresAuth={false} />
          }/>
           */}
          <Route path="/creator-details/:id" element={<CreatorDetails />} />

        
        <Route path="/seller/profile" element={<ProtectedRoute children={<SellerDashboard />} />} />
        <Route path="/buyer/profile" element={<ProtectedRoute children={<BuyerDashboard />} />} />
      </Routes>
      <Footer/>
    </div>
  );
}


