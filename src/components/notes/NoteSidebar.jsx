import React, { useState, useEffect } from "react";
import { pythonNotes } from "@/data/notes";

import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  ArrowLeft,
  X,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

const NotesSidebar = ({ isOpen, setIsOpen }) => {
  const [activeSection, setActiveSection] = useState(
    pythonNotes[0]?.id || ""
  );

  const [expandedMenus, setExpandedMenus] = useState({
    tokens: true, // default expanded
  });
  const navigate = useNavigate();
  const toggleMenu = (menu) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const container = document.getElementById("notes-scroll-container");
    const element = document.getElementById(id);
    if (container && element) {
      // Get offset relative to the scrolling container
      const topOffset = element.offsetTop;
      container.scrollTo({
        top: topOffset - 32, // Padding at top
        behavior: "smooth",
      });
      setActiveSection(id);

      // Close mobile sidebar on link click
      if (setIsOpen) {
        setIsOpen(false);
      }
    }
  };

  useEffect(() => {
    const container = document.getElementById("notes-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      let currentSection = activeSection;
      const containerTop = container.scrollTop;
      const triggerPoint = containerTop + 100;

      for (let i = 0; i < pythonNotes.length; i++) {
        const section = pythonNotes[i];
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          if (triggerPoint >= elementTop) {
            currentSection = section.id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-slate-200 bg-white p-6 overflow-y-auto transition-transform duration-300 ease-in-out md:static md:block md:translate-x-0 ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* Back Button (Desktop) & Close Button (Mobile) */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition font-medium text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </button>

          {/* Close button for mobile screen */}
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-md text-slate-500 hover:bg-slate-100 transition md:hidden"
            aria-label="Close Sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6 text-indigo-600">
          <BookOpen className="h-5 w-5" />
          <h2 className="text-lg font-bold text-slate-800">
            Python Notes
          </h2>
        </div>

        <nav>
          <ul className="space-y-1">
            {pythonNotes.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <div
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition ${isActive
                      ? "bg-indigo-50 text-indigo-700 border-l-4 border-indigo-600"
                      : "text-slate-650 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                      }`}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleScrollToSection(e, item.id)}
                      className="flex-1"
                    >
                      {item.title}
                    </a>

                    {item.children && (
                      <button
                        onClick={() => toggleMenu(item.id)}
                        className="ml-2"
                      >
                        {expandedMenus[item.id] ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                      </button>
                    )}
                  </div>

                  {item.children && expandedMenus[item.id] && (
                    <ul className="ml-5 mt-1 space-y-1 border-l border-slate-200 pl-3">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <a
                            href={`#${child.id}`}
                            onClick={(e) => handleScrollToSection(e, child.id)}
                            className="block rounded-md px-2 py-1.5 text-sm text-slate-600 hover:bg-slate-100 hover:text-indigo-600"
                          >
                            • {child.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default NotesSidebar;