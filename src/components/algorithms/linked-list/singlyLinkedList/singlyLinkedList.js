// Singly Linked List Implementation (visualized)

export const singlyLinkedList = {
  name: "Singly Linked List",

  generateSteps: (arr, language = "javascript", operationValue = null) => {
    const steps = [];
    if (!Array.isArray(arr) || arr.length === 0) return steps;

    const snapshot = [...arr];

    // Step 1: Initial step - show the linked list
    steps.push({
      array: snapshot,
      list: snapshot,
      comparing: [],
      highlighted: [],
      description: "Initial Singly Linked List",
      phase: "init",
      codeLine: 0,
      headNode: 0,
      tailNode: snapshot.length - 1,
      currentNode: null,
      previousNode: null,
      targetNode: null,
      size: snapshot.length,
    });

    // Step 2: Show head pointer
    steps.push({
      array: snapshot,
      list: snapshot,
      comparing: [0],
      highlighted: [0],
      description: `Head points to first node with value ${snapshot[0]}`,
      phase: "show-head",
      codeLine: 1,
      headNode: 0,
      tailNode: snapshot.length - 1,
      currentNode: 0,
      previousNode: null,
      targetNode: null,
      size: snapshot.length,
    });

    // Step 3: Show tail pointer
    steps.push({
      array: snapshot,
      list: snapshot,
      comparing: [snapshot.length - 1],
      highlighted: [snapshot.length - 1],
      description: `Tail points to last node with value ${snapshot[snapshot.length - 1]}`,
      phase: "show-tail",
      codeLine: 2,
      headNode: 0,
      tailNode: snapshot.length - 1,
      currentNode: snapshot.length - 1,
      previousNode: null,
      targetNode: null,
      size: snapshot.length,
    });

    // Step 4: Traverse the list
    for (let i = 0; i < snapshot.length; i++) {
      steps.push({
        array: snapshot,
        list: snapshot,
        comparing: [i],
        highlighted: [i],
        description: `Traverse: Visit node ${i} with value ${snapshot[i]}`,
        phase: "traverse",
        codeLine: 3,
        headNode: 0,
        tailNode: snapshot.length - 1,
        currentNode: i,
        previousNode: i > 0 ? i - 1 : null,
        targetNode: null,
        size: snapshot.length,
      });
    }

    // Step 5: Completed
    steps.push({
      array: snapshot,
      list: snapshot,
      comparing: [],
      highlighted: [],
      description: "Traversal complete",
      phase: "completed",
      codeLine: 4,
      headNode: 0,
      tailNode: snapshot.length - 1,
      currentNode: null,
      previousNode: null,
      targetNode: null,
      size: snapshot.length,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "class Node {", // 0
        "    constructor(data) {", // 1
        "        this.data = data;", // 2
        "        this.next = null;", // 3
        "    }", // 4
        "}", // 5
        "", // 6
        "class LinkedList {", // 7
        "    constructor() {", // 8
        "        this.head = null;", // 9
        "        this.tail = null;", // 10
        "        this.size = 0;", // 11
        "    }", // 12
        "", // 13
        "    insertAtHead(data) {", // 14
        "        const newNode = new Node(data);", // 15
        "        newNode.next = this.head;", // 16
        "        this.head = newNode;", // 17
        "        if (!this.tail) this.tail = newNode;", // 18
        "        this.size++;", // 19
        "    }", // 20
        "", // 21
        "    insertAtTail(data) {", // 22
        "        const newNode = new Node(data);", // 23
        "        if (!this.head) {", // 24
        "            this.head = this.tail = newNode;", // 25
        "        } else {", // 26
        "            this.tail.next = newNode;", // 27
        "            this.tail = newNode;", // 28
        "        }", // 29
        "        this.size++;", // 30
        "    }", // 31
        "", // 32
        "    traverse() {", // 33
        "        let current = this.head;", // 34
        "        while (current) {", // 35
        "            console.log(current.data);", // 36
        "            current = current.next;", // 37
        "        }", // 38
        "    }", // 39
        "}", // 40
      ],
      python: [
        "class Node:", // 0
        "    def __init__(self, data):", // 1
        "        self.data = data", // 2
        "        self.next = None", // 3
        "", // 4
        "class LinkedList:", // 5
        "    def __init__(self):", // 6
        "        self.head = None", // 7
        "        self.tail = None", // 8
        "        self.size = 0", // 9
        "", // 10
        "    def insert_at_head(self, data):", // 11
        "        new_node = Node(data)", // 12
        "        new_node.next = self.head", // 13
        "        self.head = new_node", // 14
        "        if not self.tail:", // 15
        "            self.tail = new_node", // 16
        "        self.size += 1", // 17
        "", // 18
        "    def insert_at_tail(self, data):", // 19
        "        new_node = Node(data)", // 20
        "        if not self.head:", // 21
        "            self.head = self.tail = new_node", // 22
        "        else:", // 23
        "            self.tail.next = new_node", // 24
        "            self.tail = new_node", // 25
        "        self.size += 1", // 26
        "", // 27
        "    def traverse(self):", // 28
        "        current = self.head", // 29
        "        while current:", // 30
        "            print(current.data)", // 31
        "            current = current.next", // 32
      ],
      cpp: [
        "struct Node {", // 0
        "    int data;", // 1
        "    Node* next;", // 2
        "    Node(int val) : data(val), next(nullptr) {}", // 3
        "};", // 4
        "", // 5
        "class LinkedList {", // 6
        "private:", // 7
        "    Node* head;", // 8
        "    Node* tail;", // 9
        "    int size;", // 10
        "", // 11
        "public:", // 12
        "    LinkedList() : head(nullptr), tail(nullptr), size(0) {}", // 13
        "", // 14
        "    void insertAtHead(int data) {", // 15
        "        Node* newNode = new Node(data);", // 16
        "        newNode->next = head;", // 17
        "        head = newNode;", // 18
        "        if (!tail) tail = newNode;", // 19
        "        size++;", // 20
        "    }", // 21
        "", // 22
        "    void insertAtTail(int data) {", // 23
        "        Node* newNode = new Node(data);", // 24
        "        if (!head) {", // 25
        "            head = tail = newNode;", // 26
        "        } else {", // 27
        "            tail->next = newNode;", // 28
        "            tail = newNode;", // 29
        "        }", // 30
        "        size++;", // 31
        "    }", // 32
        "", // 33
        "    void traverse() {", // 34
        "        Node* current = head;", // 35
        "        while (current) {", // 36
        "            cout << current->data << endl;", // 37
        "            current = current->next;", // 38
        "        }", // 39
        "    }", // 40
        "};", // 41
      ],
      csharp: [
        "class Node {", // 0
        "    public int Data { get; set; }", // 1
        "    public Node Next { get; set; }", // 2
        "    public Node(int data) {", // 3
        "        Data = data;", // 4
        "        Next = null;", // 5
        "    }", // 6
        "}", // 7
        "", // 8
        "class LinkedList {", // 9
        "    private Node head;", // 10
        "    private Node tail;", // 11
        "    private int size;", // 12
        "", // 13
        "    public LinkedList() {", // 14
        "        head = null;", // 15
        "        tail = null;", // 16
        "        size = 0;", // 17
        "    }", // 18
        "", // 19
        "    public void InsertAtHead(int data) {", // 20
        "        Node newNode = new Node(data);", // 21
        "        newNode.Next = head;", // 22
        "        head = newNode;", // 23
        "        if (tail == null) tail = newNode;", // 24
        "        size++;", // 25
        "    }", // 26
        "", // 27
        "    public void InsertAtTail(int data) {", // 28
        "        Node newNode = new Node(data);", // 29
        "        if (head == null) {", // 30
        "            head = tail = newNode;", // 31
        "        } else {", // 32
        "            tail.Next = newNode;", // 33
        "            tail = newNode;", // 34
        "        }", // 35
        "        size++;", // 36
        "    }", // 37
        "", // 38
        "    public void Traverse() {", // 39
        "        Node current = head;", // 40
        "        while (current != null) {", // 41
        "            Console.WriteLine(current.Data);", // 42
        "            current = current.Next;", // 43
        "        }", // 44
        "    }", // 45
        "}", // 46
      ],
      java: [
        "class Node {", // 0
        "    int data;", // 1
        "    Node next;", // 2
        "    Node(int data) {", // 3
        "        this.data = data;", // 4
        "        this.next = null;", // 5
        "    }", // 6
        "}", // 7
        "", // 8
        "class LinkedList {", // 9
        "    private Node head;", // 10
        "    private Node tail;", // 11
        "    private int size;", // 12
        "", // 13
        "    public LinkedList() {", // 14
        "        head = null;", // 15
        "        tail = null;", // 16
        "        size = 0;", // 17
        "    }", // 18
        "", // 19
        "    public void insertAtHead(int data) {", // 20
        "        Node newNode = new Node(data);", // 21
        "        newNode.next = head;", // 22
        "        head = newNode;", // 23
        "        if (tail == null) tail = newNode;", // 24
        "        size++;", // 25
        "    }", // 26
        "", // 27
        "    public void insertAtTail(int data) {", // 28
        "        Node newNode = new Node(data);", // 29
        "        if (head == null) {", // 30
        "            head = tail = newNode;", // 31
        "        } else {", // 32
        "            tail.next = newNode;", // 33
        "            tail = newNode;", // 34
        "        }", // 35
        "        size++;", // 36
        "    }", // 37
        "", // 38
        "    public void traverse() {", // 39
        "        Node current = head;", // 40
        "        while (current != null) {", // 41
        "            System.out.println(current.data);", // 42
        "            current = current.next;", // 43
        "        }", // 44
        "    }", // 45
        "}", // 46
      ],
    };

    return lines[language] || lines.javascript;
  },
};
