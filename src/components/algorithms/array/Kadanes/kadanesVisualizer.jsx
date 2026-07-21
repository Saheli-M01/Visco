// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const KadanesVisualizer = ({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};

  // Resolve values: prefer current step, otherwise look back in sortingSteps for the last defined value
  // Follow Dutch visualizer pattern: form an object only when the value appears, else fallback to persisted.
  // This ensures currentSum "forms" first time at its specific phase (currentSum-phase) and then persists.
  let currentSumObj = null;
  if (typeof step.currentSum === "number")
    currentSumObj = { value: step.currentSum };
  if (!currentSumObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, [
      "currentSum",
    ]);
    if (persisted !== null && persisted !== undefined)
      currentSumObj = { value: persisted };
  }

  let maxSoFarObj = null;
  if (typeof step.maxSoFar === "number") maxSoFarObj = { value: step.maxSoFar };
  if (!maxSoFarObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, [
      "maxSoFar",
    ]);
    if (persisted !== null && persisted !== undefined)
      maxSoFarObj = { value: persisted };
  }

  let startObj = null;
  if (typeof step.start === "number") startObj = { value: step.start };
  if (!startObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, [
      "start",
    ]);
    if (persisted !== null && persisted !== undefined)
      startObj = { value: persisted };
  }

  // Loop index i: show during for-loop, hide on for-exit
  let iObj = null;
  if (typeof step.i === "number") iObj = { value: step.i };
  if (!iObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["i"]);
    if (persisted !== null && persisted !== undefined)
      iObj = { value: persisted };
  }
  if (step.phase === "for-exit") iObj = null;

  let endObj = null;
  if (typeof step.end === "number") endObj = { value: step.end };
  if (!endObj) {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, [
      "end",
    ]);
    if (persisted !== null && persisted !== undefined)
      endObj = { value: persisted };
  }

  let sObj = null;
  // Prefer explicit `s` provided by the step
  if (typeof step.s === "number") sObj = { value: step.s };
  // Generator sometimes encodes candidate `s` into `start` during specific phases
  if (
    !sObj &&
    (step.phase === "start_end_s-phase" || step.phase === "update-current") &&
    typeof step.start === "number"
  ) {
    sObj = { value: step.start };
  }
  // As a final fallback, walk backwards to derive the latest candidate `s`
  if (!sObj && Array.isArray(sortingSteps) && sortingSteps.length) {
    for (let k = currentStepIndex; k >= 0; k--) {
      const st = sortingSteps[k];
      if (!st) continue;
      if (typeof st.s === "number") {
        sObj = { value: st.s };
        break;
      }
      if (
        (st.phase === "start_end_s-phase" || st.phase === "update-current") &&
        typeof st.start === "number"
      ) {
        sObj = { value: st.start };
        break;
      }
    }
  }

  // Hide all variables in completed phase
  const isDone = step.phase === "completed";

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      {!isDone && (
        <div className="mt-3 flex flex-wrap items-center justify-center gap-4 w-full">
          {currentSumObj && (
            <VariableCard
              label="currentSum"
              value={currentSumObj.value}
              bgColor="bg-sky-300"
            />
          )}
          {maxSoFarObj && (
            <VariableCard
              label="maxSoFar"
              value={maxSoFarObj.value}
              bgColor="bg-emerald-300"
            />
          )}

          {startObj && (
            <VariableCard
              label="start"
              value={startObj.value}
              bgColor="bg-indigo-300"
            />
          )}

          {endObj && (
            <VariableCard
              label="end"
              value={endObj.value}
              bgColor="bg-orange-300"
            />
          )}

          {sObj && (
            <VariableCard label="s" value={sObj.value} bgColor="bg-violet-300" />
          )}

          {iObj && (
            <VariableCard label="i" value={iObj.value} bgColor="bg-sky-200" />
          )}
        </div>
      )}
    </div>
  );
};

export default KadanesVisualizer;
