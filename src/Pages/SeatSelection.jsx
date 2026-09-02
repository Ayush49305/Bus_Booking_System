import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SeatSelection = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state?.bus;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // If user directly opens the page
  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold text-[#1e2a40]">
            No Bus Selected
          </h2>

          <p className="text-gray-500 mt-2">
            Please select a bus first.
          </p>

          <button
            onClick={() => navigate("/search-results")}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Search
          </button>

        </div>

      </div>
    );
  }

  // Seat numbers
  const seats = [
    1, 2, 3, 4,
    5, 6, 7, 8,
    9, 10, 11, 12,
    13, 14, 15, 16,
    17, 18, 19, 20,
    21, 22, 23, 24,
    25, 26, 27, 28,
    29, 30, 31, 32,
  ];

  // Some seats are already booked
  const bookedSeats = [3, 7, 12, 18, 25, 30];

  const handleSeatClick = (seatNumber) => {

    // Don't allow booked seats
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    if (selectedSeats.includes(seatNumber)) {

      setSelectedSeats(
        selectedSeats.filter(
          (seat) => seat !== seatNumber
        )
      );

    } else {

      setSelectedSeats([
        ...selectedSeats,
        seatNumber,
      ]);

    }
  };

  const totalAmount =
    selectedSeats.length * bus.price;

  const handleContinue = () => {

    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    navigate("/passenger-details", {
      state: {
        bus: bus,
        selectedSeats: selectedSeats,
        totalAmount: totalAmount,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-green-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-7">

          <p className="text-sm">
            Select Your Seats
          </p>

          <h1 className="text-3xl font-bold mt-1">
            {bus.name}
          </h1>

          <p className="mt-1">
            {bus.departure} → {bus.arrival}
          </p>

        </div>

      </div>


      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* SEAT AREA */}
          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl shadow-md p-8">

              <h2 className="text-xl font-bold text-[#1e2a40] mb-6">
                Select Your Seats
              </h2>


              {/* BUS */}
              <div className="max-w-md mx-auto border-2 border-gray-300 rounded-2xl p-6">

                {/* DRIVER */}
                <div className="flex justify-end mb-8">

                  <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500">
                    Driver
                  </div>

                </div>


                {/* SEATS */}
                <div className="grid grid-cols-4 gap-4">

                  {seats.map((seat) => {

                    const isBooked =
                      bookedSeats.includes(seat);

                    const isSelected =
                      selectedSeats.includes(seat);

                    return (
                      <button
                        key={seat}
                        disabled={isBooked}
                        onClick={() =>
                          handleSeatClick(seat)
                        }
                        className={`
                          h-12 rounded-lg border-2 font-semibold transition

                          ${
                            isBooked
                              ? "bg-gray-300 border-gray-300 text-gray-500 cursor-not-allowed"
                              : isSelected
                              ? "bg-green-600 border-green-600 text-white"
                              : "bg-white border-green-600 text-green-600 hover:bg-green-50"
                          }
                        `}
                      >
                        {seat}
                      </button>
                    );

                  })}

                </div>

              </div>


              {/* LEGEND */}
              <div className="flex justify-center gap-8 mt-8">

                <div className="flex items-center gap-2">

                  <div className="w-5 h-5 border-2 border-green-600 rounded"></div>

                  <span className="text-sm text-gray-600">
                    Available
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <div className="w-5 h-5 bg-green-600 rounded"></div>

                  <span className="text-sm text-gray-600">
                    Selected
                  </span>

                </div>


                <div className="flex items-center gap-2">

                  <div className="w-5 h-5 bg-gray-300 rounded"></div>

                  <span className="text-sm text-gray-600">
                    Booked
                  </span>

                </div>

              </div>

            </div>

          </div>


          {/* BOOKING SUMMARY */}
          <div>

            <div className="bg-white rounded-xl shadow-md p-6 sticky top-5">

              <h2 className="text-xl font-bold text-[#1e2a40]">
                Booking Summary
              </h2>

              <div className="border-b border-gray-300 my-5"></div>


              <div className="space-y-4">

                <div>
                  <p className="text-sm text-gray-500">
                    Bus
                  </p>

                  <p className="font-semibold">
                    {bus.name}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Journey
                  </p>

                  <p className="font-semibold">
                    {bus.from || "Delhi"} → {bus.to || "Jaipur"}
                  </p>
                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Selected Seats
                  </p>

                  <p className="font-semibold">

                    {selectedSeats.length > 0
                      ? selectedSeats.join(", ")
                      : "No seats selected"}

                  </p>

                </div>


                <div>
                  <p className="text-sm text-gray-500">
                    Price per seat
                  </p>

                  <p className="font-semibold">
                    ₹{bus.price}
                  </p>
                </div>

              </div>


              <div className="border-b border-gray-300 my-5"></div>


              <div className="flex justify-between">

                <span className="font-semibold">
                  Total
                </span>

                <span className="text-xl font-bold text-green-600">
                  ₹{totalAmount}
                </span>

              </div>


              <button
                onClick={handleContinue}
                className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition"
              >
                Continue
              </button>


              <button
                onClick={() => navigate(-1)}
                className="w-full mt-3 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg"
              >
                Back
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SeatSelection;