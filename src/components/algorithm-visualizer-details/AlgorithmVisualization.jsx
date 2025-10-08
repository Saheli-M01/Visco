import React from "react";
import CodePreview from "./algorithm-visualizer-components/CodePreview";
import StepHistory from "./algorithm-visualizer-components/StepHistory";
import ArrayDisplay from "./algorithm-visualizer-components/ArrayDisplay";
import ControlsPanel from "./algorithm-visualizer-components/ControlsPanel";
import ArrayInputCard from "./algorithm-visualizer-components/ArrayInputCard";

// Visualization-only presentational component. Expects all state and handlers to be provided by the parent.
const AlgorithmVisualization = ({
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
    <div className="h-full bg-gradient-to-br from-white/20 to-white/40 backdrop-blur-sm custom-scrollbar overflow-y-auto">
      <div className="px-4 py-1 space-y-3">
        {/* New Layout - Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Left Column - 4/5 width */}
          <div className="lg:col-span-4 space-y-1">
            {/* First Row - Code Preview and Step History */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <CodePreview
                selectedLanguage={selectedLanguage}
                requestLanguageChange={requestLanguageChange}
                getCodeLines={getCodeLines}
                selectedAlgorithm={selectedAlgorithm}
                currentCodeLine={currentCodeLine}
              />

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

            {/* Second Row - Output (Full Width) */}
            <div className="backdrop-blur-md bg-white border border-gray-300 rounded-xl p-2">
              {!isVisualizationActive ? (
                <div className="bg-gray-900 text-white p-4 rounded-lg text-sm font-mono min-h-[290px] overflow-y-auto custom-scrollbar shadow-inner border border-gray-700">
                  <div className="text-green-400">Ready to run {selectedAlgorithm?.name}...</div>
                  <div className="text-gray-300 mt-2">
                    Enter array values and click <span className="text-blue-400">Go</span> to begin the visualization.
                  </div>
                  <div className="text-blue-400 mt-1">Use the Manual or Automatic controls to manage the process.</div>
                  <div className="text-gray-300 mt-2">Review each step in the step history panel.</div>
                  <div className="text-blue-400 mt-2">Follow the progress bar to track sorting progress.</div>
                </div>
              ) : (
                <ArrayDisplay
                  currentArray={currentArray}
                  comparingIndices={comparingIndices}
                  sortingSteps={sortingSteps}
                  currentStepIndex={currentStepIndex}
                  currentCodeLine={currentCodeLine}
                  selectedLanguage={selectedLanguage}
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

          {/* Right Column - 1/5 width */}
          <div className="lg:col-span-1 space-y-3 min-h-[80vh] overflow-y-auto custom-scrollbar pr-2 pb-4 ">
            <ArrayInputCard
              key={arrayInputKey}
              handleGo={handleGo}
              selectedAlgorithm={selectedAlgorithm}
              pivotStrategy={pivotStrategy}
              setPivotStrategy={setPivotStrategy}
            />

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
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualization;