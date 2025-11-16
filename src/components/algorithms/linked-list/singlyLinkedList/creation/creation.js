import CreationCodes from "./creationCodes";
import CreationVisualizer from "./CreationVisualizer";

export const singlyLinkedListCreation = {
  name: "Singly Linked List - Creation",
  // values: array of values to insert
  generateSteps: (values = [], language) => {
    const steps = [];

    // initial empty list
    steps.push({
      array: [],
      description: "Start with an empty linked list.",
      codeLine: 1,
      phase: "init",
      headNode: null,
      tailNode: null,
      currentNode: null,
      previousNode: null,
    });

    // Add one node at a time to the tail
    const current = [];
    values.forEach((val, i) => {
      // before adding
      steps.push({
        array: [...current],
        description: `Preparing to create node with value ${val}.`,
        codeLine: 2,
        phase: "build:prepare",
        headNode: current.length > 0 ? 0 : null,
        tailNode: current.length > 0 ? current.length - 1 : null,
        currentNode: null,
      });

      current.push(val);

      // after adding
      steps.push({
        array: [...current],
        description: `Create node with value ${val} and append to the tail.`,
        codeLine: 3,
        phase: "build:append",
        headNode: 0,
        tailNode: current.length - 1,
        currentNode: current.length - 1,
      });
    });

    // final state
    steps.push({
      array: [...current],
      description: `Linked list creation complete. Length = ${current.length}.`,
      codeLine: 4,
      phase: "done",
      headNode: current.length > 0 ? 0 : null,
      tailNode: current.length > 0 ? current.length - 1 : null,
      currentNode: null,
    });

    return steps;
  },

  getCode: (language = "javascript") => {
    const code = CreationCodes[language.toLowerCase()] || CreationCodes.javascript;
    return code;
  },

  getCodeLines: (language = "javascript") => {
    const code = CreationCodes[language.toLowerCase()] || CreationCodes.javascript;
    return code.split("\n");
  },

  // Optional visualizer component that pages can use if they want richer visuals
  Visualizer: CreationVisualizer,
};
