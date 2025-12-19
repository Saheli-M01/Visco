import { useMemo } from 'react';
import { categories } from '../data/categories.js';

// Interactive algorithms list (should match the one in AlgorithmCard)
const INTERACTIVE_ALGORITHMS = [
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
];

/**
 * Custom hook to get algorithm counts for all categories
 * This automatically updates when categories data changes
 */
export const useAlgorithmCounts = () => {
  const algorithmCounts = useMemo(() => {
    const counts = {};
    
    // Map through all categories and count algorithms
    Object.entries(categories).forEach(([key, category]) => {
      counts[key] = category.algorithms?.length || 0;
    });
    
    // Handle the mapping between route paths and data keys
    const pathMapping = {
      'sorting': 'sorting',
      'array': 'array', 
      'graph': 'graph',
      'tree': 'tree',
      'linked-list': 'linkedList' // Route uses hyphen, data uses camelCase
    };
    
    const mappedCounts = {};
    Object.entries(pathMapping).forEach(([routePath, dataKey]) => {
      mappedCounts[routePath] = counts[dataKey] || 0;
    });
    
    return mappedCounts;
  }, []);
  
  return algorithmCounts;
};

/**
 * Custom hook to get interactive algorithm counts for all categories
 * Returns { available, total } for each category
 */
export const useInteractiveAlgorithmCounts = () => {
  const counts = useMemo(() => {
    const result = {};
    
    Object.entries(categories).forEach(([key, category]) => {
      const algorithms = category.algorithms || [];
      const total = algorithms.length;
      const available = algorithms.filter(alg => 
        INTERACTIVE_ALGORITHMS.includes(alg.name)
      ).length;
      
      result[key] = { available, total };
    });
    
    // Handle the mapping between route paths and data keys
    const pathMapping = {
      'sorting': 'sorting',
      'array': 'array', 
      'graph': 'graph',
      'tree': 'tree',
      'linked-list': 'linkedList' // Route uses hyphen, data uses camelCase
    };
    
    const mappedResult = {};
    Object.entries(pathMapping).forEach(([routePath, dataKey]) => {
      mappedResult[routePath] = result[dataKey] || { available: 0, total: 0 };
    });
    
    return mappedResult;
  }, []);
  
  return counts;
};

/**
 * Get count for a specific category
 */
export const useAlgorithmCount = (categoryId) => {
  const counts = useAlgorithmCounts();
  return counts[categoryId] || 0;
};

/**
 * Get total algorithm count across all categories
 */
export const useTotalAlgorithmCount = () => {
  const counts = useAlgorithmCounts();
  return Object.values(counts).reduce((total, count) => total + count, 0);
};