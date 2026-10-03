import mongoose from "mongoose";

const passengerSchema = new mongoose.Schema(
  {
    seat: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    gender: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
);

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingId: {
      type: String,
      required: true,
      unique: true,
    },

    bus: {
      name: String,
      type: String,
      departure: String,
      arrival: String,
      price: Number,
    },

    searchData: {
      from: String,
      to: String,
      date: String,
    },

    selectedSeats: {
      type: [String],
      required: true,
    },

    passengers: {
      type: [passengerSchema],
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Confirmed",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;