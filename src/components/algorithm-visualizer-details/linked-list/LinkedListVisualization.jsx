import React, { useState } from "react";
import CodePreview from "../algorithm-visualizer-components/CodePreview";
import StepHistory from "../algorithm-visualizer-components/StepHistory";
import LinkedListDisplay from "./LinkedListDisplay";
import ControlsPanel from "../algorithm-visualizer-components/ControlsPanel";
import ArrayInputCard from "../algorithm-visualizer-components/ArrayInputCard";

const LinkedListVisualization = ({
  selectedLanguage,
  requestLanguageChange,
  getCodeLines,
  selectedAlgorithm,
  currentCodeLine,
  stepHistory,
  currentStepIndex,
  isVisualizationActive,
  linkedListSteps,
  setCurrentStepIndex,
  setCurrentStep,
  setCurrentList,
  setComparingIndices,
  setCurrentCodeLine,
  currentStepRef,
  stepHistoryRef,
  currentList,
  comparingIndices,
  linkedListInputKey,
  handleGo,
  isAutomatic,
  setIsAutomatic,
  isPlaying,
  handlePlay,
  handlePause,
  handleReset,
  speed,
  setSpeed,
  handleFirstStep,
  handleLastStep,
  handleStepBackward,
  handleStepForward,
  isExecuting,
}) => {
  const [displayInputString, setDisplayInputString] = useState(null);

  const handleGoWrapper = (list, operationVal, rawInput) => {
    // store the raw input string so the display can show "Input: ..."
    try {
      setDisplayInputString(rawInput || (Array.isArray(list) ? list.join(",") : ""));
    } catch (e) {
      // ignore
    }
    if (typeof handleGo === "function") {
      // call the original handler (keep original behavior)
      handleGo(list, operationVal);
    }
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm custom-scrollbar overflow-y-auto">
      <div className="flex flex-col lg:flex-row-reverse h-[92vh] p-2 gap-4">
        <div className="flex flex-col w-full lg:w-[40vw] gap-4">
          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm px-3 pt-3 overflow-hidden">
            <CodePreview
              selectedLanguage={selectedLanguage}
              requestLanguageChange={requestLanguageChange}
              getCodeLines={getCodeLines}
              selectedAlgorithm={selectedAlgorithm}
              currentCodeLine={currentCodeLine}
            />
          </div>

          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm p-3 overflow-hidden">
            <StepHistory
              stepHistory={stepHistory}
              currentStepIndex={currentStepIndex}
              isVisualizationActive={isVisualizationActive}
              sortingSteps={linkedListSteps}
              setCurrentStepIndex={setCurrentStepIndex}
              setCurrentStep={setCurrentStep}
              setCurrentArray={setCurrentList}
              setComparingIndices={setComparingIndices}
              setCurrentCodeLine={setCurrentCodeLine}
              currentStepRef={currentStepRef}
              stepHistoryRef={stepHistoryRef}
            />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-[60vw] gap-2">
          {/* Row 1: Array Input */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-3">
            <ArrayInputCard
              key={linkedListInputKey}
              handleGo={handleGoWrapper}
              selectedAlgorithm={selectedAlgorithm}
            />
          </div>

          {/* Row 2: Controls */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-3">
            <ControlsPanel
              isAutomatic={isAutomatic}
              setIsAutomatic={setIsAutomatic}
              isPlaying={isPlaying}
              handlePlay={handlePlay}
              handlePause={handlePause}
              handleReset={handleReset}
              speed={speed}
              setSpeed={setSpeed}
              isVisualizationActive={isVisualizationActive}
              currentStepIndex={currentStepIndex}
              sortingSteps={linkedListSteps}
              handleFirstStep={handleFirstStep}
              handleLastStep={handleLastStep}
              handleStepBackward={handleStepBackward}
              handleStepForward={handleStepForward}
              isExecuting={isExecuting}
            />
          </div>

          {/* Row 3: Display */}
          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm p-3 backdrop-blur-md">
            {!isVisualizationActive ? (
              <div className="bg-gray-900 text-white p-4 rounded-lg text-sm font-mono overflow-y-auto custom-scrollbar shadow-inner border border-gray-700 h-full">
                <div className="text-green-400">Ready to run {selectedAlgorithm?.name}...</div>
                <div className="text-gray-300 mt-2">Enter node values and click <span className="text-blue-400">Go</span> to begin.</div>
                <div className="text-blue-400 mt-1">Use the Manual or Automatic controls to manage the process.</div>
                <div className="text-gray-300 mt-2">Review each step in the step history panel.</div>
                <div className="text-blue-400 mt-2">Follow the progress bar to track progress.</div>
              </div>
            ) : (
              <LinkedListDisplay
                currentList={currentList}
                comparingIndices={comparingIndices}
                linkedListSteps={linkedListSteps}
                currentStepIndex={currentStepIndex}
                currentCodeLine={currentCodeLine}
                selectedLanguage={selectedLanguage}
                selectedAlgorithm={selectedAlgorithm}
                displayInputString={displayInputString}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkedListVisualization;
