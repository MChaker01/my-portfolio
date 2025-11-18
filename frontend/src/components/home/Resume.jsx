import React, { useEffect, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { getAllEducation } from "../../services/educationService";
import { getAllExperience } from "../../services/experienceService";
import {
  FaBriefcase,
  FaGraduationCap,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Resume = () => {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eduData, expData] = await Promise.all([
          getAllEducation(),
          getAllExperience(),
        ]);
        setEducation(eduData || []);
        setExperience(expData || []);
      } catch (error) {
        console.error("Error fetching resume data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // --- HELPER: Format Date (e.g., "Jan 2025") ---
  const formatDate = (dateString) => {
    if (!dateString) return "Present";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 gap-10 animate-pulse">
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
        <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl"></div>
      </div>
    );
  }

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-text-main mb-10">
        Experience & Education
      </h3>

      <div className="grid md:grid-cols-2 gap-16">
        {/* EXPERIENCE COLUMN */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h4 className="flex items-center gap-2 text-lg font-bold text-accent mb-8 uppercase tracking-wider">
            <FaBriefcase /> Work History
          </h4>

          {/* TIMELINE CONTAINER */}
          {/* border-l-2 creates the vertical line */}
          <div className="border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
            {experience.length === 0 && (
              <p className="pl-8 text-gray-500">No experience added yet.</p>
            )}

            {experience.map((job) => (
              <motion.div
                key={job._id}
                variants={item}
                className="relative pl-8"
              >
                {/* ring-4 matches background color to create a 'gap' effect if needed, or just clean separation */}
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gray-400 dark:bg-gray-600 ring-4 ring-primary-light dark:ring-primary-dark"></span>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                    {job.title}
                  </h5>
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap mt-1 sm:mt-0 w-fit">
                    {formatDate(job.startDate)} -{" "}
                    {job.isCurrent ? "Present" : formatDate(job.endDate)}
                  </span>
                </div>

                <p className="text-accent font-medium text-sm mb-2">
                  {job.company}
                </p>

                {job.location && (
                  <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
                    <FaMapMarkerAlt /> {job.location}
                  </p>
                )}

                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-3">
                  {job.description}
                </p>

                {/* Tech stack pills */}
                {job.technologies && job.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {job.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* EDUCATION COLUMN */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <h4 className="flex items-center gap-2 text-lg font-bold text-accent mb-8 uppercase tracking-wider">
            <FaGraduationCap /> Education
          </h4>

          <div className="border-l-2 border-gray-200 dark:border-gray-800 ml-3 space-y-12">
            {education.length === 0 && (
              <p className="pl-8 text-gray-500">No education added yet.</p>
            )}

            {education.map((edu) => (
              <motion.div
                key={edu._id}
                variants={item}
                className="relative pl-8"
              >
                {/* THE DOT */}
                <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-gray-400 dark:bg-gray-600 ring-4 ring-primary-light dark:ring-primary-dark"></span>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h5 className="text-lg font-bold text-gray-900 dark:text-white">
                    {edu.school}
                  </h5>
                  <span className="text-xs font-mono text-gray-600 dark:text-gray-400 dark:border-gray-200 dark:bg-gray-800 px-2 py-1 rounded whitespace-nowrap mt-1 sm:mt-0 w-fit">
                    {formatDate(edu.startDate)} -{" "}
                    {edu.endDate ? formatDate(edu.endDate) : "Present"}
                  </span>
                </div>

                <p className="text-accent font-medium text-sm mb-2">
                  {edu.degree} in {edu.fieldOfStudy}
                </p>

                {edu.location && (
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <FaMapMarkerAlt /> {edu.location}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;
