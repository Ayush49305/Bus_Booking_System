import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyBookings = () => {

  const navigate = useNavigate();

  const [bookings, setBookings] =
    useState([]);


  const loadBookings = () => {

    const data =
      JSON.parse(
        localStorage.getItem("greenBusBookings")
      ) || [];

    setBookings(data);

  };


  useEffect(() => {

    loadBookings();

  }, []);


  const cancelBooking = (bookingId) => {

    const confirmCancel =
      window.confirm(
        "Are you sure you want to cancel this booking?"
      );


    if (!confirmCancel) {
      return;
    }


    const updatedBookings =
      bookings.map((booking) => {

        if (booking.bookingId === bookingId) {

          return {
            ...booking,
            status: "Cancelled",
          };

        }

        return booking;

      });


    setBookings(updatedBookings);


    localStorage.setItem(
      "greenBusBookings",
      JSON.stringify(updatedBookings)
    );

  };


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      <div className="max-w-6xl mx-auto px-6 py-10">

        <h1 className="text-3xl font-bold text-[#1e2a40]">
          My Bookings
        </h1>

        <p className="text-gray-500 mt-2 mb-8">
          View and manage your bus bookings.
        </p>


        {bookings.length === 0 ? (

          <div className="bg-white rounded-xl shadow-md p-12 text-center">

            <div className="text-5xl mb-5">
              🚌
            </div>

            <h2 className="text-2xl font-bold">
              No bookings yet
            </h2>

            <p className="text-gray-500 mt-2">
              Your confirmed bookings will appear here.
            </p>

            <Link
              to="/"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Book a Ticket
            </Link>

          </div>

        ) : (

          <div className="space-y-6">

            {bookings.map((booking) => (

              <div
                key={booking.bookingId}
                className="bg-white rounded-xl shadow-md p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

                  <div>

                    <h2 className="text-xl font-bold text-[#1e2a40]">
                      {booking.bus?.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {booking.bus?.from ||
                        booking.searchData?.from ||
                        "Delhi"}
                      {" → "}
                      {booking.bus?.to ||
                        booking.searchData?.to ||
                        "Jaipur"}
                    </p>

                  </div>


                  <span
                    className={`px-4 py-2 rounded-lg font-semibold w-fit ${
                      booking.status === "Cancelled"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {booking.status}
                  </span>

                </div>


                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6 border-t pt-6">

                  <div>

                    <p className="text-sm text-gray-500">
                      Booking ID
                    </p>

                    <p className="font-semibold">
                      {booking.bookingId}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Seats
                    </p>

                    <p className="font-semibold">
                      {booking.selectedSeats?.join(", ")}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Amount
                    </p>

                    <p className="font-semibold text-green-600">
                      ₹{booking.totalPrice}
                    </p>

                  </div>


                  <div>

                    <p className="text-sm text-gray-500">
                      Payment
                    </p>

                    <p className="font-semibold capitalize">
                      {booking.paymentMethod}
                    </p>

                  </div>

                </div>


                <div className="flex flex-col md:flex-row gap-3 mt-6">

                  <button
                    onClick={() =>
                      navigate("/booking-details", {
                        state: {
                          booking,
                        },
                      })
                    }
                    className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    View Details
                  </button>


                  {booking.status !== "Cancelled" && (

                    <button
                      onClick={() =>
                        cancelBooking(
                          booking.bookingId
                        )
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg font-semibold"
                    >
                      Cancel Booking
                    </button>

                  )}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>


      <Footer />

    </div>
  );
};

export default MyBookings;