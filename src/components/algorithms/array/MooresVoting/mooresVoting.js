// Moore's Voting Algorithm Implementation
// Find all elements appearing more than n/3 times

export const mooresVoting = {
  name: "Moore's Voting Algorithm",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];
    const n = arr.length;
    const threshold = Math.floor(n / 3);

    // Line 0: Function entry
    steps.push({
      array: snapshot,
      description: "Enter majorityElement function - finding elements appearing more than n/3 times",
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Initialize candidates and counts
    let candidate1 = null;
    let candidate2 = null;
    let count1 = 0;
    let count2 = 0;

    steps.push({
      array: snapshot,
      description: `Initialize: n = ${n}, threshold = n/3 = ${threshold}`,
      n,
      threshold,
      phase: "init-threshold",
      codeLine: 1,
    });

    steps.push({
      array: snapshot,
      description: `Initialize candidates: candidate1 = null, candidate2 = null`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      phase: "init-candidates",
      codeLine: 2,
    });

    steps.push({
      array: snapshot,
      description: `Initialize counts: count1 = ${count1}, count2 = ${count2}`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      phase: "init-counts",
      codeLine: 3,
    });

    // First pass: Find potential candidates
    steps.push({
      array: snapshot,
      description: "Start first pass: finding potential candidates",
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      phase: "first-pass-start",
      codeLine: 4,
    });

    for (let i = 0; i < n; i++) {
      const num = arr[i];

      steps.push({
        array: snapshot,
        description: `Examining element at index ${i}: ${num}`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        comparing: [i],
        phase: "examining",
        codeLine: 5,
      });

      // Check if num matches candidate1
      if (candidate1 === num) {
        count1++;
        steps.push({
          array: snapshot,
          description: `${num} matches candidate1 (${candidate1}). Increment count1 to ${count1}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "increment-count1",
          codeLine: 6,
        });
      }
      // Check if num matches candidate2
      else if (candidate2 === num) {
        count2++;
        steps.push({
          array: snapshot,
          description: `${num} matches candidate2 (${candidate2}). Increment count2 to ${count2}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "increment-count2",
          codeLine: 7,
        });
      }
      // Assign to candidate1 if count1 is 0
      else if (count1 === 0) {
        candidate1 = num;
        count1 = 1;
        steps.push({
          array: snapshot,
          description: `count1 is 0. Set candidate1 = ${candidate1}, count1 = ${count1}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "assign-candidate1",
          codeLine: 8,
        });
      }
      // Assign to candidate2 if count2 is 0
      else if (count2 === 0) {
        candidate2 = num;
        count2 = 1;
        steps.push({
          array: snapshot,
          description: `count2 is 0. Set candidate2 = ${candidate2}, count2 = ${count2}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "assign-candidate2",
          codeLine: 9,
        });
      }
      // Decrement both counts
      else {
        count1--;
        count2--;
        steps.push({
          array: snapshot,
          description: `${num} doesn't match any candidate. Decrement both: count1 = ${count1}, count2 = ${count2}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "decrement-both",
          codeLine: 10,
        });
      }
    }

    steps.push({
      array: snapshot,
      description: `First pass complete. Potential candidates: ${candidate1}, ${candidate2}`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      phase: "first-pass-end",
      codeLine: 11,
    });

    // Second pass: Verify candidates
    steps.push({
      array: snapshot,
      description: "Start second pass: verifying candidates by counting their occurrences",
      candidate1,
      candidate2,
      n,
      threshold,
      phase: "second-pass-start",
      codeLine: 12,
    });

    let actualCount1 = 0;
    let actualCount2 = 0;

    for (let i = 0; i < n; i++) {
      if (arr[i] === candidate1) {
        actualCount1++;
      }
      if (arr[i] === candidate2) {
        actualCount2++;
      }
    }

    steps.push({
      array: snapshot,
      description: `Count verification: candidate1 (${candidate1}) appears ${actualCount1} times, candidate2 (${candidate2}) appears ${actualCount2} times`,
      candidate1,
      candidate2,
      actualCount1,
      actualCount2,
      n,
      threshold,
      phase: "count-verification",
      codeLine: 13,
    });

    const result = [];
    if (actualCount1 > threshold) {
      result.push(candidate1);
      steps.push({
        array: snapshot,
        description: `${candidate1} appears ${actualCount1} times > ${threshold}. Add to result.`,
        candidate1,
        actualCount1,
        n,
        threshold,
        result: [...result],
        phase: "add-result1",
        codeLine: 14,
      });
    }

    if (actualCount2 > threshold && candidate2 !== candidate1) {
      result.push(candidate2);
      steps.push({
        array: snapshot,
        description: `${candidate2} appears ${actualCount2} times > ${threshold}. Add to result.`,
        candidate2,
        actualCount2,
        n,
        threshold,
        result: [...result],
        phase: "add-result2",
        codeLine: 15,
      });
    }

    steps.push({
      array: snapshot,
      description: `Algorithm complete. Elements appearing more than n/3 times: [${result.join(", ")}]`,
      result,
      n,
      threshold,
      phase: "completed",
      codeLine: 16,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function majorityElement(nums) {", // 0
        "  const n = nums.length;", // 1
        "  let candidate1 = null, candidate2 = null;", // 2
        "  let count1 = 0, count2 = 0;", // 3
        "  // First pass: Find potential candidates", // 4
        "  for (let num of nums) {", // 5
        "    if (candidate1 === num) count1++;", // 6
        "    else if (candidate2 === num) count2++;", // 7
        "    else if (count1 === 0) { candidate1 = num; count1 = 1; }", // 8
        "    else if (count2 === 0) { candidate2 = num; count2 = 1; }", // 9
        "    else { count1--; count2--; }", // 10
        "  }", // 11
        "  // Second pass: Verify candidates", // 12
        "  count1 = count2 = 0;", // 13
        "  for (let num of nums) {", // 14
        "    if (num === candidate1) count1++;", // 15
        "    if (num === candidate2) count2++;", // 16
        "  }", // 17
        "  const result = [];", // 18
        "  if (count1 > n / 3) result.push(candidate1);", // 19
        "  if (count2 > n / 3 && candidate2 !== candidate1) result.push(candidate2);", // 20
        "  return result;", // 21
        "}", // 22
      ],

      python: [
        "def majorityElement(nums):", // 0
        "    n = len(nums)", // 1
        "    candidate1, candidate2 = None, None", // 2
        "    count1, count2 = 0, 0", // 3
        "    # First pass: Find potential candidates", // 4
        "    for num in nums:", // 5
        "        if candidate1 == num:", // 6
        "            count1 += 1", // 7
        "        elif candidate2 == num:", // 8
        "            count2 += 1", // 9
        "        elif count1 == 0:", // 10
        "            candidate1, count1 = num, 1", // 11
        "        elif count2 == 0:", // 12
        "            candidate2, count2 = num, 1", // 13
        "        else:", // 14
        "            count1 -= 1", // 15
        "            count2 -= 1", // 16
        "    # Second pass: Verify candidates", // 17
        "    count1 = count2 = 0", // 18
        "    for num in nums:", // 19
        "        if num == candidate1:", // 20
        "            count1 += 1", // 21
        "        if num == candidate2:", // 22
        "            count2 += 1", // 23
        "    result = []", // 24
        "    if count1 > n // 3:", // 25
        "        result.append(candidate1)", // 26
        "    if count2 > n // 3 and candidate2 != candidate1:", // 27
        "        result.append(candidate2)", // 28
        "    return result", // 29
      ],

      java: [
        "public List<Integer> majorityElement(int[] nums) {", // 0
        "    int n = nums.length;", // 1
        "    Integer candidate1 = null, candidate2 = null;", // 2
        "    int count1 = 0, count2 = 0;", // 3
        "    // First pass: Find potential candidates", // 4
        "    for (int num : nums) {", // 5
        "        if (candidate1 != null && candidate1 == num) {", // 6
        "            count1++;", // 7
        "        } else if (candidate2 != null && candidate2 == num) {", // 8
        "            count2++;", // 9
        "        } else if (count1 == 0) {", // 10
        "            candidate1 = num; count1 = 1;", // 11
        "        } else if (count2 == 0) {", // 12
        "            candidate2 = num; count2 = 1;", // 13
        "        } else {", // 14
        "            count1--; count2--;", // 15
        "        }", // 16
        "    }", // 17
        "    // Second pass: Verify candidates", // 18
        "    count1 = count2 = 0;", // 19
        "    for (int num : nums) {", // 20
        "        if (candidate1 != null && num == candidate1) count1++;", // 21
        "        if (candidate2 != null && num == candidate2) count2++;", // 22
        "    }", // 23
        "    List<Integer> result = new ArrayList<>();", // 24
        "    if (count1 > n / 3) result.add(candidate1);", // 25
        "    if (count2 > n / 3 && !candidate2.equals(candidate1)) result.add(candidate2);", // 26
        "    return result;", // 27
        "}", // 28
      ],

      csharp: [
        "public IList<int> MajorityElement(int[] nums) {", // 0
        "    int n = nums.Length;", // 1
        "    int? candidate1 = null, candidate2 = null;", // 2
        "    int count1 = 0, count2 = 0;", // 3
        "    // First pass: Find potential candidates", // 4
        "    foreach (int num in nums) {", // 5
        "        if (candidate1 == num) {", // 6
        "            count1++;", // 7
        "        } else if (candidate2 == num) {", // 8
        "            count2++;", // 9
        "        } else if (count1 == 0) {", // 10
        "            candidate1 = num; count1 = 1;", // 11
        "        } else if (count2 == 0) {", // 12
        "            candidate2 = num; count2 = 1;", // 13
        "        } else {", // 14
        "            count1--; count2--;", // 15
        "        }", // 16
        "    }", // 17
        "    // Second pass: Verify candidates", // 18
        "    count1 = count2 = 0;", // 19
        "    foreach (int num in nums) {", // 20
        "        if (num == candidate1) count1++;", // 21
        "        if (num == candidate2) count2++;", // 22
        "    }", // 23
        "    IList<int> result = new List<int>();", // 24
        "    if (count1 > n / 3) result.Add(candidate1.Value);", // 25
        "    if (count2 > n / 3 && candidate2 != candidate1) result.Add(candidate2.Value);", // 26
        "    return result;", // 27
        "}", // 28
      ],

      cpp: [
        "vector<int> majorityElement(vector<int>& nums) {", // 0
        "    int n = nums.size();", // 1
        "    int candidate1 = 0, candidate2 = 0;", // 2
        "    int count1 = 0, count2 = 0;", // 3
        "    // First pass: Find potential candidates", // 4
        "    for (int num : nums) {", // 5
        "        if (count1 > 0 && candidate1 == num) {", // 6
        "            count1++;", // 7
        "        } else if (count2 > 0 && candidate2 == num) {", // 8
        "            count2++;", // 9
        "        } else if (count1 == 0) {", // 10
        "            candidate1 = num; count1 = 1;", // 11
        "        } else if (count2 == 0) {", // 12
        "            candidate2 = num; count2 = 1;", // 13
        "        } else {", // 14
        "            count1--; count2--;", // 15
        "        }", // 16
        "    }", // 17
        "    // Second pass: Verify candidates", // 18
        "    count1 = count2 = 0;", // 19
        "    for (int num : nums) {", // 20
        "        if (num == candidate1) count1++;", // 21
        "        if (num == candidate2) count2++;", // 22
        "    }", // 23
        "    vector<int> result;", // 24
        "    if (count1 > n / 3) result.push_back(candidate1);", // 25
        "    if (count2 > n / 3 && candidate2 != candidate1) result.push_back(candidate2);", // 26
        "    return result;", // 27
        "}", // 28
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};

export default mooresVoting;
