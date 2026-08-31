import React from "react";
import "remixicon/fonts/remixicon.css";
import busLogo from "../assets/bus.png";

const Footer = () => {
  return (
    <footer className="bg-[#1e2a40] text-white">
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          
          <div>
            <img
              src={busLogo}
              alt="Bus logo"
              className="w-40 h-auto mb-1"
            />

            <p className="text-gray-300 leading-7 mb-6">
              Book bus tickets effortlessly with ViserBus! Enjoy
              seamless travel planning. Whether it’s a daily commute
              or a long-distance trip, we’re here to make your journey
              smooth.
            </p>

            <div className="flex gap-3">

              <a
                href="#"
                className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition"
              >
                <i className="ri-facebook-fill text-xl"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition"
              >
                <i className="ri-twitter-fill text-xl"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition"
              >
                <i className="ri-vimeo-fill text-xl"></i>
              </a>

              <a
                href="#"
                className="w-11 h-11 border border-gray-400 rounded-full flex items-center justify-center hover:bg-green-600 hover:border-green-600 transition"
              >
                <i className="ri-instagram-line text-xl"></i>
              </a>

            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Useful Links
            </h2>

            <div className="w-24 h-[2px] bg-green-500 mb-8"></div>

            <ul className="space-y-5 text-gray-300 text-lg">

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  About
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  FAQs
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Blog
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Contact
                </a>
              </li>

            </ul>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Policies
            </h2>

            <div className="w-24 h-[2px] bg-green-500 mb-8"></div>

            <ul className="space-y-5 text-gray-300 text-lg">

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Terms of Service
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Ticket Policies
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-green-500 transition">
                  <i className="ri-arrow-right-s-line"></i>
                  Refund Policy
                </a>
              </li>

            </ul>
          </div>


          <div>
            <h2 className="text-3xl font-bold text-green-500 mb-2">
              Contact Info
            </h2>

            <div className="w-24 h-[2px] bg-green-500 mb-8"></div>

            <div className="space-y-6 text-gray-300 text-lg">

              <div className="flex gap-3">
                <i className="ri-map-pin-line text-green-500 text-xl"></i>
                <p>
                  Street #45,NSB Road,
                  <br />
                  City Center,Duragapur
                </p>
              </div>

              <div className="flex gap-3">
                <i className="ri-phone-line text-green-500 text-xl"></i>
                <p>+91 4567890823</p>
              </div>

              <div className="flex gap-3">
                <i className="ri-mail-line text-green-500 text-xl"></i>
                <p>greenbus00@gmail.com</p>
              </div>

            </div>
          </div>

        </div>
      </div>


      <div className="border-t border-gray-600">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400">
            © 2026 Green Bus. All Rights Reserved.
          </p>

          <div className="flex gap-6 text-gray-400">
            <a href="#" className="hover:text-green-500">
              Privacy
            </a>

            <a href="#" className="hover:text-green-500">
              Terms
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;