import React from "react";
import BinarySearchVisualizer from "../../../algorithms/array/BinarySearch/BinarySearchVisualizer";
import DutchFlagVisualizer from "../../../algorithms/array/Dutch/dutchFlagVisualizer";
import KadanesVisualizer from "../../../algorithms/array/Kadanes/kadanesVisualizer";
import { NextPermutationVisualizer } from "../../../algorithms/array/NextPermutation/nextPermutationVisualizer";
import SlidingWindowVisualizer from "../../../algorithms/array/SlidingWindow/slidingWindowVisualizer";

const ArrayElement = ({ value, index, styleClass }) => (
  <div key={`${index}-${value}`} className="flex flex-col items-center pt-2">
    <div className={`flex items-center justify-center h-12 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${styleClass}`}>
      <span className="drop-shadow-lg">{value}</span>
    </div>
    <div className="mt-2">
      <span className="text-gray-400 text-sm font-mono">{index}</span>
    </div>
  </div>
);

const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
  selectedAlgorithm = null,
}) => {
  const currentStep = sortingSteps[currentStepIndex] || {};

  const isSwapPhase = ["swap", "swap_step"].includes(currentStep.phase);

  const algoKey = (selectedAlgorithm?.name || "").toLowerCase().replace(/\s+/g, "");

  // For Kadane's algorithm: handle subarray highlighting
  const isKadane = algoKey.includes("kadane");
  const isCompleted = currentStep.phase === "completed";
  const start = currentStep.start;
  const end = currentStep.end;

  // For Next Permutation: highlight pivot, successor, swapped elements
  const isNextPerm = algoKey.includes("nextpermutation");
  const pivot = currentStep.pivot;
  const successor = currentStep.successor;
  const swapped = currentStep.swapped || [];
  const reverseRange = currentStep.reverseRange;

  // For Sliding Window: highlight left and right pointers
  const isSlidingWindow = algoKey.includes("slidingwindow") || algoKey.includes("containerwithmostwater");
  const leftPointer = currentStep.left;
  const rightPointer = currentStep.right;

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-code-bg rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isComparing = comparingIndices.includes(index) && !isSwapPhase;

              // Kadane's algorithm: highlight subarray range
              let baseClass;
              if (isKadane && typeof start === "number" && typeof end === "number" && index >= start && index <= end) {
                // In completed phase, use green; otherwise use yellow/orange
                baseClass = isCompleted
                  ? "bg-amber-400 text-white border-amber-700 scale-105"
                  : "bg-yellow-400 text-gray-900 border-yellow-600";
              } else if (isSlidingWindow) {
                // Sliding Window: highlight left and right pointers
                if (index === leftPointer && typeof leftPointer === "number") {
                  baseClass = "bg-blue-500 text-white border-blue-700 scale-110 shadow-xl";
                } else if (index === rightPointer && typeof rightPointer === "number") {
                  baseClass = "bg-purple-500 text-white border-purple-700 scale-110 shadow-xl";
                } else if (isComparing) {
                  baseClass = "bg-cyan-400 text-white border-cyan-600 scale-105";
                } else {
                  baseClass = "bg-gray-700 text-white border-gray-600";
                }
              } else if (isNextPerm) {
                // Next Permutation: highlight pivot, successor, swapped, reverse range
                if (swapped.includes(index)) {
                  baseClass = "bg-purple-500 text-white border-purple-700 scale-110 animate-pulse";
                } else if (index === pivot && pivot >= 0) {
                  baseClass = "bg-blue-500 text-white border-blue-700 scale-105";
                } else if (index === successor && successor >= 0) {
                  baseClass = "bg-green-500 text-white border-green-700 scale-105";
                } else if (reverseRange && index >= reverseRange[0] && index <= reverseRange[1]) {
                  baseClass = "bg-orange-400 text-white border-orange-600";
                } else if (isComparing) {
                  baseClass = "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse";
                } else {
                  baseClass = "bg-gray-700 text-white border-gray-600";
                }
              } else if (isComparing) {
                baseClass = "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse";
              } else {
                baseClass = "bg-gray-700 text-white border-gray-600";
              }

              return <ArrayElement key={`${index}-${value}`} value={value} index={index} styleClass={baseClass} />;
            })}
          </div>

          {/* Algorithm-specific visualizers */}
          {algoKey.startsWith("binarysearch") && (
            <BinarySearchVisualizer
              currentArray={currentArray}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
              selectedLanguage={selectedLanguage}
            />
          )}

          {algoKey.startsWith("dutchflag") && (
            <DutchFlagVisualizer
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
            />
          )}

          {algoKey.includes("kadane") && (
            <KadanesVisualizer
              currentArray={currentArray}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
              selectedLanguage={selectedLanguage}
            />
          )}

          {algoKey.includes("nextpermutation") && (
            <NextPermutationVisualizer
              currentArray={currentArray}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
            />
          )}

          {(algoKey.includes("slidingwindow") || algoKey.includes("containerwithmostwater")) && (
            <SlidingWindowVisualizer
              currentArray={currentArray}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
            />
          )}

        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
