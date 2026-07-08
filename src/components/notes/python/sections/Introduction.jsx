import React from "react";
import NoteTable from "../../shared/NoteTable";
import {
  Monitor,
  MessageCircle,
  Cpu,
  Puzzle,
  Sparkles,
  Globe,
  Gamepad2,
  Brain,
  BarChart3,
  Bot,
  AppWindow,
  Cog,
} from "lucide-react";

const Introduction = () => {
  const tableHeaders = ["Type", "What it means", "Real Examples"];
  const tableRows = [
    [
      <strong className="inline-flex items-center gap-1.5">
        <Cpu className="w-4 h-4 text-slate-500" /> Low-Level
      </strong>,
      "Super close to how the computer actually 'thinks.' Written in 0s and 1s, which makes it very hard for humans to read.",
      "Machine Language (0 & 1)",
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        <Cog className="w-4 h-4 text-slate-500" /> Mid-Level
      </strong>,
      "A mix of both worlds. It can talk directly to hardware but still uses some human-readable elements.",
      "C",
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        <MessageCircle className="w-4 h-4 text-slate-500" /> High-Level
      </strong>,
      <span><strong>Super easy for humans to read and write!</strong> It uses normal English words.</span>,
      <strong>Python, Java, C++</strong>,
    ],
  ];

  return (
    <section id="introduction" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Monitor className="w-8 h-8" /> What is a Programming Language?
        </h1>
        <p className="text-emerald-50 mt-1 text-sm">
          Let's find out how humans talk to computers!
        </p>
      </div>

      {/* What is a Language */}
      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> What is a Language?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>language</strong> is a way of communicating with others. We use
          languages like English, Hindi, or Bengali to share our thoughts, ask
          questions, and give instructions.
        </p>
      </div>

      {/* What is a Program */}
      <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
          <Puzzle className="w-5 h-5" /> What is a Program?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>program</strong> is a set of step-by-step instructions given to
          a computer to perform a specific task. For example, opening a game,
          calculating numbers, or displaying a message on the screen.
        </p>
      </div>

      {/* What is a Programming Language */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Bot className="w-5 h-5" /> What is a Programming Language?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed flex items-center gap-1.5">
          Now, let's put these two ideas together! <Sparkles className="w-4 h-4 text-purple-500" />
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Think of a computer like a super-smart robot that doesn't understand human
          languages such as English or Hindi. To tell the computer what to do, we
          need a special language called a <strong>programming language</strong>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>programming language</strong> is a special language used to
          write programs. It helps us give step-by-step instructions to a computer
          so it can perform tasks like playing games, opening apps, solving math
          problems, or creating animations.
        </p>
      </div>

      {/* Types of Programming Languages */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Puzzle className="w-5 h-5" /> Types of Programming Languages
        </h2>
        <NoteTable headers={tableHeaders} rows={tableRows} />
      </div>

      {/* What can you build with Python */}
      <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
          <Bot className="w-5 h-5" /> What can you build with Python?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Python is a multi-tool that can build almost anything:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Globe, title: "Web Development", text: "Making websites like YouTube or Instagram." },
            { icon: Gamepad2, title: "Game Development", text: "Designing and coding video games." },
            { icon: Brain, title: "Artificial Intelligence (AI)", text: "Teaching computers how to think (like ChatGPT!)." },
            { icon: BarChart3, title: "Data Science", text: "Exploring giant heaps of numbers to discover hidden facts." },
            { icon: Bot, title: "Automation", text: "Getting the computer to finish boring chores for you automatically." },
            { icon: AppWindow, title: "Desktop Applications", text: "Making software apps that run right on your desktop window." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-white dark:bg-slate-700 border border-pink-100 dark:border-pink-900 p-3 shadow-sm"
              >
                <Icon className="w-6 h-6 text-pink-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Introduction;