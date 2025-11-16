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
import { useAlgorithmCounts } from "../../hooks/useAlgorithmCounts.js";

// Static topic configuration (UI-related data)
const topicConfigs = [
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    gradient: "from-blue-500 via-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    iconBg: "bg-gradient-to-br from-blue-500 to-indigo-600",
    borderColor: "border-blue-200/50",
    hoverBorder: "group-hover:border-blue-300",
    textAccent: "text-blue-600",
    chipBg: "bg-blue-200/80",
    chipText: "text-blue-700",
    description: "Visualize how data gets organized",
    path: "/sorting",
  },
  {
    id: "array",
    title: "Array Algorithms",
    icon: List,
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    iconBg: "bg-gradient-to-br from-emerald-500 to-teal-600",
    borderColor: "border-emerald-200/50",
    hoverBorder: "group-hover:border-emerald-300",
    textAccent: "text-emerald-600",
    chipBg: "bg-emerald-100/80",
    chipText: "text-emerald-700",
    description: "Master array manipulation techniques",
    path: "/array",
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: Link,
    gradient: "from-orange-500 via-red-500 to-pink-600",
    bgGradient: "from-orange-50 to-pink-50",
    iconBg: "bg-gradient-to-br from-orange-500 to-pink-600",
    borderColor: "border-orange-200/50",
    hoverBorder: "group-hover:border-orange-300",
    textAccent: "text-orange-600",
    chipBg: "bg-orange-100/80",
    chipText: "text-orange-700",
    description: "Connect and manipulate node structures",
    path: "/linked-list",
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    icon: Network,
    gradient: "from-purple-500 via-violet-600 to-indigo-600",
    bgGradient: "from-purple-50 to-indigo-50",
    iconBg: "bg-gradient-to-br from-purple-500 to-indigo-600",
    borderColor: "border-purple-200/50",
    hoverBorder: "group-hover:border-purple-300",
    textAccent: "text-purple-600",
    chipBg: "bg-purple-100/80",
    chipText: "text-purple-700",
    description: "Navigate complex network structures",
    path: "/graph",
  },
  {
    id: "tree",
    title: "Tree Algorithms",
    icon: GitBranch,
    gradient: "from-fuchsia-500 via-pink-600 to-rose-600",
    bgGradient: "from-fuchsia-50 to-rose-50",
    iconBg: "bg-gradient-to-br from-fuchsia-500 to-rose-600",
    borderColor: "border-fuchsia-200/50",
    hoverBorder: "group-hover:border-fuchsia-300",
    textAccent: "text-fuchsia-600",
    chipBg: "bg-fuchsia-100/80",
    chipText: "text-fuchsia-700",
    description: "Explore hierarchical data structures",
    path: "/tree",
  },
];

export const Topics = () => {
  const navigate = useNavigate();
  const algorithmCounts = useAlgorithmCounts();

  const topics = topicConfigs.map((config) => ({
    ...config,
    algorithmCount: algorithmCounts[config.id] || 0,
  }));

  const handleTopicClick = (topic) => {
    // Allow navigation for active topics (sorting and array)
    if (
      topic.id === "sorting" ||
      topic.id === "array" ||
      topic.id === "linked-list"
    )
      navigate(topic.path);
  };

  return (
    <section className="relative px-4 py-6 md:py-16 md:px-6 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 overflow-hidden">
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
                onClick={() => handleTopicClick(topic)}
                className={`group ${
                  isActive ? "cursor-pointer" : "cursor-not-allowed"
                }`}
              >
                <motion.div
                  whileHover={
                    isActive ? { y: -8, scale: 1.02 } : { scale: 0.98 }
                  }
                  transition={{ duration: 0.12, ease: "easeOut" }}
                  className={`relative h-full rounded-3xl p-8 transition-all duration-150 ${
                    isActive
                      ? `bg-gradient-to-br ${topic.bgGradient} border-2 ${topic.borderColor} ${topic.hoverBorder} shadow-xl group-hover:shadow-2xl`
                      : "bg-white border-2 border-gray-200/60 shadow-lg opacity-60"
                  }`}
                >
                  {/* Premium gradient overlay */}
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
                        className={`p-2 rounded-sm shadow-lg ${
                          isActive
                            ? topic.iconBg
                            : "bg-gradient-to-br from-gray-300 to-gray-400"
                        }`}
                      >
                        <topic.icon className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Badge or Arrow */}
                      {isActive ? (
                        <motion.div
                          whileHover={{ x: 4 }}
                          transition={{ duration: 0.12 }}
                          className="p-2 rounded-xl bg-white/60 backdrop-blur-sm shadow-md"
                        >
                          <ChevronRight
                            className={`w-5 h-5 ${topic.textAccent} transition-transform group-hover:translate-x-1`}
                          />
                        </motion.div>
                      ) : (
                        <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-800 text-white shadow-md">
                          Coming Soon
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3
                      className={`text-2xl font-bold mb-3 transition-colors ${
                        isActive
                          ? "text-gray-900 group-hover:text-gray-800"
                          : "text-gray-500"
                      }`}
                    >
                      {topic.title}
                    </h3>

                    {/* Description */}
                    <p
                      className={`text-sm mb-6 leading-relaxed ${
                        isActive ? "text-gray-700" : "text-gray-500"
                      }`}
                    >
                      {topic.description}
                    </p>

                    {/* Algorithm count chip */}
                    <div className="flex items-center gap-2 mb-6">
                      <span
                        className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold shadow-sm border ${
                          isActive
                            ? `${topic.chipBg} ${topic.chipText} border-white`
                            : "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                      >
                        <BarChart3 className="w-3.5 h-3.5" />
                        {topic.algorithmCount} algorithms
                      </span>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-gray-900/10">
                      <span
                        className={`text-sm font-semibold ${
                          isActive
                            ? `${topic.textAccent} group-hover:underline`
                            : "text-gray-400"
                        }`}
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
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
