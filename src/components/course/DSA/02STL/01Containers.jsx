import React from "react";

export const STLContainers = () => {
  return (
    <section id="stl-containers" className="space-y-4 rounded-2xl border border-blue-200 bg-blue-50/70 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-2xl">📦</span>
        <h3 className="text-xl md:text-2xl font-bold text-blue-900">Containers</h3>
      </div>
      <p className="text-sm md:text-base text-blue-900">
        Choose the box that fits the job. Each container has a vibe: order, speed, uniqueness, or positional tricks.
      </p>

      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">vector</h4>
          <p className="text-blue-900/90">Resizable array, O(1) push_back, random access.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`vector<int> v = {1,2,3};
v.push_back(4);
cout << v[2]; // 3`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">deque</h4>
          <p className="text-blue-900/90">Push/pop at both ends in O(1). Great for sliding windows.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`deque<int> dq;
dq.push_front(1);
dq.push_back(2);
dq.pop_front();`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">list</h4>
          <p className="text-blue-900/90">Doubly linked list. Splice/erase in O(1) with iterators.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`list<int> lst = {1,2,3};
auto it = next(lst.begin());
lst.insert(it, 9); // 1 9 2 3`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">queue / priority_queue</h4>
          <p className="text-blue-900/90">FIFO lines or max-heaps. Model tasks or pick best first.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`queue<int> q;
q.push(10); q.push(20);
q.pop(); // removes 10

priority_queue<int> pq;
pq.push(5); pq.push(9);
cout << pq.top(); // 9`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">set / multiset</h4>
          <p className="text-blue-900/90">Sorted, unique (set) or allow duplicates (multiset). O(log n).</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`set<int> s = {3,1,4};
s.insert(2); // 1 2 3 4
cout << *s.lower_bound(3); // 3`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">unordered_map / unordered_set</h4>
          <p className="text-blue-900/90">Hash tables: average O(1) insert/find/erase.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`unordered_map<string,int> freq;
freq["apple"]++;
if (freq.count("apple")) {/* found */}`}
          </pre>
        </div>

        <div className="rounded-xl border border-white/60 bg-white/80 p-4 space-y-2">
          <h4 className="font-semibold text-blue-900">map</h4>
          <p className="text-blue-900/90">Ordered key → value, O(log n), in-order traversal by default.</p>
          <pre className="text-xs font-mono text-blue-900 bg-blue-50 rounded-lg p-3 overflow-x-auto">
{`map<int,string> id;
id[7] = "Eve";
for (auto &[k,v] : id) cout << k << v;`}
          </pre>
        </div>
      </div>

      <p className="text-xs text-blue-900/80">Pick for access pattern: random access (vector), ends (deque), order + uniqueness (set/map), hashing (unordered_).</p>
    </section>
  );
};

export default STLContainers;
