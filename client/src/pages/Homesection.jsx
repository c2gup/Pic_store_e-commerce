import React from 'react'
import Home from './Home'
import PhotoGalllary from '../components/PhotoGalllary'
import CtaPage from './../components/CtaPage';
import Trending from "../pages/Trending";
import TopCreaters from './TopCreaters';


export default  function Homesection() {
  return (
    <div>
      <Home/>
      <TopCreaters/>
      <PhotoGalllary/>
      <Trending />
      <CtaPage/>
     
    </div>
  )
}



