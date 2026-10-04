import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";

// "14:30" -> "02:30 PM"  (same format as the existing buses)
const to12h = (time) => {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${String(hour12).padStart(2, "0")}:${String(m).padStart(2, "0")} ${suffix}`;
};

const emptyForm = {
  name: "",
  type: "AC Seater",
  from: "",
  to: "",
  departure: "",
  arrival: "",
  price: "",
};

const AdminBuses = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [form, setForm] = useState(emptyForm);
  const [buses, setBuses] = useState([]);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  const loadBuses = async () => {
    try {
      const response = await API.get("/buses");
      setBuses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAdmin) loadBuses();
  }, [isAdmin]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      const response = await API.post("/buses", {
        ...form,
        departure: to12h(form.departure),
        arrival: to12h(form.arrival),
        price: Number(form.price),
      });

      setMessage({ type: "success", text: response.data.message });
      setForm(emptyForm);
      loadBuses();
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Could not add bus",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this bus?")) return;

    try {
      await API.delete(`/buses/${id}`);
      loadBuses();
    } catch (error) {
      alert(error.response?.data?.message || "Could not delete bus");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />

        <div className="max-w-xl mx-auto px-6 py-20">
          <div className="bg-white rounded-xl shadow-md p-10 text-center">
            <div className="text-5xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold">Admin access only</h2>
            <p className="text-gray-500 mt-2">
              Please log in with an admin account.
            </p>
            <Link
              to="/login"
              className="inline-block mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Go to Login
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  const inputClass =
    "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-green-600";

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-[#1e2a40]">Admin Panel</h1>
        <p className="text-gray-500 mt-2 mb-8">
          Add new buses and routes. They appear in search immediately.
        </p>

        {/* ADD BUS FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-6 mb-10"
        >
          <h2 className="text-xl font-bold mb-5">Add Bus / Route</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Bus name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Green Express"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">Bus type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className={inputClass}
              >
                <option>AC Seater</option>
                <option>AC Sleeper</option>
                <option>Non-AC Seater</option>
                <option>Non-AC Sleeper</option>
                <option>Volvo AC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">From city</label>
              <input
                name="from"
                value={form.from}
                onChange={handleChange}
                placeholder="e.g. Kolkata"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">To city</label>
              <input
                name="to"
                value={form.to}
                onChange={handleChange}
                placeholder="e.g. Durgapur"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Departure time
              </label>
              <input
                type="time"
                name="departure"
                value={form.departure}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Arrival time
              </label>
              <input
                type="time"
                name="arrival"
                value={form.arrival}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-2">
                Price per seat (₹)
              </label>
              <input
                type="number"
                min="1"
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g. 500"
                required
                className={inputClass}
              />
            </div>
          </div>

          {message.text && (
            <p
              className={`mt-5 font-medium ${
                message.type === "success" ? "text-green-600" : "text-red-600"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold disabled:opacity-60"
          >
            {saving ? "Adding..." : "Add Bus"}
          </button>
        </form>

        {/* EXISTING BUSES */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold mb-5">
            All Buses ({buses.length})
          </h2>

          {buses.length === 0 ? (
            <p className="text-gray-500">No buses yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b text-gray-500 text-sm">
                    <th className="py-3 pr-4">Route</th>
                    <th className="py-3 pr-4">Bus</th>
                    <th className="py-3 pr-4">Type</th>
                    <th className="py-3 pr-4">Departure</th>
                    <th className="py-3 pr-4">Arrival</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3"></th>
                  </tr>
                </thead>

                <tbody>
                  {buses.map((bus) => (
                    <tr key={bus._id} className="border-b last:border-0">
                      <td className="py-3 pr-4 font-semibold">
                        {bus.from} → {bus.to}
                      </td>
                      <td className="py-3 pr-4">{bus.name}</td>
                      <td className="py-3 pr-4">{bus.type}</td>
                      <td className="py-3 pr-4">{bus.departure}</td>
                      <td className="py-3 pr-4">{bus.arrival}</td>
                      <td className="py-3 pr-4 text-green-600 font-semibold">
                        ₹{bus.price}
                      </td>
                      <td className="py-3">
                        <button
                          onClick={() => handleDelete(bus._id)}
                          className="text-red-600 hover:text-red-700 font-medium"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminBuses;
