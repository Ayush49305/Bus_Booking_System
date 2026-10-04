import express from "express";
import Bus from "../models/Bus.js";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// =========================
// GET /api/buses?from=Delhi&to=Jaipur   (public)
// =========================
router.get("/", async (req, res) => {
  try {
    const { from, to } = req.query;
    const filter = {};

    if (from) filter.from = { $regex: `^${escapeRegex(from.trim())}$`, $options: "i" };
    if (to) filter.to = { $regex: `^${escapeRegex(to.trim())}$`, $options: "i" };

    const buses = await Bus.find(filter).sort({ from: 1, to: 1, price: 1 });
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch buses.", error: error.message });
  }
});

// =========================
// ADMIN: ADD A BUS / ROUTE
// POST /api/buses
// =========================
router.post("/", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { name, type, from, to, departure, arrival, price } = req.body;

    if (!name || !type || !from || !to || !departure || !arrival || !price) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      return res
        .status(400)
        .json({ message: "From and To cities cannot be the same" });
    }

    if (Number(price) <= 0) {
      return res.status(400).json({ message: "Price must be greater than 0" });
    }

    const duplicate = await Bus.findOne({
      name: { $regex: `^${escapeRegex(name.trim())}$`, $options: "i" },
      from: { $regex: `^${escapeRegex(from.trim())}$`, $options: "i" },
      to: { $regex: `^${escapeRegex(to.trim())}$`, $options: "i" },
      departure,
    });

    if (duplicate) {
      return res
        .status(409)
        .json({ message: "This bus already exists on this route and time" });
    }

    const bus = await Bus.create({
      name: name.trim(),
      type,
      from: from.trim(),
      to: to.trim(),
      departure,
      arrival,
      price: Number(price),
      totalSeats: 40,
    });

    res.status(201).json({ message: "Bus added successfully", bus });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not add bus" });
  }
});

// =========================
// ADMIN: DELETE A BUS
// DELETE /api/buses/:id
// =========================
router.delete("/:id", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const bus = await Bus.findByIdAndDelete(req.params.id);

    if (!bus) return res.status(404).json({ message: "Bus not found" });

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not delete bus" });
  }
});

// =========================
// GET /api/buses/:id/seats?date=YYYY-MM-DD   (public)
// =========================
router.get("/:id/seats", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: "Journey date is required." });

    const bookings = await Booking.find({
      "bus.busId": req.params.id,
      "searchData.date": date,
      status: "Confirmed",
    }).select("selectedSeats");

    const bookedSeats = [
      ...new Set(bookings.flatMap((b) => b.selectedSeats.map(Number))),
    ].sort((a, b) => a - b);

    res.json({ totalSeats: 40, bookedSeats });
  } catch (error) {
    res.status(500).json({ message: "Could not fetch seat availability.", error: error.message });
  }
});

// =========================
// GET /api/buses/:id   (public)
// =========================
router.get("/:id", async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) return res.status(404).json({ message: "Bus not found." });
    res.json(bus);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch bus.", error: error.message });
  }
});

export default router;
