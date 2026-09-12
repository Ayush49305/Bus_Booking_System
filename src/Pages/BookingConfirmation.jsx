import React from "react";
import { Link, useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingConfirmation = () => {

  const location = useLocation();

  const {
    bookingId,
    bus,
    selectedSeats = [],
    passengers = [],
    totalPrice = 0,
    paymentMethod = "",
    status = "Confirmed",
    searchData,
  } = location.state || {};


  if (!bus) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Booking information not found
          </h2>

          <Link
            to="/"
            className="inline-block mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </Link>

        </div>

      </div>
    );
  }


  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* SUCCESS */}
        <div className="bg-white rounded-xl shadow-md p-8 text-center">

          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">

            <span className="text-4xl text-green-600">
              ✓
            </span>

          </div>


          <h1 className="text-3xl font-bold text-green-700 mt-5">
            Booking Confirmed!
          </h1>

          <p className="text-gray-500 mt-2">
            Your bus ticket has been booked successfully.
          </p>


          <div className="mt-6 bg-gray-50 rounded-lg p-5">

            <p className="text-gray-500">
              Booking ID
            </p>

            <p className="text-2xl font-bold text-[#1e2a40]">
              {bookingId || "GB00000000"}
            </p>

          </div>

        </div>


        {/* TICKET */}
        <div className="bg-white rounded-xl shadow-md p-8 mt-8">

          <h2 className="text-2xl font-bold text-[#1e2a40] mb-6">
            Ticket Details
          </h2>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <p className="text-gray-500 text-sm">
                Bus
              </p>

              <p className="font-semibold">
                {bus.name}
              </p>
            </div>


            <div>
              <p className="text-gray-500 text-sm">
                Bus Type
              </p>

              <p className="font-semibold">
                {bus.type}
              </p>
            </div>


            <div>
              <p className="text-gray-500 text-sm">
                Route
              </p>

              <p className="font-semibold">
                {bus.from || searchData?.from || "Delhi"}
                {" → "}
                {bus.to || searchData?.to || "Jaipur"}
              </p>
            </div>


            <div>
              <p className="text-gray-500 text-sm">
                Departure
              </p>

              <p className="font-semibold">
                {bus.departure}
              </p>
            </div>


            <div>
              <p className="text-gray-500 text-sm">
                Seats
              </p>

              <p className="font-semibold">
                {selectedSeats.join(", ")}
              </p>
            </div>


            <div>
              <p className="text-gray-500 text-sm">
                Payment Method
              </p>

              <p className="font-semibold capitalize">
                {paymentMethod}
              </p>
            </div>

          </div>


          {/* PASSENGERS */}
          <div className="mt-8">

            <h3 className="text-xl font-bold mb-4">
              Passenger Details
            </h3>

            <div className="space-y-4">

              {selectedSeats.map((seat) => {

                const passenger =
                  passengers.find(
                    (item) =>
                      Number(item.seat) === Number(seat)
                  );


                return (
                  <div
                    key={seat}
                    className="border rounded-lg p-4 flex justify-between"
                  >

                    <div>

                      <p className="font-semibold">
                        {passenger?.name}
                      </p>

                      <p className="text-gray-500 text-sm">
                        Age: {passenger?.age}
                        {" • "}
                        Gender: {passenger?.gender}
                      </p>

                    </div>

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg h-fit">
                      Seat {seat}
                    </span>

                  </div>
                );

              })}

            </div>

          </div>


          {/* TOTAL */}
          <div className="border-t mt-8 pt-6 flex justify-between">

            <span className="text-xl font-bold">
              Total Paid
            </span>

            <span className="text-2xl font-bold text-green-600">
              ₹{totalPrice}
            </span>

          </div>


          <div className="mt-6">

            <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
              {status}
            </span>

          </div>

        </div>


        {/* BUTTONS */}
        <div className="flex flex-col md:flex-row gap-4 mt-8">

          <button
            onClick={handlePrint}
            className="flex-1 border border-gray-300 bg-white py-3 rounded-lg font-semibold"
          >
            Print Ticket
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

export default BookingConfirmation;