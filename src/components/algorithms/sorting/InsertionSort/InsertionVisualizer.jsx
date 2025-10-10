import React from "react";
import { parseIndexFromDesc, findPersistedValue, safeValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

export default function InsertionVisualizer({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  selectedLanguage = "javascript",
}) {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";
  const isSwapPhase = ["swap", "swap_step"].includes(step.phase);

  // Key
  const keyObj = step.key || null;

  // insertion i/j
  let insertionIObj = null;
  let insertionJObj = null;

  if (step.insertionI !== undefined) insertionIObj = { value: step.insertionI };
  if (step.insertionJ !== undefined) insertionJObj = { value: step.insertionJ };

  if (!insertionJObj && step.j !== undefined) insertionJObj = { value: step.j.value ?? step.j };

  if (!insertionIObj || !insertionJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!insertionIObj) {
        if (st.insertionI !== undefined) insertionIObj = { value: st.insertionI };
        else if (st.i !== undefined) insertionIObj = { value: st.i };
      }
      if (!insertionJObj) {
        if (st.insertionJ !== undefined) insertionJObj = { value: st.insertionJ };
        else if (st.j !== undefined) insertionJObj = { value: st.j.value ?? st.j };
      }
      if (insertionIObj && insertionJObj) break;
    }
  }

  // Hide insertion j during swap phases
  if (isSwapPhase) insertionJObj = null;

  // Temp (for csharp/java) - find persisted temp within the current outer loop if possible
  let tempObj = step.temp;
  if (!tempObj) {
    const outerLoopStart = sortingSteps
      .slice(0, currentStepIndex + 1)
      .reverse()
      .findIndex((st) => st?.phase === "outer_loop");
    const searchStart = outerLoopStart >= 0 ? currentStepIndex - outerLoopStart : currentStepIndex - 1;
    tempObj = findPersistedValue(sortingSteps, searchStart, "temp");
  }

  // Only show temp during actual swap steps
  if (!(step.phase === "swap" || step.phase === "swap_step")) tempObj = null;

  if (isDone) return null;

  // Determine if this is an insertion context
  const insertionPhases = new Set(["insert", "decrement", "while_exit", "inner_loop", "outer_loop"]);
  const isInsertionContext = insertionPhases.has(step.phase) || !!step.key || !!step.j || !!step.insertionI || !!step.insertionJ;

  if (!isInsertionContext) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {insertionIObj && (
        <VariableCard label="i" value={insertionIObj.value} bgColor="bg-sky-300" />
      )}
      {insertionJObj && (
        <VariableCard label="j" value={insertionJObj.value} bgColor="bg-fuchsia-300" />
      )}
      {keyObj && (
        <VariableCard label="key" value={keyObj.value ?? keyObj} bgColor="bg-rose-300" />
      )}
      {tempObj && selectedLanguage && ["csharp", "java"].includes(selectedLanguage) && (
        <VariableCard label="temp" value={tempObj.value ?? tempObj} bgColor="bg-yellow-300" />
      )}
    </div>
  );
}
