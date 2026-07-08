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
      <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <PackageOpen className="w-8 h-8" /> Variables
        </h1>
        <p className="text-blue-50 mt-1 text-sm">
          Little labeled buckets that hold your data.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Imagine a <strong>variable</strong> as a plastic toy bucket with a sticky note
          label on it. You place values (numbers, text, etc.) inside it so you don't
          lose them!
        </p>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          In programming, a <strong>variable</strong> is a <strong>named memory location</strong>.
          This means the computer keeps the value in its memory, and we give that memory
          location a meaningful <strong>name</strong> so that we can easily use it later.
        </p>

        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          For example, in <code>age = 12</code>, <code>age</code> is the name of the
          memory location, and <code>12</code> is the value stored in it.
        </p>

        <CodeBlock code={`age = 12\nname = "Riya"\n\nprint(age)\nprint(name)`} />
      </div>

      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Database className="w-5 h-5" /> Memory Diagram Visualization
        </h3>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6 bg-white/60 dark:bg-slate-900/40 rounded-xl border border-slate-150 dark:border-slate-800/80">
          {/* Variable Age */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-500 text-white font-mono font-bold px-5 py-2 rounded-lg shadow-md flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> age
            </div>
            <div className="text-2xl text-slate-400 font-light">↓</div>
            <div className="border-2 border-slate-700 rounded-lg overflow-hidden w-48 shadow-lg bg-white dark:bg-slate-950">
              <div className="bg-slate-700 text-yellow-400 text-xs font-mono text-center py-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Addr: 0x7FF8A101
              </div>
              <div className="text-center py-6 text-3xl font-bold text-rose-500 font-mono">
                12
              </div>
            </div>
          </div>

          {/* Variable Name */}
          <div className="flex flex-col items-center gap-2">
            <div className="bg-blue-500 text-white font-mono font-bold px-5 py-2 rounded-lg shadow-md flex items-center gap-1.5">
              <Tag className="w-4 h-4" /> name
            </div>
            <div className="text-2xl text-slate-400 font-light">↓</div>
            <div className="border-2 border-slate-700 rounded-lg overflow-hidden w-48 shadow-lg bg-white dark:bg-slate-950">
              <div className="bg-slate-700 text-yellow-400 text-xs font-mono text-center py-1 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" /> Addr: 0x7FF8A205
              </div>
              <div className="text-center py-6 text-2xl font-bold text-rose-500 font-mono">
                "Riya"
              </div>
            </div>
          </div>
        </div>

        <Infobox type="tip" title="Understanding the Diagram">
          <ul className="list-disc pl-4 space-y-1 text-xs">
            <li>The <span className="text-blue-500 font-semibold">blue label</span> represents the variable name (how we refer to it in code).</li>
            <li>The <span className="text-slate-700 dark:text-slate-350 font-semibold">memory address</span> represents where the data is stored in the computer's RAM.</li>
            <li>The <span className="text-rose-500 font-semibold">red value</span> represents the actual raw data inside the memory location.</li>
          </ul>
        </Infobox>
      </div>

      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <ListOrdered className="w-5 h-5" /> Rules for Naming Variables
        </h3>
        <ol className="list-decimal pl-6 space-y-2 text-slate-600 dark:text-slate-350 leading-relaxed">
          <li>
            Must only use standard letters (a-z, A-Z), numbers (0-9), and underscores (<code>_</code>).
          </li>
          <li>
            Must strictly begin with a letter or an underscore (e.g. <code>score1</code> is{" "}
            <Valid>valid</Valid>, but <code>1score</code> is{" "}
            <Invalid>invalid</Invalid>).
          </li>
          <li>
            Variable names are case-sensitive (<code>gold</code> and <code>Gold</code> are two individual buckets).
          </li>
          <li>
            Keywords cannot be used as variable names (e.g. <code>my_name</code> is{" "}
            <Valid>valid</Valid>, but <code>if</code> is{" "}
            <Invalid>invalid</Invalid>).
          </li>
          <li>
            Spaces or any special character (e.g. &, *, %, etc) except (_) are not allowed (e.g. <code>my_age</code> is{" "}
            <Valid>valid</Valid>, but <code>my%age</code> or <code>my age</code> is{" "}
            <Invalid>invalid</Invalid>).
          </li>
          <li>
            For better practice use meaningful names for variables. (e.g. <code>age = 20</code> is better practice than <code>a = 20</code>).
          </li>
        </ol>
      </div>

      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Variable Initialization
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Initialization simply means creating a variable and putting a value inside
          it for the very first time using the <code>=</code> sign.
        </p>
        <CodeBlock code={`score = 100 # Creates an integer bucket\nplayer_name = "Alex" # Creates a string text bucket`} />
      </div>
    </section>
  );
};

export default Variables;