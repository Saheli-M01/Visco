// Copyright (c) 2026 Saheli Mondal.

// Binary Search Algorithm Implementation (visualized)


export const binarySearch = {
  name: "Binary Search",

  generateSteps: (arr, language = "javascript", target = null) => {
    const steps = [];
    if (!Array.isArray(arr) || arr.length === 0) return steps;

    // snapshot for UI (array is not modified by binary search)
    const snapshot = [...arr];

    // Step 1: Initial step
    steps.push({
      array: snapshot,
      comparing: [],
      description:
        target == null
          ? "Binary Search: no target provided"
          : `Start search for target ${target}`,
      phase: "init",
      codeLine: 0,
      low: null,
      high: null,
      mid: null,
      target: target,
    });

    if (target == null) return steps;

    // Step 2: Initialize low
    let low = 0;
    steps.push({
      array: snapshot,
      comparing: [],
      description: `Initialize low = ${low}`,
      phase: "set-low",
      codeLine: 1,
      low: low,
      high: null,
      mid: null,
      target,
    });

    // Step 3: Initialize high
    let high = arr.length - 1;
    steps.push({
      array: snapshot,
      comparing: [],
      description: `Initialize high = ${high}`,
      phase: "set-high",
      codeLine: 2,
      low: low,
      high: high,
      mid: null,
      target,
    });

    let found = -1;

    // Main loop
    while (low <= high) {
      // Step: Check loop condition
      steps.push({
        array: snapshot,
        comparing: [],
        description: `Check condition: low (${low}) <= high (${high}) — True, continue loop`,
        phase: "while-check",
        codeLine: 4,
        low: low,
        high: high,
        mid: null,
        target,
      });

      // Step: Calculate mid
      const mid = low + Math.floor((high - low) / 2);
      steps.push({
        array: snapshot,
        comparing: [mid],
        description: `Calculate mid = ${low} + (${high} - ${low}) / 2 = ${mid}`,
        phase: "set-mid",
        codeLine: 5,
        low: low,
        high: high,
        mid: mid,
        target,
      });

      // Step: Check if arr[mid] == target
      steps.push({
        array: snapshot,
        comparing: [mid],
        description: `Compare: arr[${mid}] = ${arr[mid]} with target = ${target}`,
        phase: "compare-equal",
        codeLine: 6,
        low: low,
        high: high,
        mid: mid,
        target,
      });

      if (arr[mid] === target) {
        found = mid;
        steps.push({
          array: snapshot,
          comparing: [],
          description: `✓ Found! arr[${mid}] = ${arr[mid]} equals target ${target}`,
          phase: "completed",
          codeLine: 7,
          low: low,
          high: high,
          mid: mid,
          target,
        });
        break;
      }

      // Step: Check if arr[mid] < target
      steps.push({
        array: snapshot,
        comparing: [mid],
        description: `Check: arr[${mid}] = ${arr[mid]} < target ${target}?`,
        phase: "compare-less",
        codeLine: 8,
        low: low,
        high: high,
        mid: mid,
        target,
      });

      if (arr[mid] < target) {
        low = mid + 1;
        steps.push({
          array: snapshot,
          comparing: [mid],
          description: `arr[${mid}] = ${arr[mid]} < ${target} — Search right half, set low = ${mid + 1}`,
          phase: "move-low",
          codeLine: 9,
          low: low,
          high: high,
          mid: mid,
          target,
        });
        
      } else {
        high = mid - 1;
        steps.push({
          array: snapshot,
          comparing: [mid],
          description: `arr[${mid}] = ${arr[mid]} > ${target} — Search left half, set high = ${mid - 1}`,
          phase: "move-high",
          codeLine: 11,
          low: low,
          high: high,
          mid: mid,
          target,
        });
        
      }
    }

    // Step: Loop ended - check if found
    if (found === -1) {
      steps.push({
        array: snapshot,
        comparing: [],
        description: `Check condition: low (${low}) <= high (${high}) — False, exit loop`,
        phase: "while-end",
        codeLine: 4,
        low: low,
        high: high,
        mid: null,
        target,
      });

      steps.push({
        array: snapshot,
        comparing: [],
        description: `Target ${target} not found in array`,
        phase: "completed",
        codeLine: 13,
        low: low,
        high: high,
        mid: null,
        target,
      });
      
    }

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function binarySearch(arr, target) {", //0
        "    let low = 0;", //1
        "    let high = arr.length - 1;", //2
        "", //3
        "    while (low <= high) {", //4
        "        let mid = low + Math.floor((high - low) / 2);", //5
        "        if (arr[mid] == target)", //6
        "            return mid;", //7
        "        if (arr[mid] < target)", //8
        "            low = mid + 1;", //9
        "        else", //10
        "            high = mid - 1;", //11
        "    }", //12
        "    return -1;", //13
        "}", //14
      ],
      python: [
        "def binarySearch(arr, target):", //0
        "    low = 0", //1
        "    high = len(arr) - 1", //2
        "", //3
        "    while low <= high:", //4
        "        mid = low + (high - low) // 2", //5
        "        if arr[mid] == target:", //6
        "            return mid", //7
        "        elif arr[mid] < target:", //8
        "            low = mid + 1", //9
        "        else:", //10
        "            high = mid - 1", //11
        "", //12
        "    return -1", //13
      ],
      cpp: [
        "int binarySearch(vector<int> &arr, int target) {", //0
        "    int low = 0;", //1
        "    int high = arr.size() - 1;", //2
        "", //3
        "    while (low <= high) {", //4
        "        int mid = low + (high - low) / 2;", //5
        "        if (arr[mid] == target)", //6
        "            return mid;", //7
        "        if (arr[mid] < target)", //8
        "            low = mid + 1;", //9
        "        else", //10
        "            high = mid - 1;", //11
        "    }", //12
        "    return -1;", //13
        "}", //14
      ],
      csharp: [
        "static int binarySearch(int[] arr, int target) {", //0
        "    int low = 0;", //1
        "    int high = arr.Length - 1;", //2
        "", //3
        "    while (low <= high) {", //4
        "        int mid = low + (high - low) / 2;", //5
        "        if (arr[mid] == target)", //6
        "            return mid;", //7
        "        if (arr[mid] < target)", //8
        "            low = mid + 1;", //9
        "        else", //10
        "            high = mid - 1;", //11
        "    }", //12
        "    return -1;", //13
        "}", //14
      ],
      java: [
        "static int binarySearch(int[] arr, int target) {", //0
        "    int low = 0;", //1
        "    int high = arr.length - 1;", //2
        "", //3
        "    while (low <= high) {", //4
        "        int mid = low + (high - low) / 2;", //5
        "        if (arr[mid] == target)", //6
        "            return mid;", //7
        "        if (arr[mid] < target)", //8
        "            low = mid + 1;", //9
        "        else", //10
        "            high = mid - 1;", //11
        "    }", //12
        "    return -1;", //13
        "}", //14
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = (codes[language] && codes[language]) || codes.javascript;
    return lines.join("\n");
  },
};