export const description = "Quick Sort is a divide-and-conquer algorithm that selects a pivot, partitions the array around the pivot, and recursively sorts the partitions.";
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

const codes = {
  javascript: `// Quick Sort - JavaScript (runnable)
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = [], right = [];
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  return [...quickSort(left), pivot, ...quickSort(right)];
}
// Example usage
const arr = [10, 7, 8, 9, 1, 5];
console.log('Original:', arr);
console.log('Sorted:  ', quickSort(arr));
`,
  python: `# Quick Sort - Python (runnable)
def quick_sort(arr):
    if len(arr) <= 1:
        return arr[:]
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)

if __name__ == '__main__':
    arr = [10, 7, 8, 9, 1, 5]
    print('Original:', arr)
    print('Sorted:  ', quick_sort(arr))
`,
  java: `// Quick Sort - Java (runnable example)
import java.util.Arrays;

public class QuickSortExample {
    public static int[] quickSort(int[] arr) {
        if (arr.length <= 1) return Arrays.copyOf(arr, arr.length);
        int pivot = arr[arr.length - 1];
        int[] left = Arrays.stream(arr, 0, arr.length - 1).filter(x -> x < pivot).toArray();
        int[] right = Arrays.stream(arr, 0, arr.length - 1).filter(x -> x >= pivot).toArray();
        int[] sortedLeft = quickSort(left);
        int[] sortedRight = quickSort(right);
        int[] res = new int[sortedLeft.length + 1 + sortedRight.length];
        System.arraycopy(sortedLeft, 0, res, 0, sortedLeft.length);
        res[sortedLeft.length] = pivot;
        System.arraycopy(sortedRight, 0, res, sortedLeft.length + 1, sortedRight.length);
        return res;
    }

    public static void main(String[] args) {
        int[] arr = {10, 7, 8, 9, 1, 5};
        System.out.println("Original: " + Arrays.toString(arr));
        System.out.println("Sorted:   " + Arrays.toString(quickSort(arr)));
    }
}
`,
  'c#': `// Quick Sort - C# (runnable)
using System;
using System.Linq;

class QuickSortExample {
  static int[] QuickSort(int[] arr) {
    if (arr.Length <= 1) return arr.ToArray();
    int pivot = arr[arr.Length - 1];
    var left = arr.Take(arr.Length - 1).Where(x => x < pivot).ToArray();
    var right = arr.Take(arr.Length - 1).Where(x => x >= pivot).ToArray();
    return QuickSort(left).Concat(new[]{pivot}).Concat(QuickSort(right)).ToArray();
  }

  static void Main() {
    int[] arr = {10, 7, 8, 9, 1, 5};
    Console.WriteLine("Original: " + string.Join(" ", arr));
    var sorted = QuickSort(arr);
    Console.WriteLine("Sorted:   " + string.Join(" ", sorted));
  }
`,
  cpp: `// Quick Sort - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

vector<int> quickSort(const vector<int>& arr) {
  if (arr.size() <= 1) return arr;
  int pivot = arr.back();
  vector<int> left, right;
  for (size_t i = 0; i + 1 < arr.size(); ++i) {
    if (arr[i] < pivot) left.push_back(arr[i]); else right.push_back(arr[i]);
  }
  auto l = quickSort(left);
  auto r = quickSort(right);
  vector<int> res;
  res.reserve(l.size() + 1 + r.size());
  res.insert(res.end(), l.begin(), l.end());
  res.push_back(pivot);
  res.insert(res.end(), r.begin(), r.end());
  return res;
}

int main() {
  vector<int> arr = {10, 7, 8, 9, 1, 5};
  cout << "Original: "; for (int v: arr) cout << v << ' ';
  cout << "\n";
  auto sorted = quickSort(arr);
  cout << "Sorted:   "; for (int v: sorted) cout << v << ' ';
  cout << "\n";
  return 0;
}
`
};

export default codes;
