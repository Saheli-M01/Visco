export const description = "Binary Search finds an element's index in a sorted array by repeatedly dividing the search range in half.";
export const howItWorks = [
  "Maintain left (low) and right (high) bounds",
  "Compute mid = floor((low + high) / 2) and compare to target",
  "If equal, return mid. If target is greater, move low = mid + 1; else high = mid - 1",
];

export const timeComplexity = {
  best: "O(1)",
  average: "O(log n)",
  worst: "O(log n)",
};

export const spaceComplexity = "O(1)";

const codes = {
  javascript: `// Binary Search - JavaScript (runnable)
function binarySearch(arr, target) {
  let low = 0;
  let high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

// Example usage
const arr = [1, 3, 5, 7, 9, 11, 13];
console.log('Array:', arr);
console.log('Index of 7:', binarySearch(arr, 7));
console.log('Index of 2 (not found):', binarySearch(arr, 2));
`,

  python: `# Binary Search - Python (runnable)
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1

if __name__ == '__main__':
    arr = [1, 3, 5, 7, 9, 11, 13]
    print('Array:', arr)
    print('Index of 7:', binary_search(arr, 7))
    print('Index of 2 (not found):', binary_search(arr, 2))
`,

  java: `// Binary Search - Java (runnable)
import java.util.Arrays;

public class BinarySearchExample {
    static int binarySearch(int[] arr, int target) {
        int low = 0, high = arr.length - 1;
        while (low <= high) {
            int mid = (low + high) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) low = mid + 1;
            else high = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] arr = {1,3,5,7,9,11,13};
        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Index of 7: " + binarySearch(arr, 7));
        System.out.println("Index of 2 (not found): " + binarySearch(arr, 2));
    }
}
`,

  'c#': `// Binary Search - C# (runnable)
using System;

class BinarySearchExample {
  static int BinarySearch(int[] arr, int target) {
    int low = 0, high = arr.Length - 1;
    while (low <= high) {
      int mid = (low + high) / 2;
      if (arr[mid] == target) return mid;
      if (arr[mid] < target) low = mid + 1;
      else high = mid - 1;
    }
    return -1;
  }

  static void Main() {
    int[] arr = {1,3,5,7,9,11,13};
    Console.WriteLine("Array: " + string.Join(", ", arr));
    Console.WriteLine("Index of 7: " + BinarySearch(arr, 7));
    Console.WriteLine("Index of 2 (not found): " + BinarySearch(arr, 2));
  }
}
`,

  cpp: `// Binary Search - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
  int low = 0, high = (int)arr.size() - 1;
  while (low <= high) {
    int mid = (low + high) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

int main() {
  vector<int> arr = {1,3,5,7,9,11,13};
  cout << "Array: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  cout << "Index of 7: " << binarySearch(arr, 7) << "\n";
  cout << "Index of 2 (not found): " << binarySearch(arr, 2) << "\n";
  return 0;
}
`,
};

export default codes;
