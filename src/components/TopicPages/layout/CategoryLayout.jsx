import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/landing";
import {
  Clock,
  ChevronRight,
  ArrowLeft,
  BookOpen,
  Lightbulb,
  BarChart3,
} from "lucide-react";
import {
  FullScreenModalSorting,
  FullScreenModalArray,
  FullScreenModalLinkedList,
} from "@/components/algorithm-visualizer-details";
import AlgorithmCard from "@/components/algorithm-visualizer-details/AlgorithmCard";

const CategoryLayout = ({ category, complexityData, sections }) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("algorithms");
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      // Only respond to search events when explicitly triggered (e.g., from search page navigation)
      // Ignore real-time search updates while on topic pages
      const q = e?.detail?.query || "";
      // Only update if coming from navigation (URL has search param) or search page
      if (
        window.location.pathname === "/search" ||
        window.location.search.includes("q=")
      ) {
        setSearchQuery(q.toLowerCase());
      }
    };
    window.addEventListener("algorithmSearch", handler);
    return () => window.removeEventListener("algorithmSearch", handler);
  }, []);

  // Listen for requests to open a specific algorithm (e.g., Enter in navbar)
  useEffect(() => {
    const openHandler = (e) => {
      const name = e?.detail?.name;
      if (!name) return;
      const match = category.algorithms.find(
        (a) =>
          a.name.toLowerCase() === name.toLowerCase() ||
          a.name.toLowerCase().includes(name.toLowerCase())
      );
      if (match) handleAlgorithmClick(match);
    };
    window.addEventListener("openAlgorithm", openHandler);
    return () => window.removeEventListener("openAlgorithm", openHandler);
  }, [category]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["algorithms", "complexity"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleBack = () => {
    window.history.back();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = isMobile ? 150 : 100;
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-600 bg-green-100/50";
      case "Medium":
        return "text-yellow-600 bg-yellow-100/50";
      case "Hard":
        return "text-red-600 bg-red-100/50";
      default:
        return "text-gray-600 bg-gray-100/50";
    }
  };

  const handleAlgorithmClick = (algorithm) => {
    setSelectedAlgorithm({ algorithm, topic: category });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAlgorithm(null);
  };

  const filteredAlgorithms = category.algorithms.filter((algorithm) => {
    if (!searchQuery) return true;
    return algorithm.name.toLowerCase().includes(searchQuery);
  });

  const sidebarItems = [
    { id: "algorithms", label: "Available Algorithms", icon: BookOpen },
  ];

  if (complexityData && complexityData.length > 0) {
    sidebarItems.push({
      id: "complexity",
      label: "Complexity Comparison",
      icon: BarChart3,
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navigation />

      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-40 px-4 py-3">
        <div className="flex items-center justify-between mb-3"></div>

        <div className="grid grid-cols-3 gap-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition-all ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex">
        {/* Desktop Sidebar (collapsible) */}
        <motion.aside
          initial={false}
          animate={{ width: collapsed ? 72 : 256 }}
          transition={{ duration: 0.28 }}
          className="hidden lg:flex fixed left-0 top-0 h-screen bg-white/80 backdrop-blur-md border-r border-gray-200 z-40 pt-20 pb-8 px-3 flex-col overflow-hidden"
        >
          {/* Top row: Back + collapse toggle */}
          <div className="flex items-center justify-between mb-8 px-2">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-900 font-medium hover:text-gray-700 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {!collapsed && <span>Back</span>}
            </button>

            {/* Collapse toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCollapsed((c) => !c)}
                aria-label={collapsed ? "Open sidebar" : "Close sidebar"}
                className="p-1 rounded hover:bg-gray-100 transition-colors"
              >
                <ChevronRight
                  className={`h-4 w-4 transform transition-transform ${
                    collapsed ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full flex items-center ${
                    collapsed ? "justify-center px-0 py-2" : "items-start"
                  } gap-3 p-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gray-900 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {!collapsed && (
                    <span className="text-sm font-medium">{item.label}</span>
                  )}
                </button>
              );
            })}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <main
          className={`relative overflow-hidden flex-1 ${
            category?.id === "array"
              ? "page-bg-array"
              : category?.id === "sorting"
              ? "page-bg-sorting"
              : category?.id === "linkedList"
              ? "page-bg-linked-list"
              :""
          }`}
          style={{
            marginLeft: isMobile ? 0 : collapsed ? 72 : 256,
            transition: "margin-left 0.28s ease",
          }}
        >
          {/* Animated background grid */}
          <div className="absolute inset-0 opacity-15">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.32) 1px, transparent 1px)`,
                backgroundSize: "3vw 3vw",
              }}
            />
          </div>

          <div
            className="relative z-10 md:pb-24 px-4 sm:px-6 "
            style={{ paddingTop: isMobile ? "140px" : "32px" }}
          >
            <div className="max-w-6xl mx-auto">
              {/* Available Algorithms */}
              <div id="algorithms" className="scroll-mt-5 md:scroll-mt-24 ">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="mb-8 md:mb-16 "
                >
                  {sections && sections.length > 0 ? (
                    // Render with sections
                    <div className="space-y-8">
                      {sections.map((section, sectionIndex) => (
                        <div
                          key={section.title}
                          className="backdrop-blur-md bg-white/80 border border-white/20 rounded-3xl px-3 sm:px-8 py-6 sm:py-8 md:py-12 shadow-xl"
                        >
                          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
                            Available Algorithms
                          </h2>
                          {/* Section header: title + optional description */}
                          <div className="mb-6 px-1">
                            <div className="flex items-start justify-between">
                              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">
                                {section.title}
                              </h3>
                              {section.count !== undefined && (
                                <span className="text-sm text-gray-500 ml-4 hidden sm:inline">
                                  {section.count} algorithms
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                            {section.algorithms.map((algorithm, index) => (
                              <AlgorithmCard
                                key={algorithm.name}
                                algorithm={algorithm}
                                index={index}
                                onClick={handleAlgorithmClick}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    // Render without sections (original behavior)
                    <div className="backdrop-blur-md bg-white/40 border border-white/20 rounded-3xl px-3 sm:px-8 py-6 sm:py-8 md:py-12 shadow-xl">
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                        {filteredAlgorithms.map((algorithm, index) => (
                          <AlgorithmCard
                            key={algorithm.name}
                            algorithm={algorithm}
                            index={index}
                            onClick={handleAlgorithmClick}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Complexity Comparison */}
              {complexityData && complexityData.length > 0 && (
                <div id="complexity" className="scroll-mt-5 md:scroll-mt-24">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="mb-8 md:mb-16"
                  >
                    <div className="backdrop-blur-md bg-white/80 border border-white/60 rounded-3xl px-3 sm:px-8 py-6 sm:py-8 md:py-12 shadow-xl">
                      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">
                        Complexity Comparison
                      </h2>

                      <div className="overflow-x-auto">
                        <table className="w-full text-left min-w-[600px]">
                          <thead>
                            <tr className="border-b border-white/20">
                              <th className="pb-4 text-gray-900 font-semibold text-sm sm:text-base">
                                Algorithm
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center text-sm sm:text-base">
                                Best Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center text-sm sm:text-base">
                                Average Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center text-sm sm:text-base">
                                Worst Case
                              </th>
                              <th className="pb-4 text-gray-900 font-semibold text-center text-sm sm:text-base">
                                Space
                              </th>
                            </tr>
                          </thead>
                          <tbody className="text-gray-700">
                            {complexityData.map((row, index) => (
                              <tr
                                key={row.name}
                                className="border-b border-white/10"
                              >
                                <td className="py-3 font-medium text-sm sm:text-base">
                                  {row.name}
                                </td>
                                <td className="py-3 text-center font-mono text-xs sm:text-sm">
                                  {row.best}
                                </td>
                                <td className="py-3 text-center font-mono text-xs sm:text-sm">
                                  {row.average}
                                </td>
                                <td className="py-3 text-center font-mono text-xs sm:text-sm">
                                  {row.worst}
                                </td>
                                <td className="py-3 text-center font-mono text-xs sm:text-sm">
                                  {row.space}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Algorithm Full-Screen Modal */}
      {category.id === "array" ? (
        <FullScreenModalArray
          isOpen={isModalOpen}
          onClose={closeModal}
          algorithm={selectedAlgorithm?.algorithm}
          topic={selectedAlgorithm?.topic}
        />
      ) : category.id === "linkedList" ? (
        <FullScreenModalLinkedList
          isOpen={isModalOpen}
          onClose={closeModal}
          algorithm={selectedAlgorithm?.algorithm}
          topic={selectedAlgorithm?.topic}
        />
      ) : (
        <FullScreenModalSorting
          isOpen={isModalOpen}
          onClose={closeModal}
          algorithm={selectedAlgorithm?.algorithm}
          topic={selectedAlgorithm?.topic}
        />
      )}
    </div>
  );
};

export default CategoryLayout;
