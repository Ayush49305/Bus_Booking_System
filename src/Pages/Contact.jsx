import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API from "../api/api";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await API.post("/contact", form);
      setStatus({ type: "success", text: response.data.message });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus({
        type: "error",
        text: error.response?.data?.message || "Could not send message.",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[70vh] px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-semibold mb-6">Contact Us</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Customer Support</h2>

              <p className="text-gray-600 mb-2">Email: support@greenbus.com</p>

              <p className="text-gray-600">Phone: +91 98765 43210</p>
            </div>

            <div className="border rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-3">Office</h2>

              <p className="text-gray-600">Green Bus Online Ticket Booking</p>

              <p className="text-gray-600">India</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border rounded-lg p-6 mt-6 space-y-4"
          >
            <h2 className="text-xl font-semibold">Send us a message</h2>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Your message"
              rows="4"
              required
              className="w-full border rounded-lg px-4 py-3"
            />

            {status.text && (
              <p
                className={
                  status.type === "success" ? "text-green-600" : "text-red-600"
                }
              >
                {status.text}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-60"
            >
              {sending ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Contact;
