import React from "react";
import NoteTable from "../../shared/NoteTable";

const Introduction = () => {
  const tableHeaders = ["Type", "What it means", "Real Examples"];
  const tableRows = [
    [
      <strong>Low-Level</strong>,
      "Super close to how the computer actually 'thinks.' Written in 0s and 1s, which makes it very hard for humans to read.",
      "Machine Language (0 & 1)",
    ],
    [
      <strong>Mid-Level</strong>,
      "A mix of both worlds. It can talk directly to hardware but still uses some human-readable elements.",
      "C",
    ],
    [
      <strong>High-Level</strong>,
      <span><strong>Super easy for humans to read and write!</strong> It uses normal English words.</span>,
      <strong>Python, Java, C++</strong>,
    ],
  ];

  return (
    <section id="programming-language" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        1. What is a Programming Language?
      </h1>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          What is a Language?
        </h2>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          A <strong>language</strong> is a way of communicating with others. We use
          languages like English, Hindi, or Bengali to share our thoughts, ask
          questions, and give instructions.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          What is a Program?
        </h2>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          A <strong>program</strong> is a set of step-by-step instructions given to
          a computer to perform a specific task. For example, opening a game,
          calculating numbers, or displaying a message on the screen.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          What is a Programming Language?
        </h2>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Now, let's put these two ideas together!
        </p>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Think of a computer like a super-smart robot that doesn't understand human
          languages such as English or Hindi. To tell the computer what to do, we
          need a special language called a <strong>programming language</strong>.
        </p>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          A <strong>programming language</strong> is a special language used to
          write programs. It helps us give step-by-step instructions to a computer
          so it can perform tasks like playing games, opening apps, solving math
          problems, or creating animations.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          Types of Programming Languages
        </h2>
        <NoteTable headers={tableHeaders} rows={tableRows} />
      </div>

      <div className="space-y-3">
        <h2 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
          What can you build with Python?
        </h2>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Python is a multi-tool that can build almost anything:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-350 leading-relaxed">
          <li>
            <strong>Web Development:</strong> Making websites like YouTube or
            Instagram.
          </li>
          <li>
            <strong>Game Development:</strong> Designing and coding video games.
          </li>
          <li>
            <strong>Artificial Intelligence (AI):</strong> Teaching computers how
            to think (like ChatGPT!).
          </li>
          <li>
            <strong>Data Science:</strong> Exploring giant heaps of numbers to
            discover hidden facts.
          </li>
          <li>
            <strong>Automation:</strong> Getting the computer to finish boring
            chores for you automatically.
          </li>
          <li>
            <strong>Desktop Applications:</strong> Making software apps that run
            right on your desktop window.
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Introduction;