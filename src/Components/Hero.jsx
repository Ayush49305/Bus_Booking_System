import React from 'react'

import SearchBox from './SearchBox'

const Hero = () => {
  return (
    <div className="relative w-full h-[calc(100vh-106px)] overflow-hidden">
        <h1>Choose Your Ticket</h1>
      <img 
      className="absolute inset-0 w-full h-full object-cover"
      src="https://static.abhibus.com/images/herosection/operators/tgsrtcmobile.webp"/>

      <div className='absolute z-10 top-1/2 left-[8%] w-[42%] -translate-y-1/2'>
        <h2 className='mb-99 ml-1 text-5xl'>Book Your Ticket</h2>
        <SearchBox/>
      </div>
    </div>
  )
}

export default Hero
