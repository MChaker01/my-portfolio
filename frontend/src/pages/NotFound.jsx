import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Page not found
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold hover:bg-accent dark:hover:bg-accent hover:text-white dark:hover:text-white transition-all"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
