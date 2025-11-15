export const description = "A Singly Linked List is a linear data structure where each element (node) contains data and a pointer to the next node, forming a chain. The head points to the first node, and the last node points to null.";

export const howItWorks = [
  "Each node contains data and a 'next' pointer",
  "The head pointer references the first node",
  "The tail pointer references the last node (optional optimization)",
  "Traversal starts from head and follows next pointers until reaching null",
  "Insertions can occur at head (O(1)), tail (O(1) with tail pointer), or middle (O(n))",
];

export const timeComplexity = {
  "Access": "O(n)",
  "Search": "O(n)",
  "Insert at Head": "O(1)",
  "Insert at Tail": "O(1) with tail pointer",
  "Delete at Head": "O(1)",
  "Delete at Tail": "O(n)",
};

export const spaceComplexity = "O(n)";

const codes = {
  javascript: `// Singly Linked List - JavaScript (runnable)
class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  insertAtHead(data) {
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
    if (!this.tail) this.tail = newNode;
    this.size++;
  }

  insertAtTail(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.size++;
  }

  traverse() {
    const values = [];
    let current = this.head;
    while (current) {
      values.push(current.data);
      current = current.next;
    }
    return values;
  }

  deleteAtHead() {
    if (!this.head) return null;
    const value = this.head.data;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.size--;
    return value;
  }
}

// Example usage
const list = new LinkedList();
list.insertAtTail(1);
list.insertAtTail(2);
list.insertAtTail(3);
list.insertAtHead(0);
console.log('List after insertions:', list.traverse());
console.log('Deleted from head:', list.deleteAtHead());
console.log('List after deletion:', list.traverse());
`,

  python: `# Singly Linked List - Python (runnable)
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
        self.tail = None
        self.size = 0

    def insert_at_head(self, data):
        new_node = Node(data)
        new_node.next = self.head
        self.head = new_node
        if not self.tail:
            self.tail = new_node
        self.size += 1

    def insert_at_tail(self, data):
        new_node = Node(data)
        if not self.head:
            self.head = self.tail = new_node
        else:
            self.tail.next = new_node
            self.tail = new_node
        self.size += 1

    def traverse(self):
        values = []
        current = self.head
        while current:
            values.append(current.data)
            current = current.next
        return values

    def delete_at_head(self):
        if not self.head:
            return None
        value = self.head.data
        self.head = self.head.next
        if not self.head:
            self.tail = None
        self.size -= 1
        return value

if __name__ == '__main__':
    ll = LinkedList()
    ll.insert_at_tail(1)
    ll.insert_at_tail(2)
    ll.insert_at_tail(3)
    ll.insert_at_head(0)
    print('List after insertions:', ll.traverse())
    print('Deleted from head:', ll.delete_at_head())
    print('List after deletion:', ll.traverse())
`,

  java: `// Singly Linked List - Java (runnable)
class Node {
    int data;
    Node next;
    Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private Node head;
    private Node tail;
    private int size;

    public LinkedList() {
        head = null;
        tail = null;
        size = 0;
    }

    public void insertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        if (tail == null) tail = newNode;
        size++;
    }

    public void insertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = tail = newNode;
        } else {
            tail.next = newNode;
            tail = newNode;
        }
        size++;
    }

    public String traverse() {
        StringBuilder sb = new StringBuilder("[");
        Node current = head;
        while (current != null) {
            sb.append(current.data);
            if (current.next != null) sb.append(", ");
            current = current.next;
        }
        sb.append("]");
        return sb.toString();
    }

    public Integer deleteAtHead() {
        if (head == null) return null;
        int value = head.data;
        head = head.next;
        if (head == null) tail = null;
        size--;
        return value;
    }

    public static void main(String[] args) {
        LinkedList list = new LinkedList();
        list.insertAtTail(1);
        list.insertAtTail(2);
        list.insertAtTail(3);
        list.insertAtHead(0);
        System.out.println("List after insertions: " + list.traverse());
        System.out.println("Deleted from head: " + list.deleteAtHead());
        System.out.println("List after deletion: " + list.traverse());
    }
}
`,

  'c#': `// Singly Linked List - C# (runnable)
using System;
using System.Collections.Generic;

class Node {
    public int Data { get; set; }
    public Node Next { get; set; }
    public Node(int data) {
        Data = data;
        Next = null;
    }
}

class LinkedList {
    private Node head;
    private Node tail;
    private int size;

    public LinkedList() {
        head = null;
        tail = null;
        size = 0;
    }

    public void InsertAtHead(int data) {
        Node newNode = new Node(data);
        newNode.Next = head;
        head = newNode;
        if (tail == null) tail = newNode;
        size++;
    }

    public void InsertAtTail(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = tail = newNode;
        } else {
            tail.Next = newNode;
            tail = newNode;
        }
        size++;
    }

    public List<int> Traverse() {
        List<int> values = new List<int>();
        Node current = head;
        while (current != null) {
            values.Add(current.Data);
            current = current.Next;
        }
        return values;
    }

    public int? DeleteAtHead() {
        if (head == null) return null;
        int value = head.Data;
        head = head.Next;
        if (head == null) tail = null;
        size--;
        return value;
    }

    static void Main() {
        LinkedList list = new LinkedList();
        list.InsertAtTail(1);
        list.InsertAtTail(2);
        list.InsertAtTail(3);
        list.InsertAtHead(0);
        Console.WriteLine("List after insertions: " + string.Join(", ", list.Traverse()));
        Console.WriteLine("Deleted from head: " + list.DeleteAtHead());
        Console.WriteLine("List after deletion: " + string.Join(", ", list.Traverse()));
    }
}
`,

  cpp: `// Singly Linked List - C++ (runnable)
#include <bits/stdc++.h>
using namespace std;

struct Node {
    int data;
    Node* next;
    Node(int val) : data(val), next(nullptr) {}
};

class LinkedList {
private:
    Node* head;
    Node* tail;
    int size;

public:
    LinkedList() : head(nullptr), tail(nullptr), size(0) {}

    void insertAtHead(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
        if (!tail) tail = newNode;
        size++;
    }

    void insertAtTail(int data) {
        Node* newNode = new Node(data);
        if (!head) {
            head = tail = newNode;
        } else {
            tail->next = newNode;
            tail = newNode;
        }
        size++;
    }

    vector<int> traverse() {
        vector<int> values;
        Node* current = head;
        while (current) {
            values.push_back(current->data);
            current = current->next;
        }
        return values;
    }

    int deleteAtHead() {
        if (!head) return -1;
        int value = head->data;
        Node* temp = head;
        head = head->next;
        if (!head) tail = nullptr;
        delete temp;
        size--;
        return value;
    }

    ~LinkedList() {
        while (head) {
            Node* temp = head;
            head = head->next;
            delete temp;
        }
    }
};

int main() {
    LinkedList list;
    list.insertAtTail(1);
    list.insertAtTail(2);
    list.insertAtTail(3);
    list.insertAtHead(0);
    
    cout << "List after insertions: ";
    auto values = list.traverse();
    for (int v : values) cout << v << " ";
    cout << "\n";
    
    cout << "Deleted from head: " << list.deleteAtHead() << "\n";
    
    cout << "List after deletion: ";
    values = list.traverse();
    for (int v : values) cout << v << " ";
    cout << "\n";
    
    return 0;
}
`,
};

export default codes;
