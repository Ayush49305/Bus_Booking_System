import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PassengerForm from "../Components/PassengerForm";
import BookingSummary from "../Components/BookingSummary";

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get data from Seat Selection page
  const {
    bus,
    selectedSeats = [],
    totalPrice = 0,
    pricePerSeat = 850,
  } = location.state || {};

  // Create passenger data for every selected seat
  const [passengers, setPassengers] = useState(() =>
    selectedSeats.reduce((acc, seat) => {
      acc[seat] = {
        name: "",
        age: "",
        gender: "",
      };
      return acc;
    }, {})
  );


  // Update passenger details
  const handlePassengerChange = (seat, field, value) => {
    setPassengers((prev) => ({
      ...prev,
      [seat]: {
        ...prev[seat],
        [field]: value,
      },
    }));
  };


  // Validate and continue
  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert("No seats selected!");
      navigate("/seat-selection");
      return;
    }

    const allPassengersFilled = selectedSeats.every(
      (seat) =>
        passengers[seat]?.name &&
        passengers[seat]?.age &&
        passengers[seat]?.gender
    );

    if (!allPassengersFilled) {
      alert("Please fill details for all passengers.");
      return;
    }

    // Next page will be payment page
    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
        passengers,
        totalPrice,
        pricePerSeat,
      },
    });
  };


  return (
    <div className="min-h-screen bg-gray-100">

      <Navbar />


      {/* Header */}
      <section className="bg-green-700 text-white py-8">

        <div className="max-w-7xl mx-auto px-4 md:px-8">

          <p className="text-green-100 text-sm">
            Complete your booking
          </p>

          <h1 className="text-3xl md:text-4xl font-bold mt-2">
            Passenger Details
          </h1>

          <p className="mt-2 text-green-100">
            Please enter details for each passenger
          </p>

        </div>

      </section>


      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-10">

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-8">


          {/* Left Side */}
          <div>

            <h2 className="text-xl font-bold text-gray-800 mb-5">
              Passenger Information
            </h2>


            <div className="space-y-5">

              {selectedSeats.length > 0 ? (

                selectedSeats.map((seat) => (
                  <PassengerForm
                    key={seat}
                    seatNumber={seat}
                    passenger={passengers[seat]}
                    onChange={handlePassengerChange}
                  />
                ))

              ) : (

                <div className="bg-white p-6 rounded-xl shadow">
                  <p className="text-gray-500">
                    No seats selected. Please select seats first.
                  </p>

                  <button
                    onClick={() => navigate("/seat-selection")}
                    className="mt-4 bg-green-600 text-white px-5 py-2 rounded-lg"
                  >
                    Go to Seat Selection
                  </button>
                </div>

              )}

            </div>


            {/* Continue Button */}
            {selectedSeats.length > 0 && (
              <button
                onClick={handleContinue}
                className="mt-8 w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-lg font-semibold transition"
              >
                CONTINUE TO PAYMENT
              </button>
            )}

          </div>


          {/* Right Side */}
          <BookingSummary
            bus={bus}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            pricePerSeat={pricePerSeat}
          />

        </div>

      </main>


      <Footer />

    </div>
  );
};

export default PassengerDetails;