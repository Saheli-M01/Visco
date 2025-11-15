export const MooresVotingCodes = {
  description: `Moore's Voting Algorithm is used to find all elements that appear more than ⌊n/3⌋ times in an array. The algorithm works in two phases: the first phase identifies potential candidates, and the second phase verifies them.`,

  howItWorks: [
    "Initialize two candidates and two counters to track potential majority elements",
    "First Pass: Iterate through array. If element matches a candidate, increment its count. If a count is 0, assign current element as candidate. Otherwise, decrement both counts",
    "Second Pass: Count actual occurrences of both candidates in the array",
    "Verify if each candidate's count exceeds n/3 threshold",
    "Return all verified candidates as the result"
  ],

  complexities: {
    time: "O(n) - Two linear passes through the array",
    space: "O(1) - Only constant extra space for candidates and counters"
  },

  pseudoCode: `1. Initialize candidate1 = null, candidate2 = null
2. Initialize count1 = 0, count2 = 0
3. First Pass:
   For each element in array:
     - If element equals candidate1: increment count1
     - Else if element equals candidate2: increment count2
     - Else if count1 is 0: set candidate1 = element, count1 = 1
     - Else if count2 is 0: set candidate2 = element, count2 = 1
     - Else: decrement both count1 and count2
4. Second Pass:
   Reset count1 = 0, count2 = 0
   Count actual occurrences of candidate1 and candidate2
5. Add to result if count > n/3
6. Return result`,

  codes: {
    javascript: {
      code: `function majorityElement(nums) {
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
const nums = [3, 2, 3];
console.log(majorityElement(nums)); // Output: [3]

const nums2 = [1, 2, 2, 3, 2, 1, 1, 3];
console.log(majorityElement(nums2)); // Output: [1, 2]`,
      language: "javascript"
    },

    python: {
      code: `def majorityElement(nums):
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

# Example usage:
nums = [3, 2, 3]
print(majorityElement(nums))  # Output: [3]

nums2 = [1, 2, 2, 3, 2, 1, 1, 3]
print(majorityElement(nums2))  # Output: [1, 2]`,
      language: "python"
    },

    java: {
      code: `import java.util.*;

public class Solution {
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
    
    // Example usage:
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] nums = {3, 2, 3};
        System.out.println(sol.majorityElement(nums)); // Output: [3]
        
        int[] nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
        System.out.println(sol.majorityElement(nums2)); // Output: [1, 2]
    }
}`,
      language: "java"
    },

    csharp: {
      code: `using System;
using System.Collections.Generic;

public class Solution {
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
    
    // Example usage:
    static void Main() {
        Solution sol = new Solution();
        int[] nums = {3, 2, 3};
        Console.WriteLine(string.Join(", ", sol.MajorityElement(nums))); // Output: 3
        
        int[] nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
        Console.WriteLine(string.Join(", ", sol.MajorityElement(nums2))); // Output: 1, 2
    }
}`,
      language: "csharp"
    },

    cpp: {
      code: `#include <vector>
#include <iostream>
using namespace std;

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

// Example usage:
int main() {
    vector<int> nums = {3, 2, 3};
    vector<int> result = majorityElement(nums);
    // Output: 3
    
    vector<int> nums2 = {1, 2, 2, 3, 2, 1, 1, 3};
    vector<int> result2 = majorityElement(nums2);
    // Output: 1, 2
    
    return 0;
}`,
      language: "cpp"
    }
  }
};

export default MooresVotingCodes;
