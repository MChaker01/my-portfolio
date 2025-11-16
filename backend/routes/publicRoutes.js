const express = require("express");

const {
  getAllProjects,
  getProjectById,
} = require("../controllers/projectController");

const {
  getAllSkills,
  getSkillById,
} = require("../controllers/skillController");

const { getAllEducation } = require("../controllers/educationController");
const { getAllExperience } = require("../controllers/experienceController");

// Create router instance
const router = express.Router();

// Public routes (no authentication required)

// projects
router.get("/projects", getAllProjects); // Get all projects
router.get("/projects/:id", getProjectById); // Get single project by ID

// skills
router.get("/skills", getAllSkills);
router.get("/skills/:id", getSkillById);

// Resume Data
router.get("/education", getAllEducation);
router.get("/experience", getAllExperience);

// Export router to be used in server.js
module.exports = router;
