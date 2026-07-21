// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  Calculator,
  Equal,
  Scale,
  Binary,
  CircleDot,
  HelpCircle,
  Sparkles,
  Layers,
  ArrowRightLeft,
} from "lucide-react";

const Operators = () => {
  // Arithmetic operators table
  const arithHeaders = ["Operator", "Name", "Example", "Result"];
  const arithRows = [
    [<code>+</code>, "Addition", <code>5 + 3</code>, <code>8</code>],
    [<code>-</code>, "Subtraction", <code>10 - 4</code>, <code>6</code>],
    [<code>*</code>, "Multiplication", <code>3 * 7</code>, <code>21</code>],
    [<code>/</code>, "Division", <code>20 / 4</code>, <code>5</code>],
    [<code>%</code>, "Modulus (Remainder)", <code>10 % 3</code>, <code>1</code>],
    [<code>**</code>, "Exponentiation", <code>2 ** 3</code>, <code>8</code>],
    [<code>++</code>, "Increment", <code>x++</code>, "x + 1"],
    [<code>--</code>, "Decrement", <code>x--</code>, "x - 1"],
  ];

  // Assignment operators table
  const assignHeaders = ["Operator", "Example", "Same As"];
  const assignRows = [
    [<code>=</code>, <code>x = 10</code>, "Assign 10 to x"],
    [<code>+=</code>, <code>x += 5</code>, <code>x = x + 5</code>],
    [<code>-=</code>, <code>x -= 3</code>, <code>x = x - 3</code>],
    [<code>*=</code>, <code>x *= 2</code>, <code>x = x * 2</code>],
    [<code>/=</code>, <code>x /= 4</code>, <code>x = x / 4</code>],
    [<code>%=</code>, <code>x %= 3</code>, <code>x = x % 3</code>],
    [<code>**=</code>, <code>x **= 2</code>, <code>x = x ** 2</code>],
  ];

  // Comparison operators table
  const compHeaders = ["Operator", "Name", "Example", "Result"];
  const compRows = [
    [<p>==</p>, "Equal (loose)", <p>5 == "5"</p>, <p>true</p>],
    [<p>===</p>, "Strict Equal", <p>5 === "5"</p>, <p>false</p>],
    [<p>!=</p>, "Not Equal (loose)", <p>5 != "5"</p>, <p>false</p>],
    [<p>!==</p>, "Strict Not Equal", <p>5 !== "5"</p>, <p>true</p>],
    [<p>&gt;</p>, "Greater Than", <p>10 &gt; 5</p>, <p>true</p>],
    [<p>&lt;</p>, "Less Than", <p>3 &lt; 8</p>, <p>true</p>],
    [<p>&gt;=</p>, "Greater or Equal", <p>5 &gt;= 5</p>, <p>true</p>],
    [<p>&lt;=</p>, "Less or Equal", <p>4 &lt;= 3</p>, <p>false</p>],
  ];

  // Logical operators table
  const logicHeaders = ["Operator", "Name", "Description", "Example"];
  const logicRows = [
    [<code>&&</code>, "AND", "Both must be true", <code>true && false → false</code>],
    [<code>||</code>, "OR", "At least one must be true", <code>true || false → true</code>],
    [<code>!</code>, "NOT", "Reverses the value", <code>!true → false</code>],
  ];

  // Precedence table
  const precHeaders = ["Priority", "Operators", "Description"];
  const precRows = [
    ["1 (Highest)", <code>()</code>, "Grouping / Parentheses"],
    ["2", <code>!</code>, "Logical NOT"],
    ["3", <code>** </code>, "Exponentiation"],
    ["4", <code>* / %</code>, "Multiplication, Division, Modulus"],
    ["5", <code>+ -</code>, "Addition, Subtraction"],
    ["6", <code>&lt; &gt; &lt;= &gt;=</code>, "Comparison"],
    ["7", <code>=== !== == !=</code>, "Equality"],
    ["8", <code>&&</code>, "Logical AND"],
    ["9", <code>||</code>, "Logical OR"],
    ["10", <code>??</code>, "Nullish Coalescing"],
    ["11 (Lowest)", <code>= += -= *=</code>, "Assignment"],
  ];

  return (
    <section id="operators" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Calculator className="w-8 h-8" /> Operators in JavaScript
        </h1>
        <p className="text-orange-50 mt-1 text-sm">
          Symbols that perform operations on values and variables.
        </p>
      </div>

      {/* Introduction */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> What are Operators?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Operators</strong> are special symbols that perform operations on values (called <strong>operands</strong>).
          JavaScript has many types of operators for math, comparison, logic, and more.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Operators in action
let sum = 10 + 5;         // + is the operator, 10 and 5 are operands
let isAdult = age >= 18;   // >= compares age with 18
let canDrive = isAdult && hasLicense;  // && checks both conditions`}
        />
      </div>

      {/* Arithmetic Operators */}
      <div id="arithmetic" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Calculator className="w-5 h-5" /> 1. Arithmetic Operators
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Used for mathematical calculations.
        </p>
        <NoteTable headers={arithHeaders} rows={arithRows} />
        <CodeBlock
          language="javascript"
          code={`let a = 10, b = 3;

console.log(a + b);   // 13 (Addition)
console.log(a - b);   // 7  (Subtraction)
console.log(a * b);   // 30 (Multiplication)
console.log(a / b);   // 3.333... (Division)
console.log(a % b);   // 1  (Remainder)
console.log(a ** b);  // 1000 (10 to the power of 3)

// Increment and Decrement
let count = 5;
count++;               // count is now 6
count--;               // count is back to 5
console.log(count);    // 5`}
        />
        <Infobox type="info" title="Pre vs Post Increment">
          <code>++x</code> increments <em>before</em> using the value.
          <code>x++</code> uses the value <em>then</em> increments.
          Same logic applies to <code>--x</code> and <code>x--</code>.
        </Infobox>
      </div>

      {/* Assignment Operators */}
      <div id="assignment" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Equal className="w-5 h-5" /> 2. Assignment Operators
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Used to assign values to variables. Shorthand forms combine assignment with arithmetic.
        </p>
        <NoteTable headers={assignHeaders} rows={assignRows} />
        <CodeBlock
          language="javascript"
          code={`let score = 100;

score += 10;   // score = 100 + 10 → 110
score -= 20;   // score = 110 - 20 → 90
score *= 2;    // score = 90 * 2 → 180
score /= 3;    // score = 180 / 3 → 60
score %= 7;    // score = 60 % 7 → 4

console.log(score);  // 4`}
        />
      </div>

      {/* Comparison Operators */}
      <div id="comparison" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Scale className="w-5 h-5" /> 3. Comparison Operators
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Compare two values and return a boolean (<code>true</code> or <code>false</code>).
        </p>
        <NoteTable headers={compHeaders} rows={compRows} />
        <CodeBlock
          language="javascript"
          code={`// Loose vs Strict equality — VERY IMPORTANT!
console.log(5 == "5");    // true  — only compares VALUE
console.log(5 === "5");   // false — compares VALUE and TYPE

console.log(null == undefined);   // true  (loose)
console.log(null === undefined);  // false (strict)

// Always prefer === over ==
let age = 18;
if (age === 18) {
  console.log("Exactly 18!");
}`}
        />
        <Infobox type="warning" title="Always Use === (Strict Equality)">
          The <code>==</code> operator does type coercion which can lead to unexpected bugs.
          Always use <code>===</code> and <code>!==</code> unless you have a specific reason not to.
        </Infobox>
      </div>

      {/* Logical Operators */}
      <div id="logical" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <Binary className="w-5 h-5" /> 4. Logical Operators
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Used to combine or negate boolean values. Essential for conditional logic.
        </p>
        <NoteTable headers={logicHeaders} rows={logicRows} />
        <CodeBlock
          language="javascript"
          code={`let age = 20;
let hasID = true;

// AND (&&) — both must be true
let canEnter = age >= 18 && hasID;
console.log(canEnter);  // true

// OR (||) — at least one must be true
let isWeekend = false;
let isHoliday = true;
let dayOff = isWeekend || isHoliday;
console.log(dayOff);    // true

// NOT (!) — reverses the value
let isRaining = false;
let goOutside = !isRaining;
console.log(goOutside); // true

// Short-circuit evaluation
let user = null;
let name = user && user.name;  // won't error — stops at null
console.log(name);  // null`}
        />
        <Infobox type="tip" title="Short-Circuit Evaluation">
          <code>&&</code> stops at the first <em>falsy</em> value.
          <code>||</code> stops at the first <em>truthy</em> value.
          This is used often for default values and safe access.
        </Infobox>
      </div>

      {/* Nullish Coalescing */}
      <div id="nullish-coalescing" className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
          <CircleDot className="w-5 h-5" /> 5. Nullish Coalescing Operator (??)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The <code>??</code> operator returns the right-hand value only when the left-hand value
          is <code>null</code> or <code>undefined</code> — not for other falsy values like <code>0</code>,
          <code>""</code>, or <code>false</code>.
        </p>
        <CodeBlock
          language="javascript"
          code={`// ?? vs || — the key difference!

// || treats 0, "", false as "empty" and uses the fallback
let score1 = 0 || 100;     // 100 (0 is falsy!)
let name1 = "" || "Guest";  // "Guest" ("" is falsy!)

// ?? only treats null/undefined as "empty"
let score2 = 0 ?? 100;     // 0 (0 is a valid value!)
let name2 = "" ?? "Guest";  // "" ("" is a valid value!)

// Where ?? shines
let userAge = null;
let displayAge = userAge ?? "Not provided";
console.log(displayAge);  // "Not provided"

let count = 0;
let displayCount = count ?? "No data";
console.log(displayCount);  // 0 (preserves the zero!)

// Practical example — API response
let apiResponse = {
  temperature: 0,        // 0°C is a valid temperature!
  humidity: null,        // No data received
};

let temp = apiResponse.temperature ?? "N/A";  // 0
let humid = apiResponse.humidity ?? "N/A";     // "N/A"`}
        />

        {/* Comparison box: ?? vs || */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-violet-500 shadow-sm space-y-2">
          <h4 className="font-bold text-violet-700 dark:text-violet-400 mb-2">
            ?? vs || — Quick Comparison
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-red-50 dark:bg-red-950/20 rounded-lg p-3 border border-red-200 dark:border-red-900/30">
              <p className="font-semibold text-red-700 dark:text-red-400 text-sm mb-1">|| (OR) — Falsy check</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Falls back for: <code>null</code>, <code>undefined</code>, <code>0</code>, <code>""</code>, <code>false</code>, <code>NaN</code>
              </p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/20 rounded-lg p-3 border border-green-200 dark:border-green-900/30">
              <p className="font-semibold text-green-700 dark:text-green-400 text-sm mb-1">?? (Nullish) — Nullish check</p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Falls back ONLY for: <code>null</code>, <code>undefined</code>
              </p>
            </div>
          </div>
        </div>
        <Infobox type="tip" title="When to use ??">
          Use <code>??</code> when <code>0</code>, <code>""</code>, or <code>false</code> are valid values that you want to keep.
          Use <code>||</code> when you want to replace ALL falsy values.
        </Infobox>
      </div>

      {/* Optional Chaining */}
      <div id="optional-chaining" className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <HelpCircle className="w-5 h-5" /> 6. Optional Chaining (?.)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The <code>?.</code> operator safely accesses deeply nested properties. If any part is
          <code>null</code> or <code>undefined</code>, it returns <code>undefined</code> instead of throwing an error.
        </p>
        <CodeBlock
          language="javascript"
          code={`let user = {
  name: "Alex",
  address: {
    city: "Mumbai"
  }
};

// Without optional chaining — RISKY!
// let zip = user.address.zipCode.value;  // ✗ TypeError!

// With optional chaining — SAFE!
let zip = user.address?.zipCode?.value;
console.log(zip);  // undefined (no error!)

let city = user.address?.city;
console.log(city);  // "Mumbai"

// With nullish coalescing — perfect combo!
let country = user.address?.country ?? "India";
console.log(country);  // "India"

// Optional chaining with methods
let result = user.getName?.();  // undefined (method doesn't exist)

// Optional chaining with arrays
let arr = null;
let first = arr?.[0];  // undefined (no error!)`}
        />
        <Infobox type="info" title="?. + ?? = Power Combo">
          Combine <code>?.</code> for safe access and <code>??</code> for default values.
          Example: <code>user?.settings?.theme ?? "dark"</code>
        </Infobox>
      </div>

      {/* Ternary Operator */}
      <div id="ternary" className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <ArrowRightLeft className="w-5 h-5" /> 7. Ternary Operator (? :)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          A shorthand for <code>if...else</code>. It's the only JavaScript operator that takes three operands.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Syntax: condition ? valueIfTrue : valueIfFalse

let age = 20;
let status = age >= 18 ? "Adult" : "Minor";
console.log(status);  // "Adult"

// Same thing with if...else (longer)
let status2;
if (age >= 18) {
  status2 = "Adult";
} else {
  status2 = "Minor";
}

// Practical examples
let score = 85;
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";
console.log(grade);  // "B"

// In template literals
console.log(\`You are \${age >= 18 ? "eligible" : "not eligible"} to vote.\`);`}
        />
        <Infobox type="warning" title="Don't Over-Nest Ternaries">
          Nested ternaries (like the grade example) can become hard to read.
          For complex conditions, use <code>if...else</code> statements instead.
        </Infobox>
      </div>

      {/* typeof and instanceof */}
      <div id="typeof-instanceof" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> 8. typeof & instanceof
        </h3>
        <CodeBlock
          language="javascript"
          code={`// typeof — checks the data type of a value
console.log(typeof 42);          // "number"
console.log(typeof "hello");     // "string"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof null);        // "object" (known bug!)
console.log(typeof [1, 2, 3]);   // "object"
console.log(typeof {a: 1});      // "object"

// instanceof — checks if an object is an instance of a class
let arr = [1, 2, 3];
console.log(arr instanceof Array);   // true
console.log(arr instanceof Object);  // true

let date = new Date();
console.log(date instanceof Date);   // true`}
        />
      </div>

      {/* Operator Precedence */}
      <div id="precedence" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Operator Precedence (Order of Operations)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          When multiple operators appear in one expression, JavaScript follows a priority order.
          Higher priority operators execute first.
        </p>
        <NoteTable headers={precHeaders} rows={precRows} />
        <CodeBlock
          language="javascript"
          code={`// Precedence in action
let result = 2 + 3 * 4;     // 14 (not 20!) — * runs before +
let fixed = (2 + 3) * 4;    // 20 — parentheses override precedence

let x = 5 > 3 && 10 < 20;   // true — comparisons run before &&
let y = !false || true && false;  // true — ! first, then &&, then ||`}
        />
        <Infobox type="tip" title="Use Parentheses for Clarity">
          When in doubt, use parentheses <code>()</code> to make the order explicit.
          It makes your code more readable even when you know the precedence rules.
        </Infobox>
      </div>
    </section>
  );
};

export default Operators;
