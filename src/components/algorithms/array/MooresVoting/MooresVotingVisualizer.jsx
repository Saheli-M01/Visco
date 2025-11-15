import React from "react";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";
import { findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";

const MooresVotingVisualizer = ({
  currentArray = [],
  sortingSteps = [],
  currentStepIndex = 0,
  currentStep = {},
}) => {
  const step = currentStep || sortingSteps[currentStepIndex] || {};

  // n - array length
  let nObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.n === "number") {
      nObj = { value: step.n };
    }
  }

  // threshold - n/3 value
  let thresholdObj = null;
  if (step.phase !== "start" && step.phase !== "completed") {
    if (typeof step.threshold === "number") {
      thresholdObj = { value: step.threshold };
    }
    if (!thresholdObj) {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, [
        "threshold",
      ]);
      if (persisted !== null && persisted !== undefined) {
        thresholdObj = { value: persisted };
      }
    }
  }

let candidate1Obj = null;
// Show candidate1 in 'init-candidates' even if null; hide in start, init-threshold, init-counts and completed
if (step.phase === "init-candidates") {
  candidate1Obj = { value: step.candidate1 === null ? "null" : step.candidate1 };
} else if (step.phase !== "start" && step.phase !== "init-threshold" && step.phase !== "init-counts" && step.phase !== "completed") {
  if (step.candidate1 !== undefined) {
    candidate1Obj = { value: step.candidate1 === null ? "null" : step.candidate1 };
  } else {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["candidate1"]);
    if (persisted !== undefined) {
      candidate1Obj = { value: persisted === null ? "null" : persisted };
    }
  }
}

let candidate2Obj = null;
// Show candidate2 in 'init-candidates' even if null; hide in start, init-threshold, init-counts and completed
if (step.phase === "init-candidates") {
  candidate2Obj = { value: step.candidate2 === null ? "null" : step.candidate2 };
} else if (step.phase !== "start" && step.phase !== "init-threshold" && step.phase !== "init-counts" && step.phase !== "completed") {
  if (step.candidate2 !== undefined) {
    candidate2Obj = { value: step.candidate2 === null ? "null" : step.candidate2 };
  } else {
    const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["candidate2"]);
    if (persisted !== undefined) {
      candidate2Obj = { value: persisted === null ? "null" : persisted };
    }
  }
}
  // count1 - counter for candidate1
  let count1Obj = null;
  // count1 is shown in init-counts and persisted in all later phases (including init-candidates)
  if (
    step.phase !== "start" &&
    step.phase !== "init-threshold" &&
    step.phase !== "completed"
  ) {
    if (typeof step.count1 === "number") {
      count1Obj = { value: step.count1 };
    } else {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["count1"]);
      if (persisted !== null && persisted !== undefined) {
        count1Obj = { value: persisted };
      }
    }
  }

  let count2Obj = null;
  if (
    step.phase !== "start" &&
    step.phase !== "init-threshold" &&
    step.phase !== "completed"
  ) {
    if (typeof step.count2 === "number") {
      count2Obj = { value: step.count2 };
    } else {
      const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["count2"]);
      if (persisted !== null && persisted !== undefined) {
        count2Obj = { value: persisted };
      }
    }
  }



  // currentValue - value at current index
  let currentValueObj = null;
    if (typeof step.currentValue === "number" && step.phase !== "completed") {
    currentValueObj = { value: step.currentValue };
  }

  // actualCount1 - verified count for candidate1
  let actualCount1Obj = null;
    if (typeof step.actualCount1 === "number" && step.phase !== "completed") {
    actualCount1Obj = { value: step.actualCount1 };
  }

  // actualCount2 - verified count for candidate2
  let actualCount2Obj = null;
    if (typeof step.actualCount2 === "number" && step.phase !== "completed") {
    actualCount2Obj = { value: step.actualCount2 };
  }

  // result - final result array
  let resultObj = null;
    if (step.result && Array.isArray(step.result) && step.phase !== "completed") {
    resultObj = { value: `[${step.result.join(", ")}]` };
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-5">
        {nObj && (
          <VariableCard label="n" value={nObj.value} bgColor="bg-purple-300" />
        )}
        {count1Obj && (
          <VariableCard
            label="count1"
            value={count1Obj.value}
            bgColor="bg-cyan-300"
          />
        )}

        {count2Obj && (
          <VariableCard
            label="count2"
            value={count2Obj.value}
            bgColor="bg-lime-300"
          />
        )}
        {candidate1Obj && (
          <VariableCard
            label="candidate1"
            value={candidate1Obj.value}
            bgColor="bg-blue-300"
          />
        )}

        {candidate2Obj && (
          <VariableCard
            label="candidate2"
            value={candidate2Obj.value}
            bgColor="bg-green-300"
          />
        )}

        {currentValueObj && (
          <VariableCard
            label="num"
            value={currentValueObj.value}
            bgColor="bg-yellow-300"
          />
        )}

        {actualCount1Obj && (
          <VariableCard
            label="actualCount1"
            value={actualCount1Obj.value}
            bgColor="bg-indigo-300"
          />
        )}

        {actualCount2Obj && (
          <VariableCard
            label="actualCount2"
            value={actualCount2Obj.value}
            bgColor="bg-teal-300"
          />
        )}

        {resultObj && (
          <VariableCard
            label="result"
            value={resultObj.value}
            bgColor="bg-amber-300"
          />
        )}
      </div>
    </div>
  );
};

export default MooresVotingVisualizer;
