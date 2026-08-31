import React from 'react'
import 'remixicon/fonts/remixicon.css'
import busLogo from '../assets/bus.png'

const Navbar = () => {
  return (
    <nav className="h-25 flex items-center justify-between px-6 md:px-12 bg-white shadow-sm relative z-20">

      <div className="flex items-center gap-1">

        <img
          src={busLogo}
          alt="Bus Logo"
          className="w-23 h-23 object-contain shrink-0"
        />

        <span className="text-4xl md:text-4xl text-green-600 font-semibold">
          Green Bus
        </span>

      </div>

      <div className="hidden md:flex items-center gap-7 text-lg">

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


      <div className="hidden lg:flex items-center gap-5">

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

    </nav>
  )
}

export default Navbar