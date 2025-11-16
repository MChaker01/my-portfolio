const Skill = require("../models/Skill");

const createSkill = async (req, res) => {
  try {
    const { name, category, level, description, officialWebsite } = req.body;

    if (!name || !category) {
      return res.status(400).json({ message: "required fields are missing." });
    }

    let skillIcon = null;

    if (req.file) {
      skillIcon = req.file.path;
    }

    if (!skillIcon) {
      return res.status(400).json({ message: "Skill image is required." });
    }

    const newSkill = await Skill.create({
      name,
      category,
      skillIcon,
      level,
      description,
      officialWebsite,
    });

    return res
      .status(201)
      .json({ message: "Skill created successfully.", Skill: newSkill });
  } catch (error) {
    console.error("Server Error while creating Skill.", error);
    res.status(500).json({ message: "Server Error while creating skill." });
  }
};

const getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();

    if (!skills || skills.length === 0) {
      return res.status(404).json({ message: "There are no skills yet." });
    }

    return res.status(200).json({ Skills: skills });
  } catch (error) {
    console.log("Error while retreiving skills.", error);
    res.status(500).json({ message: "Server Error while retreiving skills." });
  }
};

const getSkillById = async (req, res) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return res.status(404).json({ message: "Skill not found" });
    }

    return res.status(200).json({ Skill: skill });
  } catch (error) {
    console.log("Error retreiving skill.", error);
    res.status(500).json({ message: "Server Error while retrieving skill." });
  }
};

const updateSkill = async (req, res) => {
  try {
    const skillToUpdate = await Skill.findById(req.params.id);

    if (!skillToUpdate) {
      return res.status(404).json({ message: "Skill not found." });
    }

    let updateData = { ...req.body };

    if (req.file) {
      updateData.skillIcon = req.file.path;;
    }

    const updatedSkill = await Skill.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Skill updated successfully.",
      Skill: updatedSkill,
    });
  } catch (error) {
    console.error("Error while updating Skill.", error);
    res.status(500).json({ message: "Server Error while creating Skill" });
  }
};

const deleteSkill = async (req, res) => {
  try {
    const skillToDelete = await Skill.findById(req.params.id);

    if (!skillToDelete) {
      return res.status(404).json({ message: "Skill not found" });
    }

    await skillToDelete.deleteOne();

    return res
      .status(200)
      .json({ message: "Skill deleted successfully.", id: req.params.id });
  } catch (error) {
    console.log("Error while deleting Skill.", error);
    res.status(500).json({ message: "Server Error while deleting Skill." });
  }
};

module.exports = {
  createSkill,
  getAllSkills,
  getSkillById,
  updateSkill,
  deleteSkill,
};
