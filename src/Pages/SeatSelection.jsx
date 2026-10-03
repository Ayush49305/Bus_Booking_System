import React, { useEffect,useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/api";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { bus, searchData = {} } = location.state || {};

  const [selectedSeats, setSelectedSeats] = useState([]);

  const totalSeats = 40;
  const pricePerSeat = bus?.price || 850;

  // Get already booked seats
  const [bookedSeats, setBookedSeats] =
  useState([]);

const [loadingSeats, setLoadingSeats] =
  useState(true);

  // Create 40 seats
  const seats = Array.from(
    { length: totalSeats },
    (_, index) => index + 1
  );

  // Select / unselect seat
  const handleSeatClick = (seatNumber) => {
    // Do nothing if seat is already booked
    if (bookedSeats.includes(seatNumber)) {
      return;
    }

    setSelectedSeats((previous) => {
      // If already selected, remove it
      if (previous.includes(seatNumber)) {
        return previous.filter((seat) => seat !== seatNumber);
      }

      // Otherwise select it
      return [...previous, seatNumber];
    });
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

  // Seat Button
  const SeatButton = ({ seatNumber }) => {
    const isBooked = bookedSeats.includes(seatNumber);
    const isSelected = selectedSeats.includes(seatNumber);

    useEffect(() => {

  const fetchBookedSeats = async () => {

    if (!bus?._id || !searchData?.date) {
      setLoadingSeats(false);
      return;
    }

    try {

      const response =
        await API.get(
          `/buses/${bus._id}/seats`,
          {
            params: {
              date: searchData.date,
            },
          }
        );

      setBookedSeats(
        response.data.bookedSeats || []
      );

    } catch (error) {

      console.error(
        "Seat availability error:",
        error
      );

    } finally {

      setLoadingSeats(false);

    }

  };

  fetchBookedSeats();

}, [bus?._id, searchData?.date]);

    return (
      <button
        type="button"
        disabled={isBooked}
        onClick={() => handleSeatClick(seatNumber)}
        className={`
          w-13
          h-9

          sm:w-16
          sm:h-10.5

          rounded-md

          text-xs
          sm:text-sm

          font-semibold

          shadow-sm

          flex
          items-center
          justify-center

          transition-all
          duration-200

          ${
            /* BOOKED */
            isBooked
              ? `
                bg-[#f15a24]
                border
                border-[#f15a24]
                text-white
                cursor-not-allowed
              `
              : /* SELECTED */
              isSelected
              ? `
                bg-green-600
                border
                border-green-600
                text-white
                hover:bg-green-700
                scale-105
              `
              : /* AVAILABLE */
                `
                bg-gray-300
                border
                border-gray-300
                text-gray-800
                hover:bg-gray-400
                hover:scale-105
              `
          }
        `}
      >
        {String(seatNumber).padStart(2, "0")}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ================= BACK BUTTON ================= */}

        <button
          onClick={() => navigate(-1)}
          className="text-green-600 hover:text-green-700 font-medium mb-5"
        >
          ← Back
        </button>

        {/* ================= PAGE HEADING ================= */}

        <div className="mb-6">
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
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ================================================= */}
          {/*                    SEAT SECTION                   */}
          {/* ================================================= */}

          <div className="lg:col-span-2">

            <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">

              {/* ================= BUS HEADER ================= */}

              <div className="text-center mb-6">

                <h2 className="text-xl sm:text-2xl font-bold text-[#1e2a40]">
                  {bus.name}
                </h2>

                <p className="text-gray-500 mt-1">
                  ₹{pricePerSeat} per seat
                </p>

              </div>

              {/* ================= LEGEND ================= */}

              <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mb-7">

                {/* Available */}

                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-gray-300 rounded-md shadow-sm"></span>

                  <span className="text-sm font-medium text-gray-700">
                    Free
                  </span>
                </div>

                {/* Selected */}

                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-green-600 rounded-md shadow-sm"></span>

                  <span className="text-sm font-medium text-gray-700">
                    Selected
                  </span>
                </div>

                {/* Booked */}

                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 bg-[#f15a24] rounded-md shadow-sm"></span>

                  <span className="text-sm font-medium text-gray-700">
                    Booked
                  </span>
                </div>

              </div>

              {/* ================= BUS BODY ================= */}

              <div className="border border-gray-300 rounded-lg p-4 sm:p-6">

                {/* ================= DRIVER ================= */}

                <div className="flex justify-end mb-8">

                  <div
                    className="
                      w-22.5
                      sm:w-26.25

                      h-10.5
                      sm:h-12

                      bg-[#d9f3b8]

                      rounded-md

                      shadow-md

                      flex
                      items-center
                      justify-center

                      text-sm
                      sm:text-base

                      font-semibold

                      text-gray-800
                    "
                  >
                    Driver
                  </div>

                </div>

                {/* ================= SEAT LAYOUT ================= */}

                <div className="flex justify-center overflow-x-auto">

                  <div
                    className="
                      flex
                      items-start

                      gap-10
                      sm:gap-16
                      md:gap-20
                    "
                  >

                    {/* ========================================= */}
                    {/*              LEFT TWO SEATS               */}
                    {/* ========================================= */}

                    <div
                      className="
                        grid
                        grid-cols-2

                        gap-x-4
                        sm:gap-x-6

                        gap-y-5
                        sm:gap-y-6
                      "
                    >

                      {seats
                        .filter(
                          (seat) =>
                            seat % 4 === 1 ||
                            seat % 4 === 2
                        )
                        .map((seatNumber) => (
                          <SeatButton
                            key={seatNumber}
                            seatNumber={seatNumber}
                          />
                        ))}

                    </div>

                    {/* ========================================= */}
                    {/*              RIGHT TWO SEATS              */}
                    {/* ========================================= */}

                    <div
                      className="
                        grid
                        grid-cols-2

                        gap-x-4
                        sm:gap-x-6

                        gap-y-5
                        sm:gap-y-6
                      "
                    >

                      {seats
                        .filter(
                          (seat) =>
                            seat % 4 === 3 ||
                            seat % 4 === 0
                        )
                        .map((seatNumber) => (
                          <SeatButton
                            key={seatNumber}
                            seatNumber={seatNumber}
                          />
                        ))}

                    </div>

                  </div>

                </div>

              </div>

              {/* ================= BOOKED INFORMATION ================= */}

              {bookedSeats.length > 0 && (
                <div className="mt-5 text-center">

                  <p className="text-sm text-gray-500">
                    Orange seats are already booked
                  </p>

                </div>
              )}

            </div>

          </div>

          {/* ================================================= */}
          {/*                 BOOKING SUMMARY                   */}
          {/* ================================================= */}

          <div
            className="
              bg-white
              rounded-xl
              shadow-md

              p-5
              sm:p-6

              h-fit

              lg:sticky
              lg:top-5
            "
          >

            <h2 className="text-xl font-bold text-[#1e2a40] mb-6">
              Booking Summary
            </h2>

            {/* ================= BUS ================= */}

            <div className="border-b pb-4">

              <p className="text-gray-500 text-sm">
                Bus
              </p>

              <p className="font-semibold mt-1">
                {bus.name}
              </p>

            </div>

            {/* ================= ROUTE ================= */}

            <div className="border-b py-4">

              <p className="text-gray-500 text-sm">
                Route
              </p>

              <p className="font-semibold mt-1">
                {routeFrom} → {routeTo}
              </p>

            </div>

            {/* ================= JOURNEY DATE ================= */}

            <div className="border-b py-4">

              <p className="text-gray-500 text-sm">
                Journey Date
              </p>

              <p className="font-semibold mt-1">
                {searchData.date || "Not available"}
              </p>

            </div>

            {/* ================= SELECTED SEATS ================= */}

            <div className="border-b py-4">

              <p className="text-gray-500 text-sm">
                Selected Seats
              </p>

              <p className="font-semibold mt-1">

                {selectedSeats.length > 0
                  ? [...selectedSeats]
                      .sort((a, b) => a - b)
                      .map((seat) =>
                        String(seat).padStart(2, "0")
                      )
                      .join(", ")
                  : "No seats selected"}

              </p>

            </div>

            {/* ================= NUMBER OF SEATS ================= */}

            <div className="border-b py-4">

              <div className="flex justify-between">

                <span className="text-gray-500">
                  Number of Seats
                </span>

                <span className="font-semibold">
                  {selectedSeats.length}
                </span>

              </div>

            </div>

            {/* ================= TOTAL ================= */}

            <div className="flex justify-between items-center pt-5">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹{selectedSeats.length * pricePerSeat}
              </span>

            </div>

            {/* ================= CONTINUE BUTTON ================= */}

            <button
              onClick={handleContinue}
              disabled={selectedSeats.length === 0}
              className={`
                w-full
                mt-6
                py-3.5
                rounded-lg
                font-semibold
                transition

                ${
                  selectedSeats.length === 0
                    ? `
                      bg-gray-300
                      text-gray-500
                      cursor-not-allowed
                    `
                    : `
                      bg-green-600
                      hover:bg-green-700
                      text-white
                    `
                }
              `}
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