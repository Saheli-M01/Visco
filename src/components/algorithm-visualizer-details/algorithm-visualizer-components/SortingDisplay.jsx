import React from "react";
import BubbleVisualizer from "../../algorithms/sorting/BubbleSort/BubbleVisualizer";
import InsertionVisualizer from "../../algorithms/sorting/InsertionSort/InsertionVisualizer";
import SelectionVisualizer from "../../algorithms/sorting/SelectionSort/SelectionVisualizer";
import MergeVisualizer, {
  getMergeOverlay,
} from "../../algorithms/sorting/MergeSort/MergeVisualizer";
import QuickVisualizer, {
  getQuickOverlay,
} from "../../algorithms/sorting/QuickSort/QuickVisualizer";
import HeapVisualizer from "../../algorithms/sorting/HeapSort/HeapVisualizer";

const ArrayElement = ({ value, index, styleClass }) => (
  <div
    key={`${index}-${value}`}
    className="flex flex-col items-center pt-2 pb-3"
  >
    <div
      className={`flex items-center justify-center h-12 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${styleClass}`}
    >
      <span className="drop-shadow-lg">{value}</span>
    </div>
    <div className="mt-2">
      <span className="text-gray-400 text-sm font-mono">{index}</span>
    </div>
  </div>
);

/**
 * ArrayDisplay component - Main visualization container for sorting algorithms
 */
const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
  selectedAlgorithm = null,
}) => {
  const currentStep = sortingSteps[currentStepIndex] || {};
  const currentMergeRange = currentStep.mergeRange || null;
  const isSwapPhase = ["swap", "swap_step"].includes(currentStep.phase);

  const mergeOverlay = getMergeOverlay({
    sortingSteps,
    currentStepIndex,
    currentStep,
    currentMergeRange,
    currentArray,
  });
  const quickOverlay = getQuickOverlay({
    sortingSteps,
    currentStepIndex,
    currentStep,
  });
  const currentPivotIndex = quickOverlay.currentPivotIndex;

  // normalize selected algorithm name to a compact key used for matching
  const algoKey = (selectedAlgorithm?.name || "")
    .toLowerCase()
    .replace(/\s+/g, "");

  return (
    <div className="space-y-4 bg-gray-900 rounded-lg min-h-[50vh]">
      <div className="bg-code-bg rounded-lg p-1 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Array Elements */}
          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isMinPhase = currentStep.phase === "min_update";
              const isComparing =
                comparingIndices.includes(index) && !isSwapPhase && !isMinPhase;
              const isSwapped =
                sortingSteps[currentStepIndex]?.swapped?.includes(index);
              const isPivot =
                currentPivotIndex !== null && index === currentPivotIndex;
              const isMergedDone = mergeOverlay.mergedDoneIndices.has(index);

              const baseClass = isComparing
                ? "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse"
                : isSwapped
                ? "bg-teal-400 text-white border-teal-600 scale-105"
                : isPivot
                ? "bg-sky-400 text-white border-sky-600"
                : "bg-gray-700 text-white border-gray-600";

              return (
                <ArrayElement
                  key={`${index}-${value}`}
                  value={value}
                  index={index}
                  styleClass={baseClass}
                />
              );
            })}
          </div>

          {/* Algorithm-Specific Visualizers: only mount the one matching selectedAlgorithm */}
          {algoKey.startsWith("selection") && (
            <SelectionVisualizer
              currentArray={currentArray}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
              selectedLanguage={selectedLanguage}
            />
          )}

          {algoKey.startsWith("bubble") && (
            <BubbleVisualizer
              currentArray={currentArray}
              comparingIndices={comparingIndices}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
            />
          )}

          {algoKey.startsWith("insertion") && (
            <InsertionVisualizer
              currentArray={currentArray}
              comparingIndices={comparingIndices}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
              selectedLanguage={selectedLanguage}
            />
          )}

          {algoKey.startsWith("merge") && (
            <MergeVisualizer
              currentStep={currentStep}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
              currentArray={currentArray}
              currentMergeRange={currentStep.mergeRange || null}
            />
          )}

          {algoKey.startsWith("quick") && (
            <QuickVisualizer
              currentStep={currentStep}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
            />
          )}
          {algoKey.startsWith("heap") && (
            <HeapVisualizer
              currentStep={currentStep}
              sortingSteps={sortingSteps}
              currentStepIndex={currentStepIndex}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
