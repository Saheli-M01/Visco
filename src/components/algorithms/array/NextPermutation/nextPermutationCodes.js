export const description = "Next Permutation rearranges numbers into the lexicographically next greater permutation. If no such permutation exists, it rearranges to the lowest possible order (sorted in ascending order).";

export const howItWorks = [
	"Find the largest index i where nums[i] < nums[i + 1] (the 'pivot'). This is the rightmost position where we can increase the value.",
	"If no such index exists, the array is in descending order (largest permutation). Reverse the entire array to get the smallest permutation.",
	"Find the largest index j where nums[j] > nums[i] (the 'successor'). This is the smallest number to the right that can replace nums[i].",
	"Swap nums[i] and nums[j] to increase the permutation.",
	"Reverse the suffix after index i to get the smallest arrangement of those elements, giving us the next permutation.",
];

export const timeComplexity = {
	best: "O(n)",
	average: "O(n)",
	worst: "O(n)",
};

export const spaceComplexity = "O(1)";

export const pseudoCode = `nextPermutation(nums):
  // Find pivot
  pivot = -1
  for i from n-2 down to 0:
    if nums[i] < nums[i+1]:
      pivot = i
      break
  
  // If no pivot, reverse all
  if pivot == -1:
    reverse(nums, 0, n-1)
    return
  
  // Find successor
  for j from n-1 down to pivot+1:
    if nums[j] > nums[pivot]:
      successor = j
      break
  
  // Swap pivot and successor
  swap(nums[pivot], nums[successor])
  
  // Reverse suffix after pivot
  reverse(nums, pivot+1, n-1)`;

const codes = {
	javascript: `// Next Permutation - JavaScript (runnable)
function nextPermutation(nums) {
	// Find the largest index i such that nums[i] < nums[i + 1]
	let pivot = -1;
	for (let i = nums.length - 2; i >= 0; i--) {
		if (nums[i] < nums[i + 1]) {
			pivot = i;
			break;
		}
	}
	
	// If no such index exists, reverse the entire array
	if (pivot === -1) {
		nums.reverse();
		return nums;
	}
	
	// Find the largest index j such that nums[j] > nums[pivot]
	let successor = -1;
	for (let j = nums.length - 1; j > pivot; j--) {
		if (nums[j] > nums[pivot]) {
			successor = j;
			break;
		}
	}
	
	// Swap nums[pivot] and nums[successor]
	[nums[pivot], nums[successor]] = [nums[successor], nums[pivot]];
	
	// Reverse the suffix starting at pivot + 1
	let left = pivot + 1;
	let right = nums.length - 1;
	while (left < right) {
		[nums[left], nums[right]] = [nums[right], nums[left]];
		left++;
		right--;
	}
	
	return nums;
}

// Example usage
const arr1 = [1, 2, 3];
console.log('Input:', arr1);
console.log('Next Permutation:', nextPermutation([...arr1]));

const arr2 = [3, 2, 1];
console.log('\\nInput:', arr2);
console.log('Next Permutation (wraps to smallest):', nextPermutation([...arr2]));

const arr3 = [1, 1, 5];
console.log('\\nInput:', arr3);
console.log('Next Permutation:', nextPermutation([...arr3]));
`,

	python: `# Next Permutation - Python (runnable)
def next_permutation(nums):
		"""
		Modify nums in-place to the next lexicographical permutation
		"""
		# Find the largest index i such that nums[i] < nums[i + 1]
		pivot = -1
		for i in range(len(nums) - 2, -1, -1):
				if nums[i] < nums[i + 1]:
						pivot = i
						break
		
		# If no such index exists, reverse the entire array
		if pivot == -1:
				nums.reverse()
				return nums
		
		# Find the largest index j such that nums[j] > nums[pivot]
		successor = -1
		for j in range(len(nums) - 1, pivot, -1):
				if nums[j] > nums[pivot]:
						successor = j
						break
		
		# Swap nums[pivot] and nums[successor]
		nums[pivot], nums[successor] = nums[successor], nums[pivot]
		
		# Reverse the suffix starting at pivot + 1
		left = pivot + 1
		right = len(nums) - 1
		while left < right:
				nums[left], nums[right] = nums[right], nums[left]
				left += 1
				right -= 1
		
		return nums

if __name__ == '__main__':
		arr1 = [1, 2, 3]
		print('Input:', arr1)
		print('Next Permutation:', next_permutation(arr1[:]))
		
		arr2 = [3, 2, 1]
		print('\\nInput:', arr2)
		print('Next Permutation (wraps to smallest):', next_permutation(arr2[:]))
		
		arr3 = [1, 1, 5]
		print('\\nInput:', arr3)
		print('Next Permutation:', next_permutation(arr3[:]))
`,

	java: `// Next Permutation - Java (runnable)
import java.util.Arrays;

public class NextPermutationExample {
		
		public static void nextPermutation(int[] nums) {
				// Find the largest index i such that nums[i] < nums[i + 1]
				int pivot = -1;
				for (int i = nums.length - 2; i >= 0; i--) {
						if (nums[i] < nums[i + 1]) {
								pivot = i;
								break;
						}
				}
				
				// If no such index exists, reverse the entire array
				if (pivot == -1) {
						reverse(nums, 0, nums.length - 1);
						return;
				}
				
				// Find the largest index j such that nums[j] > nums[pivot]
				int successor = -1;
				for (int j = nums.length - 1; j > pivot; j--) {
						if (nums[j] > nums[pivot]) {
								successor = j;
								break;
						}
				}
				
				// Swap nums[pivot] and nums[successor]
				swap(nums, pivot, successor);
				
				// Reverse the suffix starting at pivot + 1
				reverse(nums, pivot + 1, nums.length - 1);
		}
		
		private static void swap(int[] nums, int i, int j) {
				int temp = nums[i];
				nums[i] = nums[j];
				nums[j] = temp;
		}
		
		private static void reverse(int[] nums, int left, int right) {
				while (left < right) {
						swap(nums, left, right);
						left++;
						right--;
				}
		}
		
		public static void main(String[] args) {
				int[] arr1 = {1, 2, 3};
				System.out.println("Input: " + Arrays.toString(arr1));
				nextPermutation(arr1);
				System.out.println("Next Permutation: " + Arrays.toString(arr1));
				
				int[] arr2 = {3, 2, 1};
				System.out.println("\\nInput: " + Arrays.toString(arr2));
				nextPermutation(arr2);
				System.out.println("Next Permutation (wraps to smallest): " + Arrays.toString(arr2));
				
				int[] arr3 = {1, 1, 5};
				System.out.println("\\nInput: " + Arrays.toString(arr3));
				nextPermutation(arr3);
				System.out.println("Next Permutation: " + Arrays.toString(arr3));
		}
}
`,

	'c#': `// Next Permutation - C# (runnable)
using System;

class NextPermutationExample {
	static void NextPermutation(int[] nums) {
		// Find the largest index i such that nums[i] < nums[i + 1]
		int pivot = -1;
		for (int i = nums.Length - 2; i >= 0; i--) {
			if (nums[i] < nums[i + 1]) {
				pivot = i;
				break;
			}
		}
		
		// If no such index exists, reverse the entire array
		if (pivot == -1) {
			Array.Reverse(nums);
			return;
		}
		
		// Find the largest index j such that nums[j] > nums[pivot]
		int successor = -1;
		for (int j = nums.Length - 1; j > pivot; j--) {
			if (nums[j] > nums[pivot]) {
				successor = j;
				break;
			}
		}
		
		// Swap nums[pivot] and nums[successor]
		(nums[pivot], nums[successor]) = (nums[successor], nums[pivot]);
		
		// Reverse the suffix starting at pivot + 1
		Array.Reverse(nums, pivot + 1, nums.Length - pivot - 1);
	}
	
	static void Main() {
		int[] arr1 = {1, 2, 3};
		Console.WriteLine("Input: " + string.Join(",", arr1));
		NextPermutation(arr1);
		Console.WriteLine("Next Permutation: " + string.Join(",", arr1));
		
		int[] arr2 = {3, 2, 1};
		Console.WriteLine("\\nInput: " + string.Join(",", arr2));
		NextPermutation(arr2);
		Console.WriteLine("Next Permutation (wraps to smallest): " + string.Join(",", arr2));
		
		int[] arr3 = {1, 1, 5};
		Console.WriteLine("\\nInput: " + string.Join(",", arr3));
		NextPermutation(arr3);
		Console.WriteLine("Next Permutation: " + string.Join(",", arr3));
	}
}
`,

	cpp: `// Next Permutation - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

void nextPermutation(vector<int>& nums) {
	// Find the largest index i such that nums[i] < nums[i + 1]
	int pivot = -1;
	for (int i = nums.size() - 2; i >= 0; i--) {
		if (nums[i] < nums[i + 1]) {
			pivot = i;
			break;
		}
	}
	
	// If no such index exists, reverse the entire array
	if (pivot == -1) {
		reverse(nums.begin(), nums.end());
		return;
	}
	
	// Find the largest index j such that nums[j] > nums[pivot]
	int successor = -1;
	for (int j = nums.size() - 1; j > pivot; j--) {
		if (nums[j] > nums[pivot]) {
			successor = j;
			break;
		}
	}
	
	// Swap nums[pivot] and nums[successor]
	swap(nums[pivot], nums[successor]);
	
	// Reverse the suffix starting at pivot + 1
	reverse(nums.begin() + pivot + 1, nums.end());
}

int main() {
	vector<int> arr1 = {1, 2, 3};
	cout << "Input: "; 
	for (int v: arr1) cout << v << ' '; 
	nextPermutation(arr1);
	cout << "\\nNext Permutation: ";
	for (int v: arr1) cout << v << ' ';
	
	vector<int> arr2 = {3, 2, 1};
	cout << "\\n\\nInput: ";
	for (int v: arr2) cout << v << ' ';
	nextPermutation(arr2);
	cout << "\\nNext Permutation (wraps to smallest): ";
	for (int v: arr2) cout << v << ' ';
	
	vector<int> arr3 = {1, 1, 5};
	cout << "\\n\\nInput: ";
	for (int v: arr3) cout << v << ' ';
	nextPermutation(arr3);
	cout << "\\nNext Permutation: ";
	for (int v: arr3) cout << v << ' ';
	cout << "\\n";
	
	return 0;
}
`,
};

export default codes;
