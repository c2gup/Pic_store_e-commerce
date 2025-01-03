import React from 'react'
import Home from './Home'
import PhotoGalllary from '../components/PhotoGalllary'
import CtaPage from '../components/CtaPage'


export default  function Homesection() {
  return (
    <div className='bg-[#2B2B2B]' >
      <Home/>
      <PhotoGalllary/>
      <CtaPage/>
    </div>
  )
}



