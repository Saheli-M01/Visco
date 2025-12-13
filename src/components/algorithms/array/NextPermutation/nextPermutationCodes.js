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

// Example array and walkthrough steps for visualization
export const exampleArray = [1, 3, 5, 4, 2];

export const generateExampleSteps = () => {
    const arr = [...exampleArray];
    const steps = [];

    // Find pivot (rightmost index where arr[i] < arr[i+1])
    let pivot = -1;
    for (let i = arr.length - 2; i >= 0; i--) {
        if (arr[i] < arr[i + 1]) {
            pivot = i;
            break;
        }
    }

    if (pivot === -1) {
        steps.push({
            array: [...arr],
            swapped: [],
            swapText: "array in descending order → reverse to smallest",
            sorted: [],
        });
        steps.push({
            array: [...arr].reverse(),
            swapped: [],
            swapText: "reversed array (smallest permutation)",
            sorted: [],
        });
        return [
            {
                passNumber: 1,
                steps,
                sorted: [],
            },
        ];
    }

    // Step 1: identify pivot
    steps.push({
        array: [...arr],
        swapped: [pivot],
        swapText: `pivot at index ${pivot} (value ${arr[pivot]})`,
        sorted: [],
    });

    // Step 2: find successor (rightmost element greater than pivot) and swap
    let successor = pivot + 1;
    for (let j = arr.length - 1; j > pivot; j--) {
        if (arr[j] > arr[pivot]) {
            successor = j;
            break;
        }
    }
    [arr[pivot], arr[successor]] = [arr[successor], arr[pivot]];
    steps.push({
        array: [...arr],
        swapped: [pivot, successor],
        swapText: `swap pivot with successor at index ${successor} (value ${arr[pivot]})`,
        sorted: [],
    });

    // Step 3: reverse suffix after pivot
    let left = pivot + 1;
    let right = arr.length - 1;
    while (left < right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right--;
    }
    steps.push({
        array: [...arr],
        swapped: [],
        swapText: `reverse suffix after index ${pivot} to finalize next permutation`,
        sorted: [],
    });

    return [
        {
            passNumber: 1,
            steps,
            sorted: [],
        },
    ];
};



const codes = {
	javascript: `
function nextPermutation(nums) {
	const n = nums.length;
	// Find the largest index i such that nums[i] < nums[i + 1]
	let pivot = -1;
	for (let i = n - 2; i >= 0; i--) {
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
	for (let j = n - 1; j > pivot; j--) {
		if (nums[j] > nums[pivot]) {
			[nums[j], nums[pivot]] = [nums[pivot], nums[j]];
			break;
		}
	}

	// Reverse the right half to get the next smallest permutation
	let left = pivot + 1;
	let right = n - 1;
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

	python: `
def next_permutation(nums):
		"""
		Modify nums in-place to the next lexicographical permutation
		"""
		n = len(nums)
		ind = -1
		# Find the first index from the end where nums[i] < nums[i+1]
		for i in range(len(nums) - 2, -1, -1):
			if nums[i] < nums[i + 1]:
				ind = i
				break
		
		# If no such index exists, reverse the entire array
		if ind == -1:
			nums.reverse()
			return nums
		
		# Find the element just greater than nums[ind] from the end
		successor = -1
		for i in range(n-1, ind, -1):
			if nums[i] > nums[ind]:
				nums[i], nums[ind] = nums[ind], nums[i]
				break
		
		# Reverse the right half to get the next smallest permutation
		nums[ind+1:] = reversed(nums[ind+1:])
		return

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

	java: `
	class Solution {
    // Function to get the next permutation of given array
    public void nextPermutation(int[] nums) {
        int n = nums.length; // Size of the given array
        
        // To store the index of the first smaller element from right
        int ind = -1; 
        
        // Find the first index from the end where nums[i] < nums[i+1]
        for(int i = n - 2; i >= 0; i--) {
            if(nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }
        
        /* If no such index exists, array is in descending order
           So, reverse it to get the smallest permutation */
        if(ind == -1) {
            reverse(nums, 0, n - 1);
            return;
        }
        
        // Find the element just greater than nums[ind] from the end
        for(int i = n - 1; i > ind; i--) {
            if(nums[i] > nums[ind]) {
                swap(nums, i, ind); // Swap with nums[ind]
                break;
            }
        }
        
        // Reverse the right half to get the next smallest permutation
        reverse(nums, ind + 1, n - 1);
        return;
    }
    
    // Helper Function to swap two numbers in an array
    private void swap(int[] nums, int i, int j) {
        int temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
    // Helper function to reverse the array
    private void reverse(int[] nums, int start, int end) {
        while(start < end) {
            swap(nums, start, end);
            start++;
            end--;
        }
    }
}
`,

	'c#': `
using System;
using System.Collections.Generic;
using System.Linq;

public class Solution {
    // Function to get the next permutation of given array
    public void NextPermutation(List<int> nums) {
        int n = nums.Count; // Size of the given array
        
        // To store the index of the first smaller element from right
        int ind = -1;
        
        // Find the first index from the end where nums[i] < nums[i+1]
        for(int i = n - 2; i >= 0; i--) {
            if(nums[i] < nums[i + 1]) {
                ind = i;
                break;
            }
        }
        
        /* If no such index exists, array is in descending order
           So, reverse it to get the smallest permutation */
        if(ind == -1) {
            nums.Reverse();
            return;
        }
        
        // Find the element just greater than nums[ind] from the end
        for(int i = n - 1; i > ind; i--) {
            if(nums[i] > nums[ind]) {
                // Swap with nums[ind]
                int temp = nums[i];
                nums[i] = nums[ind];
                nums[ind] = temp;
                break;
            }
        }
        
        // Reverse the right half to get the next smallest permutation
        int left = ind + 1, right = n - 1;
        while(left < right) {
            int temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
            left++;
            right--;
        }
        return;
    }
}

public class Program {
    public static void Main(string[] args) {
        List<int> nums = new List<int> {1, 2, 3};

        /* Creating an instance of 
           Solution class */
        Solution sol = new Solution();

        // Output the original array
        Console.Write("Given array: ");
        foreach(int x in nums) {
            Console.Write(x + " ");
        }

        // Function call to get the next permutation of given array
        sol.NextPermutation(nums);

        // Output the next permutation
        Console.Write("\nNext Permutation: ");
        foreach(int x in nums) {
            Console.Write(x + " ");
        }
        Console.WriteLine(); // Add a newline at the end for cleaner output
    }
}
`,

	cpp: `
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    // Function to get the next permutation of given array
    void nextPermutation(vector<int>& nums) {
        int n = nums.size(); // Size of the given array
        
        // To store the index of the first smaller element from right
        int ind = -1; 
        
        // Find the first index from the end where nums[i] < nums[i+1]
        for(int i = n-2; i >= 0; i--) {
            if(nums[i] < nums[i+1]) {
                ind = i;
                break;
            }
        }
        
        /* If no such index exists, array is in descending order
         So, reverse it to get the smallest permutation */
        if(ind == -1) {
            reverse(nums.begin(), nums.end());
            return;
        }
        
        // Find the element just greater than nums[ind] from the end
        for(int i = n-1; i > ind; i--) {
            if(nums[i] > nums[ind]) {
                swap(nums[i], nums[ind]); // Swap with nums[ind]
                break;
            }
        }
        
        // Reverse the right half to get the next smallest permutation
        reverse(nums.begin() + ind + 1, nums.end());
        return;
    }
};

int main() {
    vector<int> nums = {1, 2, 3};
    
    /* Creating an instance of 
    Solution class */
    Solution sol; 
    
    // Output the original array
    cout << "Given array: ";
    for(int x : nums) cout << x << " ";
    
    // Function call to get the next permutation of given array
    sol.nextPermutation(nums);
    
    // Output the next permutation
    cout << "\nNext Permutation: ";
    for(int x : nums) cout << x << " ";
    
    return 0;
}

`,
};

export default codes;
