// Copyright (c) 2026 Saheli Mondal.

import { motion } from "framer-motion";
import {
  ArrowUpDown,
  List,
  Network,
  GitBranch,
  Link,
  ChevronRight,
  BarChart3,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  useAlgorithmCounts,
  useInteractiveAlgorithmCounts,
} from "../../hooks/useAlgorithmCounts.js";

// Static topic configuration (UI-related data)
const topicConfigs = [
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    gradient: "from-sky-500 via-blue-600 to-indigo-600",
    bgGradient: "from-sky-50 to-indigo-50",
    glow: "from-sky-100 via-sky-200 to-transparent", // tuned to be visible on light BG
    iconBg: "bg-gradient-to-br from-sky-500 to-indigo-600",
    borderGradient: "from-white via-blue-200 to-white",

    textAccent: "text-blue-600",
    chipGradient: "from-sky-400 via-blue-400 to-indigo-500",
    chipBorderGradient: "from-sky-400 via-blue-300 to-indigo-400",
    chipIconColor: "text-sky-500",
    description: "Visualize how data gets organized",
    path: "/sorting",
  },
  {
    id: "array",
    title: "Array Algorithms",
    icon: List,
    gradient: "from-amber-500 via-amber-600 to-yellow-600",
    bgGradient: "from-amber-50 to-yellow-50",
    glow: "from-amber-100 via-amber-200 to-transparent",
    iconBg: "bg-gradient-to-br from-amber-300 to-yellow-600",
    borderGradient: "from-white via-amber-200 to-white",

    textAccent: "text-amber-600",
    chipGradient: "from-amber-400 via-yellow-400 to-orange-500",
    chipBorderGradient: "from-amber-400 via-yellow-300 to-orange-400",
    chipIconColor: "text-amber-500",
    description: "Master array manipulation techniques",
    path: "/array",
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: Link,
    gradient: "from-orange-500 via-red-500 to-pink-600",
    bgGradient: "from-orange-50 to-pink-50",
    glow: "from-orange-200 via-orange-200 to-transparent",
    iconBg: "bg-gradient-to-br from-orange-500 to-pink-600",
    borderGradient: "from-white via-red-200 to-white",

    textAccent: "text-orange-600",
    chipGradient: "from-orange-400 via-red-400 to-pink-500",
    chipBorderGradient: "from-orange-400 via-red-300 to-pink-400",
    chipIconColor: "text-orange-500",
    description: "Connect and manipulate node structures",
    path: "/linked-list",
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    icon: Network,
    gradient: "from-purple-500 via-violet-600 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    glow: "from-purple-200 via-purple-200 to-transparent",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    borderGradient: "from-white via-violet-200 to-white",

    textAccent: "text-purple-600",
    chipGradient: "from-purple-400 via-violet-400 to-indigo-500",
    chipBorderGradient: "from-purple-400 via-violet-300 to-indigo-400",
    chipIconColor: "text-purple-500",
    description: "Navigate complex network structures",
    path: "/graph",
  },
  {
    id: "tree",
    title: "Tree Algorithms",
    icon: GitBranch,
    gradient: "from-fuchsia-500 via-pink-600 to-rose-600",
    bgGradient: "from-fuchsia-50 to-rose-50",
    glow: "from-fuchsia-200 via-pink-200 to-transparent",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-rose-600",
    borderGradient: "from-white via-pink-200 to-white",

    textAccent: "text-fuchsia-600",
    chipGradient: "from-fuchsia-400 via-pink-400 to-rose-500",
    chipBorderGradient: "from-fuchsia-400 via-pink-300 to-rose-400",
    chipIconColor: "text-fuchsia-500",
    description: "Explore hierarchical data structures",
    path: "/tree",
  },
];

export const Topics = () => {
  const navigate = useNavigate();
  const algorithmCounts = useAlgorithmCounts();
  const interactiveCounts = useInteractiveAlgorithmCounts();

  const topics = topicConfigs.map((config) => ({
    ...config,
    algorithmCount: algorithmCounts[config.id] || 0,
    interactiveStats: interactiveCounts[config.id] || {
      available: 0,
      total: 0,
    },
  }));

  const handleTopicClick = (topic) => {
    // Allow navigation for active topics (sorting, array, linked-list)
    if (
      topic.id === "sorting" ||
      topic.id === "array" ||
      topic.id === "linked-list"
    )
      navigate(topic.path);
  };

  return (
    <section className="relative px-4 py-6 md:py-16 md:px-6 bg-white overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-15">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.24) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0, 0, 0, 0.32) 1px, transparent 1px)`,
            backgroundSize: "3vw 3vw",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className=" border border-white/20 rounded-3xl mb-4 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Choose Your <span className="text-gray-700">Learning Path</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Browse algorithm categories featuring multiple algorithms with
              interactive visualizations and detailed explanations.
            </p>
          </div>
        </motion.div>

        {/* Topics Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const isActive =
              topic.id === "sorting" ||
              topic.id === "array" ||
              topic.id === "linked-list";

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                onClick={isActive ? () => handleTopicClick(topic) : undefined}
                aria-disabled={!isActive}
                className={`group ${
                  isActive ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                {/* Gradient Border Wrapper (subtle dark gradient top-right) */}
                <div
                  className={`relative rounded-3xl p-[2px] bg-gradient-to-br ${topic.borderGradient}`}
                >
                  {/* Actual Card */}
                  <motion.div
                    whileHover={isActive ? { y: -8, scale: 1.02 } : {}}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                    className={`relative h-full rounded-3xl p-8 bg-gradient-to-br ${topic.bgGradient} shadow-xl group-hover:shadow-2xl overflow-hidden`}
                  >
                    {/* Light Glow (under content) */}
                    <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none z-5">
                      <div
                        className={`w-full h-full bg-gradient-radial bg-gradient-to-bl ${topic.glow} blur-lg`}
                        style={{
                          background: `radial-gradient(circle at top right, var(--tw-gradient-stops))`,
                        }}
                      />
                    </div>
                    {/* Premium gradient overlay (very subtle color wash on hover) */}
                    {isActive && (
                      <div
                        className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${topic.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-150`}
                      />
                    )}

                    <div className="relative z-10">
                      {/* Top section */}
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon */}
                        <motion.div
                          whileHover={isActive ? { rotate: 5, scale: 1.1 } : {}}
                          transition={{ duration: 0.12 }}
                          className={`p-2 rounded-sm shadow-lg ${topic.iconBg}`}
                        >
                          <topic.icon className="w-7 h-7 text-white" />
                        </motion.div>

                        {/* Badge or Arrow */}
                        {!isActive && (
                          <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-800 text-white shadow-md relative z-30">
                            Coming Soon
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-2xl font-bold transition-colors text-gray-900">
                          {topic.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-sm mb-6 leading-relaxed text-gray-700">
                        {topic.description}
                      </p>

                      {/* Algorithm count chip */}
                      <div className="flex items-center gap-2 mb-6">
                        {/* Gradient border wrapper */}
                        <div
                          className={`relative inline-flex p-[1.5px] rounded-full bg-gradient-to-br ${topic.chipBorderGradient} shadow-[0_8px_20px_rgba(15,23,42,0.15)]`}
                        >
                          <span
                            className={`relative inline-flex items-center gap-2 p-2 rounded-full text-sm font-semibold text-center transition-transform duration-150 overflow-hidden bg-white`}
                          >
                            <BarChart3
                              className={`w-3.5 h-3.5 ${topic.chipIconColor}`}
                            />
                            <span
                              className={`whitespace-nowrap bg-gradient-to-r ${topic.chipGradient} bg-clip-text text-transparent`}
                            >
                              {topic.interactiveStats.available}/
                              {topic.interactiveStats.total} algorithms
                              available
                            </span>
                          </span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="pt-5 border-t border-gray-900/10">
                        <span
                          className={`text-sm font-semibold ${
                            topic.textAccent
                          } ${isActive ? "group-hover:underline" : ""}`}
                        >
                          {isActive ? "Click to explore →" : "Stay tuned 🚧"}
                        </span>
                      </div>
                    </div>

                    {/* Shine effect on hover */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
