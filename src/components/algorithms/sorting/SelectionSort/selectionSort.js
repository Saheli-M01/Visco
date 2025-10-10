// Selection Sort Algorithm Implementation
export const selectionSort = {
  name: "Selection Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

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
        codeLine: 1,
        phase: "outer_loop",
      });

      let minIndex = i;
      // Emit an initial min_update step with a structured `min` so the UI
      // shows the minIndex variable explicitly. Do NOT put this index into
      // `comparing` — otherwise components that infer `j` from comparing[0]
      // may display `j` prematurely.
      steps.push({
        array: [...a],
        swapped: [],
        description: `Initial minIndex ${minIndex} (value ${a[minIndex]})`,
        codeLine: 2,
        phase: "min_update",
        min: { value: a[minIndex], index: minIndex },
      });
      for (let j = i + 1; j < n; j++) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Inner loop: j = ${j}`,
          codeLine: 3,
          phase: "inner_loop",
          j: { value: j },
        });
        // compare
        steps.push({
          array: [...a],
          comparing: [minIndex, j],
          swapped: [],
          description: `Comparing arr[${minIndex}] = (${a[minIndex]}) with arr[${j}] = (${a[j]})`,
          codeLine: 4,
          phase: "comparison",
          j: { value: j },
        });
        if (a[j] < a[minIndex]) {
          minIndex = j;
          steps.push({
            array: [...a],
            swapped: [],
            description: `New minIndex found at ${minIndex}`,
            codeLine: 5,
            phase: "min_update",
            min: { value: a[minIndex], index: minIndex },
          });
        } else {
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `No change`,
            codeLine: 3,
            phase: "no_change",
          });
        }
      }

      if (minIndex !== i) {
        // Swap using language-appropriate steps
        const v1 = a[i];
        const v2 = a[minIndex];
  if (language === "java" || language === "csharp") {
          // temp = a[i]
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [],
            description: `temp = ${v1}`,
            temp: { value: v1, index: i },
            codeLine: 8,
            phase: "swap_step",
          });
          // a[i] = a[minIndex]
          a[i] = v2;
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i, minIndex],
            description: `arr[${i}] = ${v2}`,
            temp: { value: v1, index: i },
            codeLine: 9,
            phase: "swap_step",
          });
          // a[minIndex] = temp
          a[minIndex] = v1;
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i, minIndex],
            description: `arr[${minIndex}] = ${v1}`,
            temp: { value: v1, index: i },
            codeLine: 10,
            phase: "swap",
          });
        } else {
          // JS-like single swap
          [a[i], a[minIndex]] = [a[minIndex], a[i]];
          steps.push({
            array: [...a],
            comparing: [i, minIndex],
            swapped: [i, minIndex],
            description: `Swapping: ${v1} ↔ ${v2}`,
            codeLine: 8,
            phase: "swap",
          });
        }
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `No swap needed for position ${i}`,
          codeLine: -1,
          phase: "no_swap",
        });
      }
    }

    // propagate temp for C/Java but limit propagation to within each outer_loop pass
    const languageUsesTemp = language === "java" || language === "csharp";
    if (languageUsesTemp) {
      // collect indices where a new outer_loop/pass starts
      const outerStarts = [];
      for (let k = 0; k < steps.length; k++) {
        if (steps[k] && steps[k].phase === "outer_loop") outerStarts.push(k);
      }

      if (outerStarts.length === 0) {
        // fallback: propagate as before if no outer_loop markers found
        let lastTemp = null;
        for (let k = 0; k < steps.length; k++) {
          if (steps[k].hasOwnProperty("temp")) {
            if (steps[k].temp) lastTemp = steps[k].temp;
          } else {
            if (lastTemp) steps[k].temp = lastTemp;
          }
        }
      } else {
        // For each pass segment, propagate temp only inside that segment
        for (let seg = 0; seg < outerStarts.length; seg++) {
          const start = outerStarts[seg];
          const end = seg + 1 < outerStarts.length ? outerStarts[seg + 1] : steps.length;
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
    }

    // Propagate `min` so it remains visible for the entire outer-loop pass
    // and only clears when the next `outer_loop` step is reached.
    // This ensures the UI shows the minIndex throughout inner/comparison/swap
    // steps and hides it on the outer_loop marker.
    const outerStartsForMin = [];
    for (let k = 0; k < steps.length; k++) {
      if (steps[k] && steps[k].phase === "outer_loop") outerStartsForMin.push(k);
    }

    if (outerStartsForMin.length === 0) {
      // No explicit outer_loop markers: propagate min globally except on outer_loop
      let lastMin = null;
      for (let k = 0; k < steps.length; k++) {
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
    } else {
      // Propagate min within each outer-loop segment only and do not attach to the outer_loop step
      for (let seg = 0; seg < outerStartsForMin.length; seg++) {
        const start = outerStartsForMin[seg];
        const end = seg + 1 < outerStartsForMin.length ? outerStartsForMin[seg + 1] : steps.length;
        let lastMin = null;
        // start+1 to skip the outer_loop step itself
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
    }

    return steps;
  },

  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function selectionSort(arr) {", //0
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
        "def selection_sort(arr):",
        "    for i in range(len(arr) - 1):",
        "        minIndex = i",
        "        for j in range(i + 1, len(arr)):",
        "            if arr[j] < arr[minIndex]:",
        "                minIndex = j",
        "",
        "",
        "        arr[i], arr[minIndex] = arr[minIndex], arr[i]",
        "    return arr",
      ],
      java: [
        "public static void selectionSort(int[] arr) {",
        "    for (int i = 0; i < arr.length - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < arr.length; j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        int temp = arr[i];",
        "        arr[i] = arr[minIndex];",
        "        arr[minIndex] = temp;",
        "    }",
        "}",
      ],
      csharp: [
        "void SelectionSort(int[] arr) {",
        "    for (int i = 0; i < n - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < n; j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        int temp = arr[i];",
        "        arr[i] = arr[minIndex];",
        "        arr[minIndex] = temp;",
        "    }",
        "}",
      ],
      cpp: [
        "void selectionSort(vector<int>& arr) {",
        "    for (int i = 0; i < arr.size() - 1; i++) {",
        "        int minIndex = i;",
        "        for (int j = i + 1; j < arr.size(); j++) {",
        "            if (arr[j] < arr[minIndex]) {",
        "                minIndex = j;",
        "            }",
        "        }",
        "        swap(arr[i], arr[minIndex]);",
        "    }",
        "}",
      ],
    };

    return codeLines[language] || [];
  },

  getCode: (language) => {
    // Use the object's getCodeLines so the method can be called as selectionSort.getCode(...)
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
