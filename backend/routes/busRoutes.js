import express from "express";
import Bus from "../models/Bus.js";
import Booking from "../models/Booking.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {};
    if (from) filter.from = { $regex: `^${escapeRegex(from)}$`, $options: "i" };
    if (to) filter.to = { $regex: `^${escapeRegex(to)}$`, $options: "i" };
    const buses = await Bus.find(filter).sort({ price: 1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch buses.", error: error.message });
  }
});

router.get("/:id/seats", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Journey date is required." });

    const bookings = await Booking.find({
      bus: req.params.id,
      "searchData.date": date,
      status: "Confirmed"
    }).select("selectedSeats");

    const bookedSeats = [...new Set(bookings.flatMap((b) => b.selectedSeats.map(Number)))].sort((a, b) => a - b);
    res.json({ totalSeats: 40, bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch seat availability.", error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found." });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch bus.", error: error.message });
  }
});

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
}

export default router;
