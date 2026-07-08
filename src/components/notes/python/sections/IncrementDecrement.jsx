import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";

const IncrementDecrement = () => {
  return (
    <section id="increment-decrement" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        7. Increment and Decrement Operators
      </h1>

      <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
        If you have learned languages like Java, C++, or JavaScript, you might be used to using <code>++</code> or <code>--</code> to add or subtract 1 from a variable.
      </p>

      <CodeBlock
        code={`// In JavaScript or Java:\nlet count = 5;\ncount++; // Increments count to 6`}
        language="javascript"
      />

      <Infobox type="warning" title="Crucial Python Rule">
        Python does <strong>NOT</strong> have <code>++</code> or <code>--</code> operators! Writing <code>x++</code> or <code>--x</code> will either cause a syntax error or behave unexpectedly.
      </Infobox>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          How to increment and decrement in Python:
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Instead of <code>++</code> or <code>--</code>, you must use <strong>assignment operators</strong> like <code>+=</code> or <code>-=</code>:
        </p>

        <CodeBlock
          code={`count = 5\n\n# Increment by 1\ncount += 1   # count is now 6\n\n# Decrement by 1\ncount -= 1   # count is back to 5\n\n# Standard way\ncount = count + 1`}
        />
      </div>
    </section>
  );
};

export default IncrementDecrement;
