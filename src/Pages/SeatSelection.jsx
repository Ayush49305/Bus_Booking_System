import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/api";

// IMPORTANT: this component is defined OUTSIDE SeatSelection.
// When it was defined inside, React created a brand new component on every
// render, so all seats were re-mounted (blinking) and clicks were lost.
const SeatButton = ({ seatNumber, isBooked, isSelected, onClick }) => {
  return (
    <button
      type="button"
      disabled={isBooked}
      onClick={() => onClick(seatNumber)}
      className={`w-11 h-9 sm:w-16 sm:h-10.5 rounded-md text-xs sm:text-sm font-semibold shadow-sm flex items-center justify-center transition-all duration-200 border ${
        isBooked
          ? "bg-[#f15a24] border-[#f15a24] text-white cursor-not-allowed"
          : isSelected
          ? "bg-green-600 border-green-600 text-white hover:bg-green-700 scale-105"
          : "bg-gray-300 border-gray-300 text-gray-800 hover:bg-gray-400 hover:scale-105"
      }`}
    >
      {String(seatNumber).padStart(2, "0")}
    </button>
  );
};

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, searchData = {} } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  const totalSeats = 40;
  const pricePerSeat = bus?.price || 850;

  const seats = Array.from({ length: totalSeats }, (_, index) => index + 1);

  // Load already booked seats ONCE (and again only if bus/date changes)
  useEffect(() => {
    const fetchBookedSeats = async () => {
      if (!bus?._id || !searchData?.date) return;

      try {
        const response = await API.get(`/buses/${bus._id}/seats`, {
          params: { date: searchData.date },
        });

        setBookedSeats(response.data.bookedSeats || []);
      } catch (error) {
        console.error("Seat availability error:", error);
      }
    };

    fetchBookedSeats();
  }, [bus?._id, searchData?.date]);

  // Select / unselect seat
  const handleSeatClick = (seatNumber) => {
    if (bookedSeats.includes(seatNumber)) return;

    setSelectedSeats((previous) =>
      previous.includes(seatNumber)
        ? previous.filter((seat) => seat !== seatNumber)
        : [...previous, seatNumber]
    );
  };

  // Continue to passenger details
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

  // If bus information is missing
  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-[#1e2a40]">
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

  const renderSeats = (filterFn) =>
    seats.filter(filterFn).map((seatNumber) => (
      <SeatButton
        key={seatNumber}
        seatNumber={seatNumber}
        isBooked={bookedSeats.includes(seatNumber)}
        isSelected={selectedSeats.includes(seatNumber)}
        onClick={handleSeatClick}
      />
    ));

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="text-green-600 hover:text-green-700 font-medium mb-5"
        >
          ← Back
        </button>

        {/* PAGE HEADING */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1e2a40]">
            Select Your Seats
          </h1>

          <p className="text-gray-500 mt-2">{bus.name}</p>

          <p className="text-gray-500">
            {routeFrom} → {routeTo}
          </p>

          {searchData.date && (
            <p className="text-gray-500">Journey Date: {searchData.date}</p>
          )}
        </div>

        {/* MAIN CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* SEAT SECTION */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
              {/* BUS HEADER */}
              <div className="text-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1e2a40]">
                  {bus.name}
                </h2>

                <p className="text-gray-500 mt-1">₹{pricePerSeat} per seat</p>
              </div>

              {/* LEGEND */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-7">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-gray-300 rounded-md shadow-sm"></span>
                  <span className="text-sm font-medium text-gray-700">Free</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-600 rounded-md shadow-sm"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Selected
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#f15a24] rounded-md shadow-sm"></span>
                  <span className="text-sm font-medium text-gray-700">
                    Booked
                  </span>
                </div>
              </div>

              {/* BUS BODY */}
              <div className="border border-gray-300 rounded-lg p-4 sm:p-6">
                {/* DRIVER */}
                <div className="flex justify-end mb-8">
                  <div className="w-22.5 sm:w-26.25 h-10.5 sm:h-12 bg-[#d9f3b8] rounded-md shadow-md flex items-center justify-center text-sm sm:text-base font-semibold text-gray-800">
                    Driver
                  </div>
                </div>

                {/* SEAT LAYOUT */}
                <div className="flex justify-center overflow-x-auto">
                  <div className="flex items-start gap-6 sm:gap-16 md:gap-20">
                    {/* LEFT TWO SEATS */}
                    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-4 sm:gap-y-6">
                      {renderSeats((seat) => seat % 4 === 1 || seat % 4 === 2)}
                    </div>

                    {/* RIGHT TWO SEATS */}
                    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-6 gap-y-4 sm:gap-y-6">
                      {renderSeats((seat) => seat % 4 === 3 || seat % 4 === 0)}
                    </div>
                  </div>
                </div>
              </div>

              {bookedSeats.length > 0 && (
                <div className="mt-5 text-center">
                  <p className="text-sm text-gray-500">
                    Orange seats are already booked
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* BOOKING SUMMARY */}
          <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 h-fit lg:sticky lg:top-5">
            <h2 className="text-xl font-bold text-[#1e2a40] mb-6">
              Booking Summary
            </h2>

            <div className="border-b pb-4">
              <p className="text-gray-500 text-sm">Bus</p>
              <p className="font-semibold mt-1">{bus.name}</p>
            </div>

            <div className="border-b py-4">
              <p className="text-gray-500 text-sm">Route</p>
              <p className="font-semibold mt-1">
                {routeFrom} → {routeTo}
              </p>
            </div>

            <div className="border-b py-4">
              <p className="text-gray-500 text-sm">Journey Date</p>
              <p className="font-semibold mt-1">
                {searchData.date || "Not available"}
              </p>
            </div>

            <div className="border-b py-4">
              <p className="text-gray-500 text-sm">Selected Seats</p>

              <p className="font-semibold mt-1">
                {selectedSeats.length > 0
                  ? [...selectedSeats]
                      .sort((a, b) => a - b)
                      .map((seat) => String(seat).padStart(2, "0"))
                      .join(", ")
                  : "No seats selected"}
              </p>
            </div>

            <div className="border-b py-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Number of Seats</span>
                <span className="font-semibold">{selectedSeats.length}</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-5">
              <span className="text-xl font-bold">Total</span>

              <span className="text-2xl font-bold text-green-600">
                ₹{selectedSeats.length * pricePerSeat}
              </span>
            </div>

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className={`w-full mt-6 py-3.5 rounded-lg font-semibold transition ${
                selectedSeats.length === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 text-white"
              }`}
            >
              CONTINUE TO PASSENGER DETAILS
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SeatSelection;
