// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { parseIndexFromDesc, findPersistedValue, safeValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

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
  // insertion sort generator doesn't use swap phases; remove swap-phase logic
  const isSwapPhase = false;

  // Key
  let keyObj = step.key || null;

  // insertion i/j
  let insertionIObj = null;
  let insertionJObj = null;

  if (step.insertionI !== undefined) insertionIObj = { value: safeValue(step.insertionI) };
  if (step.insertionJ !== undefined) insertionJObj = { value: step.insertionJ };

  if (!insertionJObj && step.j !== undefined) insertionJObj = { value: safeValue(step.j.value ?? step.j) };

  if (!insertionIObj || !insertionJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!insertionIObj) {
        if (st.insertionI !== undefined) insertionIObj = { value: safeValue(st.insertionI) };
        else if (st.i !== undefined) insertionIObj = { value: safeValue(st.i) };
      }
      if (!insertionJObj) {
        if (st.insertionJ !== undefined) insertionJObj = { value: safeValue(st.insertionJ) };
        else if (st.j !== undefined) insertionJObj = { value: safeValue(st.j.value ?? st.j) };
      }
      if (insertionIObj && insertionJObj) break;
    }
  }

  // Try to recover persisted i/j first (helps for early frames like key_value)
  if (!insertionIObj) {
    const persistedI = findPersistedValue(sortingSteps, currentStepIndex, ['insertionI', 'i']);
    if (persistedI !== null) insertionIObj = { value: safeValue(persistedI) };
  }
  if (!insertionJObj) {
    const persistedJ = findPersistedValue(sortingSteps, currentStepIndex, ['insertionJ', 'j']);
    if (persistedJ !== null) insertionJObj = { value: safeValue(persistedJ) };
  }

  // Try parsing i/j from description (fallback)
  if (!insertionIObj) {
    const parsedI = parseIndexFromDesc(step.description, 'i');
    if (parsedI !== null) insertionIObj = { value: parsedI };
  }
  if (!insertionJObj) {
    const parsedJ = parseIndexFromDesc(step.description, 'j');
    if (parsedJ !== null) insertionJObj = { value: parsedJ };
  }



  // Ensure key persists across relevant steps if not present now
  if (!keyObj) {
    const persistedKey = findPersistedValue(sortingSteps, currentStepIndex, 'key');
    if (persistedKey) keyObj = persistedKey;
  }

  // Don't unmount the visualizer on completed; only hide the insertion `i` variable
  // The user requested that only `i` be hidden on the completed step while other
  // variable cards (j, key) may still be visible.
  if (isDone) {
    insertionIObj = null;
    insertionJObj = null;
    keyObj = null;
  }

  // As a last-resort fallback, if i is still missing but keyObj exists, try to
  // derive i by locating the key value in the currentArray. This works for most
  // small/unique arrays used in the visualizer demos. Only apply when we don't
  // already have insertionIObj and we're not on the completed step.
  if (!insertionIObj && !isDone && keyObj) {
    const keyVal = safeValue(keyObj.value ?? keyObj);
    const foundIndex = currentArray.findIndex((v) => safeValue(v) === keyVal);
    if (foundIndex >= 0) insertionIObj = { value: foundIndex };
  }

  // Determine if this is an insertion context
  const insertionPhases = new Set(["insert", "decrement", "while_exit", "inner_loop", "outer_loop"]);
  // Use derived objects when deciding whether to render
  const isInsertionContext = insertionPhases.has(step.phase) || !!keyObj || !!insertionJObj || !!insertionIObj;

  if (!isInsertionContext) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {insertionIObj && (
        <VariableCard label="i" value={insertionIObj.value} bgColor="bg-sky-300" />
      )} {keyObj && (
        <VariableCard label="key" value={keyObj.value ?? keyObj} bgColor="bg-rose-300" />
      )}
      {insertionJObj && (
        <VariableCard label="j" value={insertionJObj.value} bgColor="bg-fuchsia-300" />
      )}
    
    </div>
  );
}
