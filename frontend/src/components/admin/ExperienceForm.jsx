import React, { useState, useEffect } from "react";
import {
  createExperience,
  updateExperience,
} from "../../services/experienceService";
import { FaPlus, FaTimes } from "react-icons/fa";

const ExperienceForm = ({ onSuccess, onClose, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    employmentType: "Full-time",
    startDate: "",
    endDate: "",
    isCurrent: false,
    description: "",
  });

  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        company: initialData.company || "",
        location: initialData.location || "",
        employmentType: initialData.employmentType || "Full-time",
        startDate: initialData.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
        isCurrent: initialData.isCurrent || false,
        description: initialData.description || "",
      });
      setTechnologies(initialData.technologies || []);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const addTech = () => {
    if (techInput.trim()) {
      setTechnologies([...technologies, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTech = (index) => {
    setTechnologies(technologies.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, technologies };

      if (initialData) {
        await updateExperience(initialData._id, payload);
      } else {
        await createExperience(payload);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save experience.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 text-gray-900 dark:text-gray-100"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          required
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 items-center">
        <div>
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            disabled={formData.isCurrent}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent disabled:opacity-50"
          />
        </div>
        <div className="flex items-center pt-6">
          <input
            type="checkbox"
            name="isCurrent"
            checked={formData.isCurrent}
            onChange={handleChange}
            className="w-5 h-5 mr-2 accent-accent"
          />
          <label className="text-sm">I work here currently</label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          rows="3"
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
        ></textarea>
      </div>

      {/* Tech Stack */}
      <div>
        <label className="block text-sm font-medium mb-1">Technologies</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Add tech..."
            className="grow p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addTech())
            }
          />
          <button
            type="button"
            onClick={addTech}
            className="p-2 bg-accent text-white rounded-lg hover:opacity-90 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <span
              key={i}
              className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTech(i)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-accent transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Experience"
          : "Add Experience"}
      </button>
    </form>
  );
};

export default ExperienceForm;
