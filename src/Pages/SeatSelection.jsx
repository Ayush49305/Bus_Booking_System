import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Seat from "../Components/Seat";
import SeatLegend from "../Components/SeatLegend";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const bus = location.state?.bus;

  const [selectedSeats, setSelectedSeats] = useState([]);

  // If user directly opens seat-selection
  if (!bus) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-3xl mx-auto text-center py-32 px-4">
          <h2 className="text-2xl font-bold text-gray-800">
            No Bus Selected
          </h2>

          <p className="text-gray-500 mt-3">
            Please select a bus first.
          </p>

          <button
            onClick={() => navigate("/search-results")}
            className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Go to Search Results
          </button>
        </div>

        <Footer />
      </div>
    );
  }

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
    if (seat.status === "booked") return "booked";

    if (selectedSeats.includes(seat.id)) return "selected";

    return "available";
  };

  const totalPrice = selectedSeats.length * bus.price;

  const handleContinue = () => {
    navigate("/passenger-details", {
      state: {
        bus,
        selectedSeats,
        totalPrice,
        pricePerSeat: bus.price,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      {/* Header */}
      <section className="bg-green-700 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <p className="text-green-100 text-sm">
            Select your preferred seats
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            {bus.name}
          </h1>

          <p className="mt-2 text-green-100">
            {bus.from} → {bus.to}
          </p>

        </div>
      </section>

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

          {/* Bus Layout */}
          <div className="bg-white rounded-xl shadow-md p-6 md:p-10">

            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Select Your Seats
            </h2>

            <div className="border-2 border-gray-300 rounded-xl p-5 md:p-8 max-w-xl mx-auto">

              <div className="flex justify-end mb-8">
                <div className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
                  🚌 Driver
                </div>
              </div>

              <div className="space-y-5">

                {["A", "B", "C", "D", "E"].map((row) => (

                  <div
                    key={row}
                    className="grid grid-cols-[1fr_1fr_40px_1fr_1fr] gap-3 items-center"
                  >

                    {seats
                      .filter((seat) => seat.id.startsWith(row))
                      .map((seat, index) => (

                        <React.Fragment key={seat.id}>

                          {index === 2 && <div></div>}

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

            <div className="mt-8 flex justify-center">
              <SeatLegend />
            </div>

          </div>


          {/* Booking Summary */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold text-gray-800 pb-4 border-b">
              Booking Summary
            </h2>

            <div className="py-5 border-b space-y-4">

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Bus</span>
                <span className="font-medium text-right">
                  {bus.name}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Route</span>
                <span className="font-medium">
                  {bus.from} → {bus.to}
                </span>
              </div>

              <div className="flex justify-between gap-3">
                <span className="text-gray-500">Departure</span>
                <span className="font-medium">
                  {bus.departure}
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
                ₹{bus.price} × {selectedSeats.length} seat(s)
              </p>

            </div>

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className={`w-full py-3 rounded-lg font-semibold transition ${
                selectedSeats.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
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