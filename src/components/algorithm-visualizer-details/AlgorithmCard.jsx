// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { motion } from "framer-motion";
import { Clock, Info, Play } from "lucide-react";

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-700 bg-green-200/70 border border-green-500";
    case "Medium":
      return "text-yellow-600 bg-yellow-200/70 border border-yellow-500";
    case "Hard":
      return "text-red-600 bg-red-200/70 border border-red-500";
    default:
      return "text-gray-600 bg-gray-100/50 border border-gray-500";
  }
};

const getCardBackground = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "bg-gradient-to-br from-emerald-100/60 to-white/80 border-green-100";
    case "Medium":
      return "bg-gradient-to-br from-orange-100/60 to-white/80 border-orange-100";
    case "Hard":
      return "bg-gradient-to-br from-red-100/60 to-white/80 border-red-100";
    default:
      return "bg-white/60 border-white/30";
  }
};

const AlgorithmCard = ({ algorithm, index = 0, onDetails, onVisualize }) => {
  const interactive = [
    "Bubble Sort",
    "Selection Sort",
    "Insertion Sort",
    "Merge Sort",
    "Quick Sort",
    "Heap Sort",
    "Binary Search",
    "Dutch Flag",
    "Kadane's Algorithm",
    "Next Permutation",
    "Sliding Window / 2 pointers (Container With Most Water)",
    "Moore's Voting (Boyer-Moore)",
    "Singly Linked List - Creation",
    "Singly Linked List - Traversal",
    "Singly Linked List - Insertion",
    "Singly Linked List - Deletion"

  ];
  const isInteractive = interactive.includes(algorithm.name);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className={`relative backdrop-blur-sm ${getCardBackground(algorithm.difficulty)} rounded-xl px-4 sm:px-6 py-4 sm:py-6 shadow-md border transition-all ${isInteractive ? "hover:shadow-lg hover:scale-[1.01]" : "opacity-60"
        }`}
    >
      <div className="flex items-center gap-2 mb-3">
        <h3 className={`text-base sm:text-lg font-semibold ${isInteractive ? "text-gray-900" : "text-gray-600"}`}>
          {algorithm.name}
        </h3>
        {isInteractive && (
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onDetails?.(algorithm)}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white/80 p-1.5 text-slate-700 transition hover:border-sky-400 hover:bg-sky-50 hover:text-sky-700"
              aria-label={`View ${algorithm.name} details`}
              title="Details"
            >
              <Info className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => onVisualize?.(algorithm)}
              className="inline-flex items-center justify-center rounded-md bg-slate-900 p-1.5 text-white transition hover:bg-slate-700"
              aria-label={`Visualize ${algorithm.name}`}
              title="Visualize"
            >
              <Play className="h-4 w-4" fill="currentColor" />
            </button>
          </div>
        )}
        {!isInteractive && (
          <span className="text-xs font-medium text-red-400">Coming Soon</span>
        )}
      </div>

      <div className="flex items-center gap-2 sm:gap-3 mb-3">
        <div className="flex items-center bg-white/80 text-gray-800  border border-gray-300/80 px-3 py-1 rounded-full text-xs font-medium">
          <Clock className="h-3 w-3 mr-1" />
          <code className="font-mono text-xs">{algorithm.complexity}</code>
        </div>

        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(algorithm.difficulty)}`}>
          {algorithm.difficulty}
        </span>
      </div>

      <p className="text-gray-700 text-sm font-medium leading-relaxed">
        {algorithm.shortDescription || `Learn about ${algorithm.name} algorithm and its implementation.`}
      </p>


      {/* Work in Progress chip for the specific Singly Linked List - Creation card */}
      {algorithm.name === "" && (
        <div className="absolute bottom-3 right-3">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-amber-800 bg-amber-100/90 border border-amber-200 rounded-full shadow-sm">
            Work in Progress
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default AlgorithmCard;
