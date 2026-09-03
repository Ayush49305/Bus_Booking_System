import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PassengerDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const {
    bus,
    selectedSeats = [],
    totalPrice = 0,
  } = location.state || {};

  const [passengers, setPassengers] = useState(
    selectedSeats.map((seat) => ({
      seat,
      name: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
    }))
  );

  const handleChange = (index, field, value) => {

    const updatedPassengers = [...passengers];

    updatedPassengers[index] = {
      ...updatedPassengers[index],
      [field]: value,
    };

    setPassengers(updatedPassengers);
  };

  const handleSubmit = (e) => {

    e.preventDefault();

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
    }

    navigate("/payment", {
      state: {
        bus,
        selectedSeats,
        passengers,
        totalPrice,
      },
    });
  };


  if (!bus || selectedSeats.length === 0) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-center">

          <h2 className="text-2xl font-bold">
            Booking information not found
          </h2>

          <button
            onClick={() => navigate("/search-results")}
            className="mt-5 bg-green-600 text-white px-6 py-3 rounded-lg"
          >
            Back to Search
          </button>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
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

            {passengers.map((passenger, index) => (

              <div
                key={passenger.seat}
                className="bg-white rounded-xl shadow-md p-8"
              >

                <div className="flex justify-between items-center mb-6">

                  <h2 className="text-xl font-bold text-[#1e2a40]">
                    Passenger {index + 1}
                  </h2>

                  <span className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                    Seat {passenger.seat}
                  </span>

                </div>


                {/* NAME */}
                <div className="mb-5">

                  <label className="block text-gray-700 mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={passenger.name}
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


                {/* AGE + GENDER */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  <div>

                    <label className="block text-gray-700 mb-2">
                      Age
                    </label>

                    <input
                      type="number"
                      value={passenger.age}
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
                      value={passenger.gender}
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


                {/* PHONE */}
                <div className="mt-5">

                  <label className="block text-gray-700 mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={passenger.phone}
                    onChange={(e) =>
                      handleChange(
                        index,
                        "phone",
                        e.target.value
                      )
                    }
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
                  />

                </div>


                {/* EMAIL */}
                <div className="mt-5">

                  <label className="block text-gray-700 mb-2">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={passenger.email}
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

            ))}

          </div>


          {/* SUMMARY */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">

            <h2 className="text-xl font-bold text-[#1e2a40]">
              Booking Summary
            </h2>

            <div className="border-b border-gray-300 my-5"></div>

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
              {selectedSeats.join(", ")}
            </p>

            <p className="text-gray-500 text-sm">
              Total Amount
            </p>

            <p className="text-2xl font-bold text-green-600">
              ₹{totalPrice}
            </p>

          </div>


          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 border border-gray-300 bg-white py-3 rounded-lg font-semibold"
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