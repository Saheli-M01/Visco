// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import {
  safeValue,
  findPersistedValue,
} from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

const BinarySearchVisualizer = ({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  selectedLanguage = "javascript",
}) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";

  // Only form low after a 'set-low' step has occurred, and high after a 'set-high' step.
  // Once formed, prefer the numeric value on the current step (so changes like move_low/move_high
  // are reflected immediately). If current step doesn't provide it, fall back to the most recent
  // persisted value.
  const hasSetterOccurred = (name) => {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.phase === `set-${name}`) return true;
    }
    return false;
  };

  let low = null;
  if (hasSetterOccurred("low")) {
    if (typeof step.low === "number") {
      low = step.low;
    } else {
      const persistedLow = findPersistedValue(sortingSteps, currentStepIndex, "low");
      if (persistedLow !== null) low = persistedLow;
    }
  }

  let high = null;
  if (hasSetterOccurred("high")) {
    if (typeof step.high === "number") {
      high = step.high;
    } else {
      const persistedHigh = findPersistedValue(sortingSteps, currentStepIndex, "high");
      if (persistedHigh !== null) high = persistedHigh;
    }
  }

  // mid should only form when produced in the 'set-mid' phase. Persist it from that phase
  // until completion.
  let mid = null;
  const target = step.target != null ? step.target : null;
  if (step.phase === "set-mid" && typeof step.mid === "number") {
    mid = step.mid;
  } else {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.phase === "set-mid" && typeof st.mid === "number") {
        mid = st.mid;
        break;
      }
    }
  }
  // Persist low/high until the completed phase; hide everything when done
  if (isDone) return null;

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <div className="mt-3 flex items-center justify-center gap-4 w-full">
        {low !== null && (
          <VariableCard label="low" value={low} bgColor="bg-sky-300" />
        )}
        {high !== null && (
          <VariableCard label="high" value={high} bgColor="bg-orange-300" />
        )}
        {mid !== null && (
          <VariableCard label="mid" value={mid} bgColor="bg-teal-300" />
        )}
      </div>
    </div>
  );
};

export default BinarySearchVisualizer;
