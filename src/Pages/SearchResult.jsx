import React, { useState } from "react";
import FilterSidebar from "../Components/FilterSidebar";
import BusCard from "../Components/BusCard";
import buses from "../data/buses";

const SearchResult = () => {

  const [filters, setFilters] = useState({
    busType: "",
    departureTime: "",
    maxPrice: 1200,
  });

  const [sort, setSort] = useState("");

  // FILTER BUSES
  const filteredBuses = buses.filter((bus) => {

    // Bus Type Filter
    if (filters.busType) {

      if (filters.busType === "AC") {
        if (!bus.type.includes("AC")) {
          return false;
        }
      }

      if (filters.busType === "Non-AC") {
        if (!bus.type.includes("Non-AC")) {
          return false;
        }
      }

      if (filters.busType === "Sleeper") {
        if (!bus.type.includes("Sleeper")) {
          return false;
        }
      }
    }

    // Price Filter
    if (bus.price > filters.maxPrice) {
      return false;
    }

    // Departure Time Filter
    if (filters.departureTime) {

      const hour = parseInt(bus.departure);

      if (filters.departureTime === "Morning") {
        if (hour < 5 || hour >= 12) {
          return false;
        }
      }

      if (filters.departureTime === "Afternoon") {
        if (hour < 12 || hour >= 17) {
          return false;
        }
      }

      if (filters.departureTime === "Evening") {
        if (hour < 17 || hour >= 21) {
          return false;
        }
      }

      if (filters.departureTime === "Night") {
        if (hour < 21 || hour >= 24) {
          return false;
        }
      }
    }

    return true;
  });

  // SORT BUSES
  const sortedBuses = [...filteredBuses].sort((a, b) => {

    if (sort === "low") {
      return a.price - b.price;
    }

    if (sort === "high") {
      return b.price - a.price;
    }

    return 0;
  });

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* JOURNEY HEADER */}
      <div className="bg-green-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">

          <div>
            <p className="text-sm">
              Your Journey
            </p>

            <h1 className="text-3xl font-bold mt-1">
              Delhi → Jaipur
            </h1>
          </div>

          <div className="bg-white text-[#1e2a40] px-6 py-4 rounded-lg">
            <p className="text-sm text-gray-500">
              Journey Date
            </p>

            <p className="font-semibold">
              10 September 2026
            </p>
          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* FILTER SIDEBAR */}
          <div className="lg:col-span-1">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
            />
          </div>

          {/* BUS RESULTS */}
          <div className="lg:col-span-3">

            {/* HEADER */}
            <div className="flex justify-between items-start mb-6">

              <div>

                <h2 className="text-2xl font-bold text-[#1e2a40]">
                  Available Buses
                </h2>

                <p className="text-gray-500 mt-1">
                  {sortedBuses.length} buses found for your route
                </p>

              </div>

              {/* SORT */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="border border-gray-300 bg-white rounded-lg px-4 py-3 outline-none"
              >

                <option value="">
                  Sort by Price
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

            </div>

            {/* CARDS */}
            {sortedBuses.length > 0 ? (

              sortedBuses.map((bus) => (
                <BusCard
                  key={bus.id}
                  bus={bus}
                />
              ))

            ) : (

              <div className="bg-white rounded-xl shadow-md p-10 text-center">

                <h2 className="text-xl font-semibold text-[#1e2a40]">
                  No buses found
                </h2>

                <p className="text-gray-500 mt-2">
                  Try changing your filters.
                </p>

              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
};

export default SearchResult;