import React, { useEffect } from "react";

const StepHistory = ({
  stepHistory,
  currentStepIndex,
  isVisualizationActive,
  sortingSteps,
  setCurrentStepIndex,
  setCurrentStep,
  setCurrentArray,
  setComparingIndices,
  setCurrentCodeLine,
  currentStepRef,
  stepHistoryRef,
}) => {
  // Auto-scroll to current step when currentStepIndex changes
  useEffect(() => {
    if (currentStepRef.current) {
      currentStepRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [currentStepIndex]);

  // Calculate progress percentage
  const progress =
    sortingSteps.length > 0
      ? ((currentStepIndex + 1) / sortingSteps.length) * 100
      : 0;

  return (
    <div className="space-y-3 h-full flex flex-col">
      {/* Step History */}
      <div className="border border-gray-300 bg-white rounded-xl py-2 px-4 flex flex-col h-[38vh]">
        <div className="flex items-center justify-between mb-1 gap-5">
          <h3 className="text-lg font-semibold text-foreground m-0">
            Steps
          </h3>

          {/* Progress Bar to the right of the heading */}
          <div className="flex items-center gap-3 flex-1 ml-4">
            <div className="w-full bg-gray-300 rounded-full h-1.5 shadow-inner">
              <div
                className="bg-gradient-to-r from-gray-600 to-gray-800 h-1.5 rounded-full transition-all duration-300 shadow-sm"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="ml-2 text-[0.7rem] font-medium text-gray-700 whitespace-nowrap">
              {sortingSteps.length > 0
                ? `${currentStepIndex + 1} / ${sortingSteps.length}`
                : `0 / 0`}
            </span>
          </div>
        </div>

        {/* main steps */}
        <div
          ref={stepHistoryRef}
          className="space-y-2 overflow-y-auto custom-scrollbar flex-1 min-h-0"
        >
          {stepHistory.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-foreground/70 text-sm text-center">
                No steps yet.
                <br />
                Enter array elements to start.
              </p>
            </div>
          ) : (
            stepHistory.map((step, index) => (
              <div
                key={index}
                ref={currentStepIndex === step.step ? currentStepRef : null}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer  border border-gray-300 ${
                  currentStepIndex === step.step
                    ? "bg-indigo-400/30 text-white border-border/60 shadow-md "
                    : "bg-card/30 border-border/40 hover:bg-card/40 text-foreground"
                }`}
                onClick={() => {
                  if (isVisualizationActive && sortingSteps[step.step]) {
                    setCurrentStepIndex(step.step);
                    setCurrentStep(step.step);
                    const targetStep = sortingSteps[step.step];
                    setCurrentArray([...targetStep.array]);
                    setComparingIndices(targetStep.comparing || []);
                    setCurrentCodeLine(
                      targetStep.codeLine !== undefined
                        ? targetStep.codeLine
                        : -1
                    );
                  }
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm font-semibold ${
                        currentStepIndex === step.step ? "text-gray-900" : ""
                      }`}
                    >
                      Step {step.step + 1}
                    </span>
                    {step.leftRange && (
                      <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                        L:{step.leftRange[0]}-{step.leftRange[1]}
                      </span>
                    )}
                    {step.rightRange && (
                      <span className="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-800">
                        R:{step.rightRange[0]}-{step.rightRange[1]}
                      </span>
                    )}
                    {step.mergeRange && (
                      <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800">
                        Range:{step.mergeRange[0]}-{step.mergeRange[1]}
                      </span>
                    )}
                  </div>
                  {step.phase && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        step.phase === "comparison"
                          ? "bg-blue-100 text-blue-800"
                          : step.phase === "write"
                          ? "bg-yellow-100 text-yellow-800"
                          : step.phase === "merge-complete"
                          ? "bg-green-100 text-green-800"
                          : step.phase === "divide"
                          ? "bg-indigo-100 text-indigo-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {step.phase}
                    </span>
                  )}
                  {/* Show small Temp badge if any temp exists up to this step */}
                  {(() => {
                    const hasTempUpToStep = sortingSteps
                      .slice(0, step.step + 1)
                      .some((s) => s && s.temp);
                    return hasTempUpToStep ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 ml-2">
                        temp
                      </span>
                    ) : null;
                  })()}
                  {/* Show small Key badge if any key exists up to this step (insertion sort) */}
                  {(() => {
                    const hasKeyUpToStep = sortingSteps
                      .slice(0, step.step + 1)
                      .some((s) => s && s.key);
                    return hasKeyUpToStep ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 ml-2">
                        key
                      </span>
                    ) : null;
                  })()}
                  {/* Show small j badge if any j exists up to this step (insertion sort) */}
                  {(() => {
                    const hasJUpToStep = sortingSteps
                      .slice(0, step.step + 1)
                      .some((s) => s && s.j !== undefined && s.j !== null);
                    return hasJUpToStep ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 ml-2">
                        j
                      </span>
                    ) : null;
                  })()}
                  {/* Show small Mid badge if mid calculation exists in this step */}
                  {(() => {
                    const hasMidInStep =
                      sortingSteps[step.step] && sortingSteps[step.step].mid;
                    return hasMidInStep ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800 ml-2">
                        Mid
                      </span>
                    ) : null;
                  })()}
                  {/* Show Min badge if this step or any earlier step defines a min (selection sort) */}
                  {(() => {
                    const st = sortingSteps[step.step];
                    const hasMinHere =
                      st && (st.phase === "min_update" || st.min);
                    const hasMinUpToStep = sortingSteps
                      .slice(0, step.step + 1)
                      .some((s) => s && (s.phase === "min_update" || s.min));
                    return hasMinHere ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-800 ml-2">
                        minIndex
                      </span>
                    ) : hasMinUpToStep ? (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-50 text-amber-700 ml-2">
                        minIndex
                      </span>
                    ) : null;
                  })()}
                </div>
                <div className="flex gap-1 flex-wrap mb-2">
                  {step.array.map((num, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded text-xs font-medium  ${
                        currentStepIndex === step.step
                          ? "bg-foreground/70 text-foreground-inverse"
                          : "bg-card/30 text-foreground border border-border"
                      }`}
                    >
                      {num}
                    </span>
                  ))}
                </div>
                <p
                  className={`text-[0.8rem] ${
                    currentStepIndex === step.step
                      ? "text-foreground"
                      : "text-foreground/90"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default StepHistory;
