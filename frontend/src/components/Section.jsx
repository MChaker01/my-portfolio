import React from "react";
import { motion } from "framer-motion";

const Section = ({ children, className = "", delay = 0 }) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }} // Animates when 100px into viewport
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={`mb-24 md:mb-32 ${className}`}
    >
      {children}
    </motion.section>
  );
};

export default Section;
