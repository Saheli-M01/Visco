import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  ShieldAlert,
  Bug,
  AlertTriangle,
  Shield,
  Zap,
  Layers,
  Sparkles,
  Target,
} from "lucide-react";

const ErrorHandling = () => {
  const errorTypeHeaders = ["Error Type", "When It Happens", "Example"];
  const errorTypeRows = [
    [
      <code className="text-red-600 dark:text-red-400 font-bold">SyntaxError</code>,
      "Code has invalid syntax",
      <code>let x = ;</code>,
    ],
    [
      <code className="text-red-600 dark:text-red-400 font-bold">ReferenceError</code>,
      "Using a variable that doesn't exist",
      <code>console.log(abc)</code>,
    ],
    [
      <code className="text-red-600 dark:text-red-400 font-bold">TypeError</code>,
      "Wrong data type for an operation",
      <code>null.toString()</code>,
    ],
    [
      <code className="text-red-600 dark:text-red-400 font-bold">RangeError</code>,
      "Number is outside the allowed range",
      <code>new Array(-1)</code>,
    ],
    [
      <code className="text-red-600 dark:text-red-400 font-bold">URIError</code>,
      "Invalid URI encoding/decoding",
      <code>decodeURI("%")</code>,
    ],
  ];

  return (
    <section id="error-handling" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" /> Error Handling in JavaScript
        </h1>
        <p className="text-red-50 mt-1 text-sm">
          Gracefully handling errors to prevent your programs from crashing.
        </p>
      </div>

      {/* Why Error Handling? */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Bug className="w-5 h-5" /> Why Handle Errors?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Errors are <strong>inevitable</strong> in programming — network failures, invalid user input,
          missing data, and more. Without error handling, your program <strong>crashes</strong> and
          stops working entirely. Good error handling lets your program <strong>recover gracefully</strong>.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Without error handling — CRASH!
let data = JSON.parse("invalid json");  // ✗ SyntaxError — program stops!
console.log("This line never runs...");

// With error handling — SAFE!
try {
  let data = JSON.parse("invalid json");
} catch (error) {
  console.log("Oops! Invalid data format.");
}
console.log("Program continues normally! ✓");`}
        />
      </div>

      {/* Common Error Types */}
      <div id="error-types" className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" /> Common Error Types
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          JavaScript has several built-in error types. Understanding them helps you debug faster.
        </p>
        <NoteTable headers={errorTypeHeaders} rows={errorTypeRows} />
        <CodeBlock
          language="javascript"
          code={`// ReferenceError — variable doesn't exist
// console.log(myVar);  // ✗ ReferenceError: myVar is not defined

// TypeError — wrong type for operation
// let num = 42;
// num.toUpperCase();   // ✗ TypeError: num.toUpperCase is not a function

// RangeError — value out of range
// let arr = new Array(-1);  // ✗ RangeError: Invalid array length

// SyntaxError — caught at parse time (can't be caught by try/catch)
// eval("let x = ;");  // ✗ SyntaxError: Unexpected token ;`}
        />
      </div>

      {/* try...catch */}
      <div id="try-catch" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Shield className="w-5 h-5" /> try...catch Block
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Wrap risky code in a <code>try</code> block. If an error happens, the <code>catch</code> block
          handles it instead of crashing the program.
        </p>

        {/* Syntax breakdown */}
        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`try {
  // Code that might throw an error
  // If an error occurs here...
} catch (error) {
  // ...this block runs instead of crashing
  // 'error' contains info about what went wrong
}`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Example 1: Parsing JSON safely
try {
  let user = JSON.parse('{"name": "Alex", "age": 15}');
  console.log(user.name);  // "Alex" ✓
} catch (error) {
  console.log("Failed to parse JSON");
}

// Example 2: Handling bad JSON
try {
  let data = JSON.parse("not valid json!");
  console.log(data);  // This line is SKIPPED
} catch (error) {
  console.log("Error:", error.message);
  // Output: "Error: Unexpected token o in JSON at position 1"
}

// Example 3: Accessing nested properties safely
try {
  let user = null;
  console.log(user.name);  // ✗ TypeError!
} catch (error) {
  console.log("User data is not available");
}
console.log("Program continues...");  // ✓ Still runs!`}
        />
      </div>

      {/* finally Block */}
      <div id="finally" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> The finally Block
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The <code>finally</code> block <strong>always runs</strong> — whether an error occurred or not.
          It's perfect for cleanup tasks.
        </p>
        <CodeBlock
          language="javascript"
          code={`// finally ALWAYS runs
try {
  console.log("Step 1: Trying...");
  let result = 10 / 0;  // Infinity (not an error in JS)
  console.log("Step 2: Result is", result);
} catch (error) {
  console.log("An error occurred:", error.message);
} finally {
  console.log("Step 3: Cleanup — this ALWAYS runs!");
}
// Output:
// Step 1: Trying...
// Step 2: Result is Infinity
// Step 3: Cleanup — this ALWAYS runs!

// Practical example — loading state
let isLoading = true;
try {
  let data = JSON.parse('{"status": "ok"}');
  console.log("Data loaded:", data.status);
} catch (error) {
  console.log("Failed to load data");
} finally {
  isLoading = false;  // Always stop the loading spinner!
  console.log("Loading:", isLoading);  // Loading: false
}`}
        />
        <Infobox type="info" title="When to use finally">
          Use <code>finally</code> for cleanup operations that must happen regardless of success
          or failure — closing connections, hiding loading spinners, releasing resources, etc.
        </Infobox>
      </div>

      {/* throw Statement */}
      <div id="throw" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Target className="w-5 h-5" /> throw — Creating Custom Errors
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Use <code>throw</code> to create your <strong>own errors</strong> when something
          goes wrong in your code logic — even if JavaScript wouldn't normally throw an error.
        </p>
        <CodeBlock
          language="javascript"
          code={`// Throwing a simple error
function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero!");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // ✗ Throws our custom error!
} catch (error) {
  console.log("Error:", error.message);
  // Output: "Error: Cannot divide by zero!"
}

// Input validation with custom errors
function setAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("Age must be a number!");
  }
  if (age < 0 || age > 150) {
    throw new RangeError("Age must be between 0 and 150!");
  }
  return age;
}

try {
  setAge("twenty");  // ✗ TypeError
} catch (error) {
  console.log(error.name + ": " + error.message);
  // Output: "TypeError: Age must be a number!"
}

try {
  setAge(-5);  // ✗ RangeError
} catch (error) {
  console.log(error.name + ": " + error.message);
  // Output: "RangeError: Age must be between 0 and 150!"
}`}
        />
      </div>

      {/* Error Object Properties */}
      <div id="error-object" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Error Object Properties
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Every error in JavaScript is an object with useful properties for debugging.
        </p>
        <CodeBlock
          language="javascript"
          code={`try {
  let x = undefined;
  x.toString();
} catch (error) {
  // The three most important properties:
  console.log(error.name);     // "TypeError"
  console.log(error.message);  // "Cannot read properties of undefined"
  console.log(error.stack);    // Full stack trace (shows where error happened)
}

// You can check the type of error
try {
  eval("let a = ;");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log("Syntax problem!");
  } else if (error instanceof TypeError) {
    console.log("Type problem!");
  } else {
    console.log("Unknown error:", error.message);
  }
}`}
        />
      </div>

      {/* Practical Examples */}
      <div id="practical-errors" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Practical Examples
        </h3>

        <div className="space-y-4">
          {/* Input Validation */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">1. Form Input Validation</h4>
            <CodeBlock
              language="javascript"
              code={`function validateEmail(email) {
  if (!email) {
    throw new Error("Email is required!");
  }
  if (!email.includes("@")) {
    throw new Error("Invalid email format!");
  }
  return true;
}

function registerUser(name, email) {
  try {
    if (!name || name.trim().length === 0) {
      throw new Error("Name cannot be empty!");
    }
    validateEmail(email);
    console.log(\`✓ User "\${name}" registered with \${email}\`);
  } catch (error) {
    console.log("✗ Registration failed:", error.message);
  }
}

registerUser("Alex", "alex@email.com");
// ✓ User "Alex" registered with alex@email.com

registerUser("", "test@email.com");
// ✗ Registration failed: Name cannot be empty!

registerUser("Alex", "invalid-email");
// ✗ Registration failed: Invalid email format!`}
            />
          </div>

          {/* API-style Error Handling */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-teal-500 shadow-sm">
            <h4 className="font-bold text-teal-700 dark:text-teal-400 mb-2">2. Safe Data Processing</h4>
            <CodeBlock
              language="javascript"
              code={`// Processing data that might be in different formats
function processData(input) {
  try {
    // Step 1: Parse the data
    let data;
    if (typeof input === "string") {
      data = JSON.parse(input);
    } else {
      data = input;
    }

    // Step 2: Validate required fields
    if (!data.name) throw new Error("Missing 'name' field");
    if (!data.age) throw new Error("Missing 'age' field");

    // Step 3: Process
    return \`\${data.name} is \${data.age} years old\`;
  } catch (error) {
    return "Error: " + error.message;
  }
}

console.log(processData('{"name":"Rahul","age":15}'));
// Output: "Rahul is 15 years old"

console.log(processData('bad data'));
// Output: "Error: Unexpected token b in JSON..."

console.log(processData({ name: "Priya" }));
// Output: "Error: Missing 'age' field"`}
            />
          </div>
        </div>

        <Infobox type="tip" title="Error Handling Best Practices">
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Only wrap code in <code>try...catch</code> when you expect errors might occur</li>
            <li>Be specific about which errors you catch — don't silently swallow all errors</li>
            <li>Always log or report errors so you can debug later</li>
            <li>Use <code>finally</code> for cleanup code that must always run</li>
            <li>Create custom errors with descriptive messages for better debugging</li>
          </ul>
        </Infobox>
      </div>
    </section>
  );
};

export default ErrorHandling;
