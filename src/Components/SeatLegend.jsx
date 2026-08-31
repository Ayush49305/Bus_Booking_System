import React from "react";

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap gap-5 text-sm">

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 border-2 border-green-500 rounded"></div>
        <span>Available</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-green-600 rounded"></div>
        <span>Selected</span>
      </div>

      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-300 rounded"></div>
        <span>Booked</span>
      </div>

    </div>
  );
};

export default SeatLegend;