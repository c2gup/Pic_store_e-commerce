import React from 'react';
import { Route, Routes , useLocation} from 'react-router-dom';
import LogIn from '../pages/Login'; // Assuming LogIn is a default export
import Signup from '../pages/Signup'; // Assuming Signup is a default export
import SellerDashboard from '../pages/SellerDashboard';
import BuyerDashboard  from '../pages/BuyerDashboard';
import VerifyEmail from "../components/VerifyEmail";
import Footer from './Footer';


 // Assuming Home is a default export
 import gsap from "gsap";
 import { useEffect, useRef } from "react";
import Homesection from '../pages/Homesection';
import ProtectedRoute from './ProtectedRoute';

export default function GsapPage() {

      const nodeRef = useRef(null);
  const location = useLocation();
  console.log("The location is : ", location);

  //   Jab bhi location change hoga tab ye use effect run hoga, because ye useEffect hook ko ham depenedent banane wale hai locaiton ke upper

  //   When a page renders, useEffects runs first
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
            <Route
          path="/verify-email"
          element={
            <ProtectedRoute children={<VerifyEmail />} requiresAuth={false} />
          }
        />

        <Route path="/seller/profile" element={<ProtectedRoute children={<SellerDashboard />} />} />
        <Route path="/buyer/profile" element={<ProtectedRoute children={<BuyerDashboard />} />} />
      </Routes>
      <Footer/>
    </div>
  );
}


