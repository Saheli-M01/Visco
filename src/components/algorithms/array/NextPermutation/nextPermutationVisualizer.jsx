import React from "react";
import VariableCard from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

export const NextPermutationVisualizer = ({ 
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {}
}) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};

  // ind (pivot index) - tracks the pivot position, starts from initialization and persists until completed
  let indObj = null;
  // Hide only in start and completed phases
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.pivot === "number") {
      indObj = { value: step.pivot };
    }
    // Start showing from initialization phase with value -1
    if (!indObj && (step.phase === "initialization" || step.phase === "find-pivot-start")) {
      indObj = { value: -1 };
    }
    if (!indObj) {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["pivot"]);
      if (persisted !== null && persisted !== undefined) {
        indObj = { value: persisted };
      }
    }
  }

  // n (array length) - show during algorithm except start & completed phases
  let nObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    nObj = { value: currentArray?.length || step.array?.length || 0 };
  }

  // i - loop variable for finding pivot
  let iObj = null;
  if (typeof step.i === "number" && step.phase !== "successor-break") {
    iObj = { value: step.i };
  }

  // j - loop variable for finding successor (unused, kept for reference)
  let jObj = null;
  if (typeof step.j === "number") {
    jObj = { value: step.j };
  }

  // left and right - for reversing suffix
  let leftObj = null;
  if (typeof step.left === "number") {
    leftObj = { value: step.left };
  }

  let rightObj = null;
  if (typeof step.right === "number") {
    rightObj = { value: step.right };
  }

  // temp - temporary variable for swaps (Java/C# only)
  let tempObj = null;
  if (step.temp && typeof step.temp.value !== "undefined") {
    tempObj = { value: step.temp.value, index: step.temp.index };
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
        {nObj && (
          <VariableCard
            label="n"
            value={nObj.value}
            bgColor="bg-purple-300"
          />
        )}
        
        {indObj && (
          <VariableCard
            label="ind"
            value={indObj.value}
            bgColor="bg-sky-300"
          />
        )}
        {iObj && (
          <VariableCard
            label="i"
            value={iObj.value}
            bgColor="bg-orange-300"
          />
        )}
        {jObj && (
          <VariableCard
            label="j"
            value={jObj.value}
            bgColor="bg-pink-300"
          />
        )}
        {leftObj && (
          <VariableCard
            label="left"
            value={leftObj.value}
            bgColor="bg-lime-300"
          />
        )}
        {rightObj && (
          <VariableCard
            label="right"
            value={rightObj.value}
            bgColor="bg-pink-300"
          />
        )}
        {tempObj && (
          <VariableCard
            label="temp"
            value={tempObj.value}
            bgColor="bg-yellow-300"
          />
        )}
      </div>
    </div>
  );
};
