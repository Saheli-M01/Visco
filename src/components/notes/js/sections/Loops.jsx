import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  Repeat,
  RotateCw,
  ArrowDownUp,
  Hash,
  Layers,
  ArrowRightLeft,
  Zap,
  StopCircle,
  SkipForward,
} from "lucide-react";

const Loops = () => {
  const compHeaders = ["Loop", "Best suited for", "Checks condition", "Minimum runs"];
  const compRows = [
    [<code>for</code>,        "Known iteration count",                "Before each iteration", "0"],
    [<code>while</code>,      "Unknown count, condition-driven",       "Before each iteration", "0"],
    [<code>do...while</code>, "Must run at least once",               "After each iteration",  "1"],
    [<code>for...of</code>,   "Values in arrays, strings, iterables", "N/A (iterates items)",  "0"],
    [<code>for...in</code>,   "Keys (property names) of an object",   "N/A (iterates keys)",   "0"],
  ];

  return (
    <section id="loops" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Repeat className="w-8 h-8" /> Loops and Iteration
        </h1>
        <p className="text-emerald-50 mt-1 text-sm">
          for, while, do...while, continue, break, for...in, and for...of.
        </p>
      </div>

      {/* Introduction */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <RotateCw className="w-5 h-5" /> Overview
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Loops offer a quick and easy way to do something repeatedly. There are many different
          kinds of loops, but they all essentially do the same thing: repeat an action some number
          of times. The various loop mechanisms offer different ways to determine the start and
          end points of the loop.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Without a loop
console.log("Step 1");
console.log("Step 2");
console.log("Step 3");

// With a loop
for (let step = 1; step <= 3; step++) {
  console.log("Step " + step);
}`}
        />
      </div>

      {/* for loop */}
      <div id="for-loop" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Hash className="w-5 h-5" /> for Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <code>for</code> loop repeats until a specified condition evaluates to
          <code> false</code>. It is most useful when you know exactly how many times you want
          to repeat an action.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`for ([initialization]; [condition]; [afterthought]) {
  statement
}

// initialization  -- runs once before the loop starts
// condition       -- evaluated before each iteration; loop stops when false
// afterthought    -- runs after each iteration`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Count from 0 to 4
for (let i = 0; i < 5; i++) {
  console.log(i);
}
// 0, 1, 2, 3, 4

// Count down
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
// 10, 9, 8, ..., 1

// Step by 2
for (let i = 0; i <= 10; i += 2) {
  console.log(i);
}
// 0, 2, 4, 6, 8, 10

// Iterate an array by index
const fruits = ["apple", "banana", "cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]);
}
// 0 "apple", 1 "banana", 2 "cherry"`}
        />
        <Infobox type="tip" title="All parts of a for loop are optional">
          You can omit initialization, condition, or afterthought. Omitting all three
          (<code>for (;;)</code>) creates an infinite loop. Always include a condition
          or a <code>break</code> statement to terminate the loop.
        </Infobox>
      </div>

      {/* while loop */}
      <div id="while-loop" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <RotateCw className="w-5 h-5" /> while Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <code>while</code> statement executes its body as long as a specified condition
          evaluates to <code>true</code>. The condition is tested before each execution of the body.
          If the condition is <code>false</code> on the first check, the body never runs.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
          <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`while (condition) {
  statement
}`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Count while condition is true
let n = 0;
while (n < 3) {
  n++;
  console.log("n = " + n);
}
// n = 1, n = 2, n = 3

// Condition false from the start — loop body never runs
let x = 10;
while (x < 5) {
  console.log("This never prints");
}

// Practical: compound interest until threshold
let balance = 100;
const rate   = 0.1; // 10% interest per year
let years    = 0;

while (balance < 200) {
  balance += balance * rate;
  years++;
}
console.log("Doubled in", years, "years"); // 8 years`}
        />
        <Infobox type="warning" title="Infinite loops">
          If the condition never becomes <code>false</code>, the loop runs forever and freezes the
          program. Always ensure the loop variable is updated inside the body, or that a
          <code> break</code> statement can be reached.
        </Infobox>
      </div>

      {/* do...while loop */}
      <div id="do-while-loop" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Repeat className="w-5 h-5" /> do...while Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>do...while</code> statement repeats until a specified condition evaluates to
          <code> false</code>. The condition is evaluated <em>after</em> executing the body, so
          the body always executes at least once.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
          <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`do {
  statement
} while (condition);`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`let i = 0;
do {
  i++;
  console.log("i = " + i);
} while (i < 3);
// i = 1, i = 2, i = 3

// Demonstrates that the body runs even when the condition is false at entry
let x = 10;
do {
  console.log("Runs once with x =", x); // prints despite x > 5
  x++;
} while (x < 5);

// Typical use: retry or prompt-until-valid pattern
let attempts = 0;
let success  = false;
do {
  attempts++;
  // simulate an operation that might fail
  success = attempts >= 3;
  console.log("Attempt", attempts, success ? "succeeded" : "failed");
} while (!success);
// Attempt 1 failed, Attempt 2 failed, Attempt 3 succeeded`}
        />
      </div>

      {/* continue */}
      <div id="continue-statement" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <SkipForward className="w-5 h-5" /> continue Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>continue</code> statement terminates execution of the current loop iteration
          and continues with the next iteration. It does not exit the loop entirely; rather, it
          skips the remaining statements in the current pass and moves to the update expression
          (or condition check for <code>while</code>/<code>do...while</code>).
        </p>
        <CodeBlock
          language="javascript"
          code={`// Skip even numbers — print only odd numbers 1-10
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue; // skip the rest of this iteration
  }
  console.log(i);
}
// 1, 3, 5, 7, 9

// continue in a while loop
let n = 0;
while (n < 10) {
  n++;
  if (n % 3 === 0) continue; // skip multiples of 3
  console.log(n);
}
// 1, 2, 4, 5, 7, 8, 10

// continue with a label (outer loop)
outer: for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    if (j === 1) continue outer; // skip to next iteration of outer loop
    console.log(i, j);
  }
}
// 0 0, 1 0, 2 0`}
        />
      </div>

      {/* break */}
      <div id="break-statement" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <StopCircle className="w-5 h-5" /> break Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>break</code> statement terminates the current loop, <code>switch</code>, or
          labeled statement and transfers control to the statement following the terminated
          statement. Used without a label, it exits the innermost enclosing loop or switch.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Stop the loop as soon as a negative number is found
const numbers = [3, 7, 2, -5, 9, 1];
let firstNegative;

for (const num of numbers) {
  if (num < 0) {
    firstNegative = num;
    break; // exit the loop immediately
  }
}
console.log("First negative:", firstNegative); // -5

// break in a while loop
let i = 0;
while (true) { // infinite loop — but break exits it
  if (i >= 5) break;
  i++;
}
console.log("Stopped at i =", i); // 5

// break with a label — exits the outer loop
search: for (let row = 0; row < 3; row++) {
  for (let col = 0; col < 3; col++) {
    if (row === 1 && col === 1) {
      console.log("Found at", row, col);
      break search; // exits both loops
    }
  }
}
console.log("Loop ended");`}
        />
        <Infobox type="info" title="Labels">
          A label is an identifier followed by a colon placed before a statement
          (<code>outer: for (...)</code>). Labels are only useful with <code>break</code> and
          <code> continue</code> in nested loops. They do not create a new scope and are rarely
          needed in practice.
        </Infobox>
      </div>

      {/* for...in loop */}
      <div id="for-in-loop" className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> for...in Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>for...in</code> statement iterates over all <strong>enumerable string
          properties</strong> of an object, including inherited enumerable properties. On each
          iteration the variable holds the property name (key) as a string.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-cyan-500 shadow-sm">
          <h4 className="font-bold text-cyan-700 dark:text-cyan-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`for (variable in object) {
  statement
}`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`const car = {
  make:  "Toyota",
  model: "Camry",
  year:  2023,
};

for (const key in car) {
  console.log(key + ": " + car[key]);
}
// make: Toyota
// model: Camry
// year: 2023

// Checking own properties (excludes inherited)
function Vehicle(type) {
  this.type = type;
}
Vehicle.prototype.wheels = 4;

const v = new Vehicle("car");
for (const key in v) {
  if (Object.hasOwn(v, key)) {
    console.log("Own:", key); // Own: type
  } else {
    console.log("Inherited:", key); // Inherited: wheels
  }
}`}
        />
        <Infobox type="warning" title="Do not use for...in with arrays">
          <code>for...in</code> iterates over <em>all</em> enumerable properties, including
          any non-index properties that may have been added to <code>Array.prototype</code>.
          For arrays, use a regular <code>for</code> loop, <code>for...of</code>, or array
          methods such as <code>forEach</code>.
        </Infobox>
      </div>

      {/* for...of loop */}
      <div id="for-of-loop" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <ArrowDownUp className="w-5 h-5" /> for...of Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>for...of</code> statement creates a loop iterating over <strong>iterable
          objects</strong>, including <code>Array</code>, <code>String</code>, <code>Map</code>,
          <code> Set</code>, <code>NodeList</code>, and any other object that implements the
          iterable protocol. On each iteration the variable holds the current element value,
          not the key.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
          <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`for (variable of iterable) {
  statement
}`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Array
const colors = ["red", "green", "blue"];
for (const color of colors) {
  console.log(color);
}
// red, green, blue

// String (iterates over Unicode characters)
const word = "hello";
for (const char of word) {
  console.log(char);
}
// h, e, l, l, o

// Map
const scores = new Map([["Alice", 95], ["Bob", 88]]);
for (const [name, score] of scores) {
  console.log(name + ": " + score);
}
// Alice: 95, Bob: 88

// Set (no duplicates)
const unique = new Set([1, 2, 2, 3, 3]);
for (const val of unique) {
  console.log(val);
}
// 1, 2, 3

// Array destructuring in loop body
const coords = [[1, 2], [3, 4], [5, 6]];
for (const [x, y] of coords) {
  console.log(\`x=\${x}, y=\${y}\`);
}`}
        />
        <Infobox type="tip" title="for...of vs for...in">
          Use <code>for...of</code> to get <em>values</em> from arrays and other iterables.
          Use <code>for...in</code> to get <em>keys</em> from plain objects. If you need both
          the index and the value from an array, use <code>Array.entries()</code> with
          <code> for...of</code>: <code>for (const [i, v] of arr.entries())</code>.
        </Infobox>
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" /> Loop Comparison
        </h2>
        <NoteTable headers={compHeaders} rows={compRows} />
      </div>

      {/* Common Loop Patterns */}
      <div id="loop-patterns" className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Common Iteration Patterns
        </h2>
        <CodeBlock
          language="javascript"
          code={`// 1. Accumulate a sum
const values = [10, 20, 30, 40, 50];
let total = 0;
for (const v of values) {
  total += v;
}
console.log("Sum:", total); // 150

// 2. Find the maximum value
const scores = [72, 95, 88, 63, 91];
let max = scores[0];
for (const s of scores) {
  if (s > max) max = s;
}
console.log("Max:", max); // 95

// 3. Filter values into a new array
const ages = [12, 25, 8, 30, 16, 42];
const adults = [];
for (const age of ages) {
  if (age >= 18) adults.push(age);
}
console.log("Adults:", adults); // [25, 30, 42]

// 4. Search with early exit
const names = ["Alice", "Bob", "Carol", "David"];
let found = false;
for (const name of names) {
  if (name === "Carol") {
    found = true;
    break;
  }
}
console.log("Found:", found); // true

// 5. Nested loops — build a multiplication table
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    process.stdout.write(i * j + "\t");
  }
  console.log();
}
// 1  2  3
// 2  4  6
// 3  6  9`}
        />
      </div>
    </section>
  );
};

export default Loops;
