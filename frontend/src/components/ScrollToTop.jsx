import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-8 right-8 z-50 
        p-3 rounded-md
        bg-white dark:bg-gray-800 
        text-gray-700 dark:text-gray-300 
        cursor-pointer
        border border-gray-300 
        dark:border-transparent
        dark:hover:border-gray-600 
        hover:text-accent dark:hover:text-accent 
        /* Animation Props */
        transition-all duration-300 ease-in-out transform
        ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }
      `}
      aria-label="Scroll to top"
    >
      <FaArrowUp size={18} />
    </button>
  );
};

export default ScrollToTop;
