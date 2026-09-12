import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>

      <Navbar />

      <Hero />

      {/* FEATURES */}
      <section className="py-16 bg-gray-50">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-[#1e2a40] mb-12">
            Why Choose Green Bus?
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow-md text-center">

              <div className="text-4xl mb-4">
                🚌
              </div>

              <h3 className="text-xl font-bold mb-3">
                Easy Booking
              </h3>

              <p className="text-gray-600">
                Search and book your bus tickets easily.
              </p>

            </div>


            <div className="bg-white p-8 rounded-xl shadow-md text-center">

              <div className="text-4xl mb-4">
                💺
              </div>

              <h3 className="text-xl font-bold mb-3">
                Choose Your Seat
              </h3>

              <p className="text-gray-600">
                Select your preferred seat before booking.
              </p>

            </div>


            <div className="bg-white p-8 rounded-xl shadow-md text-center">

              <div className="text-4xl mb-4">
                🔒
              </div>

              <h3 className="text-xl font-bold mb-3">
                Secure Booking
              </h3>

              <p className="text-gray-600">
                Your booking information is safely stored.
              </p>

            </div>

          </div>

        </div>

      </section>


      <Footer />

    </div>
  );
};

export default Home;