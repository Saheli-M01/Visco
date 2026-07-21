// Copyright (c) 2026 Saheli Mondal.

export const categories = {
  sorting: {
    id: "sorting",

    algorithms: [
      {
        name: "Bubble Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Simple comparison-based algorithm that repeatedly swaps adjacent elements.",
      },
      {
        name: "Selection Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Repeatedly finds minimum element and places it at the beginning.",
      },
      {
        name: "Insertion Sort",
        complexity: "O(n²)",
        difficulty: "Easy",
        shortDescription:
          "Builds sorted array one item at a time, good for small datasets.",
      },
      {
        name: "Merge Sort",
        complexity: "O(n log n)",
        difficulty: "Medium",
        shortDescription:
          "Divide-and-conquer algorithm that splits arrays and merges them back sorted.",
      },
      {
        name: "Quick Sort",
        complexity: "O(n log n)",
        difficulty: "Medium",
        shortDescription:
          "Efficient in-place sorting using partitioning around a pivot element.",
      },

      {
        name: "Heap Sort",
        complexity: "O(n log n)",
        difficulty: "Hard",
        shortDescription:
          "Uses binary heap data structure for efficient in-place sorting.",
      },
    ],
  },

  array: {
    id: "array",

    algorithms: [
      {
        name: "Binary Search",
        complexity: "O(log n)",
        difficulty: "Easy",
        shortDescription:
          "Efficient search algorithm for sorted arrays using divide and conquer.",
      },
      {
        name: "Next Permutation",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Rearrange numbers into the lexicographically next greater permutation.",
      },
      {
        name: "Dutch Flag",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Partition array into three parts in single pass (0s, 1s, 2s).",
      },
      {
        name: "Kadane's Algorithm",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Find maximum sum subarray in linear time using dynamic programming.",
      },
      {
        name: "Sliding Window / 2 pointers (Container With Most Water)",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Pattern for problems involving subarrays of fixed or variable size.",
      },
      {
        name: "Moore's Voting (Boyer-Moore)",
        complexity: "O(n)",
        difficulty: "Hard",
        shortDescription:
          "Find a majority element (if exists) in linear time with constant space.",
      },
    ],
  },

  graph: {
    id: "graph",

    algorithms: [
      {
        name: "Breadth-First Search",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Level-by-level traversal using queue, finds shortest unweighted paths.",
      },
      {
        name: "Depth-First Search",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Deep exploration using recursion or stack, useful for cycle detection.",
      },
      {
        name: "Dijkstra's Algorithm",
        complexity: "O(V²)",
        difficulty: "Hard",
        shortDescription:
          "Find shortest paths from source to all vertices in weighted graphs.",
      },
      {
        name: "Kruskal's Algorithm",
        complexity: "O(E log V)",
        difficulty: "Hard",
        shortDescription:
          "Find minimum spanning tree using union-find data structure.",
      },
      {
        name: "Prim's Algorithm",
        complexity: "O(V²)",
        difficulty: "Hard",
        shortDescription:
          "Build minimum spanning tree by growing from starting vertex.",
      },
      {
        name: "Topological Sort",
        complexity: "O(V + E)",
        difficulty: "Medium",
        shortDescription:
          "Linear ordering of vertices in directed acyclic graphs.",
      },
    ],
  },

  tree: {
    id: "tree",

    algorithms: [
      {
        name: "Binary Search Tree",
        complexity: "O(log n)",
        difficulty: "Medium",
        shortDescription:
          "Self-organizing tree maintaining sorted order for efficient operations.",
      },
      {
        name: "AVL Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Self-balancing BST ensuring optimal height for guaranteed performance.",
      },
      {
        name: "Tree Traversals",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "In-order, pre-order, post-order, and level-order tree exploration.",
      },
      {
        name: "Red-Black Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Balanced BST with color properties ensuring optimal performance.",
      },
      {
        name: "Trie (Prefix Tree)",
        complexity: "O(m)",
        difficulty: "Medium",
        shortDescription:
          "Tree for storing strings efficiently, great for autocomplete features.",
      },
      {
        name: "Segment Tree",
        complexity: "O(log n)",
        difficulty: "Hard",
        shortDescription:
          "Tree for range queries and updates in logarithmic time.",
      },
    ],
  },

  linkedList: {
    id: "linkedList",

    algorithms: [
      // Singly Linked List Operations
      {
        name: "Singly Linked List - Creation",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Create a singly linked list with nodes containing data and next pointer.",
        category: "singly",
      },
      {
        name: "Singly Linked List - Traversal",
        complexity: "O(n)",
        difficulty: "Easy",
        shortDescription:
          "Visit each node in the list from head to tail sequentially.",
        category: "singly",
      },
      {
        name: "Singly Linked List - Insertion",
        complexity: "O(1) / O(n)",
        difficulty: "Easy",
        shortDescription:
          "Insert at head (O(1)), tail (O(n)), kth position, or after value X.",
        category: "singly",
      },
      {
        name: "Singly Linked List - Deletion",
        complexity: "O(1) / O(n)",
        difficulty: "Easy",
        shortDescription:
          "Delete at head (O(1)), tail (O(n)), kth position, or node with value X.",
        category: "singly",
      },
      // Doubly Linked List Operations
      {
        name: "Doubly Linked List - Creation",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Create a doubly linked list with prev and next pointers in each node.",
        category: "doubly",
      },
      {
        name: "Doubly Linked List - Traversal",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Traverse forward or backward through the doubly linked list.",
        category: "doubly",
      },
      {
        name: "Doubly Linked List - Insertion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Insert at head, tail, or any position with O(1) complexity given node reference.",
        category: "doubly",
      },
      {
        name: "Doubly Linked List - Deletion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Delete at head, tail, or any position with O(1) complexity given node reference.",
        category: "doubly",
      },
      // Circular Linked List Operations
      {
        name: "Circular Linked List - Creation",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Create circular linked list where last node points back to first node.",
        category: "circular",
      },
      {
        name: "Circular Linked List - Traversal",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Traverse circular list with careful termination to avoid infinite loops.",
        category: "circular",
      },
      {
        name: "Circular Linked List - Insertion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Insert nodes in circular list maintaining circular structure.",
        category: "circular",
      },
      {
        name: "Circular Linked List - Deletion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Delete nodes from circular list while maintaining circular structure.",
        category: "circular",
      },
      // Doubly Circular Linked List Operations
      {
        name: "Doubly Circular Linked List - Creation",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Create a circular doubly linked list where nodes have prev/next and list is circular.",
        category: "doubly-circular",
      },
      {
        name: "Doubly Circular Linked List - Traversal",
        complexity: "O(n)",
        difficulty: "Medium",
        shortDescription:
          "Traverse forward or backward through the circular doubly linked list.",
        category: "doubly-circular",
      },
      {
        name: "Doubly Circular Linked List - Insertion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Insert at head, tail, or any position in O(1) given the node reference; O(n) to find a position.",
        category: "doubly-circular",
      },
      {
        name: "Doubly Circular Linked List - Deletion",
        complexity: "O(1)",
        difficulty: "Medium",
        shortDescription:
          "Delete at head, tail, or any position in O(1) given the node reference; O(n) to find a node by value.",
        category: "doubly-circular",
      },
    ],
  },
};

export default categories;
