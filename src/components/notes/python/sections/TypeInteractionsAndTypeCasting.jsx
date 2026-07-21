// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
  Shuffle,
  Plus,
  X as XIcon,
  Type,
  AlertTriangle,
  ToggleLeft,
  ArrowLeftRight,
  Wand2,
  ListChecks,
  Table2,
} from "lucide-react";

const TypeInteractions = () => {
  const implicitHeaders = ["Situation", "What Python Does", "Conversion Direction"];
  const implicitRows = [
    ["int + float", "Converts int to float", "int → float"],
    ["int + bool", "Converts bool to int", "bool → int"],
    ["float + bool", "Converts bool to float", "bool → float"],
  ];

  const explicitHeaders = ["Function", "What it Does", "Example"];
  const explicitRows = [
    [<code>int()</code>, "Converts to integer", <code>int("42") → 42</code>],
    [<code>float()</code>, "Converts to float", <code>float("3.14") → 3.14</code>],
    [<code>str()</code>, "Converts to string", <code>str(42) → "42"</code>],
    [<code>bool()</code>, "Converts to boolean", <code>bool(1) → True</code>],
  ];

  const comparisonHeaders = ["Feature", "Implicit Conversion", "Explicit Conversion"];
  const comparisonRows = [
    [<strong>Done by</strong>, "Python automatically", "Programmer manually"],
    [<strong>Syntax</strong>, "No function needed", <span>Uses functions: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code></span>],
    [<strong>When used</strong>, "Compatible types (int + float)", "Incompatible types (str + int)"],
    [<strong>Data loss risk</strong>, "No data loss (converts to larger type)", "Possible data loss (e.g., float to int)"],
    [<strong>Example</strong>, <code>5 + 3.5 → 8.5</code>, <code>"Age: " + str(25) → "Age: 25"</code>],
  ];

  const interactionHeaders = ["Type 1", "Operator", "Type 2", "Example", "Result & Type"];
  const interactionRows = [
    [<strong>int</strong>, <code>+</code>, <strong>int</strong>, <code>5 + 3</code>, <code>8</code>, " (int)"],
    [<strong>int</strong>, <code>+</code>, <strong>float</strong>, <code>5 + 3.5</code>, <code>8.5</code>, " (float)"],
    [<strong>int</strong>, <code>+</code>, <strong>str</strong>, <code>5 + "text"</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>int</strong>, <code>+</code>, <strong>bool</strong>, <code>5 + True</code>, <code>6</code>, " (int)"],
    [<strong>float</strong>, <code>+</code>, <strong>int</strong>, <code>3.5 + 2</code>, <code>5.5</code>, " (float)"],
    [<strong>float</strong>, <code>+</code>, <strong>float</strong>, <code>3.5 + 2.5</code>, <code>6.0</code>, " (float)"],
    [<strong>float</strong>, <code>+</code>, <strong>str</strong>, <code>3.5 + "text"</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>float</strong>, <code>+</code>, <strong>bool</strong>, <code>3.5 + True</code>, <code>4.5</code>, " (float)"],
    [<strong>str</strong>, <code>+</code>, <strong>int</strong>, <code>"text" + 5</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>str</strong>, <code>+</code>, <strong>float</strong>, <code>"text" + 3.5</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>str</strong>, <code>+</code>, <strong>str</strong>, <code>"hello " + "world"</code>, <code>"hello world"</code>, " (str)"],
    [<strong>str</strong>, <code>+</code>, <strong>bool</strong>, <code>"text" + True</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>bool</strong>, <code>+</code>, <strong>int</strong>, <code>True + 5</code>, <code>6</code>, " (int)"],
    [<strong>bool</strong>, <code>+</code>, <strong>float</strong>, <code>True + 3.5</code>, <code>4.5</code>, " (float)"],
    [<strong>bool</strong>, <code>+</code>, <strong>str</strong>, <code>True + "text"</code>, <span className="text-red-500 font-semibold">TypeError</span>, ""],
    [<strong>bool</strong>, <code>+</code>, <strong>bool</strong>, <code>True + False</code>, <code>1</code>, " (int)"],
  ];

  // Small reusable group-header banner used between the four type groups below.
  // Classes are written out in full (not interpolated) so Tailwind's JIT scanner can detect them.
  const groupHeaderStyles = {
    emerald: "rounded-lg bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 border-l-4 border-emerald-500",
    sky: "rounded-lg bg-sky-100 dark:bg-sky-900/30 px-4 py-2 border-l-4 border-sky-500",
    purple: "rounded-lg bg-purple-100 dark:bg-purple-900/30 px-4 py-2 border-l-4 border-purple-500",
    teal: "rounded-lg bg-teal-100 dark:bg-teal-900/30 px-4 py-2 border-l-4 border-teal-500",
  };
  const groupHeaderTextStyles = {
    emerald: "text-sm font-bold text-emerald-700 dark:text-emerald-300 tracking-wide uppercase",
    sky: "text-sm font-bold text-sky-700 dark:text-sky-300 tracking-wide uppercase",
    purple: "text-sm font-bold text-purple-700 dark:text-purple-300 tracking-wide uppercase",
    teal: "text-sm font-bold text-teal-700 dark:text-teal-300 tracking-wide uppercase",
  };
  const GroupHeader = ({ color, label }) => (
    <div className={groupHeaderStyles[color]}>
      <p className={groupHeaderTextStyles[color]}>{label}</p>
    </div>
  );

  return (
    <section className="scroll-mt-20 space-y-6">
      <div id="type-interactions" className="space-y-4 pt-4 border-t">{/* Header banner */}
        <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-lg" >
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <Shuffle className="w-8 h-8" /> Type Interactions & Operations
          </h1>
          <p className="text-cyan-50 mt-1 text-sm">
            What happens when different data types meet an operator.
          </p>
        </div>

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            In Python, different data types behave differently when you use operators like <code>+</code>, <code>*</code>, etc.
            Let's explore how <strong>int</strong>, <strong>float</strong>, <strong>str</strong>, and <strong>bool</strong>
            interact with each other, systematically, one combination at a time!
          </p>
        </div>

        {/* All 16 combinations, grouped by left-hand type: int, float, str, bool */}
        <div className="space-y-4">

          {/* ===================== GROUP: INT ===================== */}
          <GroupHeader color="emerald" label="int + ___" />

          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <Plus className="w-5 h-5" /> 1. int + int
            </h2>
            <CodeBlock code={`# Adding two integers\na = 10\nb = 5\nresult = a + b\nprint(result)\n# Output: 15 (int)\n\n# Multiplying integers\nresult2 = a * b\nprint(result2)\n# Output: 50 (int)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Integer operations always give <code>int</code> results (except division)</p>
          </div>

          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5" /> 2. int + float
            </h2>
            <CodeBlock code={`# Mixing integer and float\na = 10        # int\nb = 3.5       # float\nresult = a + b\nprint(result)\n# Output: 13.5 (float)\n\nresult2 = a * b\nprint(result2)\n# Output: 35.0 (float)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> When you mix int and float, Python converts the result to <code>float</code></p>
          </div>

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 3. int + str — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nage = 15\nlabel = " years old"\n# result = age + label  # TypeError: unsupported operand type(s)\n\n# Correct way: Convert int to str\nresult = str(age) + label\nprint(result)\n# Output: 15 years old (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> You <strong>cannot</strong> directly add a number and a string. Use <code>str()</code> to convert!</p>
          </div>

          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 4. int + bool
            </h2>
            <CodeBlock code={`# Booleans act as numbers when mixed with int\na = 5\nb = True    # treated as 1\nresult = a + b\nprint(result)\n# Output: 6 (int)\n\nresult2 = a + False   # False treated as 0\nprint(result2)\n# Output: 5 (int)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Python treats <code>True</code> as <code>1</code> and <code>False</code> as <code>0</code>, so the result stays an <code>int</code></p>
          </div>

          {/* ===================== GROUP: FLOAT ===================== */}
          <GroupHeader color="sky" label="float + ___" />

          <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
              <ArrowLeftRight className="w-5 h-5" /> 5. float + int
            </h2>
            <CodeBlock code={`# Mixing float and integer\na = 3.5       # float\nb = 2         # int\nresult = a + b\nprint(result)\n# Output: 5.5 (float)\n\nresult2 = a * b\nprint(result2)\n# Output: 7.0 (float)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Just like int + float, the <code>int</code> is converted to <code>float</code> and the result stays <code>float</code></p>
          </div>

          <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
              <Plus className="w-5 h-5" /> 6. float + float
            </h2>
            <CodeBlock code={`# Float operations\na = 3.14\nb = 2.5\nresult = a + b\nprint(result)\n# Output: 5.64 (float)\n\nresult2 = a * b\nprint(result2)\n# Output: 7.85 (float)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Float operations always give <code>float</code> results</p>
          </div>

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 7. float + str — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nprice = 9.99\nlabel = " dollars"\n# result = price + label  # TypeError\n\n# Correct way: Convert float to str\nresult = str(price) + label\nprint(result)\n# Output: 9.99 dollars (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> Cannot directly add a float and a string. Convert using <code>str()</code></p>
          </div>

          <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 8. float + bool
            </h2>
            <CodeBlock code={`# Boolean with float\na = True     # 1\nb = 3.5\nresult = a + b\nprint(result)\n# Output: 4.5 (float)  # True (1.0) + 3.5 = 4.5\n\nc = False    # 0\nresult2 = c + b\nprint(result2)\n# Output: 3.5 (float)  # False (0.0) + 3.5 = 3.5`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Boolean converts to float (True=1.0, False=0.0) in float operations</p>
          </div>

          {/* ===================== GROUP: STR ===================== */}
          <GroupHeader color="purple" label="str + ___" />

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 9. str + int — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nname = "Age: "\nage = 15\n# result = name + age  # TypeError: can only concatenate str to str\n\n# Correct way: Convert int to str\nresult = name + str(age)\nprint(result)\n# Output: Age: 15 (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> You <strong>cannot</strong> directly add strings and numbers. Use <code>str()</code> to convert!</p>
          </div>

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 10. str + float — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nlabel = "Price: "\nprice = 9.99\n# result = label + price  # TypeError\n\n# Correct way: Convert float to str\nresult = label + str(price)\nprint(result)\n# Output: Price: 9.99 (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> Cannot directly add a string and a float. Convert using <code>str()</code></p>
          </div>

          <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
              <Type className="w-5 h-5" /> 11. str + str
            </h2>
            <CodeBlock code={`# Concatenating strings\nfirst = "Hello"\nsecond = "World"\nresult = first + " " + second\nprint(result)\n# Output: Hello World (str)\n\n# Repeating strings\nword = "Python"\nresult2 = word * 3\nprint(result2)\n# Output: PythonPythonPython (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> String <code>+</code> means concatenation (joining)</p>
          </div>

          <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
              <XIcon className="w-5 h-5" /> 12. str * int — repetition
            </h2>
            <CodeBlock code={`# Multiplying a string by an integer REPEATS it\nresult = "hi" * 2\nprint(result)\n# Output: hihi (str)\n\n# Works the other way too (int * str)\nresult2 = 2 * "hi"\nprint(result2)\n# Output: hihi (str)\n\n# A few more examples\nprint("*" * 5)       # ***** (str)\nprint("-" * 20)      # -------------------- (str)\nprint("Python" * 3)  # PythonPythonPython (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> <code>str * int</code> does not add — it <strong>repeats</strong> the string that many times, with no separator. This is different from <code>str + int</code>, which is an error.</p>
          </div>

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 13. str + bool — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nmessage = "Status: "\nstatus = True\n# result = message + status  # TypeError\n\n# Correct way: Convert bool to str\nresult = message + str(status)\nprint(result)\n# Output: Status: True (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> Cannot directly add a string and a boolean. Convert using <code>str()</code></p>
          </div>

          {/* ===================== GROUP: BOOL ===================== */}
          <GroupHeader color="teal" label="bool + ___" />

          <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 14. bool + int
            </h2>
            <CodeBlock code={`# Boolean values act as numbers!\n# True = 1, False = 0\n\na = True\nb = 5\nresult = a + b\nprint(result)\n# Output: 6 (int)   # True is treated as 1\n\nc = False\nresult2 = c + b\nprint(result2)\n# Output: 5 (int)   # False is treated as 0\n\n# Multiplication\nresult3 = True * 10\nprint(result3)\n# Output: 10 (int)  # True (1) * 10 = 10`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> In math operations, <code>True</code> = 1 and <code>False</code> = 0</p>
          </div>

          <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 15. bool + float
            </h2>
            <CodeBlock code={`# Boolean with float\na = True     # 1\nb = 3.5\nresult = a + b\nprint(result)\n# Output: 4.5 (float)  # True (1.0) + 3.5 = 4.5\n\nc = False    # 0\nresult2 = c + b\nprint(result2)\n# Output: 3.5 (float)  # False (0.0) + 3.5 = 3.5`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Same rule applies with floats — <code>True</code>/<code>False</code> become <code>1.0</code>/<code>0.0</code></p>
          </div>

          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" /> 16. bool + str — ERROR
            </h2>
            <CodeBlock code={`# This will cause an ERROR!\nstatus = True\nmessage = "Status: "\n# result = status + message  # TypeError\n\n# Correct way: Convert bool to str\nresult = str(status) + message\nprint(result)\n# Output: TrueStatus:  (str)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Important:</strong> Cannot directly add a boolean and a string. Convert using <code>str()</code></p>
          </div>

          <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h2 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
              <ToggleLeft className="w-5 h-5" /> 17. bool + bool
            </h2>
            <CodeBlock code={`# Adding boolean values\na = True    # 1\nb = True    # 1\nresult = a + b\nprint(result)\n# Output: 2 (int)\n\nc = True    # 1\nd = False   # 0\nresult2 = c + d\nprint(result2)\n# Output: 1 (int)\n\nresult3 = False + False\nprint(result3)\n# Output: 0 (int)`} />
            <p className="text-sm text-slate-500 dark:text-slate-400"><strong>Result:</strong> Boolean addition converts to integer math (True=1, False=0) — note the result type becomes <code>int</code>, not <code>bool</code></p>
          </div>

        </div>
        {/* Complete Type Interactions Table */}
        <div className="space-y-3 pt-4 border-t">
          <h2 className="text-xl font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <Table2 className="w-5 h-5" /> Complete Type Interactions Table
          </h2>
          <p className="text-slate-600 dark:text-slate-350 text-sm">
            Quick Reference Guide: All Possible Type Combinations
          </p>
          <NoteTable
            headers={interactionHeaders}
            rows={interactionRows.map(([t1, op, t2, ex, val, type]) => [
              t1,
              op,
              t2,
              ex,
              <span>
                {val}
                <span className="text-xs text-slate-400">{type}</span>
              </span>,
            ])}
          />
        </div></div>


      {/* Type Casting */}
      <div className="space-y-4 pt-4 border-t" id="type-casting">
        <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500 p-6 shadow-lg">
          <h2 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <Wand2 className="w-7 h-7" /> Type Casting (Type Conversion)
          </h2>
        </div>

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Type Casting</strong> or <strong>Type Conversion</strong> means changing a value from one data type to another.
            In Python, there are two types of type conversion: <strong>Implicit</strong> and <strong>Explicit</strong>.
          </p>
        </div>

        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <Shuffle className="w-5 h-5" /> A. Implicit Type Conversion (Automatic)
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            <strong>Implicit Type Conversion</strong> happens <strong>automatically</strong> by Python.
            The Python interpreter automatically converts one data type to another without any user involvement.
          </p>
          <NoteTable headers={implicitHeaders} rows={implicitRows} />
          <CodeBlock code={`# Example: int + float\nnum_int = 10\nnum_float = 3.5\nresult = num_int + num_float\nprint(result) # 13.5 (float)\n# Python automatically converted 10 (int) to 10.0 (float)`} />
        </div>

        <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <Wand2 className="w-5 h-5" /> B. Explicit Type Conversion (Manual)
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            <strong>Explicit Type Conversion</strong> is done <strong>manually</strong> by the programmer using
            Python's built-in functions.
          </p>
          <NoteTable headers={explicitHeaders} rows={explicitRows} />
          <CodeBlock code={`# Example: Converting string to integer\nage_str = "25"\nage_int = int(age_str) # Manual conversion\nprint(age_int) # 25 (int)`} />
        </div>

        <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
            <ArrowLeftRight className="w-5 h-5" /> Comparison: Implicit vs Explicit Type Conversion
          </h3>
          <NoteTable headers={comparisonHeaders} rows={comparisonRows} />
        </div>

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <ListChecks className="w-5 h-5" /> Important Rules for Type Conversion:
          </h3>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-350 text-sm leading-relaxed">
            <li><code>int()</code> truncates (removes) the decimal part, it does NOT round.</li>
            <li><code>int("3.14")</code> will cause an error - convert to float first: <code>int(float("3.14"))</code>.</li>
            <li><code>bool(0)</code>, <code>bool(0.0)</code>, and <code>bool("")</code> return <code>False</code>.</li>
            <li>All other numbers and non-empty strings return <code>True</code>.</li>
            <li>String must contain valid numeric characters for <code>int()</code> or <code>float()</code> conversion.</li>
          </ul>
        </div>
      </div>


    </section>
  );
};

export default TypeInteractions;