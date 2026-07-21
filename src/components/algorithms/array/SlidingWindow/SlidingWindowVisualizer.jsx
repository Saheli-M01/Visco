// Copyright (c) 2026 Saheli Mondal.

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

  // maxArea - hide in start and completed phases
  let maxAreaObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.maxArea === "number") {
      maxAreaObj = { value: step.maxArea };
    }
    if (!maxAreaObj) {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["maxArea"]);
      if (persisted !== null && persisted !== undefined) {
        maxAreaObj = { value: persisted };
      }
    }
  }

  // left pointer - hide in start, maxArea-init, and completed phases
  let leftObj = null;
  if (step.phase !== "start" && step.phase !== "maxArea-init" && step.phase !== "completed") {
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

  // right pointer - hide in start, maxArea-init, and completed phases
  let rightObj = null;
  if (step.phase !== "start" && step.phase !== "maxArea-init" && step.phase !== "completed") {
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

  // width - show only in calculation/update phases; hide in while-ends & completed
  let widthObj = null;
  if (["width-init", "h-init", "area-init", "compare-max", "update-max", "no-update"].includes(step.phase) && step.phase !== "while-ends" && step.phase !== "completed") {
    if (typeof step.width === "number") {
      widthObj = { value: step.width };
    }
  }
  if (!widthObj && step.phase !== "while-ends" && step.phase !== "completed") {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["width"]);
    if (persisted !== null && persisted !== undefined) {
      widthObj = { value: persisted };
    }
  }

  // height - show only in calculation/update phases; hide in while-ends & completed
  let heightObj = null;
  if (["h-init", "area-init", "compare-max", "update-max", "no-update"].includes(step.phase) && step.phase !== "while-ends" && step.phase !== "completed") {
    if (typeof step.height === "number") {
      heightObj = { value: step.height };
    }
  }
  if (!heightObj && step.phase !== "while-ends" && step.phase !== "completed") {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["height"]);
    if (persisted !== null && persisted !== undefined) {
      heightObj = { value: persisted };
    }
  }

  // currentArea - show only in calculation/update phases; hide in while-ends & completed
  let currentAreaObj = null;
  if (["area-init", "compare-max", "update-max", "no-update"].includes(step.phase) && step.phase !== "while-ends" && step.phase !== "completed") {
    if (typeof step.currentArea === "number") {
      currentAreaObj = { value: step.currentArea };
    }
  }
  if (!currentAreaObj && step.phase !== "while-ends" && step.phase !== "completed") {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["currentArea"]);
    if (persisted !== null && persisted !== undefined) {
      currentAreaObj = { value: persisted };
    }
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
            label="h"
            value={heightObj.value}
            bgColor="bg-orange-300"
          />
        )}
        
        {currentAreaObj && (
          <VariableCard
            label="area"
            value={currentAreaObj.value}
            bgColor="bg-yellow-300"
          />
        )}
      </div>
    </div>
  );
};

export default SlidingWindowVisualizer;