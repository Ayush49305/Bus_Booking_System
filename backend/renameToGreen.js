import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Bus from "./models/Bus.js";
import Booking from "./models/Booking.js";

dotenv.config();

const rename = (field) => [
  {
    $set: {
      [field]: {
        $replaceOne: { input: `$${field}`, find: "Red ", replacement: "Green " },
      },
    },
  },
];

try {
  await connectDB();

  const buses = await Bus.updateMany({ name: /^Red /i }, rename("name"));
  const bookings = await Booking.updateMany(
    { "bus.name": /^Red /i },
    rename("bus.name")
  );

  console.log(`Buses renamed: ${buses.modifiedCount}`);
  console.log(`Bookings updated: ${bookings.modifiedCount}`);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
