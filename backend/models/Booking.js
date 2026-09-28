import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    seat: Number,
    name: String,
    age: Number,
    gender: String,
    phone: String,
    email: String
  },
  { _id: false }
);

const bookingSchema = new mongoose.Schema(
  {
    bookingId: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bus: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
    selectedSeats: { type: [Number], required: true },
    passengers: { type: [passengerSchema], default: [] },
    searchData: {
      from: String,
      to: String,
      date: String
    },
    totalPrice: { type: Number, required: true },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "cash"],
      required: true
    },
    status: {
      type: String,
      enum: ["Confirmed", "Cancelled"],
      default: "Confirmed"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
