// Bubble Sort Algorithm Implementation
export const bubbleSort = {
  name: "Bubble Sort",
  
  // Generate step-by-step visualization data with code line tracking
  // Accept optional language param so we can produce steps that match multi-line swaps in C/Java
  generateSteps: (arr, language = 'javascript') => {
    const steps = [];
    const sortedArray = [...arr];
    const n = sortedArray.length;
    
    // Check if array is already sorted
    let isSorted = true;
    for (let k = 0; k < n - 1; k++) {
      if (sortedArray[k] > sortedArray[k + 1]) {
        isSorted = false;
        break;
      }
    }
    
    // If array is already sorted, return with no steps and no code highlighting
    if (isSorted) {
      steps.push({
        array: [...sortedArray],
        comparing: [],
        swapped: [],
        description: "Array is already sorted!",
        codeLine: -1, // No code highlighting
        phase: "completed"
      });
      return steps;
    }

    for (let i = 0; i < n - 1; i++) {
      let swappedInThisPass = false;
      
      // Outer loop start
      steps.push({
        array: [...sortedArray],
        comparing: [],
        swapped: [],
        description: `Pass ${i + 1}: Starting outer loop: i = ${i}`,
        codeLine: 2, // for (let i = 0; i < n - 1; i++)
        phase: "outer_loop"
      });

      for (let j = 0; j < n - i - 1; j++) {
        // Inner loop start
        steps.push({
          array: [...sortedArray],
          comparing: [],
          swapped: [],
          description: `Inner loop: j = ${j}`,
          codeLine: 3, // for (let j = 0; j < n - i - 1; j++)
          phase: "inner_loop"
        });

        // Comparison step
        steps.push({
          array: [...sortedArray],
          comparing: [j, j + 1],
          swapped: [],
          description: `Comparing arr[${j}] = ${sortedArray[j]} with arr[${j + 1}] = ${sortedArray[j + 1]}`,
          codeLine: 4, // if (arr[j] > arr[j + 1])
          phase: "comparison"
        });

        if (sortedArray[j] > sortedArray[j + 1]) {
          // Swap step - produce steps that reflect the language's swap implementation
          const temp1 = sortedArray[j];
          const temp2 = sortedArray[j + 1];
          swappedInThisPass = true;

          if (language === 'c' || language === 'java' || language === 'csharp') {
            // C/Java: three-line swap using a temp variable
            // 1) temp = arr[j]; (no array change)
            steps.push({
              array: [...sortedArray],
              comparing: [j, j + 1],
              swapped: [],
              description: `temp = ${temp1}`,
              temp: { value: temp1, index: j },
              codeLine: 5, // int temp = arr[j];
              phase: "swap_step"
            });

            // 2) arr[j] = arr[j + 1]; (arr[j] changes)
            sortedArray[j] = temp2;
            steps.push({
              array: [...sortedArray],
              comparing: [j, j + 1],
              swapped: [j, j + 1],
              description: `arr[${j}] = ${temp2}`,
              temp: { value: temp1, index: j },
              codeLine: 6, // arr[j] = arr[j + 1];
              phase: "swap_step"
            });

            // 3) arr[j + 1] = temp; (arr[j+1] changes)
            sortedArray[j + 1] = temp1;
            // Keep the temp object present so the UI can continue to show its value
            steps.push({
              array: [...sortedArray],
              comparing: [j, j + 1],
              swapped: [j, j + 1],
              description: `arr[${j + 1}] = ${temp1}`,
              temp: { value: temp1, index: j },
              codeLine: 7, // arr[j + 1] = temp;
              phase: "swap"
            });
          } else {
            // JS/Python/JS-like single-line swap
            [sortedArray[j], sortedArray[j + 1]] = [sortedArray[j + 1], sortedArray[j]];
            steps.push({
              array: [...sortedArray],
              comparing: [j, j + 1],
              swapped: [j, j + 1],
              description: `Swapping: ${temp1} ↔ ${temp2}`,
              codeLine: 5, // swap operation (single-line)
              phase: "swap"
            });
          }
        } else {
          steps.push({
            array: [...sortedArray],
            comparing: [j, j + 1],
            swapped: [],
            description: `No swap needed: ${sortedArray[j]} ≤ ${sortedArray[j + 1]}`,
            codeLine: 4, // staying in comparison
            phase: "no_swap"
          });
        }
      }
      
      // If no swaps were made in this pass, array is sorted
      if (!swappedInThisPass) {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          swapped: [],
          description: `Array is now sorted! No swaps needed in pass ${i + 1}`,
          codeLine: -1, // No code highlighting since we're done
          phase: "completed"
        });
        break;
      }
    }
    
  // For languages that use a temp variable (C/Java/C#), ensure `temp`
  // appears only on the swap steps themselves. Clear any `temp`
  // properties on steps that are not part of the swap sequence so the
  // temporary disappears as soon as the if-block finishes (e.g. when
  // the next inner_loop step begins).
  const languageUsesTemp = language === 'c' || language === 'java' || language === 'csharp';
  if (languageUsesTemp) {
    for (let k = 0; k < steps.length; k++) {
      const st = steps[k];
      if (!st) continue;
      // keep temp only for explicit swap phases
      if (st.phase !== 'swap_step' && st.phase !== 'swap') {
        if (st.hasOwnProperty('temp')) {
          delete st.temp;
        }
      }
    }
  }

  // Ensure the steps end with a clear 'completed' state so the UI doesn't
    // display lingering comparing indices after the algorithm finishes.
    if (steps.length > 0) {
      const last = steps[steps.length - 1];
      if (last.phase !== 'completed') {
        steps.push({
          array: [...sortedArray],
          comparing: [],
          swapped: [],
          description: 'Array is now fully sorted',
          codeLine: -1,
          phase: 'completed'
        });
      }
    }

    return steps;
  },

  // Get code lines for highlighting
  getCodeLines: (language) => {
    const codeLines = {
      javascript: [
        "function bubbleSort(arr) {",                    // 0
        "  const n = arr.length;",                      // 1
        "  for (let i = 0; i < n - 1; i++) {",         // 2
        "    for (let j = 0; j < n - i - 1; j++) {",   // 3
        "      if (arr[j] > arr[j + 1]) {",             // 4
        "        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];", // 5
        "      }",                                       // 6
        "    }",                                         // 7
        "  }",                                           // 8
        "  return arr;",                                 // 9
        "}"                                              // 10
      ],
      
      python: [
        "def bubble_sort(arr):",                         // 0
        "    n = len(arr)",                              // 1
        "    for i in range(n - 1):",                    // 2
        "        for j in range(n - i - 1):",            // 3
        "            if arr[j] > arr[j + 1]:",           // 4
        "                arr[j], arr[j + 1] = arr[j + 1], arr[j]", // 5
        "    return arr"                                 // 6
      ],
      
      java: [
        "public static void bubbleSort(int[] arr) {",    // 0
        "    int n = arr.length;",                       // 1
        "    for (int i = 0; i < n - 1; i++) {",         // 2
        "        for (int j = 0; j < n - i - 1; j++) {", // 3
        "            if (arr[j] > arr[j + 1]) {",         // 4
        "                int temp = arr[j];",             // 5
        "                arr[j] = arr[j + 1];",           // 6
        "                arr[j + 1] = temp;",             // 7
        "            }",                                  // 8
        "        }",                                      // 9
        "    }",                                         // 10
        "}"                                              // 11
      ],
      
      cpp: [
        "void bubbleSort(vector<int>& arr) {",           // 0
        "    int n = arr.size();",                       // 1
        "    for (int i = 0; i < n - 1; i++) {",         // 2
        "        for (int j = 0; j < n - i - 1; j++) {", // 3
        "            if (arr[j] > arr[j + 1]) {",         // 4
        "                swap(arr[j], arr[j + 1]);",      // 5
        "            }",                                  // 6
        "        }",                                      // 7
        "    }",                                         // 8
        "}"                                              // 9
      ],
      
      csharp: [
        "void BubbleSort(int[] arr) {",                 // 0
        "    int n = arr.Length;",                      // 1 (align indices)
        "    for (int i = 0; i < n - 1; i++) {",        // 2
        "        for (int j = 0; j < n - i - 1; j++) {", // 3
        "            if (arr[j] > arr[j + 1]) {",         // 4
        "                int temp = arr[j];",             // 5
        "                arr[j] = arr[j + 1];",           // 6
        "                arr[j + 1] = temp;",             // 7
        "            }",                                  // 8
        "        }",                                      // 9
        "    }",                                         // 10
        "}",                                             // 11
      ]
    };

    return codeLines[language] || [];
  },

  // Code templates for different languages (function only)
  getCode(language) {
    // Use the object's getCodeLines so we don't rely on the outer binding
    const lines = (this && typeof this.getCodeLines === 'function')
      ? this.getCodeLines(language)
      : null;

   
    const chosen = (lines && lines.length) ? lines : fallback;
    return chosen.join('\n');
  }
};