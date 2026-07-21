// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    List,
    Plus,
    Minus,
    Layers,
    ArrowRightLeft,
    Sparkles,
    Table2,
    ScanSearch,
    Copy,
} from "lucide-react";

const Lists = () => {
    return (
        <section className="scroll-mt-20 space-y-6">
            <div id="lists" className="space-y-5 pt-4 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <List className="w-8 h-8" /> Lists
                    </h1>
                    <p className="text-blue-50 mt-1 text-sm">
                        Ordered, mutable collections — the most commonly used data structure in Python.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <strong>list</strong> is an ordered, mutable collection that can hold any type of data.
                        Lists are defined using square brackets <code>[]</code> and are one of the most powerful
                        and versatile data structures in Python. You can add, remove, and change elements
                        freely after creation.
                    </p>
                </div>

                {/* Creating lists */}
                <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="creating-lists">
                    <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <List className="w-5 h-5" /> 1. Creating Lists
                    </h3>
                    <CodeBlock code={`# Different ways to create lists
fruits = ["apple", "banana", "cherry"]
numbers = [1, 2, 3, 4, 5]
mixed = ["Rahul", 15, True, 3.14]

# Empty list
empty = []
also_empty = list()

# list() constructor — convert other iterables
from_string = list("hello")
print(from_string)  # ['h', 'e', 'l', 'l', 'o']

from_range = list(range(1, 6))
print(from_range)   # [1, 2, 3, 4, 5]

# Nested list (list inside a list)
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]

print(type(fruits))   # <class 'list'>
print(len(fruits))    # 3`} />
                </div>

                {/* Accessing & slicing */}
                <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-access">
                    <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 2. Accessing & Slicing
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Lists support <strong>indexing</strong> (starting from 0) and <strong>slicing</strong>{" "}
                        just like strings. Negative indices count from the end.
                    </p>
                    <CodeBlock code={`colors = ["red", "green", "blue", "yellow", "purple"]

# Indexing
print(colors[0])      # red
print(colors[-1])     # purple
print(colors[-2])     # yellow

# Slicing — list[start:end:step]
print(colors[1:3])    # ['green', 'blue']
print(colors[:3])     # ['red', 'green', 'blue']
print(colors[2:])     # ['blue', 'yellow', 'purple']
print(colors[::2])    # ['red', 'blue', 'purple']  (every 2nd)
print(colors[::-1])   # ['purple', 'yellow', 'blue', 'green', 'red']  (reversed)

# Check membership
print("blue" in colors)      # True
print("orange" in colors)    # False`} />
                </div>

                {/* Modifying lists */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-modify">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 3. Modifying Lists
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Unlike tuples, lists are <strong>mutable</strong> — you can change, add, and remove
                        elements after creation.
                    </p>
                    <CodeBlock code={`fruits = ["apple", "banana", "cherry"]

# Change an element
fruits[1] = "mango"
print(fruits)  # ['apple', 'mango', 'cherry']

# Change a range of elements
fruits[0:2] = ["grape", "kiwi"]
print(fruits)  # ['grape', 'kiwi', 'cherry']`} />
                </div>

                {/* Adding elements */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-add">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Plus className="w-5 h-5" /> 4. Adding Elements
                    </h3>
                    <CodeBlock code={`fruits = ["apple", "banana"]

# append() — add to the end
fruits.append("cherry")
print(fruits)  # ['apple', 'banana', 'cherry']

# insert() — add at a specific position
fruits.insert(1, "mango")
print(fruits)  # ['apple', 'mango', 'banana', 'cherry']

# extend() — add multiple elements from another list
fruits.extend(["grape", "kiwi"])
print(fruits)  # ['apple', 'mango', 'banana', 'cherry', 'grape', 'kiwi']

# Using + operator (creates a new list)
more = fruits + ["orange"]
print(more)  # [..., 'orange']

# Using * to repeat
repeated = [0] * 5
print(repeated)  # [0, 0, 0, 0, 0]`} />
                    <Infobox type="tip" title="append() vs extend()">
                        <code>append()</code> adds the entire argument as a <strong>single element</strong>.{" "}
                        <code>extend()</code> adds each element of the argument <strong>individually</strong>.{" "}
                        <code>fruits.append([1, 2])</code> adds <code>[1, 2]</code> as one nested list, while{" "}
                        <code>fruits.extend([1, 2])</code> adds <code>1</code> and <code>2</code> separately.
                    </Infobox>
                </div>

                {/* Removing elements */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-remove">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <Minus className="w-5 h-5" /> 5. Removing Elements
                    </h3>
                    <CodeBlock code={`fruits = ["apple", "banana", "cherry", "banana", "mango"]

# remove() — removes the FIRST occurrence
fruits.remove("banana")
print(fruits)  # ['apple', 'cherry', 'banana', 'mango']

# pop() — removes by index and returns the value
removed = fruits.pop(1)     # removes 'cherry'
print(removed)              # cherry
print(fruits)               # ['apple', 'banana', 'mango']

last = fruits.pop()         # removes last element
print(last)                 # mango

# del — delete by index or slice
nums = [10, 20, 30, 40, 50]
del nums[2]
print(nums)   # [10, 20, 40, 50]

del nums[1:3]
print(nums)   # [10, 50]

# clear() — remove all elements
nums.clear()
print(nums)   # []`} />
                </div>

                {/* Sorting & searching */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-sort">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <ScanSearch className="w-5 h-5" /> 6. Sorting & Searching
                    </h3>
                    <CodeBlock code={`numbers = [5, 2, 8, 1, 9, 3]

# sort() — sorts the list IN PLACE (modifies original)
numbers.sort()
print(numbers)  # [1, 2, 3, 5, 8, 9]

# Reverse sort
numbers.sort(reverse=True)
print(numbers)  # [9, 8, 5, 3, 2, 1]

# sorted() — returns a NEW sorted list (original unchanged)
original = [5, 2, 8, 1]
new_sorted = sorted(original)
print(original)    # [5, 2, 8, 1]  (unchanged)
print(new_sorted)  # [1, 2, 5, 8]

# reverse() — reverse the list in place
numbers.reverse()
print(numbers)

# Finding elements
fruits = ["apple", "banana", "cherry", "banana"]
print(fruits.index("banana"))  # 1  (first occurrence)
print(fruits.count("banana"))  # 2  (how many times)

# min, max, sum
nums = [10, 20, 30, 40]
print(min(nums))   # 10
print(max(nums))   # 40
print(sum(nums))   # 100`} />
                </div>

                {/* List comprehension */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-comprehension">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 7. List Comprehension
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A <strong>concise</strong> way to create lists in a single line. The syntax is:{" "}
                        <code>[expression for item in iterable if condition]</code>
                    </p>
                    <CodeBlock code={`# Basic — squares of 1 to 5
squares = [x ** 2 for x in range(1, 6)]
print(squares)  # [1, 4, 9, 16, 25]

# With condition — only even numbers
evens = [x for x in range(1, 11) if x % 2 == 0]
print(evens)  # [2, 4, 6, 8, 10]

# Transform strings
names = ["rahul", "priya", "aman"]
upper_names = [name.upper() for name in names]
print(upper_names)  # ['RAHUL', 'PRIYA', 'AMAN']

# With if-else
labels = ["even" if x % 2 == 0 else "odd" for x in range(1, 6)]
print(labels)  # ['odd', 'even', 'odd', 'even', 'odd']

# Flatten a 2D list
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [num for row in matrix for num in row]
print(flat)  # [1, 2, 3, 4, 5, 6]`} />
                </div>

                {/* Common methods table */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-methods">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Table2 className="w-5 h-5" /> 8. Common List Methods
                    </h3>
                    <NoteTable
                        headers={["Method", "What It Does", "Example"]}
                        rows={[
                            [<code>.append(x)</code>, "Add x to the end", <code>lst.append(5)</code>],
                            [<code>.insert(i, x)</code>, "Insert x at position i", <code>lst.insert(0, 5)</code>],
                            [<code>.extend(iter)</code>, "Add all elements of iterable", <code>lst.extend([1, 2])</code>],
                            [<code>.remove(x)</code>, "Remove first occurrence of x", <code>lst.remove(5)</code>],
                            [<code>.pop(i)</code>, "Remove & return element at i (default: last)", <code>lst.pop()</code>],
                            [<code>.sort()</code>, "Sort the list in place", <code>lst.sort()</code>],
                            [<code>.reverse()</code>, "Reverse the list in place", <code>lst.reverse()</code>],
                            [<code>.index(x)</code>, "Return index of first x", <code>lst.index(5)</code>],
                            [<code>.count(x)</code>, "Count occurrences of x", <code>lst.count(5)</code>],
                            [<code>.copy()</code>, "Return a shallow copy", <code>new = lst.copy()</code>],
                            [<code>.clear()</code>, "Remove all elements", <code>lst.clear()</code>],
                            [<code>len(lst)</code>, "Number of elements", <code>len(lst)</code>],
                        ]}
                    />
                </div>

                {/* enumerate and zip */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-enumerate-zip">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 9. enumerate() and zip()
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        These two built-in functions are used constantly with lists. Learn them early
                        — they make loops much cleaner.
                    </p>
                    <div className="space-y-3">
                        <h4 className="font-bold text-amber-700 dark:text-amber-400">enumerate() — index + value together</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-350">
                            Instead of <code>range(len(list))</code>, use <code>enumerate()</code> to get
                            both the index and the value in one clean step.
                        </p>
                        <CodeBlock code={`fruits = ["apple", "banana", "cherry"]

# Old way (clunky)
for i in range(len(fruits)):
    print(i, fruits[i])

# Clean way with enumerate()
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry

# Start counting from 1 instead of 0
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry`} />

                        <h4 className="font-bold text-amber-700 dark:text-amber-400 pt-2">zip() — loop two lists at the same time</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-350">
                            <code>zip()</code> pairs elements from multiple lists together, like a zipper. It stops
                            when the shortest list runs out.
                        </p>
                        <CodeBlock code={`names  = ["Rahul", "Priya", "Aman"]
marks  = [85, 92, 78]
grades = ["B", "A+", "B+"]

# Pair two lists
for name, mark in zip(names, marks):
    print(f"{name}: {mark}")
# Rahul: 85
# Priya: 92
# Aman: 78

# Pair three lists
for name, mark, grade in zip(names, marks, grades):
    print(f"{name} — {mark} ({grade})")
# Rahul — 85 (B)
# Priya — 92 (A+)
# Aman — 78 (B+)

# Create a list of tuples
pairs = list(zip(names, marks))
print(pairs)
# [('Rahul', 85), ('Priya', 92), ('Aman', 78)]`} />
                    </div>
                </div>

                {/* Copy vs reference */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-copy">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 10. Copying Lists — A Common Trap
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        In Python, <code>b = a</code> does <strong>not</strong> create a new list — it
                        just creates a second name pointing to the <strong>same</strong> list. Any change
                        to <code>b</code> will also change <code>a</code>.
                    </p>
                    <CodeBlock code={`# THE TRAP — both names point to the same list
a = [1, 2, 3]
b = a          # b is NOT a copy — it's the same list!

b.append(4)
print(a)   # [1, 2, 3, 4]  ← a was changed too!
print(b)   # [1, 2, 3, 4]

# SOLUTION 1: .copy() method — shallow copy
a = [1, 2, 3]
b = a.copy()
b.append(4)
print(a)   # [1, 2, 3]   ← a is NOT affected
print(b)   # [1, 2, 3, 4]

# SOLUTION 2: slice [:] — also a shallow copy
b = a[:]
b.append(99)
print(a)   # [1, 2, 3]   ← safe
print(b)   # [1, 2, 3, 99]

# SOLUTION 3: list() constructor
b = list(a)`} />
                    <Infobox type="warning" title="Shallow Copy Warning">
                        <code>.copy()</code> creates a <strong>shallow copy</strong> — it copies the outer list,
                        but nested lists inside are still shared. If you have a list of lists and need
                        fully independent copies, use <code>import copy; b = copy.deepcopy(a)</code>.
                    </Infobox>
                    <CodeBlock code={`import copy

nested = [[1, 2], [3, 4]]
shallow = nested.copy()
deep    = copy.deepcopy(nested)

nested[0].append(99)
print(shallow)   # [[1, 2, 99], [3, 4]]  ← inner list was shared!
print(deep)      # [[1, 2], [3, 4]]       ← fully independent`} />
                </div>

                {/* Practical example */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-practical">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 11. Practical Example: Student Marks Manager
                    </h3>
                    <CodeBlock code={`# Student marks manager
marks = [85, 92, 78, 95, 88, 72, 90]

# Basic stats
print("Total students:", len(marks))
print("Highest:", max(marks))
print("Lowest:", min(marks))
print(f"Average: {sum(marks) / len(marks):.1f}")

# Students scoring above 80
above_80 = [m for m in marks if m > 80]
print("Above 80:", above_80)
print("Count:", len(above_80))

# Sort and find top 3
sorted_marks = sorted(marks, reverse=True)
print("Top 3:", sorted_marks[:3])

# Print numbered ranking using enumerate
print("\\nRanking:")
for rank, score in enumerate(sorted_marks, start=1):
    print(f"  {rank}. {score}")

# Add a new student's marks
marks.append(91)

# Remove lowest score
marks.remove(min(marks))
print("After update:", marks)`} />
                </div>
            </div>
        </section>
    );
};

export default Lists;
