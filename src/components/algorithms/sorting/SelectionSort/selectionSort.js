// Selection Sort Algorithm Implementation
export const selectionSort = {
  name: "Selection Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    // Language-specific line numbers
    const lineNumbers = {
      javascript: {
        outer: 1,
        minInit: 2,
        inner: 3,
        compare: 4,
        minUpdate: 5,
        swap: 8,
      },
      python: {
        outer: 1,
        minInit: 2,
        inner: 3,
        compare: 4,
        minUpdate: 5,
        swap: 8,
      },
      java: {
        outer: 1,
        minInit: 2,
        inner: 3,
        compare: 4,
        minUpdate: 5,
        tempAssign: 8,
        swapFirst: 9,
        swapSecond: 10,
      },
      csharp: {
        outer: 1,
        minInit: 2,
        inner: 3,
        compare: 4,
        minUpdate: 5,
        tempAssign: 8,
        swapFirst: 9,
        swapSecond: 10,
      },
      cpp: {
        outer: 1,
        minInit: 2,
        inner: 3,
        compare: 4,
        minUpdate: 5,
        swap: 8,
      },
    };

    const lines = lineNumbers[language] || lineNumbers.javascript;
    const usesTemp = language === "java" || language === "csharp";

    // Check if array is already sorted
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

    for (let i = 0; i < n - 1; i++) {
      // Start pass
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Pass ${i + 1}: Starting outer loop: i = ${i}`,
        codeLine: lines.outer,
        phase: "outer_loop",
      });

      let minIndex = i;
      // Initial minIndex step
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Initialize minIndex = ${minIndex} (value ${a[minIndex]})`,
        codeLine: lines.minInit,
        phase: "min_update",
        min: { value: a[minIndex], index: minIndex },
      });

      for (let j = i + 1; j < n; j++) {
          // track last j so we can persist it after the inner loop ends
          var lastJ = j;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Inner loop: j = ${j}`,
          codeLine: lines.inner,
          phase: "inner_loop",
            j: { value: j },
        });

        // Compare step
        steps.push({
          array: [...a],
          comparing: [minIndex, j],
          swapped: [],
          description: `Comparing arr[${minIndex}] (${a[minIndex]}) with arr[${j}] (${a[j]})`,
          codeLine: lines.compare,
          phase: "comparison",
          j: { value: j },
        });

        if (a[j] < a[minIndex]) {
          minIndex = j;
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `Found new minimum at index ${minIndex} (value ${a[minIndex]})`,
            codeLine: lines.minUpdate,
            phase: "min_update",
            min: { value: a[minIndex], index: minIndex },
          });
        } else {
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `Current minimum (${a[minIndex]}) is smaller, no change`,
            codeLine: lines.compare,
            phase: "no_change",
          });
        }
      }

      // After the inner loop finishes, add a short step to indicate inner-loop end
      // and persist the last j value so the UI can show the j VariableCard in the
      // inner-loop-end phase.
      if (typeof lastJ !== 'undefined' && lastJ !== null) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Inner loop complete, last j = ${lastJ}`,
          codeLine: lines.inner,
          phase: "inner_loop_end",
          selectionJ: lastJ,
        });
      }

      // Swap logic
      if (minIndex !== i) {
        const v1 = a[i];
        const v2 = a[minIndex];

        if (usesTemp) {
          // temp = a[i]
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [],
            description: `temp = arr[${i}] = ${v1}`,
            temp: { value: v1, index: i },
            codeLine: lines.tempAssign,
            phase: "swap_step",
          });

          // a[i] = a[minIndex]
          a[i] = v2;
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i],
            description: `arr[${i}] = arr[${minIndex}] = ${v2}`,
            temp: { value: v1, index: i },
            codeLine: lines.swapFirst,
            phase: "swap_step",
          });

          // a[minIndex] = temp
          a[minIndex] = v1;
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i, minIndex],
            description: `arr[${minIndex}] = temp = ${v1}`,
            codeLine: lines.swapSecond,
            phase: "swap",
          });
        } else {
          // Single swap for JS/Python/C++
          [a[i], a[minIndex]] = [a[minIndex], a[i]];
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i, minIndex],
            description: `Swapping arr[${i}] (${v1}) ↔ arr[${minIndex}] (${v2})`,
            codeLine: lines.swap,
            phase: "swap",
          });
        }
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Element at position ${i} is already minimum, no swap needed`,
          codeLine: -1,
          phase: "no_swap",
        });
      }
    }

    // Propagate temp variable for Java/C# within each pass
    if (usesTemp) {
      const outerStarts = [];
      for (let k = 0; k < steps.length; k++) {
        if (steps[k] && steps[k].phase === "outer_loop") outerStarts.push(k);
      }

      for (let seg = 0; seg < outerStarts.length; seg++) {
        const start = outerStarts[seg];
        const end =
          seg + 1 < outerStarts.length ? outerStarts[seg + 1] : steps.length;
        let lastTemp = null;

        for (let k = start; k < end; k++) {
          if (steps[k].hasOwnProperty("temp")) {
            if (steps[k].temp) lastTemp = steps[k].temp;
          } else {
            if (lastTemp) steps[k].temp = lastTemp;
          }
        }
      }
    }

    // Propagate min within each outer-loop pass
    const outerStartsForMin = [];
    for (let k = 0; k < steps.length; k++) {
      if (steps[k] && steps[k].phase === "outer_loop")
        outerStartsForMin.push(k);
    }

    for (let seg = 0; seg < outerStartsForMin.length; seg++) {
      const start = outerStartsForMin[seg];
      const end =
        seg + 1 < outerStartsForMin.length
          ? outerStartsForMin[seg + 1]
          : steps.length;
      let lastMin = null;

      // Start from start+1 to skip the outer_loop step itself
      for (let k = start + 1; k < end; k++) {
        const st = steps[k];
        if (!st) continue;

        if (st.hasOwnProperty("min") && st.min) {
          lastMin = st.min;
          continue;
        }

        if (lastMin && st.phase !== "outer_loop") {
          st.min = lastMin;
        }
      }
    }

    // Final completed step: mark the algorithm as finished and allow UI to hide
    // any persisted variable cards when `phase === 'completed'`.
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Selection sort completed",
      codeLine: -1,
      phase: "completed",
    });

    return steps;
  },

  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function selectionSort(arr, n) {", //0
        "  for (let i = 0; i < n - 1; i++) {", //1
        "    let minIndex = i;", //2
        "    for (let j = i + 1; j < n; j++) {", //3
        "      if (arr[j] < arr[minIndex]) {", //4
        "        minIndex = j;", //5
        "      }", //6
        "    }", //7
        "    [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];", //8
        "  }", //9
        "  return arr;", //10
        "}", //11
      ],
      python: [
        "def selection_sort(arr, n):", // 0
        "    for i in range(n - 1):", // 1
        "        minIndex = i", // 2
        "        for j in range(i + 1, n):", // 3
        "            if arr[j] < arr[minIndex]:", // 4
        "                minIndex = j", // 5
        "", // 6
        "", // 7
        "        arr[i], arr[minIndex] = arr[minIndex], arr[i]", // 8
        "", // 9
        "    return arr", // 10
      ],
      java: [
        "public static int[] selectionSort(int[] arr, int n) {", // 0
        "    for (int i = 0; i < n - 1; i++) {", // 1
        "        int minIndex = i;", //2
        "        for (int j = i + 1; j < n; j++) {", // 3
        "            if (arr[j] < arr[minIndex]) {", // 4
        "                minIndex = j;", // 5
        "            }", // 6
        "        }", // 7
        "        int temp = arr[i];", // 8
        "        arr[i] = arr[minIndex];", // 9
        "        arr[minIndex] = temp;", // 10
        "    }", //11
        "    return arr;", // 12
        "}", // 13
      ],
      csharp: [
        "int[] SelectionSort(int[] arr, int n) {", // 0
        "    for (int i = 0; i < n - 1; i++) {", // 1
        "        int minIndex = i;", //2
        "        for (int j = i + 1; j < n; j++) {", // 3
        "            if (arr[j] < arr[minIndex]) {", // 4
        "                minIndex = j;", // 5
        "            }", // 6
        "        }", // 7
        "        int temp = arr[i];", // 8
        "        arr[i] = arr[minIndex];", // 9
        "        arr[minIndex] = temp;", // 10
        "    }", //11
        "    return arr;", // 12
        "}", // 13
      ],
      cpp: [
        "vector<int> selectionSort(vector<int>& arr, int n) {", // 0
        "    for (int i = 0; i < n - 1; i++) {", // 1
        "        int minIndex = i;", // 2
        "        for (int j = i + 1; j < n; j++) {", // 3
        "            if (arr[j] < arr[minIndex]) {", // 4
        "                minIndex = j;", // 5
        "            }", // 6
        "        }", // 7
        "        swap(arr[i], arr[minIndex]);", // 8
        "    }", // 9
        "    return arr;", //10
        "}", // 11
      ],
    };

    return codeLines[language] || [];
  },

  getCode: (language) => {
    const lines =
      this && typeof this.getCodeLines === "function"
        ? this.getCodeLines(language)
        : null;

    const fallback =
      this && typeof this.getCodeLines === "function"
        ? this.getCodeLines("javascript")
        : [];

    const chosen = lines && lines.length ? lines : fallback;
    return chosen.join("\n");
  },
};
