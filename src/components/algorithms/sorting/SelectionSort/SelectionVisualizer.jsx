import React from "react";
import { safeValue, findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

export default function SelectionVisualizer({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";
  const isSwapPhase = ["swap", "swap_step"].includes(step.phase);

  let selectionIObj = null;
  let selectionJObj = null;

  if (step.selectionI !== undefined) selectionIObj = { value: step.selectionI };
  if (step.selectionJ !== undefined) selectionJObj = { value: step.selectionJ };

  if (!selectionIObj || !selectionJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!selectionIObj && st.selectionI !== undefined) selectionIObj = { value: st.selectionI };
      if (!selectionJObj && st.selectionJ !== undefined) selectionJObj = { value: st.selectionJ };
      if (selectionIObj && selectionJObj) break;
    }
  }

  // Hide selection j during swap phases and outer_loop
  if (isSwapPhase || step.phase === "outer_loop") selectionJObj = null;

  let minObj = step.min;
  if (!minObj && step.phase === "min_update" && step.comparing?.length > 0) {
    const mi = step.comparing[0];
    if (mi >= 0 && mi < currentArray.length) minObj = { value: currentArray[mi], index: mi };
  }
  if (!minObj) minObj = findPersistedValue(sortingSteps, currentStepIndex - 1, ["min"]);
  if (step.phase === "outer_loop") minObj = null;

  const isSelectionContext = !!minObj || step.selectionI !== undefined || step.selectionJ !== undefined;
  if (isDone || !isSelectionContext) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {selectionIObj && <VariableCard label="i" value={selectionIObj.value} bgColor="bg-sky-300" />}
      {selectionJObj && <VariableCard label="j" value={selectionJObj.value} bgColor="bg-fuchsia-300" />}
      {minObj && <VariableCard label="minIndex" value={minObj.index} bgColor="bg-orange-300" />}
    </div>
  );
}
