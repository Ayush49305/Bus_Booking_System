import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PaymentMethod from "../Components/PaymentMethod";
import PaymentSummary from "../components/PaymentSummary";

const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();


  const {
    bus,
    selectedSeats = [],
    passengers = [],
    totalPrice = 0,
    searchData,
  } = location.state || {};


  const [processing, setProcessing] =
    useState(false);


  const handlePayment = (paymentMethod) => {

    setProcessing(true);


    setTimeout(() => {

      const bookingId =
        "GB" +
        Date.now().toString().slice(-8);


      const booking = {

        bookingId,

        bus,

        selectedSeats,

        passengers,

        totalPrice,

        paymentMethod,

        searchData,

        status: "Confirmed",

        bookingDate:
          new Date().toLocaleDateString("en-IN"),

        bookingTime:
          new Date().toLocaleTimeString("en-IN"),

      };


      const existingBookings =
        JSON.parse(
          localStorage.getItem("greenBusBookings")
        ) || [];


      localStorage.setItem(
        "greenBusBookings",
        JSON.stringify([
          booking,
          ...existingBookings,
        ])
      );


      navigate("/booking-confirmation", {
        state: booking,
      });

    }, 1500);

  };


  if (!bus || selectedSeats.length === 0) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Booking information not found
          </h2>

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


  if (processing) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-center">

          <div className="w-14 h-14 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            Processing Payment...
          </h2>

          <p className="text-gray-500 mt-2">
            Please wait.
          </p>

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

          <PaymentMethod
            totalPrice={totalPrice}
            onPayment={handlePayment}
          />


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