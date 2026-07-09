import {
  ArrowUpDown,
  List,
  Network,
  GitBranch,
  Link,
} from "lucide-react";

export const topicConfigs = [
  {
    id: "sorting",
    title: "Sorting Algorithms",
    icon: ArrowUpDown,
    accent: "#1F5F4A",
    description: "Visualize how data gets organized",
    path: "/sorting",
  },
  {
    id: "array",
    title: "Array Algorithms",
    icon: List,
    accent: "#C68A1D",
    description: "Master array manipulation techniques",
    path: "/array",
  },
  {
    id: "linked-list",
    title: "Linked Lists",
    icon: Link,
    accent: "#A8471F",
    description: "Connect and manipulate node structures",
    path: "/linked-list",
  },
  {
    id: "graph",
    title: "Graph Algorithms",
    icon: Network,
    accent: "#3B5166",
    description: "Navigate complex network structures",
    path: "/graph",
  },
  {
    id: "tree",
    title: "Tree Algorithms",
    icon: GitBranch,
    accent: "#6B5B3E",
    description: "Explore hierarchical data structures",
    path: "/tree",
  },
];
