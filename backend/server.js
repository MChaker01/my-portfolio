// import required modules
const express = require("express");
const connectDB = require("./configs/db");
require("dotenv").config();
const cors = require("cors");

// import routes
const adminRoutes = require("./routes/adminRoutes");
const publicRoutes = require("./routes/publicRoutes");

// create instance
const app = express();

// use necessary middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
  })
);

app.use("/uploads", express.static("uploads"));

// define routes
app.use("/api/admin/", adminRoutes);
app.use("/api/", publicRoutes);

// call connectDB. // then listen to port.
connectDB().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on Port : ${PORT}`);
    console.log(`http://localhost:${PORT}`);
  });
});
