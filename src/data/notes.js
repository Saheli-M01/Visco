// Copyright (c) 2026 Saheli Mondal.

export const pythonNotes = [
    {
        id: "introduction",
        title: "Introduction",
        component: "Introduction",
    },
    {
        id: "interpreter-compiler",
        title: "Interpreter vs Compiler",
        component: "Interpreter",
    },
    {
        id: "tokens",
        title: "Tokens",
        component: "Tokens",
        children: [
            {
                id: "identifiers",
                title: "Identifiers"
            },
            {
                id: "keywords",
                title: "Keywords"
            },

            {
                id: "literals",
                title: "Literals"
            },
            {
                id: "operators",
                title: "Operators"
            },
            {
                id: "delimiters",
                title: "Delimiters"
            },
            {
                id: "comments",
                title: "Comments"
            }
        ]
    },
    {
        id: "variables",
        title: "Variables",
        component: "Variables",
    },
    {
        id: "data-types",
        title: "Data Types",
        component: "DataTypes",
        children: [
            {
                id: "type-interactions",
                title: "Type Interactions",
            },
            {
                id: "type-casting",
                title: "Type Casting",
            },
        ]
    },
    {
        id: "increment-decrement",
        title: "Increment Decrement",
        component: "IncrementDecrement",
    },
    {
        id: "string-concatenation",
        title: "String Concatenation",
        component: "StringConcatenation",
        children: [
            {
                id: "string-concat",
                title: "Joining Strings (+)",
            },
            {
                id: "f-strings",
                title: "f-Strings (Recommended)",
            },
            {
                id: "print-function",
                title: "print() In Detail",
            },
            {
                id: "string-methods",
                title: "String Methods",
            },
        ]
    },
    {
        id: "practice-questions-1",
        title: "Practice Questions",
        component: "PracticeQuestions1"
    },
    {
        id: "conditionals",
        title: "Conditions (If-Else)",
        component: "Conditionals"
    },
    {
        id: "match-case",
        title: "Match-Case",
        component: "MatchCase"
    },
    {
        id: "practice-questions-2",
        title: "Practice Questions",
        component: "PracticeQuestions2"
    },
    {
        id: "taking-inputs",
        title: "Taking Inputs",
        component: "TakingInputs",
        children: [
            {
                id: "basic-input",
                title: "The input() Function",
            },
            {
                id: "input-type-conversion",
                title: "Converting to Numbers",
            },
            {
                id: "multiple-inputs",
                title: "Multiple Inputs",
            },
        ]
    },
    {
        id: "range",
        title: "Loops & Range",
        component: "Loops",
        children: [
            {
                id: "range-syntax",
                title: "range() Syntax",
            },
            {
                id: "for-loop",
                title: "For Loop",
            },
            {
                id: "for-nested",
                title: "Nested Loops",
            },
            {
                id: "while-loop",
                title: "While Loop",
            },
            {
                id: "loop-control",
                title: "break, continue & pass",
            },
            {
                id: "loop-practical",
                title: "Practical Examples",
            },
            {
                id: "for-vs-while",
                title: "For vs While",
            },
            {
                id: "enumerate-zip",
                title: "enumerate() & zip()",
            },
        ]
    },
    {
        id: "functions",
        title: "Functions",
        component: "Functions",
        children: [
            {
                id: "defining-functions",
                title: "Defining & Calling",
            },
            {
                id: "parameters-arguments",
                title: "Parameters & Arguments",
            },
            {
                id: "return-statement",
                title: "Return Statement",
            },
            {
                id: "default-arguments",
                title: "Default Arguments",
            },
            {
                id: "keyword-arguments",
                title: "Keyword Arguments",
            },
            {
                id: "args",
                title: "*args",
            },
            {
                id: "kwargs",
                title: "**kwargs",
            },
            {
                id: "variable-scope",
                title: "Variable Scope",
            },
            {
                id: "lambda-functions",
                title: "Lambda Functions",
            },
        ]
    },
    {
        id: "lists",
        title: "Lists",
        component: "Lists",
        children: [
            {
                id: "creating-lists",
                title: "Creating Lists",
            },
            {
                id: "list-access",
                title: "Accessing & Slicing",
            },
            {
                id: "list-modify",
                title: "Modifying Lists",
            },
            {
                id: "list-add",
                title: "Adding Elements",
            },
            {
                id: "list-remove",
                title: "Removing Elements",
            },
            {
                id: "list-sort",
                title: "Sorting & Searching",
            },
            {
                id: "list-comprehension",
                title: "List Comprehension",
            },
            {
                id: "list-methods",
                title: "Common Methods",
            },
            {
                id: "list-enumerate-zip",
                title: "enumerate() & zip()",
            },
            {
                id: "list-copy",
                title: "Copying Lists",
            },
        ]
    },
    {
        id: "arrays",
        title: "Arrays",
        component: "Arrays",
        children: [
            {
                id: "array-module",
                title: "Built-in array Module",
            },
            {
                id: "array-operations",
                title: "Array Operations",
            },
            {
                id: "numpy-arrays",
                title: "NumPy Arrays",
            },
            {
                id: "numpy-operations",
                title: "Vectorized Operations",
            },
            {
                id: "list-vs-array",
                title: "List vs array vs NumPy",
            },
        ]
    },
    {
        id: "tuples",
        title: "Tuples",
        component: "Tuples",
        children: [
            {
                id: "creating-tuples",
                title: "Creating Tuples",
            },
            {
                id: "tuple-access",
                title: "Accessing & Slicing",
            },
            {
                id: "tuple-immutable",
                title: "Immutability",
            },
            {
                id: "tuple-unpacking",
                title: "Tuple Unpacking",
            },
            {
                id: "tuple-vs-list",
                title: "Tuple vs List",
            },
        ]
    },
    {
        id: "sets",
        title: "Sets",
        component: "Sets",
        children: [
            {
                id: "creating-sets",
                title: "Creating Sets",
            },
            {
                id: "set-modify",
                title: "Adding & Removing",
            },
            {
                id: "set-operations",
                title: "Set Operations",
            },
            {
                id: "set-practical",
                title: "Practical Example",
            },
            {
                id: "set-comprehension",
                title: "Set Comprehension",
            },
            {
                id: "frozenset",
                title: "frozenset",
            },
        ]
    },
    {
        id: "dictionaries",
        title: "Dictionaries",
        component: "Dictionaries",
        children: [
            {
                id: "creating-dict",
                title: "Creating Dictionaries",
            },
            {
                id: "dict-access",
                title: "Accessing Values",
            },
            {
                id: "dict-modify",
                title: "Add, Update & Delete",
            },
            {
                id: "dict-looping",
                title: "Looping Dictionaries",
            },
            {
                id: "nested-dict",
                title: "Nested Dictionaries",
            },
            {
                id: "dict-methods",
                title: "Common Methods",
            },
            {
                id: "dict-practical",
                title: "Practical Example",
            },
            {
                id: "dict-comprehension",
                title: "Dict Comprehension",
            },
            {
                id: "dict-extra-methods",
                title: "setdefault & fromkeys",
            },
        ]
    },
    {
        id: "error-handling",
        title: "Errors & Exceptions",
        component: "ErrorHandling",
        children: [
            { id: "error-types", title: "Built-in Exceptions" },
            { id: "try-except", title: "try...except" },
            { id: "finally", title: "else & finally" },
            { id: "raise", title: "raise Statement" },
            { id: "custom-exceptions", title: "Custom Exceptions" },
            { id: "exception-object", title: "Exception Object" },
            { id: "practical-errors", title: "Practical Examples" },
        ]
    },

];

export const jsNotes = [
    {
        id: "introduction",
        title: "Introduction",
        component: "Introduction",
        children: [
            { id: "intro-overview",    title: "Overview" },
            { id: "intro-guide",       title: "About This Guide" },
            { id: "intro-about",       title: "About JavaScript" },
            { id: "intro-java",        title: "JavaScript and Java" },
            { id: "intro-ecmascript", title: "ECMAScript" },
            { id: "intro-tools",       title: "Tools" },
            { id: "intro-next",        title: "What's Next" },
        ]
    },
    {
        id: "variables",
        title: "Grammar and Types",
        component: "Variables",
        children: [
            { id: "grammar-syntax",          title: "Basic Syntax and Comments" },
            { id: "grammar-declarations",    title: "Declarations" },
            { id: "grammar-scope",           title: "Variable Scope" },
            { id: "grammar-hoisting",        title: "Variable Hoisting" },
            { id: "grammar-data-structures", title: "Data Structures and Types" },
            { id: "grammar-literals",        title: "Literals" },
            { id: "grammar-naming",          title: "Identifier Naming Rules" },
        ]
    },
    {
        id: "data-types",
        title: "Data Types",
        component: "DataTypes",
        children: [
            { id: "primitive",     title: "Primitive Data Types" },
            { id: "non-primitive", title: "Non-primitive Data Types" },
        ]
    },
    {
        id: "string-ops",
        title: "String Concatenation and Template Literals",
        component: "StringOps",
        children: [
            { id: "template-literals", title: "Template Literals" },
            { id: "escape-chars",      title: "Escape Characters" },
        ]
    },
    {
        id: "operators",
        title: "Operators",
        component: "Operators",
        children: [
            { id: "arithmetic",         title: "Arithmetic" },
            { id: "assignment",         title: "Assignment" },
            { id: "comparison",         title: "Comparison" },
            { id: "logical",            title: "Logical" },
            { id: "nullish-coalescing", title: "Nullish Coalescing (??)" },
            { id: "optional-chaining",  title: "Optional Chaining (?.)" },
            { id: "ternary",            title: "Ternary" },
            { id: "typeof-instanceof",  title: "typeof and instanceof" },
            { id: "precedence",         title: "Precedence" },
        ]
    },
    {
        id: "error-handling",
        title: "Control Flow and Error Handling",
        component: "ErrorHandling",
        children: [
            { id: "control-if-else",  title: "if...else" },
            { id: "control-switch",   title: "switch" },
            { id: "try-catch",        title: "try / catch / throw" },
            { id: "error-object",     title: "Error Objects" },
            { id: "error-types",      title: "Common Error Types" },
            { id: "practical-errors", title: "Practical Examples" },
        ]
    },
    {
        id: "loops",
        title: "Loops and Iteration",
        component: "Loops",
        children: [
            { id: "for-loop",          title: "for" },
            { id: "while-loop",        title: "while" },
            { id: "do-while-loop",     title: "do...while" },
            { id: "continue-statement", title: "continue" },
            { id: "break-statement",   title: "break" },
            { id: "for-in-loop",       title: "for...in" },
            { id: "for-of-loop",       title: "for...of" },
            { id: "loop-patterns",     title: "Common Patterns" },
        ]
    },
];