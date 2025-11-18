import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCheck,
  FaCopy,
} from "react-icons/fa";
import SplitText from "../components/SplitText";
import Section from "../components/Section";
import TechStack from "../components/home/TechStack";
import Resume from "../components/home/Resume";
import SelectedWork from "../components/home/SelectedWork";
import photo from "../images/photo.png";

const Home = () => {
  const socialLinks = [
    { name: "GitHub", url: "https://github.com/MChaker01", icon: <FaGithub /> },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/mchakerouaaddi",
      icon: <FaLinkedin />,
    },
    {
      name: "Email",
      url: "mailto:med18chaker@gmail.com",
      icon: <FaEnvelope />,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("med18chaker@gmail.com");
    setCopied(true);

    // Reset back to normal after 2 seconds
    setTimeout(() => setCopied(false), 2000);

    // Still try to open mail client
    window.location.href = "mailto:med18chaker@gmail.com";
  };

  return (
    <div className="w-full pt-10 pb-20 max-w-4xl mx-auto">
      {/* HERO SECTION */}
      <section className="mb-24 md:mb-32">
        {/* Blur/Fade entrance */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)", y: -20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 inline-block relative"
        >
          {/* Optional: Decorative ring for the profile pic */}
          <div className="absolute -inset-2 bg-accent/20 rounded-full blur-xl opacity-50 dark:opacity-30"></div>
          <img
            src={photo}
            alt="Profile"
            className="relative w-28 h-28 md:w-36 md:h-36 object-cover drop-shadow-2xl -rotate-3 hover:rotate-0 transition-transform duration-300 ease-out"
          />
        </motion.div>

        {/* SPLIT TEXT TITLE */}
        <div className="mb-6">
          <SplitText
            text="Software Engineer,"
            className="text-4xl  md:text-6xl font-bold tracking-tighter leading-tight text-gray-900 dark:text-text-main"
          />
          <SplitText
            text="solving complex problems with modern tech."
            className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-gray-500 dark:text-gray-400"
            delay={0.5}
          />
        </div>

        {/* BIO */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 dark:text-text-muted mb-10 max-w-2xl leading-relaxed"
        >
          I am a Full Stack Developer based in Morocco. I have successfully
          completed{" "}
          <span className="text-accent font-semibold">
            6 major engineering projects
          </span>{" "}
          mastering the MERN stack. I focus on performance, scalability, and
          clean architecture.
        </motion.p>

        {/* LINKS */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.6 },
            },
          }}
          className="flex flex-wrap gap-4"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={fadeInUp}
              className="
                flex items-center gap-2 px-4 py-2 rounded-md 
        bg-white dark:bg-gray-800 
        text-gray-700 dark:text-gray-300 
        font-medium text-sm
        border border-gray-200 dark:border-transparent
        transition-all duration-200 
        hover:border-gray-300 dark:hover:border-gray-600
        hover:text-accent dark:hover:text-accent"
            >
              <span className="text-lg">{link.icon}</span>
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* SELECTED WORK SECTION */}
      <Section delay={0.1}>
        <SelectedWork />
      </Section>

      {/* TECH STACK SECTION */}
      <Section delay={0.2}>
        <TechStack />
      </Section>

      {/* RESUME SECTION */}
      <Section delay={0.2}>
        <Resume />
      </Section>

      {/* CTA / CLOSING */}
      <Section className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-text-main mb-4">
          Ready to collaborate?
        </h2>
        <p className="text-gray-600 dark:text-text-muted mb-8 max-w-md mx-auto">
          I am currently open to full-time opportunities. Let's build something
          scalable together.
        </p>

        {/* 3. NEW BUTTON: Logic to Copy Email */}
        <button
          onClick={handleCopyEmail}
          className={`
            inline-flex items-center justify-center gap-3 px-8 py-3 rounded-md
            font-medium text-base
            border transition-all duration-200 cursor-pointer
            ${
              copied
                ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-transparent hover:border-gray-300 dark:hover:border-gray-600 hover:text-accent dark:hover:text-accent"
            }
          `}
        >
          {copied ? (
            <>
              <FaCheck /> Email Copied!
            </>
          ) : (
            <>
              <FaEnvelope /> Get in touch
            </>
          )}
        </button>
      </Section>
    </div>
  );
};

export default Home;
