import React, { useState, useEffect } from "react";
import { createProject, updateProject } from "../../services/projectService";
import { getImageUrl } from "../../utils/imagePath"; // Import utility
import { FaCloudUploadAlt, FaPlus, FaTimes } from "react-icons/fa";

const ProjectForm = ({ onSuccess, onClose, initialData = null }) => {
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    githubLink: "",
    demoLive: "",
  });

  const [technologies, setTechnologies] = useState([]);
  const [techInput, setTechInput] = useState("");

  const [keyFeatures, setKeyFeatures] = useState([]);
  const [featureInput, setFeatureInput] = useState("");

  const [image, setImage] = useState(null); // New file to upload
  const [preview, setPreview] = useState(null); // URL for preview

  // 1. POPULATE FORM ON EDIT MODE
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        githubLink: initialData.githubLink || "",
        demoLive: initialData.demoLive || "",
      });

      // Handle arrays (ensure they are arrays)
      setTechnologies(initialData.technologies || []);
      setKeyFeatures(initialData.keyFeatures || []);

      // Set existing image as preview
      if (initialData.projectImage) {
        setPreview(getImageUrl(initialData.projectImage));
      }
    }
  }, [initialData]);

  // --- Handlers ---

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
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

  const addFeature = () => {
    if (featureInput.trim()) {
      setKeyFeatures([...keyFeatures, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (index) => {
    setKeyFeatures(keyFeatures.filter((_, i) => i !== index));
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("githubLink", formData.githubLink);
      data.append("demoLive", formData.demoLive);

      data.append("technologies", JSON.stringify(technologies));
      data.append("keyFeatures", JSON.stringify(keyFeatures));

      // Only append image if a NEW file was selected
      if (image) {
        data.append("projectImage", image);
      }

      if (initialData) {
        // EDIT MODE: Update existing project
        await updateProject(initialData._id, data);
      } else {
        // CREATE MODE: Create new project
        await createProject(data);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving project", error);
      alert("Failed to save project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 text-gray-900 dark:text-gray-100"
    >
      {/* Image Upload */}
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:border-accent transition-colors relative min-h-40">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        {preview ? (
          <img src={preview} alt="Preview" className="h-40 object-contain" />
        ) : (
          <div className="text-center text-gray-500">
            <FaCloudUploadAlt size={40} className="mx-auto mb-2" />
            <p className="text-sm font-medium">Click to upload project image</p>
          </div>
        )}
      </div>

      {/* Name & Description */}
      <div>
        <label className="block text-sm font-medium mb-1">Project Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          required
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          required
          rows="3"
          className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
          onChange={handleChange}
        ></textarea>
      </div>

      {/* Links */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">GitHub Link</label>
          <input
            type="text"
            name="githubLink"
            value={formData.githubLink}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Live Demo</label>
          <input
            type="text"
            name="demoLive"
            value={formData.demoLive}
            className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:ring-2 focus:ring-accent outline-none"
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Technologies */}
      <div>
        <label className="block text-sm font-medium mb-1">Technologies</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="e.g. React, Node.js"
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
              {typeof tech === "string" ? tech : tech.name}
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

      {/* Key Features */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Key Features (Bullet points)
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            placeholder="e.g. User Authentication"
            className="grow p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none"
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addFeature())
            }
          />
          <button
            type="button"
            onClick={addFeature}
            className="p-2 bg-accent text-white rounded-lg hover:opacity-90 cursor-pointer"
          >
            <FaPlus />
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {keyFeatures.map((feature, i) => (
            <div
              key={i}
              className="px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm flex justify-between items-center"
            >
              <span>{feature}</span>
              <button
                type="button"
                onClick={() => removeFeature(i)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <FaTimes size={12} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-gray-900 dark:bg-white text-white dark:text-black font-bold rounded-lg hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all disabled:opacity-50 cursor-pointer"
      >
        {loading
          ? "Saving..."
          : initialData
          ? "Update Project"
          : "Create Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
