import { bubbleSort } from "../components/algorithms/sorting/BubbleSort/bubbleSort.js";
import { selectionSort } from "../components/algorithms/sorting/SelectionSort/selectionSort.js";
import { insertionSort } from "../components/algorithms/sorting/InsertionSort/insertionSort.js";
import { mergeSort } from "../components/algorithms/sorting/MergeSort/mergeSort.js";
import { quickSort } from "../components/algorithms/sorting/QuickSort/quickSort.js";
import { heapSort } from "../components/algorithms/sorting/HeapSort/heapSort.js";
import { binarySearch } from "../components/algorithms/array/BinarySearch/binarySearch.js";
import { dutchFlag } from "../components/algorithms/array/Dutch/dutchFlag.js";
import { kadane } from "../components/algorithms/array/Kadanes/kadanes.js";
import { nextPermutation } from "../components/algorithms/array/NextPermutation/nextPermutation.js";
import { slidingWindow } from "../components/algorithms/array/SlidingWindow/slidingWindow.js";
import { mooresVoting } from "../components/algorithms/array/MooresVoting/mooresVoting.js";
import { sllCreation } from "../components/algorithms/linked-list/singlyLinkedList/sllCreation/sllCreation.js";
import { sllTraversal } from "../components/algorithms/linked-list/singlyLinkedList/sllTraversal/sllTraversal.js";
import { sllInsertion } from "../components/algorithms/linked-list/singlyLinkedList/sllInsertion/sllInsertion.js";
import { sllDeletion } from "../components/algorithms/linked-list/singlyLinkedList/sllDeletion/sllDeletion.js";

/**
 * Canonical algorithm registry.
 * Keys are normalized (lowercase, no spaces/hyphens).
 * Lookup normalizes input the same way, so any casing/spacing works.
 */
const algorithmRegistry = {
  bubblesort: bubbleSort,
  selectionsort: selectionSort,
  insertionsort: insertionSort,
  mergesort: mergeSort,
  quicksort: quickSort,
  heapsort: heapSort,
  binarysearch: binarySearch,
  dutchflag: dutchFlag,
  kadanesalgorithm: kadane,
  kadane: kadane,
  nextpermutation: nextPermutation,
  slidingwindow: slidingWindow,
  slidingwindow2pointerscontainerwithmostwater: slidingWindow,
  containerwithmostwater: slidingWindow,
  mooresvoting: mooresVoting,
  mooresvotingboyermoore: mooresVoting,
  mooresvotingalgorithm: mooresVoting,
  boyermoore: mooresVoting,
  singlylinkedlistcreation: sllCreation,
  singlylinkedlisttraversal: sllTraversal,
  singlylinkedlistinsertion: sllInsertion,
  singlylinkedlistdeletion: sllDeletion,
};

/**
 * Normalize an algorithm name for lookup.
 * Strips spaces, hyphens, parentheses, slashes, apostrophes and lowercases.
 */
const normalize = (name) =>
  name
    ?.toLowerCase()
    .replace(/[\s\-()/']/g, "") || "";

/**
 * Get the algorithm implementation by name.
 * Accepts any casing, spacing, or common alias.
 */
export const getAlgorithm = (algorithmName) => {
  const key = normalize(algorithmName);

  if (algorithmRegistry[key]) {
    return algorithmRegistry[key];
  }

  // Return placeholder for unsupported algorithms
  return {
    name: algorithmName || "Unknown Algorithm",
    generateSteps: (arr) => [
      {
        array: [...arr],
        comparing: [],
        swapped: [],
        description: `${algorithmName} implementation coming soon!`,
      },
    ],
    getCode: (language) =>
      `// ${algorithmName} implementation in ${language}\n// Coming soon...\n\nfunction ${key || "algorithm"}() {\n    // Implementation will be added soon\n}`,
  };
};

// Helper function to parse array input
export const parseArray = (input) => {
  return input
    .split(",")
    .map((item) => parseFloat(item.trim()))
    .filter((num) => !isNaN(num));
};
