// Kadane's Algorithm Implementation

export const kadane = {
  name: "Kadane's Algorithm",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];

    // Line 1: function entry
    steps.push({
      array: snapshot,
      description: `Enter kadane function`,

      phase: "code-line",
      codeLine: 0,
    });

    // Line 2: if-check for empty array
    steps.push({
      array: snapshot,
      description: `Check if array is empty (if statement)`,

      phase: "cond-line",
      codeLine: 1,
    });

    // Line 3: return when empty
    if (!Array.isArray(arr) || arr.length === 0) {
      steps.push({
        array: snapshot,
        description: `Array empty -> return default result`,

        phase: "return",
        codeLine: 2,
      });
      return steps;
    }

    // Line 4: form currentSum (maxEndingHere)
    let currentSum = arr[0];
    steps.push({
      array: snapshot,
      description: `Set currentSum = arr[0] -> currentSum = ${currentSum}`,
      currentSum,
      maxSoFar: undefined,
      start: undefined,
      end: undefined,

      phase: "currentSum-phase",
      codeLine: 4,
    });

    // Line 5: form maxSoFar
    let maxSoFar = arr[0];
    steps.push({
      array: snapshot,
      description: `Set maxSoFar = ${maxSoFar}`,
      currentSum,
      maxSoFar,
      start: undefined,
      end: undefined,

      phase: "maxSoFar-phase",
      codeLine: 5,
    });

    // Line 6: form start, end, s
    let start = 0;
    let s = 0;
    let end = 0;
    steps.push({
      array: snapshot,
      description: `Initialize start, end, s -> start=${start}, end=${end}, s=${s}`,
      currentSum,
      maxSoFar,
      start,
      end,

      phase: "start_end_s-phase",
      codeLine: 6,
    });

    // Iterate through array starting from index 1
   // Iterate through array starting from index 1
    for (let i = 1; i < arr.length; i++) {
      // Line 8: for-loop entry
      steps.push({
        array: snapshot,
        description: `Enter for-loop: i = ${i}`,
        i,
        currentSum,
        maxSoFar,
        start,
        end,
        currentIndex: i,
        phase: "for-loop",
        codeLine: 8,
      });

      const val = arr[i];

      // Line 9: if condition check
      steps.push({
        array: snapshot,
        description: `Check if arr[${i}] = (${val}) > currentSum + arr[${i}] = (${currentSum + val})`,
        i,
        currentSum,
        maxSoFar,
        start,
        end,
        currentIndex: i,
        phase: "if-check",
        codeLine: 9,
      });

      // Decide whether to start new subarray at i or extend
      const newCurrent = Math.max(val, currentSum + val);
      const startedNew = newCurrent === val;
      
      if (startedNew) {
        // Line 10-11: Start new subarray
        steps.push({
          array: snapshot,
          description: `Start new subarray: currentSum = arr[${i}] = ${val}`,
          i,
          currentSum: val,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "new-subarray",
          codeLine: 10,
        });
        
        s = i;
        steps.push({
          array: snapshot,
          description: `Update s = ${i}`,
          i,
          currentSum: val,
          maxSoFar,
          start,
          end,
          s,
          currentIndex: i,
          phase: "update-s",
          codeLine: 11,
        });
        currentSum = val;
      } else {
        // Line 13: Extend current subarray
        currentSum += val;
        steps.push({
          array: snapshot,
          description: `Extend subarray: currentSum += arr[${i}] → currentSum = ${currentSum}`,
          i,
          currentSum,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "extend-subarray",
          codeLine: 13,
        });
      }

      // Line 16: Check if new max found
      steps.push({
        array: snapshot,
        description: `Check if currentSum (${currentSum}) > maxSoFar (${maxSoFar})`,
        i,
        currentSum,
        maxSoFar,
        start,
        end,
        currentIndex: i,
        phase: "max-check",
        codeLine: 15,
      });

      if (currentSum > maxSoFar) {
        // Lines 17-19: Update max
        maxSoFar = currentSum;
        steps.push({
          array: snapshot,
          description: `Update maxSoFar = ${maxSoFar}`,
          i,
          currentSum,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "update-max",
          codeLine: 16,
        });

        start = s;
      
        steps.push({
          array: snapshot,
          description: `Update range: start = ${start}`,
          i,
          currentSum,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "update-range",
          codeLine: 17,
        });
          end = i;
           steps.push({
          array: snapshot,
          description: `Update range:end = ${end}`,
          i,
          currentSum,
          maxSoFar,
          start,
          end,
          currentIndex: i,
          phase: "update-range",
          codeLine: 18,
        });
      }
    }
    // Mark loop exit to hide loop-scoped variables like `i`
    steps.push({
      array: snapshot,
      description: `for-exit`,
      currentSum,
      maxSoFar,
      start,
      end,
      phase: "for-exit",
      codeLine: 20,
    });

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
        "function kadane(arr) {", // 1
        "  if (!arr || arr.length === 0);", // 2
        "     return { maxSum: 0, start: -1, end: -1 };", // 3
        "  let currentSumingHere = arr[0];", // 4
        "  let maxSoFar = arr[0];", // 5
        "  let start = 0, end = 0, s = 0;", // 6
        "  ", // 7
        "  for (let i = 1; i < arr.length; i++) {", // 8
        "    if (arr[i] > currentSumingHere + arr[i]) {", // 9
        "      currentSumingHere = arr[i];", // 10
        "      s = i;", // 11
        "    } else {", // 12
        "      currentSumingHere += arr[i];", // 13
        "    }", // 14
        "", // 15
        "    if (currentSumingHere > maxSoFar) {", // 16
        "      maxSoFar = currentSumingHere;", // 17
        "      start = s;", // 18
        "      end = i;", // 19
        "    }", // 20
        "  }", // 20
        "  ", // 21
        "  return { maxSum: maxSoFar, start, end };", //22
        "}", //23
      ],
      python: [
        "def kadane(arr):", // 1
        "    if not arr:", // 2
        "        return {'maxSum': 0, 'start': -1, 'end': -1}", // 3
        "    currentSum = arr[0]", // 4
        "    maxSoFar = arr[0]", // 5
        "    start = end = s = 0", // 6
        "    ", // 7
        "    for i in range(1, len(arr)):", //8
        "        if arr[i] > currentSum + arr[i]:", // 9
        "            currentSum = arr[i]", // 10
        "            s = i", // 11
        "        else:", // 12
        "            currentSum += arr[i]", // 13
        "", // 14
        "", // 15
        "        if currentSum > maxSoFar:", // 16
        "            maxSoFar = currentSum", // 17
        "            start = s", // 18
        "            end = i", // 19
        "    ", // 20
        "", // 21
        "    return {'maxSum': maxSoFar, 'start': start, 'end': end}", // 22
        "", // 23
      ],
      java: [
        "public static Map<String, Integer> kadane(int[] arr) {", // 1
        "    if (arr == null || arr.length == 0) {", // 2
        '        return Map.of("maxSum", 0, "start", -1, "end", -1);', // 3
        "    }", // 4
        "    int currentSum = arr[0];", // 5
        "    int maxSoFar = arr[0];", // 6
        "    int start = 0, end = 0, s = 0;", // 7
        "    ", // 8
        "    for (int i = 1; i < arr.length; i++) {", // 9
        "        if (arr[i] > currentSum + arr[i]) {", // 10
        "            currentSum = arr[i];", // 11
        "            s = i;", // 12
        "        } else {", // 13
        "            currentSum += arr[i];", // 14
        "        }", // 15
        "        if (currentSum > maxSoFar) {", // 16
        "            maxSoFar = currentSum;", // 17
        "            start = s;", // 18
        "            end = i;", // 19
        "        }", // 20
        "    }", // 21
        '    return Map.of("maxSum", maxSoFar, "start", start, "end", end);', // 22
        "}", // 23
      ],
      csharp: [
        "public static Dictionary<string, int> Kadane(int[] arr) {", // 1
        "    if (arr == null || arr.Length == 0) {", // 2
        '        return new Dictionary<string, int> { {"maxSum", 0}, {"start", -1}, {"end", -1} };', // 3
        "    }", // 4
        "    int currentSum = arr[0];", // 5
        "    int maxSoFar = arr[0];", // 6
        "    int start = 0, end = 0, s = 0;", // 7
        "    ", // 8
        "    for (int i = 1; i < arr.Length; i++) {", // 9
        "        if (arr[i] > currentSum + arr[i]) {", // 10
        "            currentSum = arr[i];", // 11
        "            s = i;", // 12
        "        } else {", // 13
        "            currentSum += arr[i];", // 14
        "        }", // 15
        "        if (currentSum > maxSoFar) {", // 16
        "            maxSoFar = currentSum;", // 17
        "            start = s;", // 18
        "            end = i;", // 19
        "        }", // 20
        "    }", // 21
        '    return new Dictionary<string, int> { {"maxSum", maxSoFar}, {"start", start}, {"end", end} };', // 22
        "}", // 23
      ],
      cpp: [
        "std::map<std::string, int> kadane(const std::vector<int>& arr) {", // 1
        "    if (arr.empty()) {", // 2
        '        return {{"maxSum", 0}, {"start", -1}, {"end", -1}};', // 3
        "    }", // 4
        "    int currentSum = arr[0];", // 5
        "    int maxSoFar = arr[0];", // 6
        "    int start = 0, end = 0, s = 0;", // 7
        "    ", // 8
        "    for (size_t i = 1; i < arr.size(); i++) {", // 9
        "        if (arr[i] > currentSum + arr[i]) {", // 10
        "            currentSum = arr[i];", // 11
        "            s = i;", // 12
        "        } else {", // 13
        "            currentSum += arr[i];", // 14
        "        }", // 15
        "        if (currentSum > maxSoFar) {", // 16
        "            maxSoFar = currentSum;", // 17
        "            start = s;", // 18
        "            end = i;", // 19
        "        }", // 20
        "    ", // 21
        '    return {{"maxSum", maxSoFar}, {"start", start}, {"end", end}};', // 22
        "}", // 23
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};

export default kadane;
