// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import { NotebookPen, Sparkles, Signal, Lightbulb } from "lucide-react";

const DifficultyBadge = ({ level }) => {
    const styles = {
        Easy: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
        Medium: "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800",
        Hard: "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    };
    return (
        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${styles[level]}`}>
            <Signal className="w-3 h-3" /> {level}
        </span>
    );
};

const Question = ({ number, title, level, prompt, code, answer }) => (
    <div className="bg-white dark:bg-slate-900/30 border-2 border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3 shadow-sm">
        <div className="flex items-center justify-between gap-2 flex-wrap">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                Question {number}: {title}
            </h3>
            <DifficultyBadge level={level} />
        </div>
        {prompt && (
            <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">{prompt}</p>
        )}
        {code && <CodeBlock code={code} />}
        <div className="flex items-start gap-2 bg-sky-50 dark:bg-sky-950/20 border border-sky-100 dark:border-sky-900/40 rounded-lg p-3">
            <Lightbulb className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0 text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                {answer}
            </div>
        </div>
    </div>
);

const PracticeQuestions2 = () => {
    return (
        <section id="practice-questions-2" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <NotebookPen className="w-8 h-8" /> Practice Questions: Conditionals & Match-Case
                </h1>
                <p className="text-violet-50 mt-1 text-sm">
                    Try to solve these questions on your own first! Write the code in Python and check
                    your answers.
                </p>
            </div>

            {/* Easy */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Easy Level Questions (1-4)
                </h2>

                <Question
                    number={1}
                    title="Simple if Statement"
                    level="Easy"
                    prompt="Check if a number is positive. Set number = 7 and print 'Positive number' only if it is greater than 0."
                    answer={
                        <CodeBlock code={`number = 7\n\nif number > 0:\n    print("Positive number")\n\n# Output: Positive number`} />
                    }
                />

                <Question
                    number={2}
                    title="if-else: Even or Odd"
                    level="Easy"
                    prompt="Write a program using if-else to check whether a number is even or odd."
                    code={`num = 9`}
                    answer={
                        <CodeBlock code={`num = 9\n\nif num % 2 == 0:\n    print("Even")\nelse:\n    print("Odd")\n\n# Output: Odd`} />
                    }
                />

                <Question
                    number={3}
                    title="elif: Grading a Score"
                    level="Easy"
                    prompt="What will this code print?"
                    code={`marks = 55\n\nif marks >= 80:\n    print("A")\nelif marks >= 60:\n    print("B")\nelif marks >= 40:\n    print("C")\nelse:\n    print("Fail")`}
                    answer={<span><strong>Output:</strong> C <br />Explanation: 55 is not &ge; 80 or &ge; 60, but it is &ge; 40, so the third condition is the first true one.</span>}
                />

                <Question
                    number={4}
                    title="Basic match-case"
                    level="Easy"
                    prompt="Use match-case to print the name of a traffic light color. Set signal = 'red'."
                    answer={
                        <CodeBlock code={`signal = "red"\n\nmatch signal:\n    case "red":\n        print("Stop")\n    case "yellow":\n        print("Get ready")\n    case "green":\n        print("Go")\n\n# Output: Stop`} />
                    }
                />
            </div>

            {/* Medium */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Medium Level Questions (5-7)
                </h2>

                <Question
                    number={5}
                    title="Nested if: Login Check"
                    level="Medium"
                    prompt="Write a nested if to check login access: a user needs both a correct username AND a correct password to log in. If the username is wrong, don't even check the password."
                    answer={
                        <CodeBlock code={`username = "admin"\npassword = "wrong123"\n\nif username == "admin":\n    if password == "admin123":\n        print("Login successful")\n    else:\n        print("Incorrect password")\nelse:\n    print("Username not found")\n\n# Output: Incorrect password`} />
                    }
                />

                <Question
                    number={6}
                    title="elif Ladder Trace"
                    level="Medium"
                    prompt="Predict the output without running the code."
                    code={`temp = 30\n\nif temp > 35:\n    print("Very Hot")\nelif temp > 25:\n    print("Warm")\nelif temp > 15:\n    print("Cool")\nelse:\n    print("Cold")`}
                    answer={<span><strong>Output:</strong> Warm <br />Explanation: 30 is not &gt; 35, but it is &gt; 25 &mdash; so this branch runs, and the rest are skipped even though 30 &gt; 15 is also technically true.</span>}
                />

                <Question
                    number={7}
                    title="match-case with OR patterns"
                    level="Medium"
                    prompt="Write a match-case that prints 'Weekend' for Saturday/Sunday and 'Weekday' for Monday through Friday, using day numbers 1-7 (1 = Monday)."
                    code={`day = 7`}
                    answer={
                        <CodeBlock code={`day = 7\n\nmatch day:\n    case 1 | 2 | 3 | 4 | 5:\n        print("Weekday")\n    case 6 | 7:\n        print("Weekend")\n    case _:\n        print("Invalid day")\n\n# Output: Weekend`} />
                    }
                />
            </div>

            {/* Hard */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Hard Level Questions (8-10)
                </h2>

                <Question
                    number={8}
                    title="Nested if-elif Combo"
                    level="Hard"
                    prompt="A ticket price depends on age AND whether it's a weekend. Kids (under 12) always pay ₹100. Adults pay ₹300 on weekdays and ₹400 on weekends. Trace the output."
                    code={`age = 25\nis_weekend = True\n\nif age < 12:\n    price = 100\nelse:\n    if is_weekend:\n        price = 400\n    else:\n        price = 300\n\nprint(price)`}
                    answer={<span><strong>Output:</strong> 400 <br />Explanation: age is not &lt; 12, so we go to the nested check. is_weekend is True, so price = 400.</span>}
                />

                <Question
                    number={9}
                    title="match-case with Guard Condition"
                    level="Hard"
                    prompt="Predict the output. This assigns a shipping fee bracket based on order value using match-case guards."
                    code={`order_value = 1450\n\nmatch order_value:\n    case v if v >= 2000:\n        print("Free shipping")\n    case v if v >= 1000:\n        print("Shipping fee: 40")\n    case v if v >= 500:\n        print("Shipping fee: 70")\n    case _:\n        print("Shipping fee: 100")`}
                    answer={<span><strong>Output:</strong> Shipping fee: 40 <br />Explanation: 1450 is not &ge; 2000, but it is &ge; 1000, so that guard's case runs first and the rest are skipped.</span>}
                />

                <Question
                    number={10}
                    title="Deeply Nested if Brain Teaser"
                    level="Hard"
                    prompt="Predict the final printed message without running the code."
                    code={`score = 68\nattendance = 80\n\nif score >= 40:\n    if attendance >= 75:\n        if score >= 60:\n            print("Passed with Distinction")\n        else:\n            print("Passed")\n    else:\n        print("Failed due to low attendance")\nelse:\n    print("Failed due to low score")`}
                    answer={
                        <>
                            <p># Output: Passed with Distinction</p>
                            <p className="pt-2"># Explanation:</p>
                            <p># score &ge; 40 &rarr; True, enters first block</p>
                            <p># attendance &ge; 75 &rarr; True (80), enters second block</p>
                            <p># score &ge; 60 &rarr; True (68), so innermost condition wins</p>
                        </>
                    }
                />
            </div>
        </section>
    );
};

export default PracticeQuestions2;