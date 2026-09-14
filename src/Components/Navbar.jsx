import React from 'react'
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'
import { useAuth } from '../context/AuthContext'
import busLogo from '../assets/bus.png'

const Navbar = () => {

  const { language, changeLanguage, t } = useLanguage()

  const { user, logout } = useAuth()

  return (
    <nav className="h-25 flex items-center justify-between px-6 md:px-12 bg-white shadow-sm relative z-20">

      <div className="flex items-center gap-1">

        <Link to="/">
          <img
            src={busLogo}
            alt="Bus Logo"
            className="w-23 h-23 object-contain shrink-0"
          />
        </Link>

        <Link
          to="/"
          className="text-4xl md:text-4xl text-green-600 font-semibold"
        >
          Green Bus
        </Link>

      </div>

      <div className="hidden md:flex items-center gap-7 text-lg">

        <Link
          to="/"
          className="hover:text-green-600"
        >
          {t.home}
        </Link>

        <Link
          to="/my-bookings"
          className="hover:text-green-600"
        >
          {t.myBooking}
        </Link>

        <Link
          to="/about"
          className="hover:text-green-600"
        >
          {t.about}
        </Link>

        <Link
          to="/help"
          className="hover:text-green-600"
        >
          {t.help}
        </Link>

        <Link
          to="/contact"
          className="hover:text-green-600"
        >
          {t.contact}
        </Link>

      </div>

      <div className="hidden lg:flex items-center gap-5">

        {/* Language */}
        <select
          value={language}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent outline-none"
        >
          <option value="English">
            English
          </option>

          <option value="Hindi">
            Hindi
          </option>
        </select>

        {!user ? (
          <>
            {/* Sign In */}
            <Link
              to="/login"
              className="text-green-600"
            >
              ↪ {t.signIn}
            </Link>

            {/* Sign Up */}
            <Link
              to="/signup"
              className="text-green-600"
            >
              👤 {t.signUp}
            </Link>
          </>
        ) : (
          <>
            {/* User Name */}
            <span className="text-green-600">
              👤 {user.name}
            </span>

            {/* Logout */}
            <button
              onClick={logout}
              className="text-green-600"
            >
              ↪ Sign Out
            </button>
          </>
        )}

      </div>

    </nav>
  )
}

export default Navbar