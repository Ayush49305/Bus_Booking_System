import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const SearchBox = () => {
  const navigate = useNavigate();

  const { t } = useLanguage();

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();

    if (!from || !to || !date) {
      alert("Please fill all the fields");
      return;
    }

    if (from.toLowerCase() === to.toLowerCase()) {
      alert("From and To cities cannot be the same");
      return;
    }

    navigate("/search-results", {
      state: {
        from,
        to,
        date,
      },
    });
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm border border-gray-300 rounded-xl p-6 shadow-lg w-full max-w-xl">
      
      <form onSubmit={handleSearch}>
        
        {/* From and To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div>
            <label className="block text-gray-600 text-sm mb-2">
              {t.from}
            </label>

            <input
              type="text"
              placeholder={t.departureCity}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">
              {t.to}
            </label>

            <input
              type="text"
              placeholder={t.destinationCity}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
            />
          </div>

        </div>

        {/* Date */}
        <div className="mt-5">
          <label className="block text-gray-600 text-sm mb-2">
            {t.journeyDate}
          </label>

          <input
            type="date"
            value={date}
            min={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600"
          />
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 rounded-lg transition"
        >
          {t.searchBuses}
        </button>

      </form>
    </div>
  );
};

export default SearchBox;