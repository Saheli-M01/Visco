import React from "react";

const GraphDetails = ({ selectedAlgorithm }) => {
  return (
    <div className="p-4">
      <h3 className="text-lg font-bold">{selectedAlgorithm?.name || "Graph Algorithm"}</h3>
      <p className="text-sm text-gray-600 mt-2">This panel can contain information about graph inputs, formats (adjacency list / edge list), and tips.</p>
      <ul className="mt-3 text-sm list-disc list-inside text-gray-700">
        <li>Expected input: comma separated nodes (e.g. A,B,C) and edges in the input panel.</li>
        <li>Edges may be supplied as pairs like A-B or A:B (this UI accepts simple formats).</li>
        <li>Use the controls to step through the algorithm.</li>
      </ul>
    </div>
  );
};

export default GraphDetails;
