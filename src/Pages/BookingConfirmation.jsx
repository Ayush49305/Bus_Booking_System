import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    bus,
    selectedSeats = [],
    passengers = {},
    totalPrice = 0,
    paymentMethod = "",
  } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
          
          {/* Success Message */}
          <div className="text-center border-b pb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-gray-800 mt-5">
              Booking Confirmed!
            </h1>

            <p className="text-gray-500 mt-2">
              Your bus ticket has been booked successfully.
            </p>
          </div>

          {/* Booking ID */}
          <div className="text-center py-6 border-b">
            <p className="text-sm text-gray-500">
              Booking ID
            </p>

            <p className="text-xl font-bold text-green-600 mt-1">
              BUS{Math.floor(100000 + Math.random() * 900000)}
            </p>
          </div>

          {/* Journey Details */}
          <div className="py-6 border-b">
            <h2 className="text-xl font-bold mb-5">
              Journey Details
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <p className="text-sm text-gray-500">Bus</p>
                <p className="font-semibold">{bus?.name}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Route</p>
                <p className="font-semibold">{bus?.from} → {bus?.to}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Departure</p>
                <p className="font-semibold">{bus?.departure}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Selected Seats</p>
                <p className="font-semibold">
                  {selectedSeats.join(", ")}
                </p>
              </div>
            </div>
          </div>

          {/* Passenger Details */}
          <div className="py-6 border-b">
            <h2 className="text-xl font-bold mb-5">
              Passenger Details
            </h2>

            <div className="space-y-4">
              {selectedSeats.map((seat) => (
                <div
                  key={seat}
                  className="flex justify-between items-center bg-gray-50 p-4 rounded-lg"
                >
                  <div>
                    <p className="font-semibold">
                      {passengers[seat]?.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {passengers[seat]?.age} years •{" "}
                      {passengers[seat]?.gender}
                    </p>
                  </div>

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md font-medium">
                    Seat {seat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className="py-6">
            <h2 className="text-xl font-bold mb-5">
              Payment Details
            </h2>

            <div className="flex justify-between">
              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-semibold uppercase">
                {paymentMethod}
              </span>
            </div>

            <div className="flex justify-between mt-4 text-lg font-bold">
              <span>Total Paid</span>

              <span className="text-green-600">
                ₹{totalPrice}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <button
              onClick={() => navigate("/")}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              BACK TO HOME
            </button>

            <button
              onClick={() => window.print()}
              className="flex-1 border border-green-600 text-green-600 hover:bg-green-50 py-3 rounded-lg font-semibold"
            >
              PRINT TICKET
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;