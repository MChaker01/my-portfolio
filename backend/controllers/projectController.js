// Import Project model to interact with projects collection
const Project = require("../models/Project");

/**
 * @desc    Create Project
 * @route   POST /api/admin/projects/createProject
 * @access  Private (admin only)
 */
const createProject = async (req, res) => {
  try {
    // Extract fields from request body (sent as FormData)
    let { name, description, technologies, githubLink, demoLive, keyFeatures } =
      req.body;

    // Validate required fields
    if (!name || !description) {
      return res.status(400).json({ message: "Required fields missing." });
    }

    // Parse JSON strings back to arrays (FormData sends arrays as strings)
    if (typeof technologies === "string") {
      technologies = JSON.parse(technologies);
    }

    if (typeof keyFeatures === "string") {
      keyFeatures = JSON.parse(keyFeatures);
    }

    // Validate at least one technology is provided
    if (!technologies || technologies.length === 0) {
      return res
        .status(400)
        .json({ message: "At least one technologie is required" });
    }

    // Handle uploaded image file (processed by Multer middleware)
    let projectImage = null;
    if (req.file) {
      projectImage = req.file.path; 
    }

    // Ensure image was uploaded
    if (!projectImage) {
      return res.status(400).json({ message: "Project image is required." });
    }

    // Create new project in database
    const project = await Project.create({
      name,
      description,
      projectImage,
      technologies,
      githubLink,
      demoLive,
      keyFeatures,
    });

    // Return success response with created project
    return res
      .status(201)
      .json({ message: "Project created successfully.", Project: project });
  } catch (error) {
    console.error("Error while creating Project.", error);
    res.status(500).json({ message: "Server Error while creating Project" });
  }
};

/**
 * @desc    Get all Projects
 * @route   GET /api/projects
 * @access  Public (anyone can view)
 */
const getAllProjects = async (req, res) => {
  try {
    // Retrieve all projects from database
    const projects = await Project.find();

    // Check if any projects exist
    if (!projects || projects.length === 0) {
      return res.status(404).json({ message: "There are no projects yet." });
    }

    // Return projects array
    return res.status(200).json({ Projects: projects });
  } catch (error) {
    console.log("Error while retreiving projects.", error);
    res
      .status(500)
      .json({ message: "Server Error while retreiving projects." });
  }
};

/**
 * @desc    Get Project by Id
 * @route   GET /api/projects/:id
 * @access  Public
 */
const getProjectById = async (req, res) => {
  try {
    // Find project by ID from URL params
    const project = await Project.findById(req.params.id);

    // Check if project exists
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Return single project
    return res.status(200).json({ Project: project });
  } catch (error) {
    console.log("Error retreiving Project.", error);
    res.status(500).json({ message: "Server Error while retrieving Project." });
  }
};

/**
 * @desc    Update Project by Id
 * @route   PUT /api/admin/projects/:id
 * @access  Private (admin only)
 */
const updateProject = async (req, res) => {
  try {
    // Find existing project
    const projectToUpdate = await Project.findById(req.params.id);

    if (!projectToUpdate) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Prepare update data (spread operator creates copy of req.body)
    let updateData = { ...req.body };

    // Parse arrays if sent as JSON strings
    if (typeof updateData.technologies === "string") {
      updateData.technologies = JSON.parse(updateData.technologies);
    }

    if (typeof updateData.keyFeatures === "string") {
      updateData.keyFeatures = JSON.parse(updateData.keyFeatures);
    }

    // If new image uploaded, update image path
    if (req.file) {
      updateData.projectImage = req.file.path;
    }

    // Update project in database
    // { new: true } returns updated document
    // { runValidators: true } runs schema validations on update
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Project updated successfully.",
      Project: updatedProject,
    });
  } catch (error) {
    console.log("Error while updating Project.", error);
    res.status(500).json({ message: "Server Error while updating Project." });
  }
};

/**
 * @desc    Delete Project by Id
 * @route   DELETE /api/admin/projects/:id
 * @access  Private (admin only)
 */
const deleteProject = async (req, res) => {
  try {
    // Find project to delete
    const projectToDelete = await Project.findById(req.params.id);

    if (!projectToDelete) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Delete the project
    await projectToDelete.deleteOne();

    return res
      .status(200)
      .json({ message: "Project deleted successfully.", id: req.params.id });
  } catch (error) {
    console.log("Error while deleting Project.", error);
    res.status(500).json({ message: "Server Error while deleting Project." });
  }
};

// Export all controller functions
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
