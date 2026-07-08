import React from "react";
import NoteTable from "../../shared/NoteTable";
import { GitCompare, Zap, Radio, BookOpen } from "lucide-react";

const Interpreter = () => {
  const tableHeaders = [
    <span className="inline-flex items-center gap-1.5">
      <Radio className="w-4 h-4 text-sky-500" /> The Interpreter (The Live Translator)
    </span>,
    <span className="inline-flex items-center gap-1.5">
      <BookOpen className="w-4 h-4 text-purple-500" /> The Compiler (The Book Translator)
    </span>,
  ];
  const tableRows = [
    [
      <span>Translates and runs your code <strong>one single line at a time</strong>.</span>,
      <span>Translates the <strong>entire program all at once</strong> before anything starts running.</span>,
    ],
    [
      <span>Stops instantly on the <strong>first error</strong> it hits and asks for a fix.</span>,
      "Scans everything and hands you a list of all errors at the very end.",
    ],
    [
      <span><strong>Slower execution</strong> because it has to translate as it moves along.</span>,
      <span><strong>Faster execution</strong> because all the translation work is already finished!</span>,
    ],
    [
      "Does not create a separate executable file.",
      <span>Creates a brand new, ready-to-run file (like a <code>.exe</code> file).</span>,
    ],
    [
      <em>Example: Python</em>,
      <em>Example: C, C++</em>,
    ],
  ];

  return (
    <section id="interpreter-compiler" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-sky-500 to-purple-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <GitCompare className="w-8 h-8" /> Interpreter vs. Compiler
        </h1>
        <p className="text-sky-50 mt-1 text-sm">
          Two different ways a computer translates your code.
        </p>
      </div>

      {/* Intro */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          High-level languages must be translated into computer code (0s and 1s).
          Language translators handle this in two ways:
        </p>
      </div>

      {/* Quick comparison cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h2 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
            <Radio className="w-5 h-5" /> Interpreter
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The live translator - works line by line, right as you go.
          </p>
        </div>
        <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h2 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <BookOpen className="w-5 h-5" /> Compiler
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The book translator - translates the whole program first, then runs it.
          </p>
        </div>
      </div>

      {/* Comparison table */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Side-by-side comparison
        </h2>
        <NoteTable headers={tableHeaders} rows={tableRows} />
      </div>
    </section>
  );
};

export default Interpreter;