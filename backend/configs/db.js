// database connection :
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.log("Error while connecting to MongoDB.", error);
    process.exit(1);
  }
};

module.exports = connectDB;
