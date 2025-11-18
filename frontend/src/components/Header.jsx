import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { FaBars, FaTimes } from "react-icons/fa"; // Removed FaDownload
import { useTheme } from "../context/ThemeContext";
import darkModeLogo from "../images/dark_mode_logo.png";
import lightModeLogo from "../images/light_mode_logo.png";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMenuOpen]);

  const getLinkClass = (path, isMobile = false) => {
    const isActive =
      path === "/"
        ? location.pathname === "/"
        : location.pathname.startsWith(path);

    const baseClass = "font-medium transition-colors duration-200";
    const colorClass = isActive
      ? "text-accent"
      : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white";

    if (isMobile) {
      return `block py-4 text-lg border-b border-gray-100 dark:border-gray-800 ${baseClass} ${colorClass}`;
    }

    return `text-sm ${baseClass} ${colorClass}`;
  };

  // Helper to close menu (attached to mobile links)
  const handleMobileLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="w-full py-6 relative z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LEFT - Logo */}
        <Link to="/" className="flex items-center z-50">
          <div className="h-8 min-w-12 flex items-center justify-start overflow-hidden">
            <img
              src={theme === "dark" ? darkModeLogo : lightModeLogo}
              alt="Logo"
              width="95"
              height="30"
              className="h-full w-auto object-contain transition-opacity duration-300"
            />
          </div>
        </Link>

        {/* MIDDLE - Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={getLinkClass("/")}>
            Home
          </Link>
          <Link to="/projects" className={getLinkClass("/projects")}>
            Projects
          </Link>
          <Link to="/skills" className={getLinkClass("/skills")}>
            Skills
          </Link>
        </nav>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-4 z-50">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <MdOutlineLightMode size={20} />
            ) : (
              <MdOutlineDarkMode size={20} />
            )}
          </button>

          {/* MOBILE MENU TOGGLE */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-gray-800 dark:text-gray-200 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`
          fixed inset-0 bg-white dark:bg-gray-950 
          z-40 flex flex-col pt-24 px-6
          transition-transform duration-300 ease-in-out md:hidden
          ${isMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <nav className="flex flex-col">
          {/* Added onClick handler to close menu when link is clicked */}
          <Link
            to="/"
            className={getLinkClass("/", true)}
            onClick={handleMobileLinkClick}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={getLinkClass("/projects", true)}
            onClick={handleMobileLinkClick}
          >
            Projects
          </Link>
          <Link
            to="/skills"
            className={getLinkClass("/skills", true)}
            onClick={handleMobileLinkClick}
          >
            Skills
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
