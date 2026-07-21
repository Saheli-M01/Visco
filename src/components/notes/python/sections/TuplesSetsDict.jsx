// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Layers,
    Lock,
    ListChecks,
    Fingerprint,
    Braces,
    ShieldAlert,
    Sparkles,
    ArrowRightLeft,
    Table2,
} from "lucide-react";

const TuplesSetsDict = () => {
    const comparisonHeaders = ["Feature", "Tuple", "Set", "Dictionary"];
    const comparisonRows = [
        ["Syntax", <code>(1, 2, 3)</code>, <code>{"{1, 2, 3}"}</code>, <code>{'{\"a\": 1}'}</code>],
        ["Ordered?", "✅ Yes", "❌ No", "✅ Yes (3.7+)"],
        ["Mutable?", "❌ No (immutable)", "✅ Yes", "✅ Yes"],
        ["Duplicates?", "✅ Allowed", "❌ Not allowed", "❌ Keys must be unique"],
        ["Indexing?", "✅ Yes", "❌ No", "✅ By key"],
        ["Use case", "Fixed collections, function returns", "Unique items, set operations", "Key-value mappings"],
    ];

    return (
        <section className="scroll-mt-20 space-y-6">

            {/* ═══════════════════════ TUPLES ═══════════════════════ */}
            <div id="tuples" className="space-y-5 pt-4 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Lock className="w-8 h-8" /> Tuples
                    </h1>
                    <p className="text-violet-50 mt-1 text-sm">
                        Ordered, immutable collections — once created, they cannot be changed.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <strong>tuple</strong> is like a list, but it <strong>cannot be modified</strong> after
                        creation. It is defined using parentheses <code>()</code> and can hold any type of data.
                        Tuples are used when you want to make sure data stays <strong>constant</strong> throughout
                        the program.
                    </p>
                </div>

                {/* Creating tuples */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="creating-tuples">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <Lock className="w-5 h-5" /> 1. Creating Tuples
                    </h3>
                    <CodeBlock code={`# Different ways to create tuples
fruits = ("apple", "banana", "cherry")
numbers = (1, 2, 3, 4, 5)
mixed = ("Rahul", 15, True, 3.14)

# Single element tuple (MUST have a trailing comma!)
single = (42,)       # This IS a tuple
not_tuple = (42)     # This is just an integer!

# Empty tuple
empty = ()

# tuple() constructor
from_list = tuple([1, 2, 3])

print(type(fruits))   # <class 'tuple'>
print(type(single))   # <class 'tuple'>
print(type(not_tuple)) # <class 'int'>`} />
                    <Infobox type="warning" title="Single Element Trap">
                        A single-element tuple <strong>must</strong> have a trailing comma:{" "}
                        <code>(42,)</code>. Without the comma, Python treats <code>(42)</code> as
                        just the number 42 inside parentheses.
                    </Infobox>
                </div>

                {/* Accessing tuple elements */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="tuple-access">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 2. Accessing & Slicing
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Tuples support <strong>indexing</strong> (starting from 0) and <strong>slicing</strong>{" "}
                        just like lists. Negative indices count from the end.
                    </p>
                    <CodeBlock code={`colors = ("red", "green", "blue", "yellow", "purple")

# Indexing
print(colors[0])      # red
print(colors[-1])     # purple

# Slicing
print(colors[1:3])    # ('green', 'blue')
print(colors[:3])     # ('red', 'green', 'blue')
print(colors[2:])     # ('blue', 'yellow', 'purple')

# Length
print(len(colors))    # 5

# Check membership
print("blue" in colors)      # True
print("orange" in colors)    # False`} />
                </div>

                {/* Tuple immutability */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="tuple-immutable">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> 3. Tuples Are Immutable
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        You <strong>cannot</strong> add, remove, or change elements in a tuple after
                        creation. Attempting to do so raises a <code>TypeError</code>.
                    </p>
                    <CodeBlock code={`fruits = ("apple", "banana", "cherry")

# These will ALL cause errors:
# fruits[0] = "mango"     # TypeError: 'tuple' does not support item assignment
# fruits.append("grape")  # AttributeError: 'tuple' has no attribute 'append'
# del fruits[1]           # TypeError: 'tuple' does not support item deletion

# Workaround: convert to list, modify, convert back
temp = list(fruits)
temp.append("mango")
fruits = tuple(temp)
print(fruits)  # ('apple', 'banana', 'cherry', 'mango')`} />
                </div>

                {/* Tuple unpacking */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="tuple-unpacking">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 4. Tuple Unpacking & Useful Operations
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <strong>Unpacking</strong> lets you assign each element of a tuple to separate
                        variables in one line. This is very commonly used with functions that return
                        multiple values.
                    </p>
                    <CodeBlock code={`# Tuple unpacking
coordinates = (28.6139, 77.2090)
lat, lon = coordinates
print("Latitude:", lat)    # 28.6139
print("Longitude:", lon)   # 77.2090

# Swap two variables without a temp variable!
a = 10
b = 20
a, b = b, a
print(a, b)  # 20 10

# Tuple methods
numbers = (1, 2, 3, 2, 4, 2, 5)
print(numbers.count(2))   # 3  (how many times 2 appears)
print(numbers.index(4))   # 4  (position of first 4)

# Tuple concatenation
t1 = (1, 2, 3)
t2 = (4, 5, 6)
t3 = t1 + t2
print(t3)  # (1, 2, 3, 4, 5, 6)`} />
                </div>
            </div>

            {/* ═══════════════════════ SETS ═══════════════════════ */}
            <div id="sets" className="space-y-5 pt-6 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Fingerprint className="w-8 h-8" /> Sets
                    </h1>
                    <p className="text-amber-50 mt-1 text-sm">
                        Unordered collections of unique elements — no duplicates allowed.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <strong>set</strong> is an <strong>unordered</strong> collection that
                        automatically removes <strong>duplicate</strong> values. Sets are defined
                        using curly braces <code>{"{}"}</code> or the <code>set()</code> constructor.
                        They are great for membership testing, removing duplicates, and mathematical
                        set operations like union and intersection.
                    </p>
                </div>

                {/* Creating sets */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="creating-sets">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Fingerprint className="w-5 h-5" /> 1. Creating Sets
                    </h3>
                    <CodeBlock code={`# Creating a set
fruits = {"apple", "banana", "cherry"}
print(fruits)   # {'cherry', 'banana', 'apple'} (order may vary!)

# Duplicates are automatically removed
numbers = {1, 2, 3, 2, 4, 3, 5}
print(numbers)  # {1, 2, 3, 4, 5}

# Empty set (NOT {} — that creates an empty dictionary!)
empty_set = set()
print(type(empty_set))   # <class 'set'>

# From a list (removes duplicates!)
names = ["Rahul", "Priya", "Rahul", "Aman", "Priya"]
unique_names = set(names)
print(unique_names)  # {'Rahul', 'Priya', 'Aman'}`} />
                    <Infobox type="warning" title="Empty Set Gotcha">
                        <code>{"{}"}</code> creates an empty <strong>dictionary</strong>, not a set!
                        Use <code>set()</code> to create an empty set.
                    </Infobox>
                </div>

                {/* Set operations - add/remove */}
                <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="set-modify">
                    <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 2. Adding & Removing Elements
                    </h3>
                    <CodeBlock code={`fruits = {"apple", "banana"}

# Add a single element
fruits.add("cherry")
print(fruits)  # {'apple', 'banana', 'cherry'}

# Add multiple elements
fruits.update(["mango", "grape"])
print(fruits)  # {'apple', 'banana', 'cherry', 'mango', 'grape'}

# Remove an element (raises error if not found)
fruits.remove("banana")
print(fruits)  # {'apple', 'cherry', 'mango', 'grape'}

# Discard an element (no error if not found)
fruits.discard("orange")  # No error even though "orange" isn't in the set

# Pop a random element
removed = fruits.pop()
print("Removed:", removed)

# Clear all elements
fruits.clear()
print(fruits)  # set()`} />
                </div>

                {/* Set math operations */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="set-operations">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 3. Set Operations (Union, Intersection, Difference)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Sets support powerful mathematical operations to compare and combine
                        collections. These are incredibly useful in real-world programming.
                    </p>
                    <CodeBlock code={`a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Union — all elements from both sets (no duplicates)
print(a | b)           # {1, 2, 3, 4, 5, 6, 7, 8}
print(a.union(b))      # Same result

# Intersection — only elements present in BOTH sets
print(a & b)               # {4, 5}
print(a.intersection(b))   # Same result

# Difference — elements in a but NOT in b
print(a - b)               # {1, 2, 3}
print(a.difference(b))     # Same result

# Symmetric Difference — elements in either, but NOT both
print(a ^ b)                        # {1, 2, 3, 6, 7, 8}
print(a.symmetric_difference(b))    # Same result`} />
                    <NoteTable
                        headers={["Operation", "Symbol", "Method", "Meaning"]}
                        rows={[
                            ["Union", <code>a | b</code>, <code>a.union(b)</code>, "Everything from both"],
                            ["Intersection", <code>a & b</code>, <code>a.intersection(b)</code>, "Common to both"],
                            ["Difference", <code>a - b</code>, <code>a.difference(b)</code>, "In a, not in b"],
                            ["Symmetric Diff", <code>a ^ b</code>, <code>a.symmetric_difference(b)</code>, "In either, not both"],
                        ]}
                    />
                </div>

                {/* Set membership & practical */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="set-practical">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 4. Practical Example: Finding Common Friends
                    </h3>
                    <CodeBlock code={`# Real-world example: common friends
rahul_friends = {"Aman", "Priya", "Sneha", "Vikram"}
priya_friends = {"Sneha", "Rahul", "Aman", "Neha"}

# Mutual friends
mutual = rahul_friends & priya_friends
print("Mutual friends:", mutual)
# {'Sneha', 'Aman'}

# Friends of Rahul but not Priya
only_rahul = rahul_friends - priya_friends
print("Only Rahul's friends:", only_rahul)
# {'Priya', 'Vikram'}

# All friends combined
all_friends = rahul_friends | priya_friends
print("Total unique friends:", len(all_friends))
# 6`} />
                </div>
            </div>

            {/* ═══════════════════════ DICTIONARIES ═══════════════════════ */}
            <div id="dictionaries" className="space-y-5 pt-6 border-t">
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
            </div>

            {/* ═══════════════════════ COMPARISON TABLE ═══════════════════════ */}
            <div className="space-y-3 pt-6 border-t">
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Table2 className="w-5 h-5" /> Tuple vs Set vs Dictionary — Comparison
                </h2>
                <NoteTable headers={comparisonHeaders} rows={comparisonRows} />
            </div>
        </section>
    );
};

export default TuplesSetsDict;
