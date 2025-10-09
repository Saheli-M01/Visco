/* 
  SortingDisplay.jsx
  ------------------
  React component that renders an array visualization and related
  transient variables for various sorting algorithm steps (bubble,
  insertion, selection, merge, quicksort, etc.).

  - Shows array elements, highlighting comparisons, swaps, pivots, and
    merged ranges.
  - Renders variable "cards" for temp, key, min, pointers (left/right/i),
    call stack frames (for recursive algorithms), and merge temporary arrays.
  - Consumes a list of sortingSteps to reconstruct the visual state at
    a given currentStepIndex.

  Props:
    - currentArray: Array of values being visualized.
    - comparingIndices: Indices currently being compared.
    - sortingSteps: Array of step objects produced by the algorithm tracer.
    - currentStepIndex: Index into sortingSteps for the current visualization frame.
    - selectedLanguage: language identifier (e.g., "javascript", "csharp") used to
      determine language-specific UI (like temp variable display).
*/

import React from "react";

/**
 * ArrayDisplay component props
 * @param {Object} props
 * @param {Array<*>} props.currentArray - The array being visualized
 * @param {Array<number>} props.comparingIndices - Indices currently compared
 * @param {Array<Object>} props.sortingSteps - All recorded sorting steps
 * @param {number} props.currentStepIndex - Index of the active step
 * @param {string} [props.selectedLanguage="javascript"] - Language for language-specific UI
 */
const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
}) => {
  const currentStep = sortingSteps[currentStepIndex] || {};
  const currentMergeRange = currentStep.mergeRange || null;
  const isDone = currentStep.phase === "completed";
  const isSwapPhase = ["swap", "swap_step"].includes(currentStep.phase);

  // ============================================================================
  // HELPER FUNCTIONS
  // ============================================================================

  const rangeMatches = (a, b) =>
    Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1];

  const parseIndexFromDesc = (desc, key) => {
    if (!desc || typeof desc !== "string") return null;
    const match = desc.match(new RegExp(`${key}\\s*=\\s*(\\d+)`));
    return match ? Number(match[1]) : null;
  };

  const safeValue = (val) => (val != null ? val : "-");

  // Generic function to find persisted value from earlier steps
  const findPersistedValue = (
    fieldNames,
    scopeCheck = null,
    startIndex = currentStepIndex - 1
  ) => {
    const fields = Array.isArray(fieldNames) ? fieldNames : [fieldNames];

    for (let s = startIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (scopeCheck && !scopeCheck(st)) break;

      for (const field of fields) {
        if (st[field]) return st[field];
      }
    }
    return null;
  };

  // ============================================================================
  // BUBBLE SORT VARIABLES (i, j)
  // ============================================================================

  let bubbleIObj = null;
  let bubbleJObj = null;

  if (currentStep.phase === "outer_loop") {
    const parsed = parseIndexFromDesc(currentStep.description, "i");
    if (parsed !== null) bubbleIObj = { value: parsed };
  }
  if (currentStep.phase === "inner_loop") {
    const parsed = parseIndexFromDesc(currentStep.description, "j");
    if (parsed !== null) bubbleJObj = { value: parsed };
  }
  if (
    !bubbleJObj &&
    Array.isArray(currentStep.comparing) &&
    currentStep.comparing.length > 0
  ) {
    bubbleJObj = { value: currentStep.comparing[0] };
  }

  if (!bubbleIObj || !bubbleJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!bubbleIObj && st.phase === "outer_loop") {
        const parsed = parseIndexFromDesc(st.description, "i");
        if (parsed !== null) bubbleIObj = { value: parsed };
      }
      if (!bubbleJObj && st.phase === "inner_loop") {
        const parsed = parseIndexFromDesc(st.description, "j");
        if (parsed !== null) bubbleJObj = { value: parsed };
      }
      if (bubbleIObj && bubbleJObj) break;
    }
  }

  // Hide bubble j during outer_loop steps and swap phases
  if (currentStep.phase === "outer_loop" || isSwapPhase) {
    bubbleJObj = null;
  }

  // ============================================================================
  // SELECTION SORT VARIABLES (i, j, minIndex)
  // ============================================================================

  let selectionIObj = null;
  let selectionJObj = null;

  // Check if current step has selection sort specific variables
  if (currentStep.selectionI !== undefined) {
    selectionIObj = { value: currentStep.selectionI };
  }
  if (currentStep.selectionJ !== undefined) {
    selectionJObj = { value: currentStep.selectionJ };
  }

  // If not found, look backwards for persisted values
  if (!selectionIObj || !selectionJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;

      if (!selectionIObj && st.selectionI !== undefined) {
        selectionIObj = { value: st.selectionI };
      }
      if (!selectionJObj && st.selectionJ !== undefined) {
        selectionJObj = { value: st.selectionJ };
      }

      if (selectionIObj && selectionJObj) break;
    }
  }

  // Hide selection j during swap phases
  if (isSwapPhase) {
    selectionJObj = null;
  }

  // Min variable (selection sort)
  let minObj = currentStep.min;
  if (
    !minObj &&
    currentStep.phase === "min_update" &&
    currentStep.comparing?.length > 0
  ) {
    const mi = currentStep.comparing[0];
    if (mi >= 0 && mi < currentArray.length) {
      minObj = { value: currentArray[mi], index: mi };
    }
  }
  if (!minObj) {
    minObj = findPersistedValue(["min"], (st) => {
      if (st.phase === "inner_loop" && st.comparing?.length > 0) {
        const mi = st.comparing[0];
        return mi >= 0 && mi < (st.array || []).length;
      }
      return st.min;
    });
  }
  // Hide minIndex during outer_loop phase
  if (currentStep.phase === "outer_loop") {
    minObj = null;
  }

  // ============================================================================
  // INSERTION SORT VARIABLES (key, temp)
  // ============================================================================

  // Key variable (insertion sort)
  const keyObj = currentStep.key || null;

  // Temp variable (for insertion sort in C#/Java)
  let tempObj = currentStep.temp;
  if (!tempObj) {
    const outerLoopStart = sortingSteps
      .slice(0, currentStepIndex + 1)
      .reverse()
      .findIndex((st) => st?.phase === "outer_loop");
    const searchStart =
      outerLoopStart >= 0
        ? currentStepIndex - outerLoopStart
        : currentStepIndex - 1;
    tempObj = findPersistedValue("temp", null, searchStart);
  }

  // Only display the temp variable during actual swap steps
  if (!(currentStep.phase === "swap" || currentStep.phase === "swap_step")) {
    tempObj = null;
  }

  // ============================================================================
  // MERGE SORT VARIABLES (left, right, i, mid, mergeRange, tempArray)
  // ============================================================================

  // Find effective merge range for scoping
  const effectiveMergeRange =
    currentMergeRange ||
    findPersistedValue("mergeRange", null, currentStepIndex);

  const mergeScopeCheck = (st) =>
    !st.mergeRange ||
    !effectiveMergeRange ||
    rangeMatches(st.mergeRange, effectiveMergeRange);

  // Mid variable (merge sort)
  const midObj = currentStep.mid || findPersistedValue("mid");

  // Left/Right pointers (merge sort)
  const leftVarObj =
    currentStep.leftVar ||
    findPersistedValue(["leftVar", "leftPtr"], mergeScopeCheck);

  const rightVarObj =
    currentStep.rightVar ||
    (typeof currentStep.rightPtr === "number"
      ? { value: currentStep.rightPtr }
      : null) ||
    findPersistedValue(["rightVar", "rightPtr"], mergeScopeCheck);

  // I variable (merge sort copy-back)
  let iVarObj =
    currentStep.iVar ||
    (typeof currentStep.i === "number" ? { value: currentStep.i } : null) ||
    (typeof currentStep.t === "number" ? { value: currentStep.t } : null) ||
    (currentStep.phase === "write" && currentStep.leftVar
      ? { value: currentStep.leftVar.value }
      : null);

  if (!iVarObj) {
    iVarObj = findPersistedValue(["iVar", "i", "t"], (st) => {
      if (!mergeScopeCheck(st)) return false;
      if (st.phase === "write" && st.leftVar) return true;
      return st.iVar || typeof st.i === "number" || typeof st.t === "number";
    });
  }

  // Merge temp array
  let mergeSnapshotStep = null;
  for (let s = currentStepIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (st?.mergeRange && st.phase && st.phase !== "conquer") {
      mergeSnapshotStep = st;
      break;
    }
  }

  const showMergeTemp =
    mergeSnapshotStep && mergeSnapshotStep.phase !== "merge-complete";

  // Merged indices tracking
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

  // ============================================================================
  // QUICKSORT VARIABLES (pivotIndex, randomIndex, call stack)
  // ============================================================================

  const currentPivotIndex =
    currentStep.pIndex ?? currentStep.pivotIndex ?? null;

  // Random index (quicksort)
  const randomIndexObj =
    currentStep.randomIndex !== undefined
      ? { value: currentStep.randomIndex }
      : null;

  // Build active call stack (for merge sort and quicksort)
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

  // ============================================================================
  // SHOW UI FLAGS
  // ============================================================================

  const startStepIndex = sortingSteps.findIndex((s) => s?.phase === "start");
  const seenStart = startStepIndex !== -1 && startStepIndex <= currentStepIndex;
  const showCallUI = (activeCallFrames.length > 0 || seenStart) && !isDone;

  const languageUsesTemp = ["csharp", "java"].includes(selectedLanguage);
  const showTempUI = !isDone && languageUsesTemp && !!tempObj;
  const showKeyUI = !!keyObj;
  const showMinUI = !isDone && !!minObj;
  const showRandomIndexUI =
    !isDone && !!randomIndexObj && currentStep.phase === "partition-entry";
  const showMidUI = !!midObj;
  const showLeftVar = !!leftVarObj && !isDone;
  const showRightVar = !!rightVarObj && !isDone;

  // ============================================================================
  // RENDER VARIABLE CARD
  // ============================================================================

  const VariableCard = ({ label, value, bgColor = "bg-yellow-300" }) => (
    <div
      className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium ${bgColor} text-gray-900 shadow-md`}
    >
      <div className="text-center">
        <div className="text-xs text-gray-700">{label}</div>
        <div className="text-lg font-bold">{safeValue(value)}</div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 bg-gray-900 rounded-lg min-h-[50vh]">
      <div className="bg-code-bg rounded-lg p-1 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Variable Display Row */}
          {(showTempUI ||
            showMidUI ||
            showMinUI ||
            showKeyUI ||
            showCallUI ||
            showLeftVar ||
            showRightVar ||
            showRandomIndexUI) && (
            <div className="mb-4 flex items-center justify-center w-full gap-4">
              {/* Insertion Sort: temp */}
              {showTempUI && (
                <VariableCard label="temp" value={tempObj.value} />
              )}

              {/* Selection Sort: minIndex */}
              {showMinUI && (
                <VariableCard
                  label="minIndex"
                  value={minObj.index}
                  bgColor="bg-orange-300"
                />
              )}

              {/* Insertion Sort: key */}
              {showKeyUI && (
                <VariableCard
                  label="key"
                  value={keyObj.value}
                  bgColor="bg-rose-300"
                />
              )}

              {/* Merge/Quick Sort: Call Stack */}
              {showCallUI && (
                <div className="flex items-end gap-3">
                  {activeCallFrames.map((frame, idx) => {
                    const ord = frame.ord ?? idx + 1;
                    const frameMid =
                      frame.mid ||
                      (currentStep.phase === "calculate-mid" &&
                      currentStep.low === frame.low &&
                      currentStep.high === frame.high
                        ? currentStep.mid
                        : null);
                    const isLatest = idx === activeCallFrames.length - 1;

                    return (
                      <div
                        key={`call-frame-${ord}`}
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
                            )} + (${safeValue(
                              frameMid.rightIndex
                            )} - ${safeValue(frameMid.leftIndex)}) / 2 `}</div>
                            <div className="text-sm font-mono">{`= ${safeValue(
                              frameMid.value
                            )}`}</div>
                          </div>
                        )}

                        {(frame.pIndex !== undefined ||
                          (currentStep.pIndex !== undefined &&
                            currentStep.low === frame.low &&
                            currentStep.high === frame.high)) && (
                          <div className="mt-1 h-auto min-w-[120px] px-2 rounded-md flex flex-col items-start justify-center font-medium bg-rose-200 text-gray-900 shadow-sm">
                            <div className="text-sm font-semibold w-full text-center">
                              pIndex
                            </div>
                            <div className="text-sm font-mono">{`= ${
                              frame.pIndex ?? currentStep.pIndex
                            }`}</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Array Display */}
          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isMinPhase = currentStep.phase === "min_update";
              const isComparing =
                comparingIndices.includes(index) && !isSwapPhase && !isMinPhase;
              const isSwapped =
                sortingSteps[currentStepIndex]?.swapped?.includes(index);
              const isPivot =
                currentPivotIndex !== null && index === currentPivotIndex;
              const isMergedDone = mergedDoneIndices.has(index);

              const baseClass = isComparing
                ? "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse"
                : isSwapped
                ? "bg-teal-400 text-white border-teal-600 scale-105"
                : isPivot
                ? "bg-gray-600 text-white border-gray-400"
                : isMergedDone
                ? "bg-yellow-200 text-gray-900 border-yellow-300"
                : "bg-gray-700 text-white border-gray-600";

              return (
                <div
                  key={`${index}-${value}`}
                  className="flex flex-col items-center"
                >
                  <div
                    className={`flex items-center justify-center h-12 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass}`}
                  >
                    <span className="drop-shadow-lg">{value}</span>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-400 text-sm font-mono">
                      {index}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bubble Sort / Selection Sort: i/j Display */}
          {(() => {
            const showSelectionIJ =
              (selectionIObj || selectionJObj) && !!minObj;
            const showBubbleIJ = (bubbleIObj || bubbleJObj) && !showSelectionIJ;
            if (!showSelectionIJ && !showBubbleIJ) return null;

            const iObjToShow = showSelectionIJ ? selectionIObj : bubbleIObj;
            const jObjToShow = showSelectionIJ ? selectionJObj : bubbleJObj;

            return (
              <div className="mt-3 flex items-center justify-center gap-4 w-full">
                {iObjToShow && (
                  <VariableCard
                    label="i"
                    value={iObjToShow.value}
                    bgColor="bg-sky-300"
                  />
                )}
                {jObjToShow && (
                  <VariableCard
                    label="j"
                    value={jObjToShow.value}
                    bgColor="bg-fuchsia-300"
                  />
                )}
              </div>
            );
          })()}

          {/* Merge Sort: Temp Array Display */}
          {showMergeTemp &&
            mergeSnapshotStep &&
            (() => {
              const [l, r] = mergeSnapshotStep.mergeRange;
              const len = Math.max(0, r - l + 1);
              if (len === 0) return null;

              let snapshot =
                mergeSnapshotStep.tempArray ||
                mergeSnapshotStep.tempSnapshot ||
                mergeSnapshotStep.temp?.array ||
                currentStep.tempArray;

              return (
                <div className="mt-3 flex items-center justify-between w-full px-8">
                  <div className="flex-1"></div>
                  <div className="flex justify-center gap-4">
                    {leftVarObj && (
                      <VariableCard
                        label="left"
                        value={leftVarObj.value}
                        bgColor="bg-orange-300"
                      />
                    )}

                    <div className="flex flex-col items-center max-w-full min-h-14 h-auto px-3 py-1 bg-cyan-400 rounded-lg shadow-md">
                      <div className="text-xs font-semibold text-gray-700">
                        tempArray
                      </div>
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
                              <div className="text-xs text-gray-700 mt-1">
                                {i}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {rightVarObj && (
                      <VariableCard
                        label="right"
                        value={rightVarObj.value}
                        bgColor="bg-orange-300"
                      />
                    )}
                  </div>
                  <div className="flex-1 flex justify-end">
                    {iVarObj && (
                      <VariableCard
                        label="i"
                        value={iVarObj.value}
                        bgColor="bg-rose-300"
                      />
                    )}
                  </div>
                </div>
              );
            })()}

          {/* QuickSort: Random Index */}
          {randomIndexObj && (
            <div className="mt-3 flex items-center justify-center gap-4 w-full">
              <div className="min-h-10 w-36 py-1 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md">
                <div className="text-center">
                  <div className="text-xs text-gray-700">randomIndex</div>
                  <div className="text-lg font-bold">
                    {safeValue(randomIndexObj.value)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
