import React from "react";

const FilterSidebar = () => {
  return (
    <aside className="bg-white rounded-lg shadow-md p-6 h-fit">

      <h2 className="text-xl font-bold text-gray-800 pb-4 border-b">
        Filters
      </h2>

      {/* Bus Type */}
      <div className="py-5 border-b">
        <h3 className="font-semibold text-gray-700 mb-4">
          Bus Type
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-green-600" />
            AC
          </label>

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-green-600" />
            Non-AC
          </label>

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="checkbox" className="accent-green-600" />
            Sleeper
          </label>

        </div>
      </div>


      {/* Departure Time */}
      <div className="py-5 border-b">

        <h3 className="font-semibold text-gray-700 mb-4">
          Departure Time
        </h3>

        <div className="space-y-3">

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="radio" name="time" className="accent-green-600" />
            Morning
          </label>

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="radio" name="time" className="accent-green-600" />
            Afternoon
          </label>

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="radio" name="time" className="accent-green-600" />
            Evening
          </label>

          <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
            <input type="radio" name="time" className="accent-green-600" />
            Night
          </label>

        </div>
      </div>


      {/* Price */}
      <div className="pt-5">

        <h3 className="font-semibold text-gray-700 mb-4">
          Price Range
        </h3>

        <input
          type="range"
          min="300"
          max="2000"
          className="w-full accent-green-600"
        />

        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹300</span>
          <span>₹2000</span>
        </div>

      </div>

    </aside>
  );
};

export default FilterSidebar;