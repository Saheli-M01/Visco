import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import { Link2, Repeat, Table2, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

const StringConcatenation = () => {
  const summaryHeaders = ["Operation", "Example", "Result"];
  const summaryRows = [
    ["Join two strings", <code>"Hello" + "World"</code>, <code>"HelloWorld"</code>],
    ["Join with space", <code>"Hello" + " " + "World"</code>, <code>"Hello World"</code>],
    ["Repeat string", <code>"Hi" * 3</code>, <code>"HiHiHi"</code>],
    ["Mix strings and variables", <code>"Age: " + str(15)</code>, <code>"Age: 15"</code>],
  ];

  return (
    <section id="string-concatenation" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Link2 className="w-8 h-8" /> 7. String Concatenation
        </h1>
        <p className="text-fuchsia-50 mt-1 text-sm">
          Joining strings together to build something new.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>String Concatenation</strong> means joining two or more strings together to
          form a single string. In Python, we use the <code>+</code> operator to concatenate
          (combine) strings!
        </p>
      </div>

      {/* Basic concatenation */}
      <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Basic String Concatenation
        </h2>
        <CodeBlock
          code={`# Example 1: Joining two strings\nfirst_name = "Rohan"\nlast_name = "Sharma"\nfull_name = first_name + last_name\nprint(full_name)\n# Output: RohanSharma (notice: no space!)`}
        />
      </div>

      {/* Adding spaces */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Adding Spaces Between Strings
        </h2>
        <CodeBlock
          code={`# Example 2: Adding space between strings\nfirst_name = "Rohan"\nlast_name = "Sharma"\nfull_name = first_name + " " + last_name\nprint(full_name)\n# Output: Rohan Sharma (with space!)`}
        />
      </div>

      {/* Multiple strings */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Concatenating Multiple Strings
        </h2>
        <CodeBlock
          code={`# Example 3: Joining multiple strings\ngreeting = "Hello"\nname = "Priya"\nmessage = greeting + ", " + name + "! Welcome to Python."\nprint(message)\n# Output: Hello, Priya! Welcome to Python.`}
        />
      </div>

      {/* Mixing strings and variables */}
      <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> Mixing Strings and Variables
        </h2>
        <CodeBlock
          code={`# Example 4: Creating sentences with variables\ncity = "Mumbai"\nsentence = "I live in " + city + "."\nprint(sentence)\n# Output: I live in Mumbai.`}
        />
      </div>

      {/* Repeating strings */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Repeat className="w-5 h-5" /> Repeating Strings with the * Operator
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          You can also use the <code>*</code> operator to repeat a string multiple times!
        </p>
        <CodeBlock
          code={`# Example 5: Repeating strings\nstar = "*"\nstars = star * 5\nprint(stars)\n# Output: *****\n\nline = "-" * 20\nprint(line)\n# Output: --------------------`}
        />
      </div>

      {/* Summary table */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <Table2 className="w-5 h-5" /> String Concatenation Summary Table
        </h2>
        <NoteTable headers={summaryHeaders} rows={summaryRows} />
      </div>

      {/* Converting numbers to strings warning */}
      <Infobox type="warning" title="Important: Converting Numbers to Strings">
        <span className="inline-flex items-center gap-1.5">
          <ShieldAlert className="w-4 h-4 shrink-0" />
          You cannot directly concatenate strings with numbers. You must first convert the
          number to a string using <code>str()</code>!
        </span>
      </Infobox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <XCircle className="w-5 h-5" /> Wrong (Will cause error)
          </h3>
          <CodeBlock code={`age = 12\ntext = "I am " + age\n# TypeError!`} />
        </div>
        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Correct Way
          </h3>
          <CodeBlock code={`age = 12\ntext = "I am " + str(age)\nprint(text)\n# Output: I am 12`} />
        </div>
      </div>

      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Putting It Together
        </h3>
        <CodeBlock
          code={`# Example: Converting numbers to strings\nage = 15\nscore = 95\n\n# Wrong way (will cause error)\n# message = "Age: " + age  # TypeError\n\n# Correct way\nmessage = "Age: " + str(age) + ", Score: " + str(score)\nprint(message)\n# Output: Age: 15, Score: 95`}
        />
      </div>
    </section>
  );
};

export default StringConcatenation;