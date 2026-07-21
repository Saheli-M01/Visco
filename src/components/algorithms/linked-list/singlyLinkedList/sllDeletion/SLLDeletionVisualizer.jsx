// Copyright (c) 2026 Saheli Mondal.

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
  pulseNext = false,
  isDeleted = false,
}) => {
  return (
    <div className={`relative flex items-center ${isDeleted ? "opacity-30" : "opacity-100"}`}>
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
          {isNewNode ? "deletedNode" : isCurrentNode ? "current" : "node"}
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
            <div className={`text-[12px] ${pulseNext ? "animate-pulse" : ""}`}>
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

const SLLDeletionVisualizer = ({
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
    "traverse-for-check",
    "traverse-move-current",
  ]);
  const isPreLinkPhase = preLinkPhases.has(step.phase);

  // Use previewNode for both insertion newNode and deletion deleteNode flows
  const previewNode = step.newNode || step.deleteNode || null;

  // Compute persisted head/tail
  let headVal = undefined;
  if (step.head !== undefined) headVal = step.head;
  if (headVal === undefined) {
    const persisted = findPersistedValue(steps, currentStepIndex, ["head"]);
    if (persisted !== null && persisted !== undefined) headVal = persisted;
  }

  // Compute persisted temp pointer (for delete flows)
  let tempVal = undefined;
  if (step.temp !== undefined) tempVal = step.temp;
  if (tempVal === undefined) {
    const persistedTemp = findPersistedValue(steps, currentStepIndex, ["temp"]);
    if (persistedTemp !== null && persistedTemp !== undefined) tempVal = persistedTemp;
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
  const displayTempVal = tempVal === undefined || tempVal === null ? null : tempVal;
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

  const tempCardValue = (() => {
    if (displayTempVal === null) return null;
    if (typeof displayTempVal === "number" && currentList && currentList[displayTempVal] !== undefined)
      return currentList[displayTempVal];
    return displayTempVal;
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

  // Compute persisted loop index `i` (used for kth traversal)
  let iVal = undefined;
  if (step.i !== undefined) iVal = step.i;
  if (iVal === undefined) {
    const persisted = findPersistedValue(steps, currentStepIndex, ["i"]);
    if (persisted !== null && persisted !== undefined) iVal = persisted;
  }
  const displayIVal = iVal === undefined || iVal === null ? null : iVal;
  // Only show `i` during explicit for-loop phases
  const forLoopPhases = new Set(["traverse-for-check", "traverse-move-current"]);
  const showI = displayIVal !== null && forLoopPhases.has(step.phase);

  return (
    <div className="p-3">
      <div className="mb-3 flex flex-col items-center gap-3">
        {/* First row: head, current (if exists), tail */}
        <div className="flex items-center justify-center gap-3">
          {showI && (
            <VariableCard
              label="i"
              value={displayIVal}
              bgColor="bg-amber-200"
            />
          )}
          {displayTempVal !== null && (
            <VariableCard
              label="temp"
              value={tempCardValue === null ? "null" : tempCardValue}
              bgColor="bg-yellow-200"
            />
          )}
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
            // Show preview delete node if exists
            if (previewNode) {
              return (
                <div className="bg-blue-100 border border-blue-400 rounded-xl px-10 py-3">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                  >
                    <InsertionNodeDisplay
                      value={previewNode.value}
                      next="null"
                      address="0xDEL"
                      isNewNode={true}
                      showArrow={false}
                      isDeleted={Boolean(step.deleteNode)}
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
          // Precompute the address that the preview/delete node's `next` points to
          let linkNewNodeCurrentNextAddr = null;
          if (step.phase === "link-new-node" && previewNode) {
            const nextIdx =
              previewNode.next !== undefined && typeof previewNode.next === "number"
                ? previewNode.next
                : null;
            if (
              nextIdx !== null &&
              step.nodes &&
              Array.isArray(step.nodes) &&
              nextIdx >= 0 &&
              nextIdx < step.nodes.length
            ) {
              linkNewNodeCurrentNextAddr = nextIdx;
            } else {
              linkNewNodeCurrentNextAddr = null;
            }
          }

          // Identify the index of the preview/delete node in the nodes array
          let newNodeIndex = null;
          if (previewNode && Array.isArray(step.nodes)) {
            const isSameNode = (n, newN) => {
              if (n === newN) return true;
              if (!n || !newN) return false;
              if (typeof n === "object" && typeof newN === "object") {
                const sameValue = n.value === newN.value;
                const sameNext = n.next === newN.next || (n.next === undefined && newN.next === undefined);
                return sameValue && sameNext;
              }
              return false;
            };

            const found = step.nodes.findIndex((n) => isSameNode(n, previewNode));
            newNodeIndex = found >= 0 ? found : null;
          }

          step.nodes.forEach((node, idx) => {
            const nodeValue = node.value ?? node;
            const isPreviewNewNodeAtFront =
              previewNode &&
              (step.phase === "create-new-node" || step.phase === "insert-position-head") &&
              newNodeIndex !== null &&
              idx === newNodeIndex;
            const isPreviewNewNodeAtEnd =
              previewNode && newNodeIndex !== null && idx === newNodeIndex && idx === step.nodes.length - 1;
            const isNewNodeInPosition = previewNode && step.phase === "current-update" && newNodeIndex !== null && idx === newNodeIndex;

            let nextAddr = "null";
            let pulseNext = false;
            if (isPreviewNewNodeAtEnd && step.phase === "link-new-node") {
              if (linkNewNodeCurrentNextAddr !== null) {
                nextAddr = addrForIndex(linkNewNodeCurrentNextAddr);
                pulseNext = true;
              } else {
                nextAddr = "null";
                pulseNext = true;
              }
            } else if (node.next === null) {
              nextAddr = "null";
            } else if (node.next !== undefined) {
              if (typeof node.next === 'number') {
                if (isPreLinkPhase && isPreviewNewNodeAtEnd && node.next === step.nodes.length - 1) {
                  nextAddr = "null";
                } else {
                  nextAddr = addrForIndex(node.next);
                }
              } else {
                nextAddr = node.next;
              }
            } else {
              let shouldLinkNext = idx < step.nodes.length - 1;
              if (step.phase === "link-new-node" && previewNode && idx === step.nodes.length - 2) {
                shouldLinkNext = false;
              }
              if (isPreLinkPhase) {
                const hasPreviewNewNodeAtEnd = previewNode &&
                  step.nodes.length > 0 &&
                  step.nodes[step.nodes.length - 1]?.value === previewNode.value;

                if (hasPreviewNewNodeAtEnd && idx === step.nodes.length - 2) {
                  shouldLinkNext = false;
                }
                const headPreviewPhase =
                  step.phase === "create-new-node" || step.phase === "insert-position-head";
                if (headPreviewPhase && idx === 0 && previewNode && isPreviewNewNodeAtFront) {
                  shouldLinkNext = false;
                }
              }

              nextAddr = shouldLinkNext ? addrForIndex(idx + 1) : "null";
            }

            displayNodes.push({
              value: nodeValue,
              next: nextAddr,
              i: idx,
              addr: addrForIndex(idx),
              isLinked: true,
              isNewNode: Boolean(isPreviewNewNodeAtFront || isPreviewNewNodeAtEnd || isNewNodeInPosition),
              pulseNext,
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

                      const nextNodeIdx = node.i + 1;
                      const nextNodeInSameRow = Math.floor(nextNodeIdx / 5) === rowIdx;
                      const suppressArrowsForPreviewNewNode =
                        step.phase === "link-new-node" && isNewNode;
                      const showHorizontalArrow =
                        nextNodeInSameRow && node.next !== "null" && !suppressArrowsForPreviewNewNode;
                      const showDownArrow = isLastInFirstRow && displayNodes.length > 5 && !suppressArrowsForPreviewNewNode;

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
                              pulseNext={node.pulseNext}
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

export default SLLDeletionVisualizer;
