import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    FunctionSquare,
    ArrowRightLeft,
    ListChecks,
    Settings2,
    Package,
    Boxes,
    Zap,
    ShieldAlert,
    Eye,
    Sparkles,
    Layers,
} from "lucide-react";

const Functions = () => {
    const summaryHeaders = ["Concept", "Syntax", "Purpose"];
    const summaryRows = [
        [<strong>Define a function</strong>, <code>def name():</code>, "Create reusable code blocks"],
        [<strong>Parameters</strong>, <code>def name(a, b):</code>, "Accept input values"],
        [<strong>Return value</strong>, <code>return result</code>, "Send a value back to the caller"],
        [<strong>Default arguments</strong>, <code>def name(a=10):</code>, "Provide fallback values"],
        [<strong>*args</strong>, <code>def name(*args):</code>, "Accept any number of positional arguments"],
        [<strong>**kwargs</strong>, <code>def name(**kwargs):</code>, "Accept any number of keyword arguments"],
        [<strong>Lambda</strong>, <code>lambda x: x + 1</code>, "Quick one-line anonymous functions"],
    ];

    return (
        <section id="functions" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <FunctionSquare className="w-8 h-8" /> Functions in Python
                </h1>
                <p className="text-blue-50 mt-1 text-sm">
                    Reusable blocks of code that perform specific tasks.
                </p>
            </div>

            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    A <strong>function</strong> is a named block of code that only runs when you
                    <strong> call</strong> it. Functions let you write code once and reuse it many
                    times — this keeps your programs organized, shorter, and easier to debug. Think
                    of a function like a recipe: you define the steps once, and whenever you need
                    that dish, you just follow the recipe.
                </p>
            </div>

            <div className="space-y-5">
                <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <ListChecks className="w-5 h-5" /> Functions — Step by Step
                </h2>

                {/* 1. Defining & Calling */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="defining-functions">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <FunctionSquare className="w-5 h-5" /> 1. Defining & Calling a Function
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Use the <code>def</code> keyword to create a function. The function body is
                        indented. <strong>Nothing happens</strong> until you <strong>call</strong>{" "}
                        the function by writing its name followed by parentheses <code>()</code>.
                    </p>
                    <CodeBlock code={`# Defining a function
def greet():
    print("Hello, welcome to Python!")
    print("Let's start learning.")

# Calling the function
greet()

# Output:
# Hello, welcome to Python!
# Let's start learning.`} />
                    <div className="pt-1 text-sm text-slate-600 dark:text-slate-350">
                        <strong>Remember:</strong> A function must be <strong>defined before</strong>{" "}
                        it is called. The <code>def</code> line must come before the call.
                    </div>
                </div>

                {/* 2. Parameters and Arguments */}
                <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="parameters-arguments">
                    <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                        <Settings2 className="w-5 h-5" /> 2. Parameters and Arguments
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        <strong>Parameters</strong> are variables listed in the function definition.{" "}
                        <strong>Arguments</strong> are the actual values you pass when calling the function.
                        They allow a function to work with different data each time.
                    </p>
                    <CodeBlock code={`# 'name' and 'age' are parameters
def introduce(name, age):
    print("My name is " + name)
    print("I am " + str(age) + " years old")

# "Rahul" and 15 are arguments
introduce("Rahul", 15)

# Output:
# My name is Rahul
# I am 15 years old

introduce("Priya", 14)

# Output:
# My name is Priya
# I am 14 years old`} />
                    <Infobox type="info" title="Parameter vs Argument">
                        <strong>Parameter</strong> = the variable name in the function definition
                        (like a placeholder). <strong>Argument</strong> = the real value you send
                        when calling the function.
                    </Infobox>
                </div>

                {/* 3. Return Statement */}
                <div className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="return-statement">
                    <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                        <ArrowRightLeft className="w-5 h-5" /> 3. The <code>return</code> Statement
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A function can <strong>send a value back</strong> to the caller using{" "}
                        <code>return</code>. This lets you use the function's result in expressions,
                        assign it to a variable, or pass it to another function. Once <code>return</code>{" "}
                        executes, the function <strong>stops immediately</strong>.
                    </p>
                    <CodeBlock code={`def add(a, b):
    return a + b

# Store the returned value
result = add(10, 25)
print("Sum:", result)
# Output: Sum: 35

# Use it directly in an expression
print("Double sum:", add(10, 25) * 2)
# Output: Double sum: 70`} />
                    <CodeBlock code={`# A function without return gives None
def say_hello(name):
    print("Hello, " + name)

value = say_hello("Rahul")
print(value)

# Output:
# Hello, Rahul
# None`} />
                </div>

                {/* 4. Default Arguments */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="default-arguments">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Package className="w-5 h-5" /> 4. Default Arguments
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        You can give parameters a <strong>default value</strong>. If the caller
                        doesn't provide an argument for that parameter, the default is used
                        automatically. Default parameters must come <strong>after</strong>{" "}
                        non-default parameters.
                    </p>
                    <CodeBlock code={`def greet(name, greeting="Hello"):
    print(greeting + ", " + name + "!")

greet("Rahul")             # Uses default greeting
greet("Priya", "Hi")       # Overrides with "Hi"
greet("Aman", "Welcome")   # Overrides with "Welcome"

# Output:
# Hello, Rahul!
# Hi, Priya!
# Welcome, Aman!`} />
                </div>

                {/* 5. Keyword Arguments */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="keyword-arguments">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Settings2 className="w-5 h-5" /> 5. Keyword Arguments
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        When calling a function, you can specify <strong>which parameter</strong>{" "}
                        each value goes to by using the parameter name. This makes code clearer and
                        lets you pass arguments in <strong>any order</strong>.
                    </p>
                    <CodeBlock code={`def student_info(name, age, city):
    print(name, "is", age, "years old from", city)

# Positional arguments (order matters)
student_info("Rahul", 15, "Mumbai")

# Keyword arguments (order doesn't matter!)
student_info(city="Delhi", name="Priya", age=14)

# Output:
# Rahul is 15 years old from Mumbai
# Priya is 14 years old from Delhi`} />
                </div>

                {/* 6. *args */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="args">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <Boxes className="w-5 h-5" /> 6. <code>*args</code> — Variable Number of Arguments
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        What if you don't know in advance how many arguments the user will pass?
                        Use <code>*args</code> to collect <strong>any number</strong> of positional
                        arguments into a <strong>tuple</strong>.
                    </p>
                    <CodeBlock code={`def total(*numbers):
    result = 0
    for num in numbers:
        result += num
    return result

print(total(10, 20))            # 30
print(total(5, 10, 15, 20))     # 50
print(total(100))               # 100`} />
                </div>

                {/* 7. **kwargs */}
                <div className="rounded-xl border-2 border-pink-200 dark:border-pink-800 bg-pink-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="kwargs">
                    <h3 className="text-lg font-bold text-pink-700 dark:text-pink-400 flex items-center gap-2">
                        <Boxes className="w-5 h-5" /> 7. <code>**kwargs</code> — Variable Keyword Arguments
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Similar to <code>*args</code>, but for <strong>keyword arguments</strong>.{" "}
                        <code>**kwargs</code> collects them into a <strong>dictionary</strong> where
                        parameter names become keys and their values become dictionary values.
                    </p>
                    <CodeBlock code={`def print_details(**info):
    for key, value in info.items():
        print(key + ": " + str(value))

print_details(name="Rahul", age=15, city="Mumbai")

# Output:
# name: Rahul
# age: 15
# city: Mumbai

print_details(subject="Python", score=95)

# Output:
# subject: Python
# score: 95`} />
                </div>

                {/* 8. Scope */}
                <div className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="variable-scope">
                    <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                        <Eye className="w-5 h-5" /> 8. Variable Scope — Local vs Global
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Variables created <strong>inside</strong> a function are <strong>local</strong>{" "}
                        — they only exist within that function. Variables created <strong>outside</strong>{" "}
                        all functions are <strong>global</strong> — they can be accessed anywhere, but
                        to <strong>modify</strong> a global variable inside a function, you need the{" "}
                        <code>global</code> keyword.
                    </p>
                    <CodeBlock code={`x = 10  # Global variable

def my_function():
    x = 5   # Local variable (different from global x)
    print("Inside function, x =", x)

my_function()
print("Outside function, x =", x)

# Output:
# Inside function, x = 5
# Outside function, x = 10`} />
                    <CodeBlock code={`# Using global keyword to modify global variable
count = 0

def increment():
    global count
    count += 1
    print("Count inside:", count)

increment()
increment()
print("Count outside:", count)

# Output:
# Count inside: 1
# Count inside: 2
# Count outside: 2`} />
                    <Infobox type="warning" title="Avoid Overusing global">
                        Using <code>global</code> too much makes code harder to debug. Prefer
                        passing values through <strong>parameters</strong> and getting results
                        through <strong>return</strong> instead.
                    </Infobox>
                </div>

                {/* 9. Lambda Functions */}
                <div className="rounded-xl border-2 border-violet-200 dark:border-violet-800 bg-violet-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="lambda-functions">
                    <h3 className="text-lg font-bold text-violet-700 dark:text-violet-400 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> 9. Lambda Functions — Quick One-Liners
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        A <strong>lambda</strong> function is a small anonymous function written in a
                        single line. It can take any number of arguments but can only have{" "}
                        <strong>one expression</strong>. Great for short operations that don't need a
                        full <code>def</code> block.
                    </p>
                    <CodeBlock code={`# Regular function
def double(x):
    return x * 2

# Same thing as a lambda
double = lambda x: x * 2

print(double(5))   # 10
print(double(12))  # 24`} />
                    <CodeBlock code={`# Lambda with multiple arguments
add = lambda a, b: a + b
print(add(3, 7))  # 10

# Lambda with sorted()
students = [("Rahul", 85), ("Priya", 92), ("Aman", 78)]
students.sort(key=lambda s: s[1])  # Sort by marks
print(students)
# [('Aman', 78), ('Rahul', 85), ('Priya', 92)]`} />
                </div>

                {/* 10. Practical example */}
                <div className="rounded-xl border-2 border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="functions-practical">
                    <h3 className="text-lg font-bold text-cyan-700 dark:text-cyan-400 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" /> 10. Real-World Example: Grade Calculator
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Combining everything — parameters, return, default arguments, and
                        conditionals inside a function:
                    </p>
                    <CodeBlock code={`def calculate_grade(marks, total=100):
    """Calculate percentage and return the grade."""
    percentage = (marks / total) * 100

    if percentage >= 90:
        grade = "A+"
    elif percentage >= 75:
        grade = "A"
    elif percentage >= 60:
        grade = "B"
    elif percentage >= 40:
        grade = "C"
    else:
        grade = "Fail"

    return percentage, grade   # Returns a tuple!

# Using the function
pct, g = calculate_grade(82)
print(f"Percentage: {pct}%, Grade: {g}")
# Output: Percentage: 82.0%, Grade: A

pct2, g2 = calculate_grade(35, 50)  # out of 50
print(f"Percentage: {pct2}%, Grade: {g2}")
# Output: Percentage: 70.0%, Grade: B`} />
                </div>

                {/* Summary table */}
                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-2 shadow-sm">
                    <h4 className="text-base font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <ListChecks className="w-4 h-4" /> Functions Quick Reference
                    </h4>
                    <NoteTable headers={summaryHeaders} rows={summaryRows} />
                </div>

                {/* Built-in functions note */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="builtin-functions">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Layers className="w-5 h-5" /> Bonus: Common Built-in Functions
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Python comes with many built-in functions you've already been using:
                    </p>
                    <NoteTable
                        headers={["Function", "What It Does", "Example"]}
                        rows={[
                            [<code>print()</code>, "Display output to screen", <code>print("Hello")</code>],
                            [<code>input()</code>, "Take input from user", <code>input("Name? ")</code>],
                            [<code>len()</code>, "Count items in a collection", <code>len("Python")</code>],
                            [<code>type()</code>, "Check the data type", <code>type(42)</code>],
                            [<code>int(), float(), str()</code>, "Type conversion", <code>int("5")</code>],
                            [<code>range()</code>, "Generate a sequence of numbers", <code>range(1, 10)</code>],
                            [<code>max(), min(), sum()</code>, "Math operations on collections", <code>max(3, 7, 1)</code>],
                            [<code>abs()</code>, "Absolute value", <code>abs(-5)</code>],
                            [<code>round()</code>, "Round a number", <code>round(3.7)</code>],
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Functions;
