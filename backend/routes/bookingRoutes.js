import express from "express";
import Booking from "../models/Booking.js";
import Bus from "../models/Bus.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();
const busFields = "name type departure arrival price from to totalSeats";

router.post("/", protect, async (req, res) => {
  try {
    const { busId, selectedSeats, passengers = [], totalPrice, paymentMethod, searchData = {} } = req.body;

    if (!busId || !Array.isArray(selectedSeats) || selectedSeats.length === 0 || !paymentMethod) {
      return res.status(400).json({ message: "Bus, seats and payment method are required." });
    }

    const bus = await Bus.findById(busId);
    if (!bus) return res.status(404).json({ message: "Bus not found." });

    const seats = [...new Set(selectedSeats.map(Number))];
    if (seats.some((seat) => seat < 1 || seat > bus.totalSeats)) {
      return res.status(400).json({ message: "Invalid seat number." });
    }

    const existing = await Booking.find({ bus: busId, "searchData.date": searchData.date, status: "Confirmed" }).select("selectedSeats");
    const bookedSeats = existing.flatMap((booking) => booking.selectedSeats.map(Number));
    const conflict = seats.filter((seat) => bookedSeats.includes(seat));

    if (conflict.length) {
      return res.status(409).json({ message: "One or more selected seats are already booked.", bookedSeats: conflict });
    }

    const booking = await Booking.create({
      bookingId: `RB${Date.now().toString().slice(-8)}`,
      user: req.user._id,
      bus: busId,
      selectedSeats: seats,
      passengers,
      totalPrice: Number(totalPrice),
      paymentMethod,
      searchData,
      status: "Confirmed"
    });

    const result = await Booking.findById(booking._id).populate("bus", busFields);
    res.status(201).json({ message: "Booking confirmed.", booking: result });
  } catch (error) {
    res.status(500).json({ message: "Booking failed.", error: error.message });
  }
});

router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate("bus", busFields).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch bookings.", error: error.message });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id, user: req.user._id }).populate("bus", busFields);
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch booking.", error: error.message });
  }
});

router.patch("/:id/cancel", protect, async (req, res) => {
  try {
    const booking = await Booking.findOne({ bookingId: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ message: "Booking not found." });
    if (booking.status === "Cancelled") return res.status(400).json({ message: "Booking is already cancelled." });

    booking.status = "Cancelled";
    await booking.save();
    const result = await Booking.findById(booking._id).populate("bus", busFields);
    res.json({ message: "Booking cancelled successfully.", booking: result });
  } catch (error) {
    res.status(500).json({ message: "Could not cancel booking.", error: error.message });
  }
});

export default router;
