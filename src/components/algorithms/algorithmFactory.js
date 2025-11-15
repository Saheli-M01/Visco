import { bubbleSort } from "./sorting/BubbleSort/bubbleSort.js";
import { selectionSort } from "./sorting/SelectionSort/selectionSort.js";
import { insertionSort } from "./sorting/InsertionSort/insertionSort.js";
import { mergeSort } from "./sorting/MergeSort/mergeSort.js";
import { quickSort } from "./sorting/QuickSort/quickSort.js";
import { heapSort } from "./sorting/HeapSort/heapSort.js";
import {binarySearch} from "./array/BinarySearch/binarySearch.js";
import { dutchFlag } from "./array/Dutch/dutchFlag.js";
import {kadane} from "./array/Kadanes/kadanes";
import { nextPermutation } from "./array/NextPermutation/nextPermutation.js";
import { slidingWindow } from "./array/SlidingWindow/slidingWindow.js";
import { mooresVoting } from "./array/MooresVoting/mooresVoting.js";
import { singlyLinkedList } from "./linked-list/singlyLinkedList/singlyLinkedList.js";

// Algorithm factory to get the appropriate algorithm implementation
export const getAlgorithm = (algorithmName) => {
  const algorithmMap = {
    "Bubble Sort": bubbleSort,
    "bubble sort": bubbleSort,
    bubblesort: bubbleSort,
    "Selection Sort": selectionSort,
    "selection sort": selectionSort,
    selectionsort: selectionSort,
    "Insertion Sort": insertionSort,
    "insertion sort": insertionSort,
    insertionsort: insertionSort,
    "Merge Sort": mergeSort,
    "merge sort": mergeSort,
    mergesort: mergeSort,
    "Quick Sort": quickSort,
    "quick sort": quickSort,
    quicksort: quickSort,
    "Heap Sort": heapSort,
    "heap sort": heapSort,
    heapsort: heapSort,
    "Binary Search": binarySearch,
    "binary search": binarySearch,
    binarysearch: binarySearch,
    "Dutch Flag": dutchFlag,
    "dutch flag": dutchFlag,
    dutchflag: dutchFlag,
    "Kadane's Algorithm": kadane,
    "kadane's algorithm": kadane,
    "kadane": kadane,
    kadane: kadane,
    "Next Permutation": nextPermutation,
    "next permutation": nextPermutation,
    "nextpermutation": nextPermutation,
    nextpermutation: nextPermutation,
    "Sliding Window": slidingWindow,
    "sliding window": slidingWindow,
    slidingwindow: slidingWindow,
    "Sliding Window / 2 pointers (Container With Most Water)": slidingWindow,
    "sliding window / 2 pointers (container with most water)": slidingWindow,
    "Container With Most Water": slidingWindow,
    "container with most water": slidingWindow,
    "Moore's Voting Algorithm": mooresVoting,
    "moore's voting algorithm": mooresVoting,
    "moores voting": mooresVoting,
    mooresvoting: mooresVoting,
    "Moore's Voting": mooresVoting,
    "moore's voting": mooresVoting,
    "Moore's Voting (Boyer-Moore)": mooresVoting,
    "moore's voting (boyer-moore)": mooresVoting,
    "Boyer-Moore": mooresVoting,
    "boyer-moore": mooresVoting,
    "Singly Linked List": singlyLinkedList,
    "singly linked list": singlyLinkedList,
    singlylinkedlist: singlyLinkedList,
    "Singly Linked List - Creation": singlyLinkedList,
    "singly linked list - creation": singlyLinkedList,
    "Singly Linked List - Traversal": singlyLinkedList,
    "singly linked list - traversal": singlyLinkedList,
    "Singly Linked List - Insertion": singlyLinkedList,
    "singly linked list - insertion": singlyLinkedList,
    "Singly Linked List - Deletion": singlyLinkedList,
    "singly linked list - deletion": singlyLinkedList,
    "Doubly Linked List - Creation": singlyLinkedList, // Placeholder
    "doubly linked list - creation": singlyLinkedList,
    "Doubly Linked List - Traversal": singlyLinkedList, // Placeholder
    "doubly linked list - traversal": singlyLinkedList,
    "Doubly Linked List - Insertion": singlyLinkedList, // Placeholder
    "doubly linked list - insertion": singlyLinkedList,
    "Doubly Linked List - Deletion": singlyLinkedList, // Placeholder
    "doubly linked list - deletion": singlyLinkedList,
    "Circular Linked List - Creation": singlyLinkedList, // Placeholder
    "circular linked list - creation": singlyLinkedList,
    "Circular Linked List - Traversal": singlyLinkedList, // Placeholder
    "circular linked list - traversal": singlyLinkedList,
    "Circular Linked List - Insertion": singlyLinkedList, // Placeholder
    "circular linked list - insertion": singlyLinkedList,
    "Circular Linked List - Deletion": singlyLinkedList, // Placeholder
    "circular linked list - deletion": singlyLinkedList,
    "linked list": singlyLinkedList,
    linkedlist: singlyLinkedList,
  };

  const normalizedName = algorithmName?.toLowerCase().replace(/\s+/g, "");

  // Try exact match first
  if (algorithmMap[algorithmName]) {
    return algorithmMap[algorithmName];
  }

  // Try normalized match
  if (algorithmMap[normalizedName]) {
    return algorithmMap[normalizedName];
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
    getCode: (language) => `// ${algorithmName} implementation in ${language}
// Coming soon...

function ${
      algorithmName
        ? algorithmName.toLowerCase().replace(/\s+/g, "")
        : "algorithm"
    }() {
    // Implementation will be added soon
}`,
  };
};

// Helper function to parse array input
export const parseArray = (input) => {
  return input
    .split(",")
    .map((item) => parseFloat(item.trim()))
    .filter((num) => !isNaN(num));
};
