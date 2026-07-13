import React from "react";
import CodeBlock from "../../shared/CodeBlock";
import NoteTable from "../../shared/NoteTable";
import Infobox from "../../shared/Infobox";
import {
    Database,
    Binary,
    Cpu,
    Grid3X3,
    Table2,
    Zap
} from "lucide-react";

const Arrays = () => {
    return (
        <section className="scroll-mt-20 space-y-6">
            <div id="arrays" className="space-y-5 pt-4 border-t">
                <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 p-6 shadow-lg">
                    <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
                        <Database className="w-8 h-8" /> Arrays
                    </h1>
                    <p className="text-orange-50 mt-1 text-sm">
                        Typed, memory-efficient collections and numeric arrays in Python.
                    </p>
                </div>

                <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                        In Python, a standard list acts like an array and is used in most cases. However, Python does not have a built-in "Array" type like C or Java unless you import it.
                        When you need strict <strong>typed arrays</strong> (where all elements must be of the same type) for memory efficiency, you use the built-in <code>array</code> module. For advanced mathematical operations and multi-dimensional arrays, you use the external <code>numpy</code> library.
                    </p>
                </div>

                {/* Built-in array module */}
                <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="array-module">
                    <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
                        <Binary className="w-5 h-5" /> 1. The Built-in <code>array</code> Module
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The <code>array</code> module allows you to create space-efficient arrays of basic C-style data types (like integers and floats). You must specify a <strong>type code</strong> when creating an array.
                    </p>
                    <CodeBlock code={`import array\n\n# 'i' stands for signed integer\n# 'd' stands for double (float)\nnumbers = array.array('i', [1, 2, 3, 4, 5])\nfloats = array.array('d', [1.5, 2.5, 3.5])\n\nprint(numbers)        # array('i', [1, 2, 3, 4, 5])\nprint(type(numbers))  # <class 'array.array'>\n\n# Accessing elements (same as lists)\nprint(numbers[0])     # 1\nprint(numbers[-1])    # 5\n\n# Modifying elements\nnumbers[0] = 10\nprint(numbers)        # array('i', [10, 2, 3, 4, 5])\n\n# numbers.append(3.14)  # ERROR: Must be an integer!`} />
                    <Infobox type="info" title="Common Type Codes">
                        <code>'i'</code>: Signed Integer (2 bytes), <code>'I'</code>: Unsigned Integer (2 bytes),{" "}
                        <code>'f'</code>: Float (4 bytes), <code>'d'</code>: Double (8 bytes).
                    </Infobox>
                </div>

                {/* Array module operations */}
                <div className="rounded-xl border-2 border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="array-operations">
                    <h3 className="text-lg font-bold text-orange-700 dark:text-orange-400 flex items-center gap-2">
                        <Cpu className="w-5 h-5" /> 2. Array Operations
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        The methods available for arrays are very similar to list methods.
                    </p>
                    <CodeBlock code={`import array\narr = array.array('i', [10, 20, 30])\n\n# Append and Insert\narr.append(40)        # Adds to end\narr.insert(1, 15)     # Inserts 15 at index 1\nprint(arr)            # array('i', [10, 15, 20, 30, 40])\n\n# Remove and Pop\narr.remove(20)        # Removes first occurrence of 20\npopped = arr.pop()    # Removes and returns last element (40)\n\n# Buffer info (memory address and number of elements)\nprint(arr.buffer_info())  # e.g., (140410712398128, 3)`} />
                </div>

                {/* NumPy Arrays */}
                <div className="rounded-xl border-2 border-sky-200 dark:border-sky-800 bg-sky-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="numpy-arrays">
                    <h3 className="text-lg font-bold text-sky-700 dark:text-sky-400 flex items-center gap-2">
                        <Grid3X3 className="w-5 h-5" /> 3. NumPy Arrays (ndarray)
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        For data science, machine learning, and heavy mathematics, the external library <strong>NumPy</strong> is the standard. It provides the <code>ndarray</code> (N-dimensional array) which is vastly faster and more powerful than standard Python lists.
                    </p>
                    <CodeBlock code={`# Requires installation: pip install numpy\nimport numpy as np\n\n# Creating a 1D array\narr1d = np.array([1, 2, 3, 4, 5])\nprint(arr1d)          # [1 2 3 4 5]\n\n# Creating a 2D array (Matrix)\narr2d = np.array([[1, 2, 3], [4, 5, 6]])\nprint(arr2d)\n# [[1 2 3]\n#  [4 5 6]]\n\n# Array properties\nprint(arr2d.shape)    # (2, 3) - 2 rows, 3 columns\nprint(arr2d.ndim)     # 2 - Number of dimensions\nprint(arr2d.dtype)    # int64 - Data type`} />
                </div>

                {/* NumPy Vectorized Operations */}
                <div className="rounded-xl border-2 border-teal-200 dark:border-teal-800 bg-teal-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="numpy-operations">
                    <h3 className="text-lg font-bold text-teal-700 dark:text-teal-400 flex items-center gap-2">
                        <Zap className="w-5 h-5" /> 4. Vectorized Operations
                    </h3>
                    <p className="text-slate-600 dark:text-slate-350 leading-relaxed">
                        Unlike lists, NumPy arrays allow element-wise operations (vectorization) without needing explicit loops.
                    </p>
                    <CodeBlock code={`import numpy as np\n\n# With Python Lists\nlst = [1, 2, 3]\nprint(lst * 2)        # [1, 2, 3, 1, 2, 3] (Repeats the list!)\n\n# With NumPy Arrays\narr = np.array([1, 2, 3])\nprint(arr * 2)        # [2 4 6] (Multiplies each element!)\nprint(arr + 10)       # [11 12 13]\n\n# Element-wise addition of two arrays\narr2 = np.array([10, 20, 30])\nprint(arr + arr2)     # [11 22 33]`} />
                    <Infobox type="tip" title="Why NumPy is Fast">
                        NumPy arrays are stored at one continuous place in memory unlike lists, so processes can access and manipulate them very efficiently. This locality of reference combined with optimized C-code under the hood makes NumPy operations up to 50x faster than standard Python lists.
                    </Infobox>
                </div>

                {/* List vs Array Table */}
                <div className="rounded-xl border-2 border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm" id="list-vs-array">
                    <h3 className="text-lg font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-2">
                        <Table2 className="w-5 h-5" /> 5. List vs array module vs NumPy
                    </h3>
                    <NoteTable
                        headers={["Feature", "Python List", "array Module", "NumPy Array"]}
                        rows={[
                            ["Data Types", "Mixed (Heterogeneous)", "Single Type (Homogeneous)", "Single Type (Homogeneous)"],
                            ["Built-in?", "Yes", "Yes (requires import)", "No (requires pip install)"],
                            ["Multi-dimensional", "Yes (nested lists)", "No (1D only)", "Yes (highly optimized)"],
                            ["Element-wise Math", "No", "No", "Yes"],
                            ["Performance", "Slower", "Memory efficient", "Fastest & Memory efficient"],
                            ["Use Case", "General purpose", "Low-level memory optimization", "Data science & Math"],
                        ]}
                    />
                </div>
            </div>
        </section>
    );
};

export default Arrays;
