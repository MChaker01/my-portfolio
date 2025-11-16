const mongoose = require("mongoose");

const projectSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Project name is required"],
      trim: true,
      minlength: 10,
    },
    description: {
      type: String,
      required: [true, "Project description is required"],
      minlength: 10,
    },
    projectImage: {
      type: String,
      required: [true, "Project image is required"],
    },
    technologies: {
      type: [String],
      required: [true, "Used technologies are required."],
    },
    githubLink: {
      type: String,
      unique: true,
      sparse: true, // ← Allows multiple null/undefined values
    },
    demoLive: {
      type: String,
      unique: true,
      sparse: true,
    },
    keyFeatures: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
