// Breadth-First Search algorithm module
export const breadthFirstSearch = {
  name: "Breadth-First Search",

  // generateSteps expects graph input in a simple adjacency list format:
  // either an object { node: [neighbours] } or an array of edges [['A','B'], ...]
  // For UI compatibility this implementation returns a minimal step sequence when given an array of nodes.
  generateSteps: (input, start = null) => {
    const steps = [];

    // If input is an array of nodes, treat them as nodes only (no edges)
    if (!input) {
      steps.push({ visited: [], queue: [], description: "No graph provided" });
      return steps;
    }

    // If input is an object adjacency list
    let adj = {};
    if (Array.isArray(input)) {
      // Accept array-of-edges or array-of-nodes
      if (input.length > 0 && Array.isArray(input[0])) {
        // edges
        input.forEach(([u, v]) => {
          adj[u] = adj[u] || [];
          adj[u].push(v);
          adj[v] = adj[v] || [];
          // For undirected input add reverse; for directed this may be adjusted
        });
      } else {
        // nodes only
        input.forEach((n) => {
          adj[n] = adj[n] || [];
        });
      }
    } else if (typeof input === "object") {
      adj = input;
    }

    // Pick a start node
    let startNode = start;
    if (!startNode) {
      startNode = Object.keys(adj)[0];
    }

    // BFS traversal producing simple visualization steps
    const visited = new Set();
    const queue = [];

    if (!startNode) {
      steps.push({ visited: [], queue: [], description: "Empty graph" });
      return steps;
    }

    visited.add(startNode);
    queue.push(startNode);
    steps.push({ visited: Array.from(visited), queue: [...queue], current: startNode, description: `Start at ${startNode}` });

    while (queue.length > 0) {
      const node = queue.shift();
      const neighbors = adj[node] || [];
      for (const nb of neighbors) {
        if (!visited.has(nb)) {
          visited.add(nb);
          queue.push(nb);
          steps.push({ visited: Array.from(visited), queue: [...queue], current: nb, description: `Visit ${nb} from ${node}` });
        }
      }
    }

    steps.push({ visited: Array.from(visited), queue: [], description: "BFS complete", phase: "completed" });
    return steps;
  },

  getCode: (language = "javascript") => {
    const codes = {
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

    return (codes[language] || codes.javascript).join("\n");
  },
};
