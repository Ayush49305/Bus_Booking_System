import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import API from "../api/api";
import { useAuth } from "../context/AuthContext";

// Adds the fields the details page expects (date, time, route)
const normalize = (booking) => {
  const created = new Date(booking.createdAt);

  return {
    ...booking,
    bookingDate: created.toLocaleDateString("en-IN"),
    bookingTime: created.toLocaleTimeString("en-IN"),
    bus: {
      ...booking.bus,
      from: booking.searchData?.from,
      to: booking.searchData?.to,
    },
  };
};

const MyBookings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    if (!user) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await API.get("/bookings/my-bookings");
      setBookings(response.data.bookings.map(normalize));
    } catch (err) {
      console.error(err);
      setError("Unable to load your bookings.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this booking?"
    );

    if (!confirmCancel) return;

    try {
      await API.put(`/bookings/${id}/cancel`);
      await loadBookings();
    } catch (err) {
      alert(err.response?.data?.message || "Could not cancel booking.");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-5">🔐</div>

            <h2 className="text-2xl font-bold">Please Sign In</h2>

            <p className="text-gray-500 mt-2">
              Please sign in to view your bookings.
            </p>

            <Link
              to="/login"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Sign In
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1e2a40]">My Bookings</h1>

        <p className="text-gray-500 mt-2 mb-8">
          View and manage your bus bookings.
        </p>

        {loading ? (
          <p className="text-gray-500">Loading your bookings...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : bookings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <div className="text-5xl mb-5">🚌</div>

            <h2 className="text-2xl font-bold">No bookings yet</h2>

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
                key={booking._id}
                className="bg-white rounded-xl shadow-md p-6"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div>
                    <h2 className="text-xl font-bold text-[#1e2a40]">
                      {booking.bus?.name}
                    </h2>

                    <p className="text-gray-500 mt-1">
                      {booking.searchData?.from || "Delhi"}
                      {" → "}
                      {booking.searchData?.to || "Jaipur"}
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
                    <p className="text-sm text-gray-500">Booking ID</p>
                    <p className="font-semibold">{booking.bookingId}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Seats</p>
                    <p className="font-semibold">
                      {booking.selectedSeats?.join(", ")}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Amount</p>
                    <p className="font-semibold text-green-600">
                      ₹{booking.totalPrice}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Payment</p>
                    <p className="font-semibold capitalize">
                      {booking.paymentMethod}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                  <div>
                    <p className="text-sm text-gray-500">Booking Date</p>
                    <p className="font-semibold">{booking.bookingDate}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Booking Time</p>
                    <p className="font-semibold">{booking.bookingTime}</p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-3 mt-6">
                  <button
                    onClick={() =>
                      navigate("/booking-details", { state: { booking } })
                    }
                    className="flex-1 border border-gray-300 py-3 rounded-lg font-semibold hover:bg-gray-50"
                  >
                    View Details
                  </button>

                  {booking.status !== "Cancelled" && (
                    <button
                      onClick={() => cancelBooking(booking._id)}
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
