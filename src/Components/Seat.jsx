import React from "react";

const Seat = ({ seatNumber, status, onClick }) => {
  const seatStyles = {
    available:
      "bg-white border-2 border-green-500 text-green-700 hover:bg-green-100 cursor-pointer",

    selected:
      "bg-green-600 border-2 border-green-600 text-white cursor-pointer",

    booked:
      "bg-gray-300 border-2 border-gray-300 text-gray-500 cursor-not-allowed",
  };

  return (
    <button
      onClick={onClick}
      disabled={status === "booked"}
      className={`
        w-12 h-12 rounded-md font-medium transition
        ${seatStyles[status]}
      `}
    >
      {seatNumber}
    </button>
  );
};

export default Seat;