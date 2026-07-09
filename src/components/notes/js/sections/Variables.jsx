import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import {
  PackageOpen,
  Tag,
  MapPin,
  Database,
  ListOrdered,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertCircle,
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
          <PackageOpen className="w-8 h-8" /> Variables in JavaScript
        </h1>
        <p className="text-blue-50 mt-1 text-sm">
          Containers that store data for your programs.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Database className="w-5 h-5" /> What is a Variable?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>variable</strong> is like a labeled box where you can store information. 
          You give it a name, and then you can put data inside it, retrieve it, or change it later.
        </p>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          In JavaScript, a variable is a <strong>named storage location</strong> in the computer's 
          memory that holds a value. The value can be a number, text, or any other type of data.
        </p>

        <CodeBlock 
          code={`let age = 15;\nlet name = "Alex";\n\nconsole.log(age);   // Output: 15\nconsole.log(name);  // Output: Alex`} 
        />
      </div>

      {/* Three Ways to Declare Variables */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Three Ways to Declare Variables
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          JavaScript has three keywords to create variables: <code>var</code>, <code>let</code>, and <code>const</code>.
        </p>

        <div className="space-y-4">
          {/* let */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              1. <code>let</code> - Flexible and Modern
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Use <code>let</code> when you need a variable whose value <strong>can change</strong>.
            </p>
            <CodeBlock 
              code={`let score = 10;\nscore = 20;  // ✓ Allowed! Value can change\nconsole.log(score);  // Output: 20`} 
            />
            <Infobox type="tip" title="Best Practice">
              Use <code>let</code> for variables that will change their value during program execution.
            </Infobox>
          </div>

          {/* const */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              2. <code>const</code> - Constant and Unchangeable
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Use <code>const</code> when you need a variable whose value <strong>should NOT change</strong>.
            </p>
            <CodeBlock 
              code={`const PI = 3.14159;\n// PI = 3.14;  // ✗ Error! Cannot reassign a const variable\nconsole.log(PI);  // Output: 3.14159`} 
            />
            <Infobox type="tip" title="Best Practice">
              Use <code>const</code> by default. Only use <code>let</code> when you know the value will change.
            </Infobox>
          </div>

          {/* var */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-amber-500 shadow-sm">
            <h4 className="font-bold text-amber-700 dark:text-amber-400 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              3. <code>var</code> - Old Way (Avoid!)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              <code>var</code> is the old way to declare variables. It has confusing behavior and 
              is <strong>not recommended</strong> in modern JavaScript.
            </p>
            <CodeBlock 
              code={`var oldStyle = "Don't use me!";\n// var has issues with scope that can cause bugs`} 
            />
            <Infobox type="warning" title="Avoid var">
              Always use <code>let</code> or <code>const</code> instead of <code>var</code> in modern JavaScript!
            </Infobox>
          </div>
        </div>
      </div>

      {/* Memory Visualization */}
      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Database className="w-5 h-5" /> How Variables Work in Memory
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 bg-white/60 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800/80">
          {/* Variable age */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-500 text-white font-mono font-bold px-5 py-2 rounded-lg shadow-md flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> age
            </div>
            <div className="text-2xl text-slate-400 font-light">↓</div>
            <div className="border-2 border-slate-700 rounded-lg overflow-hidden w-48 shadow-lg bg-white dark:bg-slate-950">
              <div className="bg-slate-700 text-yellow-400 text-xs font-mono text-center py-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Memory: 0x1A2B3C
              </div>
              <div className="text-center py-6 text-3xl font-bold text-cyan-500 font-mono">
                15
              </div>
            </div>
          </div>

          {/* Variable name */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-500 text-white font-mono font-bold px-5 py-2 rounded-lg shadow-md flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> name
            </div>
            <div className="text-2xl text-slate-400 font-light">↓</div>
            <div className="border-2 border-slate-700 rounded-lg overflow-hidden w-48 shadow-lg bg-white dark:bg-slate-950">
              <div className="bg-slate-700 text-yellow-400 text-xs font-mono text-center py-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Memory: 0x4D5E6F
              </div>
              <div className="text-center py-6 text-2xl font-bold text-cyan-500 font-mono">
                "Alex"
              </div>
            </div>
          </div>
        </div>

        <Infobox type="tip" title="Understanding Memory">
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>Each variable has a <strong>name</strong> (like <code>age</code> or <code>name</code>)</li>
            <li>The variable points to a <strong>memory address</strong> where the data is stored</li>
            <li>The <strong>value</strong> is the actual data stored at that memory location</li>
          </ul>
        </Infobox>
      </div>

      {/* Naming Rules */}
      <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <ListOrdered className="w-5 h-5" /> Rules for Naming Variables
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-350 leading-relaxed">
          <li>
            Must start with a letter, underscore (<code>_</code>), or dollar sign (<code>$</code>). 
            Cannot start with a number.
            <div className="mt-1 space-x-2">
              <Valid>userName</Valid>
              <Valid>_private</Valid>
              <Valid>$price</Valid>
              <Invalid>123abc</Invalid>
            </div>
          </li>
          <li>
            Can contain letters, numbers, underscores, and dollar signs. No spaces or special characters.
            <div className="mt-1 space-x-2">
              <Valid>user123</Valid>
              <Valid>first_name</Valid>
              <Invalid>user-name</Invalid>
              <Invalid>user name</Invalid>
            </div>
          </li>
          <li>
            JavaScript is <strong>case-sensitive</strong>. <code>age</code>, <code>Age</code>, and <code>AGE</code> are three different variables!
          </li>
          <li>
            Cannot use reserved keywords like <code>let</code>, <code>const</code>, <code>if</code>, <code>function</code>, etc.
            <div className="mt-1 space-x-2">
              <Valid>myFunction</Valid>
              <Invalid>function</Invalid>
              <Invalid>let</Invalid>
            </div>
          </li>
          <li>
            Use meaningful names that describe what the variable stores.
            <div className="mt-1 space-x-2">
              <Valid>studentAge</Valid>
              <Valid>totalScore</Valid>
              <Invalid>x</Invalid>
              <Invalid>abc</Invalid>
            </div>
          </li>
        </ol>
      </div>

      {/* Naming Conventions */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Naming Conventions (Best Practices)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Follow these conventions to write clean, professional JavaScript code:
        </p>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-teal-100 dark:border-teal-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
              camelCase (most common)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Start with lowercase, capitalize each new word. Used for variables and functions.
            </p>
            <CodeBlock code={`let firstName = "John";\nlet totalAmount = 100;\nlet isLoggedIn = true;`} />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-teal-100 dark:border-teal-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-1">
              UPPER_CASE (for constants)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              All uppercase with underscores. Used for constant values that never change.
            </p>
            <CodeBlock code={`const MAX_STUDENTS = 50;\nconst API_KEY = "abc123";\nconst PI = 3.14159;`} />
          </div>
        </div>
      </div>

      {/* Examples */}
      <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Complete Examples
        </h3>
        
        <CodeBlock 
          code={`// Declaring variables\nlet studentName = "Emma";\nlet studentAge = 14;\nconst schoolName = "Tech Academy";\n\n// Using variables\nconsole.log(studentName);  // Output: Emma\nconsole.log("Age:", studentAge);  // Output: Age: 14\n\n// Changing values (only for let)\nstudentAge = 15;  // ✓ Allowed\nconsole.log("Updated age:", studentAge);  // Output: Updated age: 15\n\n// This would cause an error:\n// schoolName = "New School";  // ✗ Error! Cannot change const`} 
        />
      </div>
    </section>
  );
};

export default Variables;
