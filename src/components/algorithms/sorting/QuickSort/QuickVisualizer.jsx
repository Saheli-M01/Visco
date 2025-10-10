import React from "react";
import { safeValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

export default function QuickVisualizer({
  currentStep = {},
  sortingSteps = [],
  currentStepIndex = 0,
}) {
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
  const randomIndexObj =
    currentStep.randomIndex !== undefined && currentStep.phase === "partition-entry"
      ? { value: currentStep.randomIndex }
      : null;

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

      <div className="flex-1 flex justify-end">
        {randomIndexObj && (
          <div className="min-h-10 w-36 py-1 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md">
            <div className="text-center">
              <div className="text-xs text-gray-700">randomIndex</div>
              <div className="text-lg font-bold">{safeValue(randomIndexObj.value)}</div>
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
