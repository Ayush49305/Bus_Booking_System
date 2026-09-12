import React from "react";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus, searchData }) => {

  const navigate = useNavigate();


  const handleSelect = () => {

    navigate("/seat-selection", {
      state: {
        bus,
        searchData,
      },
    });

  };


  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

        {/* BUS INFO */}
        <div>

          <h2 className="text-xl font-bold text-[#1e2a40]">
            {bus.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {bus.type}
          </p>

        </div>


        {/* TIME */}
        <div className="text-center">

          <p className="font-bold text-lg">
            {bus.departure}
          </p>

          <p className="text-gray-400 text-sm">
            Departure
          </p>

        </div>


        <div className="text-center">

          <p className="text-gray-400">
            →
          </p>

        </div>


        <div className="text-center">

          <p className="font-bold text-lg">
            {bus.arrival}
          </p>

          <p className="text-gray-400 text-sm">
            Arrival
          </p>

        </div>


        {/* PRICE */}
        <div className="text-center">

          <p className="text-2xl font-bold text-green-600">
            ₹{bus.price}
          </p>

          <p className="text-sm text-gray-500">
            per seat
          </p>

        </div>


        {/* BUTTON */}
        <button
          onClick={handleSelect}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
        >
          Select Seat
        </button>

      </div>

    </div>
  );
};

export default BusCard;