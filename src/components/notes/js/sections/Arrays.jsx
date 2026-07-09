import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  List,
  ListOrdered,
  Plus,
  Minus,
  Search,
  Shuffle,
  Filter,
  Zap,
} from "lucide-react";

const Arrays = () => {
  const methodsHeaders = ["Method", "Description", "Example"];
  const methodsRows = [
    [
      <code className="text-blue-600 font-bold">push()</code>,
      "Adds element(s) to the end",
      <code>arr.push(4)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">pop()</code>,
      "Removes last element",
      <code>arr.pop()</code>,
    ],
    [
      <code className="text-blue-600 font-bold">unshift()</code>,
      "Adds element(s) to the beginning",
      <code>arr.unshift(0)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">shift()</code>,
      "Removes first element",
      <code>arr.shift()</code>,
    ],
    [
      <code className="text-blue-600 font-bold">splice()</code>,
      "Add/remove elements at any position",
      <code>arr.splice(2, 1)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">slice()</code>,
      "Returns a portion of array (doesn't modify original)",
      <code>arr.slice(1, 3)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">indexOf()</code>,
      "Finds index of element",
      <code>arr.indexOf(3)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">includes()</code>,
      "Check if array contains element",
      <code>arr.includes(5)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">join()</code>,
      "Joins all elements into a string",
      <code>arr.join(", ")</code>,
    ],
    [
      <code className="text-blue-600 font-bold">reverse()</code>,
      "Reverses array order",
      <code>arr.reverse()</code>,
    ],
    [
      <code className="text-blue-600 font-bold">sort()</code>,
      "Sorts array elements",
      <code>arr.sort()</code>,
    ],
  ];

  return (
    <section id="arrays" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <List className="w-8 h-8" /> Arrays in JavaScript
        </h1>
        <p className="text-cyan-50 mt-1 text-sm">
          Ordered collections that store multiple values in a single variable.
        </p>
      </div>

      {/* What is an Array */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <List className="w-5 h-5" /> What is an Array?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An <strong>array</strong> is an <strong>ordered list</strong> of values. 
          Arrays let you store multiple items in a single variable, like a list of names, 
          numbers, or any other data type.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Each item in an array has a <strong>position</strong> called an <strong>index</strong>. 
          Indexes start at <code>0</code> (not 1!).
        </p>
        <CodeBlock 
          code={`const fruits = ["apple", "banana", "orange"];\n\nconsole.log(fruits[0]);  // Output: apple (first item)\nconsole.log(fruits[1]);  // Output: banana (second item)\nconsole.log(fruits[2]);  // Output: orange (third item)`} 
        />
        
        <div className="bg-blue-50 dark:bg-slate-700 p-4 rounded-lg border-l-4 border-blue-500">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">
            Visual representation:
          </p>
          <div className="mt-2 font-mono text-sm text-slate-700 dark:text-slate-300">
            <div className="flex gap-2 items-center">
              <span className="text-blue-600 font-bold">Index:</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">0</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">1</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">2</span>
            </div>
            <div className="flex gap-2 items-center mt-2">
              <span className="text-cyan-600 font-bold">Value:</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">"apple"</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">"banana"</span>
              <span className="bg-white dark:bg-slate-800 px-3 py-1 rounded">"orange"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Creating Arrays */}
      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Creating Arrays
        </h3>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              1. Array Literal (Most Common)
            </h4>
            <CodeBlock 
              code={`// Empty array\nconst emptyArray = [];\n\n// Array with numbers\nconst numbers = [1, 2, 3, 4, 5];\n\n// Array with strings\nconst colors = ["red", "green", "blue"];\n\n// Array with mixed types\nconst mixed = [1, "hello", true, null];\n\n// Array with objects\nconst students = [\n  { name: "Alex", age: 15 },\n  { name: "Emma", age: 16 }\n];`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              2. Using <code>new Array()</code>
            </h4>
            <CodeBlock 
              code={`// Create an array\nconst arr1 = new Array(1, 2, 3);\nconsole.log(arr1);  // Output: [1, 2, 3]\n\n// Create an array with specific length\nconst arr2 = new Array(5);  // Creates array with 5 empty slots\nconsole.log(arr2.length);   // Output: 5`} 
            />
          </div>
        </div>
      </div>

      {/* Accessing Array Elements */}
      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Search className="w-5 h-5" /> Accessing Array Elements
        </h3>
        
        <CodeBlock 
          code={`const fruits = ["apple", "banana", "orange", "mango"];\n\n// Access by index (starts at 0)\nconsole.log(fruits[0]);   // Output: apple\nconsole.log(fruits[2]);   // Output: orange\n\n// Access last element\nconsole.log(fruits[fruits.length - 1]);  // Output: mango\n\n// Get array length\nconsole.log(fruits.length);  // Output: 4\n\n// Accessing non-existent index returns undefined\nconsole.log(fruits[10]);  // Output: undefined`} 
        />
      </div>

      {/* Modifying Arrays */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Modifying Array Elements
        </h3>
        
        <CodeBlock 
          code={`const colors = ["red", "green", "blue"];\n\n// Change existing element\ncolors[1] = "yellow";\nconsole.log(colors);  // Output: ["red", "yellow", "blue"]\n\n// Add element at specific index\ncolors[3] = "purple";\nconsole.log(colors);  // Output: ["red", "yellow", "blue", "purple"]\n\n// Arrays are mutable (can be changed)\nconst numbers = [1, 2, 3];\nnumbers[0] = 10;\nconsole.log(numbers);  // Output: [10, 2, 3]`} 
        />
      </div>

      {/* Adding/Removing Elements */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Plus className="w-5 h-5" /> <Minus className="w-5 h-5" /> Adding & Removing Elements
        </h3>
        
        <div className="space-y-4">
          {/* push */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border-l-4 border-emerald-500">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <code>push()</code> - Add to End
            </h4>
            <CodeBlock 
              code={`const fruits = ["apple", "banana"];\n\nfruits.push("orange");  // Adds to end\nconsole.log(fruits);    // Output: ["apple", "banana", "orange"]\n\n// Can add multiple elements\nfruits.push("mango", "grape");\nconsole.log(fruits);    // Output: ["apple", "banana", "orange", "mango", "grape"]`} 
            />
          </div>

          {/* pop */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border-l-4 border-rose-500">
            <h4 className="font-bold text-rose-700 dark:text-rose-400 mb-2">
              <code>pop()</code> - Remove from End
            </h4>
            <CodeBlock 
              code={`const fruits = ["apple", "banana", "orange"];\n\nconst removed = fruits.pop();  // Removes last element\nconsole.log(removed);          // Output: orange\nconsole.log(fruits);           // Output: ["apple", "banana"]`} 
            />
          </div>

          {/* unshift */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border-l-4 border-blue-500">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              <code>unshift()</code> - Add to Beginning
            </h4>
            <CodeBlock 
              code={`const fruits = ["banana", "orange"];\n\nfruits.unshift("apple");  // Adds to beginning\nconsole.log(fruits);      // Output: ["apple", "banana", "orange"]`} 
            />
          </div>

          {/* shift */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border-l-4 border-purple-500">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              <code>shift()</code> - Remove from Beginning
            </h4>
            <CodeBlock 
              code={`const fruits = ["apple", "banana", "orange"];\n\nconst removed = fruits.shift();  // Removes first element\nconsole.log(removed);            // Output: apple\nconsole.log(fruits);             // Output: ["banana", "orange"]`} 
            />
          </div>
        </div>

        <Infobox type="tip" title="Memory Trick">
          <ul className="list-disc pl-4 space-y-1 text-sm">
            <li><strong>push/pop</strong> - Work on the <strong>end</strong> (like a stack)</li>
            <li><strong>shift/unshift</strong> - Work on the <strong>beginning</strong></li>
          </ul>
        </Infobox>
      </div>

      {/* Looping Through Arrays */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <ListOrdered className="w-5 h-5" /> Looping Through Arrays
        </h3>
        
        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-teal-100 dark:border-teal-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              1. Traditional <code>for</code> Loop
            </h4>
            <CodeBlock 
              code={`const colors = ["red", "green", "blue"];\n\nfor (let i = 0; i < colors.length; i++) {\n  console.log(colors[i]);\n}\n// Output:\n// red\n// green\n// blue`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-teal-100 dark:border-teal-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              2. <code>for...of</code> Loop (Modern & Clean)
            </h4>
            <CodeBlock 
              code={`const colors = ["red", "green", "blue"];\n\nfor (let color of colors) {\n  console.log(color);\n}\n// Output:\n// red\n// green\n// blue`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-teal-100 dark:border-teal-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              3. <code>forEach()</code> Method
            </h4>
            <CodeBlock 
              code={`const colors = ["red", "green", "blue"];\n\ncolors.forEach(function(color, index) {\n  console.log(\`\${index}: \${color}\`);\n});\n// Output:\n// 0: red\n// 1: green\n// 2: blue\n\n// With arrow function (shorter syntax)\ncolors.forEach(color => console.log(color));`} 
            />
          </div>
        </div>
      </div>

      {/* Array Methods Table */}
      <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Common Array Methods
        </h3>
        <NoteTable headers={methodsHeaders} rows={methodsRows} />
      </div>

      {/* Searching in Arrays */}
      <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <Search className="w-5 h-5" /> Searching in Arrays
        </h3>
        
        <CodeBlock 
          code={`const numbers = [10, 20, 30, 40, 50];\n\n// indexOf() - Find index of element\nconsole.log(numbers.indexOf(30));    // Output: 2\nconsole.log(numbers.indexOf(100));   // Output: -1 (not found)\n\n// includes() - Check if element exists\nconsole.log(numbers.includes(40));   // Output: true\nconsole.log(numbers.includes(100));  // Output: false\n\n// find() - Find first element matching condition\nconst found = numbers.find(num => num > 25);\nconsole.log(found);  // Output: 30\n\n// findIndex() - Find index of first match\nconst index = numbers.findIndex(num => num > 25);\nconsole.log(index);  // Output: 2`} 
        />
      </div>

      {/* Advanced Array Methods */}
      <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
          <Filter className="w-5 h-5" /> Advanced Array Methods (Preview)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          These powerful methods are commonly used in modern JavaScript:
        </p>

        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-orange-100 dark:border-orange-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              <code>map()</code> - Transform each element
            </h4>
            <CodeBlock 
              code={`const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(num => num * 2);\nconsole.log(doubled);  // Output: [2, 4, 6, 8]`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-orange-100 dark:border-orange-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              <code>filter()</code> - Filter elements by condition
            </h4>
            <CodeBlock 
              code={`const numbers = [1, 2, 3, 4, 5, 6];\nconst evens = numbers.filter(num => num % 2 === 0);\nconsole.log(evens);  // Output: [2, 4, 6]`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-orange-100 dark:border-orange-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              <code>reduce()</code> - Reduce to single value
            </h4>
            <CodeBlock 
              code={`const numbers = [1, 2, 3, 4];\nconst sum = numbers.reduce((total, num) => total + num, 0);\nconsole.log(sum);  // Output: 10`} 
            />
          </div>
        </div>

        <p className="text-sm text-slate-500 dark:text-slate-400 italic mt-3">
          We'll cover these advanced methods in detail in a later section!
        </p>
      </div>

      {/* Multi-dimensional Arrays */}
      <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <Shuffle className="w-5 h-5" /> Multi-dimensional Arrays
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Arrays can contain other arrays, creating a <strong>multi-dimensional array</strong> (like a table or grid).
        </p>

        <CodeBlock 
          code={`// 2D Array (array of arrays)\nconst matrix = [\n  [1, 2, 3],\n  [4, 5, 6],\n  [7, 8, 9]\n];\n\n// Accessing elements\nconsole.log(matrix[0]);     // Output: [1, 2, 3]\nconsole.log(matrix[0][0]);  // Output: 1\nconsole.log(matrix[1][2]);  // Output: 6\n\n// Practical example: Student grades\nconst grades = [\n  ["Alice", 95, 88, 92],\n  ["Bob", 78, 85, 80],\n  ["Carol", 92, 90, 94]\n];\n\nconsole.log(grades[0][0]);  // Output: Alice\nconsole.log(grades[0][1]);  // Output: 95 (Alice's first grade)`} 
        />
      </div>

      {/* Practical Example */}
      <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Practical Example: Shopping Cart
        </h3>
        
        <CodeBlock 
          code={`// Shopping cart with objects in array\nconst cart = [\n  { name: "Laptop", price: 999, quantity: 1 },\n  { name: "Mouse", price: 25, quantity: 2 },\n  { name: "Keyboard", price: 75, quantity: 1 }\n];\n\n// Add new item\ncart.push({ name: "Monitor", price: 299, quantity: 1 });\n\n// Calculate total\nlet total = 0;\nfor (let item of cart) {\n  total += item.price * item.quantity;\n}\nconsole.log(\`Total: $\${total}\`);  // Output: Total: $1423\n\n// Find specific item\nconst mouse = cart.find(item => item.name === "Mouse");\nconsole.log(mouse);  // Output: { name: "Mouse", price: 25, quantity: 2 }\n\n// Get all item names\nconst itemNames = cart.map(item => item.name);\nconsole.log(itemNames);\n// Output: ["Laptop", "Mouse", "Keyboard", "Monitor"]`} 
        />
      </div>
    </section>
  );
};

export default Arrays;
