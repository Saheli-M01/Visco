import { BookOpen, Layers, Activity } from "lucide-react";
import { IconInfoCircle } from '@tabler/icons-react';
export const Overview = () => {
  return (
    <section id="overview" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
      <div className="flex items-center justify-between gap-3">
        <div className="flex gap-3 items-center">
             <IconInfoCircle  className="w-6 h-6 text-rose-400"/>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Overview</h2>
        </div>
     
        <span className="text-sm text-gray-500">Start here to see what's inside</span>
      </div>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="font-semibold text-gray-900">Foundational Concepts</h3>
          </div>
          <p className="text-sm text-gray-700">
            Build intuition for arrays, linked lists, stacks, queues, trees, and graphs.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Layers className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-900">Problem Patterns</h3>
          </div>
          <p className="text-sm text-gray-700">
            Master techniques like two pointers, sliding window, divide & conquer, and greedy.
          </p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <Activity className="w-5 h-5 text-rose-600" />
            <h3 className="font-semibold text-gray-900">Complexity Thinking</h3>
          </div>
          <p className="text-sm text-gray-700">
            Learn to reason about performance with Big-O and identify trade-offs.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-800">
        Upcoming modules: Arrays & Strings, Linked Lists, Stacks/Queues/Heaps, Recursion & Divide-Conquer,
        Sorting & Searching, Trees & Graphs.
      </div>
    </section>
  );
};
