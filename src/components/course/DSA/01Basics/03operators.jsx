import React from "react";

export const Operators = () => {
  return (
    <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-3xl font-extrabold text-gray-900">🧮 Operators</h3>
        <p className="text-base md:text-lg text-gray-700">
          Operators let you combine, compare, and move data. Here are the essentials with quick examples.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-blue-900">Arithmetic</h4>
          <pre className="text-xs font-mono text-blue-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`int a = 7, b = 3;
int sum = a + b;      // 10
int diff = a - b;     // 4
int prod = a * b;     // 21
int quot = a / b;     // 2 (integer division)
int rem = a % b;      // 1`}
          </pre>
          <p className="text-xs text-blue-900/80">Use <span className="font-mono">/</span> carefully: ints truncate. For decimals, use <span className="font-mono">double</span>.</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-amber-900">Assignment & Update</h4>
          <pre className="text-xs font-mono text-amber-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`int x = 10;
x += 5;  // 15
x -= 2;  // 13
x *= 3;  // 39
x /= 3;  // 13
x++;     // 14 (post-increment)
++x;     // 15 (pre-increment)`}
          </pre>
          <p className="text-xs text-amber-900/80">Compound ops read and write in one go; pre vs post affects expression order.</p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-emerald-900">Comparison</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`int a = 5, b = 8;
bool less = a < b;      // true
bool equal = a == b;     // false
bool noteq = a != b;     // true
bool between = (a < b) && (b < 10); // true`}
          </pre>
          <p className="text-xs text-emerald-900/80">Comparisons return booleans; chain with <span className="font-mono">&&</span> (and) / <span className="font-mono">||</span> (or).</p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-rose-900">Logical</h4>
          <pre className="text-xs font-mono text-rose-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`bool ready = true;
bool hasData = false;
bool run = ready && hasData; // false
bool maybe = ready || hasData; // true
bool invert = !ready; // false`}
          </pre>
          <p className="text-xs text-rose-900/80">Logical ops short-circuit: <span className="font-mono">&&</span> stops on false, <span className="font-mono">||</span> stops on true.</p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-800 space-y-1">
        <p className="font-semibold text-gray-900">Quick tips</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use <span className="font-mono">==</span> for comparison, not <span className="font-mono">=</span>.</li>
          <li>Integer division truncates; cast to <span className="font-mono">double</span> for precise results.</li>
          <li>Group comparisons with parentheses to make intent obvious.</li>
        </ul>
      </div>
    </section>
  );
};

export default Operators;
