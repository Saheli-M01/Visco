// Copyright (c) 2026 Saheli Mondal.

// Sliding Window Algorithm Implementation (Container With Most Water)

export const slidingWindow = {
  name: "Sliding Window / 2 pointers (Container With Most Water)",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];

    // Line 0: Function entry
    steps.push({
      array: snapshot,
      description: "Enter maxArea function - finding container with most water",
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Initialize maxArea
    let maxArea = 0;
    steps.push({
      array: snapshot,
      description: `Initialize maxArea = ${maxArea}`,
      maxArea,
      phase: "maxArea-init",
      codeLine: 1,
    });

    // Line 1: Initialize left and right pointers
    let left = 0;
    let right = arr.length - 1;
    steps.push({
      array: snapshot,
      description: `Initialize pointers: left = ${left}, right = ${right}`,
      maxArea,
      left,
      right,
      phase: "left-right-init",
      codeLine: 2,
    });

    // Line 2: Start while loop
    steps.push({
      array: snapshot,
      description: `Start while loop: check if left < right (${left} < ${right})`,
      maxArea,
      left,
      right,
      phase: "loop-start",
      codeLine: 3,
    });

    while (left < right) {
      // Calculate current area
      const width = right - left;
      const height = Math.min(arr[left], arr[right]);
      const currentArea = width * height;

      // Line 3: Calculate current area
      steps.push({
        array: snapshot,
        description: `Calculate width = ${width}`,
        maxArea,
        left,
        right,
        width,
        comparing: [],
        phase: "width-init",
        codeLine: 4,
      });
      steps.push({
        array: snapshot,
        description: `Calculate height = min(${arr[left]}`,
        maxArea,
        left,
        right,
        height,
        comparing: [],
        phase: "h-init",
        codeLine: 5,
      });
      steps.push({
        array: snapshot,
        description: `Calculate area: ${width} * ${height} = ${currentArea}`,
        maxArea,
        left,
        right,
        currentArea,
        comparing: [],
        phase: "area-init",
        codeLine: 6,
      });
      
    
      
      // Line 4: Update maxArea if needed
      if (currentArea > maxArea) {
        
        maxArea = currentArea;
        steps.push({
          array: snapshot,
          description: `New maximum found! Update maxArea from ${currentArea} to ${maxArea}`,
          maxArea,
          left,
          right,
          currentArea,
          phase: "update-max",
          codeLine: 7,
        });
      } else {
        steps.push({
          array: snapshot,
          description: `Current area ${currentArea} ≤ maxArea ${maxArea}, no update`,
          maxArea,
          left,
          right,
          currentArea,
          phase: "no-update",
          codeLine: 7,
        });
      }
      steps.push({
        array: snapshot,
        description: `arr[${left}] = (${arr[left]}) < arr[${right}] = (${arr[right]})`,
        maxArea,
        left,
        right,
        comparing: [],
        phase: "if-check",
        codeLine: 8,
      });
      // Line 5: Move pointer - choose smaller height
      if (arr[left] < arr[right]) {
        left++;
        steps.push({
          array: snapshot,
          description: `Move left pointer`,
          maxArea,
          left,
          right,
          comparing: [],
          phase: "move-left",
          codeLine: 9,
        });
        
      } else {
        steps.push({
          array: snapshot,
          description: `If fails, else will be executed`,
          maxArea,
          left,
          right,
          comparing: [],
          phase: "move-right",
          codeLine: 10,
        });
        right--;
        steps.push({
          array: snapshot,
          description: `Move right pointer`,
          maxArea,
          left,
          right,
          comparing: [],
          phase: "move-right",
          codeLine: 11,
        });
        
      }

      // Show pointer after move
      steps.push({
        array: snapshot,
        description: `Pointers updated: left = ${left}, right = ${right}`,
        maxArea,
        left,
        right,
        phase: "pointers-updated",
        codeLine:12,
      });

      // Check loop condition
      if (left < right) {
        steps.push({
          array: snapshot,
          description: `Continue loop: left < right (${left} < ${right})`,
          maxArea,
          left,
          right,
          phase: "loop-continue",
          codeLine: 3,
        });
      }
    }
steps.push({
      array: snapshot,
      description: `Loop ended.`,
      phase: "while-ends",
      codeLine: 13,
    });
    // Line 14: Return result
    steps.push({
      array: snapshot,
      description: `Return maxArea = ${maxArea}`,
      phase: "completed",
      codeLine: 14,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function maxArea(height) {", // 0
        "  let maxArea = 0;", //1 
        "  left = 0, right = height.length - 1;", // 2
        "  while (left < right) {", // 3
        "  const width = right - left;", //4
        "  const h = Math.min(height[left], height[right]);",//5
        "  const area = width * h;", // 6
        "  maxArea = Math.max(maxArea, area);", // 7
        "    if (height[left] < height[right]) {", // 8
        "       left++;", // 9
        "    } else{", // 10
        "       right--;", // 11  
        "    }", // 12
        "  }", // 13
        " return maxArea;", // 14
        "}", // 15
      ],

      python: [
        "def maxArea(height):", // 0
        "    maxArea = 0", // 1
        "    left, right = 0, len(height) - 1", // 2
        "    while left < right:", // 3
        "        width = right - left", // 4
        "        h = min(height[left], height[right])", // 5
        "        area = width * h", // 6
        "        maxArea = max(maxArea, area)", // 7
        "        if height[left] < height[right]:", // 8
        "            left += 1", // 9
        "        else:", // 10
        "            right -= 1", // 11
        "", // 12
        "", // 13
        "    return maxArea", // 14
      ],

      java: [
        "public int maxArea(int[] height) {", // 0
        "    int maxArea = 0;", // 1
        "    int left = 0, right = height.length - 1;", // 2
        "    while (left < right) {", // 3
        "        int width = right - left;", // 4
        "        int h = Math.min(height[left], height[right]);", // 5
        "        int area = width * h;", // 6
        "        maxArea = Math.max(maxArea, area);", // 7
        "        if (height[left] < height[right]) {", // 8
        "            left++;", // 9
        "        } else {", // 10
        "            right--;", // 11
        "        }", // 12
        "    }", // 13
        "    return maxArea;", // 14
        "}", // 15
      ],

      csharp: [
        "public int MaxArea(int[] height) {", // 0
        "    int maxArea = 0;", // 1
        "    int left = 0, right = height.Length - 1;", // 2
        "    while (left < right) {", // 3
        "        int width = right - left;", // 4
        "        int h = Math.Min(height[left], height[right]);", // 5
        "        int area = width * h;", // 6
        "        maxArea = Math.Max(maxArea, area);", // 7
        "        if (height[left] < height[right]) {", // 8
        "            left++;", // 9
        "        } else {", // 10
        "            right--;", // 11
        "        }", // 12
        "    }", // 13
        "    return maxArea;", // 14
        "}", // 15
      ],

      cpp: [
        "int maxArea(vector<int>& height) {", // 0
        "    int maxArea = 0;", // 1
        "    int left = 0, right = height.size() - 1;", // 2
        "    while (left < right) {", // 3
        "        int width = right - left;", // 4
        "        int h = min(height[left], height[right]);", // 5
        "        int area = width * h;", // 6
        "        maxArea = max(maxArea, area);", // 7
        "        if (height[left] < height[right]) {", // 8
        "            left++;", // 9
        "        } else {", // 10
        "            right--;", // 11
        "        }", // 12
        "    }", // 13
        "    return maxArea;", // 14
        "}", // 15
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};

export default slidingWindow;
