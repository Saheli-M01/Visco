import React from "react";
import NoteTable from "../../shared/NoteTable";

const Interpreter = () => {
  const tableHeaders = ["The Interpreter (The Live Translator)", "The Compiler (The Book Translator)"];
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
    <section id="interpreter-compiler" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        2. Interpreter vs. Compiler
      </h1>

      <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
        High-level languages must be translated into computer code (0s and 1s).
        Language translators handle this in two ways:
      </p>

      <NoteTable headers={tableHeaders} rows={tableRows} />
    </section>
  );
};

export default Interpreter;