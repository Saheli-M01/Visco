import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  BarChart3,
  Code,
  Play,
  BookOpen,
  Zap,
  Podcast,
} from "lucide-react";
import SLLCreationComplexity from "../../algorithms/linked-list/singlyLinkedList/sllCreation/SLLCreationComplexity";
import SLLCreationExample from "../../algorithms/linked-list/singlyLinkedList/sllCreation/SLLCreationExample";
import SLLTraversalComplexity from "../../algorithms/linked-list/singlyLinkedList/sllTraversal/SLLTraversalComplexity";
import SLLTraversalExample from "../../algorithms/linked-list/singlyLinkedList/sllTraversal/SLLTraversalExample";
import SLLInsertionComplexity from "../../algorithms/linked-list/singlyLinkedList/sllInsertion/SLLInsertionComplexity";
import SLLInsertionExample from "../../algorithms/linked-list/singlyLinkedList/sllInsertion/SLLInsertionExample";
import SLLDeletionExample from "../../algorithms/linked-list/singlyLinkedList/sllDeletion/SLLDeletionExample";
import SLLDeletionComplexity from "../../algorithms/linked-list/singlyLinkedList/sllDeletion/SLLDeletionComplexity";

// Dynamic code loaders (lazy import to keep bundle small)
const codeLoaders = {
  "Singly Linked List - Creation": () =>
    import(
      "../../algorithms/linked-list/singlyLinkedList/sllCreation/sllCreationCodes"
    ),
  "Singly Linked List - Traversal": () =>
    import(
      "../../algorithms/linked-list/singlyLinkedList/sllTraversal/sllTraversalCodes"
    ),
  "Singly Linked List - Insertion": () =>
    import(
      "../../algorithms/linked-list/singlyLinkedList/sllInsertion/sllInsertionCodes"
    ),
  "Singly Linked List - Deletion": () =>
    import(
      "../../algorithms/linked-list/singlyLinkedList/sllDeletion/sllDeletionCodes"
    ),
};

// Map algorithm names to their complexity components when available
const complexityComponents = {
  "Singly Linked List - Creation": SLLCreationComplexity,
  "Singly Linked List - Traversal": SLLTraversalComplexity,
  "Singly Linked List - Insertion": SLLInsertionComplexity,
  "Singly Linked List - Deletion": SLLDeletionComplexity,
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
  const [exampleArray, setExampleArray] = useState([]);
  const [examplePasses, setExamplePasses] = useState([]);
  const [exampleTarget, setExampleTarget] = useState(null);

  const ComplexityComponent =
    complexityComponents[algorithm.name] || (() => null);

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
        // Reset and load example data if available in module
        setExampleArray([]);
        setExamplePasses([]);
        setExampleTarget(null);

        if (mod.exampleArray && mod.generateExampleSteps) {
          setExampleArray(mod.exampleArray);
          setExamplePasses(mod.generateExampleSteps(mod.exampleTarget));
          setExampleTarget(mod.exampleTarget || null);
        }
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
    <div className="mx-auto px-3 py-2 flex gap-3 flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:grid-rows-[auto] lg:items-start">
        {/* Left Column: Overview + Implementation */}
        <div className="flex flex-col gap-3 lg:h-[800px]">
          {/* Algorithm Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-3 sm:p-4 shadow-xl flex-shrink-0"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="flex gap-2 items-center">
                  <Podcast className="h-5 w-5 sm:h-6 sm:w-6 text-rose-400 flex-shrink-0" />
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 break-words leading-tight">
                    {algorithm.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span
                  className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getDifficultyColor(
                    algorithm.difficulty
                  )}`}
                >
                  {algorithm.difficulty}
                </span>
                <div className="flex items-center text-gray-600 bg-white/30 px-2 sm:px-3 py-1 rounded-full">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="font-mono text-xs sm:text-sm">
                    {algorithm.complexity}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-medium">
              {algoMeta.description}
            </p>
          </motion.div>

          {/* Implementation */}
          {codeLoaders[algorithm.name] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="backdrop-blur-sm bg-white border border-white/30 rounded-2xl p-3 shadow-xl flex flex-col flex-1 overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
                  <h4 className="text-base sm:text-lg font-semibold text-gray-900">
                    Implementation
                  </h4>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {Object.keys(loadedCodes[algorithm.name] || {}).map(
                    (lang) => (
                      <button
                        key={lang}
                        onClick={() => setImplLang(lang)}
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          implLang === lang
                            ? "bg-gray-900 text-white"
                            : "bg-white/30 text-gray-900"
                        }`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div className="relative flex flex-col flex-1 overflow-hidden">
                <div className="flex flex-1 bg-gray-900 rounded-lg overflow-auto">
                  <pre className="text-gray-100 text-[0.9rem] overflow-auto custom-scrollbar flex-1 w-full whitespace-pre-wrap font-mono px-3 py-2">
                    <code>
                      {loadingCode && !loadedCodes[algorithm.name]
                        ? "Loading implementation..."
                        : (loadedCodes[algorithm.name] || {})[implLang] ||
                          algoMeta.pseudoCode ||
                          "No implementation available."}
                    </code>
                  </pre>
                </div>

                <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center gap-2">
                  <button
                    onClick={() =>
                      copyCode((loadedCodes[algorithm.name] || {})[implLang])
                    }
                    className="px-2 sm:px-3 py-1 bg-white/30 text-gray-100 rounded-md text-xs sm:text-sm font-medium hover:bg-white/50"
                  >
                    Copy
                  </button>
                  {copied && (
                    <span className="text-xs sm:text-sm text-green-400">
                      Copied!
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: How It Works + Example */}
        <div className="flex flex-col gap-3 lg:h-[800px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-3 sm:p-4 shadow-xl flex-shrink-0 max-h-64 overflow-y-auto"
          >
            <div className="flex items-center mb-2">
              <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 mr-2" />
              <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                How It Works
              </h4>
            </div>
            <ol className="space-y-1.5 sm:space-y-2">
              {algoMeta.howItWorks.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 bg-white/30 text-gray-900 rounded-full text-xs sm:text-sm font-bold mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm sm:text-base text-gray-700 font-medium">
                    {step}
                  </span>
                </motion.li>
              ))}
            </ol>
          </motion.div>

          {/* Example Walkthrough */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-3 sm:p-4 shadow-xl flex flex-col flex-1 overflow-hidden"
          >
            {/* Title and Initial Array on same row */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <div className="flex items-center">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600 mr-2" />
                <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Example:
                </h4>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                [{exampleArray.join(", ")}]
              </p>
              {exampleTarget !== null && (
                <span className="text-xs sm:text-sm font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                  Target: {exampleTarget}
                </span>
              )}
            </div>

            {/* Passes visualization */}
            <div className="flex flex-wrap gap-4 overflow-y-auto ">
              {examplePasses.length > 0 ? (
                algorithm.name === "Singly Linked List - Creation" ? (
                  <SLLCreationExample examplePasses={examplePasses} />
                ) : algorithm.name === "Singly Linked List - Traversal" ? (
                  <SLLTraversalExample examplePasses={examplePasses} />
                ) : algorithm.name === "Singly Linked List - Insertion" ? (
                  <SLLInsertionExample examplePasses={examplePasses} />
                ) : algorithm.name === "Next Permutation" &&
                  examplePasses[0]?.steps ? (
                  examplePasses[0].steps.map((step, stepIdx) => (
                    <motion.div
                      key={stepIdx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: stepIdx * 0.08 }}
                      className="border border-blue-200 rounded-lg px-3 py-2 min-w-max"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <h5 className="text-xs sm:text-sm font-bold text-blue-700">
                          Step {stepIdx + 1}
                        </h5>
                      </div>
                      <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                        <span className="text-xs font-medium text-gray-600 min-w-20">
                          {step.swapText}
                        </span>
                        <div className="flex gap-1">
                          {step.array.map((num, idx) => {
                            const isSwapped = step.swapped.includes(idx);
                            return (
                              <motion.div
                                key={idx}
                                animate={
                                  isSwapped ? { scale: [1, 1.15, 1] } : {}
                                }
                                transition={{ duration: 0.2 }}
                                className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded text-xs font-bold ${
                                  isSwapped
                                    ? "bg-orange-400 text-white"
                                    : "bg-gray-300 text-gray-900"
                                }`}
                              >
                                {num}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  examplePasses.map((pass, passIdx) => (
                    <div
                      key={passIdx}
                      className="border border-blue-200 rounded-lg px-3 py-2 min-w-max"
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        <h5 className="text-xs sm:text-sm font-bold text-blue-700">
                          Pass {pass.passNumber}:
                        </h5>
                      </div>

                      {/* Individual swap steps */}
                      {pass.steps.map((step, stepIdx) => (
                        <motion.div
                          key={stepIdx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: passIdx * 0.1 + stepIdx * 0.05,
                          }}
                          className="flex items-center gap-1.5 mb-1.5 ml-1"
                        >
                          <span className="text-xs font-medium text-gray-600 min-w-20">
                            {step.swapText}
                          </span>
                          <div className="flex gap-1">
                            {step.array.map((num, idx) => {
                              const isSorted = pass.sorted.includes(idx);
                              const isSwapped = step.swapped.includes(idx);

                              return (
                                <motion.div
                                  key={idx}
                                  animate={
                                    isSwapped ? { scale: [1, 1.15, 1] } : {}
                                  }
                                  transition={{ duration: 0.2 }}
                                  className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded text-xs font-bold ${
                                    isSorted
                                      ? "bg-green-400 text-white"
                                      : isSwapped
                                      ? "bg-orange-400 text-white"
                                      : "bg-gray-300 text-gray-900"
                                  }`}
                                >
                                  {num}
                                </motion.div>
                              );
                            })}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ))
                )
              ) : (
                <p className="text-xs text-gray-500">
                  No example available for this algorithm
                </p>
              )}
            </div>
          </motion.div>

          {/* Time and Space Complexity */}
          <div className="flex gap-3 flex-shrink-0">
            <div className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-3 shadow-xl w-full">
              <div className="flex items-center mb-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mr-2" />
                <h5 className="text-sm sm:text-base font-semibold text-gray-900">
                  Time Complexity
                </h5>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-700 font-medium">Best:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">
                    {algoMeta.timeComplexity.best}
                  </code>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-700 font-medium">Average:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">
                    {algoMeta.timeComplexity.average}
                  </code>
                </div>
                <div className="flex justify-between items-center gap-2">
                  <span className="text-gray-700 font-medium">Worst:</span>
                  <code className="bg-white/30 px-2 py-0.5 rounded text-gray-900 font-mono">
                    {algoMeta.timeComplexity.worst}
                  </code>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-3 shadow-xl w-full">
              <div className="flex items-center mb-2">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-fuchsia-500 mr-2" />
                <h5 className="text-sm sm:text-base font-semibold text-gray-900">
                  Space Complexity
                </h5>
              </div>
              <code className="bg-white/30 px-3 py-1.5 rounded text-gray-900 font-mono text-xs sm:text-sm inline-block">
                {algoMeta.spaceComplexity}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Time Complexity Analysis Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="backdrop-blur-sm bg-white/90 border border-white/30 rounded-2xl p-4 shadow-xl mt-3"
      >
        <div className="flex items-center gap-3 mb-4">
          <Clock className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl sm:text-3xl font-bold text-gray-900">
            Time Complexity Analysis
          </h2>
        </div>
        <p className="text-gray-600 text-sm sm:text-base mb-4">
          Interactive visualization of time complexity patterns
        </p>
        <ComplexityComponent />
      </motion.div>
    </div>
  );
};

export default LinkedListDetails;
