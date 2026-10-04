import User from "../models/User.js";

// Must be used AFTER authMiddleware (it needs req.user.id)
const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("role");

    if (!user || user.role !== "admin") {
      return res.status(403).json({ message: "Admin access only" });
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export default adminMiddleware;
