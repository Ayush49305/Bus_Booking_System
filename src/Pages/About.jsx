import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="bg-white rounded-xl shadow-md p-8 md:p-12">

          <h1 className="text-4xl font-bold text-[#1e2a40] mb-6">
            About Green Bus
          </h1>


          <p className="text-gray-600 leading-8">
            Green Bus is an online bus ticket booking system
            designed to make bus travel simple, convenient and
            accessible. Users can search for buses, select their
            preferred seats, enter passenger information and
            complete their booking through a simple interface.
          </p>


          <h2 className="text-2xl font-bold text-[#1e2a40] mt-10 mb-4">
            Our Features
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div className="border rounded-lg p-5">
              <h3 className="font-bold">
                🔎 Bus Search
              </h3>
              <p className="text-gray-500 mt-2">
                Find buses according to your journey.
              </p>
            </div>


            <div className="border rounded-lg p-5">
              <h3 className="font-bold">
                💺 Seat Selection
              </h3>
              <p className="text-gray-500 mt-2">
                Select your preferred available seats.
              </p>
            </div>


            <div className="border rounded-lg p-5">
              <h3 className="font-bold">
                💳 Online Payment
              </h3>
              <p className="text-gray-500 mt-2">
                Choose from multiple payment methods.
              </p>
            </div>


            <div className="border rounded-lg p-5">
              <h3 className="font-bold">
                🎫 Booking Management
              </h3>
              <p className="text-gray-500 mt-2">
                View and manage your bookings.
              </p>
            </div>

          </div>

        </div>

      </div>


      <Footer />

    </div>
  );
};

export default About;