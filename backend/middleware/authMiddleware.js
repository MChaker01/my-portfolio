// Import necessary modules
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

/**
 * Protect Middleware
 * Purpose: Verify JWT token and authenticate admin before accessing protected routes
 * Usage: Add to routes that require authentication
 */
const protect = async (req, res, next) => {
  let token;

  // Check if Authorization header exists and starts with "Bearer"
  // Format: "Bearer <token>"
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract token from "Bearer <token>" string
      token = req.headers.authorization.split(" ")[1];

      // Verify token using JWT_SECRET
      // If valid, decoded contains the payload (admin ID)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find admin by ID from token payload
      // .select("-password") excludes password field from result
      req.admin = await Admin.findById(decoded.id).select("-password");

      // Call next() to pass control to next middleware/controller
      // req.admin is now available in subsequent functions
      return next();
    } catch (error) {
      console.error(error);
      // Token verification failed (expired, invalid, tampered)
      return res.status(401).json({ message: "Unauthorized, invalid token" });
    }
  }

  // No token provided in Authorization header
  return res.status(401).json({ message: "Unauthorized, no token." });
};

// Export middleware
module.exports = { protect };
