// Copyright (c) 2026 Saheli Mondal.

// Dutch Flag Algorithm Implementation

export const dutchFlag = {
  name: "Dutch Flag",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    if (!Array.isArray(arr) || arr.length === 0) return steps;

    const a = [...arr];
    const n = a.length;

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Initialize Dutch Flag pointers",
      phase: "init",
      codeLine: 0,
    });

    // Explicitly emit setter steps so the visualizer forms pointer variables
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Initialize low = 0`,
      phase: "set-low",
      codeLine: 1,
      low: 0,
    });

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Initialize mid = 0`,
      phase: "set-mid",
      codeLine: 2,
      mid: 0,
    });

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Initialize high = ${n - 1}`,
      phase: "set-high",
      codeLine: 3,
      high: n - 1,
    });

    // Initialize pointer variables for runtime
    let low = 0;
    let mid = 0;
    let high = n - 1;

    // Main loop
    while (mid <= high) {
      // Step: Check while condition
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Check while condition: mid (${mid}) <= high (${high})`,
        phase: "while-check",
        codeLine: 5,
        low,
        mid,
        high,
      });

      steps.push({
        array: [...a],
        comparing: [mid],
        swapped: [],
        description: `Checking a[${mid}] = ${a[mid]}`,
        phase: "check",
        codeLine: 6,
        low,
        mid,
        high,
      });

      // Step: Check if condition (arr[mid] === 0)
      steps.push({
        array: [...a],
        comparing: [mid],
        swapped: [],
        description: `Check if: a[${mid}] === 0? ${a[mid] === 0}`,
        phase: "if-check",
        codeLine: 6,
        low,
        mid,
        high,
      });

      if (a[mid] === 0) {
        // If condition is TRUE - execute this block
        steps.push({
          array: [...a],
          comparing: [mid],
          swapped: [],
          description: `Condition TRUE: a[${mid}] === 0, will swap with low`,
          phase: "if-true",
          codeLine: 6,
          low,
          mid,
          high,
        });

        // swap a[low] and a[mid]
        const tmp = a[low];
        a[low] = a[mid];
        a[mid] = tmp;

        steps.push({
          array: [...a],
          comparing: [low, mid],
          swapped: [low, mid],
          description: `Swapped a[${low}] and a[${mid}]`,
          phase: "swap-low",
          codeLine: 7,
          low,
          mid,
          high,
        });

        low++;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Increment low to ${low}`,
          phase: "increment-low",
          codeLine: 8,
          low,
          mid,
          high,
        });

        mid++;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Increment mid to ${mid}`,
          phase: "increment-mid",
          codeLine: 9,
          low,
          mid,
          high,
        });
      } else {
        // If condition is FALSE - check else-if
        steps.push({
          array: [...a],
          comparing: [mid],
          swapped: [],
          description: `Condition FALSE: a[${mid}] !== 0`,
          phase: "if-false",
          codeLine: 6,
          low,
          mid,
          high,
        });

        // Step: Check else-if condition (arr[mid] === 1)
        steps.push({
          array: [...a],
          comparing: [mid],
          swapped: [],
          description: `Check else-if: a[${mid}] === 1? ${a[mid] === 1}`,
          phase: "else-if-check",
          codeLine: 10,
          low,
          mid,
          high,
        });

        if (a[mid] === 1) {
          // Else-if condition is TRUE
          steps.push({
            array: [...a],
            comparing: [mid],
            swapped: [],
            description: `Condition TRUE: a[${mid}] === 1, move mid forward`,
            phase: "else-if-true",
            codeLine: 10,
            low,
            mid,
            high,
          });

          mid++;
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `Increment mid to ${mid}`,
            phase: "increment-mid",
            codeLine: 11,
            low,
            mid,
            high,
          });
        } else {
          // Else-if condition is FALSE - go to else
          steps.push({
            array: [...a],
            comparing: [mid],
            swapped: [],
            description: `Condition FALSE: a[${mid}] !== 1`,
            phase: "else-if-false",
            codeLine: 10,
            low,
            mid,
            high,
          });

          // Step: Else block (arr[mid] === 2 or invalid)
          steps.push({
            array: [...a],
            comparing: [mid],
            swapped: [],
            description: `Else: a[${mid}] must be 2 (or invalid)`,
            phase: "else-check",
            codeLine: 12,
            low,
            mid,
            high,
          });

          if (a[mid] === 2) {
            // Valid case: arr[mid] === 2
            steps.push({
              array: [...a],
              comparing: [mid],
              swapped: [],
              description: `a[${mid}] === 2, will swap with high`,
              phase: "else-execute",
              codeLine: 12,
              low,
              mid,
              high,
            });

            // swap a[mid] and a[high]
            const tmp = a[mid];
            a[mid] = a[high];
            a[high] = tmp;

            steps.push({
              array: [...a],
              comparing: [mid, high],
              swapped: [mid, high],
              description: `Swapped a[${mid}] and a[${high}]`,
              phase: "swap-high",
              codeLine: 13,
              low,
              mid,
              high,
            });

            high--;
            steps.push({
              array: [...a],
              comparing: [],
              swapped: [],
              description: `Decrement high to ${high}`,
              phase: "decrement-high",
              codeLine: 14,
              low,
              mid,
              high,
            });
          } else {
            // Invalid value - not 0, 1, or 2
            steps.push({
              array: [...a],
              comparing: [mid],
              swapped: [],
              description: `Invalid value encountered: ${a[mid]} at index ${mid}. Expected 0, 1, or 2.`,
              phase: "error",
              codeLine: -1,
              low,
              mid,
              high,
            });
            break;
          }
        }
      }
    }

    // Final while check that fails
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Check while condition: mid (${mid}) <= high (${high}) - FALSE`,
      phase: "while-false",
      codeLine: 5,
      low,
      mid,
      high,
    });

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Completed: Dutch Flag partitioned (0s, 1s, 2s)",
      phase: "completed",
      codeLine: -1,
      low,
      mid,
      high,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function dutchFlag(arr) {",                           // 0
        "  let low = 0;",                                      // 1
        "  let mid = 0;",                                      // 2
        "  let high = arr.length - 1;",                        // 3
        "",                                                    // 4
        "  while (mid <= high) {",                             // 5
        "    if (arr[mid] === 0) {",                           // 6
        "      [arr[low], arr[mid]] = [arr[mid], arr[low]];", // 7
        "      low++;",                                        // 8
        "      mid++;",                                        // 9
        "    } else if (arr[mid] === 1) {",                    // 10
        "      mid++;",                                        // 11
        "    } else {",                                        // 12
        "      [arr[mid], arr[high]] = [arr[high], arr[mid]];", // 13
        "      high--;",                                       // 14
        "    }",                                               // 15
        "  }",                                                 // 16
        "}",                                                   // 17
      ],
      python: [
        "def dutch_flag(arr):",                                // 0
        "    low = 0",                                         // 1
        "    mid = 0",                                         // 2
        "    high = len(arr) - 1",                             // 3
        "",                                                    // 4
        "    while mid <= high:",                              // 5
        "        if arr[mid] == 0:",                           // 6
        "            arr[low], arr[mid] = arr[mid], arr[low]", // 7
        "            low += 1",                                // 8
        "            mid += 1",                                // 9
        "        elif arr[mid] == 1:",                         // 10
        "            mid += 1",                                // 11
        "        else:",                                       // 12
        "            arr[mid], arr[high] = arr[high], arr[mid]", // 13
        "            high -= 1",                               // 14
      ],
      java: [
        "public static void dutchFlag(int[] arr) {",           // 0
        "    int low = 0;",                                    // 1
        "    int mid = 0;",                                    // 2
        "    int high = arr.length - 1;",                      // 3
        "",                                                    // 4
        "    while (mid <= high) {",                           // 5
        "        if (arr[mid] == 0) {",                        // 6
        "            swap(arr, low, mid);",                    // 7
        "            low++;",                                  // 8
        "            mid++;",                                  // 9
        "        } else if (arr[mid] == 1) {",                 // 10
        "            mid++;",                                  // 11
        "        } else {",                                    // 12
        "            swap(arr, mid, high);",                   // 13
        "            high--;",                                 // 14
        "        }",                                           // 15
        "    }",                                               // 16
        "}",                                                   // 17
      ],
      csharp: [
        "void DutchFlag(int[] arr) {",                         // 0
        "    int low = 0;",                                    // 1
        "    int mid = 0;",                                    // 2
        "    int high = arr.Length - 1;",                      // 3
        "",                                                    // 4
        "    while (mid <= high) {",                           // 5
        "        if (arr[mid] == 0) {",                        // 6
        "            swap(arr, low, mid);",                    // 7
        "            low++;",                                  // 8
        "            mid++;",                                  // 9
        "        } else if (arr[mid] == 1) {",                 // 10
        "            mid++;",                                  // 11
        "        } else {",                                    // 12
        "            Swap(arr, mid, high);",                   // 13
        "            high--;",                                 // 14
        "        }",                                           // 15
        "    }",                                               // 16
        "}",                                                   // 17
      ],
      cpp: [
        "void dutchFlag(int arr[], int n) {",                  // 0
        "    int low = 0;",                                    // 1
        "    int mid = 0;",                                    // 2
        "    int high = n - 1;",                               // 3
        "",                                                    // 4
        "    while (mid <= high) {",                           // 5
        "        if (arr[mid] == 0) {",                        // 6
        "            swap(arr[low], arr[mid]);",               // 7
        "            low++;",                                  // 8
        "            mid++;",                                  // 9
        "        } else if (arr[mid] == 1) {",                 // 10
        "            mid++;",                                  // 11
        "        } else {",                                    // 12
        "            swap(arr[mid], arr[high]);",              // 13
        "            high--;",                                 // 14
        "        }",                                           // 15
        "    }",                                               // 16
        "}",                                                   // 17
      ],
    };
    return lines[language] || lines.javascript;
  },
};

export default dutchFlag;