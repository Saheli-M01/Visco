import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import {
  Puzzle,
  Tag,
  KeyRound,
  Hash,
  Calculator,
  Equal,
  Scale,
  ListTree,
  AlignLeft,
  ListChecks,
  CheckCircle2,
  XCircle,
} from "lucide-react";

const Tokens = () => {
  const literalHeaders = ["Category", "Literal Type", "Description", "Quick Examples"];
  const literalRows = [
    [
      <strong>Numeric Literals</strong>,
      "Integer",
      "Whole numbers (no decimals)",
      <code>42, -10, 0</code>,
    ],
    [
      <strong>Numeric Literals</strong>,
      "Float",
      "Numbers with decimal point",
      <code>3.14, -0.5</code>,
    ],
    [
      <strong>Numeric Literals</strong>,
      "Complex",
      "Real + Imaginary (x + yj)",
      <code>3+4j, 5j</code>,
    ],
    [
      <strong>String Literals</strong>,
      "Single-line",
      "Text in quotes",
      <code>"Hello", 'Hi'</code>,
    ],
    [
      <strong>String Literals</strong>,
      "Multi-line",
      "Triple-quoted strings",
      <code>"""text"""</code>,
    ],
    [
      <strong>Boolean Literals</strong>,
      "Boolean",
      "Truth values",
      <code>True, False</code>,
    ],
    [
      <strong>Special Literals</strong>,
      "None",
      "Absence of value",
      <code>None</code>,
    ],
  ];

  const arithHeaders = ["Operator", "Name", "Example", "Output"];
  const arithRows = [
    [<code>+</code>, "Addition", <code>print(10 + 5)</code>, <strong>15</strong>],
    [<code>-</code>, "Subtraction", <code>print(10 - 5)</code>, <strong>5</strong>],
    [<code>*</code>, "Multiplication", <code>print(10 * 5)</code>, <strong>50</strong>],
    [<code>/</code>, "Division", <code>print(10 / 4)</code>, <strong>2.5</strong>],
    [<code>%</code>, "Modulus (Remainder)", <code>print(10 % 3)</code>, <span><strong>1</strong> (3 goes into 10 three times, leaving 1)</span>],
    [<code>**</code>, "Exponent (Power)", <code>print(2 ** 3)</code>, <span><strong>8</strong> (2 × 2 × 2)</span>],
    [<code>//</code>, "Floor Division", <code>print(10 // 4)</code>, <span><strong>2</strong> (drops decimal part)</span>],
  ];

  const assignHeaders = ["Operator", "Description", "Example", "Result"];
  const assignRows = [
    [<code>=</code>, "Simple Assignment", <code>x = 5</code>, <span><code>x</code> is now <strong>5</strong></span>],
    [<code>+=</code>, "Add and update", <code>x += 3</code>, <span><code>x</code> becomes <strong>8</strong> (adds 3 to 5)</span>],
    [<code>-=</code>, "Subtract and update", <code>x -= 2</code>, <span><code>x</code> becomes <strong>6</strong> (subtracts 2 from 8)</span>],
    [<code>*=</code>, "Multiply and update", <code>x *= 2</code>, <span><code>x</code> becomes <strong>12</strong> (multiplies 6 by 2)</span>],
    [<code>/=</code>, "Divide and update", <code>x /= 3</code>, <span><code>x</code> becomes <strong>4.0</strong> (divides 12 by 3)</span>],
    [<code>%=</code>, "Modulus and update", <code>x %= 3</code>, <span><code>x</code> becomes remainder value</span>],
    [<code>//=</code>, "Floor divide and update", <code>x //= 2</code>, <span><code>x</code> becomes floor division result</span>],
    [<code>**=</code>, "Exponent and update", <code>x **= 2</code>, <span><code>x</code> becomes squared value</span>],
  ];

  const compHeaders = ["Operator", "Description", "Example", "Output"];
  const compRows = [
    [<code>==</code>, "Is it equal to?", <code>print(x == y)</code>, <strong>False</strong>],
    [<code>!=</code>, "Is it NOT equal to?", <code>print(x != y)</code>, <strong>True</strong>],
    [<code>&gt;</code>, "Is it greater than?", <code>print(x &gt; y)</code>, <strong>True</strong>],
    [<code>&lt;</code>, "Is it less than?", <code>print(x &lt; y)</code>, <strong>False</strong>],
    [<code>&gt;=</code>, "Greater than or equal to?", <code>print(x &gt;= 10)</code>, <strong>True</strong>],
    [<code>&lt;=</code>, "Less than or equal to?", <code>print(y &lt;= 3)</code>, <strong>False</strong>],
  ];

  const logicalHeaders = ["Operator", "Description"];
  const logicalRows = [
    [<code>and</code>, <span>Returns <code>True</code> <strong>only if BOTH sides are true</strong></span>],
    [<code>or</code>, <span>Returns <code>True</code> <strong>if AT LEAST ONE side is true</strong></span>],
    [<code>not</code>, "Completely flips the logic value (turns True to False, and False to True)"],
  ];

  const summaryHeaders = ["Token Type", "What it does", "Real-world Sample"];
  const summaryRows = [
    [<strong>1. Identifiers</strong>, "Names you give to variables or functions.", <code>student_name</code>],
    [<strong>2. Keywords</strong>, "Special words that belong entirely to Python.", <code>if, else</code>],
    [<strong>3. Literals</strong>, "Fixed values like numbers or raw text words.", <code>5, "Hello"</code>],
    [<strong>4. Operators</strong>, "Math and comparison symbols to calculate values.", <code>+, &gt;, ==</code>],
    [<strong>5. Delimiters</strong>, "Punctuation marks that separate code groupings.", <code>( ), [ ], :</code>],
    [<strong>6. Comments</strong>, "Notes written in the code for explanation. Ignored by Python.", <code># This is a comment</code>],
  ];

  return (
    <section id="tokens" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Puzzle className="w-8 h-8" /> Tokens: The Building Blocks of Code
        </h1>
        <p className="text-emerald-50 mt-1 text-sm">
          Every Python program is made of these six little pieces.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Just like English sentences are built out of words, a Python program is
          built out of <strong>Tokens</strong>. A token is the smallest individual
          puzzle piece of code that the computer can recognize.
        </p>
      </div>

      <div className="space-y-5">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <ListChecks className="w-5 h-5" /> The 6 Types of Tokens
        </h2>

        {/* Identifiers */}
        <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="identifiers">
          <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
            <Tag className="w-5 h-5" /> 1. Identifiers
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            - Identifiers are the custom names you make up. <br />
            - That means identifiers is the name given to any component of python
            program. Identifiers are the names used to identify variables, functions,
            classes, modules, or other objects. <br />
            Think of the strict rules for picking a game username:
          </p>
          <ul className="list-disc pl-6 space-y-1 text-slate-600 dark:text-slate-350">
            <li>Can use letters (<code>A–Z</code>, <code>a–z</code>), digits (<code>0–9</code>), and underscores (<code>_</code>).</li>
            <li>Must <strong>never</strong> start with a number.</li>
            <li>Cannot contain empty spaces or weird symbols (like <code>@</code>, <code>-</code>, <code>$</code>).</li>
            <li>Cannot use Python's special reserved keywords.</li>
            <li>They are case-sensitive! <code>age</code>, <code>Age</code>, and <code>AGE</code> are three different names.</li>
          </ul>
          <div className="pt-2 text-sm">
            <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 px-2.5 py-1 rounded-md font-semibold mr-2 border border-emerald-100 dark:border-emerald-900/30">
              Valid Examples:
            </span>
            <code>age</code>, <code>student_name</code>, <code>marks1</code>, <code>_total</code>
          </div>
          <div className="pt-2 text-sm">
            <span className="bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 px-2.5 py-1 rounded-md font-semibold mr-2 border border-rose-100 dark:border-rose-900/30">
              Invalid Examples:
            </span>
            <code>1age</code> (starts with digit), <code>student-name</code> (hyphen), <code>my name</code> (space), <code>if</code> (keyword)
          </div>
        </div>

        {/* Keywords */}
        <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="keywords">
          <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
            <KeyRound className="w-5 h-5" /> 2. Keywords
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            Keywords are words reserved by Python for its system logic. You aren't
            allowed to use them as variable names!
          </p>
          <p className="text-slate-600 dark:text-slate-350 font-medium">
            Common Keywords: <code>if</code>, <code>else</code>, <code>for</code>, <code>while</code>, <code>import</code>, <code>True</code>, <code>False</code>, <code>None</code>
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2 border border-rose-100 dark:border-rose-950/30 bg-rose-50/20 dark:bg-rose-950/10 p-3 rounded-lg text-sm text-rose-700 dark:text-rose-400">
              <XCircle className="w-4 h-4 shrink-0" />
              <span><span className="font-bold">Invalid:</span> <code>if = 10</code> (SyntaxError)</span>
            </div>
            <div className="flex items-center gap-2 border border-emerald-100 dark:border-emerald-950/30 bg-emerald-50/20 dark:bg-emerald-950/10 p-3 rounded-lg text-sm text-emerald-700 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span><span className="font-bold">Valid:</span> <code>age = 10</code></span>
            </div>
          </div>
        </div>

        {/* Literals */}
        <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="literals">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
            <Hash className="w-5 h-5" /> 3. Literals
          </h3>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            <strong>Literals</strong> are constant values specified directly in code.
            They represent fixed values that <strong>do not change</strong> during execution.
          </p>
          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            Python supports various literals: <strong>Numeric Literals</strong>, <strong>String Literals</strong>, <strong>Boolean Literals</strong>, and <strong>Special Literals</strong>.
          </p>

          <div className="space-y-3">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200">Types of Literals in Python</h4>
            <div className="pl-4 border-l-2 border-amber-200 dark:border-amber-800 space-y-4">
              <div>
                <h5 className="font-semibold text-slate-750 dark:text-slate-200">Numeric Literals</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-350">
                  <li><strong>Integers:</strong> Whole numbers. Example: <code>age = 12</code></li>
                  <li><strong>Floats:</strong> Decimals. Example: <code>pi = 3.14</code></li>
                  <li><strong>Complex:</strong> Real + imaginary. Example: <code>num = 3 + 4j</code></li>
                </ul>
                <CodeBlock code={`# Numeric Literals\ninteger_num = 42\nfloat_num = 3.14159\ncomplex_num = 5 + 2j`} />
              </div>

              <div>
                <h5 className="font-semibold text-slate-750 dark:text-slate-200">String Literals</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600 dark:text-slate-350">
                  <li><strong>Single-line:</strong> Quote enclosed. Example: <code>name = "Riya"</code></li>
                  <li><strong>Multi-line:</strong> Triple quotes. Example: <code>text = """Hello World"""</code></li>
                </ul>
                <CodeBlock code={`# String Literals\nsingle_quote = 'Hello'\ndouble_quote = "World"\n\nmulti_line = """This is\\na multi-line\\nstring."""`} />
              </div>

              <div>
                <h5 className="font-semibold text-slate-750 dark:text-slate-200">Boolean Literals</h5>
                <p className="text-sm text-slate-600 dark:text-slate-350">
                  Truth values: <code>True</code> and <code>False</code>.
                </p>
                <CodeBlock code={`# Boolean Literals\nis_student = True\nis_raining = False`} />
              </div>

              <div>
                <h5 className="font-semibold text-slate-750 dark:text-slate-200">Special Literals</h5>
                <p className="text-sm text-slate-600 dark:text-slate-350">
                  The literal <code>None</code> represents absence of value.
                </p>
                <CodeBlock code={`# None Literal\nempty_value = None`} />
              </div>
            </div>
          </div>

          <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 pt-2">Quick Reference Table</h4>
          <NoteTable headers={literalHeaders} rows={literalRows} />

          <CodeBlock code={`# Complete Example Using All Literal Types\nage = 15 # Integer literal\nheight = 5.8 # Float literal\ncomplex_num = 2 + 3j # Complex literal\nname = "Amit" # String literal\nis_student = True # Boolean literal\nempty_value = None # Special literal\n\nprint(age, height, name, is_student, empty_value)\n# Output: 15 5.8 Amit True None`} />
        </div>

        {/* Operators */}
        <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm" id="operators">
          <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
            <Calculator className="w-5 h-5" /> 4. Operators (With Examples)
          </h3>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Calculator className="w-4 h-4" /> A. Arithmetic Operators
            </h4>
            <NoteTable headers={arithHeaders} rows={arithRows} />
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Equal className="w-4 h-4" /> B. Assignment Operators
            </h4>
            <NoteTable headers={assignHeaders} rows={assignRows} />
          </div>

          <div className="space-y-2">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Scale className="w-4 h-4" /> C. Comparison Operators
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              These compare elements and return <code>True</code> or <code>False</code>. *(Pretend <code>x = 10</code> and <code>y = 5</code>)*
            </p>
            <NoteTable headers={compHeaders} rows={compRows} />
          </div>

          <div className="space-y-4">
            <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ListTree className="w-4 h-4" /> D. Logical Operators & Truth Charts
            </h4>
            <NoteTable headers={logicalHeaders} rows={logicalRows} />

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pt-2">
              {/* AND */}
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="bg-slate-100 dark:bg-slate-800 text-center py-2 font-bold text-slate-700 dark:text-slate-200 text-sm border-b">
                  The "and" Operator
                </div>
                <table className="w-full text-center text-xs divide-y">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500">
                      <th className="py-2">Side A</th>
                      <th className="py-2">Side B</th>
                      <th className="py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 dark:text-slate-400">
                    <tr><td className="py-2">True</td><td className="py-2">True</td><td className="py-2 font-bold text-emerald-500"><span className="inline-flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5" /> True</span></td></tr>
                    <tr><td className="py-2">True</td><td className="py-2">False</td><td className="py-2 font-medium">False</td></tr>
                    <tr><td className="py-2">False</td><td className="py-2">True</td><td className="py-2 font-medium">False</td></tr>
                    <tr><td className="py-2">False</td><td className="py-2">False</td><td className="py-2 font-medium">False</td></tr>
                  </tbody>
                </table>
              </div>

              {/* OR */}
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="bg-slate-100 dark:bg-slate-800 text-center py-2 font-bold text-slate-700 dark:text-slate-200 text-sm border-b">
                  The "or" Operator
                </div>
                <table className="w-full text-center text-xs divide-y">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500">
                      <th className="py-2">Side A</th>
                      <th className="py-2">Side B</th>
                      <th className="py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 dark:text-slate-400">
                    <tr><td className="py-2">True</td><td className="py-2">True</td><td className="py-2 font-bold text-emerald-500"><span className="inline-flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5" /> True</span></td></tr>
                    <tr><td className="py-2">True</td><td className="py-2">False</td><td className="py-2 font-bold text-emerald-500"><span className="inline-flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5" /> True</span></td></tr>
                    <tr><td className="py-2">False</td><td className="py-2">True</td><td className="py-2 font-bold text-emerald-500"><span className="inline-flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5" /> True</span></td></tr>
                    <tr><td className="py-2">False</td><td className="py-2">False</td><td className="py-2 font-medium">False</td></tr>
                  </tbody>
                </table>
              </div>

              {/* NOT */}
              <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="bg-slate-100 dark:bg-slate-800 text-center py-2 font-bold text-slate-700 dark:text-slate-200 text-sm border-b">
                  The "not" Operator
                </div>
                <table className="w-full text-center text-xs divide-y">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900 text-slate-500">
                      <th className="py-2">Input</th>
                      <th className="py-2">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y text-slate-600 dark:text-slate-400">
                    <tr><td className="py-2">True</td><td className="py-2 font-medium">False</td></tr>
                    <tr><td className="py-2">False</td><td className="py-2 font-bold text-emerald-500"><span className="inline-flex items-center gap-1 justify-center"><CheckCircle2 className="w-3.5 h-3.5" /> True</span></td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Delimiters */}
        <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm" id="delimiters">
          <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
            <ListTree className="w-5 h-5" /> 5. Delimiters or Separators
          </h3>
          <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-350 leading-relaxed">
            <li><code>( )</code> &rarr; Used for prints or math groups: <code>print("Hello")</code></li>
            <li><code>[ ]</code> &rarr; Used for building lists: <code>items = ["apple", "banana"]</code></li>
            <li><code>{`{ }`}</code> &rarr; Used for dictionaries: <code>info = {`{"age": 12}`}</code></li>
            <li><code>:</code> &rarr; Starts an aligned indented block of code: <code>if True:</code></li>
          </ul>
        </div>
        {/* Comments */}
        <div
          className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm"
          id="comments"
        >
          <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
            <AlignLeft className="w-5 h-5" /> 6. Comments
          </h3>

          <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
            <strong>Comments</strong> are notes written inside a Python program to make
            the code easier to understand. Python ignores comments during execution, so
            they do not affect the program's output.
          </p>

          <ul className="list-disc pl-6 space-y-2 text-slate-600 dark:text-slate-350">
            <li>Used to explain the purpose of the code.</li>
            <li>Helpful for debugging and future maintenance.</li>
            <li>Ignored by the Python interpreter.</li>
            <li>Single-line comments start with <code>#</code>.</li>
            <li>Triple quotes (<code>'''</code> or <code>"""</code>) are often used for multi-line comments or documentation.</li>
          </ul>

          <CodeBlock
            code={`# This is a single-line comment

name = "Rahul"   # Store student's name

"""
This is a multi-line comment
(or documentation string).
"""

print(name)`}
          />
        </div>

        {/* Tokens Summary Reference Table */}
        <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
          <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
            <ListChecks className="w-4 h-4" /> Tokens Summary Reference Table
          </h4>
          <NoteTable headers={summaryHeaders} rows={summaryRows} />
        </div>
      </div>
    </section>
  );
};

export default Tokens;