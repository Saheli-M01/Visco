import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import {
    Braces,
    Layers,
    Sparkles,
    ListChecks,
    Table2,
} from "lucide-react";

const Dictionaries = () => {
    return (
        <section className="scroll-mt-20 space-y-6">
            <div id="dictionaries" className="space-y-5 pt-4 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Braces className="w-8 h-8" /> Dictionaries
                    </h1>
                    <p className="text-rose-50 mt-1 text-sm">
                        Key-value pairs — the most versatile data structure in Python.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <strong>dictionary</strong> stores data as <strong>key-value pairs</strong>.
                        Think of it like a real dictionary: you look up a <strong>word</strong> (key)
                        and get its <strong>meaning</strong> (value). Each key must be <strong>unique</strong>,
                        and keys can be strings, numbers, or tuples — but <strong>not</strong> lists or other
                        dictionaries.
                    </p>
                </div>

                {/* Creating dictionaries */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="creating-dict">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <Braces className="w-5 h-5" /> 1. Creating Dictionaries
                    </h3>
                    <CodeBlock code={`# Creating a dictionary
student = {
    "name": "Rahul",
    "age": 15,
    "city": "Mumbai",
    "marks": 92
}
print(student)
# {'name': 'Rahul', 'age': 15, 'city': 'Mumbai', 'marks': 92}

# Using dict() constructor
person = dict(name="Priya", age=14, city="Delhi")
print(person)

# Empty dictionary
empty = {}
print(type(empty))  # <class 'dict'>`} />
                </div>

                {/* Accessing values */}
                <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-access">
                    <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 2. Accessing Values
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Access values by their <strong>key</strong> using square brackets or the{" "}
                        <code>.get()</code> method. The <code>.get()</code> method is safer because
                        it returns <code>None</code> (or a default) instead of raising an error if
                        the key doesn't exist.
                    </p>
                    <CodeBlock code={`student = {"name": "Rahul", "age": 15, "marks": 92}

# Using square brackets
print(student["name"])    # Rahul
print(student["marks"])   # 92

# Using .get() — safer, returns None if key not found
print(student.get("city"))         # None (no error!)
print(student.get("city", "N/A")) # N/A (custom default)

# Using square brackets with missing key causes error:
# print(student["city"])  # KeyError: 'city'`} />
                </div>

                {/* Adding, updating, deleting */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-modify">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 3. Adding, Updating & Deleting
                    </h3>
                    <CodeBlock code={`student = {"name": "Rahul", "age": 15}

# Add a new key-value pair
student["city"] = "Mumbai"
print(student)
# {'name': 'Rahul', 'age': 15, 'city': 'Mumbai'}

# Update an existing value
student["age"] = 16
print(student["age"])  # 16

# Update multiple values at once
student.update({"marks": 95, "grade": "A+"})
print(student)
# {'name': 'Rahul', 'age': 16, 'city': 'Mumbai', 'marks': 95, 'grade': 'A+'}

# Delete a specific key
del student["grade"]
print(student)  # grade is removed

# Pop — removes and returns the value
marks = student.pop("marks")
print("Removed marks:", marks)  # 95

# Clear all items
student.clear()
print(student)  # {}`} />
                </div>

                {/* Looping through dictionaries */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-looping">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <ListChecks className="w-5 h-5" /> 4. Looping Through Dictionaries
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        You can iterate over keys, values, or both key-value pairs:
                    </p>
                    <CodeBlock code={`student = {"name": "Rahul", "age": 15, "city": "Mumbai"}

# Loop through keys
for key in student:
    print(key)
# name, age, city

# Loop through values
for value in student.values():
    print(value)
# Rahul, 15, Mumbai

# Loop through both key and value
for key, value in student.items():
    print(key + ": " + str(value))
# name: Rahul
# age: 15
# city: Mumbai

# Check if a key exists
if "name" in student:
    print("Name found:", student["name"])
# Name found: Rahul`} />
                </div>

                {/* Nested dictionaries */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="nested-dict">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 5. Nested Dictionaries
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A dictionary can contain other dictionaries as values — this is called
                        <strong> nesting</strong>. Very useful for organizing complex, structured data.
                    </p>
                    <CodeBlock code={`# Nested dictionary
classroom = {
    "student1": {
        "name": "Rahul",
        "marks": 92
    },
    "student2": {
        "name": "Priya",
        "marks": 88
    },
    "student3": {
        "name": "Aman",
        "marks": 95
    }
}

# Access nested values
print(classroom["student1"]["name"])    # Rahul
print(classroom["student3"]["marks"])   # 95

# Loop through nested dictionary
for student_id, details in classroom.items():
    print(f"{details['name']} scored {details['marks']}")`} />
                </div>

                {/* Dictionary methods reference */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-methods">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Table2 className="w-5 h-5" /> 6. Common Dictionary Methods
                    </h3>
                    <NoteTable
                        headers={["Method", "What It Does", "Example"]}
                        rows={[
                            [<code>.get(key)</code>, "Get value safely (returns None if missing)", <code>d.get("name")</code>],
                            [<code>.keys()</code>, "Returns all keys", <code>d.keys()</code>],
                            [<code>.values()</code>, "Returns all values", <code>d.values()</code>],
                            [<code>.items()</code>, "Returns all key-value pairs as tuples", <code>d.items()</code>],
                            [<code>.update()</code>, "Merge another dictionary in", <code>{"d.update({...})"}</code>],
                            [<code>.pop(key)</code>, "Remove key and return its value", <code>d.pop("name")</code>],
                            [<code>.clear()</code>, "Remove all items", <code>d.clear()</code>],
                            [<code>len(d)</code>, "Count number of key-value pairs", <code>len(d)</code>],
                            [<code>key in d</code>, "Check if a key exists", <code>"name" in d</code>],
                        ]}
                    />
                </div>

                {/* Practical example */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-practical">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 7. Practical Example: Student Report Card
                    </h3>
                    <CodeBlock code={`# Building a report card
report = {
    "name": "Rahul Sharma",
    "class": "10th",
    "subjects": {
        "Mathematics": 92,
        "Science": 88,
        "English": 78,
        "Hindi": 85,
        "Computer": 95
    }
}

# Calculate total and percentage
total = sum(report["subjects"].values())
num_subjects = len(report["subjects"])
percentage = total / num_subjects

print(f"Student: {report['name']}")
print(f"Class: {report['class']}")
print(f"Total Marks: {total}/{num_subjects * 100}")
print(f"Percentage: {percentage:.1f}%")
print()

# Find highest and lowest scoring subjects
best = max(report["subjects"], key=report["subjects"].get)
worst = min(report["subjects"], key=report["subjects"].get)
print(f"Best subject: {best} ({report['subjects'][best]})")
print(f"Needs improvement: {worst} ({report['subjects'][worst]})")

# Output:
# Student: Rahul Sharma
# Class: 10th
# Total Marks: 438/500
# Percentage: 87.6%
#
# Best subject: Computer (95)
# Needs improvement: English (78)`} />
                </div>

                {/* Dictionary comprehension */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-comprehension">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 8. Dictionary Comprehension
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Just like list comprehension builds a list in one line, <strong>dictionary
                        comprehension</strong> builds a dictionary in one line. The syntax is:{" "}
                        <code>{`{key: value for item in iterable}`}</code>
                    </p>
                    <CodeBlock code={`# Squares of 1 to 5
squares = {x: x**2 for x in range(1, 6)}
print(squares)
# {1: 1, 2: 4, 3: 9, 4: 16, 5: 25}

# Map names to their lengths
names = ["Rahul", "Priya", "Aman", "Sneha"]
name_lengths = {name: len(name) for name in names}
print(name_lengths)
# {'Rahul': 5, 'Priya': 5, 'Aman': 4, 'Sneha': 5}

# With condition — only subjects with marks >= 80
subjects = {"Math": 92, "Science": 75, "English": 88, "Hindi": 65}
passed = {sub: marks for sub, marks in subjects.items() if marks >= 80}
print(passed)
# {'Math': 92, 'English': 88}

# Invert a dictionary (swap keys and values)
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)
# {1: 'a', 2: 'b', 3: 'c'}`} />
                </div>

                {/* setdefault and fromkeys */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="dict-extra-methods">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <ListChecks className="w-5 h-5" /> 9. More Useful Methods
                    </h3>

                    <div className="space-y-4">
                        <div>
                            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">setdefault() — get or insert</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-350 mb-2">
                                Returns the value for a key if it exists. If it <em>doesn't</em> exist,
                                it inserts the key with a default value and returns that.
                            </p>
                            <CodeBlock code={`student = {"name": "Rahul", "marks": 85}

# Key exists — returns existing value, no change
print(student.setdefault("marks", 0))    # 85

# Key doesn't exist — inserts it with default value
print(student.setdefault("city", "N/A")) # N/A
print(student)
# {'name': 'Rahul', 'marks': 85, 'city': 'N/A'}

# Classic use: building a frequency counter
words = ["apple", "banana", "apple", "cherry", "banana", "apple"]
count = {}
for word in words:
    count.setdefault(word, 0)
    count[word] += 1
print(count)
# {'apple': 3, 'banana': 2, 'cherry': 1}`} />
                        </div>

                        <div>
                            <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">dict.fromkeys() — create dict from a list of keys</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-350 mb-2">
                                A quick way to create a dictionary from a list of keys, all with the
                                same initial value.
                            </p>
                            <CodeBlock code={`# All students start with 0 marks
subjects = ["Math", "Science", "English"]
gradebook = dict.fromkeys(subjects, 0)
print(gradebook)
# {'Math': 0, 'Science': 0, 'English': 0}

# Default None value
keys = ["name", "age", "city"]
template = dict.fromkeys(keys)
print(template)
# {'name': None, 'age': None, 'city': None}`} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Dictionaries;
