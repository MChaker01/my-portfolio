// Import necessary modules
const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs"); // For password hashing/comparison
const jwt = require("jsonwebtoken"); // For generating authentication tokens

/**
 * @desc    Admin Login
 * @route   POST /api/admin/login
 * @access  Public (anyone can attempt login)
 */
const Login = async (req, res) => {
  try {
    // Extract credentials from request body
    const { email, password } = req.body;

    // Validate all fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find admin by email in database
    const admin = await Admin.findOne({ email });

    // Check if admin exists AND password matches
    // IMPORTANT: Check admin exists FIRST to avoid crash when comparing password
    if (admin && (await bcrypt.compare(password, admin.password))) {
      // Generate JWT token (signed with secret, expires in 1 day)
      // Token contains admin ID as payload
      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Return success with admin info (excluding password) and token
      return res.status(200).json({
        message: "Admin connected successfully.",
        username: admin.username,
        email: admin.email,
        token, // Client stores this and sends in Authorization header for protected routes
      });
    } else {
      // Either admin not found OR password incorrect
      return res.status(400).json({ message: "Incorrect Email or Password." });
    }
  } catch (error) {
    console.error("Error while connecting", error);
    res.status(500).json({ message: "Server Error while connecting." });
  }
};

// Export login function
module.exports = { Login };
