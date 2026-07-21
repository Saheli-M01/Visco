// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
  Link2,
  Repeat,
  Table2,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Zap,
  Terminal,
  Wrench,
} from "lucide-react";

const StringConcatenation = () => {
  const summaryHeaders = ["Operation", "Example", "Result"];
  const summaryRows = [
    ["Join two strings", <code>"Hello" + "World"</code>, <code>"HelloWorld"</code>],
    ["Join with space", <code>"Hello" + " " + "World"</code>, <code>"Hello World"</code>],
    ["Repeat string", <code>"Hi" * 3</code>, <code>"HiHiHi"</code>],
    ["Mix strings and variables", <code>"Age: " + str(15)</code>, <code>"Age: 15"</code>],
  ];

  const fstringHeaders = ["Style", "Example", "Output"];
  const fstringRows = [
    ["f-string (modern)", <code>{`f"Hello, {name}!"`}</code>, <code>"Hello, Rahul!"</code>],
    ["+ operator (old way)", <code>"Hello, " + name + "!"</code>, <code>"Hello, Rahul!"</code>],
    ["f-string with math", <code>{`f"2 + 2 = {2 + 2}"`}</code>, <code>"2 + 2 = 4"</code>],
    ["f-string with rounding", <code>{`f"{3.14159:.2f}"`}</code>, <code>"3.14"</code>],
  ];

  const methodHeaders = ["Method", "What it does", "Example", "Output"];
  const methodRows = [
    [<code>upper()</code>, "All UPPERCASE letters", <code>"hello".upper()</code>, <code>"HELLO"</code>],
    [<code>lower()</code>, "All lowercase letters", <code>"HELLO".lower()</code>, <code>"hello"</code>],
    [<code>title()</code>, "First letter of each word capitalized", <code>"hello world".title()</code>, <code>"Hello World"</code>],
    [<code>strip()</code>, "Remove spaces from both ends", <code>"  hi  ".strip()</code>, <code>"hi"</code>],
    [<code>replace(a, b)</code>, "Replace text a with text b", <code>"cat".replace("c","b")</code>, <code>"bat"</code>],
    [<code>find(text)</code>, "Position of first match (-1 if not found)", <code>"Python".find("th")</code>, <code>2</code>],
    [<code>count(text)</code>, "How many times text appears", <code>"banana".count("a")</code>, <code>3</code>],
    [<code>split(sep)</code>, "Break string into a list of pieces", <code>"a,b,c".split(",")</code>, <code>["a","b","c"]</code>],
    [<code>startswith(t)</code>, "Does it begin with this?", <code>"Python".startswith("Py")</code>, <code>True</code>],
    [<code>endswith(t)</code>, "Does it end with this?", <code>"Python".endswith("on")</code>, <code>True</code>],
    [<code>len(s)</code>, "Number of characters (built-in)", <code>len("Hello")</code>, <code>5</code>],
  ];

  const printHeaders = ["Argument", "Purpose", "Example"];
  const printRows = [
    [<code>sep=</code>, "Custom separator between multiple values (default is a space)", <code>print("a","b","c", sep="-")</code>],
    [<code>end=</code>, "What to print at the end (default is newline \\n)", <code>print("Hi", end="!")</code>],
    [<code>sep="" </code>, "Print values with no gap between them", <code>print("2","+"," 2", sep="")</code>],
  ];

  return (
    <section id="string-concatenation" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-fuchsia-500 to-pink-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Link2 className="w-8 h-8" /> Strings: Joining, Formatting & Methods
        </h1>
        <p className="text-fuchsia-50 mt-1 text-sm">
          Everything you need to work with text in Python — from basic joining to
          modern f-strings and useful string methods.
        </p>
      </div>

      {/* ══════════════════ PART 1: STRING CONCATENATION ══════════════════ */}
      <div
        id="string-concat"
        className="rounded-xl border-2 border-fuchsia-200 dark:border-fuchsia-800 bg-fuchsia-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-bold text-fuchsia-700 dark:text-fuchsia-400 flex items-center gap-2">
          <Link2 className="w-5 h-5" /> 1. String Concatenation (Joining with +)
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>String Concatenation</strong> means joining two or more strings
          together using the <code>+</code> operator.
        </p>

        <CodeBlock
          code={`# Joining two strings
first_name = "Rohan"
last_name = "Sharma"
full_name = first_name + " " + last_name
print(full_name)
# Output: Rohan Sharma

# Building a sentence
city = "Mumbai"
sentence = "I live in " + city + "."
print(sentence)
# Output: I live in Mumbai.

# Joining multiple strings
greeting = "Hello"
name = "Priya"
message = greeting + ", " + name + "! Welcome to Python."
print(message)
# Output: Hello, Priya! Welcome to Python.`}
        />

        <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <Repeat className="w-5 h-5" /> Repeating Strings with *
          </h3>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
            Use the <code>*</code> operator to repeat a string multiple times.
          </p>
          <CodeBlock
            code={`star = "*"
print(star * 5)       # Output: *****
print("-" * 20)       # Output: --------------------
print("Ha" * 3)       # Output: HaHaHa`}
          />
        </div>

        {/* Summary table */}
        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Table2 className="w-5 h-5" /> Quick Reference
          </h3>
          <NoteTable headers={summaryHeaders} rows={summaryRows} />
        </div>

        {/* Converting numbers warning */}
        <Infobox type="warning" title="You Cannot Mix Strings and Numbers Directly">
          You <strong>cannot</strong> concatenate a string with a number using{" "}
          <code>+</code>. You must first convert the number to a string using{" "}
          <code>str()</code>.
        </Infobox>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
              <XCircle className="w-5 h-5" /> Wrong (causes TypeError)
            </h3>
            <CodeBlock code={`age = 12\ntext = "I am " + age  # Error!`} />
          </div>
          <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
            <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" /> Correct Way
            </h3>
            <CodeBlock
              code={`age = 12\ntext = "I am " + str(age)\nprint(text)\n# Output: I am 12`}
            />
          </div>
        </div>
      </div>

      {/* ══════════════════ PART 2: F-STRINGS ══════════════════ */}
      <div
        id="f-strings"
        className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> 2. f-Strings — The Modern Way (Recommended)
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An <strong>f-string</strong> (formatted string literal) is the cleanest way to
          embed variables and expressions directly inside a string. Just put an{" "}
          <code>f</code> before the opening quote, then wrap your variable or expression
          in curly braces <code>{`{ }`}</code>.
        </p>

        <CodeBlock
          code={`# Basic f-string — put f before the quote, {variable} inside
name = "Rahul"
age = 15

print(f"Hello, {name}!")
# Output: Hello, Rahul!

print(f"My name is {name} and I am {age} years old.")
# Output: My name is Rahul and I am 15 years old.`}
        />

        <Infobox type="tip" title="f-string vs + operator">
          Both produce the same result, but f-strings are easier to read and you
          never need to call <code>str()</code> — Python handles it automatically.
        </Infobox>

        <div className="space-y-3">
          <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400">
            Expressions inside f-strings
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            You can put <strong>any expression</strong> inside the curly braces, not just
            variables — math, function calls, comparisons, anything:
          </p>
          <CodeBlock
            code={`price = 49.99
quantity = 3

# Math inside {}
print(f"Total: {price * quantity}")
# Output: Total: 149.97

# Round to 2 decimal places with :.2f
print(f"Total: {price * quantity:.2f}")
# Output: Total: 149.97

marks = 82
# Conditional expression inside {}
print(f"Result: {'Pass' if marks >= 40 else 'Fail'}")
# Output: Result: Pass

# Calling a function inside {}
word = "python"
print(f"Uppercase: {word.upper()}")
# Output: Uppercase: PYTHON`}
          />
        </div>

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Table2 className="w-5 h-5" /> f-string Comparison Table
          </h3>
          <NoteTable headers={fstringHeaders} rows={fstringRows} />
        </div>

        <Infobox type="info" title="Why You Will See f-strings Everywhere">
          From this point in the notes, almost every code example uses f-strings
          because they are the standard in modern Python (Python 3.6+). Once you
          get used to the <code>f"...{`{variable}`}..."</code> syntax, you will find
          it much easier than manually building strings with <code>+</code>.
        </Infobox>
      </div>

      {/* ══════════════════ PART 3: PRINT() IN DETAIL ══════════════════ */}
      <div
        id="print-function"
        className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Terminal className="w-5 h-5" /> 3. The print() Function — In More Detail
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          You have been using <code>print()</code> since the beginning. Let's understand
          its optional arguments that give you more control over the output.
        </p>

        <CodeBlock
          code={`# Printing multiple values — Python separates them with a space by default
print("Hello", "World", "Python")
# Output: Hello World Python

# sep= — change the separator between values
print("Hello", "World", "Python", sep="-")
# Output: Hello-World-Python

print("2024", "07", "18", sep="/")
# Output: 2024/07/18

print("a", "b", "c", sep="")    # no gap at all
# Output: abc

# end= — change what comes after the print (default is a newline)
print("Loading", end="...")
print(" done!")
# Output: Loading... done!   (both on the same line)

# Printing in a loop on one line
for i in range(1, 6):
    print(i, end=" ")
# Output: 1 2 3 4 5`}
        />

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Table2 className="w-5 h-5" /> print() Optional Arguments
          </h3>
          <NoteTable headers={printHeaders} rows={printRows} />
        </div>
      </div>

      {/* ══════════════════ PART 4: STRING METHODS ══════════════════ */}
      <div
        id="string-methods"
        className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm"
      >
        <h2 className="text-xl font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> 4. Useful String Methods
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          A <strong>string method</strong> is a built-in action you can perform on
          any string. You call it using a dot <code>.</code> after the string or
          variable: <code>variable.method()</code>.
        </p>

        <CodeBlock
          code={`text = "  Hello, Python World!  "

# Case methods
print(text.upper())      # "  HELLO, PYTHON WORLD!  "
print(text.lower())      # "  hello, python world!  "
print(text.title())      # "  Hello, Python World!  "

# Cleaning up spaces
print(text.strip())      # "Hello, Python World!"  (removes both sides)

# Finding and replacing
print(text.find("Python"))   # 9  (position where "Python" starts)
print(text.replace("Python", "Java"))
# "  Hello, Java World!  "

# Counting occurrences
sentence = "she sells seashells by the seashore"
print(sentence.count("sea"))   # 2

# Splitting a string into a list
csv = "apple,banana,cherry"
fruits = csv.split(",")
print(fruits)   # ['apple', 'banana', 'cherry']

# Check start/end
filename = "report.pdf"
print(filename.endswith(".pdf"))    # True
print(filename.startswith("rep"))   # True

# Length (built-in function, not a method)
print(len("Python"))   # 6`}
        />

        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Table2 className="w-5 h-5" /> String Methods Quick Reference
          </h3>
          <NoteTable headers={methodHeaders} rows={methodRows} />
        </div>

        <Infobox type="info" title="Strings are Immutable">
          String methods do <strong>not</strong> change the original string — they
          always <strong>return a new string</strong>. To use the result, assign it to
          a variable: <code>name = name.strip()</code>.
        </Infobox>

        {/* Practical combining example */}
        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
          <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" /> Putting It All Together
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-350 leading-relaxed">
            A practical example combining f-strings and string methods:
          </p>
          <CodeBlock
            code={`# User input might have extra spaces or mixed case
raw_name = "  rahul sharma  "
raw_score = 87

# Clean and format
name = raw_name.strip().title()   # "Rahul Sharma"

print(f"Student: {name}")
print(f"Score: {raw_score}/100")
print(f"Grade: {'A' if raw_score >= 80 else 'B'}")
print(f"Name length: {len(name)} characters")
print(f"Initials: {name[0]}.{name.split()[1][0]}.")

# Output:
# Student: Rahul Sharma
# Score: 87/100
# Grade: A
# Name length: 12 characters
# Initials: R.S.`}
          />
        </div>
      </div>
    </section>
  );
};

export default StringConcatenation;
