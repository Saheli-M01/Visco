import React from "react";
import { findPersistedValue } from "../../../algorithm-visualizer-details/algorithm-visualizer-components/stepHelpers";
import VariableCard from "../../../algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

export default function DutchFlagVisualizer({ sortingSteps = [], currentStepIndex = 0, currentStep = {} }) {
	const step = currentStep || sortingSteps[currentStepIndex] || {};
	const isDone = step.phase === "completed";

	// Try to get low/mid/high from explicit step fields
	let lowObj = null;
	
	let midObj = null;
	let highObj = null;

	if (typeof step.low === "number") lowObj = { value: step.low };
	if (typeof step.mid === "number") midObj = { value: step.mid };
	if (typeof step.high === "number") highObj = { value: step.high };

	// Fallback: find persisted values from earlier steps
	if (!lowObj) {
		const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["low"]);
		if (persisted !== null) lowObj = { value: persisted };
	}
	if (!midObj) {
		const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["mid"]);
		if (persisted !== null) midObj = { value: persisted };
	}
	if (!highObj) {
		const persisted = findPersistedValue(sortingSteps, currentStepIndex, ["high"]);
		if (persisted !== null) highObj = { value: persisted };
	}

	if (isDone) return null;

	// Only render when we have at least one pointer
	if (!lowObj && !midObj && !highObj) return null;

	return (
		<div className="mt-3 flex items-center justify-center gap-4 w-full">
			{lowObj && <VariableCard label="low" value={lowObj.value} bgColor="bg-sky-300" />}
			{midObj && <VariableCard label="mid" value={midObj.value} bgColor="bg-fuchsia-300" />}
			{highObj && <VariableCard label="high" value={highObj.value} bgColor="bg-yellow-300" />}
		</div>
	);
}

