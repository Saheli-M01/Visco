import React from "react";

export const Variables = () => {
  return (
    <section className="space-y-5 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-3xl font-extrabold text-gray-900">🔤 Variables</h3>
        <p className="text-base md:text-lg text-gray-700">
          Variables are named boxes for data. Declare, initialize, and update them to track your program's state.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-blue-900">Declare & initialize</h4>
          <pre className="text-xs font-mono text-blue-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`int age = 18;           // with initial value
int count;               // declare first
count = 5;               // then assign
std::string name = "Mia"; // text`}
          </pre>
          <p className="text-xs text-blue-900/80">Pick clear names: count, total, index.</p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-amber-900">Read & update</h4>
          <pre className="text-xs font-mono text-amber-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`int score = 10;
score = score + 5; // now 15
score++;           // 16
std::cout << score;`}
          </pre>
          <p className="text-xs text-amber-900/80">Updating replaces the old value in the same box.</p>
        </div>

        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-emerald-900">Scope</h4>
          <pre className="text-xs font-mono text-emerald-900 bg-white/80 rounded-lg p-3 overflow-x-auto">
{`if (true) {
  int inside = 1; // exists only here
}
// inside is gone here
int outside = 2; // visible after the block`}
          </pre>
          <p className="text-xs text-emerald-900/80">A variable lives only inside the block where it was declared.</p>
        </div>

        <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-4 space-y-2">
          <h4 className="text-lg font-semibold text-rose-900">Common gotchas</h4>
          <ul className="text-sm text-rose-900 space-y-1">
            <li>Uninitialized reads give garbage values — always set a start value.</li>
            <li>Integer overflow for huge numbers; prefer <span className="font-mono">long long</span> when big.</li>
            <li>Prefer <span className="font-mono">const</span> for values that shouldn’t change.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Variables;
