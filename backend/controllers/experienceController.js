const Experience = require("../models/Experience");

// @desc    Create Experience
// @route   POST /api/admin/experience
// @access  Private
const createExperience = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies,
    } = req.body;

    if (!title || !company || !startDate) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    // If technologies is sent as a JSON string (from FormData), parse it
    // If sent as raw JSON, it's already an array
    let parsedTechnologies = technologies;
    if (typeof technologies === "string") {
      parsedTechnologies = JSON.parse(technologies);
    }

    const newExperience = await Experience.create({
      title,
      company,
      location,
      employmentType,
      startDate,
      endDate,
      isCurrent,
      description,
      technologies: parsedTechnologies,
    });

    return res.status(201).json({
      message: "Experience added successfully.",
      Experience: newExperience,
    });
  } catch (error) {
    console.error("Error creating Experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get All Experience
// @route   GET /api/experience
// @access  Public
const getAllExperience = async (req, res) => {
  try {
    // Sort by start date descending (newest first)
    const experienceList = await Experience.find().sort({ startDate: -1 });
    return res.status(200).json({ Experience: experienceList });
  } catch (error) {
    console.error("Error fetching Experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update Experience
// @route   PUT /api/admin/experience/:id
// @access  Private
const updateExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found." });
    }

    let updateData = { ...req.body };

    // Handle array parsing if needed
    if (typeof updateData.technologies === "string") {
      updateData.technologies = JSON.parse(updateData.technologies);
    }

    const updatedExperience = await Experience.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Experience updated successfully.",
      Experience: updatedExperience,
    });
  } catch (error) {
    console.error("Error updating Experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete Experience
// @route   DELETE /api/admin/experience/:id
// @access  Private
const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);

    if (!experience) {
      return res.status(404).json({ message: "Experience not found." });
    }

    await experience.deleteOne();

    return res
      .status(200)
      .json({ message: "Experience deleted successfully.", id: req.params.id });
  } catch (error) {
    console.error("Error deleting Experience:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createExperience,
  getAllExperience,
  updateExperience,
  deleteExperience,
};
