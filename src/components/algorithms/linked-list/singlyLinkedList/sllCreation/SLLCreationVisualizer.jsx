import React from "react";
import { ArrowRight } from "lucide-react";
import VariableCard from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const NodePill = ({ value, isCurrent, isHead, isTail }) => {
  let base = "flex items-center justify-center h-14 w-14 rounded-lg font-bold text-lg border-2 ";
  if (isCurrent) base += "bg-yellow-400 text-gray-900 border-yellow-600 scale-110 shadow-lg";
  else if (isHead) base += "bg-green-400 text-white border-green-700";
  else if (isTail) base += "bg-purple-400 text-white border-purple-700";
  else base += "bg-gray-700 text-white border-gray-600";

  return (
    <div className="flex flex-col items-center mx-2">
      <div className={base}>
        <span>{value}</span>
      </div>
      <div className="mt-2 text-xs text-gray-400">{typeof value === "number" ? `val:${value}` : value}</div>
    </div>
  );
};

const NewNodeCard = ({ value }) => {
  return (
    <div className="h-12 w-28 rounded-lg flex flex-col items-center justify-center font-medium bg-yellow-300 text-gray-900 border-2 border-yellow-500 shadow-md">
      <div className="text-xs text-gray-700">newNode</div>
      <div className="text-lg font-bold">{value}</div>
    </div>
  );
};

const CreationVisualizer = ({ steps = [], currentStepIndex = 0, currentList = [] }) => {
  const step = steps[currentStepIndex] || {};
  const head = step.headNode;
  const tail = step.tailNode;
  const current = step.currentNode;

  // compute persisted head/tail values (follow Kadane pattern)
  let headVal = undefined;
  if (step.head !== undefined) headVal = step.head;
  if (headVal === undefined) {
    const persisted = findPersistedValue(steps, currentStepIndex, ["head"]);
    if (persisted !== null && persisted !== undefined) headVal = persisted;
  }
  let tailVal = undefined;
  if (step.tail !== undefined) tailVal = step.tail;
  if (tailVal === undefined) {
    const persisted = findPersistedValue(steps, currentStepIndex, ["tail"]);
    if (persisted !== null && persisted !== undefined) tailVal = persisted;
  }

  // During the initialize phase, explicitly show head/tail as null
  // headVal / tailVal now contain either the explicit step value or a persisted value (or remain undefined)
  // normalize display values (show null when undefined/null)
  const displayHeadVal = headVal === undefined || headVal === null ? null : headVal;
  const displayTailVal = tailVal === undefined || tailVal === null ? null : tailVal;

  // Map head/tail indices to actual node values when possible (users expect values)
  const headCardValue = (() => {
    if (displayHeadVal === null) return null;
    if (typeof displayHeadVal === "number" && currentList && currentList[displayHeadVal] !== undefined) return currentList[displayHeadVal];
    return displayHeadVal;
  })();

  const tailCardValue = (() => {
    if (displayTailVal === null) return null;
    if (typeof displayTailVal === "number" && currentList && currentList[displayTailVal] !== undefined) return currentList[displayTailVal];
    return displayTailVal;
  })();

  // compute persisted i (loop index). prefer explicit step.i, then currentIndex, then persisted.
  let iVal = undefined;
  if (step.i !== undefined) iVal = step.i;
  else if (step.currentIndex !== undefined) iVal = step.currentIndex;
  else {
    const persistedI = findPersistedValue(steps, currentStepIndex, ["i", "currentIndex"]);
    if (persistedI !== null && persistedI !== undefined) iVal = persistedI;
  }
  // show i=0 at loop-start if not yet set
  if (step.phase === "loop-start" && (iVal === undefined || iVal === null)) {
    iVal = 0;
  }

  const loopPhases = new Set([
    "loop-start",
    "loop-iteration",
    "create-node",
    "check-head",
    "first-node",
    "else-block",
    "link-tail",
    "node-linked",
    "update-tail",
    "close-block",
    "loop-exit",
  ]);

  return (
    <div className="p-3">
     
      {/* show variable cards persistently (use persisted values or show null); show i during loop phases */}
      <div className="mb-3 flex items-center gap-3">
        {loopPhases.has(step.phase) && (
          <VariableCard label="i" value={iVal === undefined || iVal === null ? "—" : iVal} bgColor="bg-sky-300" />
        )}

        {/* show newNode distinctly during create-node and persist it through loop phases until loop-exit */}
        {(() => {
          let newNodeObj = undefined;
          if (step.newNode !== undefined && step.newNode !== null) newNodeObj = step.newNode;
          else {
            const persisted = findPersistedValue(steps, currentStepIndex, ["newNode"]);
            if (persisted !== null && persisted !== undefined) newNodeObj = persisted;
          }

          const newNodeVal = newNodeObj ? (newNodeObj.value ?? newNodeObj) : null;
          if (loopPhases.has(step.phase) && newNodeVal !== null) {
            return <NewNodeCard value={newNodeVal} />;
          }
          return null;
        })()}

        <VariableCard label="head" value={headCardValue === null ? "null" : headCardValue} bgColor="bg-emerald-300" />
        <VariableCard label="tail" value={tailCardValue === null ? "null" : tailCardValue} bgColor="bg-fuchsia-300" />
      </div>

      <div className="flex items-center overflow-auto py-2">
        {currentList.length === 0 ? (
          <div className="text-gray-400">Empty list</div>
        ) : (
          currentList.map((v, i) => (
            <div key={`cv-${i}`} className="flex items-center">
              <NodePill value={v} isCurrent={i === current} isHead={i === head} isTail={i === tail} />
              {i < currentList.length - 1 && (
                <div className="mx-1">
                  <ArrowRight className="text-blue-300 w-6 h-6" />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CreationVisualizer;
