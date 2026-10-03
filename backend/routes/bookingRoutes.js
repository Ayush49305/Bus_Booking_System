import express from "express";
import Booking from "../models/Booking.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// =========================
// CREATE BOOKING
// =========================

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      bus,
      selectedSeats,
      passengers,
      totalPrice,
      paymentMethod,
      searchData,
    } = req.body;

    if (
      !bus ||
      !selectedSeats ||
      !passengers ||
      totalPrice === undefined ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Missing booking information",
      });
    }

    const bookingId =
      "RB" +
      Date.now().toString().slice(-8);


    const booking = await Booking.create({
      user: req.user.id,

      bookingId,

      bus: {
        name: bus.name,
        type: bus.type,
        departure: bus.departure,
        arrival: bus.arrival,
        price: bus.price,
      },

      searchData,

      selectedSeats,

      passengers,

      totalPrice,

      paymentMethod,

      status: "Confirmed",
    });


    res.status(201).json({
      message: "Booking created successfully",
      booking,
    });

  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      message: "Failed to create booking",
    });
  }
});


// =========================
// GET MY BOOKINGS
// =========================

router.get("/my-bookings", authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      bookings,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch bookings",
    });
  }
});


// =========================
// GET SINGLE BOOKING
// =========================

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    res.json({
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to fetch booking",
    });
  }
});


// =========================
// CANCEL BOOKING
// =========================

router.put("/:id/cancel", authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        message: "Booking already cancelled",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.json({
      message: "Booking cancelled successfully",
      booking,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Failed to cancel booking",
    });
  }
});


export default router;