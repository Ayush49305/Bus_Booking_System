import React, { useState } from "react";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const PassengerDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { user } = useAuth();

  const {
    bus,
    selectedSeats = [],
    totalPrice = 0,
    searchData,
  } = location.state || {};

  const [
    passengers,
    setPassengers,
  ] = useState(
    selectedSeats.map((seat) => ({
      seat,
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
    }))
  );

  const handleChange = (
    index,
    field,
    value
  ) => {
    const updated = [
      ...passengers,
    ];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setPassengers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login", {
        state: {
          from: "/passenger-details",
          bus,
          selectedSeats,
          totalPrice,
          searchData,
        },
      });

      return;
    }

    for (const passenger of passengers) {
      if (
        !passenger.name.trim() ||
        !passenger.age ||
        !passenger.gender ||
        !passenger.phone.trim() ||
        !passenger.email.trim()
      ) {
        alert(
          `Please fill all details for Seat ${passenger.seat}`
        );

        return;
      }

      if (
        passenger.phone.length !== 10
      ) {
        alert(
          `Please enter a valid 10-digit phone number for Seat ${passenger.seat}`
        );

        return;
      }

      if (
        !/^\S+@\S+\.\S+$/.test(
          passenger.email
        )
      ) {
        alert(
          `Please enter a valid email for Seat ${passenger.seat}`
        );

        return;
      }

      if (
        Number(passenger.age) < 1 ||
        Number(passenger.age) > 120
      ) {
        alert(
          `Please enter a valid age for Seat ${passenger.seat}`
        );

        return;
      }
    }

    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
        passengers,
        totalPrice,
        searchData,
      },
    });
  };

  if (
    !bus ||
    selectedSeats.length === 0
  ) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-center bg-white p-8 rounded-xl shadow-md">

          <h2 className="text-2xl font-bold">
            Booking information not found
          </h2>

          <button
            onClick={() =>
              navigate(
                "/search-results"
              )
            }
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Search
          </button>

        </div>

      </div>
    );
  }

  if (!user) {
    navigate("/login", {
      replace: true,
      state: {
        from: "/passenger-details",
        bus,
        selectedSeats,
        totalPrice,
        searchData,
      },
    });

    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-green-700 text-white">

        <div className="max-w-7xl mx-auto px-6 py-7">

          <p className="text-sm">
            Passenger Details
          </p>

          <h1 className="text-3xl font-bold">
            Enter Passenger Information
          </h1>

        </div>

      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">

        <form onSubmit={handleSubmit}>

          <div className="space-y-8">

            {passengers.map(
              (passenger, index) => (

                <div
                  key={passenger.seat}
                  className="bg-white rounded-xl shadow-md p-8"
                >

                  <div className="flex justify-between items-center mb-6">

                    <h2 className="text-xl font-bold text-[#1e2a40]">
                      Passenger{" "}
                      {index + 1}
                    </h2>

                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                      Seat{" "}
                      {passenger.seat}
                    </span>

                  </div>

                  <div className="mb-5">

                    <label className="block text-gray-700 mb-2">
                      Full Name
                    </label>

                    <input
                      type="text"
                      required
                      value={
                        passenger.name
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "name",
                          e.target.value
                        )
                      }
                      placeholder="Enter full name"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                    />

                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    <div>

                      <label className="block text-gray-700 mb-2">
                        Age
                      </label>

                      <input
                        type="number"
                        min="1"
                        max="120"
                        required
                        value={
                          passenger.age
                        }
                        onChange={(e) =>
                          handleChange(
                            index,
                            "age",
                            e.target.value
                          )
                        }
                        placeholder="Enter age"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                      />

                    </div>

                    <div>

                      <label className="block text-gray-700 mb-2">
                        Gender
                      </label>

                      <select
                        required
                        value={
                          passenger.gender
                        }
                        onChange={(e) =>
                          handleChange(
                            index,
                            "gender",
                            e.target.value
                          )
                        }
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                      >

                        <option value="">
                          Select Gender
                        </option>

                        <option value="Male">
                          Male
                        </option>

                        <option value="Female">
                          Female
                        </option>

                        <option value="Other">
                          Other
                        </option>

                      </select>

                    </div>

                  </div>

                  <div className="mt-5">

                    <label className="block text-gray-700 mb-2">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      required
                      maxLength="10"
                      value={
                        passenger.phone
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "phone",
                          e.target.value.replace(
                            /\D/g,
                            ""
                          )
                        )
                      }
                      placeholder="10-digit phone number"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                    />

                  </div>

                  <div className="mt-5">

                    <label className="block text-gray-700 mb-2">
                      Email Address
                    </label>

                    <input
                      type="email"
                      required
                      value={
                        passenger.email
                      }
                      onChange={(e) =>
                        handleChange(
                          index,
                          "email",
                          e.target.value
                        )
                      }
                      placeholder="Enter email address"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                    />

                  </div>

                </div>
              )
            )}

          </div>

          <div className="bg-white rounded-xl shadow-md p-6 mt-8">

            <h2 className="text-xl font-bold text-[#1e2a40]">
              Booking Summary
            </h2>

            <div className="border-b my-5"></div>

            <p className="text-gray-500 text-sm">
              Bus
            </p>

            <p className="font-semibold mb-4">
              {bus.name}
            </p>

            <p className="text-gray-500 text-sm">
              Selected Seats
            </p>

            <p className="font-semibold mb-4">
              {selectedSeats.join(
                ", "
              )}
            </p>

            <p className="text-gray-500 text-sm">
              Total Amount
            </p>

            <p className="text-2xl font-bold text-green-600">
              ₹{totalPrice}
            </p>

          </div>

          <div className="flex gap-4 mt-8">

            <button
              type="button"
              onClick={() =>
                navigate(-1)
              }
              className="flex-1 border bg-white py-3 rounded-lg font-semibold"
            >
              Back
            </button>

            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold"
            >
              Continue to Payment
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PassengerDetails;