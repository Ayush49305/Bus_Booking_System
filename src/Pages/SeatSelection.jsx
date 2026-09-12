import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SeatSelection = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    bus,
    searchData,
  } = location.state || {};


  const seats = Array.from(
    { length: 32 },
    (_, index) => index + 1
  );


  const bookedSeats = [3, 7, 12, 18, 25, 30];


  const [selectedSeats, setSelectedSeats] = useState([]);


  const toggleSeat = (seat) => {

    if (bookedSeats.includes(seat)) {
      return;
    }


    if (selectedSeats.includes(seat)) {

      setSelectedSeats(
        selectedSeats.filter(
          (item) => item !== seat
        )
      );

    } else {

      if (selectedSeats.length >= 6) {

        alert("You can select maximum 6 seats.");

        return;
      }

      setSelectedSeats([
        ...selectedSeats,
        seat,
      ]);

    }

  };


  const totalPrice =
    selectedSeats.length *
    Number(bus?.price || 0);


  const handleContinue = () => {

    if (selectedSeats.length === 0) {

      alert("Please select at least one seat.");

      return;
    }


    navigate("/passenger-details", {
      state: {
        bus,
        selectedSeats,
        totalPrice,
        searchData,
      },
    });

  };


  if (!bus) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Bus information not found
          </h2>

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


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-7xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-[#1e2a40]">
          Select Your Seats
        </h1>

        <p className="text-gray-500 mt-2">
          {bus.name} • {bus.departure} → {bus.arrival}
        </p>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">


          {/* SEATS */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">

            <div className="flex justify-between mb-8 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-gray-300"></span>
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-green-600"></span>
                Selected
              </div>

              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded bg-red-400"></span>
                Booked
              </div>

            </div>


            {/* DRIVER */}
            <div className="border rounded-lg p-4 mb-8 text-right">
              🚌 Driver
            </div>


            {/* SEAT GRID */}
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">

              {seats.map((seat) => {

                const isBooked =
                  bookedSeats.includes(seat);

                const isSelected =
                  selectedSeats.includes(seat);


                return (
                  <button
                    key={seat}
                    disabled={isBooked}
                    onClick={() => toggleSeat(seat)}
                    className={`
                      h-14 rounded-lg font-semibold border
                      ${
                        isBooked
                          ? "bg-red-400 text-white cursor-not-allowed"
                          : isSelected
                          ? "bg-green-600 text-white border-green-600"
                          : "bg-gray-100 hover:bg-green-100 border-gray-300"
                      }
                    `}
                  >
                    {seat}
                  </button>
                );

              })}

            </div>

          </div>


          {/* SUMMARY */}
          <div className="bg-white rounded-xl shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold text-[#1e2a40] mb-5">
              Booking Summary
            </h2>


            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-gray-500">
                  Bus
                </span>

                <span className="font-semibold">
                  {bus.name}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-gray-500">
                  Route
                </span>

                <span className="font-semibold">
                  {bus.from || searchData?.from || "Delhi"}
                  {" → "}
                  {bus.to || searchData?.to || "Jaipur"}
                </span>
              </div>


              <div className="flex justify-between">
                <span className="text-gray-500">
                  Seats
                </span>

                <span className="font-semibold">
                  {selectedSeats.length}
                </span>
              </div>


              <div className="border-t pt-4 flex justify-between">

                <span className="font-bold">
                  Total
                </span>

                <span className="text-2xl font-bold text-green-600">
                  ₹{totalPrice}
                </span>

              </div>

            </div>


            <button
              onClick={handleContinue}
              className="w-full mt-7 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Continue
            </button>

          </div>

        </div>

      </div>


      <Footer />

    </div>
  );
};

export default SeatSelection;