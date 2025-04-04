

import React from 'react'
import BannerCarousel from './Components/BannerCarousel'
import Ads from './Components/Ads'
import FrontFooter from './Components/FrontFooter'
import Header from './Components/Header'
import Carousel from './Components/Carousel';

export default function App() {
  return (
    <>
    <Header />
    <BannerCarousel />
     <div className="container-fluid">
      <div className="row">
        {/* Main Content */}
        <div className="col-12 col-md-9" style={{fontFamily:"Inter, sans-serif", fontWeight:'Medium'}}>
          {/* <PropertyCard /> */}
          <Carousel />
          </div>
        {/* Sidebar */}
        <div className="d-none d-md-block col-md-3 mt-4">
          <Ads />
          </div>
      </div>
    </div>
    {/* <CardCarousel /> */}
    <FrontFooter />
    </>
  )
}
