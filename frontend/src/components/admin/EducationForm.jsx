import React, { useState, useEffect } from "react";
import {
  createEducation,
  updateEducation,
} from "../../services/educationService";

const EducationForm = ({ onSuccess, onClose, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldOfStudy: "",
    startDate: "",
    endDate: "",
    location: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        school: initialData.school || "",
        degree: initialData.degree || "",
        fieldOfStudy: initialData.fieldOfStudy || "",
        // Format date for HTML input (YYYY-MM-DD)
        startDate: initialData.startDate
          ? initialData.startDate.split("T")[0]
          : "",
        endDate: initialData.endDate ? initialData.endDate.split("T")[0] : "",
        location: initialData.location || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (initialData) {
        await updateEducation(initialData._id, formData);
      } else {
        await createEducation(formData);
      }
      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to save education.");
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
        <label className="block text-sm font-medium mb-1">
          School / University
        </label>
        <input
          type="text"
          name="school"
          value={formData.school}
          required
          onChange={handleChange}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Field of Study
          </label>
          <input
            type="text"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            required
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
          <label className="block text-sm font-medium mb-1">
            End Date (Leave empty if current)
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
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

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-accent transition-colors disabled:opacity-50 cursor-pointer"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Education"
          : "Add Education"}
      </button>
    </form>
  );
};

export default EducationForm;
