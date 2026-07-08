export const description =
	"Singly linked list deletion: remove a node at a specified position (head, tail, kth position) or the node before a specific value.";

export const howItWorks = [
	"For head deletion: move head to head.next",
	"For tail deletion: traverse to the node before tail and set its next to null",
	"For kth deletion: traverse to (k-1) and unlink its next",
	"For delete-before-value: find the node that precedes the first occurrence of the target and remove it",
];

export const timeComplexity = {
	best: "O(1) for head deletion",
	average: "O(n) for tail/kth/delete-before-value",
	worst: "O(n)",
};

export const spaceComplexity = "O(1)";

export const exampleArray = [1];

export const generateExampleSteps = (target) => {
	const steps = [];
	const addrForIndex = (idx) => {
		const base = 0xa0b000 + idx * 0x101;
		return "0x" + base.toString(16).toUpperCase();
	};

	// initial state example
	let nodes = [{ value: 1, next: null, addr: addrForIndex(0) }];
	steps.push({
		passNumber: "Initial State",
		sorted: [],
		steps: [
			{
				array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
				swapped: [],
				swapText: "Original list: 1",
			},
		],
	});

	// delete head example (1 element -> empty)
	nodes = [{ value: 1, next: null, addr: addrForIndex(0) }];
	steps.push({
		passNumber: "Delete Head",
		sorted: [],
		steps: [
			{
				array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
				swapped: [],
				deleteNode: nodes[0],
				swapText: "Deleted head (1)",
			},
		],
	});

	return steps;
};

const codes = {
	javascript: `// Singly Linked List - Deletion (JavaScript)
class Node {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

class SinglyLinkedList {
	constructor() {
		this.head = null;
		this.tail = null;
		this.size = 0;
	}

	deleteHead() {
		if (!this.head) return null;
		this.head = this.head.next;
		if (!this.head) this.tail = null;
		this.size--;
	}

	deleteTail() {
		if (!this.head) return null;
		if (this.head === this.tail) {
			this.head = this.tail = null;
			this.size = 0;
			return;
		}
		let current = this.head;
		while (current.next !== this.tail) current = current.next;
		current.next = null;
		this.tail = current;
		this.size--;
	}

	// delete node before the first node matching targetValue
	deleteBeforeValue(targetValue) {
		if (!this.head || this.head.value === targetValue) return;
		let prev = null;
		let current = this.head;
		while (current && current.next && current.next.value !== targetValue) {
			prev = current;
			current = current.next;
		}
		if (!current || !current.next) return;
		// current is the node before targetValue; delete current
		if (prev === null) {
			this.head = current.next;
		} else {
			prev.next = current.next;
		}
		this.size--;
	}
`,
};

export default codes;

