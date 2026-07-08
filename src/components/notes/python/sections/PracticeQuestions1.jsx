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
      <div className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{answer}</div>
    </div>
  </div>
);

const PracticeQuestions = () => {
  return (
    <section id="practice-questions-1" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <NotebookPen className="w-8 h-8" /> Practice Questions
        </h1>
        <p className="text-violet-50 mt-1 text-sm">
          Try to solve these questions on your own first! Write the code in Python and check
          your answers. Remember, practice makes perfect.
        </p>
      </div>

      {/* Easy */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Easy Level Questions (1-4)
        </h2>

        <Question
          number={1}
          title="Simple Variable Assignment"
          level="Easy"
          prompt="Create a variable called age and assign it the value 12. Then print it."
          answer={
            <>
              <CodeBlock code={`age = 12\nprint(age)\n# Output: 12`} />
            </>
          }
        />

        <Question
          number={2}
          title="Basic Arithmetic"
          level="Easy"
          prompt="What will be the output of this code?"
          code={`x = 10\ny = 5\nresult = x + y\nprint(result)`}
          answer={<span><strong>Output:</strong> 15 <br />Explanation: 10 + 5 = 15</span>}
        />

        <Question
          number={3}
          title="String Concatenation"
          level="Easy"
          prompt='Create two variables: first_name = "Rohan" and last_name = "Sharma". Print the full name with a space between them.'
          answer={
            <CodeBlock code={`first_name = "Rohan"\nlast_name = "Sharma"\nfull_name = first_name + " " + last_name\nprint(full_name)\n# Output: Rohan Sharma`} />
          }
        />

        <Question
          number={4}
          title="Increment Operation"
          level="Easy"
          prompt="You have 10 apples. You buy 5 more. How would you update the variable using the += operator?"
          answer={
            <CodeBlock code={`apples = 10\napples += 5\nprint(apples)\n# Output: 15`} />
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
          title="Comparison Operators"
          level="Medium"
          prompt="What will be the output of this code?"
          code={`x = 15\ny = 10\nprint(x > y)\nprint(x == y)\nprint(x <= 15)`}
          answer={
            <>
              <p># Output:</p>
              <p>True &nbsp;# 15 is greater than 10</p>
              <p>False &nbsp;# 15 is not equal to 10</p>
              <p>True &nbsp;# 15 is less than or equal to 15</p>
            </>
          }
        />

        <Question
          number={6}
          title="Modulus Operator"
          level="Medium"
          prompt="Write a program to check if a number is even or odd using the modulus operator %. (Hint: Even numbers give remainder 0 when divided by 2)"
          answer={
            <CodeBlock code={`number = 17\nremainder = number % 2\n\nif remainder == 0:\n    print(number, "is Even")\nelse:\n    print(number, "is Odd")\n\n# Output: 17 is Odd`} />
          }
        />

        <Question
          number={7}
          title="Multiple Operations"
          level="Medium"
          prompt="Start with score = 100. Add 50, then subtract 30, then multiply by 2. What is the final score?"
          answer={
            <CodeBlock code={`score = 100\nscore += 50  # score = 150\nscore -= 30  # score = 120\nscore *= 2   # score = 240\nprint(score)\n# Output: 240`} />
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
          title="Logical Operators Challenge"
          level="Hard"
          prompt="What will be the output?"
          code={`a = True\nb = False\nc = True\n\nresult1 = a and b\nresult2 = a or b\nresult3 = not b\nresult4 = a and c\n\nprint(result1, result2, result3, result4)`}
          answer={
            <>
              <p># Output: False True True True</p>
              <p className="pt-2"># Explanation:</p>
              <p># result1 = True and False = False (both must be True)</p>
              <p># result2 = True or False = True (at least one is True)</p>
              <p># result3 = not False = True (flips False to True)</p>
              <p># result4 = True and True = True (both are True)</p>
            </>
          }
        />

        <Question
          number={9}
          title="Floor Division and Modulus"
          level="Hard"
          prompt="You have 17 chocolates and want to distribute them equally among 5 friends. How many chocolates does each friend get? How many are left over?"
          answer={
            <CodeBlock code={`chocolates = 17\nfriends = 5\n\neach_gets = chocolates // 5  # Floor division\nleft_over = chocolates % 5   # Modulus (remainder)\n\nprint("Each friend gets:", each_gets)\nprint("Left over:", left_over)\n\n# Output:\n# Each friend gets: 3\n# Left over: 2`} />
          }
        />

        <Question
          number={10}
          title="Mixed Operations Brain Teaser"
          level="Hard"
          prompt="Predict the output without running the code:"
          code={`x = 10\ny = 3\n\nresult1 = x ** y\nresult2 = x % y\nresult3 = x // y\nresult4 = x / y\n\nprint(result1)\nprint(result2)\nprint(result3)\nprint(result4)`}
          answer={
            <>
              <p># Output:</p>
              <p>1000 &nbsp;# 10 ** 3 = 10 × 10 × 10 = 1000 (Exponent)</p>
              <p>1 &nbsp;# 10 % 3 = 1 (Remainder when 10 is divided by 3)</p>
              <p>3 &nbsp;# 10 // 3 = 3 (Floor division - drops decimal)</p>
              <p>3.3333... &nbsp;# 10 / 3 = 3.333... (Normal division)</p>
              <p className="pt-2"># Explanation:</p>
              <p># ** is power/exponent operator</p>
              <p># % gives remainder</p>
              <p># // gives quotient without decimal</p>
              <p># / gives exact division with decimal</p>
            </>
          }
        />
      </div>
    </section>
  );
};

export default PracticeQuestions;