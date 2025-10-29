import React from "react";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

const KadanesVisualizer = ({ currentArray = [], sortingSteps = [], currentStepIndex = 0, currentStep = {} }) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};

  // If completed, still show final result
  const { currentSum, maxSoFar, start, end } = step;

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <div className="mt-3 flex items-center justify-center gap-4 w-full">
        <VariableCard label="currentSum" value={currentSum} bgColor="bg-sky-300" />
        <VariableCard label="maxSoFar" value={maxSoFar} bgColor="bg-emerald-300" />
        <VariableCard label="start" value={start} bgColor="bg-indigo-300" />
        <VariableCard label="end" value={end} bgColor="bg-orange-300" />
      </div>

    
    </div>
  );
};

export default KadanesVisualizer;
