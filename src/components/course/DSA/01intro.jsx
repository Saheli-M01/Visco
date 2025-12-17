import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { ArrowRight } from 'lucide-react';

export const Intro = () => {
  return (
    <section id="intro" className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-8">
      <div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Welcome to C++ Land 🚀
        </h2>
        <p className="text-lg text-gray-700">
          Short. Clear. No scary stuff. Let's build your foundation.
        </p>
      </div>

      {/* Why C++ */}
      <div className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100 p-6">
        <h3 className="text-2xl font-bold text-blue-900 mb-3">🏃 Why C++ for DSA?</h3>
        <div className="space-y-2 text-base text-blue-900">
          <p>
            <span className="font-semibold">Fast 🚄</span> — Your code runs at lightning speed. Perfect for timed contests.
          </p>
          <p>
            <span className="font-semibold">Control 🎮</span> — You decide how memory works. Great for big problems.
          </p>
          <p>
            <span className="font-semibold">Clear 📖</span> — Patterns in DSA just... make sense.
          </p>
        </div>
      </div>

      {/* How programs run */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">💭 How a Program Thinks</h3>
        <p className="text-base text-gray-700">
          Imagine you're giving instructions to a robot who speaks only machine code:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Compilation */}
          <div className="rounded-2xl border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100 p-5">
            <h4 className="text-lg font-bold text-green-900 mb-2">Step 1: Compilation 🔨</h4>
            <p className="text-base text-green-900 mb-2">You write the recipe.</p>
            <p className="text-sm text-green-800">
              The compiler translates your English-ish code into instructions the robot understands.
            </p>
            {/* Lottie animation: Code → Gear → Binary */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-16 h-16">
                <DotLottieReact
                  src="https://lottie.host/4b15ffc2-f3c0-43d7-9ed5-957603e77102/Kdy9Nn6g04.lottie"
                  loop
                  autoplay
                />
              </div>
              <ArrowRight className="w-5 h-5 text-green-600 flex-shrink-0" />
              <div className="w-16 h-16">
                <DotLottieReact
                  src="https://lottie.host/058cf756-76be-4182-98d1-c48db65a36d6/2GvLCNUZFe.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>

          {/* Execution */}
          <div className="rounded-2xl border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100 p-5">
            <h4 className="text-lg font-bold text-purple-900 mb-2">Step 2: Execution ⚡</h4>
            <p className="text-base text-purple-900 mb-2">Robot follows the recipe.</p>
            <p className="text-sm text-purple-800">
              Your program runs, stores data, makes decisions, and spits out results.
            </p>
            {/* Lottie animation: Robot executing → Arrow → Data moving */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-16 h-16">
                <DotLottieReact
                  src="https://lottie.host/4580be17-47cb-43d6-8fef-1d72c7d5d64b/wSpGNvTXy4.lottie"
                  loop
                  autoplay
                />
              </div>
              <ArrowRight className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <div className="w-16 h-16">
                <DotLottieReact
                  src="https://lottie.host/ea0900b3-b400-423c-be91-52dee5d4c45c/UKBHa8HE0U.lottie"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-base">
          <p className="text-red-900 font-semibold mb-1">⚠️ When things break:</p>
          <p className="text-red-800"><span className="font-semibold">Compile error</span> — Robot can't read your recipe. Fix the typo/syntax.</p>
          <p className="text-red-800"><span className="font-semibold">Runtime error</span> — Recipe was fine, but something went wrong during cooking.</p>
        </div>
      </div>

      {/* Your first program */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">👋 Your First C++ Program</h3>
        <div className="rounded-xl bg-gray-900 text-gray-100 p-4 text-base overflow-x-auto font-mono">
          <div className="text-amber-400">#include &lt;iostream&gt;</div>
          <div className="mt-2"></div>
          <div className="text-blue-400">int main() {"{}"}</div>
          <div className="ml-4 text-green-400">std::cout &lt;&lt; <span className="text-yellow-400">"Hello, Visco!"</span> &lt;&lt; std::endl;</div>
          <div className="ml-4 text-purple-400">return 0;</div>
          <div className="text-blue-400">{"}"}</div>
        </div>
        <div className="space-y-1 text-base">
          <p className="text-gray-700"><span className="font-semibold text-amber-600">#include</span> — "Hey, I need tools to print stuff"</p>
          <p className="text-gray-700"><span className="font-semibold text-blue-600">main()</span> — "Start here when the program runs"</p>
          <p className="text-gray-700"><span className="font-semibold text-green-600">cout</span> — "Print this to the screen"</p>
          <p className="text-gray-700"><span className="font-semibold text-purple-600">return 0</span> — "All good, boss!"</p>
        </div>
        <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
          💡 <span className="font-semibold">Rookie mistake:</span> Missing <code>;</code> breaks everything. Always check for semicolons!
        </p>
      </div>

      {/* Variables & Data */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">📦 Variables: Labeled Boxes</h3>
        <p className="text-base text-gray-700">
          Think of memory as a shelf. Each variable is a labeled box that holds a piece of data.
        </p>

        <div className="rounded-xl bg-gray-50 border-2 border-indigo-300 p-4">
          <p className="text-base font-mono text-indigo-900 mb-3">
            <span className="text-indigo-600">int</span> age = <span className="text-orange-600">18</span>;<br />
            <span className="text-indigo-600">double</span> height = <span className="text-orange-600">5.9</span>;<br />
            <span className="text-indigo-600">std::string</span> name = <span className="text-green-600">"Alex"</span>;
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-3 text-base">
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3">
            <p className="font-semibold text-indigo-900 mb-1">int (numbers)</p>
            <p className="text-indigo-800">Counts, indices, ages.</p>
          </div>
          <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
            <p className="font-semibold text-emerald-900 mb-1">double (decimals)</p>
            <p className="text-emerald-800">Heights, averages, anything with a dot.</p>
          </div>
          <div className="rounded-lg bg-rose-50 border border-rose-200 p-3">
            <p className="font-semibold text-rose-900 mb-1">bool (true/false)</p>
            <p className="text-rose-800">Yes-or-no answers.</p>
          </div>
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
            <p className="font-semibold text-amber-900 mb-1">string (text)</p>
            <p className="text-amber-800">Words, sentences, anything.</p>
          </div>
        </div>

        {/* Lottie animation suggestion */}
        <p className="text-xs text-gray-600 italic opacity-50">
          [Lottie: Labeled boxes appearing on a shelf, each with its type label]
        </p>
      </div>

      {/* Input/Output */}
      <div className="rounded-2xl border-2 border-cyan-200 bg-gradient-to-br from-cyan-50 to-cyan-100 p-6">
        <h3 className="text-lg font-bold text-cyan-900 mb-4">💬 Talk to Your Program</h3>
        
        <div className="space-y-3 mb-4">
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs font-semibold text-cyan-700 mb-1">Reading from keyboard (std::cin):</p>
            <p className="text-sm font-mono text-gray-800">int n; std::cin &gt;&gt; n;</p>
            <p className="text-xs text-cyan-800 mt-1">👂 "Listen for a number and store it in n"</p>
          </div>
          <div className="bg-white rounded-lg p-3">
            <p className="text-xs font-semibold text-cyan-700 mb-1">Printing to screen (std::cout):</p>
            <p className="text-sm font-mono text-gray-800">std::cout &lt;&lt; "Hello" &lt;&lt; n;</p>
            <p className="text-xs text-cyan-800 mt-1">📢 "Show this text and the number"</p>
          </div>
        </div>

        <p className="text-xs bg-white rounded px-3 py-2 text-cyan-900 font-semibold">
          🎯 Remember: cin gets input. cout shows output.
        </p>
      </div>
      {/* Memory & Arrays */}
      <div className="space-y-3">
        <h3 className="text-2xl font-bold text-gray-900">🧠 How Data Lives in Memory</h3>
        <p className="text-base text-gray-700 mb-3">
          Imagine your computer's memory as a giant bookshelf:
        </p>
        <div className="rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200 p-4">
          <div className="flex items-center gap-2 text-base">
            <div className="flex gap-1">
              <div className="w-8 h-8 bg-pink-400 rounded text-center leading-8 text-white text-xs font-bold">18</div>
              <div className="w-8 h-8 bg-purple-400 rounded text-center leading-8 text-white text-xs font-bold">5.9</div>
              <div className="w-8 h-8 bg-indigo-400 rounded text-center leading-8 text-white text-xs font-bold">A</div>
            </div>
            <span className="text-gray-700">← Your boxes live here</span>
          </div>
          <p className="text-xs text-gray-600 mt-2">
            Index 0 = age (18) | Index 1 = height (5.9) | Index 2 = grade (A)
          </p>
        </div>
        {/* Lottie animation suggestion */}
        <p className="text-xs text-gray-600 italic opacity-50">
          [Lottie: Bookshelf with colored boxes filling in, index numbers beneath]
        </p>
      </div>

      {/* Quick tips */}
      <div className="rounded-2xl border-2 border-yellow-200 bg-gradient-to-br from-yellow-50 to-amber-50 p-6">
        <h3 className="text-2xl font-bold text-yellow-900 mb-4">⚡ Quick Tips to Remember</h3>
        <ul className="space-y-2 text-base text-yellow-900">
          <li><span className="font-semibold">📝 Naming matters:</span> Use <code>count</code>, <code>sum</code>, <code>left</code>, <code>right</code> — clear names help you think.</li>
          <li><span className="font-semibold">🔍 Semicolon hunt:</span> If code breaks, 90% chance: missing <code>;</code> or <code>{"}"}</code>.</li>
          <li><span className="font-semibold">🎯 Read errors backwards:</span> Error on line 10? Problem might be line 8 or 9.</li>
        </ul>
      </div>

      {/* What's next */}
      <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-6">
        <h3 className="text-2xl font-bold text-green-900 mb-3">🎬 What Comes Next</h3>
        <p className="text-base text-green-900 mb-3">
          You've got the basics. Now comes the fun part: <span className="font-semibold">Arrays</span>.
        </p>
        <p className="text-base text-green-800 mb-4">
          Arrays are just rows of labeled boxes. Learn to search them, sort them, and scan them efficiently. That's where DSA shines.
        </p>
        <ol className="space-y-1 text-base text-green-900">
          <li><span className="font-semibold">1. Arrays & Strings</span> — The foundation.</li>
          <li><span className="font-semibold">2. Linked Lists</span> — Different box arrangement.</li>
          <li><span className="font-semibold">3. Stacks & Queues</span> — Specialized boxes.</li>
          <li><span className="font-semibold">4. Trees & Graphs</span> — Boxes with connections.</li>
          <li><span className="font-semibold">5. Sorting & Searching</span> — Key techniques.</li>
        </ol>
      </div>

      {/* Lottie suggestions summary */}
      <div className="rounded-lg bg-gray-100 border border-gray-300 p-4 text-xs text-gray-700 space-y-2">
        <p className="font-semibold text-gray-900">🎨 Lottie Animation Ideas:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><span className="font-semibold">Compilation process:</span> Code text → Spinning gears → Binary</li>
          <li><span className="font-semibold">Memory shelf:</span> Boxes sliding into place with indices</li>
          <li><span className="font-semibold">Input/Output:</span> Arrow flowing in (cin), arrow flowing out (cout)</li>
          <li><span className="font-semibold">Arrays concept:</span> Multiple boxes lining up side by side</li>
        </ul>
      </div>    </section>
  );
};