import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  ShieldAlert,
  GitBranch,
  ArrowLeftRight,
  Shield,
  Zap,
  Layers,
  Target,
} from "lucide-react";

const ErrorHandling = () => {
  const errorTypeHeaders = ["Error Type", "When It Happens", "Example Cause"];
  const errorTypeRows = [
    [<code className="text-red-600 dark:text-red-400 font-bold">SyntaxError</code>,    "Code cannot be parsed",                    <code>let x = ;</code>],
    [<code className="text-red-600 dark:text-red-400 font-bold">ReferenceError</code>, "Accessing a variable that does not exist", <code>console.log(abc)</code>],
    [<code className="text-red-600 dark:text-red-400 font-bold">TypeError</code>,      "Operation on the wrong type",              <code>null.toString()</code>],
    [<code className="text-red-600 dark:text-red-400 font-bold">RangeError</code>,     "Value outside the allowed range",          <code>new Array(-1)</code>],
    [<code className="text-red-600 dark:text-red-400 font-bold">URIError</code>,       "Malformed URI encoding",                   <code>decodeURI("%")</code>],
    [<code className="text-red-600 dark:text-red-400 font-bold">EvalError</code>,      "Error from the eval() function",           "Rarely thrown in modern engines"],
  ];

  return (
    <section id="error-handling" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <ShieldAlert className="w-8 h-8" /> Control Flow and Error Handling
        </h1>
        <p className="text-red-50 mt-1 text-sm">
          Conditional statements, branching, exception handling, and the Error object.
        </p>
      </div>

      {/* if...else */}
      <div id="control-if-else" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <GitBranch className="w-5 h-5" /> if...else Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>if</code> statement executes a block of statements if a specified condition
          evaluates to <code>true</code>. If the condition is <code>false</code>, the optional
          <code> else</code> block executes instead.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
          <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`if (condition) {
  // executes when condition is true
} else if (anotherCondition) {
  // executes when condition is false but anotherCondition is true
} else {
  // executes when all conditions are false
}`}
          />
        </div>

        <CodeBlock
          language="javascript"
          code={`// Basic if...else
const score = 72;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 75) {
  console.log("Grade: B");
} else if (score >= 60) {
  console.log("Grade: C");
} else {
  console.log("Grade: F");
}
// Output: "Grade: C"

// Falsy values: false, 0, "", null, undefined, NaN all evaluate as false
const username = "";
if (username) {
  console.log("Welcome, " + username);
} else {
  console.log("Please enter a username."); // this runs
}`}
        />
        <Infobox type="info" title="Falsy and Truthy Values">
          In a boolean context, JavaScript coerces values to <code>true</code> or <code>false</code>.
          The following are falsy: <code>false</code>, <code>0</code>, <code>-0</code>,
          <code> 0n</code>, <code>""</code>, <code>null</code>, <code>undefined</code>, and
          <code> NaN</code>. Everything else is truthy, including empty arrays and empty objects.
        </Infobox>
      </div>

      {/* switch */}
      <div id="control-switch" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <ArrowLeftRight className="w-5 h-5" /> switch Statement
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>switch</code> statement evaluates an expression and executes the matching
          <code> case</code> clause. If no case matches, the optional <code>default</code> clause
          executes. Each case must end with <code>break</code> to prevent <em>fall-through</em>
          into the next case.
        </p>
        <CodeBlock
          language="javascript"
          code={`const day = "Monday";

switch (day) {
  case "Saturday":
  case "Sunday":
    console.log("Weekend");
    break;
  case "Monday":
    console.log("Start of the work week");
    break;
  case "Friday":
    console.log("End of the work week");
    break;
  default:
    console.log("Mid-week");
}
// Output: "Start of the work week"`}
        />

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
          <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">Fall-through behavior</h4>
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
            Without <code>break</code>, execution continues into the next case regardless of the
            value. This is sometimes used intentionally to share code between cases, but it is a
            common source of bugs.
          </p>
          <CodeBlock
            language="javascript"
            code={`const action = "save";

switch (action) {
  case "save":
    console.log("Saving..."); // runs
    // no break — falls through to next case
  case "validate":
    console.log("Validating..."); // also runs!
    break;
  default:
    console.log("Unknown action");
}
// Output: "Saving..."  "Validating..."`}
          />
        </div>
        <Infobox type="warning" title="switch uses strict equality">
          The comparison is performed with <code>===</code> (strict equality). A numeric
          <code> case 1</code> will not match the string <code>"1"</code>.
        </Infobox>
      </div>

      {/* try / catch / throw */}
      <div id="try-catch" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Shield className="w-5 h-5" /> try / catch / throw
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          The <code>try...catch</code> statement marks a block of statements to attempt and specifies
          a response if an exception is thrown. The <code>throw</code> statement creates a custom
          exception.
        </p>

        <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
          <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">Syntax</h4>
          <CodeBlock
            language="javascript"
            code={`try {
  // Code that might throw an exception
} catch (exception) {
  // Runs only if an exception was thrown in the try block
  // 'exception' holds the thrown value
} finally {
  // Always runs, regardless of whether an exception occurred
}`}
          />
        </div>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">throw</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              You can throw any value: a string, number, or object. In practice, always throw an
              <code> Error</code> object or a subclass of it, because Error objects include a
              stack trace that is invaluable for debugging.
            </p>
            <CodeBlock
              language="javascript"
              code={`function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed.");
  }
  return a / b;
}

try {
  console.log(divide(10, 2));  // 5
  console.log(divide(10, 0));  // throws
} catch (err) {
  console.error("Caught:", err.message);
  // Caught: Division by zero is not allowed.
}`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">catch with conditional error handling</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Use <code>instanceof</code> to distinguish error types and respond differently to each.
            </p>
            <CodeBlock
              language="javascript"
              code={`try {
  const data = JSON.parse("not valid json");
} catch (err) {
  if (err instanceof SyntaxError) {
    console.log("Bad input format:", err.message);
  } else if (err instanceof TypeError) {
    console.log("Type problem:", err.message);
  } else {
    throw err; // re-throw unexpected errors
  }
}
console.log("Execution continues normally.");`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">finally</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              The <code>finally</code> block executes after <code>try</code> and <code>catch</code>
              finish, regardless of the outcome. It is used for cleanup operations such as closing
              connections or hiding loading indicators.
            </p>
            <CodeBlock
              language="javascript"
              code={`let connection = null;

try {
  connection = openConnection(); // hypothetical
  const data = connection.fetch();
  process(data);
} catch (err) {
  console.error("Failed:", err.message);
} finally {
  if (connection) {
    connection.close(); // always close the connection
  }
  console.log("Done.");
}

// Practical example with loading state
let isLoading = true;
try {
  const result = JSON.parse('{"ok": true}');
  console.log("Loaded:", result.ok);
} catch (err) {
  console.error("Load failed");
} finally {
  isLoading = false; // always clear the loading state
  console.log("isLoading:", isLoading); // false`}
            />
            <Infobox type="info" title="finally and return">
              If a <code>return</code> statement exists in both <code>try</code> and
              <code> finally</code>, the value from <code>finally</code> takes precedence and
              overrides the one from <code>try</code>. Keep <code>finally</code> free of
              <code> return</code> statements to avoid surprising behavior.
            </Infobox>
          </div>
        </div>
      </div>

      {/* Error Objects */}
      <div id="error-object" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Error Objects
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          When a runtime error occurs, JavaScript creates and throws an <code>Error</code> object.
          All Error objects have two core properties, and most engines provide a third.
        </p>
        <NoteTable
          headers={["Property", "Type", "Description"]}
          rows={[
            [<code className="font-bold">name</code>,    "String", "Type of the error (e.g., \"TypeError\", \"RangeError\")"],
            [<code className="font-bold">message</code>, "String", "Human-readable description of the error"],
            [<code className="font-bold">stack</code>,   "String", "Stack trace showing where the error originated (non-standard but universally supported)"],
          ]}
        />

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Built-in Error types</h4>
            <NoteTable
              headers={["Constructor", "When to use"]}
              rows={[
                [<code>Error</code>,          "General purpose; use as a base class"],
                [<code>SyntaxError</code>,    "Thrown by the parser for invalid syntax"],
                [<code>TypeError</code>,      "Value is not of the expected type"],
                [<code>RangeError</code>,     "Numeric value is outside an allowable range"],
                [<code>ReferenceError</code>, "Reference to an undeclared variable"],
                [<code>URIError</code>,       "Malformed URI passed to encode/decode functions"],
                [<code>EvalError</code>,      "Errors related to eval() (rarely thrown today)"],
              ]}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Using Error properties</h4>
            <CodeBlock
              language="javascript"
              code={`try {
  const user = null;
  user.name; // TypeError
} catch (err) {
  console.log(err.name);    // "TypeError"
  console.log(err.message); // "Cannot read properties of null (reading 'name')"
  console.log(err.stack);   // full stack trace string
}

// Creating and throwing specific error types
function validateAge(age) {
  if (typeof age !== "number") {
    throw new TypeError("age must be a number, got " + typeof age);
  }
  if (age < 0 || age > 150) {
    throw new RangeError("age must be between 0 and 150, got " + age);
  }
  return age;
}

try {
  validateAge("twenty");
} catch (err) {
  console.log(err.name + ": " + err.message);
  // TypeError: age must be a number, got string
}`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Custom Error classes</h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Extend the built-in <code>Error</code> class to create domain-specific error types
              that can be identified with <code>instanceof</code>.
            </p>
            <CodeBlock
              language="javascript"
              code={`class ValidationError extends Error {
  constructor(field, message) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class NetworkError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
  }
}

try {
  throw new ValidationError("email", "Invalid email format");
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Field:", err.field);        // "email"
    console.log("Message:", err.message);   // "Invalid email format"
  }
}`}
            />
          </div>
        </div>

        <Infobox type="tip" title="Error handling best practices">
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Wrap only the code that can realistically throw, not entire functions.</li>
            <li>Never silently swallow errors with an empty <code>catch</code> block.</li>
            <li>Always log or re-throw unexpected errors so they are not invisible.</li>
            <li>Use <code>finally</code> for cleanup, not for normal logic.</li>
            <li>Throw <code>Error</code> objects rather than plain strings to preserve stack traces.</li>
          </ul>
        </Infobox>
      </div>

      {/* Common Error Types reference */}
      <div id="error-types" className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
          <Target className="w-5 h-5" /> Common Runtime Errors Reference
        </h2>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Understanding which error is thrown makes debugging faster. Below are the most common
          runtime errors and code examples that produce them.
        </p>
        <NoteTable headers={errorTypeHeaders} rows={errorTypeRows} />
        <CodeBlock
          language="javascript"
          code={`// ReferenceError: variable not declared
try {
  console.log(undeclaredVar);
} catch (e) { console.log(e.name); } // "ReferenceError"

// TypeError: wrong type
try {
  const n = 42;
  n.toUpperCase();
} catch (e) { console.log(e.name); } // "TypeError"

// RangeError: invalid array length
try {
  new Array(-1);
} catch (e) { console.log(e.name); } // "RangeError"

// SyntaxError: caught at parse time, not catchable at runtime
// eval("let a = ;"); // would produce SyntaxError`}
        />
      </div>

      {/* Practical Examples */}
      <div id="practical-errors" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Practical Examples
        </h2>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">Form input validation</h4>
            <CodeBlock
              language="javascript"
              code={`function validateEmail(email) {
  if (!email) {
    throw new Error("Email is required.");
  }
  if (!email.includes("@")) {
    throw new Error("Email must contain '@'.");
  }
}

function registerUser(name, email) {
  try {
    if (!name || name.trim() === "") {
      throw new Error("Name cannot be empty.");
    }
    validateEmail(email);
    console.log("Registered:", name, email);
  } catch (err) {
    console.error("Registration failed:", err.message);
  }
}

registerUser("Alex", "alex@example.com"); // Registered: Alex alex@example.com
registerUser("",    "test@example.com");  // Registration failed: Name cannot be empty.
registerUser("Alex", "invalid-address");  // Registration failed: Email must contain '@'.`}
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-teal-500 shadow-sm">
            <h4 className="font-bold text-teal-700 dark:text-teal-400 mb-2">Safe JSON processing</h4>
            <CodeBlock
              language="javascript"
              code={`function parseConfig(input) {
  try {
    const config = JSON.parse(input);

    if (!config.host) throw new Error("Missing required field: host");
    if (!config.port) throw new Error("Missing required field: port");

    return config;
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new Error("Config is not valid JSON: " + err.message);
    }
    throw err; // re-throw validation errors
  }
}

try {
  const cfg = parseConfig('{"host":"localhost","port":3000}');
  console.log("Connected to", cfg.host + ":" + cfg.port);
} catch (err) {
  console.error(err.message);
}`}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ErrorHandling;
