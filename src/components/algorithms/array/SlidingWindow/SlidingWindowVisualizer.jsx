import React from "react";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const SlidingWindowVisualizer = ({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};

  // maxArea - tracks the maximum area found so far
  let maxAreaObj = null;
  if (typeof step.maxArea === "number") {
    maxAreaObj = { value: step.maxArea };
  }
  if (!maxAreaObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["maxArea"]);
    if (persisted !== null && persisted !== undefined) {
      maxAreaObj = { value: persisted };
    }
  }

  // left pointer - hide in start and completed phases
  let leftObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.left === "number") {
      leftObj = { value: step.left };
    }
    if (!leftObj) {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["left"]);
      if (persisted !== null && persisted !== undefined) {
        leftObj = { value: persisted };
      }
    }
  }

  // right pointer - hide in start and completed phases
  let rightObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.right === "number") {
      rightObj = { value: step.right };
    }
    if (!rightObj) {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["right"]);
      if (persisted !== null && persisted !== undefined) {
        rightObj = { value: persisted };
      }
    }
  }

  // currentArea - only show during calculation phases
  let currentAreaObj = null;
  if (typeof step.currentArea === "number") {
    currentAreaObj = { value: step.currentArea };
  }

  // width - only show during calculation
  let widthObj = null;
  if (typeof step.width === "number") {
    widthObj = { value: step.width };
  }

  // height - only show during calculation
  let heightObj = null;
  if (typeof step.height === "number") {
    heightObj = { value: step.height };
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {maxAreaObj && (
          <VariableCard
            label="maxArea"
            value={maxAreaObj.value}
            bgColor="bg-green-300"
          />
        )}
        
        {leftObj && (
          <VariableCard
            label="left"
            value={leftObj.value}
            bgColor="bg-blue-300"
          />
        )}
        
        {rightObj && (
          <VariableCard
            label="right"
            value={rightObj.value}
            bgColor="bg-purple-300"
          />
        )}
        
        {widthObj && (
          <VariableCard
            label="width"
            value={widthObj.value}
            bgColor="bg-cyan-300"
          />
        )}
        
        {heightObj && (
          <VariableCard
            label="height"
            value={heightObj.value}
            bgColor="bg-orange-300"
          />
        )}
        
        {currentAreaObj && (
          <VariableCard
            label="currentArea"
            value={currentAreaObj.value}
            bgColor="bg-yellow-300"
          />
        )}
      </div>
    </div>
  );
};

export default SlidingWindowVisualizer;