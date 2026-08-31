import React from "react";

const BusCard = ({
  name,
  type,
  departure,
  arrival,
  duration,
  price,
  seats,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">

      {/* Top */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {name}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            {type}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-2xl font-bold text-green-600">
            ₹{price}
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
            {departure}
          </p>

          <p className="text-sm text-gray-500">
            Departure
          </p>
        </div>


        <div>
          <p className="text-sm text-gray-500">
            {duration}
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
            {arrival}
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
          {seats} Seats Available
        </p>

        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md font-medium transition">
          View Seats
        </button>

      </div>

    </div>
  );
};

export default BusCard;