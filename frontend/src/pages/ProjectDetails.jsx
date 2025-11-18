import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaArrowLeft,
  FaCheckCircle,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { getProjectById } from "../services/projectService";
import { getImageUrl } from "../utils/imagePath";

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto pt-10 pb-20 px-6 animate-pulse">
        <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-8"></div>
        <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-800 rounded mb-6"></div>
        <div className="h-96 w-full bg-gray-200 dark:bg-gray-800 rounded-xl mb-8"></div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="col-span-2 h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh]">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Project not found
        </h2>
        <Link to="/projects" className="text-accent mt-4 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-5xl mx-auto pt-10 pb-20">
      {/* 1. Back Navigation */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-accent transition-colors mb-8 group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to all projects
      </Link>

      {/* 2. Header & Actions */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight"
          >
            {project.name}
          </motion.h1>
        </div>

        <div className="flex gap-4">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm transition-all duration-200 border border-gray-300 dark:border-transparent dark:hover:border-gray-600 hover:text-accent dark:hover:text-accent"
            >
              <FaGithub size={18} />
              <span>Source</span>
            </a>
          )}
          {project.demoLive && (
            <a
              href={project.demoLive}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium text-sm border border-transparent transition-all duration-200 hover:border-gray-300 dark:hover:border-gray-600 hover:text-accent dark:hover:text-accent hover:shadow-sm"
            >
              <FaExternalLinkAlt size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </header>

      {/* 3. Hero Image */}
      {/* Only render if image exists */}
      {project.projectImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-2xl dark:shadow-none border border-gray-200 dark:border-gray-800 mb-16 bg-gray-100 dark:bg-gray-900"
        >
          <img
            src={getImageUrl(project.projectImage)}
            alt={project.name}
            className="w-full h-auto max-h-[600px] object-contain mx-auto"
          />
        </motion.div>
      )}

      {/* 4. Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* LEFT COLUMN: Main Content */}
        <div className="md:col-span-2 space-y-10">
          <section>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Project Overview
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </section>

          {/* Key Features List */}
          {project.keyFeatures && project.keyFeatures.length > 0 && (
            <section>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Key Features
              </h3>
              <ul className="grid gap-3">
                {project.keyFeatures.map((feature, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700/50"
                  >
                    <FaCheckCircle className="text-accent mt-1 shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <div className="md:col-span-1 space-y-8">
          {/* Tech Stack */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
              Technologies Used
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700"
                >
                  {typeof tech === "string" ? tech : tech.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ProjectDetails;
