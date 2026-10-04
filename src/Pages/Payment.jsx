import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

import PaymentMethod from "../Components/PaymentMethod";
import PaymentSummary from "../Components/PaymentSummary";

import API from "../api/api";
import { useAuth } from "../context/AuthContext";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    bus,
    selectedSeats = [],
    passengers = [],
    totalPrice = 0,
    searchData,
  } = location.state || {};

  const [processing, setProcessing] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  const handlePayment = async (paymentMethod) => {
    if (!user) {
      alert("Please login before booking.");

      navigate("/login", {
        state: {
          from: "/payment",
          bus,
          selectedSeats,
          passengers,
          totalPrice,
          searchData,
        },
      });

      return;
    }

    setSelectedPaymentMethod(paymentMethod);
    setProcessing(true);

    try {
      // Small delay so the "Processing Payment..." screen is visible
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const response = await API.post("/bookings", {
        bus,
        selectedSeats: selectedSeats.map(String),
        passengers,
        totalPrice,
        paymentMethod,
        searchData,
      });

      navigate("/booking-confirmation", {
        state: response.data.booking,
      });
    } catch (error) {
      const message =
        error.response?.data?.message || "Booking failed. Please try again.";

      alert(message);
      setProcessing(false);

      // Seat already taken -> go back and pick again
      if (error.response?.status === 409) {
        navigate("/seat-selection", {
          state: { bus, searchData },
        });
      }
    }
  };

  if (!bus || selectedSeats.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold">Booking information not found</h2>

          <p className="text-gray-500 mt-2">
            Please select a bus and seat first.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    navigate("/login", {
      replace: true,
      state: {
        from: "/payment",
        bus,
        selectedSeats,
        passengers,
        totalPrice,
        searchData,
      },
    });

    return null;
  }

  if (processing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            {selectedPaymentMethod === "cash"
              ? "Confirming Booking..."
              : "Processing Payment..."}
          </h2>

          <p className="text-gray-500 mt-2">Please wait.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1e2a40] mb-8">
          Complete Payment
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <PaymentMethod totalPrice={totalPrice} onPayment={handlePayment} />

          <PaymentSummary
            bus={bus}
            selectedSeats={selectedSeats}
            passengers={passengers}
            totalPrice={totalPrice}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Payment;
