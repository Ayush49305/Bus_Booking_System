import React from 'react'
import 'remixicon/fonts/remixicon.css'

const Navbar = () => {
  return (
    <div className="h-25 flex items-center justify-between px-6 md:px-12 bg-white shadow-sm relative z-20">
      
      <div className="flex gap-6 text-gray-500 text-5xl">
        <i className="ri-bus-line"></i>
        
      </div>
      <p className='text-4xl mr-100'>Green Bus</p>

      <div className='hidden md:flex items-center gap-7 pr-30 text-lg'>
        <a href="#" className="hover:text-green-600">
          Home
        </a>

        <a href="#" className="hover:text-green-600">
          My Booking
        </a>

        <a href="#" className="hover:text-green-600">
          About
        </a>

        <a href="#" className="hover:text-green-600">
          Help
        </a>

        <a href="#" className="hover:text-green-600">
          Contact
        </a>
      </div>

      <div className="flex items-center gap-5">
        <select className="bg-transparent outline-none">
          <option>English</option>
          <option>Hindi</option>
        </select>

        <button className="text-green-600">
          ↪ Sign In
        </button>

        <button className="text-green-600">
          👤 Sign Up
        </button>
      </div>

    </div>
    // <div className="hidden flex justify-between items-center  h-20 w-screen bg-red-500">
    //   <div className='flex justify-center items-center m-5'>
    //     <span>Home</span>
    //     <span>My Booking</span>
    //     <span>about</span>
    //     <span>Contact</span>
    //     <span>Help</span>
    //   </div>
    // </div>
  )
}

export default Navbar
