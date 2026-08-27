import React from 'react'
import busLogo from '../assets/bus.png'

const Footer = () => {
  return (
    <footer className='bg-[#1e2a40] text-white'>
      <div className="max-w-7xl mx-auto px-1 py-4">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          <div>
            <img
              src={busLogo}
              alt='bus logo'
              className='w-40 h-auto'  
            />
            
          </div>
          
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
