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


const ArrayElement = ({ value, index, styleClass }) => (
  <div key={`${index}-${value}`} className="flex flex-col items-center">
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
}) => {
  return (
    <div className="space-y-4 bg-gray-900 rounded-lg min-h-[50vh]">
      <div className="bg-code-bg rounded-lg p-1 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Array Elements */}
          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              return (
                <ArrayElement
                  key={`${index}-${value}`}
                  value={value}
                  index={index}
                  styleClass={styleClass}
                />
              );
            })}
          </div>

          {/* Algorithm-Specific Visualizers */}
          <SelectionVisualizer
            currentArray={currentArray}
            sortingSteps={sortingSteps}
            currentStepIndex={currentStepIndex}
            currentStep={currentStep}
          />

          <BubbleVisualizer
            currentArray={currentArray}
            comparingIndices={comparingIndices}
            sortingSteps={sortingSteps}
            currentStepIndex={currentStepIndex}
            currentStep={currentStep}
          />

          <InsertionVisualizer
            currentArray={currentArray}
            comparingIndices={comparingIndices}
            sortingSteps={sortingSteps}
            currentStepIndex={currentStepIndex}
            currentStep={currentStep}
            selectedLanguage={selectedLanguage}
          />

          <MergeVisualizer
            currentStep={currentStep}
            sortingSteps={sortingSteps}
            currentStepIndex={currentStepIndex}
            currentArray={currentArray}
            currentMergeRange={currentStep.mergeRange || null}
          />

          <QuickVisualizer
            currentStep={currentStep}
            sortingSteps={sortingSteps}
            currentStepIndex={currentStepIndex}
          />
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
