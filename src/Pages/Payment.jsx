import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PaymentMethod from "../Components/PaymentMethod";
import PaymentSummary from "../Components/PaymentSummary";

const Payment = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    bus,
    selectedSeats = [],
    passengers = [],
    totalPrice = 0,
  } = location.state || {};


  const handlePayment = (paymentMethod) => {

    if (!bus || selectedSeats.length === 0) {

      alert("No booking information found!");

      navigate("/");
      return;
    }


    navigate("/booking-confirmation", {

      state: {
        bus,
        selectedSeats,
        passengers,
        totalPrice,
        paymentMethod,
      },

    });

  };


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      {/* HEADER */}
      <section className="bg-green-700 text-white py-8">

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <p className="text-green-100 text-sm">
            Complete your booking securely
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Payment
          </h1>

          <p className="mt-2 text-green-100">
            Choose your preferred payment method
          </p>

        </div>

      </section>


      {/* MAIN */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">

          {/* PAYMENT */}
          <PaymentMethod
            totalPrice={totalPrice}
            onPayment={handlePayment}
          />


          {/* SUMMARY */}
          <PaymentSummary
            bus={bus}
            selectedSeats={selectedSeats}
            passengers={passengers}
            totalPrice={totalPrice}
          />

        </div>

      </main>


      <Footer />

    </div>
  );
};

export default Payment;