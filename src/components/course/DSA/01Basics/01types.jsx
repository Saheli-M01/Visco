import React from "react";

export const Types = () => {
  return (
    <section className="space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-2">
        <h3 className="text-3xl font-extrabold bg-gradient-to-r from-fuchsia-600 to-violet-600 bg-clip-text text-transparent">
          🎭 Types of Data
        </h3>
        <p className="text-base md:text-lg text-gray-700">
          Clear, example-first snapshots of the main data types you’ll use.
        </p>
      </div>

      {/* Examples first */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🍬</span>
            <h4 className="text-lg font-semibold text-amber-900">Primitives</h4>
          </div>
          <p className="text-sm text-amber-900">Tiny, fast values for math, flags, and single characters.</p>
          <pre className="text-xs font-mono text-amber-900 bg-white/70 rounded-lg p-3 overflow-x-auto">
{`int score = 42;
double pi = 3.14;
char grade = 'A';
bool isReady = true;`}
          </pre>
          <p className="text-xs text-amber-900/80">Use when you just need the raw value.</p>
        </div>

        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎁</span>
            <h4 className="text-lg font-semibold text-blue-900">Composite</h4>
          </div>
          <p className="text-sm text-blue-900">Collections or bundles built from primitives.</p>
          <pre className="text-xs font-mono text-blue-900 bg-white/70 rounded-lg p-3 overflow-x-auto">
{`int nums[3] = {1, 2, 3};      // array
std::string name = "Visco";   // string
struct Point { int x; int y; }; // struct`}
          </pre>
          <p className="text-xs text-blue-900/80">Arrays are fixed rows, strings are text, structs/classes bundle fields.</p>
        </div>

        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🧠</span>
            <h4 className="text-lg font-semibold text-emerald-900">Abstract Data Types</h4>
          </div>
          <p className="text-sm text-emerald-900">Smart behaviors for everyday tasks.</p>
          <pre className="text-xs font-mono text-emerald-900 bg-white/70 rounded-lg p-3 overflow-x-auto">
{`stack<int> undo;
queue<int> line;
priority_queue<int> pq;
unordered_map<string, int> freq;`}
          </pre>
          <ul className="text-xs text-emerald-900/90 space-y-1">
            <li><span className="font-semibold">stack</span>: last-in-first-out (undo).</li>
            <li><span className="font-semibold">queue</span>: first-in-first-out (tasks).</li>
            <li><span className="font-semibold">priority queue</span>: grab highest priority first.</li>
            <li><span className="font-semibold">map/set</span>: quick lookups + uniqueness.</li>
          </ul>
        </div>
      </div>

      {/* Visual intuition */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
          <h4 className="text-lg font-bold text-purple-900 mb-2">📦 Arrays vs. Linked Lists</h4>
          <ul className="text-sm text-purple-900 space-y-1">
            <li>Array: boxes in a row — O(1) index, slower inserts in the middle.</li>
            <li>Linked List: boxes with arrows — easy inserts/deletes, slower to find by index.</li>
          </ul>
        </div>
        <div className="rounded-2xl border-2 border-rose-200 bg-gradient-to-br from-rose-50 to-rose-100 p-5">
          <h4 className="text-lg font-bold text-rose-900 mb-2">🔑 Maps & Sets</h4>
          <ul className="text-sm text-rose-900 space-y-1">
            <li>Set: unique items only — great for membership checks.</li>
            <li>Map: key → value — instant dictionary lookups.</li>
          </ul>
        </div>
      </div>

      {/* Tiny quiz */}
      <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 text-sm text-gray-800">
        <p className="font-semibold mb-2">🧩 Quick Check:</p>
        <ol className="list-decimal pl-5 space-y-1">
          <li>Grade (A/B/C): <span className="font-mono">char</span></li>
          <li>Phone by name: <span className="font-mono">map</span></li>
          <li>Unique user IDs: <span className="font-mono">set</span></li>
        </ol>
      </div>

      <p className="text-xs text-gray-600 italic opacity-60">Next up: combine these types to solve problems efficiently.</p>
    </section>
  );
};

export default Types;
