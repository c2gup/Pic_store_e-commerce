import React from 'react'

// import PhotoGalllary from '../components/PhotoGalllary'
import CtaPage from './../components/CtaPage';
import Trending from "../pages/Trending";
import TopCreaters from './TopCreaters';
import HeroSection from './HeroSection';


export default  function Homesection() {
  return (
    <div>
    
      <HeroSection/>
     
      {/* <PhotoGalllary/> */}
      <TopCreaters/>
      <Trending />
      <CtaPage/>
     
    </div>
  )
}



