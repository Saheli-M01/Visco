import React from "react";
import {
  safeValue,
} from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

const BinarySearchVisualizer = ({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  selectedLanguage = "javascript",
}) => {
  const step = sortingSteps[currentStepIndex] || currentStep || {};

  const low = step.low != null ? step.low : null;
  const high = step.high != null ? step.high : null;
  const mid = step.mid != null ? step.mid : null;
  const target = step.target != null ? step.target : null;

  // Show low during the `set-low` phase, and high during the `set-high` phase.
  // Other phases may show nothing (handled elsewhere).
  const showLow = step.phase === "set-low" && low !== null;
  const showHigh = step.phase === "set-high" && high !== null;

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <div className="mt-3 flex items-center justify-center gap-4 w-full">
        {showLow && <VariableCard label="low" value={low} bgColor="bg-sky-300" />}
        {showHigh && <VariableCard label="high" value={high} bgColor="bg-orange-300" />}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
