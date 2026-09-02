import React from "react";

const FilterSidebar = ({
  filters,
  setFilters,
}) => {
  const handleBusType = (type) => {
    setFilters((prev) => ({
      ...prev,
      busType: prev.busType === type ? "" : type,
    }));
  };

  const handleDepartureTime = (time) => {
    setFilters((prev) => ({
      ...prev,
      departureTime: prev.departureTime === time ? "" : time,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full">
      
      <h2 className="text-xl font-semibold text-[#1e2a40]">
        Filters
      </h2>

      <div className="border-b border-gray-400 mt-4 mb-6"></div>

      {/* BUS TYPE */}
      <div>
        <h3 className="font-medium text-[#1e2a40] mb-4">
          Bus Type
        </h3>

        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.busType === "AC"}
            onChange={() => handleBusType("AC")}
            className="w-4 h-4 accent-green-600"
          />

          <span className="text-gray-600">
            AC
          </span>
        </label>

        <label className="flex items-center gap-3 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.busType === "Non-AC"}
            onChange={() => handleBusType("Non-AC")}
            className="w-4 h-4 accent-green-600"
          />

          <span className="text-gray-600">
            Non-AC
          </span>
        </label>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.busType === "Sleeper"}
            onChange={() => handleBusType("Sleeper")}
            className="w-4 h-4 accent-green-600"
          />

          <span className="text-gray-600">
            Sleeper
          </span>
        </label>
      </div>

      <div className="border-b border-gray-400 mt-6 mb-6"></div>

      {/* DEPARTURE TIME */}
      <div>
        <h3 className="font-medium text-[#1e2a40] mb-4">
          Departure Time
        </h3>

        {["Morning", "Afternoon", "Evening", "Night"].map((time) => (
          <label
            key={time}
            className="flex items-center gap-3 mb-4 cursor-pointer"
          >
            <input
              type="radio"
              name="departureTime"
              checked={filters.departureTime === time}
              onChange={() => handleDepartureTime(time)}
              className="w-4 h-4 accent-green-600"
            />

            <span className="text-gray-600">
              {time}
            </span>
          </label>
        ))}
      </div>

      <div className="border-b border-gray-400 mt-6 mb-6"></div>

      {/* PRICE */}
      <div>
        <h3 className="font-medium text-[#1e2a40] mb-4">
          Price Range
        </h3>

        <input
          type="range"
          min="400"
          max="1200"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              maxPrice: Number(e.target.value),
            }))
          }
          className="w-full accent-green-600"
        />

        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>₹400</span>
          <span>₹{filters.maxPrice}</span>
        </div>
      </div>

      {/* CLEAR FILTERS */}
      <button
        onClick={() =>
          setFilters({
            busType: "",
            departureTime: "",
            maxPrice: 1200,
          })
        }
        className="mt-6 w-full border border-green-600 text-green-600 py-2 rounded-lg hover:bg-green-600 hover:text-white transition"
      >
        Clear Filters
      </button>

    </div>
  );
};

export default FilterSidebar;