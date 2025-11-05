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
        description: `Checking position ${i}: arr[${i}] = ${arr[i]}, arr[${i + 1}] = ${arr[i + 1]}`,
        comparing: [i, i + 1],
        pivot: -1,
        phase: "finding-pivot",
        codeLine: 2,
      });

      if (arr[i] < arr[i + 1]) {
        pivot = i;
        steps.push({
          array: [...arr],
          description: `Found pivot at index ${pivot}: arr[${pivot}] = ${arr[pivot]} < arr[${pivot + 1}] = ${arr[pivot + 1]}`,
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
        description: "No pivot found - array is in descending order (largest permutation)",
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
      description: "Complete! This is the next lexicographically greater permutation",
      phase: "completed",
      codeLine: 15,
    });

    return steps;
  },

  getCode: (language = "javascript") => {
    const codes = {
      javascript: `function nextPermutation(nums) {
  // Find the largest index i such that nums[i] < nums[i + 1]
  let pivot = -1;
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] < nums[i + 1]) {
      pivot = i;
      break;
    }
  }
  
  // If no such index exists, reverse the entire array
  if (pivot === -1) {
    nums.reverse();
    return;
  }
  
  // Find the largest index j such that nums[j] > nums[pivot]
  let successor = -1;
  for (let j = nums.length - 1; j > pivot; j--) {
    if (nums[j] > nums[pivot]) {
      successor = j;
      break;
    }
  }
  
  // Swap nums[pivot] and nums[successor]
  [nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];
  
  // Reverse the suffix starting at pivot + 1
  let left = pivot + 1;
  let right = nums.length - 1;
  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
}`,

      python: `def next_permutation(nums):
    # Find the largest index i such that nums[i] < nums[i + 1]
    pivot = -1
    for i in range(len(nums) - 2, -1, -1):
        if nums[i] < nums[i + 1]:
            pivot = i
            break
    
    # If no such index exists, reverse the entire array
    if pivot == -1:
        nums.reverse()
        return
    
    # Find the largest index j such that nums[j] > nums[pivot]
    successor = -1
    for j in range(len(nums) - 1, pivot, -1):
        if nums[j] > nums[pivot]:
            successor = j
            break
    
    # Swap nums[pivot] and nums[successor]
    nums[pivot], nums[successor] = nums[successor], nums[pivot]
    
    # Reverse the suffix starting at pivot + 1
    left = pivot + 1
    right = len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1`,

      java: `public void nextPermutation(int[] nums) {
    // Find the largest index i such that nums[i] < nums[i + 1]
    int pivot = -1;
    for (int i = nums.length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    // If no such index exists, reverse the entire array
    if (pivot == -1) {
        reverse(nums, 0, nums.length - 1);
        return;
    }
    
    // Find the largest index j such that nums[j] > nums[pivot]
    int successor = -1;
    for (int j = nums.length - 1; j > pivot; j--) {
        if (nums[j] > nums[pivot]) {
            successor = j;
            break;
        }
    }
    
    // Swap nums[pivot] and nums[successor]
    swap(nums, pivot, successor);
    
    // Reverse the suffix starting at pivot + 1
    reverse(nums, pivot + 1, nums.length - 1);
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}

private void reverse(int[] nums, int left, int right) {
    while (left < right) {
        swap(nums, left, right);
        left++;
        right--;
    }
}`,

      cpp: `void nextPermutation(vector<int>& nums) {
    // Find the largest index i such that nums[i] < nums[i + 1]
    int pivot = -1;
    for (int i = nums.size() - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    // If no such index exists, reverse the entire array
    if (pivot == -1) {
        reverse(nums.begin(), nums.end());
        return;
    }
    
    // Find the largest index j such that nums[j] > nums[pivot]
    int successor = -1;
    for (int j = nums.size() - 1; j > pivot; j--) {
        if (nums[j] > nums[pivot]) {
            successor = j;
            break;
        }
    }
    
    // Swap nums[pivot] and nums[successor]
    swap(nums[pivot], nums[successor]);
    
    // Reverse the suffix starting at pivot + 1
    reverse(nums.begin() + pivot + 1, nums.end());
}`,

      "c#": `public void NextPermutation(int[] nums) {
    // Find the largest index i such that nums[i] < nums[i + 1]
    int pivot = -1;
    for (int i = nums.Length - 2; i >= 0; i--) {
        if (nums[i] < nums[i + 1]) {
            pivot = i;
            break;
        }
    }
    
    // If no such index exists, reverse the entire array
    if (pivot == -1) {
        Array.Reverse(nums);
        return;
    }
    
    // Find the largest index j such that nums[j] > nums[pivot]
    int successor = -1;
    for (int j = nums.Length - 1; j > pivot; j--) {
        if (nums[j] > nums[pivot]) {
            successor = j;
            break;
        }
    }
    
    // Swap nums[pivot] and nums[successor]
    (nums[pivot], nums[successor]) = (nums[successor], nums[pivot]);
    
    // Reverse the suffix starting at pivot + 1
    Array.Reverse(nums, pivot + 1, nums.Length - pivot - 1);
}`,
    };

    return codes[language] || codes.javascript;
  },
};
