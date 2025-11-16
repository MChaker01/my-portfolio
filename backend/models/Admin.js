const mongoose = require("mongoose");

const adminSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, "username is required."],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "email is required."],
      trim: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "password is required."],
      minlength: 6,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
