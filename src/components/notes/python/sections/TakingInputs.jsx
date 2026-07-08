import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Keyboard,
    Type,
    ListChecks,
    SplitSquareVertical,
    ShieldAlert,
    Sparkles,
    MessageSquare,
} from "lucide-react";

const TakingInputs = () => {
    const summaryHeaders = ["Function", "What It Does", "Example"];
    const summaryRows = [
        [<code>input()</code>, "Takes text input from user (always returns a string)", <code>name = input("Name? ")</code>],
        [<code>int(input())</code>, "Takes integer input", <code>age = int(input("Age? "))</code>],
        [<code>float(input())</code>, "Takes decimal number input", <code>price = float(input("Price? "))</code>],
        [<code>split()</code>, "Takes multiple inputs on one line", <code>a, b = input().split()</code>],
    ];

    return (
        <section id="taking-inputs" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <Keyboard className="w-8 h-8" /> Taking Inputs from the User
                </h1>
                <p className="text-emerald-50 mt-1 text-sm">
                    Making your programs interactive by accepting user data.
                </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    So far, all values in our programs were written directly in the code.
                    But what if you want the <strong>user</strong> to type something while the
                    program is running? Python's built-in <code>input()</code> function lets you
                    do exactly that — it pauses the program, waits for the user to type, and
                    returns what they entered.
                </p>
            </div>

            <div className="space-y-5">
                <h2 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> How Input Works in Python
                </h2>

                {/* Basic input */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="basic-input">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5" /> 1. The <code>input()</code> Function
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The <code>input()</code> function displays a message (called a <strong>prompt</strong>)
                        and waits for the user to type something. Whatever the user types is returned as
                        a <strong>string</strong> — always a string, even if they type a number.
                    </p>
                    <CodeBlock code={`name = input("What is your name? ")
print("Hello, " + name + "!")

# When you run this:
# What is your name? Rahul
# Hello, Rahul!`} />
                    <Infobox type="info" title="Key Point">
                        <code>input()</code> <strong>always returns a string</strong>, no matter
                        what the user types. Even if they type <code>42</code>, Python sees it as
                        the string <code>"42"</code>, not the number <code>42</code>.
                    </Infobox>
                </div>

                {/* Input with type conversion */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="input-type-conversion">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Type className="w-5 h-5" /> 2. Converting Input to Numbers
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Since <code>input()</code> always gives a string, you need to <strong>convert</strong> it
                        if you want to do math. Use <code>int()</code> for whole numbers and{" "}
                        <code>float()</code> for decimal numbers.
                    </p>
                    <CodeBlock code={`# Taking integer input
age = int(input("Enter your age: "))
print("You will be", age + 1, "next year!")

# When you run this:
# Enter your age: 15
# You will be 16 next year!`} />
                    <CodeBlock code={`# Taking float input
price = float(input("Enter the price: "))
gst = price * 0.18
total = price + gst
print("Total with GST:", total)

# When you run this:
# Enter the price: 500
# Total with GST: 590.0`} />
                </div>

                {/* What happens without conversion */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="input-without-conversion">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" /> 3. Common Mistake: Forgetting to Convert
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        If you try to do math with an unconverted input, Python will either
                        give the <strong>wrong result</strong> (string concatenation instead of
                        addition) or throw an <strong>error</strong>.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-4 space-y-2 shadow-sm">
                            <h4 className="text-base font-bold text-rose-700 dark:text-rose-400">❌ Wrong</h4>
                            <CodeBlock code={`num1 = input("First: ")   # "5"
num2 = input("Second: ")  # "3"
result = num1 + num2
print(result)
# Output: 53 (string join, NOT math!)`} />
                        </div>
                        <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-4 space-y-2 shadow-sm">
                            <h4 className="text-base font-bold text-emerald-700 dark:text-emerald-400">✅ Correct</h4>
                            <CodeBlock code={`num1 = int(input("First: "))   # 5
num2 = int(input("Second: "))  # 3
result = num1 + num2
print(result)
# Output: 8 (actual addition!)`} />
                        </div>
                    </div>
                </div>

                {/* Multiple inputs */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="multiple-inputs">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <SplitSquareVertical className="w-5 h-5" /> 4. Taking Multiple Inputs on One Line
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Use <code>.split()</code> to break a single input line into multiple
                        values. By default, it splits at spaces. You can also use{" "}
                        <code>map()</code> to convert all the values at once.
                    </p>
                    <CodeBlock code={`# Method 1: Using split() — values are strings
a, b = input("Enter two names: ").split()
print("First:", a)
print("Second:", b)

# When you run this:
# Enter two names: Rahul Priya
# First: Rahul
# Second: Priya`} />
                    <CodeBlock code={`# Method 2: Using map() with split() — values as integers
x, y = map(int, input("Enter two numbers: ").split())
print("Sum:", x + y)

# When you run this:
# Enter two numbers: 10 25
# Sum: 35`} />
                    <CodeBlock code={`# Method 3: Split by a custom separator (e.g., comma)
city, state = input("Enter city, state: ").split(",")
print("City:", city.strip())
print("State:", state.strip())

# When you run this:
# Enter city, state: Mumbai, Maharashtra
# City: Mumbai
# State: Maharashtra`} />
                </div>

                {/* Practical example */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="input-practical">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 5. Putting It All Together
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Here's a complete mini-program that uses input, type conversion, and
                        conditional statements together:
                    </p>
                    <CodeBlock code={`# Simple calculator using input
print("=== Simple Calculator ===")
num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))
op = input("Enter operation (+, -, *, /): ")

if op == "+":
    print("Result:", num1 + num2)
elif op == "-":
    print("Result:", num1 - num2)
elif op == "*":
    print("Result:", num1 * num2)
elif op == "/":
    if num2 != 0:
        print("Result:", num1 / num2)
    else:
        print("Error: Cannot divide by zero!")
else:
    print("Invalid operation!")

# When you run this:
# === Simple Calculator ===
# Enter first number: 12
# Enter second number: 4
# Enter operation (+, -, *, /): *
# Result: 48.0`} />
                </div>

                {/* Summary table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <ListChecks className="w-4 h-4" /> Quick Reference Table
                    </h4>
                    <NoteTable headers={summaryHeaders} rows={summaryRows} />
                </div>
            </div>
        </section>
    );
};

export default TakingInputs;
