import React, { useState } from "react";
import { motion } from "framer-motion";
import { Clock, BarChart3, Code, Play, BookOpen } from "lucide-react";

// Dynamic code loaders
const codeLoaders = {
  "Singly Linked List": () =>
    import("../../../algorithms/linked-list/singlyLinkedList/singlyLinkedListCodes"),
};

const LinkedListDetails = ({ algorithm, topic }) => {
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

  const [implLang, setImplLang] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [loadedCodes, setLoadedCodes] = useState({});
  const [loadingCode, setLoadingCode] = useState(false);
  const [algoMeta, setAlgoMeta] = useState({
    description: "",
    howItWorks: [],
    timeComplexity: {},
    spaceComplexity: "",
  });

  const copyCode = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  // Load code module for the current algorithm on demand
  React.useEffect(() => {
    let mounted = true;
    const loader = codeLoaders[algorithm.name];
    if (!loader) return;
    setLoadingCode(true);
    loader()
      .then((mod) => {
        if (!mounted) return;
        const codes = mod && (mod.default || mod);
        setLoadedCodes((s) => ({ ...s, [algorithm.name]: codes }));
        if (codes && !codes[implLang])
          setImplLang(Object.keys(codes)[0] || "javascript");
        setAlgoMeta({
          description: mod.description || "",
          howItWorks: mod.howItWorks || [],
          timeComplexity: mod.timeComplexity || {},
          spaceComplexity: mod.spaceComplexity || "",
        });
      })
      .catch((err) => console.error("Failed to load code module", err))
      .finally(() => {
        if (mounted) setLoadingCode(false);
      });
    return () => {
      mounted = false;
    };
  }, [algorithm.name]);

  return (
    <div className="mx-auto px-3">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 sm:gap-6">
        {/* Left: Overview + Implementation */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Algorithm Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2 break-words">
                  {algorithm.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 font-medium">
                  {topic}
                </p>
              </div>
              <span
                className={`${getDifficultyColor(
                  algorithm.difficulty
                )} text-sm font-semibold px-3 py-1 rounded-full self-start whitespace-nowrap`}
              >
                {algorithm.difficulty}
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
              {algoMeta.description || algorithm.description}
            </p>

            {/* How It Works */}
            {algoMeta.howItWorks && algoMeta.howItWorks.length > 0 && (
              <div className="space-y-3 mt-4">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">
                    How It Works
                  </h4>
                </div>
                <ol className="list-decimal list-inside space-y-2 text-sm sm:text-base text-gray-700">
                  {algoMeta.howItWorks.map((step, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </motion.div>

          {/* Implementation Code Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-blue-600" />
              <h4 className="text-base sm:text-lg font-bold text-gray-900">
                Implementation
              </h4>
            </div>

            {loadingCode ? (
              <div className="text-sm text-gray-500">Loading code...</div>
            ) : (
              <>
                {/* Language Selector */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {loadedCodes[algorithm.name] &&
                    Object.keys(loadedCodes[algorithm.name]).map((lang) => (
                      <button
                        key={lang}
                        onClick={() => setImplLang(lang)}
                        className={`px-3 py-1 text-xs sm:text-sm rounded-lg font-medium transition-all ${
                          implLang === lang
                            ? "bg-blue-600 text-white shadow-md"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {lang.charAt(0).toUpperCase() + lang.slice(1)}
                      </button>
                    ))}
                </div>

                {/* Code Block */}
                {loadedCodes[algorithm.name] &&
                loadedCodes[algorithm.name][implLang] ? (
                  <div className="relative">
                    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs sm:text-sm">
                      <code>{loadedCodes[algorithm.name][implLang]}</code>
                    </pre>
                    <button
                      onClick={() =>
                        copyCode(loadedCodes[algorithm.name][implLang])
                      }
                      className="absolute top-2 right-2 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors text-xs text-white"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                ) : (
                  <div className="text-sm text-gray-500">
                    No code available for {implLang}.
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>

        {/* Right: Complexity Analysis */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Time Complexity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-5 h-5 text-blue-600" />
              <h4 className="text-base sm:text-lg font-bold text-gray-900">
                Time Complexity
              </h4>
            </div>
            <div className="space-y-2 sm:space-y-3">
              {algoMeta.timeComplexity &&
              Object.keys(algoMeta.timeComplexity).length > 0 ? (
                Object.entries(algoMeta.timeComplexity).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm text-gray-700 font-medium capitalize">
                      {key}:
                    </span>
                    <code className="text-xs sm:text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">
                      {value}
                    </code>
                  </div>
                ))
              ) : (
                <div className="text-xs sm:text-sm text-gray-500">
                  No complexity data available.
                </div>
              )}
            </div>
          </motion.div>

          {/* Space Complexity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 sm:p-6 shadow-xl"
          >
            <div className="flex items-center gap-2 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h4 className="text-base sm:text-lg font-bold text-gray-900">
                Space Complexity
              </h4>
            </div>
            <code className="text-xs sm:text-sm bg-purple-100 text-purple-800 px-3 py-2 rounded-lg font-mono block text-center">
              {algoMeta.spaceComplexity || "N/A"}
            </code>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListDetails;
