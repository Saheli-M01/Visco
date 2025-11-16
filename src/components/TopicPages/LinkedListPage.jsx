import React from "react";
import CategoryLayout from "@/components/TopicPages/layout/CategoryLayout";
import { categories } from "@/data/categories";

const LinkedListPage = () => {
  const linkedListCategory = categories.linkedList;

  // Group algorithms by category
  const singlyAlgorithms = linkedListCategory.algorithms.filter(
    (algo) => algo.category === "singly"
  );
  const doublyAlgorithms = linkedListCategory.algorithms.filter(
    (algo) => algo.category === "doubly"
  );
  const circularAlgorithms = linkedListCategory.algorithms.filter(
    (algo) => algo.category === "circular"
  );
  const doublyCircularAlgorithms = linkedListCategory.algorithms.filter(
    (algo) => algo.category === "doubly-circular"
  );

  const sections = [
    {
      title: "Singly Linked List",
      algorithms: singlyAlgorithms,
    },
    {
      title: "Doubly Linked List",
      algorithms: doublyAlgorithms,
    },
    {
      title: "Circular Linked List",
      algorithms: circularAlgorithms,
    },
    {
      title: "Doubly Circular Linked List",
      algorithms: doublyCircularAlgorithms,
    },
  ];

  // Complexity data for the table
  const complexityData = [
    // Singly Linked List
    {
      name: "Singly LL - Creation",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Traversal",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Insertion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Insertion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Insertion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Insertion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Deletion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Deletion (tail)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Deletion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Singly LL - Deletion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    // Doubly Linked List
    {
      name: "Doubly LL - Creation",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Traversal",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Insertion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Insertion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Insertion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Insertion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Deletion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Deletion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Deletion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly LL - Deletion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },

    // Circular Linked List (singly circular)
    {
      name: "Circular LL - Creation",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Traversal",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Insertion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Insertion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Insertion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Insertion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Deletion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Deletion (tail)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Deletion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Circular LL - Deletion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    // Doubly Circular Linked List
    {
      name: "Doubly Circular LL - Creation",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Traversal",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Insertion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Insertion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Insertion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Insertion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Deletion (head)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Deletion (tail)",
      best: "O(1)",
      average: "O(1)",
      worst: "O(1)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Deletion (kth position)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    {
      name: "Doubly Circular LL - Deletion (by value X)",
      best: "O(n)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
  ];

  return (
    <CategoryLayout
      category={linkedListCategory}
      complexityData={complexityData}
      sections={sections}
    />
  );
};

export default LinkedListPage;

