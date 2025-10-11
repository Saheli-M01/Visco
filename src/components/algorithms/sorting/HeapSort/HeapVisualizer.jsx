import React from "react";

// Minimal heap visualizer: shows a call frame when heapSort starts and the current outer-loop i variable
const HeapVisualizer = ({
  currentStep,
  sortingSteps = [],
  currentStepIndex = 0,
}) => {
  const phase = currentStep?.phase;
  // show i when we have an explicit i from the step (i-iter) or during swap phases
  const iValue = currentStep?.i ?? null;

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

  const shouldShowI =
    iValue !== null &&
    ["i-iter", "i-init", "swap", "swap_step"].includes(phase);

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      {showCallFrame && (
        <div className="flex items-end justify-center gap-6 mb-3">
          <div className="flex flex-col items-center">
            <div className="h-12 min-w-[220px] px-3 rounded-lg flex flex-col items-center justify-center font-medium bg-emerald-300 text-gray-900 shadow-md animate-pulse">
              <div className="text-sm font-semibold truncate">Call</div>
              <div className="text-sm font-mono truncate">
                {lastStart.description || "heapSort()"}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* i variable row */}
      {shouldShowI && (
        <div className="min-h-10 w-28 py-1 rounded-lg flex items-center justify-center font-medium bg-violet-300 text-gray-900 shadow-md">
          <div className="text-center">
            <div className="text-xs text-gray-700">i</div>
            <div className="text-lg font-bold">{iValue}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeapVisualizer;
