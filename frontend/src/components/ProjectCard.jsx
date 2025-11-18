import React from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowRight } from "react-icons/fa";
import { getImageUrl } from "../utils/imagePath";

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="
        group flex flex-col h-full
        bg-white dark:bg-[#0a0a0a]
        rounded-2xl overflow-hidden
        border border-gray-200 dark:border-gray-800"
    >
      {/* IMAGE SECTION */}
      <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={getImageUrl(project.projectImage)}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay - Links appear on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-lg"
              title="View Code"
            >
              <FaGithub size={20} />
            </a>
          )}
          {project.demoLive && (
            <a
              href={project.demoLive}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-accent text-white rounded-full hover:scale-110 transition-transform shadow-lg"
              title="Live Demo"
            >
              <FaExternalLinkAlt size={18} />
            </a>
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="flex flex-col grow p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors">
            {project.name}
          </h3>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 leading-relaxed">
          {project.description}
        </p>

        {/* Footer: Tech Stack & Details Link */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          {/* Tech Stack Pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies?.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className="text-[10px] font-medium uppercase tracking-wide px-2 py-1 rounded bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {typeof tech === "string" ? tech : tech.name}
              </span>
            ))}
            {project.technologies?.length > 3 && (
              <span className="text-xs text-gray-400 self-center">+</span>
            )}
          </div>

          <Link
            to={`/projects/${project._id}`}
            className="
              inline-flex items-center justify-center gap-2 
    px-3 py-1.5 rounded-md 
    bg-gray-100 dark:bg-gray-800 
    text-gray-700 dark:text-gray-300 
    font-medium text-xs 
    border border-transparent 
    transition-all duration-200 
    hover:border-gray-200 dark:hover:border-gray-600 
    hover:text-accent dark:hover:text-accent group/btn
            "
          >
            Details
            <FaArrowRight
              size={10}
              className="group-hover/btn:translate-x-1 transition-transform"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
