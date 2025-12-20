import React from "react";
import CategoryLayout from "@/components/TopicPages/layout/CategoryLayout";
import { categories } from "@/hooks/categories";

const SortingPage = () => {
  const sortingCategory = categories.sorting;



  const complexityData = [
    {
      name: "Bubble Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Selection Sort",
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Insertion Sort",
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)"
    },
    {
      name: "Merge Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)"
    },
    {
      name: "Quick Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)"
    },
    {
      name: "Heap Sort",
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)"
    }
  ];

  const sections = [
    {
      title: "Sorting Techniques",
      algorithms: sortingCategory.algorithms,
    },
  ];

  return (
    <CategoryLayout
      category={sortingCategory}
      complexityData={complexityData}
      sections={sections}
    />
  );
};

export default SortingPage;