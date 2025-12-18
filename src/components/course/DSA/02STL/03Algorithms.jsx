import React from "react";

export const STLAlgorithms = () => {
  return (
    <section id="stl-algorithms" className="space-y-4 rounded-2xl border border-rose-200 bg-rose-50/70 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">⚡</span>
        <h3 className="text-xl md:text-2xl font-bold text-rose-900">Algorithm Library</h3>
      </div>
      <p className="text-sm md:text-base text-rose-900">
        Ready-made functions for searching, sorting, transforming, counting—powered by iterators, so they work on most containers.
      </p>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-rose-900">Sort & search</h4>
          <pre className="text-xs font-mono text-rose-900 bg-rose-50 rounded-lg p-3 overflow-x-auto">
{`vector<int> v = {5,1,4,2};
sort(v.begin(), v.end());       // 1 2 4 5
bool has4 = binary_search(v.begin(), v.end(), 4);`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-rose-900">Min/Max & extremes</h4>
          <pre className="text-xs font-mono text-rose-900 bg-rose-50 rounded-lg p-3 overflow-x-auto">
{`auto [mnIt, mxIt] = minmax_element(v.begin(), v.end());
cout << *mnIt << " " << *mxIt;`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-rose-900">Transform & accumulate</h4>
          <pre className="text-xs font-mono text-rose-900 bg-rose-50 rounded-lg p-3 overflow-x-auto">
{`vector<int> v2;
v2.resize(v.size());
transform(v.begin(), v.end(), v2.begin(), [](int x){ return x*2; });
int sum = accumulate(v.begin(), v.end(), 0);`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-rose-900">Erase / unique / partition</h4>
          <pre className="text-xs font-mono text-rose-900 bg-rose-50 rounded-lg p-3 overflow-x-auto">
{`vector<int> a = {1,1,2,3,3};
a.erase(unique(a.begin(), a.end()), a.end()); // 1 2 3

stable_partition(a.begin(), a.end(), [](int x){ return x%2==0; });`}
          </pre>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-4 text-xs text-gray-800 space-y-1">
        <p className="font-semibold text-gray-900">Pro tips</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Algorithms are non-member functions: you pass iterators, they do the work.</li>
          <li>Most run in O(n) or O(n log n) depending on the task; know your container's iterator category.</li>
          <li>Use <span className="font-mono">begin()</span>/<span className="font-mono">end()</span> free functions (C++14+) for cleaner code.</li>
        </ul>
      </div>
    </section>
  );
};

export default STLAlgorithms;
