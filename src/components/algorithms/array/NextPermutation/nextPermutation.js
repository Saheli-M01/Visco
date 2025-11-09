// Next Permutation Algorithm Implementation

export const nextPermutation = {
  name: "Next Permutation",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];

    // Step 1: Function entry
    steps.push({
      array: [...snapshot],
      description: "Start: Find the next lexicographically greater permutation",
      phase: "start",
      codeLine: 0,
    });

    // Step 2: Find pivot (rightmost ascending pair)
    steps.push({
      array: [...snapshot],
      description: "Step 1: Find the largest index i where arr[i] < arr[i + 1]",
      phase: "find-pivot-start",
      codeLine: 1,
    });

    let pivot = -1;
    for (let i = arr.length - 2; i >= 0; i--) {
      steps.push({
        array: [...arr],
        description: `Checking position ${i}: arr[${i}] = ${arr[i]}, arr[${
          i + 1
        }] = ${arr[i + 1]}`,
        comparing: [i, i + 1],
        pivot: -1,
        phase: "finding-pivot",
        codeLine: 2,
      });

      if (arr[i] < arr[i + 1]) {
        pivot = i;
        steps.push({
          array: [...arr],
          description: `Found pivot at index ${pivot}: arr[${pivot}] = ${
            arr[pivot]
          } < arr[${pivot + 1}] = ${arr[pivot + 1]}`,
          comparing: [pivot, pivot + 1],
          pivot,
          phase: "pivot-found",
          codeLine: 3,
        });
        break;
      }
    }

    // If no pivot found, array is in descending order (largest permutation)
    if (pivot === -1) {
      steps.push({
        array: [...arr],
        description:
          "No pivot found - array is in descending order (largest permutation)",
        pivot: -1,
        phase: "no-pivot",
        codeLine: 4,
      });

      // Reverse entire array to get smallest permutation
      arr.reverse();
      steps.push({
        array: [...arr],
        description: "Reverse entire array to get the smallest permutation",
        phase: "reverse-all",
        codeLine: 5,
      });

      steps.push({
        array: [...arr],
        description: "Complete! This is the smallest (first) permutation",
        phase: "completed",
        codeLine: 6,
      });

      return steps;
    }

    // Step 3: Find successor (rightmost element greater than pivot)
    steps.push({
      array: [...arr],
      description: "Step 2: Find the largest index j where arr[j] > arr[pivot]",
      pivot,
      phase: "find-successor-start",
      codeLine: 7,
    });

    let successor = -1;
    for (let j = arr.length - 1; j > pivot; j--) {
      steps.push({
        array: [...arr],
        description: `Checking position ${j}: arr[${j}] = ${arr[j]} vs arr[pivot(${pivot})] = ${arr[pivot]}`,
        comparing: [pivot, j],
        pivot,
        successor: -1,
        phase: "finding-successor",
        codeLine: 8,
      });

      if (arr[j] > arr[pivot]) {
        successor = j;
        steps.push({
          array: [...arr],
          description: `Found successor at index ${successor}: arr[${successor}] = ${arr[successor]} > arr[${pivot}] = ${arr[pivot]}`,
          comparing: [pivot, successor],
          pivot,
          successor,
          phase: "successor-found",
          codeLine: 9,
        });
        break;
      }
    }

    // Step 4: Swap pivot and successor
    steps.push({
      array: [...arr],
      description: `Step 3: Swap arr[${pivot}] and arr[${successor}]`,
      comparing: [pivot, successor],
      pivot,
      successor,
      phase: "before-swap",
      codeLine: 10,
    });

    [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];

    steps.push({
      array: [...arr],
      description: `Swapped: arr[${pivot}] = ${arr[pivot]}, arr[${successor}] = ${arr[successor]}`,
      swapped: [pivot, successor],
      pivot,
      successor,
      phase: "after-swap",
      codeLine: 11,
    });

    // Step 5: Reverse suffix after pivot
    const reverseStart = pivot + 1;
    steps.push({
      array: [...arr],
      description: `Step 4: Reverse the suffix starting from index ${reverseStart}`,
      reverseRange: [reverseStart, arr.length - 1],
      pivot,
      phase: "reverse-start",
      codeLine: 12,
    });

    let left = reverseStart;
    let right = arr.length - 1;

    while (left < right) {
      steps.push({
        array: [...arr],
        description: `Reversing: swap arr[${left}] and arr[${right}]`,
        comparing: [left, right],
        reverseRange: [reverseStart, arr.length - 1],
        pivot,
        phase: "reversing",
        codeLine: 13,
      });

      [arr[left], arr[right]] = [arr[right], arr[left]];

      steps.push({
        array: [...arr],
        description: `Swapped: arr[${left}] = ${arr[left]}, arr[${right}] = ${arr[right]}`,
        swapped: [left, right],
        reverseRange: [reverseStart, arr.length - 1],
        pivot,
        phase: "reversed-pair",
        codeLine: 14,
      });

      left++;
      right--;
    }

    // Final step
    steps.push({
      array: [...arr],
      description:
        "Complete! This is the next lexicographically greater permutation",
      phase: "completed",
      codeLine: 15,
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
        "  const left = nums.slice(0, ind + 1);", // 24
        "  const right = nums.slice(ind + 1).reverse();", // 25
        "  nums.splice(0, n, ...left, ...right);", // 26
        "}", // 27
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
        "    nums[ind + 1:] = reversed(nums[ind + 1:])",
      ],

      java: [
        "public static void nextPermutation(int[] nums) {",
        "    int n = nums.length;",
        "    int ind = -1;",
        "    ",
        "    for (int i = n - 2; i >= 0; i--) {",
        "        if (nums[i] < nums[i + 1]) {",
        "            ind = i;",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    if (ind == -1) {",
        "        reverse(nums, 0, n - 1);",
        "        return;",
        "    }",
        "    ",
        "    for (int i = n - 1; i > ind; i--) {",
        "        if (nums[i] > nums[ind]) {",
        "            swap(nums, ind, i);",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    reverse(nums, ind + 1, n - 1);",
        "}",
        "",
        "private static void swap(int[] arr, int i, int j) {",
        "    int temp = arr[i];",
        "    arr[i] = arr[j];",
        "    arr[j] = temp;",
        "}",
        "",
        "private static void reverse(int[] arr, int start, int end) {",
        "    while (start < end) {",
        "        swap(arr, start++, end--);",
        "    }",
        "}",
      ],

      csharp: [
        "public static void NextPermutation(int[] nums) {",
        "    int n = nums.Length;",
        "    int ind = -1;",
        "    ",
        "    for (int i = n - 2; i >= 0; i--) {",
        "        if (nums[i] < nums[i + 1]) {",
        "            ind = i;",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    if (ind == -1) {",
        "        Array.Reverse(nums);",
        "        return;",
        "    }",
        "    ",
        "    for (int i = n - 1; i > ind; i--) {",
        "        if (nums[i] > nums[ind]) {",
        "            int temp = nums[ind];",
        "            nums[ind] = nums[i];",
        "            nums[i] = temp;",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    Array.Reverse(nums, ind + 1, n - ind - 1);",
        "}",
      ],

      cpp: [
        "void nextPermutation(vector<int>& nums) {",
        "    int n = nums.size();",
        "    int ind = -1;",
        "    ",
        "    for (int i = n - 2; i >= 0; i--) {",
        "        if (nums[i] < nums[i + 1]) {",
        "            ind = i;",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    if (ind == -1) {",
        "        reverse(nums.begin(), nums.end());",
        "        return;",
        "    }",
        "    ",
        "    for (int i = n - 1; i > ind; i--) {",
        "        if (nums[i] > nums[ind]) {",
        "            swap(nums[ind], nums[i]);",
        "            break;",
        "        }",
        "    }",
        "    ",
        "    reverse(nums.begin() + ind + 1, nums.end());",
        "}",
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};
export default nextPermutation;
