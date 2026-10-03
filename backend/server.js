import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";


dotenv.config();


// Connect MongoDB
connectDB();


const app = express();


// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


// =========================
// TEST ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "Red Buds Backend is running",
  });
});


// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);


// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});