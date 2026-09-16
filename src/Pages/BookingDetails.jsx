import React from "react";

import {
  Link,
  useLocation,
} from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookingDetails = () => {
  const location =
    useLocation();

  const booking =
    location.state?.booking;

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white p-8 rounded-xl shadow-md text-center">

          <h2 className="text-2xl font-bold">
            Booking not found
          </h2>

          <Link
            to="/my-bookings"
            className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            My Bookings
          </Link>

        </div>

      </div>
    );
  }

  const {
    bookingId,
    bus,
    selectedSeats = [],
    passengers = [],
    totalPrice = 0,
    paymentMethod,
    status,
    bookingDate,
    bookingTime,
    searchData,
  } = booking;

  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />

      <div className="max-w-5xl mx-auto px-6 py-10">

        <Link
          to="/my-bookings"
          className="text-green-600 font-medium"
        >
          ← Back to My Bookings
        </Link>

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-[#1e2a40]">
                Booking Details
              </h1>

              <p className="text-gray-500 mt-2">
                Booking ID:{" "}
                <span className="font-semibold">
                  {bookingId}
                </span>
              </p>

            </div>

            <span
              className={`px-4 py-2 rounded-lg font-semibold w-fit ${
                status ===
                "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {status}
            </span>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">

          <h2 className="text-2xl font-bold text-[#1e2a40] mb-6">
            Bus Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Bus Name
              </p>

              <p className="font-semibold">
                {bus?.name}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Bus Type
              </p>

              <p className="font-semibold">
                {bus?.type}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Route
              </p>

              <p className="font-semibold">
                {bus?.from ||
                  searchData?.from ||
                  "Delhi"}
                {" → "}
                {bus?.to ||
                  searchData?.to ||
                  "Jaipur"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Journey Date
              </p>

              <p className="font-semibold">
                {searchData?.date ||
                  "Not available"}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Departure
              </p>

              <p className="font-semibold">
                {bus?.departure}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Arrival
              </p>

              <p className="font-semibold">
                {bus?.arrival}
              </p>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">

          <h2 className="text-2xl font-bold text-[#1e2a40] mb-6">
            Passenger Details
          </h2>

          <div className="space-y-4">

            {selectedSeats.map(
              (seat) => {

                const passenger =
                  passengers.find(
                    (item) =>
                      Number(
                        item.seat
                      ) ===
                      Number(seat)
                  );

                return (
                  <div
                    key={seat}
                    className="border rounded-lg p-5"
                  >

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                      <div>

                        <h3 className="font-bold text-lg">
                          {
                            passenger?.name ||
                            "Passenger"
                          }
                        </h3>

                        <div className="text-gray-500 text-sm mt-2 space-y-1">

                          <p>
                            Age:{" "}
                            {passenger?.age ||
                              "-"}
                          </p>

                          <p>
                            Gender:{" "}
                            {passenger?.gender ||
                              "-"}
                          </p>

                          <p>
                            Phone:{" "}
                            {passenger?.phone ||
                              "-"}
                          </p>

                          <p>
                            Email:{" "}
                            {passenger?.email ||
                              "-"}
                          </p>

                        </div>

                      </div>

                      <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold w-fit">
                        Seat {seat}
                      </span>

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-md p-8 mt-6">

          <h2 className="text-2xl font-bold text-[#1e2a40] mb-6">
            Payment Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-sm text-gray-500">
                Payment Method
              </p>

              <p className="font-semibold capitalize">
                {paymentMethod}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Total Amount
              </p>

              <p className="font-bold text-xl text-green-600">
                ₹{totalPrice}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Booking Date
              </p>

              <p className="font-semibold">
                {bookingDate}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">
                Booking Time
              </p>

              <p className="font-semibold">
                {bookingTime}
              </p>
            </div>

          </div>

        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-6">

          <button
            onClick={() =>
              window.print()
            }
            className="flex-1 border bg-white py-3 rounded-lg font-semibold hover:bg-gray-50"
          >
            Print Booking
          </button>

          <Link
            to="/my-bookings"
            className="flex-1 text-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            My Bookings
          </Link>

          <Link
            to="/"
            className="flex-1 text-center border border-green-600 text-green-600 py-3 rounded-lg font-semibold"
          >
            Book Another Ticket
          </Link>

        </div>

      </div>

      <Footer />

    </div>
  );
};

export default BookingDetails;