export const description = "Insertion Sort builds the final sorted array one item at a time. It is efficient for small data sets and mostly-sorted arrays.";
export const howItWorks = [
  "Start from the second element and compare it with elements before it",
  "Shift larger elements one position to the right to make space",
  "Insert the current element into its correct position",
  "Repeat for all elements until the array is sorted",
];

export const timeComplexity = {
  best: "O(n)",
  average: "O(n^2)",
  worst: "O(n^2)",
};

export const spaceComplexity = "O(1)";

// Example array and step generator for visualization
export const exampleArray = [12, 11, 13, 5, 6];

export const generateExampleSteps = () => {
  const a = [...exampleArray];
  const passes = [];

  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    let shifts = 0;

    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j -= 1;
      shifts += 1;
    }
    a[j + 1] = key;

    passes.push({
      passNumber: i,
      steps: [
        {
          array: [...a],
          swapped: [j + 1, i],
          swapText: `Insert ${key}${shifts ? ` (shifted ${shifts})` : ""}`,
        },
      ],
      finalArray: [...a],
      swaps: shifts,
      sorted: Array.from({ length: i + 1 }, (_, idx) => idx),
    });
  }

  return passes;
};
const codes = {
  javascript: `// Insertion Sort - JavaScript (runnable)
function insertionSort(arr) {
  const a = [...arr];
  for (let i = 1; i < a.length; i++) {
    const key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j = j - 1;
    }
    a[j + 1] = key;
  }
  return a;
}

// Example usage
const arrIns = [12, 11, 13, 5, 6];
console.log('Original:', arrIns);
console.log('Sorted:  ', insertionSort(arrIns));
`,
  python: `# Insertion Sort - Python (runnable)
def insertion_sort(arr):
    a = arr.copy()
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a

if __name__ == '__main__':
    arr = [12, 11, 13, 5, 6]
    print('Original:', arr)
    print('Sorted:  ', insertion_sort(arr))
`,
  java: `// Insertion Sort - Java (runnable)
import java.util.Arrays;

public class InsertionSortExample {
    public static int[] insertionSort(int[] arr) {
        int[] a = Arrays.copyOf(arr, arr.length);
        for (int i = 1; i < a.length; i++) {
            int key = a[i];
            int j = i - 1;
            while (j >= 0 && a[j] > key) {
                a[j + 1] = a[j];
                j = j - 1;
            }
            a[j + 1] = key;
        }
        return a;
    }

    public static void main(String[] args) {
        int[] arr = {12, 11, 13, 5, 6};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(insertionSort(arr)));
    }
}
`,
  'c#': `// Insertion Sort - C# (runnable)
using System;

class InsertionSortExample {
  static void InsertionSort(int[] a) {
    for (int i = 1; i < a.Length; i++) {
      int key = a[i];
      int j = i - 1;
      while (j >= 0 && a[j] > key) {
        a[j + 1] = a[j];
        j = j - 1;
      }
      a[j + 1] = key;
    }
  }

  static void Main() {
    int[] arr = {12, 11, 13, 5, 6};
    Console.WriteLine("Original: " + string.Join(" ", arr));
    InsertionSort(arr);
    Console.WriteLine("Sorted:   " + string.Join(" ", arr));
  }
`,
  cpp: `// Insertion Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> insertionSort(const vector<int>& arr) {
  vector<int> a = arr;
  for (size_t i = 1; i < a.size(); ++i) {
    int key = a[i];
    int j = (int)i - 1;
    while (j >= 0 && a[j] > key) {
      a[j + 1] = a[j];
      j = j - 1;
    }
    a[j + 1] = key;
  }
  return a;
}

int main() {
  vector<int> arr = {12, 11, 13, 5, 6};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = insertionSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`,
};

export default codes;
