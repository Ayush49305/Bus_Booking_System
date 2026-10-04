import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";

import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";

import busLogo from "../assets/bus.png";

const Navbar = () => {
  const { language, changeLanguage, t } = useLanguage();
  const { user, logout } = useAuth();

  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { to: "/", label: t.home },
    { to: "/my-bookings", label: t.myBooking },
    { to: "/about", label: t.about },
    { to: "/help", label: t.help },
    { to: "/contact", label: t.contact },
  ];

  if (user?.role === "admin") {
    navLinks.push({ to: "/admin", label: "Admin" });
  }

  return (
    <nav className="relative z-20 bg-white shadow-sm">
      <div className="h-20 lg:h-25 flex items-center justify-between px-4 sm:px-6 md:px-12">
        {/* Logo */}
        <div className="flex items-center gap-1">
          <Link to="/" onClick={closeMenu}>
            <img
              src={busLogo}
              alt="Bus Logo"
              className="w-14 h-14 sm:w-16 sm:h-16 lg:w-23 lg:h-23 object-contain shrink-0"
            />
          </Link>

          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl sm:text-3xl lg:text-4xl text-green-600 font-semibold"
          >
            Green Bus
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-7 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop right side */}
        <div className="hidden lg:flex items-center gap-5">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent outline-none"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          {!user ? (
            <>
              <Link to="/login" className="text-green-600">
                ↪ {t.signIn}
              </Link>

              <Link to="/signup" className="text-green-600">
                👤 {t.signUp}
              </Link>
            </>
          ) : (
            <>
              <span className="text-green-600">👤 {user.name}</span>

              <button onClick={logout} className="text-green-600">
                ↪ Sign Out
              </button>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          className="lg:hidden text-3xl text-[#1e2a40] p-2"
        >
          <i className={menuOpen ? "ri-close-line" : "ri-menu-line"}></i>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t px-6 py-5 flex flex-col gap-4 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMenu}
              className="hover:text-green-600"
            >
              {link.label}
            </Link>
          ))}

          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="border rounded-lg px-3 py-2 outline-none w-fit"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
          </select>

          <div className="border-t pt-4 flex flex-col gap-4">
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMenu}
                  className="text-green-600"
                >
                  ↪ {t.signIn}
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenu}
                  className="text-green-600"
                >
                  👤 {t.signUp}
                </Link>
              </>
            ) : (
              <>
                <span className="text-green-600">👤 {user.name}</span>

                <button
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                  className="text-green-600 text-left"
                >
                  ↪ Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
