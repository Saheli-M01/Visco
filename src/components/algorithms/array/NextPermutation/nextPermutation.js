// Copyright (c) 2026 Saheli Mondal.

// Next Permutation Algorithm Implementation

export const nextPermutation = {
  name: "Next Permutation",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];

    // Line 0: Function entry
    steps.push({
      array: [...snapshot],
      description: "Function called with array",
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Declare n variable
    steps.push({
      array: [...snapshot],
      description: `Set n = ${arr.length} (array length)`,
      phase: "n-in",
      codeLine: 1,
    });

    // Line 2: Initialize ind = -1
    steps.push({
      array: [...snapshot],
      description: "Initialize pivot index ind = -1",
      pivot: -1,
      phase: "initialization",
      codeLine: 2,
    });

    // Line 4: Start for loop to find pivot
    steps.push({
      array: [...snapshot],
      description: "Start loop: searching for pivot from right to left",
      pivot: -1,
      i: arr.length - 2,
      phase: "find-pivot-start",
      codeLine: 4,
    });

    let pivot = -1;
    for (let i = arr.length - 2; i >= 0; i--) {
      // Line 5: Check condition
      steps.push({
        array: [...arr],
        description: `Check if arr[${i}] (${arr[i]}) < arr[${i + 1}] (${arr[i + 1]})`,
        comparing: [i, i + 1],
        pivot: pivot,
        i: i,
        phase: "finding-pivot",
        codeLine: 5,
      });

      if (arr[i] < arr[i + 1]) {
        // Line 6: Set ind = i
        pivot = i;
        steps.push({
          array: [...arr],
          description: `Found! Set ind = ${pivot}`,
          comparing: [],
          pivot,
          i: i,
          phase: "pivot-found",
          codeLine: 6,
        });
        
        // Line 7: Break from loop
        steps.push({
          array: [...arr],
          description: `Break from loop (pivot found at index ${pivot})`,
          pivot,
          i: i,
          phase: "pivot-break",
          codeLine: 7,
        });
        break;
      }
       steps.push({
      array: [...snapshot],
      description: "i decrement",
      pivot,
      i: i - 1,
      phase: "i-decrement",
      codeLine: 4,
    });
    }

    // Line 11: Check if ind === -1
    steps.push({
      array: [...arr],
      description: pivot === -1 ? "Check: ind === -1? YES - no pivot found" : "Check: ind === -1? NO - pivot exists",
      pivot,
      phase: "check-no-pivot",
      codeLine: 11,
    });

    if (pivot === -1) {
      // Line 12: Reverse array
      steps.push({
        array: [...arr],
        description: "No pivot found - array is in descending order (largest permutation)",
        pivot: -1,
        phase: "no-pivot",
        codeLine: 12,
      });

      arr.reverse();
      
      steps.push({
        array: [...arr],
        description: "Reversed entire array to get smallest permutation",
        pivot: -1,
        phase: "reversed-all",
        codeLine: 12,
      });

      // Line 13: Return
      steps.push({
        array: [...arr],
        description: "Return - Complete! This is the smallest permutation",
        phase: "completed",
        codeLine: 13,
      });

      return steps;
    }

    // Line 16: Start loop to find successor
    steps.push({
      array: [...arr],
      description: `Start loop: searching for successor from right, starting at index ${arr.length - 1}`,
      pivot,
      i: arr.length - 1,
      phase: "find-successor-start",
      codeLine: 16,
    });

    let successor = -1;
    for (let j = arr.length - 1; j > pivot; j--) {
      // Line 17: Check condition
      steps.push({
        array: [...arr],
        description: `Check if arr[${j}] (${arr[j]}) > arr[${pivot}] (${arr[pivot]})`,
        comparing: [pivot, j],
      
        i: j,
        phase: "finding-successor",
        codeLine: 17,
      });

      if (arr[j] > arr[pivot]) {
        successor = j;

        // We will branch the visualization by language to match code lines
        const isJavaLike = (language === "java" || language === "csharp");
        const tempValue = arr[j]; // value at nums[i]
        const pivotValueBefore = arr[pivot]; // save before any assignment

        if (isJavaLike) {
          // Line 18: highlight temp creation: int temp = nums[i];
          steps.push({
            array: [...arr],
            description: `Create temp = arr[${j}] (${tempValue})`,
            comparing: [pivot, j],
            pivot,
            i: j,
            temp: { value: tempValue, index: j },
            phase: "before-swap",
            codeLine: 18,
          });

          // Line 19: nums[i] = nums[ind]; (assign successor position from pivot)
          arr[j] = pivotValueBefore;
          steps.push({
            array: [...arr],
            description: `nums[${j}] = nums[${pivot}] → arr[${j}] = ${pivotValueBefore}`,
            swapped: [pivot, j],
            pivot,
            i: j,
            temp: { value: tempValue, index: j },
            phase: "swap-assign-1",
            codeLine: 19,
          });

          // Line 20: nums[ind] = temp; (complete swap)
          arr[pivot] = tempValue;
          steps.push({
            array: [...arr],
            description: `nums[${pivot}] = temp → arr[${pivot}] = ${tempValue}`,
            swapped: [pivot, j],
            pivot,
            i: j,
            temp: { value: tempValue, index: j },
            phase: "swap-assign-2",
            codeLine: 20,
          });

          // Line 21: break;
          steps.push({
            array: [...arr],
            description: "Break from loop (found and swapped)",
            pivot,
            i: j,
            phase: "successor-break",
            codeLine: 21,
          });
        } else {
          // Other languages: single swap line
          steps.push({
            array: [...arr],
            description: `Found at index ${j}! Now swap arr[${pivot}] and arr[${j}]`,
            comparing: [pivot, j],
            pivot,
            i: j,
            phase: "before-swap",
            codeLine: 18,
          });

          [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];

          steps.push({
            array: [...arr],
            description: `Swapped: arr[${pivot}] = ${arr[pivot]}, arr[${j}] = ${arr[j]}`,
            swapped: [pivot, j],
            pivot,
            i: j,
            phase: "after-swap",
            codeLine: 19,
          });

          steps.push({
            array: [...arr],
            description: "Break from loop (found and swapped)",
            pivot,
            i: j,
            phase: "successor-break",
            codeLine: 20,
          });
        }
        break;
      }
    }

    // Reverse suffix (language-specific visualization)
    const reverseStart = pivot + 1;
    let left = reverseStart;
    let right = arr.length - 1;

    const isJavaLikeReverse = (language === "java" || language === "csharp");

    if (isJavaLikeReverse) {
      // Line 26: initialize left/right
      steps.push({
        array: [...arr],
        description: `Initialize left = ind + 1 (${reverseStart}), right = n - 1 (${arr.length - 1})`,
        reverseRange: [reverseStart, arr.length - 1],
        pivot,
        left,
        right,
        phase: "reverse-init",
        codeLine: 25,
      });

      // While loop with detailed steps 27-32
      while (left < right) {
        // Line 27: while condition check
        steps.push({
          array: [...arr],
          description: `Check while(left < right): ${left} < ${right} → true`,
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          phase: "reverse-check",
          codeLine: 26,
        });

        // Line 28: temp = nums[left]
        const tempValue = arr[left];
        steps.push({
          array: [...arr],
          description: `int temp = arr[${left}] (${tempValue})`,
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          temp: { value: tempValue, index: left },
          phase: "reverse-temp",
          codeLine: 27,
        });

        // Line 29: nums[left] = nums[right]
        const rightValBefore = arr[right];
        arr[left] = rightValBefore;
        steps.push({
          array: [...arr],
          description: `arr[${left}] = arr[${right}] (${rightValBefore})`,
          swapped: [left, right],
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          temp: { value: tempValue, index: left },
          phase: "reverse-assign-left",
          codeLine: 28,
        });

        // Line 30: nums[right] = temp
        arr[right] = tempValue;
        steps.push({
          array: [...arr],
          description: `arr[${right}] = temp (${tempValue})`,
          swapped: [left, right],
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          temp: { value: tempValue, index: left },
          phase: "reverse-assign-right",
          codeLine: 29,
        });

        // Line 31: left++
        left++;
        steps.push({
          array: [...arr],
          description: `left++ → ${left}`,
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          phase: "reverse-left-inc",
          codeLine: 30,
        });

        // Line 32: right--
        right--;
        steps.push({
          array: [...arr],
          description: `right-- → ${right}`,
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          phase: "reverse-right-dec",
          codeLine: 31,
        });
      }
    } else {
      // Generic visualization for other languages
      steps.push({
        array: [...arr],
        description: `Reverse the suffix starting from index ${reverseStart} to end of array`,
        reverseRange: [reverseStart, arr.length - 1],
        pivot,
        phase: "reverse-start",
        codeLine: 23,
      });

      while (left < right) {
        steps.push({
          array: [...arr],
          description: `Reversing suffix: swap arr[${left}] (${arr[left]}) with arr[${right}] (${arr[right]})`,
          comparing: [left, right],
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          phase: "reversing",
          codeLine: 23,
        });

        [arr[left], arr[right]] = [arr[right], arr[left]];

        steps.push({
          array: [...arr],
          description: `Swapped: arr[${left}] = ${arr[left]}, arr[${right}] = ${arr[right]}`,
          swapped: [left, right],
          reverseRange: [reverseStart, arr.length - 1],
          pivot,
          left,
          right,
          phase: "reversed-pair",
          codeLine: 23,
        });

        left++;
        right--;
      }
    }

    // Line 24: Return
    steps.push({
      array: [...arr],
      description: "Return - Complete! This is the next lexicographically greater permutation",
      phase: "completed",
      codeLine: 33,
    });

    return steps;
  },
  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function nextPermutation(nums) {", //1
        "  const n = nums.length;", // 2
        "  let ind = -1;", // 3
        "  ", // 4
        "  for (let i = n - 2; i >= 0; i--) {", // 5
        "    if (nums[i] < nums[i + 1]) {", // 6
        "      ind = i;", // 7
        "      break;", // 8
        "    }", // 9
        "  }", // 10
        "  ", // 11
        "  if (ind === -1) {", // 12
        "    nums.reverse();", // 13
        "    return;", // 14
        "  }", // 15
        "  ", // 16
        "  for (let i = n - 1; i > ind; i--) {", // 17
        "    if (nums[i] > nums[ind]) {", // 18
        "      [nums[ind], nums[i]] = [nums[i], nums[ind]];", // 19
        "      break;", // 20
        "    }", // 21
        "  }", // 22
        "  ", // 23
        "  nums.splice(ind + 1, n - ind - 1, ...nums.slice(ind + 1).reverse());", // 24
        "  return", //25
        "", // 26
       
      ],

      python: [
        "def next_permutation(nums):", // 1
        "    n = len(nums)", // 2
        "    ind = -1", // 3
        "    ", // 4
        "    for i in range(n - 2, -1, -1):", // 5
        "        if nums[i] < nums[i + 1]:", // 6
        "            ind = i", // 7
        "            break", // 8
        "    ", // 9
        "", // 10
        "  ", // 11
        "    if ind == -1:", // 12
        "        nums.reverse()", // 13
        "        return", // 14
        "    ", // 15
        "  ", // 16
        "    for i in range(n - 1, ind, -1):", // 17
        "        if nums[i] > nums[ind]:", // 18
        "            nums[ind], nums[i] = nums[i], nums[ind]", // 19
        "            break", // 20
        "    ", // 21
        "    ", // 22
        "    ", // 23
        "    nums[ind + 1:] = reversed(nums[ind + 1:])", // 24
        "", // 25
      ],

      java: [
        "public static void nextPermutation(int[] nums) {", // 1
        "    int n = nums.length;", // 2
        "    int ind = -1;", // 3
        "    ", // 4
        "    for (int i = n - 2; i >= 0; i--) {", // 5
        "        if (nums[i] < nums[i + 1]) {", // 6
        "            ind = i;", // 7
        "            break;", // 8
        "        }", // 9
        "    }", // 10
        "    ",// 11
        "    if (ind == -1) {", // 12
        "        reverse(nums, 0, n - 1);", // 13
        "        return;", // 14
        "    }", // 15
        "    ", // 16
        "    for (int i = n - 1; i > ind; i--) {", // 17
        "        if (nums[i] > nums[ind]) {", // 18
        "           int temp = nums[i];", //19
        "           nums[i] = nums[ind];", // 20
        "           nums[ind] = temp;", // 21
        "           break;", // 22
        "        }", // 23
        "    }", // 24
        "    ", // 25
        "    int left = ind + 1, right = n - 1;", // 26
        "    while(left < right) {", // 27
        "        int temp = nums[left];", // 28
        "        nums[left] = nums[right];", // 29
        "        nums[right] = temp;", // 30
        "        left++;", // 31
        "        right--;", // 32
        "    }", // 33
        "    return", // 34
        "}", // 35
      ],

      csharp: [
         "void nextPermutation(vector<int>& nums) {", // 1
        "    int n = nums.size();", // 2
        "    int ind = -1;", // 3
        "    ", // 4
        "    for (int i = n - 2; i >= 0; i--) {", // 5
        "        if (nums[i] < nums[i + 1]) {", // 6
        "            ind = i;", // 7
        "            break;", // 8
        "        }",// 9
        "    }", // 10
        "    ", // 11
        "    if (ind == -1) {", // 12
        "        reverse(nums.begin(), nums.end());", // 13
        "        return;", // 14
        "    }", // 15
        "    ", // 16
        "    for (int i = n - 1; i > ind; i--) {", // 17
        "        if (nums[i] > nums[ind]) {", // 18
        "           int temp = nums[i];", //19
        "           nums[i] = nums[ind];", // 20
        "           nums[ind] = temp;", // 21
        "           break;", // 22
        "        }", // 23
        "    }", // 24
        "    ", // 25
        "    int left = ind + 1, right = n - 1;", // 26
        "    while(left < right) {", // 27
        "        int temp = nums[left];", // 28
        "        nums[left] = nums[right];", // 29
        "        nums[right] = temp;", // 30
        "        left++;", // 31
        "        right--;", // 32
        "    }", // 33
        "    return", // 34
        "}", // 35
      ],

      cpp: [
        "void nextPermutation(vector<int>& nums) {", // 1
        "    int n = nums.size();", // 2
        "    int ind = -1;", // 3
        "    ", // 4
        "    for (int i = n - 2; i >= 0; i--) {", // 5
        "        if (nums[i] < nums[i + 1]) {", // 6
        "            ind = i;", // 7
        "            break;", // 8
        "        }",// 9
        "    }", // 10
        "    ", // 11
        "    if (ind == -1) {", // 12
        "        reverse(nums.begin(), nums.end());", // 13
        "        return;", // 14
        "    }", // 15
        "    ", // 16
        "    for (int i = n - 1; i > ind; i--) {", // 17
        "        if (nums[i] > nums[ind]) {", // 18
        "            swap(nums[ind], nums[i]);", //19
        "            break;", // 20
        "        }", // 21
        "    }", // 22
        "    ", // 23
        "    reverse(nums.begin() + ind + 1, nums.end());", // 24
        "    return", // 25
        "}", // 26
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};
export default nextPermutation;
