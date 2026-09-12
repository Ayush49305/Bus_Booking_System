import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const BookingDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const booking =
    location.state?.booking;


  if (!booking) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

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


  const handlePrint = () => {
    window.print();
  };


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-4xl mx-auto px-6 py-10">

        <button
          onClick={() => navigate(-1)}
          className="text-green-600 font-semibold mb-6"
        >
          ← Back
        </button>


        <div className="bg-white rounded-xl shadow-md p-8">

          <div className="flex flex-col md:flex-row md:justify-between gap-4">

            <div>

              <h1 className="text-3xl font-bold text-[#1e2a40]">
                Booking Details
              </h1>

              <p className="text-gray-500 mt-2">
                Booking ID: {booking.bookingId}
              </p>

            </div>


            <span
              className={`px-4 py-2 rounded-lg font-semibold h-fit ${
                booking.status === "Cancelled"
                  ? "bg-red-100 text-red-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {booking.status}
            </span>

          </div>


          {/* BUS */}
          <div className="border-t mt-8 pt-8">

            <h2 className="text-xl font-bold mb-5">
              Bus Information
            </h2>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              <div>
                <p className="text-gray-500 text-sm">
                  Bus
                </p>

                <p className="font-semibold">
                  {booking.bus?.name}
                </p>
              </div>


              <div>
                <p className="text-gray-500 text-sm">
                  Type
                </p>

                <p className="font-semibold">
                  {booking.bus?.type}
                </p>
              </div>


              <div>
                <p className="text-gray-500 text-sm">
                  Route
                </p>

                <p className="font-semibold">
                  {booking.bus?.from ||
                    booking.searchData?.from ||
                    "Delhi"}
                  {" → "}
                  {booking.bus?.to ||
                    booking.searchData?.to ||
                    "Jaipur"}
                </p>
              </div>


              <div>
                <p className="text-gray-500 text-sm">
                  Departure
                </p>

                <p className="font-semibold">
                  {booking.bus?.departure}
                </p>
              </div>

            </div>

          </div>


          {/* PASSENGERS */}
          <div className="border-t mt-8 pt-8">

            <h2 className="text-xl font-bold mb-5">
              Passenger Information
            </h2>


            <div className="space-y-4">

              {booking.passengers?.map(
                (passenger) => (

                  <div
                    key={passenger.seat}
                    className="border rounded-lg p-5"
                  >

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-bold">
                          {passenger.name}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          Age: {passenger.age}
                          {" • "}
                          Gender: {passenger.gender}
                        </p>

                        <p className="text-gray-500 mt-1">
                          Phone: {passenger.phone}
                        </p>

                        <p className="text-gray-500">
                          Email: {passenger.email}
                        </p>

                      </div>


                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg h-fit font-semibold">
                        Seat {passenger.seat}
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>


          {/* PAYMENT */}
          <div className="border-t mt-8 pt-8">

            <h2 className="text-xl font-bold mb-5">
              Payment Information
            </h2>


            <div className="flex justify-between">

              <span className="text-gray-500">
                Payment Method
              </span>

              <span className="font-semibold capitalize">
                {booking.paymentMethod}
              </span>

            </div>


            <div className="flex justify-between mt-4 text-xl">

              <span className="font-bold">
                Total Amount
              </span>

              <span className="font-bold text-green-600">
                ₹{booking.totalPrice}
              </span>

            </div>

          </div>


          <button
            onClick={handlePrint}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
          >
            Print Ticket
          </button>

        </div>

      </div>


      <Footer />

    </div>
  );
};

export default BookingDetails;