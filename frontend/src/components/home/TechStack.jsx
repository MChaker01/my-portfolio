import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllSkills } from "../../services/skillService";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const TechStack = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data || []);
      } catch (error) {
        console.error("Failed to load skills", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="flex flex-wrap gap-6 justify-center md:justify-start">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="h-20 w-20 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Animation Variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.5, y: 10 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 15 },
    },
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-text-main mb-8">
        Technical Arsenal
      </h3>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="flex flex-wrap gap-x-8 gap-y-10 justify-center md:justify-start"
      >
        {skills.length === 0 && (
          <p className="text-gray-500 text-sm italic">No skills found.</p>
        )}

        {skills.map((skill) => {
          // Backend Logic: Construct the full URL
          const imageUrl = skill.skillIcon.startsWith("http")
            ? skill.skillIcon
            : `http://localhost:3000${skill.skillIcon}`;

          return (
            <motion.div
              key={skill._id}
              variants={item}
              className="relative group hover:z-50"
            >
              {/* 
                 2. Wrapped in Link 
                 points to /skills/:id.
              */}
              <Link to={`/skills/${skill._id}`}>
                <div
                  className="
                    w-20 h-20 p-4 
                    bg-white dark:bg-gray-800/50 
                    backdrop-blur-sm
                    border border-gray-300 dark:border-gray-700
                    rounded-2xl 
                    flex items-center justify-center
                    hover:border-accent dark:hover:border-accent
                    transition-all duration-300
                    cursor-pointer
                  "
                >
                  <img
                    src={imageUrl}
                    alt={skill.name}
                    className="
                      w-full h-full object-contain 
                      transition-all duration-300
                    "
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "block";
                    }}
                  />
                  {/* Fallback Text */}
                  <span className="hidden text-xs font-bold text-gray-400 text-center break-all">
                    {skill.name}
                  </span>
                </div>
              </Link>

              {/* TOOLTIP (Skill Name on Hover) */}
              <span
                className="
                absolute -bottom-6 left-1/2 -translate-x-1/2
                opacity-0 group-hover:opacity-100 
                text-xs font-medium text-gray-600 dark:text-gray-300
                transition-opacity duration-300 delay-75
                whitespace-nowrap pointer-events-none
              "
              >
                {skill.name}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

export default TechStack;
