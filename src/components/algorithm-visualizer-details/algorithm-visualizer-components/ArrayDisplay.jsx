import React from "react";

const ArrayDisplay = ({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentCodeLine = -1,
  selectedLanguage = "javascript" || "csharp",
  tempLineIndex = -1,
  languageHasTemp = false,
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
  // Use structured key field (insertion sort) when available
  let keyObj = currentStep && currentStep.key ? currentStep.key : null; // { value, index }
  // Use structured j field (insertion sort scanning pointer)
  let jObj = currentStep && currentStep.j ? currentStep.j : null; // { value, index }

  // If the current step lacks a temp, try to find the most recent temp from
  // earlier steps so the UI persists the temp once it's created (defensive).
  if (!tempObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex - 1; s >= 0; s--) {
      if (sortingSteps[s] && sortingSteps[s].temp) {
        tempObj = sortingSteps[s].temp;
        break;
      }
    }
  }

  // Get mid variable information
  let midObj = currentStep && currentStep.mid ? currentStep.mid : null; // { value, leftIndex, rightIndex }

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

  // If the current step lacks a mid, try to find the most recent mid from
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
  const showTempUI = languageUsesTemp && !!tempObj;
  // show key UI when a key object exists (insertion sort)
  const showKeyUI = !!keyObj;
  const tempValue = showTempUI ? tempObj.value : null;
  const tempIndex = showTempUI ? tempObj.index : -1;

  const keyIndex = showKeyUI && keyObj ? keyObj.index : -1;
  const keyValue = showKeyUI && keyObj ? keyObj.value : null;
  const jIndex = jObj ? jObj.index : -1;
  const jValue = jObj ? jObj.value : null;

  // Show mid UI when mid calculation is relevant (merge sort algorithm)
  const showMidUI = !!midObj;
  const midValue = showMidUI ? midObj.value : null;
  const midLeftIndex = showMidUI ? midObj.leftIndex : -1;
  const midRightIndex = showMidUI ? midObj.rightIndex : -1;

  // Show min UI when selection-sort has a min index
  const showMinUI = !!minObj;
  const minValue = showMinUI ? minObj.value : null;
  const minIndex = showMinUI ? minObj.index : -1;

              // When the current step is a swap or swap_step phase, we prefer to
              // show Temp/Swapped visuals and hide the generic Comparing badge
              const isSwapPhase = currentStep && (currentStep.phase === "swap" || currentStep.phase === "swap_step");
  return (
    <div className="space-y-4 bg-gray-900 rounded-lg">
      <div className="bg-code-bg rounded-lg p-8 min-h-[290px] flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          {/* Variables section - show temp and mid when appropriate */}
          {(showTempUI || showMidUI || showMinUI || showKeyUI || jObj) && (
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
                      {keyObj && keyObj.value!= null ? keyObj.value: "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* j slot - insertion sort scanning pointer */}
              {jObj && (
                <div
                  className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium bg-amber-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">j</div>
                    <div className="text-lg font-bold">
                      {jIndex != null ? jIndex : "-"}
                    </div>
                  </div>
                </div>
              )}

              {/* Mid slot - shown during merge sort operations */}
              {showMidUI && (
                <div
                  className={`h-12 w-32 rounded-lg flex items-center justify-center font-medium bg-purple-300 text-gray-900 shadow-md`}
                >
                  <div className="text-center">
                    <div className="text-xs text-gray-700">
                      Mid = ({midLeftIndex} + {midRightIndex}) / 2
                    </div>
                    <div className="text-lg font-bold">
                      {midValue != null ? midValue : "-"}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-center gap-4 flex-wrap">
            {currentArray.map((value, index) => {
              const isMin = showMinUI && index === minIndex;
      // Do not show generic 'Comparing' during swap phases or when the
      // current step is a selection-sort min update (min_update).
      const isMinPhase = currentStep && currentStep.phase === "min_update";
      const isComparing = comparingIndices.includes(index) && !isSwapPhase && !isMinPhase;
              const isSwapped =
                sortingSteps[currentStepIndex]?.swapped?.includes(index);
              const inMergeRange =
                currentMergeRange &&
                index >= currentMergeRange[0] &&
                index <= currentMergeRange[1];
              const inLeftRange =
                currentLeftRange &&
                index >= currentLeftRange[0] &&
                index <= currentLeftRange[1];
              const inRightRange =
                currentRightRange &&
                index >= currentRightRange[0] &&
                index <= currentRightRange[1];

              // Quick Sort specific highlighting
              const inPartitionRange =
                currentPartitionRange &&
                index >= currentPartitionRange[0] &&
                index <= currentPartitionRange[1];
              const isPivot =
                currentPivotIndex !== null && index === currentPivotIndex;

              // highlight if this index matches the temp index and the temp UI is being shown
              const highlightForTemp = showTempUI && index === tempIndex;
              // highlight if this index matches the mid position
              const highlightForMid = showMidUI && index === midValue;
              // highlight if this index matches the key position (insertion sort)
              const highlightForKey = showKeyUI && index === keyIndex;

              const baseClass = isComparing
                ? "bg-indigo-400 text-white border-indigo-600 scale-110 animate-pulse"
                : isSwapped
                ? "bg-green-500 text-white border-green-400 scale-105"
                : isPivot
                ? "bg-red-500 text-white border-red-400 scale-110 animate-bounce"
                : highlightForMid
                ? "bg-purple-500 text-white border-purple-400 scale-105"
                : inLeftRange
                ? "bg-indigo-600 text-white border-indigo-400"
                : inRightRange
                ? "bg-pink-600 text-white border-pink-400"
                : inMergeRange
                ? "bg-gray-600 text-white border-gray-400"
                : inPartitionRange
                ? "bg-orange-500 text-white border-orange-400"
                : "bg-gray-700 text-white border-gray-600";

              const tempHighlightClass = highlightForTemp
                ? "ring-4 ring-yellow-300"
                : "";
              const midHighlightClass = highlightForMid
                ? "ring-4 ring-purple-300"
                : "";
              const keyHighlightClass = highlightForKey
                ? "ring-4 ring-amber-300"
                : "";

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
                 
                  {highlightForMid && (
                    <div className="mb-2">
                      <div className="bg-purple-400 text-white text-xs px-3 py-1 rounded-full font-semibold">
                        Mid
                      </div>
                    </div>
                  )}

                  <div
                    className={`flex items-center justify-center h-16 px-4 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 min-w-[60px] ${baseClass}  ${midHighlightClass}`}
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

          
          {/* Legend for ranges, mid, and pivot */}
          {(currentMergeRange ||
            currentLeftRange ||
            currentRightRange ||
            currentPartitionRange ||
            currentPivotIndex !== null ||
            showMidUI) && (
            <div className="mt-6 flex gap-2 items-center flex-wrap justify-center">
              {currentLeftRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                  Left: {currentLeftRange[0]}-{currentLeftRange[1]}
                </div>
              )}
              {currentRightRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                  Right: {currentRightRange[0]}-{currentRightRange[1]}
                </div>
              )}
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
              {showMidUI && (
                <div className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  Mid: {midValue}
                </div>
              )}
              {currentMergeRange && (
                <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                  Merging: {currentMergeRange[0]}-{currentMergeRange[1]}
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
