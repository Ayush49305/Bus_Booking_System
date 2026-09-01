import React from "react";
import { useLocation } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import FilterSidebar from "../Components/FilterSidebar";
import BusCard from "../Components/BusCard";

import { buses } from "../data/buses";

const SearchResults = () => {
  const location = useLocation();

  // Get search data from Home page
  const {
    from = "",
    to = "",
    date = "",
  } = location.state || {};

  // Filter buses according to search
  const filteredBuses = buses.filter((bus) => {
    return (
      bus.from.toLowerCase() === from.toLowerCase() &&
      bus.to.toLowerCase() === to.toLowerCase()
    );
  });

  // Format date
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

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
                {from} → {to}
              </h1>
            </div>

            <div className="bg-white text-gray-800 px-5 py-3 rounded-lg">
              <p className="text-sm text-gray-500">
                Journey Date
              </p>

              <p className="font-semibold">
                {formattedDate}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">

          <FilterSidebar />

          {/* Results */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Available Buses
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  {filteredBuses.length} buses found for your route
                </p>
              </div>

              <select className="border border-gray-300 rounded-md px-3 py-2 text-sm outline-none">
                <option>Sort by Price</option>
                <option>Lowest Price</option>
                <option>Highest Price</option>
              </select>

            </div>

            {/* Bus Results */}
            <div className="space-y-5">

              {filteredBuses.length > 0 ? (
                filteredBuses.map((bus) => (
                  <BusCard
                    key={bus.id}
                    bus={bus}
                  />
                ))
              ) : (
                <div className="bg-white rounded-xl shadow-md p-10 text-center">
                  <div className="text-5xl mb-4">
                    🚌
                  </div>

                  <h2 className="text-2xl font-bold text-gray-800">
                    No Buses Found
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Sorry, no buses are available from {from} to {to}.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SearchResults;