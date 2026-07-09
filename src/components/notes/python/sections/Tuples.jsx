import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import {
    Lock,
    Layers,
    ShieldAlert,
    ArrowRightLeft,
} from "lucide-react";

const Tuples = () => {
    return (
        <section className="scroll-mt-20 space-y-6">
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
        </section>
    );
};

export default Tuples;
