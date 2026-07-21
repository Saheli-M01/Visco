// Copyright (c) 2026 Saheli Mondal.

export const description =
  "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges the sorted halves.";
export const howItWorks = [
  "Divide the array into two halves",
  "Recursively sort each half",
  "Merge the two sorted halves into a single sorted array",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n log n)",
};

export const spaceComplexity = "O(n)";

// Example array and step generator for visualization
export const exampleArray = [4, 1, 0, 3, 6];

export const generateExampleSteps = () => {
  const passes = [];
  let passNumber = 0;
  const workArray = [...exampleArray];

  const mergeSortHelper = (left, right) => {
    if (left >= right) return;

    if (right - left === 1) {
      // Base case: two elements, merge if needed
      if (workArray[left] > workArray[right]) {
        [workArray[left], workArray[right]] = [
          workArray[right],
          workArray[left],
        ];
      }
      passNumber++;
      passes.push({
        passNumber,
        steps: [
          {
            array: [...workArray],
            swapped: [left, right],
            swapText: `Merge indices ${left}-${right}`,
          },
        ],
        finalArray: [...workArray],
        swaps: 0,
        sorted: [left, right],
      });
      return;
    }

    const mid = Math.floor((left + right) / 2);

    // Recursively sort left and right halves
    mergeSortHelper(left, mid);
    mergeSortHelper(mid + 1, right);

    // Merge the two sorted halves
    const leftPart = workArray.slice(left, mid + 1);
    const rightPart = workArray.slice(mid + 1, right + 1);

    let i = 0,
      j = 0,
      k = left;
    while (i < leftPart.length && j < rightPart.length) {
      if (leftPart[i] <= rightPart[j]) {
        workArray[k++] = leftPart[i++];
      } else {
        workArray[k++] = rightPart[j++];
      }
    }
    while (i < leftPart.length) workArray[k++] = leftPart[i++];
    while (j < rightPart.length) workArray[k++] = rightPart[j++];

    passNumber++;
    const mergedIndices = Array.from(
      { length: right - left + 1 },
      (_, idx) => left + idx,
    );
    passes.push({
      passNumber,
      steps: [
        {
          array: [...workArray],
          swapped: mergedIndices,
          swapText: `Merge indices ${left}-${right}`,
        },
      ],
      finalArray: [...workArray],
      swaps: 0,
      sorted: mergedIndices,
    });
  };

  mergeSortHelper(0, exampleArray.length - 1);
  return passes;
};

const codes = {
  javascript: `// Merge Sort - JavaScript (runnable)
class Solution {
  // Function to merge two sorted halves of the array
  merge(arr, low, mid, high) {
    // Temporary array to store merged elements
    const temp = [];
    let left = low;
    let right = mid + 1;
    // Loop until subarrays are exhausted
    while (left <= mid && right <= high) {
      // Compare left and right elements
      if (arr[left] <= arr[right]) {
        // Add left element to temp
        temp.push(arr[left]);
        // Move left pointer
        left++;
      } else {
        // Add right element to temp
        temp.push(arr[right]);
        // Move right pointer
        right++;
      }
    }
    // Adding the remaining elements of left half
    while (left <= mid) {
      temp.push(arr[left]);
      left++;
    }
    // Adding the remaining elements of right half
    while (right <= high) {
      temp.push(arr[right]);
      right++;
    }
    // Transferring the sorted elements to arr
    for (let i = low; i <= high; i++) {
      arr[i] = temp[i - low];
    }
  }

  // Helper function to perform merge sort from low to high
  mergeSortHelper(arr, low, high) {
    // Base case: if the array has only one element
    if (low >= high) return;

    // Find the middle index
    const mid = Math.floor((low + high) / 2);
    // Recursively sort the left half
    this.mergeSortHelper(arr, low, mid);
    // Recursively sort the right half
    this.mergeSortHelper(arr, mid + 1, high);
    // Merge the sorted halves
    this.merge(arr, low, mid, high);
  }

  // Function to perform merge sort on the given array
  mergeSort(nums) {
    const n = nums.length; // Size of array

    // Perform Merge sort on the whole array
    this.mergeSortHelper(nums, 0, n - 1);

    // Return the sorted array
    return nums;
  }
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log('Before Sorting Array:');
console.log(arr.join(' '));

const sol = new Solution();
const sortedArr = sol.mergeSort([...arr]);

console.log('After Sorting Array:');
console.log(sortedArr.join(' '));
`,
  python: `# Merge Sort - Python (runnable)
class Solution:
    # Function to merge two sorted halves of the array
    def merge(self, arr, low, mid, high):
        # Temporary array to store merged elements
        temp = []
        left = low
        right = mid + 1
        # Loop until subarrays are exhausted
        while left <= mid and right <= high:
            # Compare left and right elements
            if arr[left] <= arr[right]:
                # Add left element to temp
                temp.append(arr[left])
                # Move left pointer
                left += 1
            else:
                # Add right element to temp
                temp.append(arr[right])
                # Move right pointer
                right += 1
        # Adding the remaining elements of left half
        while left <= mid:
            temp.append(arr[left])
            left += 1
        # Adding the remaining elements of right half
        while right <= high:
            temp.append(arr[right])
            right += 1
        # Transferring the sorted elements to arr
        for i in range(low, high + 1):
            arr[i] = temp[i - low]

    # Helper function to perform merge sort from low to high
    def merge_sort_helper(self, arr, low, high):
        # Base case: if the array has only one element
        if low >= high:
            return

        # Find the middle index
        mid = (low + high) // 2
        # Recursively sort the left half
        self.merge_sort_helper(arr, low, mid)
        # Recursively sort the right half
        self.merge_sort_helper(arr, mid + 1, high)
        # Merge the sorted halves
        self.merge(arr, low, mid, high)

    # Function to perform merge sort on the given array
    def merge_sort(self, nums):
        n = len(nums)  # Size of array

        # Perform Merge sort on the whole array
        self.merge_sort_helper(nums, 0, n - 1)

        # Return the sorted array
        return nums


if __name__ == '__main__':
    arr = [38, 27, 43, 3, 9, 82, 10]
    print('Before Sorting Array:')
    print(' '.join(map(str, arr)))

    sol = Solution()
    sorted_arr = sol.merge_sort(arr.copy())

    print('After Sorting Array:')
    print(' '.join(map(str, sorted_arr)))
`,
  java: `// Merge Sort - Java (runnable)
import java.util.Arrays;

class Solution {
    // Function to merge two sorted halves of the array
    void merge(int[] arr, int low, int mid, int high) {
        // Temporary array to store merged elements
        int[] temp = new int[high - low + 1];
        int left = low;
        int right = mid + 1;
        int idx = 0;
        // Loop until subarrays are exhausted
        while (left <= mid && right <= high) {
            // Compare left and right elements
            if (arr[left] <= arr[right]) {
                // Add left element to temp
                temp[idx++] = arr[left];
                // Move left pointer
                left++;
            } else {
                // Add right element to temp
                temp[idx++] = arr[right];
                // Move right pointer
                right++;
            }
        }
        // Adding the remaining elements of left half
        while (left <= mid) {
            temp[idx++] = arr[left];
            left++;
        }
        // Adding the remaining elements of right half
        while (right <= high) {
            temp[idx++] = arr[right];
            right++;
        }
        // Transferring the sorted elements to arr
        for (int i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    }

    // Helper function to perform merge sort from low to high
    void mergeSortHelper(int[] arr, int low, int high) {
        // Base case: if the array has only one element
        if (low >= high) return;

        // Find the middle index
        int mid = (low + high) / 2;
        // Recursively sort the left half
        mergeSortHelper(arr, low, mid);
        // Recursively sort the right half
        mergeSortHelper(arr, mid + 1, high);
        // Merge the sorted halves
        merge(arr, low, mid, high);
    }

    // Function to perform merge sort on the given array
    int[] mergeSort(int[] nums) {
        int n = nums.length; // Size of array

        // Perform Merge sort on the whole array
        mergeSortHelper(nums, 0, n - 1);

        // Return the sorted array
        return nums;
    }
}

public class MergeSortExample {
    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Before Sorting Array:");
        System.out.println(Arrays.toString(arr));

        Solution sol = new Solution();
        int[] sortedArr = sol.mergeSort(arr.clone());

        System.out.println("After Sorting Array:");
        System.out.println(Arrays.toString(sortedArr));
    }
}
`,
  "c#": `// Merge Sort - C# (runnable)
using System;

class Solution {
    // Function to merge two sorted halves of the array
    public void Merge(int[] arr, int low, int mid, int high) {
        // Temporary array to store merged elements
        int[] temp = new int[high - low + 1];
        int left = low;
        int right = mid + 1;
        int idx = 0;
        // Loop until subarrays are exhausted
        while (left <= mid && right <= high) {
            // Compare left and right elements
            if (arr[left] <= arr[right]) {
                // Add left element to temp
                temp[idx++] = arr[left];
                // Move left pointer
                left++;
            } else {
                // Add right element to temp
                temp[idx++] = arr[right];
                // Move right pointer
                right++;
            }
        }
        // Adding the remaining elements of left half
        while (left <= mid) {
            temp[idx++] = arr[left];
            left++;
        }
        // Adding the remaining elements of right half
        while (right <= high) {
            temp[idx++] = arr[right];
            right++;
        }
        // Transferring the sorted elements to arr
        for (int i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    }

    // Helper function to perform merge sort from low to high
    public void MergeSortHelper(int[] arr, int low, int high) {
        // Base case: if the array has only one element
        if (low >= high) return;

        // Find the middle index
        int mid = (low + high) / 2;
        // Recursively sort the left half
        MergeSortHelper(arr, low, mid);
        // Recursively sort the right half
        MergeSortHelper(arr, mid + 1, high);
        // Merge the sorted halves
        Merge(arr, low, mid, high);
    }

    // Function to perform merge sort on the given array
    public int[] MergeSort(int[] nums) {
        int n = nums.Length; // Size of array

        // Perform Merge sort on the whole array
        MergeSortHelper(nums, 0, n - 1);

        // Return the sorted array
        return nums;
    }
}

class MergeSortExample {
    static void Main() {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        Console.WriteLine("Before Sorting Array:");
        Console.WriteLine(string.Join(" ", arr));

        Solution sol = new Solution();
        int[] sortedArr = sol.MergeSort((int[])arr.Clone());

        Console.WriteLine("After Sorting Array:");
        Console.WriteLine(string.Join(" ", sortedArr));
    }
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;
class Solution{
public:
    // Function to merge two sorted halves of the array
    void merge(vector<int> &arr, int low, int mid, int high) {
        // Temporary array to store merged elements
        vector<int> temp;
        int left = low;
        int right = mid + 1;
        // Loop until subarrays are exhausted
        while (left <= mid && right <= high) {
            // Compare left and right elements
            if (arr[left] <= arr[right]) {
                // Add left element to temp
                temp.push_back(arr[left]);
                // Move left pointer
                left++;
            }
            else {
                // Add right element to temp
                temp.push_back(arr[right]);
                // Move right pointer
                right++;
            }
        }
        // Adding the remaining elements of left half
        while (left <= mid) {
            temp.push_back(arr[left]);
            left++;
        }
        // Adding the remaining elements of right half
        while (right <= high) {
            temp.push_back(arr[right]);
            right++;
        }
        // Transferring the sorted elements to arr
        for (int i = low; i <= high; i++) {
            arr[i] = temp[i - low];
        }
    }
    
    // Helper function to perform merge sort from low to high
    void mergeSortHelper(vector<int> &arr, int low, int high){
        // Base case: if the array has only one element
        if (low >= high)
            return;
        
        // Find the middle index
        int mid = (low + high) / 2;
        // Recursively sort the left half
        mergeSortHelper(arr, low, mid);
        // Recursively sort the right half
        mergeSortHelper(arr, mid + 1, high);
        // Merge the sorted halves
        merge(arr, low, mid, high);
    }
    
    // Function to perform merge sort on the given array
    vector<int> mergeSort(vector<int> &nums) {
        int n = nums.size(); // SIze of array
        
        // Perform Merge sort on the whole array
        mergeSortHelper(nums, 0, n-1);
        
        // Return the sorted array
        return nums;
    }
};
int main(){
    vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
    int n = arr.size();
    cout << "Before Sorting Array: " << endl;
    for (int i = 0; i < n; i++)
        cout << arr[i] << " ";
    cout << endl;
    // Create an instance of the Solution class
    Solution sol;
    // Function call to sort the array
    vector<int> sortedArr = sol.mergeSort(arr);
    cout << "After Sorting Array: " << endl;
    for (int i = 0; i < n; i++)
        cout << sortedArr[i] << " ";
    cout << endl;
    return 0;
}
`,
};

export default codes;
