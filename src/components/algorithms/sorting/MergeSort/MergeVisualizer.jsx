import React from "react";
import {
  safeValue,
  rangeMatches,
  findPersistedValue,
} from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

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
    currentMergeRange || findPersistedValue(sortingSteps, currentStepIndex, "mergeRange");

  const mergeScopeCheck = (st) =>
    !st.mergeRange || !effectiveMergeRange || rangeMatches(st.mergeRange, effectiveMergeRange);

  // mid
  const midObj = currentStep.mid ?? findPersistedValue(sortingSteps, currentStepIndex, "mid");

  // left/right
  const leftVarObj =
    currentStep.leftVar ?? findPersistedValue(sortingSteps, currentStepIndex, ["leftVar", "leftPtr"], mergeScopeCheck);
  const rightVarObj =
    currentStep.rightVar ?? (typeof currentStep.rightPtr === "number" ? { value: currentStep.rightPtr } : null) ??
    findPersistedValue(sortingSteps, currentStepIndex, ["rightVar", "rightPtr"], mergeScopeCheck);

  // i variable
  let iVarObj =
    currentStep.iVar ?? (typeof currentStep.i === "number" ? { value: currentStep.i } : null) ??
    (typeof currentStep.t === "number" ? { value: currentStep.t } : null) ??
    (currentStep.phase === "write" && currentStep.leftVar ? { value: currentStep.leftVar.value } : null);

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
      if (typeof persisted === "object" && persisted.value !== undefined) iVarObj = persisted;
      else iVarObj = { value: persisted };
    }
  }

  // Merge temp snapshot
  let mergeSnapshotStep = null;
  for (let s = currentStepIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (st?.mergeRange && st.phase && st.phase !== "conquer") {
      mergeSnapshotStep = st;
      break;
    }
  }

  const showMergeTemp = mergeSnapshotStep && mergeSnapshotStep.phase !== "merge-complete";

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
    } else if (
      st.phase === "pindex" &&
      st.low !== undefined &&
      st.high !== undefined
    ) {
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

  const [l, r] = mergeSnapshotStep.mergeRange || [];
  const len = Math.max(0, (r - l + 1) || 0);
  if (len === 0) return null;

  let snapshot =
    mergeSnapshotStep.tempArray || mergeSnapshotStep.tempSnapshot || mergeSnapshotStep.temp?.array || mergeSnapshotStep.tempArray;

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
    <div className="mt-3 flex items-center justify-between w-full px-8">
      <div className="flex-1"></div>

      {/* Call stack frames (merge recursion) */}
      {showCallUI && (
        <div className="flex items-end gap-3 mr-6">
          {activeCallFrames.map((frame, idx) => {
            const ord = frame.ord ?? idx + 1;
            const frameMid = frame.mid || null;
            const isLatest = idx === activeCallFrames.length - 1;

            return (
              <div key={`m-frame-${ord}`} className="flex flex-col items-center">
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
                    <div className="text-sm font-semibold w-full text-center">mid</div>
                    <div className="text-sm font-mono">{`= ${safeValue(frameMid.leftIndex)} + (${safeValue(
                      frameMid.rightIndex
                    )} - ${safeValue(frameMid.leftIndex)}) / 2 `}</div>
                    <div className="text-sm font-mono">{`= ${safeValue(frameMid.value)}`}</div>
                  </div>
                )}

                {(frame.pIndex !== undefined ||
                  (currentStep.pIndex !== undefined &&
                    currentStep.low === frame.low &&
                    currentStep.high === frame.high)) && (
                  <div className="mt-1 h-auto min-w-[120px] px-2 rounded-md flex flex-col items-start justify-center font-medium bg-rose-200 text-gray-900 shadow-sm">
                    <div className="text-sm font-semibold w-full text-center">pIndex</div>
                    <div className="text-sm font-mono">{`= ${frame.pIndex ?? currentStep.pIndex}`}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="flex justify-center gap-4 items-center">
        {midObj && (
          <VariableCard label="mid" value={midObj.value !== undefined ? midObj.value : midObj} bgColor="bg-purple-300" />
        )}

        {leftVarObj && (
          <VariableCard label="left" value={leftVarObj.value !== undefined ? leftVarObj.value : leftVarObj} bgColor="bg-orange-300" />
        )}

        <div className="flex flex-col items-center max-w-full min-h-14 h-auto px-3 py-1 bg-cyan-400 rounded-lg shadow-md">
          <div className="text-xs font-semibold text-gray-700">tempArray</div>
          {snapshot && (
            <div className="flex gap-2 mt-1 items-end">
              {snapshot.map((v, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div
                    className="h-8 w-8 flex items-center justify-center bg-lime-200 text-gray-800 text-sm font-semibold rounded"
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

        {rightVarObj && (
          <VariableCard label="right" value={rightVarObj.value !== undefined ? rightVarObj.value : rightVarObj} bgColor="bg-orange-300" />
        )}
      </div>
      <div className="flex-1 flex justify-end">
        {iVarObj && (
          <VariableCard label="i" value={iVarObj.value !== undefined ? iVarObj.value : iVarObj} bgColor="bg-rose-300" />
        )}
      </div>
    </div>
  );
}

// Named export used by SortingDisplay to compute array overlay (merged indices, snapshot presence)
export function getMergeOverlay({ sortingSteps = [], currentStepIndex = 0, currentStep = {}, currentMergeRange = null, currentArray = [] } = {}) {
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
  let mergeSnapshotStep = null;
  for (let s = currentStepIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (st?.mergeRange && st.phase && st.phase !== "conquer") {
      mergeSnapshotStep = st;
      break;
    }
  }

  return {
    mergedDoneIndices,
    hasMergeSnapshot: !!mergeSnapshotStep,
  };
}
