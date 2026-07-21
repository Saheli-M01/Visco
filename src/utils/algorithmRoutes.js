// Copyright (c) 2026 Saheli Mondal.

const categoryPathSegments = {
  sorting: "sorting",
  array: "array",
  linkedList: "linked-list",
};

const interactiveAlgorithmNames = new Set([
  "Bubble Sort",
  "Selection Sort",
  "Insertion Sort",
  "Merge Sort",
  "Quick Sort",
  "Heap Sort",
  "Binary Search",
  "Dutch Flag",
  "Kadane's Algorithm",
  "Next Permutation",
  "Sliding Window / 2 pointers (Container With Most Water)",
  "Moore's Voting (Boyer-Moore)",
  "Singly Linked List - Creation",
  "Singly Linked List - Traversal",
  "Singly Linked List - Insertion",
  "Singly Linked List - Deletion",
]);

const recentlyViewedStorageKey = "visco-recent-algorithms";

export const isInteractiveAlgorithm = (algorithmName) =>
  interactiveAlgorithmNames.has(algorithmName);

export const algorithmSlug = (algorithmName) =>
  algorithmName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export const getAlgorithmPath = (categoryId, algorithmName) => {
  const categorySegment = categoryPathSegments[categoryId];
  if (!categorySegment || !isInteractiveAlgorithm(algorithmName)) return null;

  return `/${categorySegment}/${algorithmSlug(algorithmName)}`;
};

export const getCategoryPath = (categoryId) =>
  categoryId === "linkedList" ? "/linked-list" : `/${categoryId}`;

export const getCategoryIdFromSegment = (categorySegment) =>
  Object.entries(categoryPathSegments).find(
    ([, segment]) => segment === categorySegment
  )?.[0] || null;

export const getRecentlyViewedAlgorithms = () => {
  try {
    const stored = JSON.parse(localStorage.getItem(recentlyViewedStorageKey));
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const recordRecentlyViewedAlgorithm = (categoryId, algorithmName) => {
  if (!isInteractiveAlgorithm(algorithmName)) return;

  const current = getRecentlyViewedAlgorithms().filter(
    (item) => !(item.categoryId === categoryId && item.algorithmName === algorithmName)
  );
  const updated = [{ categoryId, algorithmName }, ...current].slice(0, 6);

  try {
    localStorage.setItem(recentlyViewedStorageKey, JSON.stringify(updated));
  } catch {
    // Browsers with unavailable storage can still use the visualizer normally.
  }
};
