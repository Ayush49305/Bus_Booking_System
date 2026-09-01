import React from "react";

const PaymentSummary = ({
  bus,
  selectedSeats,
  passengers,
  totalPrice,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-5">

      <h2 className="text-xl font-bold text-gray-800 pb-4 border-b">
        Booking Summary
      </h2>

      {/* Bus Details */}
      <div className="py-5 border-b space-y-4">

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Bus</span>
          <span className="font-medium text-right">
            {bus?.name}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Route</span>
          <span className="font-medium">
            {bus?.from} → {bus?.to}
          </span>
        </div>

        <div className="flex justify-between gap-4">
          <span className="text-gray-500">Departure</span>
          <span className="font-medium">
            {bus?.departure}
          </span>
        </div>

      </div>

      {/* Seats */}
      <div className="py-5 border-b">

        <p className="text-sm font-medium text-gray-500 mb-3">
          Selected Seats
        </p>

        <div className="flex flex-wrap gap-2">
          {selectedSeats.map((seat) => (
            <span
              key={seat}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium"
            >
              {seat}
            </span>
          ))}
        </div>

      </div>

      {/* Passengers */}
      <div className="py-5 border-b">

        <p className="text-sm font-medium text-gray-500 mb-3">
          Passengers
        </p>

        <div className="space-y-3">

          {selectedSeats.map((seat) => (
            <div
              key={seat}
              className="flex justify-between items-center text-sm"
            >
              <div>
                <p className="font-medium text-gray-800">
                  {passengers[seat]?.name}
                </p>

                <p className="text-gray-500">
                  {passengers[seat]?.age} yrs • {passengers[seat]?.gender}
                </p>
              </div>

              <span className="text-green-600 font-medium">
                {seat}
              </span>
            </div>
          ))}

        </div>

      </div>

      {/* Total */}
      <div className="pt-5">

        <div className="flex justify-between text-lg font-bold">
          <span>Total Amount</span>

          <span className="text-green-600">
            ₹{totalPrice}
          </span>
        </div>

      </div>

    </div>
  );
};

export default PaymentSummary;