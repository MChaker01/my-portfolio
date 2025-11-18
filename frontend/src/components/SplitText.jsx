import React from "react";
import { motion } from "framer-motion";

const SplitText = ({ text, className, delay = 0 }) => {
  // Split text into words first to handle spacing correctly
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay,
      },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "flex", flexWrap: "wrap" }}
      variants={container}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          style={{ marginRight: "0.25em", display: "inline-block" }} // Handle word spacing
          className="whitespace-nowrap"
        >
          {/* Split word into letters */}
          {word.split("").map((letter, index) => (
            <motion.span
              variants={child}
              key={index}
              style={{ display: "inline-block" }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default SplitText;
