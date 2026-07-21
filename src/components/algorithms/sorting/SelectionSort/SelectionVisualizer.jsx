// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { safeValue, findPersistedValue, parseIndexFromDesc } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

export default function SelectionVisualizer({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  selectedLanguage = 'javascript',
}) {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";
  const isSwapPhase = ["swap", "swap_step"].includes(step.phase);

  let selectionIObj = null;
  let selectionJObj = null;

  // Try explicit fields first
  if (step.selectionI !== undefined) selectionIObj = { value: step.selectionI };
  if (step.selectionJ !== undefined) selectionJObj = { value: step.selectionJ };

  // Outer-loop / inner-loop markers sometimes include i/j in description or as `i`/`j` fields
  if (!selectionIObj) {
    if (typeof step.i === 'number') selectionIObj = { value: step.i };
    else {
      const parsed = parseIndexFromDesc(step.description, 'i');
      if (parsed !== null) selectionIObj = { value: parsed };
    }
  }

  if (!selectionJObj) {
    if (typeof step.j === 'number' || typeof step.j === 'object') {
      selectionJObj = { value: step.j?.value ?? step.j };
    } else if (Array.isArray(step.comparing) && step.comparing.length > 0) {
      // comparing often carries [minIndex, j]
      const possibleJ = step.comparing[1] ?? step.comparing[0];
      selectionJObj = { value: possibleJ };
    } else {
      const parsedJ = parseIndexFromDesc(step.description, 'j');
      if (parsedJ !== null) selectionJObj = { value: parsedJ };
    }
  }

  // Scan prior steps for persisted selectionI/selectionJ or i/j if missing
  if (!selectionIObj || !selectionJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!selectionIObj) {
        if (st.selectionI !== undefined) selectionIObj = { value: st.selectionI };
        else if (typeof st.i === 'number') selectionIObj = { value: st.i };
        else {
          const p = parseIndexFromDesc(st.description, 'i');
          if (p !== null) selectionIObj = { value: p };
        }
      }
      if (!selectionJObj) {
        if (st.selectionJ !== undefined) selectionJObj = { value: st.selectionJ };
        else if (typeof st.j === 'number' || st.j?.value !== undefined) selectionJObj = { value: st.j?.value ?? st.j };
        else if (Array.isArray(st.comparing) && st.comparing.length > 0) {
          const possibleJ = st.comparing[1] ?? st.comparing[0];
          selectionJObj = { value: possibleJ };
        } else {
          const pj = parseIndexFromDesc(st.description, 'j');
          if (pj !== null) selectionJObj = { value: pj };
        }
      }
      if (selectionIObj && selectionJObj) break;
    }
  }

  // Hide selection j during swap phases and outer_loop
  // Only show `j` while we are in inner-loop / comparison phases. Hide during outer loop, min updates, swaps, etc.
  const jVisiblePhases = ["inner_loop", "comparison", "inner_loop_end", "no_change","min_update"];
  if (isSwapPhase || !jVisiblePhases.includes(step.phase)) selectionJObj = null;

  // Temp handling: read temp from current step or persisted earlier; show only during swap phases
  let tempObj = step.temp ?? null;
  if (!tempObj) tempObj = findPersistedValue(sortingSteps, currentStepIndex, "temp");
  if (!(step.phase === "swap" || step.phase === "swap_step")) tempObj = null;

  let minObj = step.min;
  if (!minObj && step.phase === "min_update" && step.comparing?.length > 0) {
    const mi = step.comparing[0];
    if (mi >= 0 && mi < currentArray.length) minObj = { value: currentArray[mi], index: mi };
  }
  if (!minObj) minObj = findPersistedValue(sortingSteps, currentStepIndex - 1, ["min"]);
  // Keep minObj persisted across phases (including outer_loop) so the minIndex
  // VariableCard remains visible until the algorithm reaches the `completed` phase.

  // Determine whether we have anything to show: min, or derived i/j values
  const isSelectionContext = !!minObj || !!selectionIObj || !!selectionJObj;
  if (isDone || !isSelectionContext) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {selectionIObj && <VariableCard label="i" value={selectionIObj.value} bgColor="bg-sky-300" />}
      
      {minObj && <VariableCard label="minIndex" value={minObj.index} bgColor="bg-orange-300" />}
      {selectionJObj && <VariableCard label="j" value={selectionJObj.value} bgColor="bg-fuchsia-300" />}
      {tempObj && selectedLanguage && ["java", "csharp"].includes(selectedLanguage) && (
        <VariableCard label="temp" value={tempObj.value ?? tempObj} bgColor="bg-yellow-300" />
      )}
    </div>
  );
}
