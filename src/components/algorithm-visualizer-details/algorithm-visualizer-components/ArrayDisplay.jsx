import React from "react";

const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript" || "csharp",
}) => {
  const currentStep = sortingSteps[currentStepIndex] || {};
  const currentMergeRange = currentStep.mergeRange || null;
  const currentLeftRange = currentStep.leftRange || null;
  const currentRightRange = currentStep.rightRange || null;

  // Quick Sort specific ranges and pivot
  const currentPartitionRange = currentStep.partitionRange || null;
  const currentPivotIndex =
    currentStep.pivotIndex !== undefined ? currentStep.pivotIndex : null;
  const currentPivotStrategy = currentStep.pivotStrategy || null;

  // Use structured temp field when available (preferred)
  let tempObj = currentStep && currentStep.temp ? currentStep.temp : null; // { value, index }

  // If the current step lacks a temp, try to find the most recent temp from
  // earlier steps but limit persistence to the current 'outer_loop' (pass)
  // so we don't carry a temp across passes or after sorting completes.
  if (!tempObj && sortingSteps && sortingSteps.length > 0) {
    let outerLoopStart = -1;
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (st && st.phase === "outer_loop") {
        outerLoopStart = s;
        break;
      }
    }
    for (let s = currentStepIndex - 1; s > outerLoopStart; s--) {
      const st = sortingSteps[s];
      if (st && st.hasOwnProperty("temp") && st.temp) {
        tempObj = st.temp;
        break;
      }
    }
  }
  // Use structured key field (insertion sort) when available
  let keyObj = currentStep && currentStep.key ? currentStep.key : null; // { value, index }
  // Use structured j field (insertion sort scanning pointer)
  let jObj = currentStep && currentStep.j ? currentStep.j : null; // { value, index }

  // Get mid variable information
  let midObj = currentStep && currentStep.mid ? currentStep.mid : null; // { value, leftIndex, rightIndex }

  // left/right variables used during merge helper
  let leftVarObj =
    currentStep && currentStep.leftVar ? currentStep.leftVar : null; // { value }
  let rightVarObj =
    currentStep && currentStep.rightVar
      ? currentStep.rightVar
      : currentStep && typeof currentStep.rightPtr === "number"
      ? { value: currentStep.rightPtr }
      : null; // { value }
  // i variable used during copy-back / for-loops in merge helper
  let iVarObj =
    currentStep && currentStep.iVar
      ? currentStep.iVar
      : currentStep && typeof currentStep.i === "number"
      ? { value: currentStep.i }
      : currentStep && typeof currentStep.t === "number"
      ? { value: currentStep.t }
      : currentStep && currentStep.phase === "write" && currentStep.leftVar
      ? { value: currentStep.leftVar.value }
      : null;
  // persist left/right across the merge steps (search earlier steps)
  if (!leftVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (st && st.leftVar) {
        leftVarObj = st.leftVar;
        break;
      }
    }
  }
  if (!rightVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.rightVar) {
        rightVarObj = st.rightVar;
        break;
      }
      if (typeof st.rightPtr === "number") {
        rightVarObj = { value: st.rightPtr };
        break;
      }
    }
  }

  // persist i variable (for the write / for-loop) across prior steps
  if (!iVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.iVar) {
        iVarObj = st.iVar;
        break;
      }
      if (typeof st.i === "number") {
        iVarObj = { value: st.i };
        break;
      }
      if (typeof st.t === "number") {
        iVarObj = { value: st.t };
        break;
      }
      // if prior write steps used leftVar to indicate the write index, use that
      if (
        st.phase === "write" &&
        st.leftVar &&
        typeof st.leftVar.value === "number"
      ) {
        iVarObj = { value: st.leftVar.value };
        break;
      }
    }
  }

  // Compute a pass number for recursion entries so we can show 'Pass N'
  // Pass number is the count of previous 'function-entry' steps (including this one)
  let passNumber = null;
  if (sortingSteps && sortingSteps.length > 0 && currentStep) {
    const upto = sortingSteps.slice(0, currentStepIndex + 1);
    const entryCount = upto.filter(
      (s) => s && s.phase === "function-entry"
    ).length;
    if (
      entryCount > 0 &&
      (currentStep.low !== undefined ||
        midObj ||
        currentStep.high !== undefined)
    ) {
      passNumber = entryCount;
    }
  }

  // Build an active call stack for mergeSort calls so we can render persistent,
  // stacked "Call N" chips that remain until their corresponding return.
  // Algorithm: scan steps from the start up to the current step. Push a frame when
  // we see a 'call-left' or 'call-right'. Pop the most-recent matching frame when
  // we see a 'left-complete' or 'right-complete'. This keeps active frames in
  // order of creation (Call 1..N). We deliberately avoid popping on internal
  // 'base' steps because the parent signals the child's completion via the
  // left-complete/right-complete markers.
  const activeCallFrames = [];
  if (sortingSteps && sortingSteps.length > 0) {
    // callCounter gives each call frame a monotonically increasing ordinal
    // as we scan the steps. This ensures "Call N" increases across the trace
    // (instead of being calculated from the current stack depth) and provides
    // a stable React key for each frame.
    let callCounter = 0;
    for (
      let i = 0;
      i <= Math.min(currentStepIndex, sortingSteps.length - 1);
      i++
    ) {
      const st = sortingSteps[i];
      if (!st || !st.phase) continue;
      // Treat the initial 'start' step as the first call frame as well
      // so the initial mergeSort(arr, 0, n-1) appears as Call 1.
      if (
        st.phase === "start" ||
        st.phase === "call-left" ||
        st.phase === "call-right"
      ) {
        // snapshot low/mid/high for the call chip
        callCounter += 1;
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
        for (let p = activeCallFrames.length - 1; p >= 0; p--) {
          const frame = activeCallFrames[p];
          if (frame.low === st.low && frame.high === st.high) {
            frame.mid = st.mid; // persist mid inside frame
            break;
          }
        }
      } else if (st.phase === "left-complete") {
        // pop the most recent call-left frame
        for (let p = activeCallFrames.length - 1; p >= 0; p--) {
          if (activeCallFrames[p].kind === "call-left") {
            activeCallFrames.splice(p, 1);
            break;
          }
        }
      } else if (st.phase === "right-complete") {
        // pop the most recent call-right frame
        for (let p = activeCallFrames.length - 1; p >= 0; p--) {
          if (activeCallFrames[p].kind === "call-right") {
            activeCallFrames.splice(p, 1);
            break;
          }
        }
      } else if (st.phase === "base" || st.phase === "subarray-sorted") {
        // Some generators omit explicit "left-complete"/"right-complete"
        // markers and instead emit a "base" or "subarray-sorted" phase for
        // completed calls. In that case, remove the most-recent call frame
        // (the leaf) so the Call chips reflect the returned call. This
        // preserves history when left/right-complete are not present.
        if (activeCallFrames.length > 0) {
          activeCallFrames.pop();
        }
      }
    }
  }

  // Also consider the explicit 'start' step: if the generator emitted a 'start'
  // step and the currentStepIndex has reached it, we should show the root
  // call chip immediately (this makes the Call 1 card appear when the
  // Initial call step is visible in step history).
  const startStepIndex =
    sortingSteps && sortingSteps.length > 0
      ? sortingSteps.findIndex((s) => s && s.phase === "start")
      : -1;
  const seenStart = startStepIndex !== -1 && startStepIndex <= currentStepIndex;

  // Show Call UI when there is at least one active call frame or we've
  // reached the 'start' step, but do not show on the final 'completed' phase.
  const showCallUI =
    (activeCallFrames.length > 0 || seenStart) &&
    !(currentStep && currentStep.phase === "completed");

  // Get minIndex information (selection sort). Generators emit a 'min_update' phase
  // and place the min index inside comparing: [minIndex]. We prefer an explicit
  // minObj when available, otherwise derive it from the current step or earlier steps
  // so the UI can persist the min variable like Temp.
  let minObj = currentStep && currentStep.min ? currentStep.min : null; // { value, index }
  if (
    !minObj &&
    currentStep &&
    currentStep.phase === "min_update" &&
    currentStep.comparing &&
    currentStep.comparing.length > 0
  ) {
    const mi = currentStep.comparing[0];
    if (mi >= 0 && mi < currentArray.length) {
      minObj = { value: currentArray[mi], index: mi };
    }
  }
  // If the current step lacks an explicit min, try to find the most recent min_update
  // from earlier steps so the UI persists the min once it's created.
  if (!minObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (
        st &&
        st.phase === "min_update" &&
        st.comparing &&
        st.comparing.length > 0
      ) {
        const mi = st.comparing[0];
        if (mi >= 0 && mi < (st.array || []).length) {
          minObj = { value: st.array[mi], index: mi };
          break;
        }
      }
      if (st && st.min) {
        const mi = st.min.index;
        if (mi >= 0 && mi < (st.array || []).length) {
          minObj = { value: st.min.value, index: mi };
          break;
        }
      }
    }
  }

  // earlier steps so the UI persists the mid once it's calculated.
  if (!midObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      if (sortingSteps[s] && sortingSteps[s].mid) {
        midObj = sortingSteps[s].mid;
        break;
      }
    }
  }

  // Only show temp UI when the language actually uses a temp variable (C/Java)
  // and a temp object exists (either on this step or persisted from prior steps).
  const languageUsesTemp =
    selectedLanguage === "csharp" || selectedLanguage === "java";
  const isDone = currentStep && currentStep.phase === "completed";
  const showTempUI = !isDone && languageUsesTemp && !!tempObj;
  // Merge-specific temp (visualized under the array) — persist until merge-complete
  // Find the most recent step (<= currentStepIndex) that exposes a mergeRange
  let mergeSnapshotStep = null;
  if (sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      // Only use a merge snapshot that actually belongs to the merge helper
      // (exclude the pre-merge 'conquer' announcement step). This ensures the
      // temp is shown starting at the in-merge 'form-temp' (or similar) step
      // rather than at the earlier 'conquer' step.
      if (st && st.mergeRange && st.phase && st.phase !== "conquer") {
        mergeSnapshotStep = st;
        break;
      }
    }
  }
  // show merge temp when we have a mergeSnapshotStep and it hasn't completed yet
  const showMergeTemp = !!(
    mergeSnapshotStep && mergeSnapshotStep.phase !== "merge-complete"
  );
  // Show left/right variables when present
  const showLeftVar = !!leftVarObj && !isDone;
  const showRightVar = !!rightVarObj && !isDone;
  // show key UI when a key object exists (insertion sort)
  const showKeyUI = !!keyObj;
  const tempValue = showTempUI ? tempObj.value : null;
  const jIndex = jObj ? jObj.index : -1;
  // Show mid UI when mid calculation is relevant (merge sort algorithm)
  const showMidUI = !!midObj;

  // Show min UI when selection-sort has a min index
  const showMinUI = !isDone && !!minObj;
  const minIndex = showMinUI ? minObj.index : -1;

  // Collect indices that have been fully merged (from merge-complete steps)
  const mergedDoneIndices = new Set();
  if (sortingSteps && sortingSteps.length > 0) {
    for (let s = 0; s <= currentStepIndex; s++) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.phase === "merge-complete") {
        if (
          st.mergeRange &&
          Array.isArray(st.mergeRange) &&
          st.mergeRange.length === 2
        ) {
          const [ml, mh] = st.mergeRange;
          for (let idx = ml; idx <= mh; idx++) mergedDoneIndices.add(idx);
        } else if (Array.isArray(st.swapped) && st.swapped.length > 0) {
          st.swapped.forEach((idx) => mergedDoneIndices.add(idx));
        }
      }
    }
  }

  // When the current step is a swap or swap_step phase, we prefer to
  // show Temp/Swapped visuals and hide the generic Comparing badge
  const isSwapPhase =
    currentStep &&
    (currentStep.phase === "swap" || currentStep.phase === "swap_step");
  return (
    <div className="space-y-4 bg-gray-900 rounded-lg">
      <div className="bg-code-bg rounded-lg p-3 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Variables section - show temp, mid, or active call frames when appropriate */}
          {(showTempUI ||
            showMidUI ||
            showMinUI ||
            showKeyUI ||
            jObj ||
            showCallUI ||
            showLeftVar ||
            showRightVar) && (
            <div className="mb-4 flex items-center justify-center w-full gap-4">
              {/* Temp slot - only rendered for languages that use a temp (C/Java) and when appropriate */}
              {showTempUI && (
                <div
                  className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-yellow-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">temp</div>
                    <div className="text-lg font-bold">
                      {tempValue != null ? tempValue : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Min slot - selection sort minIndex indicator */}
              {showMinUI && (
                <div
                  className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">minIndex</div>
                    <div className="text-lg font-bold">
                      {minIndex != null ? minIndex : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Key slot - insertion sort key indicator */}
              {showKeyUI && (
                <div
                  className={`h-12 w-32 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">key</div>
                    <div className="text-lg font-bold">
                      {keyObj && keyObj.value != null ? keyObj.value : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* j slot - insertion sort scanning pointer */}
              {jObj && (
                <div
                  className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-fuchsia-400 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">j</div>
                    <div className="text-lg font-bold">
                      {jIndex != null ? jIndex : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Call chips - render all active frames left -> right so stacks persist until popped */}
              {showCallUI && (
                <div className="flex items-end gap-3">
                  {activeCallFrames.map((frame, idx) => {
                    const ord = frame.ord != null ? frame.ord : idx + 1;
                    // Prefer the frame's stored mid, otherwise if the current
                    // step is a mid calculation for the same low/high, use that
                    // so the mid appears under the correct Call chip while the
                    // calculate-mid step is active.
                    const frameMid =
                      frame.mid ||
                      (currentStep &&
                      currentStep.phase === "calculate-mid" &&
                      currentStep.low === frame.low &&
                      currentStep.high === frame.high
                        ? currentStep.mid
                        : null);
                    const midVal = frameMid ? frameMid.value : "-";
                    const midL = frameMid ? frameMid.leftIndex : "-";
                    const midR = frameMid ? frameMid.rightIndex : "-";
                    return (
                      <div
                        key={`call-frame-${ord}`}
                        className="flex flex-col items-center"
                      >
                        <div className="h-12 min-w-[180px] px-3 rounded-lg flex flex-col items-center justify-center font-medium bg-emerald-300 text-gray-900 shadow-md">
                          <div className="text-sm font-semibold truncate">
                            {`Call ${ord}: `}
                          </div>
                          <div className="text-sm font-mono truncate">{`low=${
                            frame.low ?? "-"
                          },  high=${frame.high ?? "-"}`}</div>
                        </div>
                        {frameMid && (
                          <div className="mt-1 h-auto min-w-[120px] px-2 rounded-md flex flex-col items-start justify-center font-medium bg-purple-300 text-gray-900 shadow-sm">
                            <div className="text-sm font-semibold w-full text-center">{`mid`}</div>
                            <div className="text-sm font-mono">
                              {`= ${midL} + (${midR} - ${midL}) / 2 `}
                            </div>
                            <div className="text-sm font-mono">
                              {`= ${midVal}`}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isMinPhase =
                currentStep && currentStep.phase === "min_update";
              const isComparing =
                comparingIndices.includes(index) && !isSwapPhase && !isMinPhase;
              const isSwapped =
                sortingSteps[currentStepIndex]?.swapped?.includes(index);

              // Quick Sort specific highlighting
              const inPartitionRange =
                currentPartitionRange &&
                index >= currentPartitionRange[0] &&
                index <= currentPartitionRange[1];
              const isPivot =
                currentPivotIndex !== null && index === currentPivotIndex;

              const isMergedDone = mergedDoneIndices.has(index);
              const baseClass = isComparing
                ? "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse"
                : isSwapped
                ? "bg-teal-400 text-white border-teal-600 scale-105"
                : isPivot
                ? "bg-gray-600 text-white border-gray-400"
                : inPartitionRange
                ? "bg-orange-500 text-white border-orange-400"
                : isMergedDone
                ? "bg-yellow-200 text-gray-900 border-yellow-300"
                : "bg-gray-700 text-white border-gray-600";

              return (
                <div
                  key={`${index}-${value}`}
                  className="flex flex-col items-center"
                >
                  {isComparing && (
                    <div className="mb-2">
                      <div className="bg-indigo-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Comparing
                      </div>
                    </div>
                  )}

                  {isPivot && (
                    <div className="mb-2">
                      <div className="bg-red-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Pivot
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass} `}
                  >
                    {/* add key highlight class as well */}
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

          {/* Merge temp array visualization (tempArray with left/right beside it) */}
          {showMergeTemp &&
            mergeSnapshotStep &&
            (() => {
              const [l, r] = mergeSnapshotStep.mergeRange;
              const len = Math.max(0, r - l + 1);
              if (len === 0) return null;

              // Prefer a structured temp array field (tempArray) if present.
              // Fallback to older keys used previously: tempSnapshot or temp.array.
              let snapshot = null;
              if (mergeSnapshotStep) {
                if (Array.isArray(mergeSnapshotStep.tempArray)) {
                  snapshot = mergeSnapshotStep.tempArray;
                } else if (
                  mergeSnapshotStep.tempSnapshot &&
                  Array.isArray(mergeSnapshotStep.tempSnapshot)
                ) {
                  snapshot = mergeSnapshotStep.tempSnapshot;
                } else if (
                  mergeSnapshotStep.temp &&
                  Array.isArray(mergeSnapshotStep.temp.array)
                ) {
                  snapshot = mergeSnapshotStep.temp.array;
                }
              }
              // If no mergeSnapshotStep snapshot was found, also allow the
              // current step to directly expose a tempArray for immediate display.
              if (
                !snapshot &&
                currentStep &&
                Array.isArray(currentStep.tempArray)
              ) {
                snapshot = currentStep.tempArray;
              }

              return (
                <div className="mt-6 flex items-center justify-around gap-20 ">
                  <div className="flex justify-around gap-4 ">
                    {" "}
                    {/* Left variable block */}
                    {leftVarObj && (
                      <div className="h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-orange-300 text-gray-900 shadow-md">
                        <div className="text-center">
                          <div className="text-xs text-gray-700">left</div>
                          <div className="text-lg font-bold">
                            {leftVarObj.value != null ? leftVarObj.value : "-"}
                          </div>
                        </div>
                      </div>
                    )}
                    {/* Temp Array */}
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
                    {/* Right variable block */}
                    {rightVarObj && (
                      <div className="h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-orange-300 text-gray-900 shadow-md">
                        <div className="text-center">
                          <div className="text-xs text-gray-700">right</div>
                          <div className="text-lg font-bold">
                            {rightVarObj.value != null
                              ? rightVarObj.value
                              : "-"}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* i variable block (used during copy-back / for loops) */}
                  {iVarObj && (
                    <div className="h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-rose-300 text-gray-900 shadow-md">
                      <div className="text-center">
                        <div className="text-xs text-gray-700">i</div>
                        <div className="text-lg font-bold">
                          {iVarObj.value != null ? iVarObj.value : "-"}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}

          {/* Legend for ranges, mid, and pivot */}
          {(currentMergeRange ||
            currentLeftRange ||
            currentRightRange ||
            currentPartitionRange ||
            currentPivotIndex !== null ||
            showMidUI) && (
            <div className="mt-6 flex gap-2 items-center flex-wrap justify-center">
              {currentPartitionRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-orange-100 text-orange-800">
                  Partition: {currentPartitionRange[0]}-
                  {currentPartitionRange[1]}
                </div>
              )}
              {currentPivotIndex !== null && (
                <div className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                  Pivot: {currentPivotIndex}{" "}
                  {currentPivotStrategy &&
                    `(${
                      typeof currentPivotStrategy === "number"
                        ? `index ${currentPivotStrategy}`
                        : currentPivotStrategy
                    })`}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArrayDisplay;
