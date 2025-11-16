const mongoose = require("mongoose");

const experienceSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Experience title is required."],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Company name is required."],
    trim: true,
  },
  location: {
    type: String,
    trim: true,
  },
  employmentType: {
    type: String,
    enum: [
      "Full-time",
      "Part-time",
      "Internship",
      "Freelance",
      "Self-employed",
      "Remote",
    ],
    default: "Full-time",
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    trim: true,
  },
  technologies: {
    type: [String],
  },
});

const Experience = mongoose.model("Experience", experienceSchema);

module.exports = Experience;
