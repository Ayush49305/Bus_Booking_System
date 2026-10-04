import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/User.js";

dotenv.config();

const email = process.argv[2];

if (!email) {
  console.log("Usage: npm run make-admin -- your@email.com");
  process.exit(1);
}

try {
  await connectDB();

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase() },
    { role: "admin" },
    { new: true }
  );

  if (!user) {
    console.log(`No user found with email ${email}. Sign up first.`);
    process.exit(1);
  }

  console.log(`${user.email} is now an admin. Log out and log in again.`);
  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
