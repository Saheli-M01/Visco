export const Intro = () => {
  return (
    <section id="intro" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">Intro</h2>
        <span className="text-sm text-gray-500">C++ basics here</span>
      </div>

      <p className="text-sm text-gray-800">
        Welcome! This is your gentle on-ramp: short, clear, and friendly. Skim the sections, glance at the code,
        then hop into the modules.
      </p>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Why C++ for DSA</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li>Fast: runs close to the metal, great for tight time limits.</li>
          <li>Control: you can tune memory for big inputs.</li>
          <li>Clear patterns: DSA techniques feel direct.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">How a program thinks</h3>
        <p className="text-sm text-gray-800">Like cooking from a recipe:</p>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li>Compilation: translate your recipe into steps a robot chef (computer) understands.</li>
          <li>Execution: the robot follows the steps and produces the result.</li>
        </ul>
        <p className="text-sm text-gray-800">
          Compile error = robot can't read it. Runtime error = it read it, but something went wrong.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Your first C++ program</h3>
        <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto">
{`#include <iostream>

int main() {
  std::cout << "Hello, Visco!" << std::endl;
  return 0;
}`}
        </pre>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li><code>#include &lt;iostream&gt;</code>: input/output tools.</li>
          <li><code>int main() {"{"} ... {"}"}</code>: starting point.</li>
          <li><code>std::cout</code>: print text; <code>std::endl</code>: end the line and show it.</li>
          <li><code>return 0;</code>: tell the OS "all good".</li>
        </ul>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          Missing <code>;</code> or <code>{"}"}</code> is the #1 beginner error. Check those first.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Building blocks</h3>
        <p className="text-sm text-gray-800">Variables are labeled boxes that hold values.</p>
        <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto">
{`int age = 18;
double pi = 3.14;
char grade = 'A';`}
        </pre>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li><strong>int</strong>: counts, indices, sizes.</li>
          <li><strong>long long</strong>: bigger counts.</li>
          <li><strong>double</strong>: decimals.</li>
          <li><strong>char</strong>: single characters.</li>
          <li><strong>bool</strong>: true/false.</li>
          <li><strong>string</strong>: text.</li>
        </ul>
        <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto">
{`#include <string>

int n = 5;
bool found = false;
std::string name = "Visco";`}
        </pre>
        <p className="text-sm text-gray-800">I/O: read with <code>std::cin</code>, write with <code>std::cout</code>.</p>
        <pre className="bg-gray-950 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto">
{`int n;
std::cin >> n;
std::cout << "You entered: " << n << "\n";`}
        </pre>
        <p className="text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          Helpful names: <code>count</code>, <code>sum</code>, <code>left</code>, <code>right</code> make DSA patterns clearer.
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Visual mental model</h3>
        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-800">
          <li>Memory is a shelf of boxes; each variable is one box.</li>
          <li>Type decides the box shape/size.</li>
          <li>Arrays are rows of boxes side by side.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Common beginner confusions</h3>
        <ul className="list-disc pl-5 space-y-2 text-sm text-gray-800">
          <li>Semicolons are periods; most lines need one.</li>
          <li><em>cout</em> = see out (print). <em>cin</em> = see in (read).</li>
          <li>Errors often come from missing <code>;</code> or <code>{"}"}</code>, typos, or missing <code>#include</code>.</li>
        </ul>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          If an error points to a line, the real issue might be a line above (a missing <code>;</code> shifts everything).
        </p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">What comes next</h3>
        <p className="text-sm text-gray-800">
          Arrays are next: a row of boxes you can search, sort, and scan. You'll use patterns like two pointers,
          sliding window, and binary search.
        </p>
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-2">Modules (coming next):</h3>
        <ol className="list-decimal pl-5 space-y-1 text-gray-700 text-sm">
          <li>Arrays & Strings Essentials</li>
          <li>Linked Lists Deep Dive</li>
          <li>Stacks, Queues, and Heaps</li>
          <li>Recursion & Divide and Conquer</li>
          <li>Sorting & Searching Patterns</li>
          <li>Tree and Graph Fundamentals</li>
        </ol>
      </div>
    </section>
  );
};
