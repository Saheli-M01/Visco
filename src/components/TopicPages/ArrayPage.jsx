import React from "react";
import CategoryLayout from "@/components/TopicPages/layout/CategoryLayout";
import { categories } from "@/data/categories";

const ArrayPage = () => {
  const arrayCategory = categories.array;
  const complexityData = [
    {
      name: "Binary Search",
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },

    {
      name: "Sliding Window / 2 Pointers (Container With Most Water)",
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Kadane's Algorithm",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Dutch Flag",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Moore's Voting (Boyer-Moore)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Next Permutation",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    }
  ];


  return (
    <CategoryLayout category={arrayCategory} complexityData={complexityData} />
  );
};

export default ArrayPage;
