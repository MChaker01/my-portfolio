import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { getAllSkills } from "../services/skillService";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // The order we want categories to appear
  const categoryOrder = [
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Other",
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(data || []);
      } catch (error) {
        console.error("Error fetching skills:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Helper function to group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    const cat = skill.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="max-w-6xl mx-auto pt-10 pb-20">
      {/* HEADER */}
      <div className="mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-text-main mb-4"
        >
          Technical Skills
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-600 dark:text-text-muted max-w-2xl text-lg"
        >
          A detailed breakdown of my technical stack, organized by domain.
        </motion.p>
      </div>

      {loading ? (
        // Loading Skeletons
        <div className="space-y-12">
          {[1, 2].map((i) => (
            <div key={i}>
              <div className="h-8 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-6 animate-pulse" />
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {[1, 2, 3, 4].map((j) => (
                  <div
                    key={j}
                    className="h-32 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // SKILL CATEGORIES
        <div className="space-y-16">
          {categoryOrder.map((category) => {
            // Only render category if it has skills
            if (
              !groupedSkills[category] ||
              groupedSkills[category].length === 0
            )
              return null;

            return (
              <motion.section
                key={category}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                variants={container}
              >
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center gap-3">
                  <span className="text-accent">#</span> {category}
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
                  {groupedSkills[category].map((skill) => {
                    const imageUrl = skill.skillIcon.startsWith("http")
                      ? skill.skillIcon
                      : `http://localhost:3000${skill.skillIcon}`;

                    return (
                      <motion.div key={skill._id} variants={item}>
                        <Link
                          to={`/skills/${skill._id}`}
                          className="
                            group flex flex-col items-center justify-center 
                            p-6 aspect-square
                            rounded-2xl 
                            bg-white dark:bg-[#121212] 
                            border border-gray-200 dark:border-gray-800 
                            hover:border-accent dark:hover:border-accent
                            transition-all duration-300
                          "
                        >
                          <div className="w-16 h-16 mb-3 flex items-center justify-center">
                            <img
                              src={imageUrl}
                              alt={skill.name}
                              className="
                                w-full h-full object-contain
                                transition-all duration-300
                              "
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {skill.name}
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Skills;
