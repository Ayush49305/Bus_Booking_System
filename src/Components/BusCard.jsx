import React from "react";
import { useNavigate } from "react-router-dom";

const BusCard = ({ bus }) => {
  const navigate = useNavigate();

  const handleViewSeats = () => {
    navigate("/seat-selection", {
      state: {
        bus: bus,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">

      {/* TOP SECTION */}
      <div className="flex justify-between items-start">

        <div>
          <h2 className="text-xl font-bold text-[#1e2a40]">
            {bus.name}
          </h2>

          <p className="text-gray-500 mt-1">
            {bus.type}
          </p>
        </div>

        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{bus.price}
          </p>

          <p className="text-gray-500 text-sm">
            Per Seat
          </p>
        </div>

      </div>

      <div className="border-b border-gray-300 mt-5"></div>

      {/* TIME SECTION */}
      <div className="flex items-center justify-between py-6">

        <div className="text-center">
          <p className="font-semibold text-lg text-[#1e2a40]">
            {bus.departure}
          </p>

          <p className="text-gray-500 text-sm">
            Departure
          </p>
        </div>

        <div className="flex items-center gap-3">

          <div className="w-10 border-t border-gray-300"></div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              {bus.duration}
            </p>

            <span className="text-lg">
              🚌
            </span>
          </div>

          <div className="w-10 border-t border-gray-300"></div>

        </div>

        <div className="text-center">
          <p className="font-semibold text-lg text-[#1e2a40]">
            {bus.arrival}
          </p>

          <p className="text-gray-500 text-sm">
            Arrival
          </p>
        </div>

      </div>

      <div className="border-b border-gray-300"></div>

      {/* BOTTOM SECTION */}
      <div className="flex justify-between items-center pt-5">

        <p className="text-green-600 font-semibold">
          {bus.seats} Seats Available
        </p>

        <button
          onClick={handleViewSeats}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-7 py-3 rounded-lg transition"
        >
          View Seats
        </button>

      </div>

    </div>
  );
};

export default BusCard;