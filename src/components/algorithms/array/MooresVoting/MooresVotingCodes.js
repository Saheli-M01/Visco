// Copyright (c) 2026 Saheli Mondal.

export const description = "Moore's Voting Algorithm is used to find all elements that appear more than ⌊n/3⌋ times in an array. The algorithm works in two phases: the first phase identifies potential candidates, and the second phase verifies them.";

export const howItWorks = [
  "Initialize two candidates and two counters to track potential majority elements",
  "First Pass: Iterate through array. If element matches a candidate, increment its count. If a count is 0, assign current element as candidate. Otherwise, decrement both counts",
  "Second Pass: Count actual occurrences of both candidates in the array",
  "Verify if each candidate's count exceeds n/3 threshold",
  "Return all verified candidates as the result",
];

export const timeComplexity = {
  best: "O(n)",
  average: "O(n)",
  worst: "O(n)",
};

export const spaceComplexity = "O(1)";

// Example array and walkthrough steps for visualization (n/3 variant)
export const exampleArray = [1, 2, 2, 3, 2, 1, 1, 3];

export const generateExampleSteps = () => {
    const nums = [...exampleArray];
    const passes = [];
    let passNumber = 1;

    // First pass: find candidates
    let candidate1 = null,
        candidate2 = null,
        count1 = 0,
        count2 = 0;

    nums.forEach((num, idx) => {
        if (candidate1 === num) {
            count1++;
        } else if (candidate2 === num) {
            count2++;
        } else if (count1 === 0) {
            candidate1 = num;
            count1 = 1;
        } else if (count2 === 0) {
            candidate2 = num;
            count2 = 1;
        } else {
            count1--;
            count2--;
        }

        passes.push({
            passNumber: passNumber++,
            steps: [
                {
                    array: [...nums],
                    swapped: [idx],
                    swapText: `i=${idx}, num=${num}, c1=${candidate1 ?? '-'}(${count1}), c2=${candidate2 ?? '-'}(${count2})`,
                    sorted: [],
                },
            ],
            sorted: [],
        });
    });

    // Second pass: verify counts
    count1 = 0;
    count2 = 0;
    nums.forEach((num) => {
        if (num === candidate1) count1++;
        if (num === candidate2) count2++;
    });

    passes.push({
        passNumber: passNumber++,
        steps: [
            {
                array: [...nums],
                swapped: [],
                swapText: `Verify counts → c1=${candidate1} freq=${count1}, c2=${candidate2} freq=${count2}`,
                sorted: [],
            },
        ],
        sorted: [],
    });

    const threshold = Math.floor(nums.length / 3);
    const result = [];
    if (count1 > threshold) result.push(candidate1);
    if (candidate2 !== candidate1 && count2 > threshold) result.push(candidate2);

    passes.push({
        passNumber: passNumber,
        steps: [
            {
                array: [...nums],
                swapped: [],
                swapText: `Result > n/3 → [${result.join(', ')}]`,
                sorted: [],
            },
        ],
        sorted: [],
    });

    return passes;
};

const codes = {
  javascript: `
function majorityElement(nums) {
  const n = nums.length;
  let candidate1 = null, candidate2 = null;
  let count1 = 0, count2 = 0;
  
  // First pass: Find potential candidates
  for (let num of nums) {
    if (candidate1 === num) {
      count1++;
    } else if (candidate2 === num) {
      count2++;
    } else if (count1 === 0) {
      candidate1 = num;
      count1 = 1;
    } else if (count2 === 0) {
      candidate2 = num;
      count2 = 1;
    } else {
      count1--;
      count2--;
    }
  }
  
  // Second pass: Verify candidates
  count1 = count2 = 0;
  for (let num of nums) {
    if (num === candidate1) count1++;
    if (num === candidate2) count2++;
  }
  
  const result = [];
  if (count1 > n / 3) result.push(candidate1);
  if (count2 > n / 3 && candidate2 !== candidate1) result.push(candidate2);
  
  return result;
}

// Example usage:
const nums1 = [3, 2, 3];
console.log('Input:', nums1);
console.log('Majority Elements:', majorityElement(nums1)); // Output: [3]

const nums2 = [1, 2, 2, 3, 2, 1, 1, 3];
console.log('\\nInput:', nums2);
console.log('Majority Elements:', majorityElement(nums2)); // Output: [1, 2]

const nums3 = [1];
console.log('\\nInput:', nums3);
console.log('Majority Elements:', majorityElement(nums3)); // Output: [1]
`,

  python: `
def majorityElement(nums):
    """
    Find all elements that appear more than n/3 times
    """
    n = len(nums)
    candidate1, candidate2 = None, None
    count1, count2 = 0, 0
    
    # First pass: Find potential candidates
    for num in nums:
        if candidate1 == num:
            count1 += 1
        elif candidate2 == num:
            count2 += 1
        elif count1 == 0:
            candidate1, count1 = num, 1
        elif count2 == 0:
            candidate2, count2 = num, 1
        else:
            count1 -= 1
            count2 -= 1
    
    # Second pass: Verify candidates
    count1 = count2 = 0
    for num in nums:
        if num == candidate1:
            count1 += 1
        if num == candidate2:
            count2 += 1
    
    result = []
    if count1 > n // 3:
        result.append(candidate1)
    if count2 > n // 3 and candidate2 != candidate1:
        result.append(candidate2)
    
    return result

if __name__ == '__main__':
    nums1 = [3, 2, 3]
    print('Input:', nums1)
    print('Majority Elements:', majorityElement(nums1))  # Output: [3]
    
    nums2 = [1, 2, 2, 3, 2, 1, 1, 3]
    print('\\nInput:', nums2)
    print('Majority Elements:', majorityElement(nums2))  # Output: [1, 2]
    
    nums3 = [1]
    print('\\nInput:', nums3)
    print('Majority Elements:', majorityElement(nums3))  # Output: [1]
`,

  java: `
import java.util.*;

class Solution {
    // Function to find all majority elements (appearing more than n/3 times)
    public List<Integer> majorityElement(int[] nums) {
        int n = nums.length;
        Integer candidate1 = null, candidate2 = null;
        int count1 = 0, count2 = 0;
        
        // First pass: Find potential candidates
        for (int num : nums) {
            if (candidate1 != null && candidate1 == num) {
                count1++;
            } else if (candidate2 != null && candidate2 == num) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        
        // Second pass: Verify candidates
        count1 = count2 = 0;
        for (int num : nums) {
            if (candidate1 != null && num == candidate1) count1++;
            if (candidate2 != null && num == candidate2) count2++;
        }
        
        List<Integer> result = new ArrayList<>();
        if (count1 > n / 3) result.add(candidate1);
        if (count2 > n / 3 && !candidate2.equals(candidate1)) result.add(candidate2);
        
        return result;
    }
}

public class Main {
    public static void main(String[] args) {
        Solution sol = new Solution();
        
        int[] nums1 = {3, 2, 3};
        System.out.print("Input: ");
        for (int x : nums1) System.out.print(x + " ");
        System.out.println("\\nMajority Elements: " + sol.majorityElement(nums1)); // Output: [3]
        
        int[] nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
        System.out.print("\\nInput: ");
        for (int x : nums2) System.out.print(x + " ");
        System.out.println("\\nMajority Elements: " + sol.majorityElement(nums2)); // Output: [1, 2]
    }
}
`,

  'c#': `
using System;
using System.Collections.Generic;

public class Solution {
    // Function to find all majority elements (appearing more than n/3 times)
    public IList<int> MajorityElement(int[] nums) {
        int n = nums.Length;
        int? candidate1 = null, candidate2 = null;
        int count1 = 0, count2 = 0;
        
        // First pass: Find potential candidates
        foreach (int num in nums) {
            if (candidate1 == num) {
                count1++;
            } else if (candidate2 == num) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        
        // Second pass: Verify candidates
        count1 = count2 = 0;
        foreach (int num in nums) {
            if (num == candidate1) count1++;
            if (num == candidate2) count2++;
        }
        
        IList<int> result = new List<int>();
        if (count1 > n / 3) result.Add(candidate1.Value);
        if (count2 > n / 3 && candidate2 != candidate1) result.Add(candidate2.Value);
        
        return result;
    }
}

public class Program {
    public static void Main(string[] args) {
        Solution sol = new Solution();
        
        int[] nums1 = {3, 2, 3};
        Console.Write("Input: ");
        foreach (int x in nums1) Console.Write(x + " ");
        Console.Write("\\nMajority Elements: ");
        foreach (int x in sol.MajorityElement(nums1)) Console.Write(x + " ");
        Console.WriteLine(); // Output: 3
        
        int[] nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
        Console.Write("\\nInput: ");
        foreach (int x in nums2) Console.Write(x + " ");
        Console.Write("\\nMajority Elements: ");
        foreach (int x in sol.MajorityElement(nums2)) Console.Write(x + " ");
        Console.WriteLine(); // Output: 1 2
    }
}
`,

  cpp: `
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to find all majority elements (appearing more than n/3 times)
    vector<int> majorityElement(vector<int>& nums) {
        int n = nums.size();
        int candidate1 = 0, candidate2 = 0;
        int count1 = 0, count2 = 0;
        
        // First pass: Find potential candidates
        for (int num : nums) {
            if (count1 > 0 && candidate1 == num) {
                count1++;
            } else if (count2 > 0 && candidate2 == num) {
                count2++;
            } else if (count1 == 0) {
                candidate1 = num;
                count1 = 1;
            } else if (count2 == 0) {
                candidate2 = num;
                count2 = 1;
            } else {
                count1--;
                count2--;
            }
        }
        
        // Second pass: Verify candidates
        count1 = count2 = 0;
        for (int num : nums) {
            if (num == candidate1) count1++;
            if (num == candidate2) count2++;
        }
        
        vector<int> result;
        if (count1 > n / 3) result.push_back(candidate1);
        if (count2 > n / 3 && candidate2 != candidate1) result.push_back(candidate2);
        
        return result;
    }
};

int main() {
    Solution sol;
    
    vector<int> nums1 = {3, 2, 3};
    cout << "Input: ";
    for (int x : nums1) cout << x << " ";
    cout << "\nMajority Elements: ";
    vector<int> result1 = sol.majorityElement(nums1);
    for (int x : result1) cout << x << " ";
    cout << endl; // Output: 3
    
    vector<int> nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
    cout << "\nInput: ";
    for (int x : nums2) cout << x << " ";
    cout << "\nMajority Elements: ";
    vector<int> result2 = sol.majorityElement(nums2);
    for (int x : result2) cout << x << " ";
    cout << endl; // Output: 1 2
    
    return 0;
}
`,
};

export default codes;