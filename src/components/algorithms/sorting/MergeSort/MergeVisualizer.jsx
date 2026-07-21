// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import {
  safeValue,
  rangeMatches,
  findPersistedValue,
} from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

export default function MergeVisualizer({
  currentStep = {},
  sortingSteps = [],
  currentStepIndex = 0,
  currentArray = [],
  currentMergeRange = null,
}) {
  // helpers imported from shared/stepHelpers

  // Determine effective merge range
  const effectiveMergeRange =
    currentMergeRange ||
    findPersistedValue(sortingSteps, currentStepIndex, "mergeRange");

  const mergeScopeCheck = (st) =>
    !st.mergeRange ||
    !effectiveMergeRange ||
    rangeMatches(st.mergeRange, effectiveMergeRange);

  // mid
  const midObj =
    currentStep.mid ??
    findPersistedValue(sortingSteps, currentStepIndex, "mid");

  // left/right
  const leftVarObj =
    // Do not surface left variable during call frame announcements
    currentStep.phase === "call-left" ||
    currentStep.phase === "call-right" ||
    currentStep.phase === "condition-check" ||
    currentStep.phase === "calculate-mid" ||
    currentStep.phase === "base"
      ? null
      : currentStep.leftVar ??
        findPersistedValue(
          sortingSteps,
          currentStepIndex,
          ["leftVar", "leftPtr"],
          mergeScopeCheck
        );
  const rightVarObj =
    // Do not surface right variable during call frame announcements
    currentStep.phase === "call-left" ||
    currentStep.phase === "call-right" ||
    currentStep.phase === "condition-check" ||
    currentStep.phase === "calculate-mid" ||
    currentStep.phase === "base"
      ? null
      : currentStep.rightVar ??
        (typeof currentStep.rightPtr === "number"
          ? { value: currentStep.rightPtr }
          : null) ??
        findPersistedValue(
          sortingSteps,
          currentStepIndex,
          ["rightVar", "rightPtr"],
          mergeScopeCheck
        );

  // i variable
  let iVarObj =
    currentStep.iVar ??
    (typeof currentStep.i === "number" ? { value: currentStep.i } : null) ??
    (typeof currentStep.t === "number" ? { value: currentStep.t } : null) ??
    (currentStep.phase === "write" && currentStep.leftVar
      ? { value: currentStep.leftVar.value }
      : null);

  if (!iVarObj) {
    const persisted = findPersistedValue(
      sortingSteps,
      currentStepIndex,
      ["iVar", "i", "t"],
      (st) => {
        if (!mergeScopeCheck(st)) return false;
        if (st.phase === "write" && st.leftVar) return true;
        return st.iVar || typeof st.i === "number" || typeof st.t === "number";
      }
    );
    if (persisted) {
      if (typeof persisted === "object" && persisted.value !== undefined)
        iVarObj = persisted;
      else iVarObj = { value: persisted };
    }
  }

  // Merge temp snapshot
  // Prefer the nearest explicit "push-temp" or "form-temp" step (these
  // contain up-to-date tempArray snapshots) even when they don't include
  // mergeRange. Fall back to the earlier behavior of locating a step that
  // carried mergeRange (e.g. the initial form-temp or merge-complete).
  let mergeSnapshotStep = null;
  for (let s = currentStepIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (!st || !st.phase) continue;

    // If the step is a push-temp or form-temp and carries a tempArray, prefer it
    if (
      (st.phase === "push-temp" || st.phase === "form-temp") &&
      Array.isArray(st.tempArray)
    ) {
      mergeSnapshotStep = st;
      break;
    }

    // Otherwise, keep looking for a step that includes an explicit mergeRange
    // (this preserves the previous behavior and gives us the bounds)
    if (st.mergeRange && st.phase && st.phase !== "call-merge") {
      mergeSnapshotStep = st;
      break;
    }
  }

  const showMergeTemp =
    (!!mergeSnapshotStep && mergeSnapshotStep.phase !== "merge-complete") ||
    currentStep.phase === "push-temp" ||
    currentStep.phase === "form-temp";

  // Build active call frames (for merge recursion)
  const activeCallFrames = [];
  let callCounter = 0;
  for (
    let i = 0;
    i <= Math.min(currentStepIndex, sortingSteps.length - 1);
    i++
  ) {
    const st = sortingSteps[i];
    if (!st?.phase) continue;

    if (["start", "call-left", "call-right"].includes(st.phase)) {
      callCounter++;
      activeCallFrames.push({
        kind: st.phase,
        low: st.low,
        mid: st.mid || null,
        high: st.high,
        ord: callCounter,
      });
    } else if (
      st.phase === "calculate-mid" &&
      st.low !== undefined &&
      st.high !== undefined
    ) {
      const frame = activeCallFrames
        .reverse()
        .find((f) => f.low === st.low && f.high === st.high);
      if (frame) frame.mid = st.mid;
      activeCallFrames.reverse();
    } else if (st.low !== undefined && st.high !== undefined) {
      const frame = activeCallFrames
        .reverse()
        .find((f) => f.low === st.low && f.high === st.high);
      if (frame) frame.pIndex = st.pIndex ?? st.pivotIndex;
      activeCallFrames.reverse();
    } else if (st.phase === "left-complete") {
      const idx = activeCallFrames
        .reverse()
        .findIndex((f) => f.kind === "call-left");
      if (idx >= 0)
        activeCallFrames.splice(activeCallFrames.length - 1 - idx, 1);
      else activeCallFrames.reverse();
    } else if (st.phase === "right-complete") {
      const idx = activeCallFrames
        .reverse()
        .findIndex((f) => f.kind === "call-right");
      if (idx >= 0)
        activeCallFrames.splice(activeCallFrames.length - 1 - idx, 1);
      else activeCallFrames.reverse();
    } else if (
      ["base", "subarray-sorted"].includes(st.phase) &&
      activeCallFrames.length > 0
    ) {
      activeCallFrames.pop();
    }
  }

  const startStepIndex = sortingSteps.findIndex((s) => s?.phase === "start");
  const seenStart = startStepIndex !== -1 && startStepIndex <= currentStepIndex;
  const isDone = currentStep.phase === "completed";
  const showCallUI = (activeCallFrames.length > 0 || seenStart) && !isDone;

  // If neither temp snapshot nor call frames are present, nothing to show
  if (!showMergeTemp && !showCallUI) return null;

  // If there's an active merge snapshot, compute its bounds and snapshot array.
  // Guard against mergeSnapshotStep being null so call-stack UI can still render.
  let l = undefined;
  let r = undefined;
  let len = 0;
  let snapshot = null;
  if (mergeSnapshotStep) {
    if (Array.isArray(mergeSnapshotStep.mergeRange)) {
      [l, r] = mergeSnapshotStep.mergeRange;
      len = Math.max(0, r - l + 1 || 0);
    } else if (effectiveMergeRange && Array.isArray(effectiveMergeRange)) {
      [l, r] = effectiveMergeRange;
      len = Math.max(0, r - l + 1 || 0);
    }

    snapshot =
      Array.isArray(mergeSnapshotStep.tempArray) &&
      mergeSnapshotStep.tempArray.length >= 0
        ? mergeSnapshotStep.tempArray
        : mergeSnapshotStep.tempSnapshot ||
          (mergeSnapshotStep.temp?.array ?? null);
  }

  // If the current step is a push-temp, highlight the most recently pushed
  // element (the last element in the snapshot)
  const isPushPhase = currentStep.phase === "push-temp";
  const pushHighlightIndex =
    isPushPhase && Array.isArray(snapshot) && snapshot.length > 0
      ? snapshot.length - 1
      : null;

  // Merged indices
  const mergedDoneIndices = new Set();
  for (let s = 0; s <= currentStepIndex; s++) {
    const st = sortingSteps[s];
    if (st?.phase === "merge-complete") {
      if (Array.isArray(st.mergeRange) && st.mergeRange.length === 2) {
        const [ml, mh] = st.mergeRange;
        for (let idx = ml; idx <= mh; idx++) mergedDoneIndices.add(idx);
      } else if (Array.isArray(st.swapped)) {
        st.swapped.forEach((idx) => mergedDoneIndices.add(idx));
      }
    }
  }

  return (
    <div className="w-full px-4 flex flex-col">
      {/* Call stack frames (merge recursion) - ABOVE array */}
      {showCallUI && (
        <div className="flex justify-center items-end gap-3 mb-3">
          {activeCallFrames.map((frame, idx) => {
            const ord = frame.ord ?? idx + 1;
            const frameMid = frame.mid || null;
            const isLatest = idx === activeCallFrames.length - 1;

            return (
              <div
                key={`m-frame-${ord}`}
                className="flex flex-col items-center"
              >
                <div
                  className={`h-12 min-w-[180px] px-3 rounded-lg flex flex-col items-center justify-center font-medium bg-emerald-300 text-gray-900 shadow-md ${
                    isLatest ? "animate-pulse" : ""
                  }`}
                >
                  <div className="text-sm font-semibold truncate">{`Call ${ord}: `}</div>
                  <div className="text-sm font-mono truncate">{`low=${safeValue(
                    frame.low
                  )},  high=${safeValue(frame.high)}`}</div>
                </div>

                {frameMid && (
                  <div className="mt-1 h-auto min-w-[120px] px-2 rounded-md flex flex-col items-start justify-center font-medium bg-purple-300 text-gray-900 shadow-sm">
                    <div className="text-sm font-semibold w-full text-center">
                      mid
                    </div>
                    <div className="text-sm font-mono">{`= ${safeValue(
                      frameMid.leftIndex
                    )} + (${safeValue(frameMid.rightIndex)} - ${safeValue(
                      frameMid.leftIndex
                    )}) / 2 `}</div>
                    <div className="text-sm font-mono">{`= ${safeValue(
                      frameMid.value
                    )}`}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-1 flex items-center justify-between w-full">
        <div className="flex-1"></div>

        <div className="flex justify-center gap-4 items-center">
          {leftVarObj &&
            currentStep.phase !== "merge-complete" &&
            currentStep.phase !== "subarray-sorted" && (
              <VariableCard
                label="left"
                value={
                  leftVarObj.value !== undefined ? leftVarObj.value : leftVarObj
                }
                bgColor="bg-orange-300"
              />
            )}

          {showMergeTemp && (
            <div className="flex flex-col items-center max-w-full min-h-14 h-auto px-3 py-1 bg-cyan-400 rounded-lg shadow-md">
              <div className="text-xs font-semibold text-gray-700">
                tempArray
              </div>
              {snapshot && (
                <div className="flex gap-2 mt-1 items-end">
                  {snapshot.map((v, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`h-8 w-8 flex items-center justify-center bg-lime-200 text-gray-800 text-sm font-semibold rounded ${
                          pushHighlightIndex === i
                            ? "ring-2 ring-amber-400 animate-pulse"
                            : ""
                        }`}
                        title={`temp[${i}] = ${v}`}
                      >
                        {v}
                      </div>
                      <div className="text-xs text-gray-700 mt-1">{i}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {rightVarObj &&
            currentStep.phase !== "merge-complete" &&
            currentStep.phase !== "subarray-sorted" && (
              <VariableCard
                label="right"
                value={
                  rightVarObj.value !== undefined
                    ? rightVarObj.value
                    : rightVarObj
                }
                bgColor="bg-orange-300"
              />
            )}
        </div>
        <div className="flex-1 flex justify-end ml-2">
          {iVarObj && (
            <VariableCard
              label="i"
              value={iVarObj.value !== undefined ? iVarObj.value : iVarObj}
              bgColor="bg-rose-300"
            />
          )}
        </div>
      </div>
    </div>
  );
}

// Named export used by SortingDisplay to compute array overlay (merged indices, snapshot presence)
export function getMergeOverlay({
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  currentMergeRange = null,
  currentArray = [],
} = {}) {
  // Build mergedDoneIndices (same logic used for styling the array in the main display)
  const mergedDoneIndices = new Set();
  for (let s = 0; s <= currentStepIndex; s++) {
    const st = sortingSteps[s];
    if (st?.phase === "merge-complete") {
      if (Array.isArray(st.mergeRange) && st.mergeRange.length === 2) {
        const [ml, mh] = st.mergeRange;
        for (let idx = ml; idx <= mh; idx++) mergedDoneIndices.add(idx);
      } else if (Array.isArray(st.swapped)) {
        st.swapped.forEach((idx) => mergedDoneIndices.add(idx));
      }
    }
  }

  // Detect if there's an active merge snapshot (used to show temp area)
  // Mirror the logic used in the visualizer: prefer explicit push-temp/form-temp
  // steps that carry tempArray, otherwise fall back to a recent step with
  // mergeRange (non-conquer).
  let mergeSnapshotStep = null;
  for (let s = currentStepIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (!st || !st.phase) continue;
    if (
      (st.phase === "push-temp" || st.phase === "form-temp") &&
      Array.isArray(st.tempArray)
    ) {
      mergeSnapshotStep = st;
      break;
    }
    if (st.mergeRange && st.phase && st.phase !== "call-merge") {
      mergeSnapshotStep = st;
      break;
    }
  }

  return {
    mergedDoneIndices,
    hasMergeSnapshot: !!mergeSnapshotStep,
  };
}
