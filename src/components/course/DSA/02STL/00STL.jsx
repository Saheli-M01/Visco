import React from "react";

export const STLIntro = () => {
  return (
    <section id="stl-overview" className="space-y-3 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧰</span>
        <h3 className="text-xl md:text-2xl font-bold text-indigo-900">Why STL?</h3>
      </div>
      <p className="text-sm md:text-base text-indigo-900">
        STL is your pre-built toolbox: fast containers, safe iterators, and battle-tested algorithms. Less boilerplate,
        more problem solving.
      </p>
      <pre className="text-xs font-mono text-indigo-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`#include <bits/stdc++.h>
using namespace std;

int main() {
  vector<int> v = {3,1,4};
  sort(v.begin(), v.end()); // 1 3 4
  cout << v.front();
}
`}
      </pre>
      <p className="text-xs text-indigo-900/80">One line to sort, one line to print. STL keeps you fast.</p>
    </section>
  );
};

export default STLIntro;
