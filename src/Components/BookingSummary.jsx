import React from "react";

const BookingSummary = ({
    bus,
  selectedSeats,
  totalPrice,
  pricePerSeat,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 sticky top-5">

      <h2 className="text-xl font-bold text-gray-800 pb-4 border-b">
        Booking Summary
      </h2>


      {/* Journey Details */}
      <div className="py-5 border-b space-y-4">

        <div className="flex justify-between gap-3">
          <span className="text-gray-500">Bus</span>
          <span className="font-medium text-right">
            {bus?.name}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-gray-500">Route</span>
          <span className="font-medium">
            {bus?.from} → {bus?.to}
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-gray-500">Date</span>
          <span className="font-medium">
            10 September 2026
          </span>
        </div>

        <div className="flex justify-between gap-3">
          <span className="text-gray-500">Departure</span>
          <span className="font-medium">
            {bus?.departure}
          </span>
        </div>

      </div>


      {/* Seats */}
      <div className="py-5 border-b">

        <p className="text-sm text-gray-500 mb-3">
          Selected Seats
        </p>

        <div className="flex flex-wrap gap-2">

          {selectedSeats.map((seat) => (
            <span
              key={seat}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium"
            >
              {seat}
            </span>
          ))}

        </div>

      </div>


      {/* Price */}
      <div className="py-5">

        <div className="flex justify-between text-gray-600">
          <span>
            ₹{pricePerSeat} × {selectedSeats.length} seat(s)
          </span>

          <span>
            ₹{totalPrice}
          </span>
        </div>

        <div className="flex justify-between mt-5 pt-4 border-t text-lg font-bold">
          <span>Total Amount</span>

          <span className="text-green-600">
            ₹{totalPrice}
          </span>
        </div>

      </div>

    </div>
  );
};

export default BookingSummary;