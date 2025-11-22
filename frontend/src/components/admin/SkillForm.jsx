import React, { useState, useEffect } from "react";
import { createSkill, updateSkill } from "../../services/skillService";
import { getImageUrl } from "../../utils/imagePath";
import { FaCloudUploadAlt } from "react-icons/fa";

const SkillForm = ({ onSuccess, onClose, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [icon, setIcon] = useState(null);
  const [preview, setPreview] = useState(null);
  const [description, setDescription] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");

  // POPULATE FORM ON EDIT
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.category || "Frontend");
      if (initialData.skillIcon) {
        setPreview(getImageUrl(initialData.skillIcon));
      }
      setDescription(initialData.description || "");
      setOfficialWebsite(initialData.officialWebsite || "");
    }
  }, [initialData]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIcon(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", name);
      data.append("category", category);
      data.append("description", description);
      data.append("officialWebsite", officialWebsite);

      if (icon) {
        data.append("skillIcon", icon);
      }

      if (initialData) {
        await updateSkill(initialData._id, data);
      } else {
        await createSkill(data);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving skill", error);
      alert("Failed to save skill");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-900 dark:text-gray-100"
    >
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:border-accent transition-colors relative w-32 h-32 mx-auto">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        ) : (
          <div className="text-center text-gray-500">
            <FaCloudUploadAlt size={24} className="mx-auto" />
            <span className="text-xs">Icon</span>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Skill Name</label>
        <input
          type="text"
          required
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="Database">Database</option>
          <option value="Mobile">Mobile</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Official Website (Optional)
        </label>
        <input
          type="url"
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
          placeholder="https://..."
          value={officialWebsite}
          onChange={(e) => setOfficialWebsite(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Description (Short bio of the tool)
        </label>
        <textarea
          rows="3"
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Saving..." : initialData ? "Update Skill" : "Add Skill"}
      </button>
    </form>
  );
};

export default SkillForm;
