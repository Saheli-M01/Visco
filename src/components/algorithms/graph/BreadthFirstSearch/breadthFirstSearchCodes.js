// Code lines for Breadth-First Search used by the CodePreview component
export const breadthFirstSearchCodes = {
  javascript: [
    "function bfs(adj, start) {",
    "  const visited = new Set();",
    "  const q = [start];",
    "  visited.add(start);",
    "  while (q.length) {",
    "    const node = q.shift();",
    "    for (const nb of (adj[node] || [])) {",
    "      if (!visited.has(nb)) {",
    "        visited.add(nb);",
    "        q.push(nb);",
    "      }",
    "    }",
    "  }",
    "  return Array.from(visited);",
    "}",
  ],
};

export default breadthFirstSearchCodes;
