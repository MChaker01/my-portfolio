import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllProjects } from "../../services/projectService";
import { FaArrowRight } from "react-icons/fa";
import { getImageUrl } from "../../utils/imagePath";

const SelectedWork = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data ? data.slice(0, 3) : []);
      } catch (error) {
        console.error("Failed to load projects", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6 mt-8">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-48 w-full bg-gray-200 dark:bg-gray-900 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-text-main">
          Selected Work
        </h3>
        <Link
          to="/projects"
          className="group flex items-center gap-2 text-sm font-medium text-accen hover:text-accent transition-colors"
        >
          View all projects
          <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-8">
        {projects.map((project) => (
          <Link
            key={project._id}
            to={`/projects/${project._id}`}
            className="
              group block rounded-2xl overflow-hidden
              bg-gray-50 dark:bg-[#0a0a0a]
              border border-gray-200 dark:border-gray-800 
              hover:border-accent/50 dark:hover:border-accent/50
              transition-all duration-300
              h-auto md:h-72
            "
          >
            <div className="flex flex-col md:flex-row h-full">
              {/* LEFT: Content */}
              <div className="flex-1 p-6 md:p-8 flex flex-col justify-between order-2 md:order-1">
                <div>
                  <h4 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors mb-3">
                    {project.name}
                  </h4>
                  <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 line-clamp-3 mb-6">
                    {project.description}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies?.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs font-mono bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded text-gray-500"
                    >
                      {typeof tech === "string" ? tech : tech.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* RIGHT: Image */}
              <div className="w-full md:w-2/5 h-48 md:h-auto overflow-hidden order-1 md:order-2 relative bg-gray-200 dark:bg-gray-800">
                <img
                  src={getImageUrl(project.projectImage)}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Arrow Icon over Image */}
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/80 p-2 rounded-full text-gray-900 dark:text-white group-hover:text-accent transition-colors shadow-lg">
                  <FaArrowRight
                    size={14}
                    className="-rotate-45 group-hover:rotate-0 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SelectedWork;
