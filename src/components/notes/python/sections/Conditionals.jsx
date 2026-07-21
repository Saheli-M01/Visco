// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import {
    GitBranch,
    GitFork,
    Layers,
    Route,
    ListChecks,
    CheckCircle2,
    XCircle,
    Workflow,
} from "lucide-react";

const Conditionals = () => {
    const summaryHeaders = ["Structure", "When to Use", "Number of Outcomes"];
    const summaryRows = [
        [<strong>if</strong>, "Run code only when one condition is true.", "1 (runs or skips)"],
        [<strong>if-else</strong>, "Choose between exactly two paths.", "2"],
        [<strong>if-elif-else</strong>, "Choose one path out of many conditions.", "3 or more"],
        [<strong>Nested if</strong>, "A condition depends on another condition first being true.", "Any (layered)"],
    ];

    return (
        <section id="conditionals" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-500 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <GitBranch className="w-8 h-8" /> Conditional Statements: Making Decisions
                </h1>
                <p className="text-indigo-50 mt-1 text-sm">
                    How Python programs choose which path to take.
                </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    Just like you decide "if it's raining, I'll carry an umbrella," a program
                    needs to make decisions too. <strong>Conditional statements</strong> let
                    your code check a condition and choose which block of instructions to run.
                </p>
            </div>

            <div className="space-y-5">
                <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> The 4 Ways to Branch
                </h2>

                {/* if */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="if-statement">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Route className="w-5 h-5" /> 1. The <code>if</code> Statement
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The simplest form. The indented block runs <strong>only if</strong> the
                        condition is <code>True</code>. If it's <code>False</code>, Python just
                        skips the block entirely and moves on.
                    </p>
                    <CodeBlock code={`age = 20\n\nif age >= 18:\n    print("You are eligible to vote!")\n\nprint("Program continues here regardless.")`} />
                    <div className="pt-1 text-sm text-slate-600 dark:text-slate-350">
                        <strong>Key rule:</strong> The colon <code>:</code> and consistent
                        indentation (usually 4 spaces) are mandatory — this is how Python
                        knows what belongs inside the <code>if</code> block.
                    </div>
                </div>

                {/* if-else */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="if-else-statement">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <GitFork className="w-5 h-5" /> 2. The <code>if-else</code> Statement
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Use this when there are exactly <strong>two</strong> possible outcomes.
                        If the condition is <code>True</code>, the <code>if</code> block runs.
                        Otherwise, the <code>else</code> block runs. Exactly one of them always
                        executes.
                    </p>
                    <CodeBlock code={`age = 15\n\nif age >= 18:\n    print("You can vote.")\nelse:\n    print("You are too young to vote.")\n\n# Output: You are too young to vote.`} />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                        <div className="flex items-center gap-2 border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/20 dark:bg-emerald-950/10 p-3 rounded-lg text-sm text-emerald-700 dark:text-emerald-400">
                            <CheckCircle2 className="w-4 h-4 shrink-0" />
                            <span>Condition True &rarr; <code>if</code> block runs</span>
                        </div>
                        <div className="flex items-center gap-2 border border-rose-100 dark:border-rose-950/30 bg-rose-50/20 dark:bg-rose-950/10 p-3 rounded-lg text-sm text-rose-700 dark:text-rose-400">
                            <XCircle className="w-4 h-4 shrink-0" />
                            <span>Condition False &rarr; <code>else</code> block runs</span>
                        </div>
                    </div>
                </div>

                {/* elif */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="elif-ladder">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 3. The <code>elif</code> Ladder
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Short for <strong>"else if"</strong>. Use this when you have{" "}
                        <strong>more than two</strong> possible outcomes. Python checks each
                        condition <strong>top to bottom</strong> and runs the block for the{" "}
                        <strong>first one</strong> that is <code>True</code>, then skips the rest —
                        even if a later condition would also be true.
                    </p>
                    <CodeBlock code={`marks = 72\n\nif marks >= 90:\n    grade = "A+"\nelif marks >= 75:\n    grade = "A"\nelif marks >= 60:\n    grade = "B"\nelif marks >= 40:\n    grade = "C"\nelse:\n    grade = "Fail"\n\nprint(grade)\n# Output: B  (72 >= 60 is the first true condition)`} />
                    <div className="pt-2 text-sm">
                        <span className="bg-sky-50 dark:bg-sky-950/30 text-sky-700 dark:text-sky-400 px-2.5 py-1 rounded-md font-semibold mr-2 border border-sky-100 dark:border-sky-900/30">
                            Remember:
                        </span>
                        Only <strong>one</strong> block in the whole ladder ever runs — the
                        first match wins, and Python stops checking after that.
                    </div>
                </div>

                {/* nested if */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="nested-if">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Workflow className="w-5 h-5" /> 4. Nested <code>if</code> Statements
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        An <code>if</code> statement placed <strong>inside</strong> another{" "}
                        <code>if</code> (or <code>else</code>) block. Use this when a second
                        decision only makes sense <strong>after</strong> the first condition is
                        already true — like checking eligibility, then checking a further rule.
                    </p>
                    <CodeBlock code={`age = 20\nhas_id = True\n\nif age >= 18:\n    print("Age requirement met.")\n    if has_id:\n        print("You may enter the venue.")\n    else:\n        print("You need a valid ID to enter.")\nelse:\n    print("You are not old enough to enter.")\n\n# Output:\n# Age requirement met.\n# You may enter the venue.`} />
                    <div className="pt-1 text-sm text-slate-600 dark:text-slate-350">
                        <strong>Watch the indentation!</strong> Each level of nesting needs its
                        own extra indent — this is what tells Python which <code>if</code> the
                        inner block belongs to.
                    </div>
                </div>

                {/* Summary table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <ListChecks className="w-4 h-4" /> Quick Reference Table
                    </h4>
                    <NoteTable headers={summaryHeaders} rows={summaryRows} />
                </div>
            </div>
        </section>
    );
};

export default Conditionals;