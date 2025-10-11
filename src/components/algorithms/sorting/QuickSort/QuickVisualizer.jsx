import React from "react";
import { safeValue, findPersistedValue, parseIndexFromDesc } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

export default function QuickVisualizer({
  currentStep = {},
  sortingSteps = [],
  currentStepIndex = 0,
}) {
  // Local debug toggle - set to true during development to show quick debug info
  const DEBUG_SHOW_STEP_INFO = false;
  const isDone = currentStep.phase === "completed";

  // Build active call frames (quickSort recursion)
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
  const showCallUI = (activeCallFrames.length > 0 || seenStart) && !isDone;

  // randomIndex (shown when entering partition)
  // We'll scope randomIndex and pIndex to the current active call frame.
  // Find the latest active frame (the top of the call stack) if any.
  const currentFrame = activeCallFrames.length > 0 ? activeCallFrames[activeCallFrames.length - 1] : null;

  // Persist pIndex: scan past steps up to currentStepIndex for any step that indicates a pivot/partition result
  // (pindex, pindex-result, final-swap, inner-swap) and assign j/pIndex when matching low/high.
  if (currentFrame) {
    const finalPhases = new Set(["final-swap", "partition-return", "pindex-result"]);
    for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      const matchesFrame = st.low !== undefined && st.high !== undefined && st.low === currentFrame.low && st.high === currentFrame.high;

      // prefer explicit pIndex fields on the matching frame
      if (matchesFrame && st.pIndex !== undefined && st.pIndex !== null) {
        currentFrame.pIndex = st.pIndex;
        continue;
      }

      // accept pivotIndex on the matching frame
      if (matchesFrame && st.pivotIndex !== undefined && st.pivotIndex !== null) {
        currentFrame.pIndex = st.pivotIndex;
        continue;
      }

      // Only accept 'j' as the partition index when it's emitted during final phases
      if ((matchesFrame || s === currentStepIndex) && finalPhases.has(st.phase) && st.j !== undefined && st.j !== null) {
        currentFrame.pIndex = st.j;
        continue;
      }
    }
  }

  // Determine scoped randomIndex for the current frame: only show during partition phases and persist until partition returns
  let scopedRandomIndex = null;
  if (currentFrame) {
    for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      // Prefer explicit randomIndex attached to the same frame
      if (st.randomIndex !== undefined && st.randomIndex !== null) {
        if ((st.low !== undefined && st.high !== undefined && st.low === currentFrame.low && st.high === currentFrame.high) || s === currentStepIndex) {
          scopedRandomIndex = st.randomIndex;
        }
      }
    }
    // Fallback: if currentStep itself carries randomIndex (partition-entry may not set low/high), use it
    if (scopedRandomIndex == null && currentStep?.randomIndex !== undefined && currentStep?.randomIndex !== null) {
      scopedRandomIndex = currentStep.randomIndex;
    }
  }
  // Determine scoped pivotValue for the current frame: prefer explicit pivotValue on steps or currentStep
  let scopedPivotValue = null;
  if (currentFrame) {
    for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.pivotValue !== undefined && st.pivotValue !== null) {
        if ((st.low !== undefined && st.high !== undefined && st.low === currentFrame.low && st.high === currentFrame.high) || s === currentStepIndex) {
          scopedPivotValue = st.pivotValue;
        }
      }
    }
    if (scopedPivotValue == null && currentStep?.pivotValue !== undefined && currentStep?.pivotValue !== null) {
      scopedPivotValue = currentStep.pivotValue;
    }
  }
  // Determine scoped i/j for the current frame: prefer explicit i/j on steps or current step
  let scopedI = null;
  let scopedJ = null;
  if (currentFrame) {
    for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      const matchesFrame = st.low !== undefined && st.high !== undefined && st.low === currentFrame.low && st.high === currentFrame.high;
      const isCurrent = s === currentStepIndex;
      if ((matchesFrame || isCurrent) && st.i !== undefined && st.i !== null) scopedI = st.i;
      if ((matchesFrame || isCurrent) && st.j !== undefined && st.j !== null) scopedJ = st.j;
    }
    // Fallback: allow currentStep to carry i/j even if low/high missing
    if (scopedI == null && currentStep?.i !== undefined && currentStep?.i !== null) scopedI = currentStep.i;
    if (scopedJ == null && currentStep?.j !== undefined && currentStep?.j !== null) scopedJ = currentStep.j;
  }
  const PARTITION_PHASES = new Set([
    "partition-entry",
    "swap",
    "pivot-assign",
    "i-init",
    "j-init",
    "while-entry",
    "inner-while-i-entry",
    "inner-while-i-cond-true",
    "i-inc",
    "inner-while-i-cond-false",
  "inner-while-j-entry",
  "inner-while-j-cond-true",
    "j-dec",
    "j-cond-false",
    "if-i-less-j",
    "inner-swap",
    "final-swap",
    "pindex",
    "pindex-result",
  ]);

  // Debug logging to help trace why randomIndex may appear null in the UI.
  // This prints when we are at the partition-entry step or when a nearby step contains randomIndex.
  try {
    if (currentStep?.phase === "partition-entry" || scopedRandomIndex != null) {
      console.debug("[QuickVisualizer] idx=", currentStepIndex, "phase=", currentStep?.phase, "cur.randomIndex=", currentStep?.randomIndex, "scopedRandomIndex=", scopedRandomIndex);
      const nearby = sortingSteps.slice(Math.max(0, currentStepIndex - 3), Math.min(sortingSteps.length, currentStepIndex + 6)).map((s, i) => ({ i: i + Math.max(0, currentStepIndex - 3), phase: s?.phase, randomIndex: s?.randomIndex }));
      console.debug("[QuickVisualizer] nearby steps:", nearby);
    }
  } catch (e) {
    // swallow logging errors
  }

  const shouldShowRandomIndex = currentFrame && PARTITION_PHASES.has(currentStep?.phase) && scopedRandomIndex != null;
  const randomIndexObj = shouldShowRandomIndex ? { value: scopedRandomIndex } : null;

  const shouldShowPivotValue = currentFrame && PARTITION_PHASES.has(currentStep?.phase) && scopedPivotValue != null;
  const pivotValueObj = shouldShowPivotValue ? { value: scopedPivotValue } : null;
  const shouldShowI = currentFrame && PARTITION_PHASES.has(currentStep?.phase) && scopedI != null;
  const shouldShowJ = currentFrame && PARTITION_PHASES.has(currentStep?.phase) && scopedJ != null;
  const iObj = shouldShowI ? { value: scopedI } : null;
  const jObj = shouldShowJ ? { value: scopedJ } : null;

  if (!showCallUI && !randomIndexObj) return null;

  return (
    <div className="mt-3 flex items-center justify-between w-full px-8">
      <div className="flex-1"></div>
      <div className="flex items-end gap-3">
        {showCallUI &&
          activeCallFrames.map((frame, idx) => {
            const ord = frame.ord ?? idx + 1;
            const frameMid = frame.mid || null;
            const isLatest = idx === activeCallFrames.length - 1;

            return (
              <div key={`q-frame-${ord}`} className="flex flex-col items-center">
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


                {(frame.pIndex !== undefined ||
                  (currentStep.pIndex !== undefined &&
                    currentStep.low === frame.low &&
                    currentStep.high === frame.high) ||
                  currentStep.phase === "pindex" ||
                  // Always show pIndex placeholder for the active frame during partition phases
                  (PARTITION_PHASES.has(currentStep?.phase) && currentFrame && idx === activeCallFrames.length - 1)
                ) && (
                  <div className="mt-1 h-auto min-w-[120px] px-2 rounded-md flex flex-col items-start justify-center font-medium bg-rose-200 text-gray-900 shadow-sm">
                    <div className="text-sm font-semibold w-full text-center">pIndex</div>
                    <div className="text-sm font-mono">{`= ${safeValue(frame.pIndex ?? currentStep.pIndex)}`}</div>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <div className="flex-1 flex justify-end ml-4">
        {randomIndexObj && (
          <div className="min-h-10 w-36 py-1 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md">
            <div className="text-center">
              <div className="text-xs text-gray-700">randomIndex</div>
              <div className="text-lg font-bold">{safeValue(randomIndexObj.value)}</div>
            </div>
          </div>
        )}
        {pivotValueObj && (
          <div className="ml-4 min-h-10 w-36 py-1 rounded-lg flex items-center justify-center font-medium bg-sky-300 text-gray-900 shadow-md">
            <div className="text-center">
              <div className="text-xs text-gray-700">pivot</div>
              <div className="text-lg font-bold">{safeValue(pivotValueObj.value)}</div>
            </div>
          </div>
        )}
        {iObj && (
          <div className="ml-4 min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-lime-300 text-gray-900 shadow-md">
            <div className="text-center">
              <div className="text-xs text-gray-700">i</div>
              <div className="text-lg font-bold">{safeValue(iObj.value)}</div>
            </div>
          </div>
        )}
        {jObj && (
          <div className="ml-4 min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-violet-300 text-gray-900 shadow-md">
            <div className="text-center">
              <div className="text-xs text-gray-700">j</div>
              <div className="text-lg font-bold">{safeValue(jObj.value)}</div>
            </div>
          </div>
        )}
      
      </div>
    </div>
  );
}

// Named export used by SortingDisplay to compute array overlay (pivot highlighting)
export function getQuickOverlay({ sortingSteps = [], currentStepIndex = 0, currentStep = {} } = {}) {
  const currentPivotIndex = currentStep.pIndex ?? currentStep.pivotIndex ?? null;

  // Build active call frames detection (we don't need full frames in overlay)
  const activeCallFrames = [];
  for (let i = 0; i <= Math.min(currentStepIndex, sortingSteps.length - 1); i++) {
    const st = sortingSteps[i];
    if (!st?.phase) continue;
    if (["start", "call-left", "call-right"].includes(st.phase)) activeCallFrames.push(st);
    else if (["base", "subarray-sorted"].includes(st.phase) && activeCallFrames.length > 0) activeCallFrames.pop();
  }

  const seenStart = sortingSteps.findIndex((s) => s?.phase === "start") !== -1;
  const showCall = activeCallFrames.length > 0 || seenStart;

  return {
    currentPivotIndex,
    showCall,
  };
}
