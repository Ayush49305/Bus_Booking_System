import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BusCard from "../components/BusCard";

const SearchResult = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const searchData = location.state || {};

  const {
    from = "",
    to = "",
    date = "",
  } = searchData;


  const buses = [
    {
      id: 1,
      name: "Green Express",
      type: "AC Sleeper",
      departure: "06:30 AM",
      arrival: "02:30 PM",
      price: 850,
      from: from || "Delhi",
      to: to || "Jaipur",
    },

    {
      id: 2,
      name: "Green Travels",
      type: "AC Seater",
      departure: "09:00 AM",
      arrival: "05:00 PM",
      price: 700,
      from: from || "Delhi",
      to: to || "Jaipur",
    },

    {
      id: 3,
      name: "Green Roadways",
      type: "Non-AC Sleeper",
      departure: "10:30 PM",
      arrival: "06:30 AM",
      price: 600,
      from: from || "Delhi",
      to: to || "Jaipur",
    },

    {
      id: 4,
      name: "Green Premium",
      type: "Volvo AC",
      departure: "11:30 PM",
      arrival: "07:00 AM",
      price: 1200,
      from: from || "Delhi",
      to: to || "Jaipur",
    },
  ];


  const [sort, setSort] = useState("default");
  const [type, setType] = useState("all");


  const filteredBuses = useMemo(() => {

    let result = [...buses];


    if (type !== "all") {

      result = result.filter((bus) =>
        bus.type.toLowerCase().includes(type.toLowerCase())
      );

    }


    if (sort === "low") {

      result.sort((a, b) => a.price - b.price);

    }

    if (sort === "high") {

      result.sort((a, b) => b.price - a.price);

    }


    return result;

  }, [sort, type]);


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-8">

          <button
            onClick={() => navigate("/")}
            className="text-green-600 font-medium mb-4"
          >
            ← Back to Search
          </button>

          <h1 className="text-3xl font-bold text-[#1e2a40]">
            Available Buses
          </h1>

          <p className="text-gray-500 mt-2">
            {from || "Delhi"} → {to || "Jaipur"}
            {date && ` • ${date}`}
          </p>

        </div>


        {/* FILTER */}
        <div className="bg-white rounded-xl shadow-md p-5 mb-8">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block text-sm text-gray-600 mb-2">
                Sort By
              </label>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none"
              >

                <option value="default">
                  Recommended
                </option>

                <option value="low">
                  Price: Low to High
                </option>

                <option value="high">
                  Price: High to Low
                </option>

              </select>

            </div>


            <div>

              <label className="block text-sm text-gray-600 mb-2">
                Bus Type
              </label>

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border rounded-lg px-4 py-3 outline-none"
              >

                <option value="all">
                  All
                </option>

                <option value="ac">
                  AC
                </option>

                <option value="sleeper">
                  Sleeper
                </option>

                <option value="seater">
                  Seater
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* BUS LIST */}
        <div className="space-y-5">

          {filteredBuses.length > 0 ? (

            filteredBuses.map((bus) => (

              <BusCard
                key={bus.id}
                bus={bus}
                searchData={searchData}
              />

            ))

          ) : (

            <div className="bg-white p-10 rounded-xl text-center">

              <h2 className="text-xl font-bold">
                No buses found
              </h2>

              <p className="text-gray-500 mt-2">
                Try another filter.
              </p>

            </div>

          )}

        </div>

      </div>


      <Footer />

    </div>
  );
};

export default SearchResult;