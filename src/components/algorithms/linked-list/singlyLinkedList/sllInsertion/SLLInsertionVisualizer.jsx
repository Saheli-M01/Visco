import React from "react";
import { motion } from "framer-motion";
import VariableCard from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const SnakeTurnArrow = () => {
  return (
    <div className="absolute pointer-events-none z-30">
      {/* 1️⃣ right */}
      <div className="absolute h-[2px] w-4 bg-black left-[820px] -top-[70px]" />

      {/* 2️⃣ down */}
      <div className="absolute w-[2px] h-[55px] bg-black left-[838px] -top-[70px]" />

      {/* 3️⃣ left */}
      <div className="absolute h-[2px] w-[858px] bg-black -left-[18px] -top-[17px]" />

      {/* 4️⃣ up */}
      <div className="absolute w-[2px] h-[75px] bg-black -left-[20px] -top-[17px]" />

      {/* 5️⃣ right */}
      <div className="absolute h-[2px] w-6 bg-black -left-[19px] top-[56px]" />

      {/* arrow head */}
      <div className="absolute w-2 h-2 border-t-2 border-r-2 border-black rotate-45 left-0 top-[47px] translate-y-[6px]" />
    </div>
  );
};

const InsertionNodeDisplay = ({
  value,
  next,
  address,
  isNewNode = false,
  isCurrentNode = false,
  showArrow = false,
  arrowDirection = "right",
  showDownArrow = false,
  showSnakeTurn = false,
}) => {
  return (
    <div className="relative flex items-center">
      {/* Snake turn arrow for 5->6 transition */}
      {showSnakeTurn && <SnakeTurnArrow />}

      {/* Node card */}
      <div
        className={`flex flex-col items-center rounded-lg p-1 shadow-md border ${
          isNewNode
            ? "bg-gradient-to-b from-yellow-300 to-yellow-500 border-yellow-800"
            : isCurrentNode
            ? "bg-gradient-to-b from-green-300 to-green-500 border-green-800"
            : "bg-gradient-to-b from-teal-300 to-teal-500 border-lime-800"
        }`}
      >
        <div className={`text-xs font-semibold mb-1.5 text-green-900`}>
          {isNewNode ? "newNode" : isCurrentNode ? "current" : "node"}
        </div>

        <div className="flex gap-2">
          <div
            className={`flex flex-col items-center justify-center rounded p-1 px-2 border ${
              isNewNode
                ? "bg-yellow-400 text-gray-900 border-yellow-800"
                : isCurrentNode
                ? "bg-green-500 text-white border-green-800"
                : "bg-lime-400 text-gray-900 border-green-800"
            }`}
          >
            <div
              className={`text-xs font-semibold ${
                isNewNode
                  ? "text-yellow-900"
                  : isCurrentNode
                  ? "text-white"
                  : "text-lime-900"
              }`}
            >
              value
            </div>
            <div
              className={`text-sm font-bold ${
                isNewNode
                  ? "text-gray-800"
                  : isCurrentNode
                  ? "text-white"
                  : "text-gray-800"
              }`}
            >
              {value}
            </div>
            <div
              className={`mt-0.5 text-[10px] font-mono ${
                isNewNode
                  ? "text-gray-900"
                  : isCurrentNode
                  ? "text-white"
                  : "text-gray-900"
              }`}
            >
              {address}
            </div>
          </div>

          <div
            className={`relative flex flex-col items-center justify-center rounded p-1 px-2 border ${
              isNewNode
                ? "bg-orange-300 text-gray-700 border-orange-800"
                : isCurrentNode
                ? "bg-green-300 text-gray-700 border-green-800"
                : "bg-amber-300 text-gray-700 border-amber-800"
            }`}
          >
            <div
              className={`text-xs font-semibold ${
                isNewNode
                  ? "text-orange-900"
                  : isCurrentNode
                  ? "text-green-900"
                  : "text-amber-900"
              }`}
            >
              next
            </div>
            <div className="text-[12px]">
              {next === null || next === undefined ? "null" : next}
            </div>

            {/* Horizontal arrow (right or left) */}
            {showArrow && !showDownArrow && arrowDirection === "right" && (
              <div className="absolute left-full top-1/2 -translate-y-1/2 flex items-center z-20">
                <div className="h-[2px] w-8 bg-black" />
                <div className="w-2 h-2 border-t-2 border-r-2 border-black rotate-45 -ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const SLLInsertionVisualizer = ({
  steps = [],
  currentStepIndex = 0,
  currentList = [],
}) => {
  const step = steps[currentStepIndex] || {};
  const preLinkPhases = new Set([
    "create-new-node",
    "create-current",
    "insert-position-tail",
    "insert-position-head",
    "insert-position-middle",
    "insert-position-kth",
    "tail-while-check",
    "tail-move-current",
    "tail-while-exit",
    "traverse-to-position",
    "navigate-to-position",
  ]);
  const isPreLinkPhase = preLinkPhases.has(step.phase);

  // Compute persisted head/tail
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

  // Compute persisted current pointer
  let currentVal = undefined;
  if (step.current !== undefined) currentVal = step.current;
  if (currentVal === undefined) {
    const persisted = findPersistedValue(steps, currentStepIndex, ["current", "currentIndex"]);
    if (persisted !== null && persisted !== undefined) currentVal = persisted;
  }

  const displayHeadVal = headVal === undefined || headVal === null ? null : headVal;
  const displayTailVal = tailVal === undefined || tailVal === null ? null : tailVal;
  let displayCurrentVal = currentVal === undefined || currentVal === null ? null : currentVal;
  // Fallback: for tail pre-link step, show current at head even if missing
  if (
    displayCurrentVal === null &&
    (step.phase === "insert-position-tail" || step.phase === "create-current") &&
    displayHeadVal !== null
  ) {
    displayCurrentVal = displayHeadVal;
  }

  const headCardValue = (() => {
    if (displayHeadVal === null) return null;
    if (typeof displayHeadVal === "number" && currentList && currentList[displayHeadVal] !== undefined)
      return currentList[displayHeadVal];
    return displayHeadVal;
  })();

  const tailCardValue = (() => {
    if (displayTailVal === null) return null;
    if (typeof displayTailVal === "number" && currentList && currentList[displayTailVal] !== undefined)
      return currentList[displayTailVal];
    return displayTailVal;
  })();

  const currentCardValue = (() => {
    if (displayCurrentVal === null) return null;
    if (typeof displayCurrentVal === "number" && currentList && currentList[displayCurrentVal] !== undefined)
      return currentList[displayCurrentVal];
    return displayCurrentVal;
  })();

  return (
    <div className="p-3">
      <div className="mb-3 flex flex-col items-center gap-3">
        {/* First row: head, current (if exists), tail */}
        <div className="flex items-center justify-center gap-3">
          <VariableCard
            label="head"
            value={headCardValue === null ? "null" : headCardValue}
            bgColor="bg-emerald-300"
          />
          {displayCurrentVal !== null && (
            <VariableCard
              label="current"
              value={currentCardValue === null ? "null" : currentCardValue}
              bgColor="bg-sky-300"
            />
          )}
          <VariableCard
            label="tail"
            value={tailCardValue === null ? "null" : tailCardValue}
            bgColor="bg-fuchsia-300"
          />
        </div>

        {/* Second row: Nodes - serpentine layout */}
        {(() => {
          if (!step.nodes || step.nodes.length === 0) {
            // Show new node if exists
            if (step.newNode) {
              return (
                <div className="bg-blue-100 border border-blue-400 rounded-xl px-10 py-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  >
                    <InsertionNodeDisplay
                      value={step.newNode.value}
                      next="null"
                      address="0xNEW"
                      isNewNode={true}
                      showArrow={false}
                    />
                  </motion.div>
                </div>
              );
            }
            return null;
          }

          const addrForIndex = (idx) => {
            const base = 0xA0B00 + idx * 0x101;
            return "0x" + base.toString(16).toUpperCase();
          };

          const displayNodes = [];
          step.nodes.forEach((node, idx) => {
            const shouldLinkNext = isPreLinkPhase
              ? idx < step.nodes.length - 2 // avoid linking to preview new node in pre-link phases
              : idx < step.nodes.length - 1;

            displayNodes.push({
              value: node.value ?? node,
              next: shouldLinkNext ? addrForIndex(idx + 1) : "null",
              i: idx,
              addr: addrForIndex(idx),
              isLinked: true,
              isNewNode:
                step.newNode && step.newNode.value === (node.value ?? node) && idx === step.nodes.length - 1,
            });
          });

          if (displayNodes.length === 0) return null;

          // Split into rows of 5
          const rows = [];
          for (let i = 0; i < displayNodes.length; i += 5) {
            rows.push(displayNodes.slice(i, i + 5));
          }

          return (
            <div className="bg-blue-100 border border-blue-400 rounded-xl px-10 py-3 flex flex-col items-start gap-6">
              {rows.map((row, rowIdx) => {
                return (
                  <div
                    key={`row-${rowIdx}`}
                    className="flex items-center gap-4 justify-start"
                  >
                    {row.map((node, colIdx) => {
                      const isFirstRow = rowIdx === 0;
                      const isLastInFirstRow = isFirstRow && node.i === 4;
                      const isFirstOfRow = colIdx === 0;
                      const isCurrentNode = node.i === displayCurrentVal;
                      const isNewNode = node.isNewNode;

                      // Show horizontal arrow if linked and next node in same row
                      const nextNodeIdx = node.i + 1;
                      const nextNodeInSameRow = Math.floor(nextNodeIdx / 5) === rowIdx;
                      const maxLinkedIndex = isPreLinkPhase ? displayNodes.length - 2 : displayNodes.length - 1;
                      const isNotLastLinkedNode = node.i < maxLinkedIndex;
                      const showHorizontalArrow = node.isLinked && nextNodeInSameRow && isNotLastLinkedNode;
                      const showDownArrow = isLastInFirstRow && displayNodes.length > 5;

                      // Show snake turn arrow for first node of row 2+ (the 5->6 transition)
                      const showSnakeTurn =
                        rowIdx > 0 &&
                        isFirstOfRow &&
                        displayNodes.length > 5 &&
                        displayNodes.some((n) => n.i === 4 && n.isLinked);

                      return (
                        <div key={`node-${node.i}`} className="relative">
                          {showSnakeTurn && <SnakeTurnArrow />}
                          <motion.div
                            animate={isCurrentNode || isNewNode ? { scale: [1, 1.1, 1] } : {}}
                            transition={{ duration: 0.4 }}
                          >
                            <InsertionNodeDisplay
                              value={node.value}
                              next={node.next}
                              address={node.addr}
                              isCurrentNode={isCurrentNode}
                              isNewNode={isNewNode}
                              showArrow={showHorizontalArrow}
                              arrowDirection="right"
                              showDownArrow={showDownArrow}
                              showSnakeTurn={false}
                            />
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          );
        })()}
      </div>
    </div>
  );
};

export default SLLInsertionVisualizer;
