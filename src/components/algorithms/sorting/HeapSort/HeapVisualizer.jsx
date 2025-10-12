import React from "react";
import { safeValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";

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
  // Collect all heapify callIds that have been started up to currentStepIndex
  // and, for each, scan the steps that share that callId up to currentStepIndex to
  // gather var values and whether the call has exited. This lets us render stacked
  // variable groups: parent heapify variables remain visible when a child heapify runs.
  const callIdOrder = [];
  const callIdToStartIdx = {};
  const callIdToParams = {};
  for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (st.phase === "call-heapify" && st.callId !== undefined && st.callId !== null) {
      const id = st.callId;
      if (!(id in callIdToStartIdx)) {
        callIdToStartIdx[id] = s;
        callIdOrder.push(id);
        // store n and i parameters if present for display in the call frame
        callIdToParams[id] = { n: st.n, i: st.i };
      }
    }
  }

  // For each callId, scan its steps (up to current index) to collect var values and exit state
  const activeCalls = []; // array of { callId, seenLargest, seenL, seenR, largestValue, lValue, rValue, inHeapify }
  const heapPhases = new Set(["var-largest", "var-l", "var-r", "if-check", "if-exit", "comparison", "swap"]);
  for (const id of callIdOrder) {
    let seenLargest = false,
      seenL = false,
      seenR = false;
    let latestLargest = null,
      latestL = null,
      latestR = null;
    let latestHeapPhaseIdx = -1;
    let exitIdx = -1;

    for (let s = callIdToStartIdx[id]; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.callId !== id) continue;
      if (st.phase === "heapify-exits") {
        exitIdx = s;
        break;
      }
      if (heapPhases.has(st.phase)) latestHeapPhaseIdx = s;
      if (st.phase === "var-largest" && st.largest !== undefined) {
        latestLargest = st.largest;
        seenLargest = true;
      }
      if (st.phase === "var-l" && st.l !== undefined) {
        latestL = st.l;
        seenL = true;
      }
      if (st.phase === "var-r" && st.r !== undefined) {
        latestR = st.r;
        seenR = true;
      }
    }

    const inHeapifyForCall = latestHeapPhaseIdx !== -1 && (exitIdx === -1 || currentStepIndex < exitIdx);
    const largestValue = currentStep?.callId === id ? currentStep?.largest ?? latestLargest : latestLargest;
    const lValue = currentStep?.callId === id ? currentStep?.l ?? latestL : latestL;
    const rValue = currentStep?.callId === id ? currentStep?.r ?? latestR : latestR;

    // visible only if the call is active and has seen the var-phase for that variable
    const showLargest = inHeapifyForCall && seenLargest && largestValue !== null && currentStep?.phase !== "completed";
    const showL = inHeapifyForCall && seenL && lValue !== null && currentStep?.phase !== "completed";
    const showR = inHeapifyForCall && seenR && rValue !== null && currentStep?.phase !== "completed";

    if (inHeapifyForCall) {
      activeCalls.push({
        callId: id,
        showLargest,
        showL,
        showR,
        largestValue,
        lValue,
        rValue,
      });
    }
  }

  // Build heapify call frames (stack) similar to MergeVisualizer's call frames
  const heapCallFrames = [];
  let callCounter = 0;
  for (let s = 0; s <= Math.min(currentStepIndex, sortingSteps.length - 1); s++) {
    const st = sortingSteps[s];
    if (!st?.phase) continue;
    if (st.phase === "call-heapify" && st.callId !== undefined && st.callId !== null) {
      callCounter++;
      heapCallFrames.push({ callId: st.callId, n: st.n, i: st.i, ord: callCounter });
    } else if (st.phase === "heapify-exits" && st.callId !== undefined && st.callId !== null) {
      // remove the matching frame (call returned)
      const idx = heapCallFrames.findIndex((f) => f.callId === st.callId);
      if (idx >= 0) heapCallFrames.splice(idx, 1);
    }
  }

  const showHeapCallUI = heapCallFrames.length > 0 && currentStep?.phase !== "completed";
  const activeCallsById = Object.fromEntries(activeCalls.map((c) => [c.callId, c]));

  return (
    <div className="mt-4 w-full flex flex-col items-center">
     

      {/* i variable row */}
      {shouldShowI && (
        <div className="h-12 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-violet-300 text-gray-900 shadow-md">
          <div className="text-center">
            <div className="text-xs text-gray-700">i</div>
            <div className="text-lg font-bold">{iValue}</div>
          </div>
        </div>
      )}
      {/* heapify variables row(s): render one group per active heapify call (parent first) */}
      {showHeapCallUI && (
        <div className="flex flex-col items-center gap-2 w-full">
          {heapCallFrames.map((frame, idx) => {
            const c = activeCallsById[frame.callId];
            if (!c) return null; // skip calls that aren't active
            const ord = frame.ord ?? idx + 1;
            const isLatest = idx === heapCallFrames.length - 1;
            return (
              <div key={`h-row-${frame.callId}`} className="flex items-center justify-center gap-6 w-full mt-1">
                <div
                  className={`h-12 min-w-[180px] px-3 rounded-lg flex flex-col items-center justify-center font-medium bg-emerald-300 text-gray-900 shadow-md ${
                    isLatest ? "animate-pulse" : ""
                  }`}
                >
                  <div className="text-sm font-semibold truncate">{`Call ${ord}: `}</div>
                  <div className="text-sm font-mono truncate">{`n=${safeValue(frame.n)}, i=${safeValue(frame.i)}`}</div>
                </div>

                <div className="flex items-center gap-3">
                  {c.showLargest && (
                    <div className="h-12 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md">
                      <div className="text-center">
                        <div className="text-xs text-gray-700">largest</div>
                        <div className="text-lg font-bold">{c.largestValue ?? "-"}</div>
                      </div>
                    </div>
                  )}

                  {c.showL && (
                    <div className="h-12 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-sky-300 text-gray-900 shadow-md">
                      <div className="text-center">
                        <div className="text-xs text-gray-700">l</div>
                        <div className="text-lg font-bold">{c.lValue ?? "-"}</div>
                      </div>
                    </div>
                  )}

                  {c.showR && (
                    <div className="h-12 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-rose-300 text-gray-900 shadow-md">
                      <div className="text-center">
                        <div className="text-xs text-gray-700">r</div>
                        <div className="text-lg font-bold">{c.rValue ?? "-"}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
   
    </div>
  );
};

export default HeapVisualizer;
