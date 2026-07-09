import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
  Box,
  Key,
  Layers,
  Edit3,
  Trash2,
  Eye,
  Zap,
} from "lucide-react";

const Objects = () => {
  const methodsHeaders = ["Method", "Description", "Example"];
  const methodsRows = [
    [
      <code className="text-blue-600 font-bold">Object.keys(obj)</code>,
      "Returns an array of object's keys",
      <code>Object.keys(person)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">Object.values(obj)</code>,
      "Returns an array of object's values",
      <code>Object.values(person)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">Object.entries(obj)</code>,
      "Returns array of [key, value] pairs",
      <code>Object.entries(person)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">Object.assign()</code>,
      "Copies properties from one object to another",
      <code>Object.assign({"{}"}, obj1, obj2)</code>,
    ],
    [
      <code className="text-blue-600 font-bold">hasOwnProperty()</code>,
      "Check if object has a specific property",
      <code>obj.hasOwnProperty('name')</code>,
    ],
  ];

  return (
    <section id="objects" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Box className="w-8 h-8" /> Objects in JavaScript
        </h1>
        <p className="text-purple-50 mt-1 text-sm">
          Collections of related data and functionality stored as key-value pairs.
        </p>
      </div>

      {/* What is an Object */}
      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
          <Box className="w-5 h-5" /> What is an Object?
        </h2>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          An <strong>object</strong> is a collection of <strong>key-value pairs</strong> (also called properties). 
          Objects let you store related data and functions together in a structured way.
        </p>
        <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
          Think of an object like a real-world entity. For example, a person has a name, age, and 
          can perform actions. An object can represent this:
        </p>
        <CodeBlock 
          code={`const person = {\n  name: "Emma",\n  age: 15,\n  isStudent: true\n};\n\nconsole.log(person.name);  // Output: Emma\nconsole.log(person.age);   // Output: 15`} 
        />
      </div>

      {/* Creating Objects */}
      <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Creating Objects
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          There are several ways to create objects in JavaScript:
        </p>

        <div className="space-y-4">
          {/* Object Literal */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
            <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">
              1. Object Literal (Most Common)
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              The easiest and most common way using curly braces <code>{"{}"}</code>
            </p>
            <CodeBlock 
              code={`const student = {\n  firstName: "Alex",\n  lastName: "Johnson",\n  grade: 10,\n  subjects: ["Math", "Science", "English"],\n  isActive: true\n};\n\nconsole.log(student.firstName);  // Output: Alex`} 
            />
          </div>

          {/* new Object() */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
            <h4 className="font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              2. Using <code>new Object()</code>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Less common, but works the same way
            </p>
            <CodeBlock 
              code={`const car = new Object();\ncar.brand = "Toyota";\ncar.model = "Camry";\ncar.year = 2023;\n\nconsole.log(car.brand);  // Output: Toyota`} 
            />
          </div>

          {/* Object.create() */}
          <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
            <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">
              3. Using <code>Object.create()</code>
            </h4>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Creates a new object with a specified prototype (advanced)
            </p>
            <CodeBlock 
              code={`const person = {\n  greet: function() {\n    console.log("Hello!");\n  }\n};\n\nconst student = Object.create(person);\nstudent.name = "Sam";\nstudent.greet();  // Output: Hello!`} 
            />
          </div>
        </div>
      </div>

      {/* Accessing Properties */}
      <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
          <Eye className="w-5 h-5" /> Accessing Object Properties
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          There are two ways to access object properties:
        </p>

        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              1. Dot Notation (Recommended)
            </h4>
            <CodeBlock 
              code={`const person = {\n  name: "Emma",\n  age: 15,\n  city: "New York"\n};\n\nconsole.log(person.name);  // Output: Emma\nconsole.log(person.age);   // Output: 15`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-emerald-100 dark:border-emerald-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              2. Bracket Notation (For dynamic keys or special characters)
            </h4>
            <CodeBlock 
              code={`const person = {\n  name: "Emma",\n  age: 15,\n  "favorite color": "blue"  // Property with space\n};\n\nconsole.log(person["name"]);            // Output: Emma\nconsole.log(person["favorite color"]);  // Output: blue\n\n// Dynamic property access\nconst key = "age";\nconsole.log(person[key]);               // Output: 15`} 
            />
          </div>
        </div>

        <Infobox type="tip" title="When to Use Which?">
          Use <strong>dot notation</strong> by default. Use <strong>bracket notation</strong> when:
          <ul className="list-disc pl-4 mt-2 space-y-1 text-sm">
            <li>Property name has spaces or special characters</li>
            <li>Property name is stored in a variable</li>
            <li>Property name is computed dynamically</li>
          </ul>
        </Infobox>
      </div>

      {/* Modifying Objects */}
      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Edit3 className="w-5 h-5" /> Modifying Objects
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Objects are <strong>mutable</strong>, meaning you can change their properties after creation.
        </p>

        <div className="space-y-3">
          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Adding New Properties
            </h4>
            <CodeBlock 
              code={`const student = {\n  name: "Alex"\n};\n\n// Add new properties\nstudent.age = 16;\nstudent.grade = "10th";\n\nconsole.log(student);\n// Output: { name: "Alex", age: 16, grade: "10th" }`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">
              Updating Existing Properties
            </h4>
            <CodeBlock 
              code={`const person = {\n  name: "Emma",\n  age: 15\n};\n\n// Update existing property\nperson.age = 16;\n\nconsole.log(person.age);  // Output: 16`} 
            />
          </div>

          <div className="bg-white dark:bg-slate-700 rounded-lg p-3 border border-amber-100 dark:border-amber-900">
            <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Deleting Properties
            </h4>
            <CodeBlock 
              code={`const person = {\n  name: "Emma",\n  age: 15,\n  city: "Boston"\n};\n\n// Delete a property\ndelete person.city;\n\nconsole.log(person);\n// Output: { name: "Emma", age: 15 }`} 
            />
          </div>
        </div>
      </div>

      {/* Methods in Objects */}
      <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
          <Key className="w-5 h-5" /> Object Methods (Functions in Objects)
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Objects can also contain <strong>functions</strong> called <strong>methods</strong>. 
          Methods are actions that objects can perform.
        </p>

        <CodeBlock 
          code={`const person = {\n  firstName: "Emma",\n  lastName: "Smith",\n  age: 15,\n  \n  // Method: function inside an object\n  greet: function() {\n    console.log("Hello, my name is " + this.firstName);\n  },\n  \n  // Shorthand method syntax (ES6+)\n  introduce() {\n    console.log(\`I am \${this.firstName} \${this.lastName}\`);\n  },\n  \n  // Method with return value\n  getAge() {\n    return this.age;\n  }\n};\n\n// Calling methods\nperson.greet();        // Output: Hello, my name is Emma\nperson.introduce();    // Output: I am Emma Smith\nconsole.log(person.getAge());  // Output: 15`} 
        />

        <Infobox type="info" title="The 'this' Keyword">
          Inside an object method, <code>this</code> refers to the object itself. 
          It allows you to access other properties and methods of the same object.
        </Infobox>
      </div>

      {/* Nested Objects */}
      <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Nested Objects
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Objects can contain other objects as property values, creating a nested structure.
        </p>

        <CodeBlock 
          code={`const student = {\n  name: "Alex",\n  age: 16,\n  \n  // Nested object\n  address: {\n    street: "123 Main St",\n    city: "Boston",\n    zipCode: "02101"\n  },\n  \n  // Another nested object\n  grades: {\n    math: 95,\n    science: 88,\n    english: 92\n  }\n};\n\n// Accessing nested properties\nconsole.log(student.address.city);      // Output: Boston\nconsole.log(student.grades.math);       // Output: 95\n\n// Using bracket notation\nconsole.log(student["address"]["street"]);  // Output: 123 Main St`} 
        />
      </div>

      {/* Looping Through Objects */}
      <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Looping Through Objects
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Use <code>for...in</code> loop to iterate over object properties:
        </p>

        <CodeBlock 
          code={`const person = {\n  name: "Emma",\n  age: 15,\n  city: "New York"\n};\n\n// Loop through all properties\nfor (let key in person) {\n  console.log(key + ": " + person[key]);\n}\n\n// Output:\n// name: Emma\n// age: 15\n// city: New York`} 
        />

        <p className="text-slate-600 dark:text-slate-350 leading-relaxed mt-3">
          You can also use <code>Object.keys()</code>, <code>Object.values()</code>, or <code>Object.entries()</code>:
        </p>

        <CodeBlock 
          code={`const person = {\n  name: "Emma",\n  age: 15,\n  city: "New York"\n};\n\n// Get all keys\nconsole.log(Object.keys(person));\n// Output: ["name", "age", "city"]\n\n// Get all values\nconsole.log(Object.values(person));\n// Output: ["Emma", 15, "New York"]\n\n// Get key-value pairs\nconsole.log(Object.entries(person));\n// Output: [["name", "Emma"], ["age", 15], ["city", "New York"]]`} 
        />
      </div>

      {/* Useful Object Methods */}
      <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
          <Key className="w-5 h-5" /> Useful Object Methods
        </h3>
        <NoteTable headers={methodsHeaders} rows={methodsRows} />

        <div className="mt-4">
          <h4 className="font-semibold text-slate-800 dark:text-slate-100 mb-2">Examples:</h4>
          <CodeBlock 
            code={`const student = {\n  name: "Alex",\n  age: 16,\n  grade: "10th"\n};\n\n// Get all keys\nconsole.log(Object.keys(student));\n// Output: ["name", "age", "grade"]\n\n// Get all values\nconsole.log(Object.values(student));\n// Output: ["Alex", 16, "10th"]\n\n// Get entries (key-value pairs)\nconsole.log(Object.entries(student));\n// Output: [["name", "Alex"], ["age", 16], ["grade", "10th"]]\n\n// Check if property exists\nconsole.log(student.hasOwnProperty("name"));  // Output: true\nconsole.log(student.hasOwnProperty("email")); // Output: false\n\n// Copy/merge objects\nconst person = { name: "Emma" };\nconst details = { age: 15, city: "Boston" };\nconst combined = Object.assign({}, person, details);\nconsole.log(combined);\n// Output: { name: "Emma", age: 15, city: "Boston" }`} 
          />
        </div>
      </div>

      {/* Object vs Primitive Types */}
      <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
          <Layers className="w-5 h-5" /> Objects vs Primitive Types
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          <strong>Key difference:</strong> Objects are <strong>reference types</strong>, 
          while primitives (number, string, boolean) are <strong>value types</strong>.
        </p>

        <CodeBlock 
          code={`// Primitive types - copied by value\nlet a = 10;\nlet b = a;  // b gets a copy of the value\na = 20;\nconsole.log(a);  // Output: 20\nconsole.log(b);  // Output: 10 (unchanged)\n\n// Objects - copied by reference\nlet person1 = { name: "Emma", age: 15 };\nlet person2 = person1;  // person2 references the same object\nperson1.age = 16;\nconsole.log(person1.age);  // Output: 16\nconsole.log(person2.age);  // Output: 16 (also changed!)\n\n// To create a true copy of an object:\nlet person3 = { ...person1 };  // Spread operator\n// or\nlet person4 = Object.assign({}, person1);`} 
        />

        <Infobox type="warning" title="Important!">
          When you assign an object to a new variable, you're copying the <strong>reference</strong>, 
          not the actual object. Both variables point to the same object in memory!
        </Infobox>
      </div>

      {/* Practical Example */}
      <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
          <Zap className="w-5 h-5" /> Practical Example
        </h3>
        <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
          Let's create a complete example using objects:
        </p>

        <CodeBlock 
          code={`// Create a student management system\nconst student = {\n  // Properties\n  firstName: "Alex",\n  lastName: "Johnson",\n  age: 16,\n  grade: "10th",\n  subjects: ["Math", "Science", "English"],\n  \n  // Nested object for contact info\n  contact: {\n    email: "alex@school.com",\n    phone: "555-1234"\n  },\n  \n  // Methods\n  getFullName() {\n    return \`\${this.firstName} \${this.lastName}\`;\n  },\n  \n  introduce() {\n    return \`Hi! I'm \${this.getFullName()}, a \${this.grade} grader.\`;\n  },\n  \n  addSubject(subject) {\n    this.subjects.push(subject);\n    console.log(\`Added \${subject} to subjects.\`);\n  },\n  \n  getAge() {\n    return this.age;\n  }\n};\n\n// Using the object\nconsole.log(student.getFullName());     // Output: Alex Johnson\nconsole.log(student.introduce());       // Output: Hi! I'm Alex Johnson, a 10th grader.\nstudent.addSubject("History");          // Output: Added History to subjects.\nconsole.log(student.subjects);          // Output: ["Math", "Science", "English", "History"]\nconsole.log(student.contact.email);     // Output: alex@school.com`} 
        />
      </div>
    </section>
  );
};

export default Objects;
