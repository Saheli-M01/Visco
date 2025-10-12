import React from "react";

// Minimal heap visualizer: shows a call frame when heapSort starts and the current outer-loop i variable
const HeapVisualizer = ({
  currentStep,
  sortingSteps = [],
  currentStepIndex = 0,
}) => {

  // Determine latest i value seen up to currentStepIndex so it can persist
  // Determine latest i-init index up to currentStepIndex and persist i until for-exit
  let lastIInitIdx = -1;
  let latestI = null;
  for (
    let s = 0;
    s <= Math.min(currentStepIndex, sortingSteps.length - 1);
    s++
  ) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (st.phase === "i-init" && st.i !== undefined && st.i !== null) {
      lastIInitIdx = s;
      latestI = st.i;
    }
    // allow i-iter to update value inside loop
    if (st.phase === "i-iter" && st.i !== undefined && st.i !== null) {
      latestI = st.i;
    }
  }

  // If lastIInitIdx exists, search for a for-exit after it (<= current index)
  let forExitIdx = -1;
  if (lastIInitIdx !== -1) {
    for (let s = lastIInitIdx + 1; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.phase === "for-exit") {
        forExitIdx = s;
        break;
      }
    }
  }

  const inForLoop = lastIInitIdx !== -1 && (forExitIdx === -1 || currentStepIndex < forExitIdx);

  // Prefer the current step's i if present (fresh), otherwise use latestI
  const iValue = inForLoop ? (currentStep?.i ?? latestI) : null;

  // Determine if there's a 'start' step visible up to currentStepIndex
  let lastStart = null;
  for (
    let s = 0;
    s <= Math.min(currentStepIndex, sortingSteps.length - 1);
    s++
  ) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (st.phase === "start") lastStart = { ...st, idx: s };
  }

  const showCallFrame =
    lastStart !== null && currentStep?.phase !== "completed";

  // Show i if we have a persisted value and we aren't completed. Persist until the for-exit.
  const shouldShowI = iValue !== null && currentStep?.phase !== "completed";

  // Persist heapify variables: largest, l, r. Look for the most recent steps with the new phases
  let latestLargest = null;
  let latestL = null;
  let latestR = null;
  for (
    let s = 0;
    s <= Math.min(currentStepIndex, sortingSteps.length - 1);
    s++
  ) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (st.phase === "var-largest"  && st.largest !== undefined) {
      latestLargest = st.largest;
    }
    if (st.phase === "var-l" && st.l !== undefined) {
      latestL = st.l;
    }
    if (st.phase === "var-r" && st.r !== undefined) {
      latestR = st.r;
    }
  }

  // Prefer values from the currentStep if present
  const largestValue = currentStep?.largest ?? latestLargest;
  const lValue = currentStep?.l ?? latestL;
  const rValue = currentStep?.r ?? latestR;

  // Show variables from the most recent call-heapify until the heapify-exits step.
  // Find the last call-heapify index up to currentStepIndex
  let lastCallIdx = -1;
  for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (st.phase === "call-heapify") lastCallIdx = s;
  }

  // If we found a call, look for a heapify-exits after it (but <= current index)
  let exitIdx = -1;
  if (lastCallIdx !== -1) {
    for (let s = lastCallIdx + 1; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.phase === "heapify-exits") {
        exitIdx = s;
        break;
      }
    }
  }

  // We're inside heapify if there was a call and no exit has occurred after it yet.
  const inHeapify = lastCallIdx !== -1 && (exitIdx === -1 || currentStepIndex < exitIdx);

  const showLargest = inHeapify && largestValue !== null && currentStep?.phase !== "completed";
  const showL = inHeapify && lValue !== null && currentStep?.phase !== "completed";
  const showR = inHeapify && rValue !== null && currentStep?.phase !== "completed";

  return (
    <div className="mt-4 w-full flex flex-col items-center">
     

      {/* i variable row */}
      {shouldShowI && (
        <div className="min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-violet-300 text-gray-900 shadow-md">
          <div className="text-center">
            <div className="text-xs text-gray-700">i</div>
            <div className="text-lg font-bold">{iValue}</div>
          </div>
        </div>
      )}
      {/* heapify variables row: show only the active variable card */}
      {(showLargest || showL || showR) && (
        <div className="mt-3 flex items-center gap-3">
          {showLargest && (
            <div className="min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md">
              <div className="text-center">
                <div className="text-xs text-gray-700">largest</div>
                <div className="text-lg font-bold">{largestValue ?? "-"}</div>
              </div>
            </div>
          )}

          {showL && (
            <div className="min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-sky-300 text-gray-900 shadow-md">
              <div className="text-center">
                <div className="text-xs text-gray-700">l</div>
                <div className="text-lg font-bold">{lValue ?? "-"}</div>
              </div>
            </div>
          )}

          {showR && (
            <div className="min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-rose-300 text-gray-900 shadow-md">
              <div className="text-center">
                <div className="text-xs text-gray-700">r</div>
                <div className="text-lg font-bold">{rValue ?? "-"}</div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeapVisualizer;
