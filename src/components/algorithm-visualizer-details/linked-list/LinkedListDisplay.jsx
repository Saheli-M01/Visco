import React from "react";

import SLLCreationVisualizer from "../../algorithms/linked-list/singlyLinkedList/sllCreation/SLLCreationVisualizer";

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

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-code-bg rounded-lg p-2 flex-1 flex items-center justify-center overflow-auto">
        <div className="flex flex-col items-center w-full">
          {/* Always show input string */}
          <div className="w-full ">
            <div className="flex text-gray-300 text-sm font-mono justify-center ">
              Input: {displayInputString ?? ""}
            </div>
          </div>

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
        </div>
      </div>
    </div>
  );
};

export default LinkedListDisplay;
