export const description =
	"Assume the array is partitioned by indices: [0..low-1] are 0s, [low..mid-1] are 1s, [mid..high] is the unsorted segment, and [high+1..n-1] are 2s. The algorithm sorts the unsorted segment in a single pass using constant extra space (Dutch National Flag).";

export const howItWorks = [
	"Invariant: indices 0..(low-1) contain 0, low..(mid-1) contain 1, mid..high is unsorted, and (high+1)..(n-1) contain 2.",
	"Inspect the element at `mid`:",
	"- If it's 0: swap arr[mid] with arr[low], then increment both low and mid (expands 0-region and shifts unsorted window).",
	"- If it's 1: increment mid (expands 1-region).",
	"- If it's 2: swap arr[mid] with arr[high], then decrement high (expands 2-region at the end; do NOT increment mid because the new arr[mid] is from the unsorted segment).",
	"Repeat until mid > high, at which point the invariant implies the whole array is partitioned as 0s, 1s, then 2s.",
];
// Example array used for walkthrough
export const exampleArray = [2, 0, 2, 1, 1, 0];
export function generateExampleSteps(arr = exampleArray) {
	const a = [...arr];
	let low = 0, mid = 0, high = a.length - 1;
	const passes = [];
	let passNumber = 1;

	const pushPass = (swapText, swappedIdxs) => {
		passes.push({
			passNumber: passNumber++,
			steps: [
				{
					array: [...a],
					swapped: swappedIdxs,
					swapText,
					sorted: [],
				},
			],
			sorted: [],
		});
	};

	while (mid <= high) {
		if (a[mid] === 0) {
			const prevLow = low, prevMid = mid;
			[a[low], a[mid]] = [a[mid], a[low]];
			pushPass(`Swap 0 up: swap index ${prevLow} and ${prevMid}`,[prevLow, prevMid]);
			low++; mid++;
		} else if (a[mid] === 1) {
			const prevMid = mid;
			pushPass(`Keep 1 in middle: move mid from ${prevMid} → ${prevMid + 1}`,[prevMid]);
			mid++;
		} else { // a[mid] === 2
			const prevMid = mid, prevHigh = high;
			[a[mid], a[high]] = [a[high], a[mid]];
			pushPass(`Swap 2 down: swap index ${prevMid} and ${prevHigh}`,[prevMid, prevHigh]);
			high--;
		}
	}

	// Final sorted state block
	passes.push({
		passNumber: passNumber,
		steps: [
			{
				array: [...a],
				swapped: [],
				swapText: 'Sorted ✓',
				sorted: a.map((_, idx) => idx),
			},
		],
		sorted: a.map((_, idx) => idx),
	});

	return passes;
}
export const timeComplexity = {
	best: "O(n)",
	average: "O(n)",
	worst: "O(n)",
};

export const spaceComplexity = "O(1)";

const codes = {
	javascript: `// Dutch National Flag (JavaScript)
function dutchFlag(arr) {
	let low = 0;
	let mid = 0;
	let high = arr.length - 1;
	while (mid <= high) {
		if (arr[mid] === 0) {
			[arr[low], arr[mid]] = [arr[mid], arr[low]];
			low++; mid++;
		} else if (arr[mid] === 1) {
			mid++;
		} else {
			[arr[mid], arr[high]] = [arr[high], arr[mid]];
			high--;
		}
	}
}

// Example
const arr = [2,0,1,2,1,0,0,2];
dutchFlag(arr);
console.log(arr); // [0,0,0,1,1,2,2,2]
`,

	python: `# Dutch National Flag (Python)
def dutch_flag(arr):
		low = 0
		mid = 0
		high = len(arr) - 1
		while mid <= high:
				if arr[mid] == 0:
						arr[low], arr[mid] = arr[mid], arr[low]
						low += 1
						mid += 1
				elif arr[mid] == 1:
						mid += 1
				else:
						arr[mid], arr[high] = arr[high], arr[mid]
						high -= 1

if __name__ == '__main__':
		arr = [2,0,1,2,1,0,0,2]
		dutch_flag(arr)
		print(arr)  # [0,0,0,1,1,2,2,2]
`,

	java: `// Dutch National Flag (Java)
import java.util.Arrays;

public class DutchFlag {
		public static void dutchFlag(int[] arr) {
				int low = 0, mid = 0, high = arr.length - 1;
				while (mid <= high) {
						if (arr[mid] == 0) {
								int tmp = arr[low]; arr[low] = arr[mid]; arr[mid] = tmp;
								low++; mid++;
						} else if (arr[mid] == 1) {
								mid++;
						} else {
								int tmp = arr[mid]; arr[mid] = arr[high]; arr[high] = tmp;
								high--;
						}
				}
		}

		public static void main(String[] args) {
				int[] arr = {2,0,1,2,1,0,0,2};
				dutchFlag(arr);
				System.out.println(Arrays.toString(arr));
		}
}
`,

	'c#': `// Dutch National Flag (C#)
using System;

class DutchFlagExample {
	static void DutchFlag(int[] arr) {
		int low = 0, mid = 0, high = arr.Length - 1;
		while (mid <= high) {
			if (arr[mid] == 0) {
				int tmp = arr[low]; arr[low] = arr[mid]; arr[mid] = tmp;
				low++; mid++;
			} else if (arr[mid] == 1) {
				mid++;
			} else {
				int tmp = arr[mid]; arr[mid] = arr[high]; arr[high] = tmp;
				high--;
			}
		}
	}

	static void Main() {
		int[] arr = {2,0,1,2,1,0,0,2};
		DutchFlag(arr);
		Console.WriteLine(string.Join(",", arr));
	}
}
`,

	cpp: `// Dutch National Flag (C++)
#include <bits/stdc++.h>
using namespace std;

void dutchFlag(vector<int>& arr) {
	int low = 0, mid = 0, high = (int)arr.size() - 1;
	while (mid <= high) {
		if (arr[mid] == 0) { swap(arr[low++], arr[mid++]); }
		else if (arr[mid] == 1) { mid++; }
		else { swap(arr[mid], arr[high--]); }
	}
}

int main() {
	vector<int> arr = {2,0,1,2,1,0,0,2};
	dutchFlag(arr);
	for (int v: arr) cout << v << ' ';
	cout << '\n';
	return 0;
}
`,
};

export default codes;
