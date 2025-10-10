import React from "react";
import { parseIndexFromDesc, findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/shared/VariableCard";

export default function BubbleVisualizer({
  currentArray = [],
  comparingIndices = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) {
  const step = currentStep || sortingSteps[currentStepIndex] || {};
  const isDone = step.phase === "completed";

  // Compute bubble i/j locally by scanning current and prior steps
  let bubbleIObj = null;
  let bubbleJObj = null;

  if (step.phase === "outer_loop") {
    const parsed = parseIndexFromDesc(step.description, "i");
    if (parsed !== null) bubbleIObj = { value: parsed };
  }
  if (step.phase === "inner_loop") {
    const parsed = parseIndexFromDesc(step.description, "j");
    if (parsed !== null) bubbleJObj = { value: parsed };
  }
  if (!bubbleJObj && Array.isArray(step.comparing) && step.comparing.length > 0) {
    bubbleJObj = { value: step.comparing[0] };
  }

  if (!bubbleIObj || !bubbleJObj) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (!bubbleIObj && st.phase === "outer_loop") {
        const parsed = parseIndexFromDesc(st.description, "i");
        if (parsed !== null) bubbleIObj = { value: parsed };
      }
      if (!bubbleJObj && st.phase === "inner_loop") {
        const parsed = parseIndexFromDesc(st.description, "j");
        if (parsed !== null) bubbleJObj = { value: parsed };
      }
      if (bubbleIObj && bubbleJObj) break;
    }
  }

  // Hide bubble j during outer_loop
  if (step.phase === "outer_loop") {
    bubbleJObj = null;
  }

  if (isDone) return null;

  // Determine if this is the bubble context; if not, do not render anything
  const isBubbleContext =
    step.phase === "outer_loop" ||
    step.phase === "inner_loop" ||
    (Array.isArray(step.comparing) && step.comparing.length > 0);

  if (!isBubbleContext) return null;

  if (!bubbleIObj && !bubbleJObj) return null;

  return (
    <div className="mt-3 flex items-center justify-center gap-4 w-full">
      {bubbleIObj && (
        <VariableCard label="i" value={bubbleIObj.value} bgColor="bg-sky-300" />
      )}
      {bubbleJObj && (
        <VariableCard label="j" value={bubbleJObj.value} bgColor="bg-fuchsia-300" />
      )}
    </div>
  );
}
