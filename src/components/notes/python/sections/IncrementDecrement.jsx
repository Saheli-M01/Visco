import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import { Plus, Minus, ShieldAlert, RotateCw } from "lucide-react";

const IncrementDecrement = () => {
  return (
    <section id="increment-decrement" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <RotateCw className="w-8 h-8" /> Increment and Decrement Operators
        </h1>
        <p className="text-orange-50 mt-1 text-sm">
          Adding or subtracting 1 from a variable, the Python way.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          If you have learned languages like Java, C++, or JavaScript, you might be used to using <code>++</code> or <code>--</code> to add or subtract 1 from a variable.
        </p>

        <CodeBlock
          code={`// In JavaScript or Java:\nlet count = 5;\ncount++; // Increments count to 6`}
          language="javascript"
        />
      </div>

      <Infobox type="warning" title="Crucial Python Rule">
        <span className="inline-flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          Python does not have ++ or -- operators! <br /> Writing x++ or --x will either cause a syntax error or behave unexpectedly.
        </span>
      </Infobox>

      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Plus className="w-5 h-5" /> How to increment and decrement in Python
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Instead of <code>++</code> or <code>--</code>, you must use <strong>assignment operators</strong> like <code>+=</code> or <code>-=</code>:
        </p>

        <CodeBlock
          code={`count = 5\n\n# Increment by 1\ncount += 1   # count is now 6\n\n# Decrement by 1\ncount -= 1   # count is back to 5\n\n# Standard way\ncount = count + 1`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div className="flex items-center gap-2 border border-emerald-100 dark:border-emerald-900/40 bg-white dark:bg-slate-700 p-3 rounded-lg text-sm text-slate-700 dark:text-slate-200">
            <Plus className="w-4 h-4 text-emerald-500 shrink-0" />
            <span><code>count += 1</code> (increases by 1) </span>
          </div>
          <div className="flex items-center gap-2 border border-rose-100 dark:border-rose-900/40 bg-white dark:bg-slate-700 p-3 rounded-lg text-sm text-slate-700 dark:text-slate-200">
            <Minus className="w-4 h-4 text-rose-500 shrink-0" />
            <span><code>count -= 1</code> (decreases by 1)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncrementDecrement;