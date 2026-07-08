import React, { useState, useEffect } from "react";
import { pythonNotes } from "@/data/notes";
import { BookOpen } from "lucide-react";

const NotesSidebar = () => {
  const [activeSection, setActiveSection] = useState(pythonNotes[0]?.id || "");

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
    }
  };

  useEffect(() => {
    const container = document.getElementById("notes-scroll-container");
    if (!container) return;

    const handleScroll = () => {
      // Find which section is currently visible at the top of viewport
      let currentSection = activeSection;
      
      // Calculate mid-point of the container for intersection detection
      const containerTop = container.scrollTop;
      const triggerPoint = containerTop + 100;

      for (let i = 0; i < pythonNotes.length; i++) {
        const section = pythonNotes[i];
        const element = document.getElementById(section.id);
        if (element) {
          const elementTop = element.offsetTop;
          
          // Check if trigger point is beyond element top
          if (triggerPoint >= elementTop) {
            currentSection = section.id;
          }
        }
      }
      
      setActiveSection(currentSection);
    };

    // Run once on load to sync initial state
    handleScroll();

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="w-72 border-r border-slate-200 bg-white p-6 overflow-y-auto hidden md:block">
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
                <a
                  href={`#${item.id}`}
                  onClick={(e) => handleScrollToSection(e, item.id)}
                  className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-indigo-50 text-indigo-700 shadow-sm border-l-4 border-indigo-600"
                      : "text-slate-650 hover:bg-slate-50 hover:text-slate-900 border-l-4 border-transparent"
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default NotesSidebar;