import React from 'react'
import busLogo from '../assets/bus.png'

const Footer = () => {
  return (
    <footer className='bg-[#1e2a40] text-white'>
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
          <div>
            <img
              src='https://chatgpt.com/s/m_6a8f0536909c8191b74d7825563297aa'
              alt='bus'
              className='w-56 mb-6'  
            />
            
          </div>
          
          
        </div>
      </div>
    </footer>
  )
}

export default Footer
