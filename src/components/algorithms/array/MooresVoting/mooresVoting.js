// Copyright (c) 2026 Saheli Mondal.

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
      description:
        "Enter majorityElement function - finding elements appearing more than n/3 times",
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Initialize candidates and counts

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
      description: `Initialize counts: count1 = ${count1}, count2 = ${count2}`,
      count1,
      count2,
      n,
      threshold,
      phase: "init-counts",
      codeLine: 2,
    });
    let candidate1 = null;
    let candidate2 = null;
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
      codeLine: 3,
    });

    // First pass: Find potential candidates
    steps.push({
      array: snapshot,
      description: "Start first pass: finding potential candidates",
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
      steps.push({
        array: snapshot,
        description: `Check if (candidate1 === num) → if (${candidate1} === ${num})`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        comparing: [],
        phase: "if-check",
        codeLine: 6,
      });
      if (candidate1 === num) {
        // Condition is TRUE
        steps.push({
          array: snapshot,
          description: `✓ Condition TRUE: ${candidate1} === ${num}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "condition-true",
          codeLine: 6,
        });

        count1++;

        steps.push({
          array: snapshot,
          description: `Execute: count1++ → count1 = ${count1}`,
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
          codeLine: 7,
        });
      } else {
        // Condition is FALSE, check next else-if
        steps.push({
          array: snapshot,
          description: `✗ Condition FALSE, check: else if (candidate2 === num) → if (${candidate2} === ${num})`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          comparing: [i],
          phase: "check-candidate2",
          codeLine: 8,
        });

        if (candidate2 === num) {
          count2++;

          steps.push({
            array: snapshot,
            description: `Execute: count2++ → count2 = ${count2}`,
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
            codeLine: 9,
          });
        } else {
          // Condition is FALSE, check next else-if
          steps.push({
            array: snapshot,
            description: `✗ Condition FALSE, check: else if (count1 === 0) → if (${count1} === 0)`,
            candidate1,
            candidate2,
            count1,
            count2,
            n,
            threshold,
            currentIndex: i,
            currentValue: num,
            comparing: [i],
            phase: "check-count1",
            codeLine: 10,
          });

          if (count1 === 0) {
            candidate1 = num;
            count1 = 1;

            steps.push({
              array: snapshot,
              description: `Execute: candidate1 = ${candidate1}, count1 = ${count1}`,
              candidate1,
              candidate2,
              count1,
              count2,
              n,
              threshold,
              currentIndex: i,
              currentValue: num,
              comparing: [i],
              phase: "assign-candidate1-and-count1",
              codeLine: 11,
            });
          } else {
            // Condition is FALSE, check next else-if
            steps.push({
              array: snapshot,
              description: `✗ Condition FALSE, check: else if (count2 === 0) → if (${count2} === 0)`,
              candidate1,
              candidate2,
              count1,
              count2,
              n,
              threshold,
              currentIndex: i,
              currentValue: num,
              comparing: [i],
              phase: "conheck-count2",
              codeLine: 12,
            });

            if (count2 === 0) {
              candidate2 = num;
              count2 = 1;

              steps.push({
                array: snapshot,
                description: `Execute: candidate2 = ${candidate2}, count2 = ${count2}`,
                candidate1,
                candidate2,
                count1,
                count2,
                n,
                threshold,
                currentIndex: i,
                currentValue: num,
                comparing: [i],
                phase: "assign-candidate2-and-count2",
                codeLine: 13,
              });
            } else {
              // All conditions FALSE, execute else block
              steps.push({
                array: snapshot,
                description: `✗ Condition FALSE, execute: count1-- → count1 = ${count1}`,
                candidate1,
                candidate2,
                count1,
                count2,
                n,
                threshold,
                currentIndex: i,
                currentValue: num,
                comparing: [i],
                phase: "else-execute",
                codeLine: 14,
              });

              count1--;
              count2--;
              steps.push({
                array: snapshot,
                description: `Execute: count1-- -> count1 =${count1}, count2-- → count2 = ${count2}`,
                candidate1,
                candidate2,
                count1,
                count2,
                n,
                threshold,
                currentIndex: i,
                currentValue: num,
                comparing: [i],
                phase: "decrement-count2",
                codeLine: 15,
              });
            }
          }
        }
      }

      // End of loop iteration
      steps.push({
        array: snapshot,
        description: `End of iteration ${
          i + 1
        }. State: candidate1=${candidate1} (count=${count1}), candidate2=${candidate2} (count=${count2})`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        phase: "iteration-end",
        codeLine: 16,
      });
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
      codeLine: 17,
    });

    // Second pass: Verify candidates
    steps.push({
      array: snapshot,
      description:
        "Start second pass: verifying candidates by counting their occurrences",
      candidate1,
      candidate2,
      n,
      threshold,
      phase: "second-pass-start",
      codeLine: 18,
    });

    count1 = count2 = 0;
    steps.push({
      array: snapshot,
      description: "Update count1 = 0 and count2= 0",
      count1,
      count2,
      candidate1,
      candidate2,
      n,
      threshold,
      phase: "counts-update",
      codeLine: 19,
    });

    for (let i = 0; i < n; i++) {
      const num = arr[i];
      // Step: Start of iteration
      steps.push({
        array: snapshot,
        description: `Second pass: examining index ${i}, value ${num}`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        phase: "second-pass-examining",
        codeLine: 20,
      });

      // Step: Check candidate1
      steps.push({
        array: snapshot,
        description: `Check if (num === candidate1) → if (${num} === ${candidate1})`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        phase: "second-pass-check-candidate1",
        codeLine: 21,
      });
      if (num === candidate1) {
        count1++;
        steps.push({
          array: snapshot,
          description: `num === candidate1, increment count1 → count1 = ${count1}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          phase: "second-pass-increment-count1",
          codeLine: 22,
        });
      }

      // Step: Check candidate2
      steps.push({
        array: snapshot,
        description: `Check if (num === candidate2) → if (${num} === ${candidate2})`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        phase: "second-pass-check-candidate2",
        codeLine: 23,
      });
      if (num === candidate2) {
        count2++;
        steps.push({
          array: snapshot,
          description: `num === candidate2, increment count2 → count2 = ${count2}`,
          candidate1,
          candidate2,
          count1,
          count2,
          n,
          threshold,
          currentIndex: i,
          currentValue: num,
          phase: "second-pass-increment-count2",
          codeLine: 24,
        });
      }

      // Step: End of iteration
      steps.push({
        array: snapshot,
        description: `End of second pass iteration ${
          i + 1
        }: count1 = ${count1}, count2 = ${count2}`,
        candidate1,
        candidate2,
        count1,
        count2,
        n,
        threshold,
        currentIndex: i,
        currentValue: num,
        phase: "second-pass-iteration-end",
        codeLine: 25,
      });
    }

    const result = [];
    // Step: Show result variable card with empty array
    steps.push({
      array: snapshot,
      description: `Create result array: result = []`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      result: [],
      phase: "result-init",
      codeLine: 26,
    });

    // Step: Check condition for candidate1
    steps.push({
      array: snapshot,
      description: `Check if (count1 > threshold) → if (${count1} > ${threshold})`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      result: [...result],
      phase: "check-count1-threshold",
      codeLine: 27,
    });

    if (count1 > threshold) {
      result.push(candidate1);
      steps.push({
        array: snapshot,
        description: `✓ Condition TRUE: ${count1} > ${threshold}. Add ${candidate1} to result.`,
        candidate1,
        count1,
        candidate2,
        count2,
        n,
        threshold,
        result: [...result],
        phase: "add-candidate1",
        codeLine: 28,
      });
    } 

    // Step: Check condition for candidate2
    steps.push({
      array: snapshot,
      description: `Check if (count2 > threshold && candidate2 !== candidate1) → if (${count2} > ${threshold} && ${candidate2} !== ${candidate1})`,
      candidate1,
      candidate2,
      count1,
      count2,
      n,
      threshold,
      result: [...result],
      phase: "check-count2-threshold",
      codeLine: 29,
    });

    if (count2 > threshold && candidate2 !== candidate1) {
      result.push(candidate2);
      steps.push({
        array: snapshot,
        description: `✓ Condition TRUE: ${count2} > ${threshold} && ${candidate2} !== ${candidate1}. Add ${candidate2} to result.`,
        candidate2,
        count2,
        candidate1,
        count1,
        n,
        threshold,
        result: [...result],
        phase: "add-candidate2",
        codeLine: 30,
      });
    } 

    steps.push({
      array: snapshot,
      description: `Algorithm complete. Elements appearing more than n/3 times: [${result.join(
        ", "
      )}]`,
      result,
      n,
      threshold,
      phase: "return",
      codeLine: 31,
    });
    steps.push({
      array: snapshot,
      description: `Complete`,
      result,
      n,
      threshold,
      phase: "completed",
      codeLine: 32,
    });
    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function majorityElement(nums) {", // 0
        "  const n = nums.length;", // 1

        "  let count1 = 0, count2 = 0;", // 2
        "  let candidate1 = null, candidate2 = null;", // 3
        "  // First pass: Find potential candidates", // 4
        "  for (let num of nums) {", // 5
        "    if (candidate1 === num){", // 6
        "       count1++;", //7
        "    } else if (candidate2 === num){", // 8
        "       count2++;", // 9
        "    } else if (count1 === 0){", // 10
        "       candidate1 = num; count1 = 1;", //    11
        "    } else if (count2 === 0) { ", // 12
        "        candidate2 = num; count2 = 1;", // 13
        "    } else {", // 14
        "       count1--; count2--; }", // 15
        "    }", // 16
        "  }", // 17
        "  // Second pass: Verify candidates", // 18
        "  count1 = count2 = 0;", // 19
        "  for (let num of nums) {", // 20
        "    if (num === candidate1)", // 21
        "        count1++;", // 22
        "    if (num === candidate2)", // 23
        "        count2++;", // 24
        "  }", // 15
        "  const result = [];", // 26
        "  if (count1 > n / 3)", // 27
        "     result.push(candidate1);", // 28
        "  if (count2 > n / 3 && candidate2 !== candidate1)", // 29
        "     result.push(candidate2);", // 30
        "  return result;", // 31
        "}", // 32
      ],

      python: [
        "def majorityElement(nums):", // 0
        "    n = len(nums)", // 1
        "    count1, count2 = 0, 0", // 2
        "    candidate1, candidate2 = None, None", // 3
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
        "            count1 -= 1, count2 -= 1", // 15
        "", // 16
        "", // 17
        "    # Second pass: Verify candidates", // 18
        "    count1 = count2 = 0", // 19
        "    for num in nums:", // 20
        "        if num == candidate1:", // 21
        "            count1 += 1", // 22
        "        if num == candidate2:", // 23
        "            count2 += 1", // 24
        "", // 25
        "    result = []", // 26
        "    if count1 > n // 3:", // 27
        "        result.append(candidate1)", // 28
        "    if count2 > n // 3 and candidate2 != candidate1:", // 29
        "        result.append(candidate2)", // 30
        "    return result", // 31
      ],

      java: [
        "public List<Integer> majorityElement(int[] nums) {", // 0
        "    int n = nums.length;", // 1
        "    int count1 = 0, count2 = 0;", // 2
        "    Integer candidate1 = null, candidate2 = null;", // 3

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
        "        if (candidate1 != null && num == candidate1) ", // 21
        "             count1++;", // 22
        "        if (candidate2 != null && num == candidate2)", // 23
        "              count2++;", // 24
        "    }", // 25
        "    List<Integer> result = new ArrayList<>();", // 26
        "    if (count1 > n / 3) ", // 27
        "       result.add(candidate1);", // 28
        "    if (count2 > n / 3 && !candidate2.equals(candidate1))", // 29
        "        result.add(candidate2);", // 30
        "    return result;", // 31
        "}", // 32
      ],

      csharp: [
        "public IList<int> MajorityElement(int[] nums) {", // 0
        "    int n = nums.Length;", // 1
        "    int count1 = 0, count2 = 0;", // 2
        "    int? candidate1 = null, candidate2 = null;", // 3
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
        "        if (num == candidate1)", // 21
        "           count1++;", // 22
        "        if (num == candidate2)", // 23
        "           count2++;", // 24
        "    }", // 25
        "    IList<int> result = new List<int>();", // 26
        "    if (count1 > n / 3);", // 27
        "       result.Add(candidate1.Value)", // 28
        "    if (count2 > n / 3 && candidate2 != candidate1)", // 29
        "       result.Add(candidate2.Value);", // 30
        "    return result;", // 31
        "}", // 32
      ],

      cpp: [
        "vector<int> majorityElement(vector<int>& nums) {", // 0
        "    int n = nums.size();", // 1

        "    int count1 = 0, count2 = 0;", // 2
        "    int candidate1 = 0, candidate2 = 0;", // 3
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
       "        if (num == candidate1)", // 21
        "           count1++;", // 22
        "        if (num == candidate2)", // 23
        "           count2++;", // 24
        "    }", // 25
        "    vector<int> result;", // 26
        "    if (count1 > n / 3)", // 27
        "       result.push_back(candidate1);", // 28
        "    if (count2 > n / 3 && candidate2 != candidate1)", // 29
        "       result.push_back(candidate2);", // 30
        "    return result;", // 31
        "}", // 32
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    return this.getCodeLines(language).join("\n");
  },
};

export default mooresVoting;
