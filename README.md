# Visco — Algorithm Visualizer

Visco is an interactive learning platform for understanding Data Structures and Algorithms through step-by-step visualizations.

Instead of only reading code, users can watch an algorithm execute, inspect each operation, follow highlighted code, and understand the time complexity behind it.

## Features

- Interactive algorithm visualizations
- Step-by-step execution controls
- Code highlighting for every algorithm step
- Custom input support
- Algorithm explanations and complexity analysis
- Learning notes for JavaScript and Python
- Clean, responsive interface

## Topics Covered

### Sorting

- Bubble Sort
- Selection Sort
- Insertion Sort
- Merge Sort
- Quick Sort
- Heap Sort

### Arrays

- Binary Search
- Next Permutation
- Dutch National Flag Algorithm
- Kadane’s Algorithm
- Sliding Window / Two Pointers
- Boyer–Moore Voting Algorithm

### Graphs

- Breadth-First Search
- Depth-First Search
- Dijkstra’s Algorithm
- Kruskal’s Algorithm
- Prim’s Algorithm
- Topological Sort

### Trees

- Binary Search Tree
- AVL Tree
- Tree Traversals
- Red-Black Tree
- Trie
- Segment Tree

### Linked Lists

- Singly Linked List
- Doubly Linked List
- Circular Linked List
- Doubly Circular Linked List

Each linked-list category includes common operations such as creation, traversal, insertion, and deletion.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS
- Radix UI
- Material UI
- Framer Motion
- React Router

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18 or newer
- npm

### Installation

```bash
git clone <your-repository-url>
cd visco-algo-lab
npm install
```

### Run locally

```bash
npm run dev
```

The application will be available at the local URL shown in your terminal.

### Production build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint the project

```bash
npm run lint
```

## Project Structure

```text
src/
├── components/
│   ├── algorithms/                    # Algorithm logic and visualizers
│   ├── algorithm-visualizer-details/  # Controls, code preview, step history
│   ├── landing/                       # Landing page sections
│   ├── notes/                         # JavaScript and Python learning notes
│   └── TopicPages/                    # Category-wise topic pages
├── data/                              # Algorithms, categories, and notes data
├── hooks/                             # Custom React hooks
├── utils/                             # Shared utilities
├── App.jsx
└── main.jsx

public/
└── assets/                            # Logos, images, and user-guide media
```

## How It Works

Every supported algorithm is converted into a series of steps. Each step stores the current state of the visualization, such as:

- Current array or data-structure state
- Indices being compared
- Swapped elements
- Current code line
- Description of the operation
- Important temporary variables

This makes it easier to connect the algorithm’s code with what is happening visually.

## Adding a New Algorithm

To add a new algorithm:

1. Create its implementation and visualization files inside `src/components/algorithms/`.
2. Generate the algorithm steps required by the visualizer.
3. Add its code snippets and complexity details.
4. Register the algorithm in the relevant category/data file.
5. Test the visualization with multiple inputs.

## Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

   ```bash
   git checkout -b feat/your-feature-name
   ```

3. Make your changes.
4. Run linting and test the visualizer locally.
5. Open a pull request.



Built to make DSA learning more visual, practical, and intuitive.
