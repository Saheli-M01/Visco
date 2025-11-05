import React from "react";
import { VariableCard } from "@/components/algorithm-visualizer-details/algorithm-visualizer-components/VariableCard";

export const NextPermutationVisualizer = ({ step }) => {
  if (!step) return null;

  const pivot = step.pivot;
  const successor = step.successor;
  const reverseRange = step.reverseRange;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Pivot Variable */}
        {typeof pivot === "number" && pivot >= -1 && (
          <VariableCard
            label="Pivot (i)"
            value={pivot === -1 ? "Not found" : `Index ${pivot}${step.array[pivot] !== undefined ? ` (value: ${step.array[pivot]})` : ""}`}
            description="Largest index where arr[i] < arr[i+1]"
          />
        )}

        {/* Successor Variable */}
        {typeof successor === "number" && successor >= 0 && (
          <VariableCard
            label="Successor (j)"
            value={`Index ${successor}${step.array[successor] !== undefined ? ` (value: ${step.array[successor]})` : ""}`}
            description="Largest index where arr[j] > arr[pivot]"
          />
        )}

        {/* Reverse Range */}
        {reverseRange && Array.isArray(reverseRange) && (
          <VariableCard
            label="Reverse Range"
            value={`[${reverseRange[0]}, ${reverseRange[1]}]`}
            description="Reversing suffix after pivot"
          />
        )}
      </div>

      {/* Algorithm Steps Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 mb-2">Algorithm Steps:</h4>
        <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
          <li>Find pivot: largest i where arr[i] &lt; arr[i+1]</li>
          <li>If no pivot, reverse entire array (wrap to smallest)</li>
          <li>Find successor: largest j where arr[j] &gt; arr[pivot]</li>
          <li>Swap arr[pivot] and arr[successor]</li>
          <li>Reverse suffix after pivot to get next permutation</li>
        </ol>
      </div>
    </div>
  );
};
