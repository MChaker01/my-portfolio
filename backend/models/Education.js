const mongoose = require("mongoose");

const educationSchema = mongoose.Schema(
  {
    school: {
      type: String,
      required: [true, "School name is required."],
      trim: true,
    },
    degree: {
      type: String,
      required: [true, "Degree is required."],
      trim: true,
    },
    fieldOfStudy: {
      type: String,
      required: [true, "Field of Study is required."],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required."],
    },
    endDate: {
      type: Date,
    },
    location: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Education = mongoose.model("Education", educationSchema);

module.exports = Education;
