import mongoose from "mongoose";

const busSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    departure: { type: String, required: true },
    arrival: { type: String, required: true },
    price: { type: Number, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    totalSeats: { type: Number, default: 40 }
  },
  { timestamps: true }
);

export default mongoose.model("Bus", busSchema);
