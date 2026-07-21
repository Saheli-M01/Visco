// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  Link2,
  Type,
  Quote,
  Sparkles,
  FileCode,
  ArrowRightLeft,
} from "lucide-react";

const StringOps = () => {
  const comparisonHeaders = ["Feature", "Concatenation (+)", "Template Literals (`)"];
  const comparisonRows = [
    ["Syntax", <code>"Hello " + name</code>, <code>{"`Hello ${name}`"}</code>],
    ["Readability", "Harder with many variables", "Clean and readable"],
    ["Multiline", "Requires \\n", "Supports natural line breaks"],
    ["Expressions", "Needs separate evaluation", <code>{"${2 + 3}"}</code>],
    ["Performance", "Slightly slower for many joins", "Optimized internally"],
  ];

  const escapeHeaders = ["Sequence", "Output", "Description"];
  const escapeRows = [
    [<code>\\n</code>, "New line", "Moves text to the next line"],
    [<code>\\t</code>, "Tab", "Adds a horizontal tab space"],
    [<code>\\\\</code>, "\\", "Prints a backslash"],
    [<code>\\'</code>, "'", "Prints a single quote inside single-quoted strings"],
    [<code>\\"</code>, '"', "Prints a double quote inside double-quoted strings"],
  ];

  return (
    <section id="string-ops" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Link2 className="w-8 h-8" /> String Concatenation & Template Literals
        </h1>
        <p className="text-rose-50 mt-1 text-sm">
          Combining strings and embedding expressions in text.
        </p>
      </div>

      {/* What is String Concatenation? */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Type className="w-5 h-5" /> What is String Concatenation?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>String concatenation</strong> means joining two or more strings together to form a new string.
          In JavaScript, the most common way is using the <code>+</code> operator.
        </p>
        <CodeBlock
          language="javascript"
          code={`let firstName = "John";
let lastName = "Doe";

// Using the + operator to join strings
let fullName = firstName + " " + lastName;
console.log(fullName);  // Output: "John Doe"

// Joining strings with numbers
let age = 25;
let message = "I am " + age + " years old.";
console.log(message);   // Output: "I am 25 years old."`}
        />
      </div>

      {/* += Append Operator */}
      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <FileCode className="w-5 h-5" /> The += Append Operator
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Use <code>+=</code> to add more text to an existing string without overwriting it.
        </p>
        <CodeBlock
          language="javascript"
          code={`let sentence = "Hello";
sentence += " ";         // Add a space
sentence += "World";     // Add "World"
sentence += "!";         // Add "!"

console.log(sentence);   // Output: "Hello World!"

// Building a message step by step
let report = "Student: Rahul\\n";
report += "Grade: A+\\n";
report += "Score: 95/100";
console.log(report);
// Output:
// Student: Rahul
// Grade: A+
// Score: 95/100`}
        />
      </div>

      {/* concat() Method */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> The concat() Method
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Strings also have a built-in <code>concat()</code> method that joins strings together.
        </p>
        <CodeBlock
          language="javascript"
          code={`let str1 = "Hello";
let str2 = "World";

let result = str1.concat(" ", str2, "!");
console.log(result);  // Output: "Hello World!"

// Chaining concat
let greeting = "Hi".concat(", ", "how", " ", "are", " ", "you?");
console.log(greeting);  // Output: "Hi, how are you?"`}
        />
        <Infobox type="tip" title="When to use concat()">
          In practice, the <code>+</code> operator and template literals are used far more often.
          <code>concat()</code> is mainly seen in older codebases.
        </Infobox>
      </div>

      {/* Template Literals */}
      <div id="template-literals" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Template Literals (The Modern Way)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          <strong>Template literals</strong> use backticks (<code>`</code>) instead of quotes and allow you to
          embed variables and expressions directly inside the string using <code>{"${...}"}</code>.
        </p>
        <CodeBlock
          language="javascript"
          code={`let name = "Alex";
let age = 15;

// Embedding variables
let intro = \`My name is \${name} and I am \${age} years old.\`;
console.log(intro);  // Output: "My name is Alex and I am 15 years old."

// Embedding expressions
let price = 50;
let tax = 0.18;
let total = \`Total: ₹\${price + price * tax}\`;
console.log(total);  // Output: "Total: ₹59"

// Calling functions inside template literals
let greeting = \`Hello, \${name.toUpperCase()}!\`;
console.log(greeting);  // Output: "Hello, ALEX!"`}
        />
      </div>

      {/* Multiline Strings */}
      <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Quote className="w-5 h-5" /> Multiline Strings
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Template literals make multiline strings easy — no need for <code>\n</code>.
        </p>
        <CodeBlock
          language="javascript"
          code={`// OLD way — using \\n and concatenation
let oldWay = "Line 1\\n" +
             "Line 2\\n" +
             "Line 3";

// NEW way — using template literals
let newWay = \`Line 1
Line 2
Line 3\`;

console.log(newWay);
// Output:
// Line 1
// Line 2
// Line 3

// Practical example — HTML template
let card = \`
  <div class="card">
    <h2>\${name}</h2>
    <p>Age: \${age}</p>
  </div>
\`;`}
        />
        <Infobox type="info" title="Why Template Literals are Preferred">
          Template literals are cleaner, more readable, and less error-prone than string concatenation.
          Use them whenever you need to embed variables or write multiline strings.
        </Infobox>
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" /> Concatenation vs Template Literals
        </h3>
        <NoteTable headers={comparisonHeaders} rows={comparisonRows} />
      </div>

      {/* Escape Characters */}
      <div id="escape-chars" className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <FileCode className="w-5 h-5" /> Escape Characters
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Special characters in strings need to be "escaped" with a backslash (<code>\</code>).
        </p>
        <NoteTable headers={escapeHeaders} rows={escapeRows} />
        <CodeBlock
          language="javascript"
          code={`// Using escape characters
console.log("Hello\\nWorld");    // Prints on two lines
console.log("Tab\\there");       // Adds a tab space
console.log("She said \\"Hi\\""); // Output: She said "Hi"
console.log('It\\'s great!');    // Output: It's great!
console.log("Path: C:\\\\Users"); // Output: Path: C:\\Users`}
        />
      </div>
    </section>
  );
};

export default StringOps;
