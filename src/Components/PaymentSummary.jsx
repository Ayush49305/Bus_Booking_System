import React from "react";

const PaymentSummary = ({
  bus,
  selectedSeats = [],
  passengers = [],
  totalPrice = 0,
}) => {

  return (
    <div className="bg-white rounded-xl shadow-md p-6 h-fit sticky top-5">

      <h2 className="text-xl font-bold text-[#1e2a40] pb-4 border-b border-gray-300">
        Booking Summary
      </h2>


      {/* BUS */}
      <div className="py-5 border-b border-gray-300 space-y-4">

        <div className="flex justify-between gap-4">

          <span className="text-gray-500">
            Bus
          </span>

          <span className="font-medium text-right">
            {bus?.name || "-"}
          </span>

        </div>


        <div className="flex justify-between gap-4">

          <span className="text-gray-500">
            Route
          </span>

          <span className="font-medium text-right">
            {bus?.from || "Delhi"} →{" "}
            {bus?.to || bus?.arrival || "Jaipur"}
          </span>

        </div>


        <div className="flex justify-between gap-4">

          <span className="text-gray-500">
            Departure
          </span>

          <span className="font-medium">
            {bus?.departure || "-"}
          </span>

        </div>

      </div>


      {/* SEATS */}
      <div className="py-5 border-b border-gray-300">

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


      {/* PASSENGERS */}
      <div className="py-5 border-b border-gray-300">

        <p className="text-sm font-medium text-gray-500 mb-3">
          Passengers
        </p>

        <div className="space-y-4">

          {selectedSeats.map((seat) => {

            const passenger = passengers.find(
              (item) =>
                Number(item.seat) === Number(seat)
            );

            return (

              <div
                key={seat}
                className="flex justify-between items-center gap-3"
              >

                <div>

                  <p className="font-medium text-gray-800">
                    {passenger?.name || "Passenger"}
                  </p>

                  <p className="text-sm text-gray-500">
                    {passenger?.age || "-"} yrs
                    {" • "}
                    {passenger?.gender || "-"}
                  </p>

                </div>


                <span className="text-green-600 font-medium">
                  {seat}
                </span>

              </div>

            );

          })}

        </div>

      </div>


      {/* TOTAL */}
      <div className="pt-5">

        <div className="flex justify-between text-lg font-bold">

          <span>
            Total Amount
          </span>

          <span className="text-green-600">
            ₹{totalPrice}
          </span>

        </div>

      </div>

    </div>
  );
};

export default PaymentSummary;