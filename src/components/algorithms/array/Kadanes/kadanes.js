// Kadane's Algorithm Implementation

export const kadane = {
  name: "Kadane's Algorithm",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    if (!Array.isArray(arr) || arr.length === 0) return steps;

    const snapshot = [...arr];

    // Initial state
    let currentSum = arr[0];
    let maxSoFar = arr[0];
    let start = 0;
    let s = 0;
    let end = 0;

    steps.push({
      array: snapshot,
      description: `Initialize: currentSum = ${currentSum}, maxSoFar = ${maxSoFar}`,
      currentSum,
      maxSoFar,
      start,
      end,
      currentIndex: 0,
      phase: "init",
      codeLine: 0,
    });

    // Iterate through array starting from index 1
    for (let i = 1; i < arr.length; i++) {
      const val = arr[i];

      // Before update
      steps.push({
        array: snapshot,
        description: `Consider arr[${i}] = ${val}`,
        currentSum,
        maxSoFar,
        start,
        end,
        currentIndex: i,
        phase: "consider",
        codeLine: 2,
      });

      // Decide whether to start new subarray at i or extend
      const newCurrent = Math.max(val, currentSum + val);
      const startedNew = newCurrent === val;
      if (startedNew) {
        s = i;
      }
      currentSum = newCurrent;

      steps.push({
        array: snapshot,
        description: startedNew
          ? `Start new subarray at index ${i}: currentSum = ${currentSum}`
          : `Extend subarray with ${val}: currentSum = ${currentSum}`,
        currentSum,
        maxSoFar,
        start: s,
        end,
        currentIndex: i,
        phase: "update-current",
        codeLine: 3,
      });

      if (currentSum > maxSoFar) {
        maxSoFar = currentSum;
        start = s;
        end = i;
        steps.push({
          array: snapshot,
          description: `New max found: maxSoFar = ${maxSoFar} (from ${start} to ${end})`,
          currentSum,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "update-max",
          codeLine: 4,
        });
      }
    }

    steps.push({
      array: snapshot,
      description: `Completed: max sum = ${maxSoFar} (from ${start} to ${end})`,
      currentSum,
      maxSoFar,
      start,
      end,
      currentIndex: arr.length - 1,
      phase: "completed",
      codeLine: -1,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function kadane(arr) {",
        "  if (!arr || arr.length === 0) return { maxSum: 0, start: -1, end: -1 };",
        "  let maxEndingHere = arr[0];",
        "  let maxSoFar = arr[0];",
        "  let start = 0, end = 0, s = 0;",
        "  ",
        "  for (let i = 1; i < arr.length; i++) {",
        "    if (arr[i] > maxEndingHere + arr[i]) {",
        "      maxEndingHere = arr[i];",
        "      s = i;",
        "    } else {",
        "      maxEndingHere += arr[i];",
        "    }",
        "",
        "    if (maxEndingHere > maxSoFar) {",
        "      maxSoFar = maxEndingHere;",
        "      start = s;",
        "      end = i;",
        "    }",
        "  }",
        "  ",
        "  return { maxSum: maxSoFar, start, end };",
        "}",
      ],
      python: [
        "def kadane(arr):",
        "    if not arr:",
        "        return {'maxSum': 0, 'start': -1, 'end': -1}",
        "    ",
        "    max_ending_here = max_so_far = arr[0]",
        "    start = end = s = 0",
        "    ",
        "    for i in range(1, len(arr)):",
        "        if arr[i] > max_ending_here + arr[i]:",
        "            max_ending_here = arr[i]",
        "            s = i",
        "        else:",
        "            max_ending_here += arr[i]",
        "",
        "        if max_ending_here > max_so_far:",
        "            max_so_far = max_ending_here",
        "            start = s",
        "            end = i",
        "    ",
        "    return {'maxSum': max_so_far, 'start': start, 'end': end}",
      ],
      java: [
        "public class KadaneExample {",
        "    static class Result {",
        "        int maxSum, start, end;",
        "        Result(int m, int s, int e) { maxSum = m; start = s; end = e; }",
        "    }",
        "",
        "    static Result kadane(int[] arr) {",
        "        if (arr == null || arr.length == 0)",
        "            return new Result(0, -1, -1);",
        "        ",
        "        int maxEnding = arr[0], maxSoFar = arr[0];",
        "        int start = 0, end = 0, s = 0;",
        "        ",
        "        for (int i = 1; i < arr.length; i++) {",
        "            if (arr[i] > maxEnding + arr[i]) {",
        "                maxEnding = arr[i];",
        "                s = i;",
        "            } else {",
        "                maxEnding += arr[i];",
        "            }",
        "            ",
        "            if (maxEnding > maxSoFar) {",
        "                maxSoFar = maxEnding;",
        "                start = s;",
        "                end = i;",
        "            }",
        "        }",
        "        ",
        "        return new Result(maxSoFar, start, end);",
        "    }",
        "}",
      ],
      csharp: [
        "class KadaneExample {",
        "    static (int maxSum, int start, int end) Kadane(int[] arr) {",
        "        if (arr == null || arr.Length == 0)",
        "            return (0, -1, -1);",
        "        ",
        "        int maxEnding = arr[0], maxSoFar = arr[0];",
        "        int start = 0, end = 0, s = 0;",
        "        ",
        "        for (int i = 1; i < arr.Length; i++) {",
        "            if (arr[i] > maxEnding + arr[i]) {",
        "                maxEnding = arr[i];",
        "                s = i;",
        "            } else {",
        "                maxEnding += arr[i];",
        "            }",
        "            ",
        "            if (maxEnding > maxSoFar) {",
        "                maxSoFar = maxEnding;",
        "                start = s;",
        "                end = i;",
        "            }",
        "        }",
        "        ",
        "        return (maxSoFar, start, end);",
        "    }",
        "}",
      ],
      cpp: [
        "tuple<int,int,int> kadane(const vector<int>& arr) {",
        "    if (arr.empty())",
        "        return {0, -1, -1};",
        "    ",
        "    int maxEnding = arr[0], maxSoFar = arr[0];",
        "    int start = 0, end = 0, s = 0;",
        "    ",
        "    for (size_t i = 1; i < arr.size(); ++i) {",
        "        if (arr[i] > maxEnding + arr[i]) {",
        "            maxEnding = arr[i];",
        "            s = i;",
        "        } else {",
        "            maxEnding += arr[i];",
        "        }",
        "        ",
        "        if (maxEnding > maxSoFar) {",
        "            maxSoFar = maxEnding;",
        "            start = s;",
        "            end = i;",
        "        }",
        "    }",
        "    ",
        "    return {maxSoFar, start, end};",
        "}",
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join('\n');
  },
};

export default kadane;