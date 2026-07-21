// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import {
    SplitSquareVertical,
    Layers3,
    Combine,
    ShieldQuestion,
    ListChecks,
    Sparkles,
} from "lucide-react";

const MatchCase = () => {
    const compareHeaders = ["Feature", "if-elif-else", "match-case"];
    const compareRows = [
        ["Best for", "Range/inequality checks (age >= 18)", "Checking one value against many exact options"],
        ["Readability with many options", "Gets long and repetitive", "Cleaner, reads like a menu of cases"],
        ["Pattern matching (unpacking)", "Not built-in", "Supported natively"],
        ["Python version", "All versions", "Python 3.10 and above only"],
    ];

    return (
        <section id="match-case" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-rose-500 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <SplitSquareVertical className="w-8 h-8" /> Match-Case: Python's Switch Statement
                </h1>
                <p className="text-fuchsia-50 mt-1 text-sm">
                    A cleaner way to compare one value against many possibilities.
                </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    If you've used <code>switch</code> in other languages like C, Java, or
                    JavaScript — <code>match-case</code> is Python's equivalent, introduced in{" "}
                    <strong>Python 3.10</strong>. Instead of a long chain of{" "}
                    <code>elif</code> checks against the same variable, you write a single
                    <code>match</code> block with cleanly listed <code>case</code> options.
                </p>
            </div>

            <div className="space-y-5">
                <h2 className="text-xl font-bold text-fuchsia-700 dark:text-fuchsia-400 flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> How Match-Case Works
                </h2>

                {/* Basic syntax */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="basic-match">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Layers3 className="w-5 h-5" /> 1. Basic Syntax
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Python checks the value against each <code>case</code>, top to bottom,
                        and runs the block of the <strong>first match</strong> — exactly like
                        an <code>elif</code> ladder, just laid out differently.
                    </p>
                    <CodeBlock code={`day = 3\n\nmatch day:\n    case 1:\n        print("Monday")\n    case 2:\n        print("Tuesday")\n    case 3:\n        print("Wednesday")\n    case 4:\n        print("Thursday")\n    case 5:\n        print("Friday")\n\n# Output: Wednesday`} />
                </div>

                {/* Wildcard */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="wildcard-case">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <ShieldQuestion className="w-5 h-5" /> 2. The Wildcard <code>case _</code>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The underscore <code>_</code> acts like a <strong>default / else</strong>{" "}
                        branch. It matches <strong>anything</strong> that didn't match an earlier
                        case — so it should always go <strong>last</strong>.
                    </p>
                    <CodeBlock code={`day = 9\n\nmatch day:\n    case 1:\n        print("Monday")\n    case 2:\n        print("Tuesday")\n    case _:\n        print("Not a valid day number")\n\n# Output: Not a valid day number`} />
                </div>

                {/* OR patterns */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="or-patterns">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Combine className="w-5 h-5" /> 3. Combining Options with <code>|</code>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Use the pipe symbol <code>|</code> (meaning "or") to group several
                        values that should trigger the <strong>same</strong> block, so you
                        don't need to repeat the same code for each one.
                    </p>
                    <CodeBlock code={`day = 6\n\nmatch day:\n    case 1 | 2 | 3 | 4 | 5:\n        print("Weekday")\n    case 6 | 7:\n        print("Weekend")\n    case _:\n        print("Invalid day")\n\n# Output: Weekend`} />
                </div>

                {/* Guard condition */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="guard-conditions">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 4. Guard Conditions with <code>if</code>
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        You can add an extra <code>if</code> check right after a case pattern.
                        The case only matches when <strong>both</strong> the pattern and the
                        guard condition are true — this brings range-style checks into
                        match-case.
                    </p>
                    <CodeBlock code={`marks = 82\n\nmatch marks:\n    case m if m >= 90:\n        print("Grade: A+")\n    case m if m >= 75:\n        print("Grade: A")\n    case m if m >= 60:\n        print("Grade: B")\n    case _:\n        print("Grade: Below B")\n\n# Output: Grade: A  (82 >= 75 is the first true guard)`} />
                </div>

                {/* Comparison table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <ListChecks className="w-4 h-4" /> match-case vs. if-elif-else
                    </h4>
                    <NoteTable headers={compareHeaders} rows={compareRows} />
                </div>
            </div>
        </section>
    );
};

export default MatchCase;