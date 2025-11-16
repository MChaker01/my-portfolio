const mongoose = require("mongoose");

const skillSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Skill name is required."],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["Frontend", "Backend", "DevOps", "Database", "Mobile", "Other"],
      required: [true, "Skill category is required"],
    },
    skillIcon: {
      type: String,
      required: [true, "Skill icon is required."],
    },
    description: {
      type: String,
      default: "",
    },
    officialWebsite: {
      type: String,
      default: "",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
    },
  },
  { timestamps: true }
);

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
