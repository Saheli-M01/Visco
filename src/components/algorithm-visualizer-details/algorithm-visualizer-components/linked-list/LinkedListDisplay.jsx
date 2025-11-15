import React from "react";
import { ArrowRight } from "lucide-react";
import SinglyLinkedListVisualizer from "../../../algorithms/linked-list/singlyLinkedList/singlyLinkedListVisualizer";

const LinkedListNode = ({ value, index, styleClass, showArrow = true }) => (
  <div key={`node-${index}-${value}`} className="flex items-center">
    <div className="flex flex-col items-center">
      <div className={`flex items-center justify-center h-16 w-16 rounded-lg font-bold text-lg transition-all duration-500 ease-in-out transform shadow-lg border-2 ${styleClass}`}>
        <span className="drop-shadow-lg">{value}</span>
      </div>
      <div className="mt-2">
        <span className="text-gray-400 text-sm font-mono">Node {index}</span>
      </div>
    </div>
    {showArrow && (
      <div className="flex items-center mx-2">
        <ArrowRight className="text-blue-400 w-8 h-8" />
      </div>
    )}
  </div>
);

const LinkedListDisplay = ({
  currentList = [],
  comparingIndices = [],
  linkedListSteps = [],
  currentStepIndex = 0,
  selectedLanguage = "javascript",
  selectedAlgorithm = null,
}) => {
  const currentStep = linkedListSteps[currentStepIndex] || {};
  const algoKey = (selectedAlgorithm?.name || "").toLowerCase().replace(/\s+/g, "");

  // For Singly Linked List operations
  const currentNode = currentStep.currentNode;
  const previousNode = currentStep.previousNode;
  const targetNode = currentStep.targetNode;
  const headNode = currentStep.headNode;
  const tailNode = currentStep.tailNode;

  return (
    <div className="flex flex-col h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="bg-code-bg rounded-lg p-4 flex-1 flex items-center justify-center overflow-auto">
        <div className="flex flex-col items-center w-full">
          {/* Linked List Nodes */}
          <div className="flex justify-center items-center gap-0 flex-wrap p-4">
            {currentList.length === 0 ? (
              <div className="text-gray-400 text-lg font-mono">Empty List</div>
            ) : (
              currentList.map((value, index) => {
                const iscomparing = comparingIndices.includes(index);
                const isCurrent = index === currentNode && typeof currentNode === "number";
                const isPrevious = index === previousNode && typeof previousNode === "number";
                const isTarget = index === targetNode && typeof targetNode === "number";
                const isHead = index === headNode && typeof headNode === "number";
                const isTail = index === tailNode && typeof tailNode === "number";

                let baseClass;
                if (isCurrent) {
                  baseClass = "bg-yellow-400 text-gray-900 border-yellow-600 scale-110 shadow-xl";
                } else if (isPrevious) {
                  baseClass = "bg-blue-400 text-white border-blue-700 scale-105";
                } else if (isTarget) {
                  baseClass = "bg-red-400 text-white border-red-700 scale-105 animate-pulse";
                } else if (isHead) {
                  baseClass = "bg-green-400 text-white border-green-700 scale-105";
                } else if (isTail) {
                  baseClass = "bg-purple-400 text-white border-purple-700 scale-105";
                } else if (iscomparing) {
                  baseClass = "bg-cyan-400 text-white border-cyan-600 scale-105";
                } else {
                  baseClass = "bg-gray-700 text-white border-gray-600";
                }

                return (
                  <LinkedListNode
                    key={`${index}-${value}`}
                    value={value}
                    index={index}
                    styleClass={baseClass}
                    showArrow={index < currentList.length - 1}
                  />
                );
              })
            )}
          </div>

          {/* NULL pointer at the end */}
          {currentList.length > 0 && (
            <div className="flex items-center mt-4">
              <div className="flex items-center justify-center h-12 w-16 rounded-lg font-bold text-sm bg-gray-800 text-gray-400 border-2 border-gray-600">
                NULL
              </div>
            </div>
          )}

          {/* Algorithm-Specific Visualizers */}
          {algoKey.includes("singlylinkedlist") && (
            <SinglyLinkedListVisualizer
              currentList={currentList}
              linkedListSteps={linkedListSteps}
              currentStepIndex={currentStepIndex}
              currentStep={currentStep}
              selectedLanguage={selectedLanguage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkedListDisplay;
