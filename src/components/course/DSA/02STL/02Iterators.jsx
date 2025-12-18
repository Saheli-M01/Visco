import React from "react";

export const STLIterators = () => {
  return (
    <section id="stl-iterators" className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🧭</span>
        <h3 className="text-xl md:text-2xl font-bold text-emerald-900">Iterators</h3>
      </div>
      <p className="text-sm md:text-base text-emerald-900">
        Iterators are smart pointers that let you walk containers safely. Most algorithms expect a begin/end pair.
      </p>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-emerald-900">Walk a vector</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-emerald-50 rounded-lg p-3 overflow-x-auto">
{`vector<int> v = {1,2,3};
for (auto it = v.begin(); it != v.end(); ++it) {
  cout << *it << " ";
}`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-emerald-900">Iterate maps</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-emerald-50 rounded-lg p-3 overflow-x-auto">
{`map<string,int> mp;
mp["alice"] = 3;
for (auto it = mp.begin(); it != mp.end(); ++it) {
  cout << it->first << " " << it->second;
}`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-emerald-900">Range-based for</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-emerald-50 rounded-lg p-3 overflow-x-auto">
{`for (auto &x : v) {
  x *= 2;
}`}
          </pre>
          <p className="text-xs text-emerald-900/80">Syntactic sugar over iterators; avoids off-by-one bugs.</p>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-emerald-900">Iterator helpers</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-emerald-50 rounded-lg p-3 overflow-x-auto">
{`auto it = find(v.begin(), v.end(), 4);
if (it != v.end()) {
  v.erase(it);
}

// reverse iteration
for (auto rit = v.rbegin(); rit != v.rend(); ++rit) {
  cout << *rit;
}`}
          </pre>
        </div>
      </div>

      <p className="text-xs text-emerald-900/80">Remember: end() points past the last element; dereference only valid iterators.</p>
    </section>
  );
};

export default STLIterators;
