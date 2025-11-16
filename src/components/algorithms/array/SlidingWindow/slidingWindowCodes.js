export const description = 
  "The Container With Most Water problem uses a two-pointer approach to find the maximum area that can be formed between vertical lines. The area is determined by the distance between pointers and the minimum height of the two lines.";

export const howItWorks = [
  "Start with two pointers: one at the beginning (left) and one at the end (right) of the array.",
  "Calculate the area formed between the two pointers: area = (right - left) × min(height[left], height[right]).",
  "Track the maximum area encountered so far.",
  "Move the pointer pointing to the shorter line inward, as moving the taller line cannot improve the result.",
  "Repeat until the pointers meet.",
];

export const timeComplexity = {
  best: "O(n)",
  average: "O(n)",
  worst: "O(n)",
};

export const spaceComplexity = "O(1)";



const codes = {
  javascript: `// Container With Most Water - JavaScript
function maxArea(height) {
  let maxArea = 0;
  let left = 0;
  let right = height.length - 1;
  
  while (left < right) {
    const width = right - left;
    const h = Math.min(height[left], height[right]);
    const area = width * h;
    maxArea = Math.max(maxArea, area);
    
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }
  
  return maxArea;
}

// Example usage
const heights = [1, 8, 6, 2, 5, 4, 8, 3, 7];
console.log('Heights:', heights);
console.log('Max Area:', maxArea(heights));
`,

  python: `# Container With Most Water - Python
def max_area(height):
    max_area = 0
    left, right = 0, len(height) - 1
    
    while left < right:
        width = right - left
        h = min(height[left], height[right])
        area = width * h
        max_area = max(max_area, area)
        
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_area

# Example usage
heights = [1, 8, 6, 2, 5, 4, 8, 3, 7]
print('Heights:', heights)
print('Max Area:', max_area(heights))
`,

  java: `// Container With Most Water - Java
public class Solution {
    public int maxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.length - 1;
        
        while (left < right) {
            int width = right - left;
            int h = Math.min(height[left], height[right]);
            int area = width * h;
            maxArea = Math.max(maxArea, area);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        System.out.println("Max Area: " + sol.maxArea(heights));
    }
}
`,

  csharp: `// Container With Most Water - C#
using System;

public class Solution {
    public int MaxArea(int[] height) {
        int maxArea = 0;
        int left = 0;
        int right = height.Length - 1;
        
        while (left < right) {
            int width = right - left;
            int h = Math.Min(height[left], height[right]);
            int area = width * h;
            maxArea = Math.Max(maxArea, area);
            
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        
        return maxArea;
    }
    
    static void Main() {
        Solution sol = new Solution();
        int[] heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
        Console.WriteLine("Max Area: " + sol.MaxArea(heights));
    }
}
`,

  cpp: `// Container With Most Water - C++
#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    int maxArea = 0;
    int left = 0;
    int right = height.size() - 1;
    
    while (left < right) {
        int width = right - left;
        int h = min(height[left], height[right]);
        int area = width * h;
        maxArea = max(maxArea, area);
        
        if (height[left] < height[right]) {
            left++;
        } else {
            right--;
        }
    }
    
    return maxArea;
}

int main() {
    vector<int> heights = {1, 8, 6, 2, 5, 4, 8, 3, 7};
    cout << "Max Area: " << maxArea(heights) << endl;
    return 0;
}
`,
};

export default codes;