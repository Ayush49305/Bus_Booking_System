import React, { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import { getBookedSeats } from "../utils/seatAvailability";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, searchData = {} } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalSeats = 40;

  const pricePerSeat = bus?.price || 850;

  const bookedSeats = useMemo(() => {
    return getBookedSeats(bus, searchData);
  }, [bus, searchData]);

  const seats = Array.from(
    { length: totalSeats },
    (_, index) => index + 1
  );

  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((previous) => {
      if (previous.includes(seatNumber)) {
        return previous.filter((seat) => seat !== seatNumber);
      }

      return [...previous, seatNumber];
    });
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    const totalPrice = selectedSeats.length * pricePerSeat;

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
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">
            Bus information not found
          </h2>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  const routeFrom = bus.from || searchData.from || "Delhi";
  const routeTo = bus.to || searchData.to || "Jaipur";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 hover:text-green-700 font-medium mb-4"
        >
          ← Back
        </button>

        {/* Page Heading */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a40]">
          Select Your Seats
        </h1>

        <p className="text-gray-500 mt-2">
          {bus.name}
        </p>

        <p className="text-gray-500">
          {routeFrom} → {routeTo}
        </p>

        {searchData.date && (
          <p className="text-gray-500">
            Journey Date: {searchData.date}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-6 sm:mt-8">

          {/* ================= SEAT SECTION ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-4 sm:p-6 md:p-8">

            {/* Bus Header */}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-7">

              <div>
                <h2 className="text-xl font-bold">
                  {bus.name}
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  ₹{pricePerSeat} per seat
                </p>
              </div>

              {/* Driver */}
              <div className="border border-gray-400 rounded-lg px-5 py-3 text-sm font-semibold self-start sm:self-auto">
                DRIVER
              </div>

            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 mb-7 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-white border-2 border-gray-300 rounded"></span>
                <span>Available</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-600 rounded"></span>
                <span>Selected</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                <span>Booked</span>
              </div>

            </div>

            <div className="border-t pt-7">

              {/* ================= SEAT LAYOUT ================= */}
              <div className="flex justify-center w-full">

                <div className="grid grid-cols-4 gap-x-5 gap-y-4 sm:gap-x-7 sm:gap-y-5">

                  {seats.map((seatNumber) => {
                    const isBooked = bookedSeats.includes(seatNumber);
                    const isSelected = selectedSeats.includes(seatNumber);

                    return (
                      <button
                        key={seatNumber}
                        type="button"
                        disabled={isBooked}
                        onClick={() => handleSeatClick(seatNumber)}
                        className={`
                          w-[62px]
                          h-[48px]
                          sm:w-[76px]
                          sm:h-[52px]
                          md:w-[88px]
                          md:h-[55px]
                          rounded-lg
                          border-2
                          font-semibold
                          text-sm
                          sm:text-base
                          transition-all
                          duration-200
                          flex
                          items-center
                          justify-center

                          ${
                            isBooked
                              ? "bg-gray-400 border-gray-400 text-white cursor-not-allowed"
                              : isSelected
                              ? "bg-green-600 border-green-600 text-white shadow-sm"
                              : "bg-white border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600 hover:shadow-sm"
                          }
                        `}
                      >
                        {seatNumber}
                      </button>
                    );
                  })}

                </div>

              </div>

            </div>

            {/* Already Booked Seats */}
            {bookedSeats.length > 0 && (
              <div className="mt-7 bg-gray-50 border rounded-lg p-4">

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    Already booked:
                  </span>{" "}
                  {[...bookedSeats]
                    .sort((a, b) => a - b)
                    .join(", ")}
                </p>

              </div>
            )}

          </div>

          {/* ================= BOOKING SUMMARY ================= */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-fit lg:sticky lg:top-5">

            <h2 className="text-xl font-bold text-[#1e2a40] mb-6">
              Booking Summary
            </h2>

            {/* Bus */}
            <div className="border-b pb-5">

              <p className="text-gray-500 text-sm">
                Bus
              </p>

              <p className="font-semibold mt-1">
                {bus.name}
              </p>

            </div>

            {/* Route */}
            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Route
              </p>

              <p className="font-semibold mt-1">
                {routeFrom} → {routeTo}
              </p>

            </div>

            {/* Journey Date */}
            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Journey Date
              </p>

              <p className="font-semibold mt-1">
                {searchData.date || "Not available"}
              </p>

            </div>

            {/* Selected Seats */}
            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Selected Seats
              </p>

              <p className="font-semibold mt-1">
                {selectedSeats.length > 0
                  ? [...selectedSeats]
                      .sort((a, b) => a - b)
                      .join(", ")
                  : "No seats selected"}
              </p>

            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-5">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹{selectedSeats.length * pricePerSeat}
              </span>

            </div>

            {/* Continue */}
            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className={`
                w-full mt-6
                py-3.5
                sm:py-4
                rounded-lg
                font-semibold
                text-sm
                sm:text-base
                transition

                ${
                  selectedSeats.length === 0
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700 text-white"
                }
              `}
            >
              CONTINUE TO PASSENGER DETAILS
            </button>

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SeatSelection;