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

  return (
    <div className="p-3">
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm text-gray-300">{step.description || "No step"}</div>
        <div className="flex items-center gap-3">
          <div className="text-xs text-gray-400">
            Input: <span className="text-white font-mono ml-1">{step.input ?? ""}</span>
          </div>
          <div className="text-xs text-gray-400">
            i: <span className="text-white ml-1">{typeof step.i === 'number' ? step.i : (step.currentIndex !== undefined ? step.currentIndex : '—')}</span>
          </div>
          <div className="text-xs text-gray-400">
            head: <span className="text-white ml-1">{head === null || head === undefined ? 'null' : head}</span>
          </div>
          <div className="text-xs text-gray-400">
            tail: <span className="text-white ml-1">{tail === null || tail === undefined ? 'null' : tail}</span>
          </div>
        </div>
      </div>
      {/* show variable cards during initialize phase */}
      {step.phase === "initialize" && (
        <div className="mb-3 flex items-center gap-3">
          <VariableCard label="head" value={headVal === null ? "null" : headVal} bgColor="bg-emerald-300" />
          <VariableCard label="tail" value={tailVal === null ? "null" : tailVal} bgColor="bg-fuchsia-300" />
        </div>
      )}

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
