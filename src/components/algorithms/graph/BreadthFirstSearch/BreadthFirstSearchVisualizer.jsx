import React from "react";

const BFSStep = ({ step }) => {
  return (
    <div className="text-sm text-gray-200">
      <div className="font-mono">{step.description}</div>
      <div className="mt-1">Visited: {Array.isArray(step.visited) ? step.visited.join(", ") : ""}</div>
      <div>Queue: {Array.isArray(step.queue) ? step.queue.join(", ") : ""}</div>
    </div>
  );
};

const BreadthFirstSearchVisualizer = ({ graphSteps = [], currentStepIndex = 0, currentStep = {} }) => {
  return (
    <div className="mt-4 bg-gray-800 p-3 rounded-lg">
      <h4 className="text-white font-semibold mb-2">BFS Details</h4>
      {graphSteps && graphSteps.length > 0 ? (
        <BFSStep step={currentStep || graphSteps[currentStepIndex]} />
      ) : (
        <div className="text-gray-300">No steps yet</div>
      )}
    </div>
  );
};

export default BreadthFirstSearchVisualizer;
