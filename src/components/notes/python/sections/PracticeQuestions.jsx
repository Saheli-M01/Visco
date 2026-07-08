import React from "react";
import CodeBlock from "../../shared/CodeBlock";

const PracticeQuestions = () => {
  return (
    <section id="practice-questions" className="scroll-mt-20 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        9. Practice Questions
      </h1>

      <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
        Try to solve these fun practice questions to test your Python knowledge!
      </p>

      <div className="space-y-6">
        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-850 dark:text-slate-200">
            Question 1: What is the output?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350">
            What will the following code print?
          </p>
          <CodeBlock code={`print("Fun" * 2 + "Code")`} />
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Answer:</strong> <code>FunFunCode</code>
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-850 dark:text-slate-200">
            Question 2: Correct the Error
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350">
            The following code raises a <code>TypeError</code>. How do you fix it?
          </p>
          <CodeBlock code={`score = 100\nprint("Your score is: " + score)`} />
          <p className="text-sm text-slate-750 text-slate-700 dark:text-slate-300 leading-relaxed">
            <strong>Answer:</strong> Convert score to string using <code>str(score)</code>: <br />
            <code>print("Your score is: " + str(score))</code> or use an f-string: <br />
            <code>{`print(f"Your score is: {score}")`}</code>.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-850 dark:text-slate-200">
            Question 3: True or False?
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350">
            In Python, can you use <code>class = "Math"</code> to name a variable?
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Answer:</strong> <strong>False</strong>. <code>class</code> is a reserved keyword in Python and cannot be used as an identifier/variable name.
          </p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-800 rounded-xl p-5 space-y-3">
          <h3 className="text-base font-bold text-slate-850 dark:text-slate-200">
            Question 4: Memory Match
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350">
            If you write <code>x = [1, 2]</code> and <code>y = x</code>, does modifying <code>y</code> change <code>x</code>?
          </p>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            <strong>Answer:</strong> <strong>Yes</strong>. Lists are mutable and assigning <code>y = x</code> creates a shared reference pointing to the same list object in memory.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PracticeQuestions;
