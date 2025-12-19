import React from "react";
import VariableCard from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const SnakeTurnArrow = () => {
  return (
    <div className="absolute pointer-events-none z-30">
      {/* 1️⃣ right */}
      <div className="absolute h-[2px] w-4 bg-black left-[820px] -top-[120px]" />

      {/* 2️⃣ down */}
      <div className="absolute w-[2px] h-[55px] bg-black left-[838px] -top-[120px]" />

      {/* 3️⃣ left */}
      <div className="absolute h-[2px] w-[858px] bg-black -left-[18px] -top-[65px]" />

      {/* 4️⃣ up */}
      <div className="absolute w-[2px] h-[75px] bg-black -left-[20px] -top-[65px]" />

      {/* 5️⃣ right */}
      <div className="absolute h-[2px] w-4 bg-black -left-[19px] top-2" />

      {/* arrow head */}
      <div className="absolute w-2 h-2 border-t-2 border-r-2 border-black rotate-45 -left-2 top-0 translate-y-[6px]" />
    </div>
  );
};

const NewNodeConstructor = ({
  value,
  next,
  address,
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
      <div className="flex flex-col items-center bg-gradient-to-b from-teal-300 to-teal-500 rounded-lg p-1 shadow-md border border-lime-800">
        <div className="text-xs font-semibold text-green-900 mb-1.5">
          newNode
        </div>

        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center bg-lime-400 text-gray-900 rounded p-1 px-2 border border-green-800">
            <div className="text-xs text-lime-900 font-semibold">value</div>
            <div className="text-sm font-bold text-gray-800">{value}</div>
            {/* Memory address display */}
            <div className="mt-0.5 text-[10px] text-gray-900 font-mono">{address}</div>
          </div>

          <div className="relative flex flex-col items-center justify-center bg-amber-300 text-gray-700 rounded p-1 px-2 border border-amber-800">
            <div className="text-xs text-amber-900 font-semibold">next</div>
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

const CreationVisualizer = ({
  steps = [],
  currentStepIndex = 0,
  currentList = [],
}) => {
  const step = steps[currentStepIndex] || {};

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
  const displayHeadVal =
    headVal === undefined || headVal === null ? null : headVal;
  const displayTailVal =
    tailVal === undefined || tailVal === null ? null : tailVal;

  // Map head/tail indices to actual node values when possible (users expect values)
  const headCardValue = (() => {
    if (displayHeadVal === null) return null;
    if (
      typeof displayHeadVal === "number" &&
      currentList &&
      currentList[displayHeadVal] !== undefined
    )
      return currentList[displayHeadVal];
    return displayHeadVal;
  })();

  const tailCardValue = (() => {
    if (displayTailVal === null) return null;
    if (
      typeof displayTailVal === "number" &&
      currentList &&
      currentList[displayTailVal] !== undefined
    )
      return currentList[displayTailVal];
    return displayTailVal;
  })();

  // compute persisted i (loop index). prefer explicit step.i, then currentIndex, then persisted.
  let iVal = undefined;
  if (step.i !== undefined) iVal = step.i;
  else if (step.currentIndex !== undefined) iVal = step.currentIndex;
  else {
    const persistedI = findPersistedValue(steps, currentStepIndex, [
      "i",
      "currentIndex",
    ]);
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
    "constructor-class",
    "constructor-signature",
    "constructor-set-value",
    "constructor-set-next",
    "constructor-exit",
    "check-head",
    "set-head",
    "set-tail",
    "first-node",
    "else-block",
    "link-tail",
    "node-linked",
    "update-tail",
    "close-block",
  ]);

  return (
    <div className="p-3">
      {/* show variable cards persistently (use persisted values or show null); show i during loop phases */}
      <div className="mb-3 flex flex-col items-center gap-3">
        {/* First row: i, head, tail */}
        <div className="flex items-center justify-center gap-3">
          {loopPhases.has(step.phase) && (
            <VariableCard
              label="i"
              value={iVal === undefined || iVal === null ? "—" : iVal}
              bgColor="bg-sky-300"
            />
          )}

          {/* Show head/tail only from initialize phase onward */}
          {step.phase !== "start" && (
            <>
              <VariableCard
                label="head"
                value={headCardValue === null ? "null" : headCardValue}
                bgColor="bg-emerald-300"
              />
              <VariableCard
                label="tail"
                value={tailCardValue === null ? "null" : tailCardValue}
                bgColor="bg-fuchsia-300"
              />
            </>
          )}
        </div>

        {/* Second row: newNode(s) - serpentine layout (all left-to-right) */}
        {(() => {
            const newNodes = [];
            const linkedPhases = new Set([
              "link-tail",
              "node-linked",
              "update-tail",
              "close-block",
            ]);

            // Deterministic pseudo memory address for a node index
            const addrForIndex = (idx) => {
              const base = 0xA0B00 + (idx * 0x101);
              return "0x" + base.toString(16).toUpperCase();
            };

            // Collect all newNode instances from steps up to current
            for (let idx = 0; idx <= currentStepIndex; idx++) {
              const s = steps[idx];
              if (
                s.newNode !== undefined &&
                s.newNode !== null &&
                loopPhases.has(s.phase)
              ) {
                const existingNode = newNodes.find((n) => n.i === s.i);
                if (!existingNode) {
                  newNodes.push({
                    value: s.newNode.value ?? s.newNode,
                    next: s.newNode.next ?? null,
                    i: s.i,
                    isLinked: false,
                    addr: addrForIndex(s.i)
                  });
                }
              }
              // Mark nodes as linked after link-tail phase
              if (linkedPhases.has(s.phase) && s.i !== undefined) {
                const nodeToLink = newNodes.find((n) => n.i === s.i - 1);
                const currentNode = newNodes.find((n) => n.i === s.i);
                if (nodeToLink && currentNode) {
                  nodeToLink.isLinked = true;
                  // Update previous node's next to current node's memory address
                  nodeToLink.next = currentNode.addr;
                }
              }
            }

            // Only render if nodes exist
            if (newNodes.length === 0) return null;

            // Split into rows of 5
            const rows = [];
            for (let i = 0; i < newNodes.length; i += 5) {
              rows.push(newNodes.slice(i, i + 5));
            }

            return (
              <div className=" bg-amber-100 border border-amber-400 rounded-xl px-5 py-3 flex flex-col items-start gap-6">
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

                        // Show horizontal arrow if linked and next node in same row
                        const nextNodeIdx = node.i + 1;
                        const nextNodeInSameRow =
                          Math.floor(nextNodeIdx / 5) === rowIdx;
                        const showHorizontalArrow =
                          node.isLinked && nextNodeInSameRow;
                        const showDownArrow =
                          isLastInFirstRow && newNodes.length > 5;

                        // Show snake turn arrow for first node of row 2+ (the 5->6 transition)
                        const showSnakeTurn =
                          rowIdx > 0 &&
                          isFirstOfRow &&
                          newNodes.length > 5 &&
                          newNodes.some((n) => n.i === 4 && n.isLinked);

                        return (
                          <NewNodeConstructor
                            key={`newnode-${node.i}`}
                            value={node.value}
                            next={node.next}
                            address={node.addr}
                            showArrow={showHorizontalArrow}
                            arrowDirection="right"
                            showDownArrow={showDownArrow}
                            showSnakeTurn={showSnakeTurn}
                          />
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

export default CreationVisualizer;
