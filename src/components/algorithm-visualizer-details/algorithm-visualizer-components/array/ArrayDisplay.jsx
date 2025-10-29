import React from "react";
import BinarySearchVisualizer from "../../../algorithms/array/BinarySearch/BinarySearchVisualizer";
import DutchFlagVisualizer from "../../../algorithms/array/Dutch/dutchFlagVisualizer";
import KadanesVisualizer from "../../../algorithms/array/Kadanes/kadanesVisualizer";

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

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-code-bg rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
        <div className="flex flex-col items-center w-full">
          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isComparing = comparingIndices.includes(index) && !isSwapPhase;

              const baseClass = isComparing
                ? "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse"
                : "bg-gray-700 text-white border-gray-600";

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

        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
