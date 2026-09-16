import React, {
  useMemo,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import {
  getBookedSeats,
} from "../utils/seatAvailability";

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    bus,
    searchData = {},
  } = location.state || {};

  const [
    selectedSeats,
    setSelectedSeats,
  ] = useState([]);

  const totalSeats = 40;

  const pricePerSeat =
    bus?.price || 850;

  const bookedSeats = useMemo(() => {
    return getBookedSeats(
      bus,
      searchData
    );
  }, [bus, searchData]);

  const seats = Array.from(
    { length: totalSeats },
    (_, index) => index + 1
  );

  const handleSeatClick = (
    seatNumber
  ) => {
    if (
      bookedSeats.includes(seatNumber)
    ) {
      return;
    }

    setSelectedSeats((previous) => {
      if (
        previous.includes(seatNumber)
      ) {
        return previous.filter(
          (seat) =>
            seat !== seatNumber
        );
      }

      return [
        ...previous,
        seatNumber,
      ];
    });
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert(
        "Please select at least one seat."
      );
      return;
    }

    const totalPrice =
      selectedSeats.length *
      pricePerSeat;

    navigate(
      "/passenger-details",
      {
        state: {
          bus,
          selectedSeats,
          totalPrice,
          searchData,
        },
      }
    );
  };

  if (!bus) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">
            Bus information not found
          </h2>

          <button
            onClick={() =>
              navigate("/")
            }
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">

        <button
          onClick={() =>
            navigate(-1)
          }
          className="text-green-600 font-medium mb-4"
        >
          ← Back
        </button>

        <h1 className="text-3xl font-bold text-[#1e2a40]">
          Select Your Seats
        </h1>

        <p className="text-gray-500 mt-2">
          {bus.name}
        </p>

        <p className="text-gray-500">
          {bus.from ||
            searchData.from ||
            "Delhi"}
          {" → "}
          {bus.to ||
            searchData.to ||
            "Jaipur"}
        </p>

        {searchData.date && (
          <p className="text-gray-500">
            Journey Date:{" "}
            {searchData.date}
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 md:p-8">

            <div className="flex justify-between items-center mb-8">

              <div>
                <h2 className="text-xl font-bold">
                  {bus.name}
                </h2>

                <p className="text-gray-500 text-sm">
                  ₹{pricePerSeat} per seat
                </p>
              </div>

              <div className="border rounded-lg px-5 py-3 text-sm font-semibold">
                DRIVER
              </div>

            </div>

            <div className="flex flex-wrap gap-6 mb-8 text-sm">

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-white border-2 border-gray-300 rounded"></span>
                Available
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-green-600 rounded"></span>
                Selected
              </div>

              <div className="flex items-center gap-2">
                <span className="w-5 h-5 bg-gray-400 rounded"></span>
                Booked
              </div>

            </div>

            <div className="border-t pt-8">

              <div className="max-w-md mx-auto">

                <div className="grid grid-cols-4 gap-4">

                  {seats.map(
                    (seatNumber) => {

                      const isBooked =
                        bookedSeats.includes(
                          seatNumber
                        );

                      const isSelected =
                        selectedSeats.includes(
                          seatNumber
                        );

                      return (
                        <button
                          key={seatNumber}
                          type="button"
                          disabled={isBooked}
                          onClick={() =>
                            handleSeatClick(
                              seatNumber
                            )
                          }
                          className={`
                            h-14 rounded-lg border-2 font-semibold transition
                            ${
                              isBooked
                                ? "bg-gray-400 border-gray-400 text-white cursor-not-allowed"
                                : isSelected
                                ? "bg-green-600 border-green-600 text-white"
                                : "bg-white border-gray-300 text-gray-700 hover:border-green-600 hover:text-green-600"
                            }
                          `}
                        >
                          {seatNumber}
                        </button>
                      );
                    }
                  )}

                </div>

              </div>

            </div>

            {bookedSeats.length > 0 && (
              <div className="mt-8 bg-gray-50 border rounded-lg p-4">

                <p className="text-sm text-gray-600">
                  <span className="font-semibold">
                    Already booked:
                  </span>{" "}
                  {bookedSeats
                    .sort(
                      (a, b) =>
                        a - b
                    )
                    .join(", ")}
                </p>

              </div>
            )}

          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">

            <h2 className="text-xl font-bold text-[#1e2a40] mb-6">
              Booking Summary
            </h2>

            <div className="border-b pb-5">

              <p className="text-gray-500 text-sm">
                Bus
              </p>

              <p className="font-semibold mt-1">
                {bus.name}
              </p>

            </div>

            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Route
              </p>

              <p className="font-semibold mt-1">
                {bus.from ||
                  searchData.from ||
                  "Delhi"}
                {" → "}
                {bus.to ||
                  searchData.to ||
                  "Jaipur"}
              </p>

            </div>

            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Journey Date
              </p>

              <p className="font-semibold mt-1">
                {searchData.date ||
                  "Not available"}
              </p>

            </div>

            <div className="border-b py-5">

              <p className="text-gray-500 text-sm">
                Selected Seats
              </p>

              <p className="font-semibold mt-1">
                {selectedSeats.length > 0
                  ? selectedSeats
                      .sort(
                        (a, b) =>
                          a - b
                      )
                      .join(", ")
                  : "No seats selected"}
              </p>

            </div>

            <div className="flex justify-between pt-5">

              <span className="text-xl font-bold">
                Total
              </span>

              <span className="text-2xl font-bold text-green-600">
                ₹
                {selectedSeats.length *
                  pricePerSeat}
              </span>

            </div>

            <button
              onClick={
                handleContinue
              }
              disabled={
                selectedSeats.length ===
                0
              }
              className={`
                w-full mt-6 py-4 rounded-lg font-semibold
                ${
                  selectedSeats.length ===
                  0
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