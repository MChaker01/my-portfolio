const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Admin = require("./models/Admin");
require("dotenv").config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);

    const password = "YourPassword";
    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      username: "YourUsername",
      email: "YourEmail@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully!");
    mongoose.disconnect();
    console.log("📴 Disconnected from MongoDB.");
  } catch (error) {
    console.error("Error while creating Admin.", error);
  }
};

seedAdmin();
