// Copyright (c) 2026 Saheli Mondal.

export const description =
  "Singly linked list creation: build a simple one-directional list supporting append operations.";

export const howItWorks = [
  "Create a Node object that holds a value and a next reference",
  "Maintain head and tail pointers on the list",
  "To append, create a node and link it to the tail, updating tail (or set head if list empty)",
];

export const timeComplexity = {
  best: "append: O(1)",
  average: "append: O(1)",
  worst: "append: O(1)",
};

export const spaceComplexity = "O(n)";

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
    // append node
    nodes.push({ value: arr[i], next: null, addr });
    // update previous next to this addr
    if (i > 0) {
      nodes[i - 1] = { ...nodes[i - 1], next: addr };
    }

    // Snapshot with value/next/address for this step
    steps.push({
      passNumber: i + 1,
      sorted: [],
      steps: [
        {
          // Show value and memory address (next) for clarity
          array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
          swapped: [],
          swapText: `Added ${arr[i]} (next pointers updated)`
        }
      ]
    });
  }

  return steps;
};

const codes = {
  javascript: `// Singly Linked List - Creation (JavaScript)
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

  toArray() {
    const out = [];
    let cur = this.head;
    while (cur) {
      out.push(cur.value);
      cur = cur.next;
    }
    return out;
  }
}

// Example usage:
const list = new SinglyLinkedList();
[1,2,3,4].forEach(v => list.append(v));
console.log('List values:', list.toArray());
`,

  python: `# Singly Linked List - Creation (Python)
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

    def to_list(self):
        out = []
        cur = self.head
        while cur:
            out.append(cur.value)
            cur = cur.next
        return out

if __name__ == '__main__':
    lst = SinglyLinkedList()
    for v in [1,2,3,4]:
        lst.append(v)
    print('List values:', lst.to_list())
`,

  java: `// Singly Linked List - Creation (Java)

import java.util.ArrayList;
import java.util.List;

// Helper class (NO main method here)
class Node {
    int value;
    Node next;

    Node(int v) {
        value = v;
        next = null;
    }
}

// Main class (Java starts from here)
public class SinglyLinkedList {

    Node head;
    Node tail;

    SinglyLinkedList() {
        head = null;
        tail = null;
    }

    // Add node at the end
    void append(int v) {
        Node node = new Node(v);

        if (head == null) {
            // First node
            head = tail = node;
        } else {
            // Link old tail to new node
            tail.next = node;
            // Move tail
            tail = node;
        }
    }

    // Convert linked list to normal list
    List<Integer> toList() {
        List<Integer> result = new ArrayList<>();
        Node current = head;

        while (current != null) {
            result.add(current.value);
            current = current.next;
        }

        return result;
    }

    // Program starts here
    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();

        int[] values = {1, 2, 3, 4};
        for (int v : values) {
            list.append(v);
        }

        System.out.println("List values: " + list.toList());
    }
}

`,

  'c#': `// Singly Linked List - Creation (C#)
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

    public List<int> ToList()
    {
        List<int> list = new();
        Node current = head;

        while (current != null)
        {
            list.Add(current.Value);
            current = current.Next;
        }

        return list;
    }

    static void Main()
    {
        var list = new SinglyLinkedList();
        int[] values = { 1, 2, 3, 4 };

        foreach (var v in values)
            list.Append(v);

        Console.WriteLine("List values: " + string.Join(",", list.ToList()));
    }
}

`,

  cpp: `// Singly Linked List - Creation (C++)
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
    vector<int> to_vector() {
        vector<int> out; 
        Node* cur = head; 
        while (cur) { 
            out.push_back(cur->value); 
            cur = cur->next; 
        } 
        return out;
    }
};

int main() {
    SinglyLinkedList l; 
    int vals[] = {1,2,3,4}; 
    for (int v: vals) l.append(v);
    auto v = l.to_vector(); 
    for (int x: v) cout << x << ' '; 
    cout << " ";
    return 0;
}
`,
};

export default codes;
