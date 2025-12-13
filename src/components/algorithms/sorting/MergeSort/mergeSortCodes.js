export const description = "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and then merges the sorted halves.";
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
        [workArray[left], workArray[right]] = [workArray[right], workArray[left]];
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
    
    let i = 0, j = 0, k = left;
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
    const mergedIndices = Array.from({ length: right - left + 1 }, (_, idx) => left + idx);
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
function mergeSort(arr) {
  if (arr.length <= 1) return [...arr];
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  const merged = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) merged.push(left[i++]);
    else merged.push(right[j++]);
  }
  return merged.concat(left.slice(i)).concat(right.slice(j));
}

// Example usage
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log('Original:', arr);
console.log('Sorted:  ', mergeSort(arr));
`,
  python: `# Merge Sort - Python (runnable)
def merge_sort(a):
    if len(a) <= 1:
        return a.copy()
    mid = len(a) // 2
    left = merge_sort(a[:mid])
    right = merge_sort(a[mid:])
    merged = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i]); i += 1
        else:
            merged.append(right[j]); j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged

if __name__ == '__main__':
    arr = [38, 27, 43, 3, 9, 82, 10]
    print('Original:', arr)
    print('Sorted:  ', merge_sort(arr))
`,
  java: `// Merge Sort - Java (runnable)
import java.util.Arrays;

public class MergeSortExample {
    public static void merge(int[] a, int l, int m, int r) {
        int n1 = m - l + 1;
        int n2 = r - m;
        int[] L = new int[n1];
        int[] R = new int[n2];
        for (int i = 0; i < n1; ++i) L[i] = a[l + i];
        for (int j = 0; j < n2; ++j) R[j] = a[m + 1 + j];
        int i = 0, j = 0, k = l;
        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) a[k++] = L[i++];
            else a[k++] = R[j++];
        }
        while (i < n1) a[k++] = L[i++];
        while (j < n2) a[k++] = R[j++];
    }

    public static void mergeSort(int[] a, int l, int r) {
        if (l < r) {
            int m = (l + r) / 2;
            mergeSort(a, l, m);
            mergeSort(a, m + 1, r);
            merge(a, l, m, r);
        }
    }

    public static void main(String[] args) {
        int[] arr = {38, 27, 43, 3, 9, 82, 10};
        System.out.println("Original: " + Arrays.toString(arr));
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted:   " + Arrays.toString(arr));
    }
}
`,
  'c#': `// Merge Sort - C# (runnable)
using System;

class MergeSortExample {
  static void Merge(int[] a, int l, int m, int r) {
    int n1 = m - l + 1;
    int n2 = r - m;
    int[] L = new int[n1];
    int[] R = new int[n2];
    for (int i = 0; i < n1; i++) L[i] = a[l + i];
    for (int j = 0; j < n2; j++) R[j] = a[m + 1 + j];
    int ii = 0, jj = 0, k = l;
    while (ii < n1 && jj < n2) {
      if (L[ii] <= R[jj]) a[k++] = L[ii++];
      else a[k++] = R[jj++];
    }
    while (ii < n1) a[k++] = L[ii++];
    while (jj < n2) a[k++] = R[jj++];
  }

  static void MergeSort(int[] a, int l, int r) {
    if (l < r) {
      int m = (l + r) / 2;
      MergeSort(a, l, m);
      MergeSort(a, m + 1, r);
      Merge(a, l, m, r);
    }
  }

  static void Main() {
    int[] arr = {38, 27, 43, 3, 9, 82, 10};
    Console.WriteLine("Original: " + string.Join(" ", arr));
    MergeSort(arr, 0, arr.Length - 1);
    Console.WriteLine("Sorted:   " + string.Join(" ", arr));
  }
`,
  cpp: `// Merge Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> mergeSort(const vector<int>& a) {
  if (a.size() <= 1) return a;
  size_t mid = a.size() / 2;
  vector<int> left(a.begin(), a.begin() + mid);
  vector<int> right(a.begin() + mid, a.end());
  left = mergeSort(left);
  right = mergeSort(right);
  vector<int> merged;
  merged.reserve(a.size());
  size_t i = 0, j = 0;
  while (i < left.size() && j < right.size()) {
    if (left[i] <= right[j]) merged.push_back(left[i++]);
    else merged.push_back(right[j++]);
  }
  while (i < left.size()) merged.push_back(left[i++]);
  while (j < right.size()) merged.push_back(right[j++]);
  return merged;
}

int main() {
  vector<int> arr = {38, 27, 43, 3, 9, 82, 10};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = mergeSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`,
};

export default codes;
