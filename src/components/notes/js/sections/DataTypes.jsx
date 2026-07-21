// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  Database,
  Type,
  Hash,
  AlignLeft,
  ToggleLeft,
  Box,
  PackageX,
  Layers,
} from "lucide-react";
import Arrays from "./Arrays";
import Object from "./Objects";

const DataTypes = () => {
  const primitiveTypes = ["Type", "Description", "Example"];
  const primitiveRows = [
    [
      <code className="text-blue-600 dark:text-blue-400 font-bold">Number</code>,
      "Represents numeric values (integers and decimals)",
      <code>42, 3.14, -10</code>,
    ],
    [
      <code className="text-blue-600 dark:text-blue-400 font-bold">String</code>,
      "Represents text (enclosed in quotes)",
      <code>"Hello", 'World', `Template`</code>,
    ],
    [
      <code className="text-blue-600 dark:text-blue-400 font-bold">Boolean</code>,
      "Represents true or false",
      <code>true, false</code>,
    ],
    [
      <code className="text-blue-600 dark:text-blue-400 font-bold">Undefined</code>,
      "Variable declared but not assigned a value",
      <code>let x;</code>,
    ],
    [
      <code className="text-blue-600 dark:text-blue-400 font-bold">Null</code>,
      "Intentionally empty or no value",
      <code>let y = null;</code>,
    ],
  ];

  return (
    <section id="data-types" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Database className="w-8 h-8" /> Data Types in JavaScript
        </h1>
        <p className="text-violet-50 mt-1 text-sm">
          Understanding the different types of data you can work with.
        </p>
      </div>

      {/* Introduction */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Type className="w-5 h-5" /> What are Data Types?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>data type</strong> defines what kind of value a variable can hold.
          JavaScript needs to know whether you're working with numbers, text, true/false values, etc.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript has <strong>dynamic typing</strong>, which means you don't need to specify
          the type when creating a variable—JavaScript figures it out automatically!
        </p>
        <CodeBlock
          code={`let age = 15;           // JavaScript knows this is a Number\nlet name = "Alex";      // JavaScript knows this is a String\nlet isStudent = true;   // JavaScript knows this is a Boolean`}
        />
      </div>

      {/* Primitive Data Types */}
      <div id="primitive" className="grid gap-4">  
        <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Primitive Data Types
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Primitive types are the basic building blocks. They store simple, single values.
        </p>
        <NoteTable headers={primitiveTypes} rows={primitiveRows} />
      </div>

        {/* Number Type */}
        <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
            <Hash className="w-5 h-5" /> 1. Number Type
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            JavaScript has only <strong>one number type</strong> that works for both integers and decimals.
          </p>
          <CodeBlock
            code={`let integer = 42;           // Whole number\nlet decimal = 3.14;         // Decimal number\nlet negative = -10;         // Negative number\nlet large = 1000000;        // Large number\n\n// You can do math operations\nlet sum = 10 + 5;           // 15\nlet product = 4 * 3;        // 12\nlet quotient = 20 / 4;      // 5`}
          />
          <Infobox type="info" title="Special Number Values">
            JavaScript also has special number values: <code>Infinity</code>, <code>-Infinity</code>, and <code>NaN</code> (Not a Number).
          </Infobox>
        </div>

        {/* String Type */}
        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <AlignLeft className="w-5 h-5" /> 2. String Type
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            Strings represent <strong>text</strong>. You can use single quotes, double quotes, or backticks.
          </p>
          <CodeBlock
            code={`let singleQuote = 'Hello';          // Using single quotes\nlet doubleQuote = "World";          // Using double quotes\nlet backticks = \`JavaScript\`;       // Using backticks (template literals)\n\n// Strings can contain letters, numbers, and symbols\nlet message = "Hello, World!";\nlet code = "let x = 10;";\nlet emoji = "🚀 Launch!";\n\n// Template literals allow embedding variables\nlet name = "Alex";\nlet greeting = \`Hello, \${name}!\`;   // "Hello, Alex!"`}
          />
          <Infobox type="tip" title="Template Literals">
            Use backticks (`) for template literals—they let you embed variables and expressions using <code>${"${}"}</code>!
          </Infobox>
        </div>

        {/* Boolean Type */}
        <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <ToggleLeft className="w-5 h-5" /> 3. Boolean Type
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            Booleans represent <strong>true or false</strong> values. They're used for making decisions.
          </p>
          <CodeBlock
            code={`let isRaining = true;\nlet isSunny = false;\n\n// Booleans are often results of comparisons\nlet age = 15;\nlet isTeenager = age >= 13 && age <= 19;  // true\n\nlet score = 85;\nlet passed = score >= 60;                  // true\nlet failed = score < 60;                   // false`}
          />
          <Infobox type="info" title="Boolean Logic">
            Booleans are essential for <code>if</code> statements, loops, and conditional logic!
          </Infobox>
        </div>

        {/* Undefined Type */}
        <div className="rounded-xl border-2 border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-400 flex items-center gap-2">
            <Box className="w-5 h-5" /> 4. Undefined Type
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            A variable that has been <strong>declared but not assigned a value</strong> has the value <code>undefined</code>.
          </p>
          <CodeBlock
            code={`let x;                  // Declared but not assigned\nconsole.log(x);         // Output: undefined\n\nlet y;\nconsole.log(y);         // Output: undefined\n\n// After assigning a value, it's no longer undefined\ny = 42;\nconsole.log(y);         // Output: 42`}
          />
        </div>

        {/* Null Type */}
        <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
            <PackageX className="w-5 h-5" /> 5. Null Type
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            <code>null</code> represents <strong>intentionally empty</strong> or "no value".
            It's assigned by programmers to indicate "nothing" or "empty".
          </p>
          <CodeBlock
            code={`let result = null;      // Intentionally set to "no value"\nconsole.log(result);    // Output: null\n\n// Used when you want to explicitly indicate emptiness\nlet selectedItem = null;  // No item selected yet\nlet userData = null;      // No user data loaded yet`}
          />
          <Infobox type="info" title="undefined vs null">
            <code>undefined</code> means "not assigned yet" (JavaScript's default).
            <code>null</code> means "intentionally empty" (set by you).
          </Infobox>
        </div>

        {/* typeof Operator */}
        <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
            <Type className="w-5 h-5" /> Checking Data Types with <code>typeof</code>
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            Use the <code>typeof</code> operator to check what type a value is.
          </p>
          <CodeBlock
            code={`console.log(typeof 42);           // "number"\nconsole.log(typeof "Hello");      // "string"\nconsole.log(typeof true);         // "boolean"\nconsole.log(typeof undefined);    // "undefined"\nconsole.log(typeof null);         // "object" (historical bug!)\n\nlet age = 15;\nconsole.log(typeof age);          // "number"\n\nlet name = "Alex";\nconsole.log(typeof name);         // "string"`}
          />
          <Infobox type="warning" title="typeof null Bug">
            <code>typeof null</code> returns <code>"object"</code> instead of <code>"null"</code>.
            This is a well-known JavaScript bug that can't be fixed for backwards compatibility!
          </Infobox>
        </div></div>


      {/* Complex Data Types Preview */}
      <div id="non-primitive">

      </div>
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Complex Data Types (Preview)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Besides primitive types, JavaScript also has <strong>complex types</strong> that can store
          multiple values or more complex data:
        </p>
        <Arrays />
        <Object />
      </div>
    </section>
  );
};

export default DataTypes;
