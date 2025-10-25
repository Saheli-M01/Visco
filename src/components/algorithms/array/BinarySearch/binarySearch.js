// Heap Sort Algorithm Implementation (visualized)
import codes from "./binarySearchCodes";

export const binarySearch = {
  name: "Binary Search",

  generateSteps: (arr, language = "javascript", target = null) => {
    const steps = [];
    if (!Array.isArray(arr) || arr.length === 0) return steps;

    // snapshot for UI (array is not modified by binary search)
    const snapshot = [...arr];

    // initial step
    steps.push({
      array: snapshot,
      comparing: [],
      description:
        target == null
          ? "Binary Search: no target provided"
          : `Start search for target ${target}`,
      phase: "init",
      codeLine: 1,
      low: 0,
      high: arr.length - 1,
      mid: null,
      target: target,
    });

    if (target == null) return steps;

    let low = 0;
    steps.push({
        array: snapshot,
        comparing: [],
        description: `low = ${low}`,
        phase: "set-low",
        codeLine: 1,
        low: low,
      });
    let high = arr.length - 1;
    steps.push({
        array: snapshot,
        comparing: [],
        description: `high = ${high}`,
        phase: "set-high",
        codeLine: 2,
        low: low,
        high: high,
      });
    let found = -1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);

      // compare step
      steps.push({
        array: snapshot,
        comparing: [mid],
        description: `Compare target ${target} with arr[${mid}] = ${arr[mid]}`,
        phase: "compare",
        codeLine: 4,
        low,
        high,
        mid,
        target,
      });

      if (arr[mid] === target) {
        found = mid;
        steps.push({
          array: snapshot,
          comparing: [mid],
          description: `Found target at index ${mid}`,
          phase: "found",
          codeLine: 5,
          low,
          high,
          mid,
          target,
        });
        break;
      }

      if (arr[mid] < target) {
        // move high
        steps.push({
          array: snapshot,
          comparing: [mid],
          description: `Target > arr[${mid}] (${arr[mid]}) — move high`,
          phase: "move_high",
          codeLine: 6,
          low: mid + 1,
          high,
          mid,
          target,
        });
        low = mid + 1;
      } else {
        // move low
        steps.push({
          array: snapshot,
          comparing: [mid],
          description: `Target < arr[${mid}] (${arr[mid]}) — move low`,
          phase: "move_low",
          codeLine: 7,
          low,
          high: mid - 1,
          mid,
          target,
        });
        high = mid - 1;
      }
    }

    if (found === -1) {
      steps.push({
        array: snapshot,
        comparing: [],
        description: "Target not found",
        phase: "completed",
        codeLine: -1,
        low: -1,
        high: -1,
        mid: -1,
        target,
      });
    }

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function binarySearch(arr, target) {", //1
        "        let low = 0;", //2
        "        let high = arr.length - 1;", //3
        "", //4
        "        while (high >= low) {", //5
        "            let mid = low + Math.floor((high - low) / 2);", //6
        "             if (arr[mid] == targets)", //7
        "                 return mid;", //8
        "             if (arr[mid] > targets)", //9
        "                 high = mid - 1;", //10
        "             else", //11
        "                 low = mid + 1;", //12
        "         }", //13
        "return -1;", //14
        "}", //15
      ],
      python: [
        "def binarySearch(arr, target):", //1
        "    low = 0 ", //2
        "    high = len(arr) - 1", //3
        "", //4
        "    while low <= high:", //5
        "         mid = low + (high - low) // 2", //6
        "         if arr[mid] == target:", //7
        "             return mid", //8
        "    elif arr[mid] < target:", //9
        "         low = mid + 1", //10
        "    else:", //11
        "          high = mid - 1", //12
        "return -1", //15
      ],
      cpp: [
        "int binarySearch(vector<int> &arr, int target) {", //1
        "        int low = 0;", //2
        "        int high = arr.size() - 1;", //3
        "        ", //4
        "        while (low <= high) {", //5
        "             int mid = low + (high - low) / 2;", //6
        "             if (arr[mid] == target)", //7
        "                 return mid;", //8
        "             if (arr[mid] < target)", //9
        "                 low = mid + 1;", //10
        "             else", //11
        "                 high = mid - 1;", //12
        "        }", //13
        "return -1;", //14
        "}", //15
      ],
      csharp: [
       "static int binarySearch(int[] arr, int target) {", //1
        "        int low = 0;", //2
        "        int high = arr.size() - 1;", //3
        "        ", //4
        "        while (low <= high) {", //5
        "             int mid = low + (high - low) / 2;", //6
        "             if (arr[mid] == target)", //7
        "                 return mid;", //8
        "             if (arr[mid] < target)", //9
        "                 low = mid + 1;", //10
        "             else", //11
        "                 high = mid - 1;", //12
        "        }", //13
        "return -1;", //14
        "}", //15
      ],
      java: [
       "static int binarySearch(int[] arr, int target) {", //1
        "        int low = 0;", //2
        "        int high = arr.size() - 1;", //3
        "        ", //4
        "        while (low <= high) {", //5
        "             int mid = low + (high - low) / 2;", //6
        "             if (arr[mid] == target)", //7
        "                 return mid;", //8
        "             if (arr[mid] < target)", //9
        "                 low = mid + 1;", //10
        "             else", //11
        "                 high = mid - 1;", //12
        "        }", //13
        "return -1;", //14
        "}", //15
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = (codes[language] && codes[language]) || codes.javascript;
    return lines.join("\n");
  },
};
