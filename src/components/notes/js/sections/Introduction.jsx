import React from "react";
import NoteTable from "../../shared/NoteTable";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import {
  Monitor,
  Code2,
  Globe,
  Smartphone,
  Server,
  Blocks,
  Gamepad2,
  AppWindow,
  BookOpen,
  Zap,
  History,
  Wrench,
  ArrowRight,
} from "lucide-react";

const Introduction = () => {
  const ecmaVersions = ["Edition", "Year", "Key Features"];
  const ecmaRows = [
    ["ES1", "1997", "First edition"],
    ["ES2", "1998", "Minor editorial changes"],
    ["ES3", "1999", "Regular expressions, try/catch"],
    ["ES5", "2009", "Strict mode, JSON support, Array methods"],
    ["ES6 (ES2015)", "2015", "let/const, arrow functions, classes, modules, promises"],
    ["ES2016", "2016", "Array.includes(), exponentiation operator"],
    ["ES2017", "2017", "async/await, Object.entries()"],
    ["ES2018", "2018", "Rest/spread for objects, async iteration"],
    ["ES2019", "2019", "Array.flat(), Object.fromEntries()"],
    ["ES2020+", "2020+", "Optional chaining, nullish coalescing, BigInt"],
  ];

  return (
    <section id="introduction" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Monitor className="w-8 h-8" /> Introduction to JavaScript
        </h1>
        <p className="text-yellow-50 mt-1 text-sm">
          A complete overview of JavaScript, its purpose, history, and the ecosystem around it.
        </p>
      </div>

      {/* Overview */}
      <div id="intro-overview" className="rounded-xl border-2 border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> Overview
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is a cross-platform, object-oriented scripting language used to make web pages
          interactive. It runs on the client side of the web and can be used to design or program
          how web pages behave when a user interacts with them.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript contains a standard library of objects such as <code>Array</code>, <code>Date</code>,
          and <code>Math</code>, and a core set of language elements such as operators, control structures,
          and statements. Core JavaScript can be extended for a variety of purposes by adding extra objects.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <strong>Client-side JavaScript</strong> extends the core language by supplying objects to
            control a browser and its Document Object Model (DOM). For example, client-side extensions
            allow an application to place elements on an HTML form and respond to user events.
          </li>
          <li>
            <strong>Server-side JavaScript</strong> extends the core language by supplying objects
            relevant to running JavaScript on a server. For example, server-side extensions allow an
            application to communicate with a database or perform file manipulations.
          </li>
        </ul>
      </div>

      {/* About this guide */}
      <div id="intro-guide" className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
          <BookOpen className="w-5 h-5" /> About This Guide
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This guide assumes you have the following basic background knowledge:
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li>A general understanding of the internet and the World Wide Web (WWW).</li>
          <li>Good working knowledge of HyperText Markup Language (HTML).</li>
          <li>Some programming experience. If you are new to programming, try one of the tutorials linked on the main page about JavaScript.</li>
        </ul>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This guide is divided into chapters covering JavaScript's major features and concepts.
          After working through the guide you should have a good grasp of JavaScript and be able
          to begin programming with it.
        </p>
      </div>

      {/* About JavaScript */}
      <div id="intro-about" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Code2 className="w-5 h-5" /> About JavaScript
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is a lightweight, interpreted, or just-in-time compiled programming language
          with first-class functions. While it is most well known as the scripting language for web
          pages, many non-browser environments also use it, such as Node.js.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is a <strong>prototype-based, multi-paradigm, single-threaded, dynamic language</strong>,
          supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: Globe,      title: "Interactive Websites",   text: "Add animations, form validation, dynamic content, and event-driven behavior to web pages." },
            { icon: Smartphone, title: "Mobile Apps",            text: "Build cross-platform mobile apps using frameworks like React Native and Ionic." },
            { icon: Server,     title: "Server Applications",    text: "Create backend servers, REST APIs, and microservices using Node.js and Deno." },
            { icon: Gamepad2,   title: "Browser Games",          text: "Design and build interactive browser-based games using the Canvas API and WebGL." },
            { icon: AppWindow,  title: "Desktop Applications",   text: "Build cross-platform desktop apps with Electron (the same tech behind VS Code)." },
            { icon: Blocks,     title: "Browser Extensions",     text: "Create extensions that add new functionality to Chrome, Firefox, and other browsers." },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="flex items-start gap-3 rounded-lg bg-white dark:bg-slate-700 border border-amber-100 dark:border-amber-900 p-3 shadow-sm">
                <Icon className="w-6 h-6 text-amber-500 shrink-0" />
                <div>
                  <p className="font-bold text-slate-800 dark:text-slate-100">{item.title}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* JavaScript and Java */}
      <div id="intro-java" className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
          <Code2 className="w-5 h-5" /> JavaScript and Java
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript and Java are similar in some ways but fundamentally different in others.
          The JavaScript language resembles Java but does not have Java's static typing and strong
          type checking. JavaScript follows most Java expression syntax, naming conventions, and basic
          control-flow constructs, which was the reason it was renamed from LiveScript to JavaScript.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          In contrast to Java's compile-time system of classes built by declarations, JavaScript
          supports a runtime system based on a small number of data types representing numeric,
          Boolean, and string values. JavaScript has a prototype-based object model instead of
          the more common class-based object model.
        </p>
        <NoteTable
          headers={["Feature", "JavaScript", "Java"]}
          rows={[
            ["Type system", "Dynamic, weakly typed", "Static, strongly typed"],
            ["Object model", "Prototype-based", "Class-based"],
            ["Compilation", "Interpreted / JIT compiled", "Compiled to bytecode"],
            ["Execution", "Browser or Node.js", "Java Virtual Machine (JVM)"],
            ["Variable declarations", "let, const, var", "Explicit type required (int, String, etc.)"],
            ["Functions", "First-class objects", "Methods inside classes"],
          ]}
        />
        <Infobox type="warning" title="Common Misconception">
          Despite the name similarity, JavaScript and Java are entirely different languages with
          different syntax, semantics, and use cases. The name was chosen for marketing reasons
          during Netscape's partnership with Sun Microsystems in 1995.
        </Infobox>
      </div>

      {/* ECMAScript */}
      <div id="intro-ecmascript" className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <History className="w-5 h-5" /> ECMAScript
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          JavaScript is standardized at Ecma International as <strong>ECMAScript</strong>. ECMAScript
          is the official specification that JavaScript engines implement. The organization that
          maintains the specification is the <strong>TC39 committee</strong>.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          New features are proposed through a four-stage process (Stage 0 to Stage 4). Only Stage 4
          proposals are included in the official annual ECMAScript specification release.
        </p>
        <NoteTable headers={ecmaVersions} rows={ecmaRows} />
        <Infobox type="info" title="ES6 was the turning point">
          ECMAScript 2015 (ES6) was a major revision that introduced classes, modules, arrow functions,
          template literals, destructuring, Promises, and many other features that define modern JavaScript.
        </Infobox>
      </div>

      {/* Tools */}
      <div id="intro-tools" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Wrench className="w-5 h-5" /> Tools
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Several tools are available that make writing JavaScript easier and more productive.
        </p>
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Browser Developer Tools</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Every modern browser ships with built-in developer tools. Open them with <code>F12</code> or
              right-click and choose Inspect. The Console tab lets you run JavaScript interactively
              and see output and errors. The Sources panel lets you set breakpoints and step through code.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Node.js</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Node.js is a JavaScript runtime built on Chrome's V8 engine. It lets you run JavaScript
              outside the browser, on a server or your local machine. Install it from
              nodejs.org and run <code>node filename.js</code> in your terminal.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Code Editors</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Visual Studio Code is the most popular editor for JavaScript development. It provides
              syntax highlighting, IntelliSense autocompletion, integrated terminal, Git integration,
              and a vast extension marketplace. Other strong choices include WebStorm and Sublime Text.
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Package Managers</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <code>npm</code> (Node Package Manager) and <code>yarn</code> manage third-party
              libraries and project dependencies. They ship with Node.js and let you install, update,
              and remove packages with a single command.
            </p>
            <CodeBlock
              language="javascript"
              code={`npm install package-name    // install a package
npm run build               // run a build script
node app.js                 // run a JS file with Node`}
            />
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-emerald-100 dark:border-emerald-900">
            <h3 className="font-bold text-slate-800 dark:text-slate-100 mb-1">Linters and Formatters</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              <strong>ESLint</strong> analyzes your code for errors and style violations.
              <strong> Prettier</strong> automatically formats your code to a consistent style.
              Using both together catches bugs early and keeps code readable across teams.
            </p>
          </div>
        </div>
        <CodeBlock
          language="javascript"
          code={`// Running JavaScript in the browser console
console.log("Hello, World!");     // print to console
console.error("Something broke"); // print an error
console.warn("Check this value"); // print a warning

// Running in Node.js (terminal: node app.js)
const name = "JavaScript";
console.log(\`Hello from \${name}\`);`}
        />
      </div>

      {/* What's Next */}
      <div id="intro-next" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <ArrowRight className="w-5 h-5" /> What's Next
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          This guide covers the core language from first principles. The next chapter, Grammar and
          Types, introduces the fundamental building blocks: syntax, declarations, variable scope,
          hoisting, data structures, and literals. From there the guide progresses through control
          flow, functions, expressions, numbers, dates, text, collections, and more.
        </p>
        <ul className="list-disc pl-6 space-y-2 text-slate-700 dark:text-slate-300">
          <li><strong>Grammar and Types</strong> covers variables, declarations, scope, hoisting, and literals.</li>
          <li><strong>Control Flow and Error Handling</strong> covers if/else, switch, try/catch, and throw.</li>
          <li><strong>Loops and Iteration</strong> covers for, while, do...while, for...in, and for...of.</li>
          <li>Later chapters cover functions, closures, objects, classes, and asynchronous programming.</li>
        </ul>
        <Infobox type="tip" title="Work through the guide in order">
          Each chapter builds on the previous ones. Starting from Grammar and Types and working
          forward will give you the clearest understanding of how the language fits together.
        </Infobox>
      </div>
    </section>
  );
};

export default Introduction;
