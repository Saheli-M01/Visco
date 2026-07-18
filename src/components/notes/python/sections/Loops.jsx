import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Repeat,
    Hash,
    ArrowRightLeft,
    Layers,
    ShieldAlert,
    Sparkles,
    Table2,
    SkipForward,
} from "lucide-react";

const Loops = () => {
    return (
        <section className="scroll-mt-20 space-y-6">

            {/* ═══════════════════════ RANGE ═══════════════════════ */}
            <div id="range" className="space-y-5 pt-4 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Hash className="w-8 h-8" /> The range() Function
                    </h1>
                    <p className="text-cyan-50 mt-1 text-sm">
                        Generate sequences of numbers — the backbone of Python loops.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        <code>range()</code> generates a sequence of numbers. It doesn't create a list in memory —
                        it produces values <strong>one at a time</strong> as needed, making it very memory-efficient.
                        It is most commonly used with <code>for</code> loops.
                    </p>
                </div>

                {/* range() syntax */}
                <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="range-syntax">
                    <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                        <Hash className="w-5 h-5" /> 1. range() Syntax & Forms
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <code>range()</code> can take 1, 2, or 3 arguments:{" "}
                        <code>range(stop)</code>, <code>range(start, stop)</code>, or{" "}
                        <code>range(start, stop, step)</code>.
                    </p>
                    <CodeBlock code={`# range(stop) — starts from 0, goes up to (but NOT including) stop
print(list(range(5)))       # [0, 1, 2, 3, 4]

# range(start, stop) — from start to stop-1
print(list(range(2, 7)))    # [2, 3, 4, 5, 6]

# range(start, stop, step) — with custom step size
print(list(range(0, 10, 2)))   # [0, 2, 4, 6, 8]  (even numbers)
print(list(range(1, 10, 3)))   # [1, 4, 7]

# Negative step — count backwards!
print(list(range(10, 0, -1)))  # [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
print(list(range(5, -1, -1)))  # [5, 4, 3, 2, 1, 0]

# Empty range
print(list(range(5, 2)))    # []  (can't go forward from 5 to 2)
print(list(range(0)))       # []  (stop is 0, nothing to generate)`} />
                    <Infobox type="info" title="range() is NOT a list">
                        <code>range(5)</code> does not create <code>[0, 1, 2, 3, 4]</code> in memory.
                        It generates numbers <strong>on the fly</strong>. To see the values, wrap it in{" "}
                        <code>list()</code>. This makes <code>range(1000000)</code> efficient — it doesn't
                        store a million numbers!
                    </Infobox>
                </div>

                {/* range() table */}
                <div className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="range-reference">
                    <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                        <Table2 className="w-5 h-5" /> 2. Quick Reference
                    </h3>
                    <NoteTable
                        headers={["Expression", "Output", "Description"]}
                        rows={[
                            [<code>range(5)</code>, <code>0, 1, 2, 3, 4</code>, "0 to 4"],
                            [<code>range(1, 6)</code>, <code>1, 2, 3, 4, 5</code>, "1 to 5"],
                            [<code>range(0, 10, 2)</code>, <code>0, 2, 4, 6, 8</code>, "Even numbers 0–9"],
                            [<code>range(10, 0, -1)</code>, <code>10, 9, ..., 1</code>, "Countdown 10→1"],
                            [<code>range(5, 0, -2)</code>, <code>5, 3, 1</code>, "Skip by 2, backwards"],
                            [<code>range(len(lst))</code>, <code>0, 1, ..., n-1</code>, "Indices of a list"],
                        ]}
                    />
                </div>
            </div>

            {/* ═══════════════════════ FOR LOOP ═══════════════════════ */}
            <div id="for-loop" className="space-y-5 pt-6 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Repeat className="w-8 h-8" /> For Loop
                    </h1>
                    <p className="text-violet-50 mt-1 text-sm">
                        Iterate over sequences — strings, lists, ranges, and more.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <code>for</code> loop is used to iterate over a <strong>sequence</strong> (like a
                        list, string, tuple, or range). On each iteration, the loop variable takes the next
                        value from the sequence. The loop body is defined by <strong>indentation</strong>.
                    </p>
                </div>

                {/* Basic for loop */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="for-basic">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <Repeat className="w-5 h-5" /> 1. Basic For Loop
                    </h3>
                    <CodeBlock code={`# Looping through a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
# apple
# banana
# cherry

# Looping through a string
for char in "Python":
    print(char, end=" ")
# P y t h o n

# Looping through a range
for i in range(5):
    print(i, end=" ")
# 0 1 2 3 4

# Printing a multiplication table
num = 7
for i in range(1, 11):
    print(f"{num} x {i} = {num * i}")
# 7 x 1 = 7
# 7 x 2 = 14
# ... and so on`} />
                </div>

                {/* for with range patterns */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="for-range">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Hash className="w-5 h-5" /> 2. For Loop with range()
                    </h3>
                    <CodeBlock code={`# Sum of first n natural numbers
n = 10
total = 0
for i in range(1, n + 1):
    total += i
print("Sum:", total)  # Sum: 55

# Print even numbers from 1 to 20
for i in range(2, 21, 2):
    print(i, end=" ")
# 2 4 6 8 10 12 14 16 18 20

# Countdown
for i in range(5, 0, -1):
    print(i, end=" ")
print("Go!")
# 5 4 3 2 1 Go!

# Looping with index using range(len())
colors = ["red", "green", "blue"]
for i in range(len(colors)):
    print(f"Index {i}: {colors[i]}")
# Index 0: red
# Index 1: green
# Index 2: blue`} />
                    <Infobox type="tip" title="Use enumerate() instead of range(len())">
                        Python's <code>enumerate()</code> gives you both the index and value:{" "}
                        <code>for i, color in enumerate(colors):</code> — cleaner and more Pythonic!
                    </Infobox>
                </div>

                {/* Nested for loops */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="for-nested">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> 3. Nested For Loops
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A loop inside another loop. The <strong>inner loop</strong> runs completely for
                        each iteration of the <strong>outer loop</strong>.
                    </p>
                    <CodeBlock code={`# Star pattern — right triangle
for i in range(1, 6):
    print("* " * i)
# *
# * *
# * * *
# * * * *
# * * * * *

# Multiplication table (2 to 5)
for i in range(2, 6):
    for j in range(1, 11):
        print(f"{i}x{j}={i*j}", end="\\t")
    print()  # new line after each table

# Pairs from two lists
colors = ["red", "blue"]
sizes = ["S", "M", "L"]
for color in colors:
    for size in sizes:
        print(f"{color}-{size}", end="  ")
    print()
# red-S  red-M  red-L
# blue-S  blue-M  blue-L`} />
                </div>

                {/* for-else */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="for-else">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 4. For-Else
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Python's <code>for</code> loop can have an <code>else</code> block. The{" "}
                        <code>else</code> runs only if the loop completes <strong>without</strong>{" "}
                        hitting a <code>break</code>.
                    </p>
                    <CodeBlock code={`# Search for a number
numbers = [1, 3, 5, 7, 9]
target = 5

for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found.")
# Output: Found 5!

# When target is not in list
target = 4
for num in numbers:
    if num == target:
        print(f"Found {target}!")
        break
else:
    print(f"{target} not found.")
# Output: 4 not found.`} />
                </div>
            </div>

            {/* ═══════════════════════ WHILE LOOP ═══════════════════════ */}
            <div id="while-loop" className="space-y-5 pt-6 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Repeat className="w-8 h-8" /> While Loop
                    </h1>
                    <p className="text-amber-50 mt-1 text-sm">
                        Repeat as long as a condition is True — when you don't know how many iterations you need.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        A <code>while</code> loop keeps executing its body as long as its condition
                        evaluates to <code>True</code>. Unlike <code>for</code>, it doesn't iterate over
                        a sequence — you control the condition yourself. <strong>Be careful</strong> to
                        update the condition variable inside the loop, or you'll get an infinite loop!
                    </p>
                </div>

                {/* Basic while loop */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="while-basic">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Repeat className="w-5 h-5" /> 1. Basic While Loop
                    </h3>
                    <CodeBlock code={`# Count from 1 to 5
i = 1
while i <= 5:
    print(i, end=" ")
    i += 1
# 1 2 3 4 5

# Countdown
count = 5
while count > 0:
    print(count, end=" ")
    count -= 1
print("Go!")
# 5 4 3 2 1 Go!

# Sum until user enters 0
total = 0
num = int(input("Enter a number (0 to stop): "))
while num != 0:
    total += num
    num = int(input("Enter a number (0 to stop): "))
print("Total:", total)`} />
                    <Infobox type="warning" title="Infinite Loop Danger!">
                        If you forget to update the loop variable, the condition stays{" "}
                        <code>True</code> forever and your program hangs. Always make sure
                        the condition will eventually become <code>False</code>. Press{" "}
                        <code>Ctrl+C</code> to force-stop a stuck program.
                    </Infobox>
                </div>

                {/* While with practical examples */}
                <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="while-examples">
                    <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 2. Practical While Loop Examples
                    </h3>
                    <CodeBlock code={`# Guess the number game
import random
secret = random.randint(1, 10)
guess = 0
attempts = 0

while guess != secret:
    guess = int(input("Guess (1-10): "))
    attempts += 1
    if guess < secret:
        print("Too low!")
    elif guess > secret:
        print("Too high!")
print(f"Correct! You got it in {attempts} attempts.")

# Digit sum of a number
num = 9876
total = 0
while num > 0:
    digit = num % 10       # get last digit
    total += digit
    num = num // 10        # remove last digit
print("Digit sum:", total)  # 30  (9+8+7+6)

# Reverse a number
num = 1234
reversed_num = 0
while num > 0:
    digit = num % 10
    reversed_num = reversed_num * 10 + digit
    num = num // 10
print("Reversed:", reversed_num)  # 4321`} />
                </div>

                {/* while-else */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="while-else">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 3. While-Else
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Just like <code>for</code>, a <code>while</code> loop can have an{" "}
                        <code>else</code> block that runs when the condition becomes <code>False</code>{" "}
                        naturally (not via <code>break</code>).
                    </p>
                    <CodeBlock code={`# Login system with limited attempts
password = "python123"
attempts = 3

while attempts > 0:
    user_input = input("Enter password: ")
    if user_input == password:
        print("Access granted!")
        break
    attempts -= 1
    print(f"Wrong! {attempts} attempts left.")
else:
    print("Account locked! Too many failed attempts.")`} />
                </div>
            </div>

            {/* ═══════════════════════ BREAK, CONTINUE, PASS ═══════════════════════ */}
            <div id="loop-control" className="space-y-5 pt-6 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-rose-500 to-pink-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <SkipForward className="w-8 h-8" /> break, continue & pass
                    </h1>
                    <p className="text-rose-50 mt-1 text-sm">
                        Control statements to alter loop behavior mid-execution.
                    </p>
                </div>

                {/* break */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="loop-break">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> 1. break — Exit the Loop Immediately
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <code>break</code> stops the loop entirely and jumps to the code after the loop.
                    </p>
                    <CodeBlock code={`# Stop at first even number
for num in [1, 3, 5, 4, 7, 8]:
    if num % 2 == 0:
        print("First even:", num)
        break
    print(num, "is odd")
# 1 is odd
# 3 is odd
# 5 is odd
# First even: 4

# Search in a list
names = ["Aman", "Priya", "Rahul", "Sneha"]
search = "Rahul"
for name in names:
    if name == search:
        print(f"Found {search}!")
        break`} />
                </div>

                {/* continue */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="loop-continue">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <SkipForward className="w-5 h-5" /> 2. continue — Skip to Next Iteration
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <code>continue</code> skips the rest of the current iteration and jumps
                        to the <strong>next</strong> iteration of the loop.
                    </p>
                    <CodeBlock code={`# Print only odd numbers
for i in range(1, 11):
    if i % 2 == 0:
        continue  # skip even numbers
    print(i, end=" ")
# 1 3 5 7 9

# Skip negative numbers
numbers = [10, -5, 20, -3, 15, -8, 25]
total = 0
for num in numbers:
    if num < 0:
        continue
    total += num
print("Sum of positives:", total)  # 70`} />
                </div>

                {/* pass */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="loop-pass">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 3. pass — Do Nothing (Placeholder)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <code>pass</code> is a placeholder that does nothing. Use it when Python
                        requires a statement syntactically but you don't want to execute any code yet.
                    </p>
                    <CodeBlock code={`# Empty loop body (e.g., during development)
for i in range(10):
    pass  # TODO: implement later

# Using pass in conditionals
age = 15
if age >= 18:
    pass  # will add voting logic later
else:
    print("Too young to vote")`} />
                </div>

                {/* Comparison table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="loop-comparison">
                    <h3 className="text-lg font-bold text-slate-700 dark:text-slate-400 flex items-center gap-2">
                        <Table2 className="w-5 h-5" /> Comparison Table
                    </h3>
                    <NoteTable
                        headers={["Statement", "What It Does", "When to Use"]}
                        rows={[
                            [<code>break</code>, "Exits the entire loop immediately", "When you've found what you need"],
                            [<code>continue</code>, "Skips current iteration, goes to next", "When you want to ignore certain values"],
                            [<code>pass</code>, "Does nothing (placeholder)", "When the block needs code you haven't written yet"],
                        ]}
                    />
                </div>
            </div>

            {/* ═══════════════════════ PRACTICAL EXAMPLES ═══════════════════════ */}
            <div id="loop-practical" className="space-y-5 pt-6 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Sparkles className="w-8 h-8" /> Practical Loop Examples
                    </h1>
                    <p className="text-emerald-50 mt-1 text-sm">
                        Real-world patterns combining loops, range, and control statements.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="loop-patterns">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> Common Patterns
                    </h3>
                    <CodeBlock code={`# 1. Fibonacci sequence (first 10 numbers)
a, b = 0, 1
for _ in range(10):
    print(a, end=" ")
    a, b = b, a + b
# 0 1 1 2 3 5 8 13 21 34

# 2. Check if a number is prime
num = 29
is_prime = True
if num < 2:
    is_prime = False
else:
    for i in range(2, int(num ** 0.5) + 1):
        if num % i == 0:
            is_prime = False
            break
print(f"{num} is {'prime' if is_prime else 'not prime'}")
# 29 is prime

# 3. Factorial using a loop
n = 5
factorial = 1
for i in range(1, n + 1):
    factorial *= i
print(f"{n}! = {factorial}")  # 5! = 120

# 4. Star pattern — pyramid
rows = 5
for i in range(1, rows + 1):
    spaces = " " * (rows - i)
    stars = "* " * i
    print(spaces + stars)
#     *
#    * *
#   * * *
#  * * * *
# * * * * *

# 5. FizzBuzz
for i in range(1, 21):
    if i % 3 == 0 and i % 5 == 0:
        print("FizzBuzz", end=" ")
    elif i % 3 == 0:
        print("Fizz", end=" ")
    elif i % 5 == 0:
        print("Buzz", end=" ")
    else:
        print(i, end=" ")
# 1 2 Fizz 4 Buzz Fizz 7 8 Fizz Buzz 11 Fizz 13 14 FizzBuzz 16 17 Fizz 19 Buzz`} />
                </div>

                {/* for vs while */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="for-vs-while">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> For vs While — When to Use Which?
                    </h3>
                    <NoteTable
                        headers={["For Loop", "While Loop"]}
                        rows={[
                            ["Know exact number of iterations", "Don't know how many iterations"],
                            ["Iterating over a sequence", "Repeating until a condition changes"],
                            ["Cleaner for lists, strings, ranges", "Better for user-input-driven loops"],
                            [<code>for i in range(10):</code>, <code>while count {">"} 0:</code>],
                            ["Less risk of infinite loops", "Must update condition manually"],
                        ]}
                    />
                </div>

                {/* enumerate and zip */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-4 shadow-sm" id="enumerate-zip">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> enumerate() and zip()
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        These two built-in functions pair perfectly with <code>for</code> loops and
                        make your code much cleaner.
                    </p>

                    <div>
                        <h4 className="font-bold text-sky-700 dark:text-sky-400 mb-2">enumerate() — get index and value together</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-350 mb-2">
                            Instead of <code>range(len(list))</code>, use <code>enumerate()</code>.
                            It gives you both the <strong>index</strong> and the <strong>value</strong>
                            on every iteration.
                        </p>
                        <CodeBlock code={`fruits = ["apple", "banana", "cherry"]

# Old clunky way
for i in range(len(fruits)):
    print(i, fruits[i])

# Clean way with enumerate()
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry

# Start numbering from 1 instead of 0
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
# 1. apple
# 2. banana
# 3. cherry`} />
                    </div>

                    <div>
                        <h4 className="font-bold text-sky-700 dark:text-sky-400 mb-2">zip() — loop two or more sequences together</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-350 mb-2">
                            <code>zip()</code> pairs elements from multiple lists, like a zipper.
                            It stops when the <strong>shortest</strong> list runs out.
                        </p>
                        <CodeBlock code={`names  = ["Rahul", "Priya", "Aman"]
marks  = [85, 92, 78]

for name, mark in zip(names, marks):
    print(f"{name}: {mark}")
# Rahul: 85
# Priya: 92
# Aman: 78

# Three lists at once
grades = ["B", "A+", "B+"]
for name, mark, grade in zip(names, marks, grades):
    print(f"{name} — {mark} ({grade})")

# Convert to a list of tuples
pairs = list(zip(names, marks))
print(pairs)
# [('Rahul', 85), ('Priya', 92), ('Aman', 78)]`} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Loops;
