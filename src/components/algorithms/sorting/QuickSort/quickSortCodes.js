export const description =
  "Quick Sort is a divide-and-conquer algorithm that selects a pivot, partitions the array around the pivot, and recursively sorts the partitions.";
export const howItWorks = [
  "Choose a pivot element from the array",
  "Partition the remaining elements into left (< pivot) and right (> pivot)",
  "Recursively apply quick sort to left and right partitions",
  "Concatenate left, pivot, and right to get the sorted array",
];

export const timeComplexity = {
  best: "O(n log n)",
  average: "O(n log n)",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(log n) (recursive stack)";

// Example array and step generator for visualization
export const exampleArray = [8, 7, 6, 5, 4];

export const generateExampleSteps = () => {
  const passes = [];
  let passNumber = 0;
  const workArray = [...exampleArray];

  const quickSortHelper = (left, right) => {
    if (left >= right) return;

    // Choose pivot (last element)
    const pivot = workArray[right];
    let i = left - 1;

    // Partition
    for (let j = left; j < right; j++) {
      if (workArray[j] < pivot) {
        i++;
        [workArray[i], workArray[j]] = [workArray[j], workArray[i]];
      }
    }

    // Place pivot in correct position
    i++;
    [workArray[i], workArray[right]] = [workArray[right], workArray[i]];
    const pivotIndex = i;

    passNumber++;
    const partitionIndices = Array.from(
      { length: right - left + 1 },
      (_, idx) => left + idx,
    );
    passes.push({
      passNumber,
      steps: [
        {
          array: [...workArray],
          swapped: [pivotIndex],
          swapText: `Partition with pivot ${pivot} at index ${pivotIndex}`,
        },
      ],
      finalArray: [...workArray],
      swaps: 0,
      sorted: [pivotIndex],
    });

    // Recursively sort left and right partitions
    quickSortHelper(left, pivotIndex - 1);
    quickSortHelper(pivotIndex + 1, right);
  };

  quickSortHelper(0, exampleArray.length - 1);
  return passes;
};

const codes = {
  javascript: `// Quick Sort - JavaScript (runnable)
class Solution {
  // Function to partition the array
  partition(arr, low, high) {
    // Choosing a random index between low and high
    const randomIndex = low + Math.floor(Math.random() * (high - low + 1));
    // Swap the random element with the first element
    [arr[low], arr[randomIndex]] = [arr[randomIndex], arr[low]];
    // Now choosing arr[low] as the pivot after the swap
    const pivot = arr[low];
    // Starting index for left subarray
    let i = low;
    // Starting index for right subarray
    let j = high;
    while (i < j) {
      // Move i to the right until we find an element greater than the pivot
      while (arr[i] <= pivot && i <= high - 1) {
        i++;
      }
      // Move j to the left until we find an element smaller than the pivot
      while (arr[j] > pivot && j >= low + 1) {
        j--;
      }
      // Swap elements at i and j if i is still less than j
      if (i < j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
    }

    // Pivot placed in correct position
    [arr[low], arr[j]] = [arr[j], arr[low]];
    return j;
  }

  // Helper function to perform the recursive quick sort
  quickSortHelper(arr, low, high) {
    // Base case: if the array has one or no elements, it's already sorted
    if (low < high) {
      // Get the partition index
      const pIndex = this.partition(arr, low, high);
      // Sort the left subarray
      this.quickSortHelper(arr, low, pIndex - 1);
      // Sort the right subarray
      this.quickSortHelper(arr, pIndex + 1, high);
    }
  }

  // Function to perform quick sort on given array
  quickSort(nums) {
    // Get the size of array
    const n = nums.length;

    // Perform quick sort
    this.quickSortHelper(nums, 0, n - 1);

    // Return sorted array
    return nums;
  }
}

// Example usage
const arr = [10, 7, 8, 9, 1, 5];
console.log('Before Sorting Array:');
console.log(arr.join(' '));

const sol = new Solution();
const sortedArr = sol.quickSort([...arr]);

console.log('After Sorting Array:');
console.log(sortedArr.join(' '));
`,
  python: `# Quick Sort - Python (runnable)
import random


class Solution:
    # Function to partition the array
    def partition(self, arr, low, high):
        # Choosing a random index between low and high
        random_index = random.randint(low, high)
        # Swap the random element with the first element
        arr[low], arr[random_index] = arr[random_index], arr[low]
        # Now choosing arr[low] as the pivot after the swap
        pivot = arr[low]
        # Starting index for left subarray
        i = low
        # Starting index for right subarray
        j = high
        while i < j:
            # Move i to the right until we find an element greater than the pivot
            while arr[i] <= pivot and i <= high - 1:
                i += 1
            # Move j to the left until we find an element smaller than the pivot
            while arr[j] > pivot and j >= low + 1:
                j -= 1
            # Swap elements at i and j if i is still less than j
            if i < j:
                arr[i], arr[j] = arr[j], arr[i]

        # Pivot placed in correct position
        arr[low], arr[j] = arr[j], arr[low]
        return j

    # Helper function to perform the recursive quick sort
    def quick_sort_helper(self, arr, low, high):
        # Base case: if the array has one or no elements, it's already sorted
        if low < high:
            # Get the partition index
            p_index = self.partition(arr, low, high)
            # Sort the left subarray
            self.quick_sort_helper(arr, low, p_index - 1)
            # Sort the right subarray
            self.quick_sort_helper(arr, p_index + 1, high)

    # Function to perform quick sort on given array
    def quick_sort(self, nums):
        # Get the size of array
        n = len(nums)

        # Perform quick sort
        self.quick_sort_helper(nums, 0, n - 1)

        # Return sorted array
        return nums


if __name__ == '__main__':
    arr = [10, 7, 8, 9, 1, 5]
    print('Before Sorting Array:')
    print(' '.join(map(str, arr)))

    sol = Solution()
    sorted_arr = sol.quick_sort(arr.copy())

    print('After Sorting Array:')
    print(' '.join(map(str, sorted_arr)))
`,
  java: `// Quick Sort - Java (runnable)
import java.util.Arrays;
import java.util.Random;

class Solution {
    private final Random random = new Random();

    // Function to partition the array
    int partition(int[] arr, int low, int high) {
        // Choosing a random index between low and high
        int randomIndex = low + random.nextInt(high - low + 1);
        // Swap the random element with the first element
        int temp = arr[low];
        arr[low] = arr[randomIndex];
        arr[randomIndex] = temp;
        // Now choosing arr[low] as the pivot after the swap
        int pivot = arr[low];
        // Starting index for left subarray
        int i = low;
        // Starting index for right subarray
        int j = high;
        while (i < j) {
            // Move i to the right until we find an element greater than the pivot
            while (arr[i] <= pivot && i <= high - 1) {
                i++;
            }
            // Move j to the left until we find an element smaller than the pivot
            while (arr[j] > pivot && j >= low + 1) {
                j--;
            }
            // Swap elements at i and j if i is still less than j
            if (i < j) {
                int t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }

        // Pivot placed in correct position
        int t2 = arr[low];
        arr[low] = arr[j];
        arr[j] = t2;
        return j;
    }

    // Helper function to perform the recursive quick sort
    void quickSortHelper(int[] arr, int low, int high) {
        // Base case: if the array has one or no elements, it's already sorted
        if (low < high) {
            // Get the partition index
            int pIndex = partition(arr, low, high);
            // Sort the left subarray
            quickSortHelper(arr, low, pIndex - 1);
            // Sort the right subarray
            quickSortHelper(arr, pIndex + 1, high);
        }
    }

    // Function to perform quick sort on given array
    int[] quickSort(int[] nums) {
        // Get the size of array
        int n = nums.length;

        // Perform quick sort
        quickSortHelper(nums, 0, n - 1);

        // Return sorted array
        return nums;
    }
}

public class QuickSortExample {
    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Before Sorting Array:");
        System.out.println(Arrays.toString(arr));

        Solution sol = new Solution();
        int[] sortedArr = sol.quickSort(arr.clone());

        System.out.println("After Sorting Array:");
        System.out.println(Arrays.toString(sortedArr));
    }
}
`,
  "c#": `// Quick Sort - C# (runnable)
using System;

class Solution {
    private static readonly Random rand = new Random();

    // Function to partition the array
    public int Partition(int[] arr, int low, int high) {
        // Choosing a random index between low and high
        int randomIndex = low + rand.Next(high - low + 1);
        // Swap the random element with the first element
        int temp = arr[low];
        arr[low] = arr[randomIndex];
        arr[randomIndex] = temp;
        // Now choosing arr[low] as the pivot after the swap
        int pivot = arr[low];
        // Starting index for left subarray
        int i = low;
        // Starting index for right subarray
        int j = high;
        while (i < j) {
            // Move i to the right until we find an element greater than the pivot
            while (arr[i] <= pivot && i <= high - 1) {
                i++;
            }
            // Move j to the left until we find an element smaller than the pivot
            while (arr[j] > pivot && j >= low + 1) {
                j--;
            }
            // Swap elements at i and j if i is still less than j
            if (i < j) {
                int t = arr[i];
                arr[i] = arr[j];
                arr[j] = t;
            }
        }

        // Pivot placed in correct position
        int t2 = arr[low];
        arr[low] = arr[j];
        arr[j] = t2;
        return j;
    }

    // Helper function to perform the recursive quick sort
    public void QuickSortHelper(int[] arr, int low, int high) {
        // Base case: if the array has one or no elements, it's already sorted
        if (low < high) {
            // Get the partition index
            int pIndex = Partition(arr, low, high);
            // Sort the left subarray
            QuickSortHelper(arr, low, pIndex - 1);
            // Sort the right subarray
            QuickSortHelper(arr, pIndex + 1, high);
        }
    }

    // Function to perform quick sort on given array
    public int[] QuickSort(int[] nums) {
        // Get the size of array
        int n = nums.Length;

        // Perform quick sort
        QuickSortHelper(nums, 0, n - 1);

        // Return sorted array
        return nums;
    }
}

class QuickSortExample {
    static void Main() {
        int[] arr = {10, 7, 8, 9, 1, 5};
        Console.WriteLine("Before Sorting Array:");
        Console.WriteLine(string.Join(" ", arr));

        Solution sol = new Solution();
        int[] sortedArr = sol.QuickSort((int[])arr.Clone());

        Console.WriteLine("After Sorting Array:");
        Console.WriteLine(string.Join(" ", sortedArr));
    }
}
`,
  cpp: `#include <bits/stdc++.h>
using namespace std;
class Solution {
public:
    // Function to partition the array
    int partition(vector<int>& arr, int low, int high) {
        // Choosing a random index between low and high
        int randomIndex = low + rand() % (high - low + 1);
        // Swap the random element with the first element
        swap(arr[low], arr[randomIndex]);
        // Now choosing arr[low] as the pivot after the swap
        int pivot = arr[low];
        // Starting index for left subarray
        int i = low;
        // Starting index for right subarray
        int j = high;
        while (i < j) {
            /*  Move i to the right until we find an
                element greater than the pivot  */
            while (arr[i] <= pivot && i <= high - 1) {
                i++;
            }
            /*  Move j to the left until we find an
                element smaller than the pivot  */
            while (arr[j] > pivot && j >= low + 1) {
                j--;
            }
            /*  Swap elements at i and j if i is still
                less than j  */
            if (i < j) swap(arr[i], arr[j]);
        }
        
        // Pivot placed in correct position
        swap(arr[low], arr[j]);
        return j;
    }
    // Helper Function to perform the recursive quick sort
    void quickSortHelper(vector<int>& arr, int low, int high) {
        /*  Base case: If the array has one or no
            elements, it's already sorted  */
        if (low < high) {
            // Get the partition index
            int pIndex = partition(arr, low, high);
            // Sort the left subarray
            quickSortHelper(arr, low, pIndex - 1);
            // Sort the right subarray
            quickSortHelper(arr, pIndex + 1, high);
        }
    }
    
    // Function to perform quick sort on given array
    vector<int> quickSort(vector<int>& nums) {
        // Get the size of array
        int n = nums.size();
        
        // Perfrom quick sort
        quickSortHelper(nums, 0, n-1);
        
        // Return sorted array
        return nums;
    }
};
int main() {
    vector<int> arr = {4, 6, 2, 5, 7, 9, 1, 3};
    int n = arr.size();
    cout << "Before Sorting Array: " << endl;
    for (int i = 0; i < n; i++) {
        cout << arr[i] << " ";
    }
    cout << endl;
    // Create an instance of Solution class
    Solution solution;
    // Function call to sort the array using quick sort
    vector<int> sortedArr = solution.quickSort(arr);
    cout << "After Sorting Array: " << endl;
    for (int i = 0; i < n; i++) {
        cout << sortedArr[i] << " ";
    }
    cout << endl;
    return 0;
}
`,
};

export default codes;
