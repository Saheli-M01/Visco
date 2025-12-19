export const description =
  "Singly linked list insertion: add a new node at a specified position (head, tail, middle, or kth position).";

export const howItWorks = [
  "Create a new node with the given value",
  "For head insertion: link new node to current head and update head",
  "For tail insertion: link current tail to new node and update tail",
  "For middle/kth insertion: traverse to position, link new node between nodes",
];

export const timeComplexity = {
  best: "O(1) for head/tail insertion",
  average: "O(n) for middle/kth position",
  worst: "O(n) for middle/kth position",
};

export const spaceComplexity = "O(1)";

// Example data for visualization
export const exampleArray = [1];

export const generateExampleSteps = (target) => {
  const steps = [];
  
  const addrForIndex = (idx) => {
    const base = 0xa0b000 + idx * 0x101;
    return "0x" + base.toString(16).toUpperCase();
  };

  // Step 1: Initial list [1, 2, 4]
  let nodes = [

    { value: 1, next: null, addr: addrForIndex(0) }
  ];

  steps.push({
    passNumber: "Initial State",
    sorted: [],
    steps: [{
      array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
      swapped: [],
      swapText: "Original list: 1 "
    }]
  });

  // Step 2: Insert 2 at head
  nodes = [
    { value: 2, next: addrForIndex(1), addr: addrForIndex(0) },
    { value: 1, next: null, addr: addrForIndex(1) }
  ];

  steps.push({
    passNumber: "Insert at Head",
    sorted: [],
    steps: [{
      array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
      swapped: [],
      // point to the actual new node object so visualizer can detect by reference
      newNode: nodes[0],
      swapText: "Inserted 2 at head"
    }]
  });

  // Step 3: Insert 3 at tail -> list becomes 2 -> 1 -> 3
  nodes = [
    { value: 2, next: addrForIndex(1), addr: addrForIndex(0) },
    { value: 1, next: addrForIndex(2), addr: addrForIndex(1) },
    { value: 3, next: null, addr: addrForIndex(2) }
  ];

  steps.push({
    passNumber: "Insert at Tail",
    sorted: [],
    steps: [{
      array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
      swapped: [],
      newNode: nodes[2],
      swapText: "Inserted 3 at tail"
    }]
  });

  // Step 4: Insert 4 at position 1 -> list becomes 2 -> 4 -> 1 -> 3
  nodes = [
    { value: 1, next: addrForIndex(1), addr: addrForIndex(0) },
    { value: 4, next: addrForIndex(2), addr: addrForIndex(1) },
    { value: 2, next: null, addr: addrForIndex(3) }
  ];

  steps.push({
    passNumber: "Insert at Position 1",
    sorted: [],
    steps: [{
      array: nodes.map((n) => `${n.value} (next: ${n.next ?? "null"})`),
      swapped: [],
      newNode: nodes[1],
      swapText: "Inserted 4 at position 1. Original LL: 1-> 2"
    }]
  });

  return steps;
};

const codes = {
  javascript: `// Singly Linked List - Insertion (JavaScript)
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

  // Insert at head
  insertAtHead(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.size++;
  }

  // Insert at tail
  insertAtTail(value) {
    const newNode = new Node(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  // Insert at position (0-indexed)
  insertAtPosition(value, position) {
    if (position < 0 || position > this.size) {
      throw new Error('Invalid position');
    }
    if (position === 0) {
      this.insertAtHead(value);
      return;
    }
    if (position === this.size) {
      this.insertAtTail(value);
      return;
    }

    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < position - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  display() {
    let current = this.head;
    const values = [];
    while (current) {
      values.push(current.value);
      current = current.next;
    }
    console.log(values.join(' -> '));
  }
}

// Example usage:
const list = new SinglyLinkedList();
list.insertAtTail(1);
list.insertAtTail(2);
list.insertAtTail(4);
list.display(); // 1 -> 2 -> 4

list.insertAtPosition(3, 2); // Insert 3 at position 2
list.display(); // 1 -> 2 -> 3 -> 4

list.insertAtHead(0);
list.display(); // 0 -> 1 -> 2 -> 3 -> 4
`,

  python: `# Singly Linked List - Insertion (Python)
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def insert_at_head(self, value):
        """Insert a node at the beginning"""
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.next = self.head
            self.head = new_node
        self.size += 1

    def insert_at_tail(self, value):
        """Insert a node at the end"""
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def insert_at_position(self, value, position):
        """Insert at specific position (0-indexed)"""
        if position < 0 or position > self.size:
            raise ValueError('Invalid position')
        
        if position == 0:
            self.insert_at_head(value)
            return
        
        if position == self.size:
            self.insert_at_tail(value)
            return

        new_node = Node(value)
        current = self.head
        for _ in range(position - 1):
            current = current.next
        
        new_node.next = current.next
        current.next = new_node
        self.size += 1

    def display(self):
        """Display the linked list"""
        current = self.head
        values = []
        while current:
            values.append(str(current.value))
            current = current.next
        print(' -> '.join(values))

# Example usage:
if __name__ == '__main__':
    lst = SinglyLinkedList()
    lst.insert_at_tail(1)
    lst.insert_at_tail(2)
    lst.insert_at_tail(4)
    lst.display()  # 1 -> 2 -> 4
    
    lst.insert_at_position(3, 2)  # Insert 3 at position 2
    lst.display()  # 1 -> 2 -> 3 -> 4
    
    lst.insert_at_head(0)
    lst.display()  # 0 -> 1 -> 2 -> 3 -> 4
`,

  java: `// Singly Linked List - Insertion (Java)

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
    int size;

    SinglyLinkedList() {
        head = null;
        tail = null;
        size = 0;
    }

    // Insert at head
    void insertAtHead(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.next = head;
            head = newNode;
        }
        size++;
    }

    // Insert at tail
    void insertAtTail(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }

    // Insert at position (0-indexed)
    void insertAtPosition(int value, int position) {
        if (position < 0 || position > size) {
            throw new IllegalArgumentException("Invalid position");
        }
        
        if (position == 0) {
            insertAtHead(value);
            return;
        }
        
        if (position == size) {
            insertAtTail(value);
            return;
        }

        Node newNode = new Node(value);
        Node current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current.next;
        }
        newNode.next = current.next;
        current.next = newNode;
        size++;
    }

    void display() {
        Node current = head;
        while (current != null) {
            System.out.print(current.value);
            if (current.next != null) System.out.print(" -> ");
            current = current.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        SinglyLinkedList list = new SinglyLinkedList();
        list.insertAtTail(1);
        list.insertAtTail(2);
        list.insertAtTail(4);
        list.display(); // 1 -> 2 -> 4

        list.insertAtPosition(3, 2);
        list.display(); // 1 -> 2 -> 3 -> 4

        list.insertAtHead(0);
        list.display(); // 0 -> 1 -> 2 -> 3 -> 4
    }
}
`,

  cpp: `// Singly Linked List - Insertion (C++)
#include <iostream>
using namespace std;

class Node {
public:
    int value;
    Node* next;

    Node(int v) : value(v), next(nullptr) {}
};

class SinglyLinkedList {
private:
    Node* head;
    Node* tail;
    int size;

public:
    SinglyLinkedList() : head(nullptr), tail(nullptr), size(0) {}

    // Insert at head
    void insertAtHead(int value) {
        Node* newNode = new Node(value);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            newNode->next = head;
            head = newNode;
        }
        size++;
    }

    // Insert at tail
    void insertAtTail(int value) {
        Node* newNode = new Node(value);
        if (head == nullptr) {
            head = newNode;
            tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }

    // Insert at position (0-indexed)
    void insertAtPosition(int value, int position) {
        if (position < 0 || position > size) {
            throw invalid_argument("Invalid position");
        }

        if (position == 0) {
            insertAtHead(value);
            return;
        }

        if (position == size) {
            insertAtTail(value);
            return;
        }

        Node* newNode = new Node(value);
        Node* current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current->next;
        }
        newNode->next = current->next;
        current->next = newNode;
        size++;
    }

    void display() {
        Node* current = head;
        while (current != nullptr) {
            cout << current->value;
            if (current->next != nullptr) cout << " -> ";
            current = current->next;
        }
        cout << endl;
    }

    ~SinglyLinkedList() {
        Node* current = head;
        while (current != nullptr) {
            Node* temp = current;
            current = current->next;
            delete temp;
        }
    }
};

int main() {
    SinglyLinkedList list;
    list.insertAtTail(1);
    list.insertAtTail(2);
    list.insertAtTail(4);
    list.display(); // 1 -> 2 -> 4

    list.insertAtPosition(3, 2);
    list.display(); // 1 -> 2 -> 3 -> 4

    list.insertAtHead(0);
    list.display(); // 0 -> 1 -> 2 -> 3 -> 4

    return 0;
}
`,

  csharp: `// Singly Linked List - Insertion (C#)
using System;

class Node {
    public int Value;
    public Node Next;

    public Node(int value) {
        Value = value;
        Next = null;
    }
}

class SinglyLinkedList {
    Node head;
    Node tail;
    int size;

    public SinglyLinkedList() {
        head = null;
        tail = null;
        size = 0;
    }

    // Insert at head
    public void InsertAtHead(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            newNode.Next = head;
            head = newNode;
        }
        size++;
    }

    // Insert at tail
    public void InsertAtTail(int value) {
        Node newNode = new Node(value);
        if (head == null) {
            head = newNode;
            tail = newNode;
        } else {
            tail.Next = newNode;
            tail = newNode;
        }
        size++;
    }

    // Insert at position (0-indexed)
    public void InsertAtPosition(int value, int position) {
        if (position < 0 || position > size) {
            throw new ArgumentException("Invalid position");
        }

        if (position == 0) {
            InsertAtHead(value);
            return;
        }

        if (position == size) {
            InsertAtTail(value);
            return;
        }

        Node newNode = new Node(value);
        Node current = head;
        for (int i = 0; i < position - 1; i++) {
            current = current.Next;
        }
        newNode.Next = current.Next;
        current.Next = newNode;
        size++;
    }

    public void Display() {
        Node current = head;
        while (current != null) {
            Console.Write(current.Value);
            if (current.Next != null) Console.Write(" -> ");
            current = current.Next;
        }
        Console.WriteLine();
    }

    static void Main() {
        SinglyLinkedList list = new SinglyLinkedList();
        list.InsertAtTail(1);
        list.InsertAtTail(2);
        list.InsertAtTail(4);
        list.Display(); // 1 -> 2 -> 4

        list.InsertAtPosition(3, 2);
        list.Display(); // 1 -> 2 -> 3 -> 4

        list.InsertAtHead(0);
        list.Display(); // 0 -> 1 -> 2 -> 3 -> 4
    }
}
`,
};

export default codes;
