import React from "react";
import CodePreview from "../algorithm-visualizer-components/CodePreview";
import StepHistory from "../algorithm-visualizer-components/StepHistory";
import SortingDisplay from "./SortingDisplay";
import ControlsPanel from "../algorithm-visualizer-components/ControlsPanel";
import ArrayInputCard from "../algorithm-visualizer-components/ArrayInputCard";

const SortingVisualization = ({
  selectedLanguage,
  requestLanguageChange,
  getCodeLines,
  selectedAlgorithm,
  currentCodeLine,
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
  currentArray,
  comparingIndices,
  arrayInputKey,
  handleGo,
  pivotStrategy,
  setPivotStrategy,
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

          {/* Step History */}
             <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm p-3 overflow-hidden">
            <StepHistory
              stepHistory={stepHistory}
              currentStepIndex={currentStepIndex}
              isVisualizationActive={isVisualizationActive}
              sortingSteps={sortingSteps}
              setCurrentStepIndex={setCurrentStepIndex}
              setCurrentStep={setCurrentStep}
              setCurrentArray={setCurrentArray}
              setComparingIndices={setComparingIndices}
              setCurrentCodeLine={setCurrentCodeLine}
              currentStepRef={currentStepRef}
              stepHistoryRef={stepHistoryRef}
            />
          </div>
        </div>

        {/* ===== Right Column ===== */}
        <div className="flex flex-col w-full lg:w-[60vw] gap-2">
          {/* Row 1: Array Input */}
          <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-3">
            <ArrayInputCard
              key={arrayInputKey}
              handleGo={handleGo}
              selectedAlgorithm={selectedAlgorithm}
              pivotStrategy={pivotStrategy}
              setPivotStrategy={setPivotStrategy}
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
              sortingSteps={sortingSteps}
              handleFirstStep={handleFirstStep}
              handleLastStep={handleLastStep}
              handleStepBackward={handleStepBackward}
              handleStepForward={handleStepForward}
              isExecuting={isExecuting}
            />
          </div>

          {/* Row 3: Display */}
          <div className="flex-1 bg-white border border-gray-300 rounded-xl shadow-sm p-3 backdrop-blur-md ">
            {!isVisualizationActive ? (
              <div className="bg-gray-900 text-white p-4 rounded-lg text-sm font-mono  overflow-y-auto custom-scrollbar shadow-inner border border-gray-700 h-full">
                <div className="text-green-400">
                  Ready to run {selectedAlgorithm?.name}...
                </div>
                <div className="text-gray-300 mt-2">
                  Enter array values and click{" "}
                  <span className="text-blue-400">Go</span> to begin the
                  visualization.
                </div>
                <div className="text-blue-400 mt-1">
                  Use the Manual or Automatic controls to manage the process.
                </div>
                <div className="text-gray-300 mt-2">
                  Review each step in the step history panel.
                </div>
                <div className="text-blue-400 mt-2">
                  Follow the progress bar to track sorting progress.
                </div>
              </div>
            ) : (
              <SortingDisplay
                currentArray={currentArray}
                comparingIndices={comparingIndices}
                sortingSteps={sortingSteps}
                currentStepIndex={currentStepIndex}
                currentCodeLine={currentCodeLine}
                selectedLanguage={selectedLanguage}
                selectedAlgorithm={selectedAlgorithm}
                tempLineIndex={getCodeLines(
                  selectedLanguage,
                  selectedAlgorithm?.name
                ).findIndex((line) => /temp/.test(line))}
                languageHasTemp={getCodeLines(
                  selectedLanguage,
                  selectedAlgorithm?.name
                ).some((line) => /temp/.test(line))}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualization;
