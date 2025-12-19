import React from "react";

import SLLCreationVisualizer from "../../algorithms/linked-list/singlyLinkedList/sllCreation/SLLCreationVisualizer";
import SLLTraversalVisualizer from "../../algorithms/linked-list/singlyLinkedList/sllTraversal/SLLTraversalVisualizer";
import SLLInsertionVisualizer from "../../algorithms/linked-list/singlyLinkedList/sllInsertion/SLLInsertionVisualizer";

const LinkedListDisplay = ({
  currentList = [],
  comparingIndices = [],
  linkedListSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
  selectedAlgorithm = null,
  displayInputString = null,
}) => {
  const currentStep = linkedListSteps[currentStepIndex] || {};
  const showInput =
    displayInputString && 
    selectedAlgorithm?.name !== "Singly Linked List - Traversal" &&
    selectedAlgorithm?.name !== "Singly Linked List - Insertion";

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-y-auto">
      <div className="bg-code-bg rounded-lg px-2 flex-1 flex items-center justify-center overflow-auto">
        <div className="flex flex-col items-center w-full">
          {/* Hide input label during traversal view */}
          {showInput && (
            <div className="w-full ">
              <div className="flex text-gray-300 text-sm font-mono justify-center ">
                Input: {displayInputString}
              </div>
            </div>
          )}

          {/* Algorithm-specific visualizers for linked-list */}
          {selectedAlgorithm?.name === "Singly Linked List - Creation" && (
            <div className="w-full">
              <SLLCreationVisualizer
                steps={linkedListSteps}
                currentStepIndex={currentStepIndex}
                currentList={currentList}
              />
            </div>
          )}
          {selectedAlgorithm?.name === "Singly Linked List - Traversal" && (
            <div className="w-full">
              <SLLTraversalVisualizer
                steps={linkedListSteps}
                currentStepIndex={currentStepIndex}
                currentList={currentList}
              />
            </div>
          )}
          {selectedAlgorithm?.name === "Singly Linked List - Insertion" && (
            <div className="w-full">
              <SLLInsertionVisualizer
                steps={linkedListSteps}
                currentStepIndex={currentStepIndex}
                currentList={currentList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedListDisplay;
