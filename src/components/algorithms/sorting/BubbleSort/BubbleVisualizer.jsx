// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { parseIndexFromDesc, findPersistedValue, safeValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

export default function BubbleVisualizer({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";

  // Compute bubble i/j using robust fallbacks
  let bubbleIObj = null;
  let bubbleJObj = null;

  // Prefer explicit numeric fields emitted by the algorithm
  if (typeof step.i === "number") bubbleIObj = { value: step.i };
  if (typeof step.j === "number") bubbleJObj = { value: step.j };

  // Parse from descriptions if explicit fields not present
  if (!bubbleIObj) {
    const parsed = parseIndexFromDesc(step.description, "i");
    if (parsed !== null) bubbleIObj = { value: parsed };
  }
  if (!bubbleJObj) {
    const parsedJ = parseIndexFromDesc(step.description, "j");
    if (parsedJ !== null) bubbleJObj = { value: parsedJ };
  }

  // Use comparing indices as j (comparison compares j and j+1)
  if (!bubbleJObj && Array.isArray(step.comparing) && step.comparing.length > 0) {
    bubbleJObj = { value: step.comparing[0] };
  }

  // Find persisted values in earlier steps if still missing
  if (!bubbleIObj) {
    const persistedI = findPersistedValue(sortingSteps, currentStepIndex, ["i"]);
    if (persistedI !== null) bubbleIObj = { value: persistedI };
  }
  if (!bubbleJObj) {
    const persistedJ = findPersistedValue(sortingSteps, currentStepIndex, ["j"]);
    if (persistedJ !== null) bubbleJObj = { value: persistedJ };
  }

  // Hide bubble j during outer_loop
  if (step.phase === "outer_loop") {
    bubbleJObj = null;
  }

  // Temp (for languages that use a temporary variable) - try to read from current step or earlier persisted steps
  let tempObj = step.temp ?? null;
  if (!tempObj) {
    tempObj = findPersistedValue(sortingSteps, currentStepIndex, "temp");
  }

  // Only show temp during swap phases
  if (!(step.phase === "swap" || step.phase === "swap_step")) tempObj = null;

  if (isDone) return null;

  // Determine if this is the bubble context; include swap phases so temp can be shown
  const isBubbleContext =
    step.phase === "outer_loop" ||
    step.phase === "inner_loop" ||
    step.phase === "swap" ||
    step.phase === "swap_step" ||
    (Array.isArray(step.comparing) && step.comparing.length > 0);

  // If not in a bubble-related context and not showing temp, bail out
  if (!isBubbleContext) return null;

  // If there is nothing to show (no i, j, or temp) then return
  if (!bubbleIObj && !bubbleJObj && !tempObj) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {bubbleIObj && (
        <VariableCard label="i" value={bubbleIObj.value} bgColor="bg-sky-300" />
      )}
      {bubbleJObj && (
        <VariableCard label="j" value={bubbleJObj.value} bgColor="bg-fuchsia-300" />
      )}
      {tempObj && (
        <VariableCard label="temp" value={tempObj.value ?? tempObj} bgColor="bg-yellow-300" />
      )}
    </div>
  );
}
