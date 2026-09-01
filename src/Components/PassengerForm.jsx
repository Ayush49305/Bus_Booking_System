import React from "react";

const PassengerForm = ({
  seatNumber,
  passenger,
  onChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">

      {/* Header */}
      <div className="flex items-center justify-between mb-5 pb-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">
          Passenger Details
        </h3>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium">
          Seat {seatNumber}
        </span>
      </div>


      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        {/* Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={passenger.name}
            onChange={(e) =>
              onChange(seatNumber, "name", e.target.value)
            }
            placeholder="Enter passenger name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>


        {/* Age */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Age
          </label>

          <input
            type="number"
            name="age"
            value={passenger.age}
            onChange={(e) =>
              onChange(seatNumber, "age", e.target.value)
            }
            placeholder="Age"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>


        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender
          </label>

          <select
            value={passenger.gender}
            onChange={(e) =>
              onChange(seatNumber, "gender", e.target.value)
            }
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600 bg-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

      </div>

    </div>
  );
};

export default PassengerForm;