// Copyright (c) 2026 Saheli Mondal.

// Insertion Sort Algorithm Implementation
export const insertionSort = {
  name: "Insertion Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    // Check sorted
    let isSorted = true;
    for (let k = 0; k < n - 1; k++) {
      if (a[k] > a[k + 1]) {
        isSorted = false;
        break;
      }
    }
    if (isSorted) {
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: "Array is already sorted!",
        codeLine: -1,
        phase: "completed",
      });
      return steps;
    }

    // initial step: indicate the outer loop is starting (consistent with other sorts)
   

    for (let i = 1; i < n; i++) {
      const key = a[i];
      let j = i - 1;

       steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Pass ${i }: Starting outer loop: i = ${i}`,
      codeLine: 1,
      phase: "outer_loop",
    });
      // start insertion of key
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `key =  ${key}`,
        // explicit key object so the UI can render the 'key' variable like temp/min
        key: { value: key, index: i },
        codeLine: 2,
        phase: "key_value",
      });

      // expose j initialization (j = i - 1) as its own step so the UI can highlight that line
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `j = (i - 1) -> j = ${j}`,
        j: { value: j, index: j },
        key: { value: key, index: i },
        codeLine: 3,
        phase: "inner_loop",
      });

      // No separate temp variable used; insertion sort uses 'key' consistently.

      while (j >= 0 && a[j] > key) {
        // highlight the while-condition evaluation before shifting
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Checking if (j is >= 0) and (arr[j] = ${a[j]} > ${key})`,
          // keep key visible so the UI can render it during comparison
          key: { value: key, index: i },
          j: { value: j, index: j },
          codeLine: 4,
          phase: "checking",
        });

        // shift a[j] to a[j+1]
        a[j + 1] = a[j];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [j + 1],
          description: `Shift arr[${j}] (${a[j]}) to position ${j + 1}`,
          // keep key visible during shifts so the UI can persist it
          key: { value: key, index: i },
          codeLine: 5,
          phase: "shift",
        });
        j = j - 1;

        // expose the j decrement as its own step so the UI can highlight that line
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `j decremented -> j = ${j}`,
          key: { value: key, index: i },
          j: { value: j, index: j },
          codeLine: 6,
          phase: "decrement",
        });

      }

      // when the while loop exits (condition false), add an explicit step
      // so the UI can show that the loop failed before inserting the key
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `While condition failed -> j = ${j}`,
        key: { value: key, index: i },
        j: { value: j, index: j },
        // highlight the while condition line
        codeLine: 4,
        phase: "while_exit",
      });

      // place key
      a[j + 1] = key;
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [j + 1],
        description: `Place key ${key} at position ${j + 1}`,
        key: { value: key, index: i },
        codeLine: 8,
        phase: "insert",
      });
    }

    // propagate key and j to later steps so UI can persist them like temp/min
    let lastKey = null;
    let lastJ = null;
    for (let k = 0; k < steps.length; k++) {
      if (steps[k] && steps[k].hasOwnProperty("key")) {
        if (steps[k].key) lastKey = steps[k].key;
      } else {
        if (lastKey) steps[k].key = lastKey;
      }

      if (steps[k] && steps[k].hasOwnProperty("j")) {
        if (steps[k].j) lastJ = steps[k].j;
      } else {
        if (lastJ) steps[k].j = lastJ;
      }
    }

    // Ensure the steps end with a clear 'completed' state so the UI doesn't
    // display lingering comparing indices after the algorithm finishes.
    if (steps.length > 0) {
      const last = steps[steps.length - 1];
      if (last.phase !== 'completed') {
        const completedStep = {
          array: [...a],
          comparing: [],
          swapped: [],
          description: 'Array is now fully sorted',
          codeLine: -1,
          phase: 'completed',
        };

     

        steps.push(completedStep);
      }
    }

    return steps;
  },

  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function insertionSort(arr) {",
        "  for (let i = 1; i < arr.length; i++) {",
        "    let key = arr[i];",
        "    let j = i - 1;",
        "    while (j >= 0 && arr[j] > key) {",
        "      arr[j + 1] = arr[j];",
        "      j = j - 1;",
        "    }",
        "    arr[j + 1] = key;",
        "  }",
        "  return arr;",
        "}",
      ],
      python: [
        "def insertion_sort(arr):",
        "    for i in range(1, len(arr)):",
        "        key = arr[i]",
        "        j = i - 1",
        "        while j >= 0 and arr[j] > key:",
        "            arr[j + 1] = arr[j]",
        "            j -= 1",
        "",
        "        arr[j + 1] = key",
        "",
        "    return arr",
      ],
      java: [
        "public static void insertionSort(int[] arr) {",
        "    for (int i = 1; i < arr.length; i++) {",
        "        int key = arr[i];",
        "        int j = i - 1;",
        "        while (j >= 0 && arr[j] > key) {",
        "            arr[j + 1] = arr[j];",
        "            j = j - 1;",
        "        }",
        "        arr[j + 1] = key;",
        "    }",
        "}",
      ],
      csharp: [
        "void insertionSort(int arr[], int n) {",
        "    for (int i = 1; i < n; i++) {",
        "        int key = arr[i];",
        "        int j = i - 1;",
        "        while (j >= 0 && arr[j] > key) {",
        "            arr[j + 1] = arr[j];",
        "            j = j - 1;",
        "        }",
        "        arr[j + 1] = key;",
        "    }",
        "}",
      ],
      cpp: [
        "void insertionSort(int arr[], int n) {",
        "    for (int i = 1; i < n; i++) {",
        "        int key = arr[i];",
        "        int j = i - 1;",
        "        while (j >= 0 && arr[j] > key) {",
        "            arr[j + 1] = arr[j];",
        "            j = j - 1;",
        "        }",
        "        arr[j + 1] = key;",
        "    }",
        "}",
      ],
    };

    return codeLines[language] || [];
  },

  getCode: (language) => {
    // Use this.getCodeLines so the function works as a method on the object
    const lines = (this && typeof this.getCodeLines === 'function')
      ? this.getCodeLines(language)
      : null;

    const fallback = (this && typeof this.getCodeLines === 'function')
      ? this.getCodeLines('javascript')
      : [];

    const chosen = (lines && lines.length) ? lines : fallback;
    return chosen.join('\n');
  },
};
