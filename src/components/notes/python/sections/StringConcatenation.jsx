import React from "react";
import CodeBlock from "../../shared/CodeBlock";

const StringConcatenation = () => {
  return (
    <section id="string-concatenation" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        8. String Concatenation & Formatting
      </h1>

      <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
        <strong>String Concatenation</strong> means combining two or more strings together to make a longer string using the <code>+</code> operator.
      </p>

      <CodeBlock
        code={`greeting = "Hello"\nname = "Riya"\n\n# Combine them with a space\nmessage = greeting + ", " + name + "!"\nprint(message)\n# Output: Hello, Riya!`}
      />

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          String Repetition
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          You can repeat a string multiple times using the multiplication <code>*</code> operator with an integer:
        </p>
        <CodeBlock code={`print("Python! " * 3)\n# Output: Python! Python! Python!`} />
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          Formatted Strings (f-strings)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          The easiest and most modern way to format strings in Python is using <strong>f-strings</strong>. Just place an <code>f</code> before the string quotes and put variables inside curly braces <code>{`{}`}</code>:
        </p>
        <CodeBlock
          code={`name = "Alex"\nage = 12\n\n# Using f-string\ninfo = f"My name is {name} and I am {age} years old."\nprint(info)\n# Output: My name is Alex and I am 12 years old.`}
        />
      </div>
    </section>
  );
};

export default StringConcatenation;
