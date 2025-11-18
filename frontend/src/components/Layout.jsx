import { Outlet } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="min-h-screen w-full flex flex-col font-sans">
      {/* 1. THE BACKGROUND LAYER */}
      {/* Light Mode: Soft Gray | Dark Mode: Deep Charcoal */}
      <div className="fixed inset-0 z-[-1] bg-primary-light dark:bg-primary-dark transition-colors duration-300"></div>

      {/* 2. THE TEXTURE LAYER (The "Eke" grainy look) */}
      <div className="bg-noise"></div>

      {/* 3. THE CONTENT LAYER */}
      {/* z-10 ensures content sits above the background texture */}
      <div className="relative z-10 flex flex-col min-h-screen text-gray-900 dark:text-text-main">
        <Header />

        <main className="grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Outlet renders the current page (Home, Projects, etc.) */}
          <Outlet />
        </main>

        {/* Optional Footer can go here */}
        <footer className="text-center py-6 text-sm text-gray-500 dark:text-text-muted">
          © {new Date().getFullYear()} Made with ❤ by MChaker.
        </footer>

        <ScrollToTop />
      </div>
    </div>
  );
};

export default Layout;
