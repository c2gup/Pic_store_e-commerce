import React from 'react';
import { Route, Routes , useLocation} from 'react-router-dom';
import LogIn from '../pages/Login'; // Assuming LogIn is a default export
import Signup from '../pages/Signup'; // Assuming Signup is a default export

 // Assuming Home is a default export
 import gsap from "gsap";
 import { useEffect, useRef } from "react";
import Homesection from '../pages/Homesection';

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
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/seller/profile" element={<SellerDashboard />} />
        <Route path="/buyer/profile" element={<BuyerDashboard />} /> */}
      </Routes>
    </div>
  );
}


