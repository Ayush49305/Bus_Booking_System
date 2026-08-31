import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Seat from "../Components/Seat";
import SeatLegend from "../Components/SeatLegend";

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Bus seats
  const seats = [
    { id: "A1", status: "available" },
    { id: "A2", status: "available" },
    { id: "A3", status: "booked" },
    { id: "A4", status: "available" },

    { id: "B1", status: "available" },
    { id: "B2", status: "booked" },
    { id: "B3", status: "available" },
    { id: "B4", status: "available" },

    { id: "C1", status: "available" },
    { id: "C2", status: "available" },
    { id: "C3", status: "available" },
    { id: "C4", status: "booked" },

    { id: "D1", status: "available" },
    { id: "D2", status: "available" },
    { id: "D3", status: "booked" },
    { id: "D4", status: "available" },

    { id: "E1", status: "available" },
    { id: "E2", status: "available" },
    { id: "E3", status: "available" },
    { id: "E4", status: "available" },
  ];

  const pricePerSeat = 850;

  // Select / unselect seat
  const handleSeatClick = (seat) => {
    if (seat.status === "booked") return;

    if (selectedSeats.includes(seat.id)) {
      setSelectedSeats(
        selectedSeats.filter((seatId) => seatId !== seat.id)
      );
    } else {
      setSelectedSeats([...selectedSeats, seat.id]);
    }
  };

  const getSeatStatus = (seat) => {
    if (seat.status === "booked") {
      return "booked";
    }

    if (selectedSeats.includes(seat.id)) {
      return "selected";
    }

    return "available";
  };

  const totalPrice = selectedSeats.length * pricePerSeat;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* Page Header */}
      <section className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <p className="text-green-100 text-sm">
            Select your preferred seats
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Green Bus Travels
          </h1>

          <p className="mt-2 text-green-100">
            Delhi → Jaipur
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

          {/* Left Side - Bus */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">
                Select Your Seats
              </h2>

              <div className="text-gray-500">
                🚌 Driver
              </div>
            </div>

            {/* Bus Layout */}
            <div className="border-2 border-gray-300 rounded-xl p-5 md:p-8 max-w-xl mx-auto">

              {/* Driver */}
              <div className="flex justify-end mb-8">
                <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  🚌 Driver
                </div>
              </div>

              {/* Seats */}
              <div className="space-y-5">

                {/* Create seat rows */}
                {["A", "B", "C", "D", "E"].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-[1fr_1fr_40px_1fr_1fr] gap-3 items-center"
                  >
                    {seats
                      .filter((seat) => seat.id.startsWith(row))
                      .map((seat, index) => (
                        <React.Fragment key={seat.id}>

                          {/* Add aisle after second seat */}
                          {index === 2 && (
                            <div></div>
                          )}

                          <Seat
                            seatNumber={seat.id}
                            status={getSeatStatus(seat)}
                            onClick={() => handleSeatClick(seat)}
                          />

                        </React.Fragment>
                      ))}
                  </div>
                ))}

              </div>

            </div>

            {/* Legend */}
            <div className="mt-8 flex justify-center">
              <SeatLegend />
            </div>

          </div>


          {/* Right Side - Booking Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold text-gray-800 pb-4 border-b">
              Booking Summary
            </h2>

            <div className="py-5 border-b space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">Bus</span>
                <span className="font-medium">
                  Green Bus Travels
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Route</span>
                <span className="font-medium">
                  Delhi → Jaipur
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Departure</span>
                <span className="font-medium">
                  10:00 PM
                </span>
              </div>

            </div>


            <div className="py-5 border-b">

              <p className="text-gray-500 text-sm mb-2">
                Selected Seats
              </p>

              {selectedSeats.length === 0 ? (
                <p className="text-gray-400">
                  No seats selected
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedSeats.map((seat) => (
                    <span
                      key={seat}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded"
                    >
                      {seat}
                    </span>
                  ))}
                </div>
              )}

            </div>


            <div className="py-5">

              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>

                <span className="text-green-600">
                  ₹{totalPrice}
                </span>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                ₹{pricePerSeat} × {selectedSeats.length} seat(s)
              </p>

            </div>


            <button
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition
                ${
                  selectedSeats.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
              `}
            >
              CONTINUE
            </button>

          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
};

export default SeatSelection;