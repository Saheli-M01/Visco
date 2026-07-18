import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Fingerprint,
    Sparkles,
    ArrowRightLeft,
} from "lucide-react";

const Sets = () => {
    return (
        <section className="scroll-mt-20 space-y-6">
            <div id="sets" className="space-y-5 pt-4 border-t">
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

                {/* Set comprehension */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="set-comprehension">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 5. Set Comprehension
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Just like list comprehension, you can build a set in one line using curly braces.
                        Duplicates are automatically removed.
                    </p>
                    <CodeBlock code={`# Squares of 1 to 5
squares = {x ** 2 for x in range(1, 6)}
print(squares)  # {1, 4, 9, 16, 25}

# Unique first letters from a list of words
words = ["apple", "banana", "avocado", "blueberry", "cherry"]
first_letters = {word[0] for word in words}
print(first_letters)  # {'a', 'b', 'c'}  (only unique letters)

# Remove duplicates from a list with comprehension
numbers = [1, 2, 2, 3, 3, 3, 4]
unique = {n for n in numbers}
print(unique)  # {1, 2, 3, 4}`} />
                </div>

                {/* Frozenset */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="frozenset">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 6. frozenset — The Immutable Set
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A <code>frozenset</code> is exactly like a set, but <strong>immutable</strong> —
                        you cannot add or remove elements after creating it. Because it's immutable,
                        a frozenset can be used as a dictionary key or stored inside another set
                        (regular sets cannot).
                    </p>
                    <CodeBlock code={`# Create a frozenset
fs = frozenset([1, 2, 3, 2, 4])
print(fs)         # frozenset({1, 2, 3, 4})
print(type(fs))   # <class 'frozenset'>

# All read operations still work
print(2 in fs)    # True
print(len(fs))    # 4

# These will raise errors — you cannot modify a frozenset:
# fs.add(5)      # AttributeError
# fs.remove(1)   # AttributeError

# Use as a dictionary key (regular set cannot be a key)
permissions = {
    frozenset(["read", "write"]): "Editor",
    frozenset(["read"]):          "Viewer",
}
user_perms = frozenset(["read", "write"])
print(permissions[user_perms])   # Editor`} />
                    <NoteTable
                        headers={["Feature", "set", "frozenset"]}
                        rows={[
                            ["Unique elements", "✓", "✓"],
                            ["Unordered", "✓", "✓"],
                            ["Mutable (add/remove)", "✓", "✗"],
                            ["Can be a dict key", "✗", "✓"],
                            ["Set operations (|, &, -)", "✓", "✓"],
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Sets;
