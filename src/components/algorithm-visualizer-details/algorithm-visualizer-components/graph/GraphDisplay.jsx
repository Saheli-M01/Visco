import React from "react";
import BreadthFirstSearchVisualizer from "../../../algorithms/graph/BreadthFirstSearch/BreadthFirstSearchVisualizer";

const Node = ({ label, styleClass }) => (
  <div className={`flex items-center justify-center h-12 w-12 rounded-full text-white font-bold ${styleClass}`}>{label}</div>
);

const GraphDisplay = ({
  currentArray = [],
  comparingIndices = [],
  graphSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
  selectedAlgorithm = null,
  currentCodeLine,
  getCodeLines,
}) => {
  const currentStep = graphSteps[currentStepIndex] || {};

  const algoKey = (selectedAlgorithm?.name || "").toLowerCase().replace(/\s+/g, "");

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden p-4">
      <div className="flex-1 flex items-center justify-center">
        <div className="grid grid-flow-row auto-rows-max gap-4">
          {currentArray && currentArray.length > 0 ? (
            currentArray.map((n, idx) => {
              const isActive = (currentStep && currentStep.visited || []).includes(n) || (currentStep && currentStep.current === n);
              const cls = isActive ? "bg-indigo-500" : "bg-gray-700";
              return <Node key={idx} label={n} styleClass={cls} />;
            })
          ) : (
            <div className="text-gray-300">No graph data provided yet.</div>
          )}
        </div>
      </div>

      {/* Algorithm specific visualizers */}
      {algoKey.startsWith("breadthfirstsearch") && (
        <BreadthFirstSearchVisualizer
          graphSteps={graphSteps}
          currentStepIndex={currentStepIndex}
          currentStep={currentStep}
          selectedLanguage={selectedLanguage}
          getCodeLines={getCodeLines}
        />
      )}
    </div>
  );
};

export default GraphDisplay;
