import React from "react";
import NoteTable from "../../shared/NoteTable";
import {
  Monitor,
  MessageCircle,
  Code2,
  Sparkles,
  Globe,
  Smartphone,
  Server,
  Blocks,
  Gamepad2,
  AppWindow,
} from "lucide-react";

const Introduction = () => {
  const tableHeaders = ["Era", "Key Feature", "Example"];
  const tableRows = [
    [
      <strong className="inline-flex items-center gap-1.5">
        ES5 (2009)
      </strong>,
      "Traditional JavaScript - the foundation",
      "var, function, for loops",
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        ES6+ (2015+)
      </strong>,
      <span><strong>Modern JavaScript</strong> - cleaner, more powerful</span>,
      <strong>let, const, arrow functions, classes</strong>,
    ],
  ];

  return (
    <section id="introduction" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Monitor className="w-8 h-8" /> What is JavaScript?
        </h1>
        <p className="text-yellow-50 mt-1 text-sm">
          The language that brings websites to life!
        </p>
      </div>

      {/* What is JavaScript */}
      <div className="rounded-xl border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          <Code2 className="w-5 h-5" /> What is JavaScript?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          <strong>JavaScript (JS)</strong> is a <strong>high-level programming language</strong> that 
          makes websites interactive and dynamic. While HTML creates the structure and CSS makes 
          it look beautiful, JavaScript makes things <strong>happen</strong> on the page!
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Think of it like this: HTML is the skeleton, CSS is the clothing and style, 
          and JavaScript is the brain and muscles that make everything move and respond.
        </p>
      </div>

      {/* Why Learn JavaScript */}
      <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
        <h2 className="text-xl font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" /> Why Learn JavaScript?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is one of the <strong>most popular programming languages</strong> in the world! 
          It's the only language that runs natively in web browsers, which means:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Runs everywhere:</strong> Works on any device with a browser</li>
          <li><strong>Beginner-friendly:</strong> Easy to start with and see results immediately</li>
          <li><strong>Powerful:</strong> Can build everything from simple animations to complex applications</li>
          <li><strong>In-demand:</strong> Most web development jobs require JavaScript knowledge</li>
        </ul>
      </div>

      {/* JavaScript Evolution */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <MessageCircle className="w-5 h-5" /> JavaScript Evolution
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript has evolved significantly over the years. The modern JavaScript (ES6+) 
          introduced in 2015 brought many improvements that make coding easier and more fun!
        </p>
        <NoteTable headers={tableHeaders} rows={tableRows} />
      </div>

      {/* What can you build with JavaScript */}
      <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <Blocks className="w-5 h-5" /> What can you build with JavaScript?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is incredibly versatile! Here's what you can create:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { 
              icon: Globe, 
              title: "Interactive Websites", 
              text: "Add animations, forms, popups, and dynamic content to websites." 
            },
            { 
              icon: Smartphone, 
              title: "Mobile Apps", 
              text: "Build mobile apps using frameworks like React Native." 
            },
            { 
              icon: Server, 
              title: "Server Applications", 
              text: "Create backend servers and APIs using Node.js." 
            },
            { 
              icon: Gamepad2, 
              title: "Browser Games", 
              text: "Design and code interactive browser-based games." 
            },
            { 
              icon: AppWindow, 
              title: "Desktop Applications", 
              text: "Build desktop apps with Electron (like VS Code!)." 
            },
            { 
              icon: Blocks, 
              title: "Web Extensions", 
              text: "Create browser extensions and plugins." 
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg bg-white dark:bg-slate-700 border border-rose-100 dark:border-rose-900 p-3 shadow-sm"
              >
                <Icon className="w-6 h-6 text-rose-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* How to Run JavaScript */}
      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Monitor className="w-5 h-5" /> How to Run JavaScript?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript can run in two main environments:
        </p>
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              1. In the Browser (Client-Side)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Open your browser's Developer Console (F12 or Right-click → Inspect → Console) 
              and start typing JavaScript code!
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded font-mono text-sm text-slate-700 dark:text-slate-300">
              console.log("Hello, JavaScript!");
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Server className="w-5 h-5 text-emerald-500" />
              2. With Node.js (Server-Side)
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Install Node.js on your computer to run JavaScript files outside the browser. 
              Create a file like <code>app.js</code> and run it using the terminal.
            </p>
            <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded font-mono text-sm text-slate-700 dark:text-slate-300">
              node app.js
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
