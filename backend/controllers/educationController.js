const Education = require("../models/Education");

// @desc    Create Education
// @route   POST /api/admin/education
// @access  Private
const createEducation = async (req, res) => {
  try {
    const { school, degree, fieldOfStudy, startDate, endDate, location } =
      req.body;

    if (!school || !degree || !fieldOfStudy || !startDate) {
      return res.status(400).json({ message: "Required fields are missing." });
    }

    const newEducation = await Education.create({
      school,
      degree,
      fieldOfStudy,
      startDate,
      endDate,
      location,
    });

    return res.status(201).json({
      message: "Education added successfully.",
      Education: newEducation,
    });
  } catch (error) {
    console.error("Error creating Education:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get All Education
// @route   GET /api/education
// @access  Public
const getAllEducation = async (req, res) => {
  try {
    // Sort by start date descending (newest first)
    const educationList = await Education.find().sort({ startDate: -1 });
    return res.status(200).json({ Education: educationList });
  } catch (error) {
    console.error("Error fetching Education:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Update Education
// @route   PUT /api/admin/education/:id
// @access  Private
const updateEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: "Education record not found." });
    }

    const updatedEducation = await Education.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Education updated successfully.",
      Education: updatedEducation,
    });
  } catch (error) {
    console.error("Error updating Education:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Delete Education
// @route   DELETE /api/admin/education/:id
// @access  Private
const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);

    if (!education) {
      return res.status(404).json({ message: "Education record not found." });
    }

    await education.deleteOne();

    return res
      .status(200)
      .json({ message: "Education deleted successfully.", id: req.params.id });
  } catch (error) {
    console.error("Error deleting Education:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  createEducation,
  getAllEducation,
  updateEducation,
  deleteEducation,
};