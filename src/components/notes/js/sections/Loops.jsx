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
  Sparkles,
  Zap,
} from "lucide-react";

const Loops = () => {
  const compHeaders = ["Loop", "Best For", "Knows Length?", "Syntax Complexity"];
  const compRows = [
    [<code>for</code>, "When you know the count", "Yes", "Medium"],
    [<code>while</code>, "Unknown iterations, condition-based", "No", "Simple"],
    [<code>do...while</code>, "Must run at least once", "No", "Simple"],
    [<code>for...of</code>, "Arrays, strings, iterables", "No", "Simplest"],
    [<code>for...in</code>, "Object keys", "No", "Simple"],
  ];

  return (
    <section id="loops" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Repeat className="w-8 h-8" /> Loops in JavaScript
        </h1>
        <p className="text-emerald-50 mt-1 text-sm">
          Repeating actions efficiently — the backbone of programming.
        </p>
      </div>

      {/* Introduction */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <RotateCw className="w-5 h-5" /> Why Do We Need Loops?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Loops let you <strong>repeat a block of code</strong> multiple times without writing it over and over.
          Instead of writing <code>console.log("Hello")</code> 100 times, you write it once inside a loop!
        </p>
        <CodeBlock
          language="javascript"
          code={`// Without a loop (tedious!)
console.log("Hello 1");
console.log("Hello 2");
console.log("Hello 3");
// ... imagine doing this 100 times!

// With a loop (clean!)
for (let i = 1; i <= 100; i++) {
  console.log("Hello " + i);
}`}
        />
      </div>

      {/* for Loop */}
      <div id="for-loop" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Hash className="w-5 h-5" /> 1. for Loop
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The most common loop. Use it when you <strong>know how many times</strong> you want to repeat.
        </p>

        {/* Syntax breakdown */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Syntax Breakdown</h4>
          <CodeBlock
            language="javascript"
            code={`for (initialization; condition; update) {
  // code to repeat
}

// initialization → runs ONCE before the loop starts
// condition      → checked BEFORE each iteration
// update         → runs AFTER each iteration`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Count from 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
// Output: 1, 2, 3, 4, 5

// Count backwards
for (let i = 10; i >= 1; i--) {
  console.log(i);
}
// Output: 10, 9, 8, ..., 1

// Skip by 2s (even numbers)
for (let i = 2; i <= 10; i += 2) {
  console.log(i);
}
// Output: 2, 4, 6, 8, 10

// Iterating over an array
let fruits = ["Apple", "Banana", "Cherry"];
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}
// Output: Apple, Banana, Cherry`}
        />
      </div>

      {/* while Loop */}
      <div id="while-loop" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <RotateCw className="w-5 h-5" /> 2. while Loop
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Use <code>while</code> when you <strong>don't know how many times</strong> to repeat —
          it keeps going as long as the condition is <code>true</code>.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Basic while loop
let count = 1;
while (count <= 5) {
  console.log("Count: " + count);
  count++;  // Don't forget to update! (or infinite loop!)
}
// Output: Count: 1, Count: 2, ..., Count: 5

// Practical example — doubling until threshold
let money = 1;
let years = 0;
while (money < 1000) {
  money *= 2;
  years++;
}
console.log(\`Reached ₹\${money} in \${years} years\`);
// Output: "Reached ₹1024 in 10 years"`}
        />
        <Infobox type="warning" title="Beware of Infinite Loops!">
          Always make sure the condition will eventually become <code>false</code>.
          Forgetting to update the loop variable causes an <strong>infinite loop</strong> that freezes your program!
        </Infobox>
      </div>

      {/* do...while Loop */}
      <div id="do-while-loop" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Repeat className="w-5 h-5" /> 3. do...while Loop
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Similar to <code>while</code>, but it <strong>always runs at least once</strong> because
          the condition is checked <em>after</em> the code executes.
        </p>
        <CodeBlock
          language="javascript"
          code={`// do...while always runs at least once
let num = 10;
do {
  console.log("Number: " + num);  // Runs even though num > 5!
  num++;
} while (num <= 5);
// Output: "Number: 10" (runs once, then stops)

// Compare with while — this would NOT run at all!
let num2 = 10;
while (num2 <= 5) {
  console.log("This never prints");
  num2++;
}

// Practical use — menu system
let choice;
do {
  choice = prompt("Enter 1, 2, or 3 (0 to quit):");
  console.log("You chose: " + choice);
} while (choice !== "0");`}
        />
      </div>

      {/* for...of Loop */}
      <div id="for-of-loop" className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <ArrowDownUp className="w-5 h-5" /> 4. for...of Loop
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The cleanest way to loop over <strong>arrays, strings, and other iterables</strong>.
          You get the <em>value</em> directly — no need for index variables.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Looping over an array
let colors = ["Red", "Green", "Blue"];
for (let color of colors) {
  console.log(color);
}
// Output: Red, Green, Blue

// Looping over a string (character by character)
let word = "Hello";
for (let char of word) {
  console.log(char);
}
// Output: H, e, l, l, o

// With array destructuring
let students = [
  ["Rahul", 95],
  ["Priya", 88],
  ["Arjun", 92]
];
for (let [name, score] of students) {
  console.log(\`\${name}: \${score}\`);
}
// Output: Rahul: 95, Priya: 88, Arjun: 92`}
        />
        <Infobox type="tip" title="for...of vs for loop">
          Use <code>for...of</code> when you just need the values.
          Use a regular <code>for</code> loop when you need the index too.
        </Infobox>
      </div>

      {/* for...in Loop */}
      <div id="for-in-loop" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> 5. for...in Loop
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Used to loop over the <strong>keys (property names)</strong> of an object.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Looping over object properties
let student = {
  name: "Rahul",
  age: 15,
  grade: "10th",
  school: "DPS"
};

for (let key in student) {
  console.log(key + ": " + student[key]);
}
// Output:
// name: Rahul
// age: 15
// grade: 10th
// school: DPS`}
        />
        <Infobox type="warning" title="Don't use for...in with Arrays">
          <code>for...in</code> iterates over <em>keys</em> (indices as strings for arrays).
          Use <code>for...of</code> or a regular <code>for</code> loop for arrays instead.
        </Infobox>
      </div>

      {/* break and continue */}
      <div id="break-continue" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> break & continue
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Control the flow inside loops with <code>break</code> (exit the loop) and <code>continue</code> (skip to the next iteration).
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
            <h4 className="font-bold text-red-700 dark:text-red-400 mb-2">break — Stop the Loop</h4>
            <CodeBlock
              language="javascript"
              code={`// Find the first negative number and stop
let numbers = [3, 7, -2, 9, 1];
for (let num of numbers) {
  if (num < 0) {
    console.log("Found negative: " + num);
    break;  // Exit the loop immediately
  }
  console.log("Checked: " + num);
}
// Output: Checked: 3, Checked: 7, Found negative: -2`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-amber-500 shadow-sm">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">continue — Skip This Iteration</h4>
            <CodeBlock
              language="javascript"
              code={`// Print only odd numbers
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    continue;  // Skip even numbers
  }
  console.log(i);
}
// Output: 1, 3, 5, 7, 9`}
            />
          </div>
        </div>
      </div>

      {/* Nested Loops */}
      <div id="nested-loops" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Nested Loops
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          A loop inside another loop. The inner loop runs <strong>completely</strong> for each iteration of the outer loop.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Multiplication table (1 to 3)
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(\`\${i} × \${j} = \${i * j}\`);
  }
  console.log("---");
}
// Output:
// 1 × 1 = 1, 1 × 2 = 2, 1 × 3 = 3, ---
// 2 × 1 = 2, 2 × 2 = 4, 2 × 3 = 6, ---
// 3 × 1 = 3, 3 × 2 = 6, 3 × 3 = 9, ---

// Star pattern
let pattern = "";
for (let i = 1; i <= 5; i++) {
  for (let j = 1; j <= i; j++) {
    pattern += "⭐";
  }
  pattern += "\\n";
}
console.log(pattern);
// ⭐
// ⭐⭐
// ⭐⭐⭐
// ⭐⭐⭐⭐
// ⭐⭐⭐⭐⭐`}
        />
      </div>

      {/* Comparison Table */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" /> Loop Comparison
        </h3>
        <NoteTable headers={compHeaders} rows={compRows} />
      </div>

      {/* Common Patterns */}
      <div id="loop-patterns" className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Common Loop Patterns
        </h3>
        <CodeBlock
          language="javascript"
          code={`// 1. Sum of numbers
let numbers = [10, 20, 30, 40, 50];
let total = 0;
for (let num of numbers) {
  total += num;
}
console.log("Sum:", total);  // Sum: 150

// 2. Finding the maximum value
let scores = [72, 95, 88, 63, 91];
let max = scores[0];
for (let score of scores) {
  if (score > max) {
    max = score;
  }
}
console.log("Highest:", max);  // Highest: 95

// 3. Filtering values
let ages = [12, 25, 8, 30, 16, 42];
let adults = [];
for (let age of ages) {
  if (age >= 18) {
    adults.push(age);
  }
}
console.log("Adults:", adults);  // Adults: [25, 30, 42]

// 4. Searching for a value
let names = ["Rahul", "Priya", "Arjun", "Sneha"];
let searchFor = "Arjun";
let found = false;
for (let name of names) {
  if (name === searchFor) {
    found = true;
    break;
  }
}
console.log(found ? "Found!" : "Not found");  // Found!`}
        />
      </div>
    </section>
  );
};

export default Loops;
