import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import busRoutes from "./routes/busRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();

// =========================
// MIDDLEWARE
// =========================
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// =========================
// TEST ROUTE
// =========================
app.get("/", (req, res) => {
  res.json({ message: "Green Bus Backend is running" });
});

// =========================
// API ROUTES
// =========================
app.use("/api/auth", authRoutes);
app.use("/api/buses", busRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/contact", contactRoutes);

// =========================
// SERVER
// =========================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
