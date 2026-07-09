import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  FileCode2,
  Tag,
  MapPin,
  Database,
  BookOpen,
  Layers,
  ArrowUpToLine,
  AlignLeft,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Variables = () => {
  const Valid = ({ children }) => (
    <span className="inline-flex items-center gap-1 text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-450 px-2 py-0.5 rounded font-semibold">
      <CheckCircle2 className="w-3 h-3" /> {children}
    </span>
  );
  const Invalid = ({ children }) => (
    <span className="inline-flex items-center gap-1 text-xs bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-450 px-2 py-0.5 rounded font-semibold">
      <XCircle className="w-3 h-3" /> {children}
    </span>
  );

  return (
    <section id="variables" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <FileCode2 className="w-8 h-8" /> Grammar and Types
        </h1>
        <p className="text-blue-50 mt-1 text-sm">
          Basic syntax, comments, declarations, scope, hoisting, data structures, and literals.
        </p>
      </div>

      {/* Basic Syntax and Comments */}
      <div id="grammar-syntax" className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <AlignLeft className="w-5 h-5" /> Basic Syntax and Comments
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript borrows most of its syntax from Java, C, and C++, but has also been influenced
          by Awk, Perl, and Python. JavaScript is <strong>case-sensitive</strong> and uses the
          Unicode character set. Identifiers like <code>Früh</code> are valid.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Statements are separated by semicolons. Semicolons are technically optional due to
          Automatic Semicolon Insertion (ASI), but it is best practice to always include them
          to avoid subtle bugs.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Single-line comment

/*
  Multi-line comment.
  Useful for longer explanations or temporarily disabling code.
*/

let x = 42;          // statement ends with a semicolon
let greeting = "Hi"; // another statement

// JavaScript is case-sensitive
let age = 25;
let Age = 30;
// age and Age are two different variables`}
        />
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A JavaScript program is a sequence of statements. Whitespace (spaces, tabs, newlines)
          between tokens is ignored by the engine and is used only for readability.
        </p>
      </div>

      {/* Declarations */}
      <div id="grammar-declarations" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Database className="w-5 h-5" /> Declarations
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript has three kinds of variable declarations. A variable declared without an initial
          value has the value <code>undefined</code>.
        </p>
        <NoteTable
          headers={["Keyword", "Re-assignable", "Block-scoped", "Hoisted as"]}
          rows={[
            [<code className="text-blue-600 dark:text-blue-400 font-bold">var</code>,   "Yes", "No (function-scoped)", "undefined"],
            [<code className="text-blue-600 dark:text-blue-400 font-bold">let</code>,   "Yes", "Yes", "Temporal Dead Zone (TDZ)"],
            [<code className="text-blue-600 dark:text-blue-400 font-bold">const</code>, "No",  "Yes", "Temporal Dead Zone (TDZ)"],
          ]}
        />

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              let
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Declares a block-scoped local variable. The value may be changed after declaration.
              Use <code>let</code> for any variable whose value needs to change.
            </p>
            <CodeBlock
              language="javascript"
              code={`let score = 0;
score = 10;          // re-assignment is allowed
console.log(score);  // 10

let x;               // declared without a value
console.log(x);      // undefined`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              const
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Declares a block-scoped constant. The binding cannot be re-assigned after creation,
              and it must be initialized at the point of declaration. Note that for objects and arrays,
              the binding is constant but the contents can still be mutated.
            </p>
            <CodeBlock
              language="javascript"
              code={`const PI = 3.14159;
// PI = 3.14;  // TypeError: Assignment to constant variable

const user = { name: "Alex" };
user.name = "Sam";   // allowed: mutating the object, not the binding
console.log(user.name); // "Sam"`}
            />
            <Infobox type="tip" title="Prefer const by default">
              Declare everything with <code>const</code> first. Change to <code>let</code> only
              when you find you need to re-assign. This makes intent explicit and helps avoid
              accidental reassignment bugs.
            </Infobox>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-amber-500 shadow-sm">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              var
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              The original declaration keyword. <code>var</code> is function-scoped rather than
              block-scoped, and it is hoisted to the top of its function with an initial value of
              <code> undefined</code>. These behaviors are a common source of bugs and are the reason
              <code> let</code> and <code>const</code> were introduced in ES6.
            </p>
            <CodeBlock
              language="javascript"
              code={`var count = 1;

if (true) {
  var count = 2; // same variable — var is NOT block-scoped!
}

console.log(count); // 2  (probably not what you wanted)`}
            />
            <Infobox type="warning" title="Avoid var in modern JavaScript">
              Use <code>let</code> or <code>const</code> in all new code. <code>var</code> is kept
              for backwards compatibility but should not appear in modern codebases.
            </Infobox>
          </div>
        </div>
      </div>

      {/* Variable Scope */}
      <div id="grammar-scope" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <MapPin className="w-5 h-5" /> Variable Scope
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Scope</strong> refers to the region of a program where a variable is accessible.
          JavaScript has three levels of scope.
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-purple-100 dark:border-purple-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Global Scope</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Variables declared outside any function or block are in the global scope. They are
              accessible from anywhere in the program. Avoid polluting the global scope; prefer
              keeping variables in the smallest scope possible.
            </p>
            <CodeBlock
              language="javascript"
              code={`const appName = "ViscoAlgoLab"; // global

function greet() {
  console.log(appName); // accessible inside the function
}

greet(); // "ViscoAlgoLab"`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-purple-100 dark:border-purple-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Function Scope</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Variables declared with <code>var</code>, <code>let</code>, or <code>const</code>
              inside a function are local to that function and cannot be accessed from outside.
            </p>
            <CodeBlock
              language="javascript"
              code={`function calculate() {
  let result = 100 * 2; // local to calculate()
  console.log(result);  // 200
}

calculate();
// console.log(result); // ReferenceError: result is not defined`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-purple-100 dark:border-purple-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Block Scope</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Variables declared with <code>let</code> or <code>const</code> inside a block
              (<code>{"{}"}</code>) are only accessible within that block. <code>var</code>
              does not respect block boundaries.
            </p>
            <CodeBlock
              language="javascript"
              code={`if (true) {
  let blockVar = "inside block";
  const blockConst = "also inside";
  console.log(blockVar);   // "inside block"
}

// console.log(blockVar); // ReferenceError

// var ignores block scope:
if (true) {
  var leaksOut = "I escape the block";
}
console.log(leaksOut); // "I escape the block"`}
            />
          </div>
        </div>

        <Infobox type="info" title="Lexical (Static) Scope">
          JavaScript uses <strong>lexical scoping</strong>: a function's scope is determined by
          where it is written in the source code, not where it is called. Inner functions can
          access variables from their outer (enclosing) scope. This is the foundation of closures.
        </Infobox>
      </div>

      {/* Variable Hoisting */}
      <div id="grammar-hoisting" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <ArrowUpToLine className="w-5 h-5" /> Variable Hoisting
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>Hoisting</strong> is JavaScript's default behavior of moving declarations to the
          top of the current scope before code executes. Only the <em>declaration</em> is hoisted,
          not the initialization (the value assignment).
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-amber-500 shadow-sm">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2">var hoisting</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              <code>var</code> declarations are hoisted and initialized to <code>undefined</code>
              before execution. This means you can reference a <code>var</code> variable before its
              declaration line without getting a ReferenceError, but its value will be
              <code> undefined</code>.
            </p>
            <CodeBlock
              language="javascript"
              code={`console.log(x); // undefined (not an error!)
var x = 5;
console.log(x); // 5

// JavaScript executes this as if written:
// var x;          (hoisted to top, value = undefined)
// console.log(x); // undefined
// x = 5;
// console.log(x); // 5`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-rose-500 shadow-sm">
            <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-2">let and const hoisting (Temporal Dead Zone)</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              <code>let</code> and <code>const</code> declarations are also hoisted, but they are
              NOT initialized. Accessing them before their declaration causes a
              <code> ReferenceError</code>. The region from the start of the block to the
              declaration is called the <strong>Temporal Dead Zone (TDZ)</strong>.
            </p>
            <CodeBlock
              language="javascript"
              code={`// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;
console.log(y); // 10

// console.log(z); // ReferenceError
const z = 20;
console.log(z); // 20`}
            />
            <Infobox type="tip" title="TDZ prevents silent bugs">
              The Temporal Dead Zone is intentional. It turns a silent bug (<code>undefined</code>
              access) into a loud one (ReferenceError), making it easier to spot mistakes when
              using <code>let</code> and <code>const</code>.
            </Infobox>
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Function hoisting</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Function declarations are fully hoisted, meaning you can call them before they appear
              in the source code. Function expressions assigned to variables follow the hoisting
              rules of their variable keyword (<code>var</code>, <code>let</code>, or
              <code> const</code>).
            </p>
            <CodeBlock
              language="javascript"
              code={`// Function declaration — hoisted completely
greet(); // "Hello!" (works before the declaration)

function greet() {
  console.log("Hello!");
}

// Function expression — NOT fully hoisted
// sayBye(); // TypeError: sayBye is not a function
const sayBye = function () {
  console.log("Bye!");
};
sayBye(); // "Bye!"`}
            />
          </div>
        </div>
      </div>

      {/* Data Structures and Types */}
      <div id="grammar-data-structures" className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Data Structures and Types
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The latest ECMAScript standard defines eight data types. Seven are primitive (immutable
          values) and one is a complex type (Object).
        </p>
        <NoteTable
          headers={["Type", "Description", "Example"]}
          rows={[
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">Number</code>,    "64-bit floating-point number",                         <code>42, 3.14, -7, Infinity, NaN</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">BigInt</code>,    "Arbitrary-precision integer",                          <code>9007199254740993n</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">String</code>,    "Sequence of UTF-16 characters",                        <code>"hello", 'world', `hi`</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">Boolean</code>,   "Logical true or false",                                <code>true, false</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">undefined</code>, "Variable declared but not assigned",                   <code>let x; // x is undefined</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">null</code>,      "Intentional absence of a value",                       <code>let y = null;</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">Symbol</code>,    "Unique, immutable identifier (ES2015)",                <code>Symbol("id")</code>],
            [<code className="text-cyan-700 dark:text-cyan-400 font-bold">Object</code>,    "Collection of properties; includes arrays, functions", <code>{`{}, [], function(){}`}</code>],
          ]}
        />
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is <strong>dynamically typed</strong>: you do not need to declare the type
          of a variable. The engine infers it from the assigned value, and the type can change
          during execution.
        </p>
        <CodeBlock
          language="javascript"
          code={`let value = 42;          // Number
console.log(typeof value); // "number"

value = "hello";         // now a String
console.log(typeof value); // "string"

value = true;            // now a Boolean
console.log(typeof value); // "boolean"

// Special cases for typeof:
console.log(typeof null);      // "object"  (historical bug, not fixed)
console.log(typeof undefined); // "undefined"
console.log(typeof function(){}); // "function"`}
        />
        <Infobox type="info" title="Type coercion">
          JavaScript will implicitly convert types in certain contexts (type coercion). For example,
          using <code>+</code> with a string and a number converts the number to a string. To avoid
          unexpected behavior, always use strict equality (<code>===</code>) instead of loose
          equality (<code>==</code>).
        </Infobox>
      </div>

      {/* Literals */}
      <div id="grammar-literals" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> Literals
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>literal</strong> is a fixed value written directly in source code. JavaScript
          supports several kinds of literals.
        </p>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Array Literals</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              A list of zero or more expressions enclosed in square brackets. Each element can be
              any expression. Trailing commas are allowed but a leading comma creates an empty slot.
            </p>
            <CodeBlock
              language="javascript"
              code={`const fruits = ["apple", "banana", "cherry"];
const mixed  = [1, "two", true, null];
const nested = [[1, 2], [3, 4]];

console.log(fruits[0]); // "apple"
console.log(mixed[1]);  // "two"`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Boolean Literals</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              The Boolean type has exactly two literal values: <code>true</code> and <code>false</code>.
            </p>
            <CodeBlock
              language="javascript"
              code={`const isActive = true;
const isDeleted = false;`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Numeric Literals</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              JavaScript supports integer and floating-point literals in decimal, hexadecimal,
              octal, and binary notation.
            </p>
            <CodeBlock
              language="javascript"
              code={`// Decimal (base 10) — most common
const decimal = 255;

// Hexadecimal (base 16) — prefix 0x
const hex = 0xFF;       // 255

// Octal (base 8) — prefix 0o
const octal = 0o377;    // 255

// Binary (base 2) — prefix 0b
const binary = 0b11111111; // 255

// Floating-point
const pi = 3.14159;
const sci = 2.5e4;      // 25000 (scientific notation)

// Numeric separators (ES2021) for readability
const million = 1_000_000;`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Object Literals</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              A list of zero or more property/value pairs enclosed in curly braces. Property names
              can be identifiers, strings, or numbers. ES6 added shorthand properties, computed
              property names, and method shorthand.
            </p>
            <CodeBlock
              language="javascript"
              code={`const student = {
  name: "Rahul",           // identifier key
  "year of birth": 2008,   // string key (use quotes when key has spaces)
  grade: 10,
};

// Shorthand property (ES6): when variable name = property name
const name = "Priya";
const age = 15;
const person = { name, age }; // same as { name: name, age: age }

// Computed property name
const key = "score";
const result = { [key]: 95 }; // { score: 95 }

console.log(student.name);   // "Rahul"
console.log(result.score);   // 95`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">String Literals</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              String literals can use single quotes, double quotes, or template literals (backticks).
              Template literals support multi-line strings and embedded expressions.
            </p>
            <CodeBlock
              language="javascript"
              code={`const single = 'Hello, World!';
const double = "Hello, World!";

// Template literal
const name = "Alex";
const greeting = \`Hello, \${name}!\`;   // expression interpolation
console.log(greeting);  // "Hello, Alex!"

// Multi-line string with template literal
const poem = \`
  Roses are red,
  Violets are blue,
  JavaScript is great,
  And so are you.
\`;

// Escape sequences in strings
const tab  = "column1\tcolumn2"; // tab character
const nl   = "line1\nline2";     // newline
const quot = "He said \\"hello\\""; // escaped quote`}
            />
          </div>
        </div>
      </div>

      {/* Naming Rules */}
      <div id="grammar-naming" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Tag className="w-5 h-5" /> Identifier Naming Rules
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An <strong>identifier</strong> is a sequence of characters used to name variables, functions,
          and other entities. Identifiers in JavaScript must follow these rules:
        </p>
        <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-350 leading-relaxed">
          <li>
            Must start with a letter, underscore (<code>_</code>), or dollar sign (<code>$</code>).
            Cannot start with a digit.
            <div className="mt-1 space-x-2">
              <Valid>userName</Valid>
              <Valid>_private</Valid>
              <Valid>$price</Valid>
              <Invalid>2fast</Invalid>
            </div>
          </li>
          <li>
            After the first character, digits are also allowed.
            <div className="mt-1 space-x-2">
              <Valid>user1</Valid>
              <Valid>item_2</Valid>
              <Invalid>user-name</Invalid>
              <Invalid>user name</Invalid>
            </div>
          </li>
          <li>
            JavaScript is case-sensitive. <code>count</code>, <code>Count</code>, and <code>COUNT</code> are three distinct identifiers.
          </li>
          <li>
            Reserved words (<code>let</code>, <code>const</code>, <code>if</code>, <code>class</code>, etc.) cannot be used as identifiers.
          </li>
        </ol>
        <CodeBlock
          language="javascript"
          code={`// camelCase — standard for variables and functions
let firstName = "Emma";
let totalScore = 95;
function calculateAverage() {}

// PascalCase — used for classes and constructor functions
class StudentRecord {}

// UPPER_SNAKE_CASE — used for module-level constants
const MAX_RETRIES = 3;
const API_BASE_URL = "https://api.example.com";`}
        />
      </div>
    </section>
  );
};

export default Variables;
