// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import Infobox from "../../shared/Infobox";
import NoteTable from "../../shared/NoteTable";
import {
    ShieldAlert,
    Bug,
    AlertTriangle,
    Shield,
    Zap,
    Layers,
    Sparkles,
    Target,
} from "lucide-react";

const ErrorHandling = () => {
    const errorTypeHeaders = ["Exception", "When It Happens", "Example"];
    const errorTypeRows = [
        [
            <code className="text-red-600 dark:text-red-400 font-bold">SyntaxError</code>,
            "Code has invalid syntax",
            <code>if x = 5:</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">NameError</code>,
            "Using a variable that doesn't exist",
            <code>print(abc)</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">TypeError</code>,
            "Wrong type for an operation",
            <code>"age" + 5</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">ValueError</code>,
            "Right type, wrong value",
            <code>int("hello")</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">IndexError</code>,
            "List index out of range",
            <code>lst[10]</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">KeyError</code>,
            "Dictionary key not found",
            <code>d["missing"]</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">ZeroDivisionError</code>,
            "Division by zero",
            <code>10 / 0</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">AttributeError</code>,
            "Attribute doesn't exist on an object",
            <code>None.upper()</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">FileNotFoundError</code>,
            "File doesn't exist",
            <code>open("no.txt")</code>,
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">ImportError</code>,
            "Module not found",
            <code>import xyz</code>,
        ],
    ];

    const baseExceptionHeaders = ["Class", "Description"];
    const baseExceptionRows = [
        [
            <code className="text-purple-600 dark:text-purple-400 font-bold">BaseException</code>,
            "Root of ALL exceptions — rarely caught directly",
        ],
        [
            <code className="text-red-600 dark:text-red-400 font-bold">Exception</code>,
            "Base for all regular exceptions — use this as your generic catch",
        ],
        [
            <code className="text-orange-600 dark:text-orange-400 font-bold">ArithmeticError</code>,
            "Base for ZeroDivisionError, OverflowError, FloatingPointError",
        ],
        [
            <code className="text-orange-600 dark:text-orange-400 font-bold">LookupError</code>,
            "Base for IndexError and KeyError",
        ],
    ];

    return (
        <section id="error-handling" className="scroll-mt-20 space-y-6">
            {/* Header banner */}
            <div className="rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 p-6 shadow-lg">
                <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                    <ShieldAlert className="w-8 h-8" /> Errors &amp; Exceptions in Python
                </h1>
                <p className="text-red-50 mt-1 text-sm">
                    Gracefully handling errors to keep your programs running smoothly.
                </p>
            </div>

            {/* Errors vs Exceptions */}
            <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                    <Bug className="w-5 h-5" /> Errors vs Exceptions
                </h2>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    In Python, problems at runtime are called <strong>exceptions</strong>. A <strong>SyntaxError</strong> is
                    detected before the program runs (at parse time), while all other exceptions happen
                    <em> during</em> execution and can be caught and handled.
                </p>
                <CodeBlock
                    language="python"
                    code={`# SyntaxError — caught BEFORE running, cannot be caught with try/except
# if x = 5:       # ✗ SyntaxError: invalid syntax

# Runtime exception — happens DURING execution, CAN be caught
x = int("hello")  # ✗ ValueError: invalid literal for int() with base 10: 'hello'`}
                />
                <Infobox type="info" title="Errors vs Exceptions">
                    Technically, Python uses <strong>Exceptions</strong> for everything you can handle at runtime.
                    "Error" in a class name (like <code>ValueError</code>, <code>TypeError</code>) just means
                    "a type of exception". All of them inherit from <code>Exception</code>.
                </Infobox>
            </div>

            {/* Common Exception Types */}
            <div id="error-types" className="rounded-xl border-2 border-red-200 dark:border-red-800 bg-red-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" /> Common Built-in Exceptions
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Python has many built-in exceptions. Knowing them helps you debug faster and
                    catch the right exception type.
                </p>
                <NoteTable headers={errorTypeHeaders} rows={errorTypeRows} />
                <CodeBlock
                    language="python"
                    code={`# NameError
# print(my_var)        # ✗ NameError: name 'my_var' is not defined

# TypeError
# result = "age" + 5   # ✗ TypeError: can only concatenate str (not "int") to str

# ValueError
# num = int("hello")   # ✗ ValueError: invalid literal for int() with base 10: 'hello'

# IndexError
# lst = [1, 2, 3]
# print(lst[10])        # ✗ IndexError: list index out of range

# KeyError
# d = {"name": "Alex"}
# print(d["age"])       # ✗ KeyError: 'age'

# ZeroDivisionError
# result = 10 / 0       # ✗ ZeroDivisionError: division by zero`}
                />
            </div>

            {/* Exception Hierarchy */}
            <div className="rounded-xl border-2 border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-purple-700 dark:text-purple-400 flex items-center gap-2">
                    <Layers className="w-5 h-5" /> Exception Hierarchy
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Python exceptions form a class hierarchy. <code>BaseException</code> is at the top,
                    with <code>Exception</code> being the base for all regular (catchable) exceptions.
                </p>
                <NoteTable headers={baseExceptionHeaders} rows={baseExceptionRows} />
                <CodeBlock
                    language="python"
                    code={`# Exception hierarchy (simplified):
# BaseException
# ├── SystemExit
# ├── KeyboardInterrupt
# └── Exception
#     ├── ArithmeticError
#     │   ├── ZeroDivisionError
#     │   └── OverflowError
#     ├── LookupError
#     │   ├── IndexError
#     │   └── KeyError
#     ├── TypeError
#     ├── ValueError
#     ├── NameError
#     └── ... (many more)

# Catching a parent catches all its children too
try:
    lst = [1, 2, 3]
    print(lst[10])
except LookupError:          # catches IndexError AND KeyError
    print("Index or Key problem!")  # ✓ caught here`}
                />
            </div>

            {/* try...except */}
            <div id="try-except" className="rounded-xl border-2 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-blue-700 dark:text-blue-400 flex items-center gap-2">
                    <Shield className="w-5 h-5" /> try...except Block
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Wrap risky code in a <code>try</code> block. If an exception occurs, the matching
                    <code> except</code> block runs instead of crashing the program.
                </p>

                {/* Syntax breakdown */}
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-blue-500 shadow-sm">
                    <h4 className="font-bold text-blue-700 dark:text-blue-400 mb-2">Syntax</h4>
                    <CodeBlock
                        language="python"
                        code={`try:
    # Code that might raise an exception
    # If an exception occurs here...
except ExceptionType:
    # ...this block runs instead of crashing
    # Optionally catch multiple types
except (TypeError, ValueError):
    # Handle either type
except Exception as e:
    # Catch any exception; 'e' holds the exception object`}
                    />
                </div>

                <CodeBlock
                    language="python"
                    code={`# Example 1: Safe integer conversion
try:
    num = int("42")
    print(num)          # 42 ✓
except ValueError:
    print("That's not a number!")

# Example 2: Catching bad input
try:
    num = int("hello")  # ✗ ValueError
    print(num)          # This line is SKIPPED
except ValueError:
    print("Error: please enter a valid number")
    # Output: "Error: please enter a valid number"

# Example 3: Multiple except clauses
def safe_divide(a, b):
    try:
        result = a / b
        return result
    except ZeroDivisionError:
        print("Cannot divide by zero!")
    except TypeError:
        print("Both inputs must be numbers!")

print(safe_divide(10, 2))   # 5.0
safe_divide(10, 0)           # Cannot divide by zero!
safe_divide(10, "x")         # Both inputs must be numbers!`}
                />
            </div>

            {/* else and finally */}
            <div id="finally" className="rounded-xl border-2 border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                    <Zap className="w-5 h-5" /> else &amp; finally Clauses
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Python's <code>try</code> block supports two extra clauses:
                    <code> else</code> runs only when <em>no</em> exception occurred, and
                    <code> finally</code> runs <strong>always</strong>, whether or not there was an exception.
                </p>
                <CodeBlock
                    language="python"
                    code={`# Full syntax
try:
    result = 10 / 2
except ZeroDivisionError:
    print("Cannot divide by zero!")
else:
    print("Success! Result:", result)   # Runs ONLY if no exception
finally:
    print("This ALWAYS runs — cleanup here")

# Output:
# Success! Result: 5.0
# This ALWAYS runs — cleanup here

# Practical: loading state pattern
is_loading = True
try:
    data = int("99")
    print("Loaded:", data)
except ValueError:
    print("Bad data!")
finally:
    is_loading = False          # Always reset the loading flag
    print("Loading:", is_loading)   # Loading: False`}
                />
                <Infobox type="info" title="When to use else vs finally">
                    Use <code>else</code> for code that should only run on success (avoids accidentally catching
                    exceptions from the success-path code). Use <code>finally</code> for cleanup that must
                    always happen — closing files, releasing resources, hiding spinners, etc.
                </Infobox>
            </div>

            {/* raise Statement */}
            <div id="raise" className="rounded-xl border-2 border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-rose-700 dark:text-rose-400 flex items-center gap-2">
                    <Target className="w-5 h-5" /> raise — Throwing Exceptions
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Use <code>raise</code> to deliberately trigger an exception when something
                    logically wrong happens — even if Python wouldn't raise one automatically.
                    You can also re-raise a caught exception.
                </p>
                <CodeBlock
                    language="python"
                    code={`# Raising a built-in exception
def divide(a, b):
    if b == 0:
        raise ZeroDivisionError("Cannot divide by zero!")
    return a / b

try:
    print(divide(10, 2))   # 5.0
    print(divide(10, 0))   # ✗ raises our exception
except ZeroDivisionError as e:
    print("Caught:", e)    # Caught: Cannot divide by zero!

# Raising with specific types for better validation
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("Age must be an integer!")
    if age < 0 or age > 150:
        raise ValueError("Age must be between 0 and 150!")
    return age

try:
    set_age("twenty")   # ✗ TypeError
except TypeError as e:
    print(e)            # Age must be an integer!

try:
    set_age(-5)         # ✗ ValueError
except ValueError as e:
    print(e)            # Age must be between 0 and 150!

# Re-raising an exception
try:
    int("bad")
except ValueError:
    print("Logging the error...")
    raise               # re-raises the same ValueError`}
                />
            </div>

            {/* Custom Exceptions */}
            <div id="custom-exceptions" className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                    <Layers className="w-5 h-5" /> Custom Exceptions
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    Create your own exception classes by inheriting from <code>Exception</code>.
                    This gives errors meaningful names that describe exactly what went wrong in your program.
                </p>
                <CodeBlock
                    language="python"
                    code={`# Define a custom exception
class InsufficientFundsError(Exception):
    """Raised when a bank withdrawal exceeds the balance."""
    def __init__(self, amount, balance):
        self.amount = amount
        self.balance = balance
        super().__init__(
            f"Cannot withdraw ₹{amount}. Balance is only ₹{balance}."
        )

# Use the custom exception
class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientFundsError(amount, self.balance)
        self.balance -= amount
        return self.balance

account = BankAccount(500)

try:
    account.withdraw(200)           # ✓ OK
    print("Balance:", account.balance)   # Balance: 300
    account.withdraw(400)           # ✗ Raises InsufficientFundsError
except InsufficientFundsError as e:
    print("Error:", e)
    # Error: Cannot withdraw ₹400. Balance is only ₹300.`}
                />
                <Infobox type="tip" title="Custom exception naming">
                    Always end custom exception class names with <code>Error</code> or <code>Exception</code>
                    (e.g., <code>InsufficientFundsError</code>, <code>InvalidInputException</code>).
                    This makes them instantly recognizable.
                </Infobox>
            </div>

            {/* Exception Object Properties */}
            <div id="exception-object" className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                    <Layers className="w-5 h-5" /> The Exception Object
                </h3>
                <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                    When you use <code>except ExceptionType as e</code>, the variable <code>e</code> holds
                    the exception object. You can inspect it for details.
                </p>
                <CodeBlock
                    language="python"
                    code={`try:
    x = None
    x.upper()                      # ✗ AttributeError
except AttributeError as e:
    print(e)                       # 'NoneType' object has no attribute 'upper'
    print(type(e).__name__)        # AttributeError
    print(e.args)                  # ("'NoneType' object has no attribute 'upper'",)

# Checking exception type
try:
    result = int("oops")
except Exception as e:
    if isinstance(e, ValueError):
        print("Value problem:", e)
    elif isinstance(e, TypeError):
        print("Type problem:", e)
    else:
        print("Unknown error:", e)`}
                />
            </div>

            {/* Practical Examples */}
            <div id="practical-errors" className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
                <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" /> Practical Examples
                </h3>

                <div className="space-y-4">
                    {/* Input Validation */}
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-teal-500 shadow-sm">
                        <h4 className="font-bold text-teal-700 dark:text-teal-400 mb-2">1. Safe User Input</h4>
                        <CodeBlock
                            language="python"
                            code={`def get_positive_number(prompt):
    while True:
        try:
            value = int(input(prompt))
            if value <= 0:
                raise ValueError("Number must be positive!")
            return value
        except ValueError as e:
            print(f"Invalid input: {e}. Try again.")

# age = get_positive_number("Enter your age: ")
# print("Your age is:", age)`}
                        />
                    </div>

                    {/* File Handling */}
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
                        <h4 className="font-bold text-purple-700 dark:text-purple-400 mb-2">2. Safe File Reading</h4>
                        <CodeBlock
                            language="python"
                            code={`def read_file(filename):
    try:
        with open(filename, "r") as f:
            return f.read()
    except FileNotFoundError:
        print(f"File '{filename}' not found.")
        return None
    except PermissionError:
        print(f"No permission to read '{filename}'.")
        return None

content = read_file("data.txt")
if content:
    print(content)`}
                        />
                    </div>

                    {/* Data Validation */}
                    <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border-l-4 border-indigo-500 shadow-sm">
                        <h4 className="font-bold text-indigo-700 dark:text-indigo-400 mb-2">3. Data Processing Pipeline</h4>
                        <CodeBlock
                            language="python"
                            code={`def process_record(record):
    """Process a dict record, return cleaned data or raise."""
    try:
        name = record["name"]                   # KeyError if missing
        age  = int(record["age"])               # ValueError if not numeric
        if age < 0 or age > 150:
            raise ValueError(f"Age {age} is out of range")
        return {"name": name.strip(), "age": age}
    except KeyError as e:
        raise ValueError(f"Missing required field: {e}")

records = [
    {"name": "Rahul", "age": "21"},
    {"name": "Priya", "age": "abc"},
    {"name": "Ali"},
]

for r in records:
    try:
        print(process_record(r))
    except ValueError as e:
        print(f"Skipping bad record — {e}")

# {'name': 'Rahul', 'age': 21}
# Skipping bad record — invalid literal for int() with base 10: 'abc'
# Skipping bad record — Missing required field: 'age'`}
                        />
                    </div>
                </div>

                <Infobox type="tip" title="Exception Handling Best Practices">
                    <ul className="list-disc pl-4 space-y-1 text-xs">
                        <li>Catch the <strong>most specific</strong> exception type first, then broader ones below</li>
                        <li>Avoid bare <code>except:</code> — it catches <code>SystemExit</code> and <code>KeyboardInterrupt</code> too</li>
                        <li>Use <code>except Exception as e</code> as the widest safe net</li>
                        <li>Always log or print errors — don't silently swallow them</li>
                        <li>Use <code>finally</code> for cleanup; use <code>else</code> for success-only code</li>
                        <li>Define custom exceptions for domain-specific errors</li>
                    </ul>
                </Infobox>
            </div>
        </section>
    );
};

export default ErrorHandling;
