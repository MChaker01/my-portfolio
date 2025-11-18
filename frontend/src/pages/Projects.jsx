import React, { useEffect, useState } from "react";
import {motion} from "framer-motion";
import { getAllProjects } from "../services/projectService";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getAllProjects();
        setProjects(data || []);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20">
      {/* HEADER */}
      <div className="mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-text-main mb-4"
        >
          Engineering Projects
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="text-gray-600 dark:text-text-muted max-w-2xl text-lg leading-relaxed"
        >
          A collection of full-stack applications, focusing on performance,
          scalable architecture, and modern UI/UX.
        </motion.p>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div
              key={n}
              className="h-80 bg-gray-200 dark:bg-gray-900/50 rounded-xl animate-pulse"
            />
          ))}
        </div>
      ) : projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-dashed border-gray-300 dark:border-gray-800 rounded-xl">
          <p className="text-gray-500 text-lg">No projects found yet.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
