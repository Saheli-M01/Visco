// Copyright (c) 2026 Saheli Mondal.

export const description = "Kadane's Algorithm finds the contiguous subarray with the largest sum in linear time.";

export const howItWorks = [
	"Iterate once through the array maintaining a running current sum.",
	"At each element, add it to the current sum or start a new subarray at the current element if that gives a larger sum.",
	"Track the maximum sum seen so far while scanning.",
	"Optionally track start/end indices to recover the subarray itself.",
];

export const timeComplexity = {
	best: "O(n)",
	average: "O(n)",
	worst: "O(n)",
};

export const spaceComplexity = "O(1)";

// Example array and walkthrough steps for visualization
export const exampleArray = [-2, -3, 4, -1, -2, 1, 5, -3];

export const generateExampleSteps = () => {
	const arr = [...exampleArray];
	const steps = [];
	let maxEndingHere = arr[0];
	let maxSoFar = arr[0];
	let start = 0, end = 0, s = 0;

	// Pass 1: initialize
	steps.push({
		passNumber: 1,
		steps: [
			{
				array: [...arr],
				swapped: [0],
				swapText: `init: maxEndingHere=${arr[0]}, maxSoFar=${arr[0]}`,
				sorted: [],
			},
		],
		sorted: [],
	});

	let pass = 2;
	for (let i = 1; i < arr.length; i++) {
		const takeAlone = arr[i];
		const extend = maxEndingHere + arr[i];
		if (takeAlone > extend) {
			maxEndingHere = takeAlone;
			s = i;
		} else {
			maxEndingHere = extend;
		}
		if (maxEndingHere > maxSoFar) {
			maxSoFar = maxEndingHere;
			start = s;
			end = i;
		}
		// Create a pass block highlighting current index and current best subarray window
		const swapped = [i];
		const sorted = [];
		steps.push({
			passNumber: pass++,
			steps: [
				{
					array: [...arr],
					swapped,
					swapText: `i=${i}: maxEndingHere=${maxEndingHere}, maxSoFar=${maxSoFar} (window ${start}-${end})`,
					sorted,
				},
			],
			sorted,
		});
	}

	// Final pass: mark the best window indices as sorted/confirmed
	steps.push({
		passNumber: pass,
		steps: [
			{
				array: [...arr],
				swapped: [],
				swapText: `Best subarray sum=${maxSoFar}, window=${start}-${end}`,
				sorted: Array.from({ length: arr.length }, (_, idx) => (idx >= start && idx <= end ? idx : null)).filter(
					(v) => v !== null
				),
			},
		],
		sorted: Array.from({ length: arr.length }, (_, idx) => (idx >= start && idx <= end ? idx : null)).filter(
			(v) => v !== null
		),
	});

	return steps;
};


const codes = {
	javascript: `// Kadane's Algorithm - JavaScript (runnable)
function kadane(arr) {
	if (!arr || arr.length === 0) return 0;
	let maxEndingHere = arr[0];
	let maxSoFar = arr[0];
	let start = 0, end = 0, s = 0;
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > maxEndingHere + arr[i]) {
			maxEndingHere = arr[i];
			s = i;
		} else {
			maxEndingHere += arr[i];
		}

		if (maxEndingHere > maxSoFar) {
			maxSoFar = maxEndingHere;
			start = s;
			end = i;
		}
	}
	return { maxSum: maxSoFar, start, end };
}

// Example usage
const arr = [-2, -3, 4, -1, -2, 1, 5, -3];
console.log('Array:', arr);
console.log('Max subarray (sum and indices):', kadane(arr));
`,

	python: `# Kadane's Algorithm - Python (runnable)
def kadane(arr):
		if not arr:
				return 0
		max_ending_here = max_so_far = arr[0]
		start = end = s = 0
		for i in range(1, len(arr)):
				if arr[i] > max_ending_here + arr[i]:
						max_ending_here = arr[i]
						s = i
				else:
						max_ending_here += arr[i]

				if max_ending_here > max_so_far:
						max_so_far = max_ending_here
						start = s
						end = i
		return {"maxSum": max_so_far, "start": start, "end": end}

if __name__ == '__main__':
		arr = [-2, -3, 4, -1, -2, 1, 5, -3]
		print('Array:', arr)
		print('Max subarray (sum and indices):', kadane(arr))
`,

	java: `// Kadane's Algorithm - Java (runnable)
import java.util.Arrays;

public class KadaneExample {
		static class Result { int maxSum, start, end; Result(int m, int s, int e){maxSum=m;start=s;end=e;} }

		static Result kadane(int[] arr) {
				if (arr == null || arr.length == 0) return new Result(0, -1, -1);
				int maxEnding = arr[0], maxSoFar = arr[0];
				int start = 0, end = 0, s = 0;
				for (int i = 1; i < arr.length; i++) {
						if (arr[i] > maxEnding + arr[i]) { maxEnding = arr[i]; s = i; }
						else { maxEnding += arr[i]; }
						if (maxEnding > maxSoFar) { maxSoFar = maxEnding; start = s; end = i; }
				}
				return new Result(maxSoFar, start, end);
		}

		public static void main(String[] args) {
				int[] arr = {-2, -3, 4, -1, -2, 1, 5, -3};
				Result res = kadane(arr);
				System.out.println("Array: " + Arrays.toString(arr));
				System.out.println("Max subarray (sum and indices): " + res.maxSum + " [" + res.start + "," + res.end + "]");
		}
}
`,

	'c#': `// Kadane's Algorithm - C# (runnable)
using System;

class KadaneExample {
	static (int maxSum, int start, int end) Kadane(int[] arr) {
		if (arr == null || arr.Length == 0) return (0, -1, -1);
		int maxEnding = arr[0], maxSoFar = arr[0];
		int start = 0, end = 0, s = 0;
		for (int i = 1; i < arr.Length; i++) {
			if (arr[i] > maxEnding + arr[i]) { maxEnding = arr[i]; s = i; }
			else { maxEnding += arr[i]; }
			if (maxEnding > maxSoFar) { maxSoFar = maxEnding; start = s; end = i; }
		}
		return (maxSoFar, start, end);
	}

	static void Main() {
		int[] arr = {-2, -3, 4, -1, -2, 1, 5, -3};
		var res = Kadane(arr);
		Console.WriteLine("Array: " + string.Join(",", arr));
		Console.WriteLine($"Max subarray (sum and indices): {res.maxSum} [{res.start},{res.end}]");
	}
}
`,

	cpp: `// Kadane's Algorithm - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

tuple<int,int,int> kadane(const vector<int>& arr) {
	if (arr.empty()) return {0, -1, -1};
	int maxEnding = arr[0], maxSoFar = arr[0];
	int start = 0, end = 0, s = 0;
	for (size_t i = 1; i < arr.size(); ++i) {
		if (arr[i] > maxEnding + arr[i]) { maxEnding = arr[i]; s = i; }
		else { maxEnding += arr[i]; }
		if (maxEnding > maxSoFar) { maxSoFar = maxEnding; start = s; end = i; }
	}
	return {maxSoFar, start, end};
}

int main() {
	vector<int> arr = {-2, -3, 4, -1, -2, 1, 5, -3};
	auto [maxSum, start, end] = kadane(arr);
	cout << "Array: "; for (int v: arr) cout << v << ' '; cout << "\n";
	cout << "Max subarray (sum and indices): " << maxSum << " [" << start << "," << end << "]\n";
	return 0;
}
`,
};

export default codes;

