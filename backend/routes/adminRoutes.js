const express = require("express");

const { Login } = require("../controllers/adminController");

const {
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const {
  createSkill,
  updateSkill,
  deleteSkill,
} = require("../controllers/skillController");

const {
  createEducation,
  updateEducation,
  deleteEducation,
} = require("../controllers/educationController");

const {
  createExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experienceController");

// Import authentication middleware
const { protect } = require("../middleware/authMiddleware");

const upload = require("../configs/multer");

// Create router instance
const router = express.Router();

// login router (applied before using protect to avoid protect middleware vérification).
router.post("/login", Login);

// Apply protect middleware to ALL routes below this line
// This means every route defined after this will require authentication
router.use(protect);

// Admin-only routes (all protected by middleware above)

// --- Projects ---
router.post(
  "/projects/createProject",
  upload.single("projectImage"),
  createProject
);
router.put("/projects/:id", upload.single("projectImage"), updateProject);
router.delete("/projects/:id", deleteProject);

// --- Skills ---
router.post("/skills/createSkill", upload.single("skillIcon"), createSkill);
router.put("/skills/:id", upload.single("skillIcon"), updateSkill);
router.delete("/skills/:id", deleteSkill);

// --- Education ---
router.post("/education", createEducation);
router.put("/education/:id", updateEducation);
router.delete("/education/:id", deleteEducation);

// --- Experience ---
router.post("/experience", createExperience);
router.put("/experience/:id", updateExperience);
router.delete("/experience/:id", deleteExperience);

// Export router to be used in server.js
module.exports = router;
