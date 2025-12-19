export const description =
  "Singly linked list traversal: visit each node in the list sequentially from head to tail.";

export const howItWorks = [
  "Start at the head pointer",
  "Visit each node's value while the current pointer is not null",
  "Move to the next node using the current.next reference",
  "Continue until reaching the end (null)",
];

export const timeComplexity = {
  best: "O(n)",
  average: "O(n)",
  worst: "O(n)",
};

export const spaceComplexity = "O(1)";

// Example data for visualization
export const exampleArray = [1, 2, 3];

export const generateExampleSteps = (target) => {
  const steps = [];
  const arr = [1, 2, 3];

  const addrForIndex = (idx) => {
    const base = 0xa0b000 + idx * 0x101;
    return "0x" + base.toString(16).toUpperCase();
  };

  const nodes = [];

  for (let i = 0; i < arr.length; i++) {
    const addr = addrForIndex(i);
    nodes.push({ value: arr[i], next: i < arr.length - 1 ? addrForIndex(i + 1) : "null", addr });
  }

  for (let i = 0; i < arr.length; i++) {
    steps.push({
      passNumber: i + 1,
      sorted: [],
      steps: [
        {
          array: nodes.map((n, idx) => `${n.value} (next: ${n.next})`),
          swapped: [i],
          swapText: `Visiting node ${i}: value = ${arr[i]}`
        }
      ]
    });
  }

  return steps;
};

const codes = {
  javascript: `// Singly Linked List - Traversal (JavaScript)
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
  }

  append(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
      this.tail = node;
    } else {
      this.tail.next = node;
      this.tail = node;
    }
  }

  traverse() {
    let current = this.head;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
}

// Example usage:
const list = new SinglyLinkedList();
[1,2,3,4].forEach(v => list.append(v));
console.log('Traversing list:');
list.traverse();
`,

  python: `# Singly Linked List - Traversal (Python)
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None

    def append(self, value):
        node = Node(value)
        if not self.head:
            self.head = node
            self.tail = node
        else:
            self.tail.next = node
            self.tail = node

    def traverse(self):
        current = self.head
        while current:
            print(current.value)
            current = current.next

if __name__ == '__main__':
    lst = SinglyLinkedList()
    for v in [1,2,3,4]:
        lst.append(v)
    print('Traversing list:')
    lst.traverse()
`,

  java: `// Singly Linked List - Traversal (Java)

class Node {
    int value;
    Node next;

    Node(int v) {
        value = v;
        next = null;
    }
}

public class SinglyLinkedList {

    Node head;
    Node tail;

    SinglyLinkedList() {
        head = null;
        tail = null;
    }

    void append(int v) {
        Node node = new Node(v);

        if (head == null) {
            head = tail = node;
        } else {
            tail.next = node;
            tail = node;
        }
    }

    void traverse() {
        Node current = head;

        while (current != null) {
            System.out.println(current.value);
            current = current.next;
        }
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();

        int[] values = {1, 2, 3, 4};
        for (int v : values) {
            list.append(v);
        }

        System.out.println("Traversing list:");
        list.traverse();
    }
}

`,

  'c#': `// Singly Linked List - Traversal (C#)
using System;
using System.Collections.Generic;

class Node
{
    public int Value;
    public Node Next;

    public Node(int value)
    {
        Value = value;
        Next = null;
    }
}

class SinglyLinkedList
{
    private Node head;
    private Node tail;

    public void Append(int value)
    {
        var newNode = new Node(value);

        if (head == null)
            head = tail = newNode;
        else
        {
            tail.Next = newNode;
            tail = newNode;
        }
    }

    public void Traverse()
    {
        Node current = head;

        while (current != null)
        {
            Console.WriteLine(current.Value);
            current = current.Next;
        }
    }

    static void Main()
    {
        var list = new SinglyLinkedList();
        int[] values = { 1, 2, 3, 4 };

        foreach (var v in values)
            list.Append(v);

        Console.WriteLine("Traversing list:");
        list.Traverse();
    }
}

`,

  cpp: `// Singly Linked List - Traversal (C++)
#include <bits/stdc++.h>
using namespace std;

struct Node { 
    int value; 
    Node* next; 
    Node(int v): value(v), next(nullptr) {} 
};

struct SinglyLinkedList {
    Node* head; 
    Node* tail;
    SinglyLinkedList(): head(nullptr), tail(nullptr) {}
    void append(int v) {
        Node* node = new Node(v);
        if (!head) head = tail = node;
        else { tail->next = node; tail = node; }
    }
    void traverse() {
        Node* cur = head; 
        while (cur) { 
            cout << cur->value << ' '; 
            cur = cur->next; 
        } 
        cout << " ";
    }
};

int main() {
    SinglyLinkedList l; 
    int vals[] = {1,2,3,4}; 
    for (int v: vals) l.append(v);
    cout << "Traversing list: ";
    l.traverse(); 
    return 0;
}
`,
};

export default codes;
