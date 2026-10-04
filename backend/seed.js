import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Bus from "./models/Bus.js";

dotenv.config();

const buses = [
  { name: "Green Express", type: "AC Sleeper", departure: "06:30 AM", arrival: "02:30 PM", price: 850, from: "Delhi", to: "Jaipur", totalSeats: 40 },
  { name: "Green Travels", type: "AC Seater", departure: "09:00 AM", arrival: "05:00 PM", price: 700, from: "Delhi", to: "Jaipur", totalSeats: 40 },
  { name: "Green Roadways", type: "Non-AC Sleeper", departure: "10:30 PM", arrival: "06:30 AM", price: 600, from: "Delhi", to: "Jaipur", totalSeats: 40 },
  { name: "Green Premium", type: "Volvo AC", departure: "11:30 PM", arrival: "07:00 AM", price: 1200, from: "Delhi", to: "Jaipur", totalSeats: 40 }
];

try {
  await connectDB();
  await Bus.deleteMany({});
  await Bus.insertMany(buses);
  console.log("Bus data inserted successfully.");
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
