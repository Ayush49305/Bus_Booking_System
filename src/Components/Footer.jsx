import React from "react";
import { Link } from "react-router-dom";
import busLogo from "../assets/bus.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e2a40] text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>

            <div className="flex items-center gap-3 mb-4">

              <img
                src={busLogo}
                alt="Green Bus"
                className="w-12 h-12 object-contain"
              />

              <h2 className="text-2xl font-bold">
                Green Bus
              </h2>

            </div>

            <p className="text-gray-300 leading-7">
              Book your bus tickets easily and travel
              comfortably with Green Bus.
            </p>

          </div>


          {/* QUICK LINKS */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <div className="space-y-3">

              <Link
                to="/"
                className="block text-gray-300 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/my-bookings"
                className="block text-gray-300 hover:text-white"
              >
                My Booking
              </Link>

              <Link
                to="/about"
                className="block text-gray-300 hover:text-white"
              >
                About
              </Link>

            </div>

          </div>


          {/* SERVICES */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Services
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>Bus Ticket Booking</p>
              <p>Online Payment</p>
              <p>Seat Selection</p>
              <p>Booking Management</p>

            </div>

          </div>


          {/* CONTACT */}
          <div>

            <h3 className="text-lg font-semibold mb-5">
              Contact
            </h3>

            <div className="space-y-3 text-gray-300">

              <p>📧 support@greenbus.com</p>
              <p>📞 +91 98765 43210</p>
              <p>📍 India</p>

            </div>

          </div>

        </div>


        <div className="border-t border-gray-600 mt-10 pt-6 text-center text-gray-400">

          <p>
            © {new Date().getFullYear()} Green Bus. All rights reserved.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;