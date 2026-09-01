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
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">

      {/* Top Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {bus.name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {bus.type}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{bus.price}
          </p>

          <p className="text-sm text-gray-500">
            Per Seat
          </p>
        </div>

      </div>

      <hr className="my-5" />

      {/* Timing */}
      <div className="grid grid-cols-3 items-center text-center">

        <div>
          <p className="text-lg font-semibold text-gray-800">
            {bus.departure}
          </p>

          <p className="text-sm text-gray-500">
            Departure
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            {bus.duration}
          </p>

          <div className="flex items-center justify-center gap-2 mt-1">
            <div className="h-[1px] w-8 bg-gray-300"></div>

            <span className="text-green-600">
              🚌
            </span>

            <div className="h-[1px] w-8 bg-gray-300"></div>
          </div>
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-800">
            {bus.arrival}
          </p>

          <p className="text-sm text-gray-500">
            Arrival
          </p>
        </div>

      </div>

      <hr className="my-5" />

      {/* Bottom */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

        <p className="text-sm text-green-600 font-medium">
          {bus.seatsAvailable} Seats Available
        </p>

        <button
          onClick={handleViewSeats}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition"
        >
          View Seats
        </button>

      </div>

    </div>
  );
};

export default BusCard;