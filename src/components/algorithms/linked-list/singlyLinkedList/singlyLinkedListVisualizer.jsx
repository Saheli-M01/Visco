import React from "react";
import {
  safeValue,
  findPersistedValue,
} from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

const SinglyLinkedListVisualizer = ({
  currentList = [],
  linkedListSteps = [],
  currentStepIndex = 0,
  currentStep = {},
  selectedLanguage = "javascript",
}) => {
  const step = currentStep || linkedListSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";

  // Extract variables from current step
  let headNode = typeof step.headNode === "number" ? step.headNode : null;
  let tailNode = typeof step.tailNode === "number" ? step.tailNode : null;
  let currentNode = typeof step.currentNode === "number" ? step.currentNode : null;
  let previousNode = typeof step.previousNode === "number" ? step.previousNode : null;
  let targetNode = typeof step.targetNode === "number" ? step.targetNode : null;
  let size = typeof step.size === "number" ? step.size : null;

  // If not in current step, try to find persisted values
  if (headNode === null) {
    headNode = findPersistedValue(linkedListSteps, currentStepIndex, "headNode");
  }
  if (tailNode === null) {
    tailNode = findPersistedValue(linkedListSteps, currentStepIndex, "tailNode");
  }
  if (size === null) {
    size = findPersistedValue(linkedListSteps, currentStepIndex, "size");
  }

  // Hide all variables when completed
  if (isDone) return null;

  return (
    <div className="mt-4 w-full flex flex-col items-center">
      <div className="mt-3 flex items-center justify-center gap-4 w-full flex-wrap">
        {/* Always show head and tail if available */}
        {headNode !== null && (
          <VariableCard 
            label="head" 
            value={currentList[headNode] !== undefined ? `Node ${headNode} (${currentList[headNode]})` : `Node ${headNode}`} 
            bgColor="bg-green-300" 
          />
        )}
        {tailNode !== null && (
          <VariableCard 
            label="tail" 
            value={currentList[tailNode] !== undefined ? `Node ${tailNode} (${currentList[tailNode]})` : `Node ${tailNode}`} 
            bgColor="bg-purple-300" 
          />
        )}
        
        {/* Show current node during traversal */}
        {currentNode !== null && step.phase === "traverse" && (
          <VariableCard 
            label="current" 
            value={currentList[currentNode] !== undefined ? `Node ${currentNode} (${currentList[currentNode]})` : `Node ${currentNode}`} 
            bgColor="bg-yellow-300" 
          />
        )}

        {/* Show previous node if available */}
        {previousNode !== null && (
          <VariableCard 
            label="previous" 
            value={currentList[previousNode] !== undefined ? `Node ${previousNode} (${currentList[previousNode]})` : `Node ${previousNode}`} 
            bgColor="bg-blue-300" 
          />
        )}

        {/* Show target node if available */}
        {targetNode !== null && (
          <VariableCard 
            label="target" 
            value={currentList[targetNode] !== undefined ? `Node ${targetNode} (${currentList[targetNode]})` : `Node ${targetNode}`} 
            bgColor="bg-red-300" 
          />
        )}

        {/* Show size */}
        {size !== null && (
          <VariableCard 
            label="size" 
            value={size} 
            bgColor="bg-indigo-300" 
          />
        )}
      </div>
    </div>
  );
};

export default SinglyLinkedListVisualizer;
