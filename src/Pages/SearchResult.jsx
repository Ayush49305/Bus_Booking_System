import React from "react";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FilterSidebar from "../Components/FilterSidebar";
import BusCard from "../Components/BusCard";

const SearchResults = () => {
  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Search Header */}
      <section className="bg-green-700 text-white py-8">

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>
              <p className="text-sm text-green-100">
                Your Journey
              </p>

              <h1 className="text-3xl font-bold mt-1">
                Delhi → Jaipur
              </h1>
            </div>

            <div className="bg-white text-gray-800 px-5 py-3 rounded-lg">
              <p className="text-sm text-gray-500">
                Journey Date
              </p>

              <p className="font-semibold">
                10 September 2026
              </p>
            </div>

          </div>

        </div>

      </section>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          {/* Filter */}
          <FilterSidebar />


          {/* Bus Results */}
          <div>

            <div className="flex items-center justify-between mb-6">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Buses
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  12 buses found for your route
                </p>
              </div>

              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none">
                <option>Sort by Price</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
                <option>Departure Time</option>
              </select>

            </div>


            {/* Bus Cards */}
            <div className="space-y-5">

              <BusCard
                name="Green Bus Travels"
                type="AC Sleeper"
                departure="10:00 PM"
                arrival="06:00 AM"
                duration="8h"
                price="850"
                seats="12"
              />

              <BusCard
                name="Royal Express"
                type="AC Seater"
                departure="09:30 PM"
                arrival="05:30 AM"
                duration="8h"
                price="750"
                seats="8"
              />

              <BusCard
                name="National Travels"
                type="Non-AC Sleeper"
                departure="11:00 PM"
                arrival="07:30 AM"
                duration="8h 30m"
                price="650"
                seats="15"
              />

              <BusCard
                name="City Express"
                type="AC Sleeper"
                departure="08:00 PM"
                arrival="04:00 AM"
                duration="8h"
                price="900"
                seats="6"
              />

            </div>

          </div>

        </div>

      </main>

      <Footer />

    </div>
  );
};

export default SearchResults;