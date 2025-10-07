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

  // helper to compare merge ranges
  const rangeMatches = (a, b) => {
    if (!a || !b) return false;
    if (!Array.isArray(a) || !Array.isArray(b)) return false;
    return a[0] === b[0] && a[1] === b[1];
  };

  // ============================================================================
  // QUICK SORT SPECIFIC RANGES AND PIVOT
  // ============================================================================
  const currentPartitionRange = currentStep.partitionRange || null;
  const currentPivotIndex =
    currentStep.pivotIndex !== undefined ? currentStep.pivotIndex : null;
  const currentPivotStrategy = currentStep.pivotStrategy || null;

  // ============================================================================
  // USE STRUCTURED TEMP FIELD WHEN AVAILABLE (PREFERRED)
  // ============================================================================
  let tempObj = currentStep && currentStep.temp ? currentStep.temp : null; // { value, index }

  // ============================================================================
  // IF CURRENT STEP LACKS TEMP, FIND MOST RECENT TEMP FROM EARLIER STEPS
  // Limit persistence to the current 'outer_loop' (pass) so we don't carry
  // a temp across passes or after sorting completes.
  // ============================================================================
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

  // ============================================================================
  // USE STRUCTURED KEY FIELD (INSERTION SORT) WHEN AVAILABLE
  // ============================================================================
  let keyObj = currentStep && currentStep.key ? currentStep.key : null; // { value, index }

  // ============================================================================
  // USE STRUCTURED J FIELD (INSERTION SORT SCANNING POINTER)
  // ============================================================================
  let jObj = currentStep && currentStep.j ? currentStep.j : null; // { value, index }

  // ============================================================================
  // GET MID VARIABLE INFORMATION
  // ============================================================================
  let midObj = currentStep && currentStep.mid ? currentStep.mid : null; // { value, leftIndex, rightIndex }

  // ============================================================================
  // LEFT/RIGHT VARIABLES USED DURING MERGE HELPER
  // ============================================================================
  let leftVarObj =
    currentStep && currentStep.leftVar ? currentStep.leftVar : null; // { value }
  let rightVarObj =
    currentStep && currentStep.rightVar
      ? currentStep.rightVar
      : currentStep && typeof currentStep.rightPtr === "number"
      ? { value: currentStep.rightPtr }
      : null; // { value }

  // ============================================================================
  // I VARIABLE USED DURING COPY-BACK / FOR-LOOPS IN MERGE HELPER
  // ============================================================================
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

  // ---------------------------------------------------------------------------
  // Determine an "effective" merge range to scope persistence searches.
  // Some steps (e.g. early while-check) may not include mergeRange, which
  // previously allowed the backward search to traverse unrelated merges and
  // pick up stale `i`/`left`/`right` values. Find the closest mergeRange in
  // prior steps when currentStep.mergeRange is missing and use that as the
  // effective scope for persistence.
  // ---------------------------------------------------------------------------
  let effectiveMergeRange = currentMergeRange;
  if (!effectiveMergeRange && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (st && st.mergeRange) {
        effectiveMergeRange = st.mergeRange;
        break;
      }
    }
  }

  // ============================================================================
  // PERSIST LEFT/RIGHT ACROSS MERGE STEPS (SEARCH EARLIER STEPS)
  // ============================================================================
  if (!leftVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      // stop once we reach a step that belongs to a different merge
      if (st.mergeRange && effectiveMergeRange && !rangeMatches(st.mergeRange, effectiveMergeRange)) {
        break;
      }
      if (st.leftVar) {
        leftVarObj = st.leftVar;
        break;
      }
      // also allow legacy left pointer fields if present
      if (typeof st.leftPtr === "number") {
        leftVarObj = { value: st.leftPtr };
        break;
      }
    }
  }
  if (!rightVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      // stop once we reach a step that belongs to a different merge
      if (st.mergeRange && effectiveMergeRange && !rangeMatches(st.mergeRange, effectiveMergeRange)) {
        break;
      }
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

  // ============================================================================
  // PERSIST I VARIABLE (FOR WRITE / FOR-LOOP) ACROSS PRIOR STEPS
  // ============================================================================
  if (!iVarObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      // stop once we reach a step that belongs to a different merge
      if (st.mergeRange && effectiveMergeRange && !rangeMatches(st.mergeRange, effectiveMergeRange)) {
        break;
      }
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

  // ============================================================================
  // COMPUTE PASS NUMBER FOR RECURSION ENTRIES TO SHOW 'PASS N'
  // Pass number is the count of previous 'function-entry' steps (including this one)
  // ============================================================================
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

  // ============================================================================
  // BUILD ACTIVE CALL STACK FOR MERGESORT CALLS
  // Render persistent, stacked "Call N" chips that remain until their corresponding return.
  // Algorithm: Scan steps from start to current. Push frame on 'call-left'/'call-right'.
  // Pop matching frame on 'left-complete'/'right-complete'. Frames stay in creation order
  // (Call 1..N). Avoid popping on internal 'base' steps; parent signals completion
  // via left-complete/right-complete markers.
  // ============================================================================
  const activeCallFrames = [];
  if (sortingSteps && sortingSteps.length > 0) {
    let callCounter = 0;
    for (
      let i = 0;
      i <= Math.min(currentStepIndex, sortingSteps.length - 1);
      i++
    ) {
      const st = sortingSteps[i];
      if (!st || !st.phase) continue;
      if (
        st.phase === "start" ||
        st.phase === "call-left" ||
        st.phase === "call-right"
      ) {
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
            frame.mid = st.mid;
            break;
          }
        }
      } else if (st.phase === "left-complete") {
        for (let p = activeCallFrames.length - 1; p >= 0; p--) {
          if (activeCallFrames[p].kind === "call-left") {
            activeCallFrames.splice(p, 1);
            break;
          }
        }
      } else if (st.phase === "right-complete") {
        for (let p = activeCallFrames.length - 1; p >= 0; p--) {
          if (activeCallFrames[p].kind === "call-right") {
            activeCallFrames.splice(p, 1);
            break;
          }
        }
      } else if (st.phase === "base" || st.phase === "subarray-sorted") {
        // ====================================================================
        // SOME GENERATORS OMIT EXPLICIT "LEFT-COMPLETE"/"RIGHT-COMPLETE" MARKERS
        // Instead emit "base" or "subarray-sorted" phase for completed calls.
        // In that case, remove the most-recent call frame (the leaf) so the
        // Call chips reflect the returned call. This preserves history when
        // left/right-complete are not present.
        // ====================================================================
        if (activeCallFrames.length > 0) {
          activeCallFrames.pop();
        }
      }
    }
  }

  // ============================================================================
  // CONSIDER EXPLICIT 'START' STEP
  // If generator emitted a 'start' step and currentStepIndex has reached it,
  // show root call chip immediately (makes Call 1 card appear when Initial
  // call step is visible in step history).
  // ============================================================================
  const startStepIndex =
    sortingSteps && sortingSteps.length > 0
      ? sortingSteps.findIndex((s) => s && s.phase === "start")
      : -1;
  const seenStart = startStepIndex !== -1 && startStepIndex <= currentStepIndex;

  // ============================================================================
  // SHOW CALL UI WHEN APPROPRIATE
  // Show when at least one active call frame exists or we've reached 'start' step,
  // but do NOT show on final 'completed' phase.
  // ============================================================================
  const showCallUI =
    (activeCallFrames.length > 0 || seenStart) &&
    !(currentStep && currentStep.phase === "completed");

  // ============================================================================
  // GET MININDEX INFORMATION (SELECTION SORT)
  // Generators emit 'min_update' phase and place min index inside comparing: [minIndex].
  // Prefer explicit minObj when available, otherwise derive from current step or
  // earlier steps so UI can persist the min variable like Temp.
  // ============================================================================
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

  // ============================================================================
  // IF CURRENT STEP LACKS EXPLICIT MIN, FIND MOST RECENT MIN_UPDATE
  // FROM EARLIER STEPS SO UI PERSISTS THE MIN ONCE IT'S CREATED
  // ============================================================================
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

  // ============================================================================
  // IF NO MIDOBJ, SEARCH EARLIER STEPS SO UI PERSISTS MID ONCE CALCULATED
  // ============================================================================
  if (!midObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      if (sortingSteps[s] && sortingSteps[s].mid) {
        midObj = sortingSteps[s].mid;
        break;
      }
    }
  }

  // ============================================================================
  // SHOW TEMP UI ONLY WHEN LANGUAGE USES TEMP AND TEMP OBJECT EXISTS
  // Languages: C/Java use temp variables. Show when not done and temp object exists.
  // ============================================================================
  const languageUsesTemp =
    selectedLanguage === "csharp" || selectedLanguage === "java";
  const isDone = currentStep && currentStep.phase === "completed";
  const showTempUI = !isDone && languageUsesTemp && !!tempObj;

  // ============================================================================
  // MERGE-SPECIFIC TEMP (VISUALIZED UNDER ARRAY)
  // Persist until merge-complete. Find most recent step (<= currentStepIndex)
  // that exposes mergeRange.
  // ============================================================================
  let mergeSnapshotStep = null;
  if (sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      // ====================================================================
      // ONLY USE MERGE SNAPSHOT THAT BELONGS TO MERGE HELPER
      // Exclude pre-merge 'conquer' announcement step. Ensures temp shows
      // starting at in-merge 'form-temp' (or similar) step, not earlier
      // 'conquer' step.
      // ====================================================================
      if (st && st.mergeRange && st.phase && st.phase !== "conquer") {
        mergeSnapshotStep = st;
        break;
      }
    }
  }

  // ============================================================================
  // SHOW MERGE TEMP WHEN MERGESNAPSHOT EXISTS AND HASN'T COMPLETED
  // ============================================================================
  const showMergeTemp = !!(
    mergeSnapshotStep && mergeSnapshotStep.phase !== "merge-complete"
  );

  const showLeftVar = !!leftVarObj && !isDone;
  const showRightVar = !!rightVarObj && !isDone;
  const showKeyUI = !!keyObj;
  const tempValue = showTempUI ? tempObj.value : null;
  const jIndex = jObj ? jObj.index : -1;
  const showMidUI = !!midObj;

  // ============================================================================
  // SHOW MIN UI WHEN SELECTION-SORT HAS MIN INDEX
  // ============================================================================
  const showMinUI = !isDone && !!minObj;
  const minIndex = showMinUI ? minObj.index : -1;

  // ============================================================================
  // COLLECT INDICES THAT HAVE BEEN FULLY MERGED (FROM MERGE-COMPLETE STEPS)
  // ============================================================================
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

  // ============================================================================
  // WHEN CURRENT STEP IS SWAP/SWAP_STEP PHASE
  // Prefer to show Temp/Swapped visuals and hide generic Comparing badge
  // ============================================================================
  const isSwapPhase =
    currentStep &&
    (currentStep.phase === "swap" || currentStep.phase === "swap_step");

  return (
    <div className="space-y-4 bg-gray-900 rounded-lg">
      <div className="bg-code-bg rounded-lg p-3 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {(showTempUI ||
            showMidUI ||
            showMinUI ||
            showKeyUI ||
            jObj ||
            showCallUI ||
            showLeftVar ||
            showRightVar) && (
            <div className="mb-4 flex items-center justify-center w-full gap-4">
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

              {showCallUI && (
                <div className="flex items-end gap-3">
                  {activeCallFrames.map((frame, idx) => {
                    const ord = frame.ord != null ? frame.ord : idx + 1;
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
                    className={`flex items-center justify-center h-12 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass} `}
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

          {showMergeTemp &&
            mergeSnapshotStep &&
            (() => {
              const [l, r] = mergeSnapshotStep.mergeRange;
              const len = Math.max(0, r - l + 1);
              if (len === 0) return null;

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
              if (
                !snapshot &&
                currentStep &&
                Array.isArray(currentStep.tempArray)
              ) {
                snapshot = currentStep.tempArray;
              }

              return (
                <div className="mt-3 flex items-center justify-around gap-20 ">
                  <div className="flex justify-around gap-4 ">
                    {" "}
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