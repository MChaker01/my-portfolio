import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/authService";
// Services
import { getAllProjects, deleteProject } from "../services/projectService";
import { getAllSkills, deleteSkill } from "../services/skillService";
import { getAllEducation, deleteEducation } from "../services/educationService";
import {
  getAllExperience,
  deleteExperience,
} from "../services/experienceService";
// Utils & Icons
import { getImageUrl } from "../utils/imagePath";
import {
  FaTrash,
  FaPlus,
  FaSignOutAlt,
  FaEdit,
  FaBriefcase,
  FaGraduationCap,
  FaCode,
  FaLaptopCode,
} from "react-icons/fa";
// Components
import Modal from "../components/admin/Modal";
import ProjectForm from "../components/admin/ProjectForm";
import SkillForm from "../components/admin/SkillForm";
import EducationForm from "../components/admin/EducationForm";
import ExperienceForm from "../components/admin/ExperienceForm";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("projects");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/admin/login");
  }, [navigate]);

  // --- FETCH DATA ---
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let res = [];
      if (activeTab === "projects") res = await getAllProjects();
      else if (activeTab === "skills") res = await getAllSkills();
      else if (activeTab === "education") res = await getAllEducation();
      else if (activeTab === "experience") res = await getAllExperience();

      setData(res || []);
    } catch (error) {
      console.error("Fetch error", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // --- HANDLERS ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    try {
      if (activeTab === "projects") await deleteProject(id);
      else if (activeTab === "skills") await deleteSkill(id);
      else if (activeTab === "education") await deleteEducation(id);
      else if (activeTab === "experience") await deleteExperience(id);

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert("Failed to delete");
      console.error("Failed to delete", error);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleFormSuccess = () => {
    fetchData();
    setIsModalOpen(false);
  };

  // --- HELPER TO RENDER LIST ITEM ---
  const renderListItem = (item) => {
    // 1. PROJECTS & SKILLS (Have Images)
    if (activeTab === "projects" || activeTab === "skills") {
      return (
        <div className="flex items-center gap-4">
          <img
            src={getImageUrl(
              activeTab === "projects" ? item.projectImage : item.skillIcon
            )}
            alt="preview"
            className="w-12 h-12 rounded-md object-cover bg-gray-100 dark:bg-gray-800"
          />
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {item.name}
            </h3>
            {activeTab === "projects" && (
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 max-w-md">
                {item.description}
              </p>
            )}
            {activeTab === "skills" && (
              <span className="text-xs px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                {item.category}
              </span>
            )}
          </div>
        </div>
      );
    }

    // 2. EDUCATION
    if (activeTab === "education") {
      return (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl">
            <FaGraduationCap />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {item.school}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.degree} in {item.fieldOfStudy}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(item.startDate).getFullYear()} -{" "}
              {item.endDate ? new Date(item.endDate).getFullYear() : "Present"}
            </p>
          </div>
        </div>
      );
    }

    // 3. EXPERIENCE
    if (activeTab === "experience") {
      return (
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-md bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl">
            <FaBriefcase />
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">
              {item.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {item.company}
            </p>
            <p className="text-xs text-gray-400">
              {new Date(item.startDate).getFullYear()} -{" "}
              {item.isCurrent
                ? "Present"
                : new Date(item.endDate).getFullYear()}
            </p>
          </div>
        </div>
      );
    }
  };

  // --- HELPER FOR MODAL TITLE ---
  const getModalTitle = () => {
    const action = editingItem ? "Edit" : "Add New";
    const type = activeTab.charAt(0).toUpperCase() + activeTab.slice(1);
    return `${action} ${type}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300 font-sans">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 cursor-pointer"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* TABS */}
        <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-800">
          {[
            { id: "projects", icon: FaLaptopCode, label: "Projects" },
            { id: "skills", icon: FaCode, label: "Skills" },
            { id: "education", icon: FaGraduationCap, label: "Education" },
            { id: "experience", icon: FaBriefcase, label: "Experience" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 pb-3 px-2 font-medium transition-colors cursor-pointer ${
                activeTab === tab.id
                  ? "border-b-2 border-accent text-accent"
                  : "text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold capitalize">{activeTab} List</h2>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-white rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
          >
            <FaPlus /> Add New
          </button>
        </div>

        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-20 bg-gray-200 dark:bg-gray-800 rounded-lg"
              />
            ))}
          </div>
        ) : (
          <div className="grid gap-4">
            {data.length === 0 && (
              <p className="text-gray-500">No items found.</p>
            )}
            {data.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm"
              >
                {renderListItem(item)}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-2 text-gray-400 hover:text-accent transition-colors cursor-pointer"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={getModalTitle()}
      >
        {activeTab === "projects" && (
          <ProjectForm
            onSuccess={handleFormSuccess}
            onClose={() => setIsModalOpen(false)}
            initialData={editingItem}
          />
        )}
        {activeTab === "skills" && (
          <SkillForm
            onSuccess={handleFormSuccess}
            onClose={() => setIsModalOpen(false)}
            initialData={editingItem}
          />
        )}
        {activeTab === "education" && (
          <EducationForm
            onSuccess={handleFormSuccess}
            onClose={() => setIsModalOpen(false)}
            initialData={editingItem}
          />
        )}
        {activeTab === "experience" && (
          <ExperienceForm
            onSuccess={handleFormSuccess}
            onClose={() => setIsModalOpen(false)}
            initialData={editingItem}
          />
        )}
      </Modal>
    </div>
  );
};

export default AdminDashboard;
