// Singly Linked List Traversal

export const sllTraversal = {
  name: "Singly Linked List Traversal",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];

    // keep original input text available on every step
    const input = Array.isArray(arr) ? arr.join(",") : String(arr || "");

    // Build linked list structure for visualization (nodes is internal representation)
    let nodes = [];

    // Check if array is valid
    if (!Array.isArray(arr) || arr.length === 0) {
      steps.push({
        array: [],
        input,
        description: `Array is empty, cannot traverse`,
        phase: "return-empty",
        codeLine: -1,
      });
      return steps;
    }

    // ========== BUILD NODES INSTANTLY (Skip creation visualization) ==========
    for (let i = 0; i < arr.length; i++) {
      nodes.push({ value: arr[i], next: i < arr.length - 1 ? i + 1 : null });
    }

    const head = 0;
    const tail = arr.length - 1;

    // Show complete linked list instantly
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Linked list created with ${arr.length} nodes. Starting traversal...`,
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "creation-complete",
      codeLine: 15,
    });

    // ========== PART 2: TRAVERSE THE LINKED LIST ==========

    // Line: Initialize current pointer to head
    let current = head;
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      current: current,
      description: `Traversal: current = head (pointing to first node)`,
      currentNode: current,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "traverse-initialize",
      codeLine: 19,
    });

    // Line: Start while loop
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      current: current,
      description: `Check: while (current !== null)`,
      currentNode: current,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "traverse-loop-start",
      codeLine: 20,
    });

    // Traverse through each node
    let traverseIndex = 0;
    while (current !== null) {
      const val = nodes[current].value;

      // Visit current node
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: head,
        tail: tail,
        current: current,
        description: `Visit node ${traverseIndex + 1}: value = ${val}`,
        currentIndex: current,
        currentValue: val,
        currentNode: current,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "visit-node",
        codeLine: 21,
      });

      // Move to next node
      const nextNode = nodes[current].next;
      current = nextNode;
      traverseIndex++;

      if (current !== null) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: tail,
          current: current,
          description: `Move to node ${traverseIndex + 1}: value = ${nodes[current].value}`,
          currentIndex: current,
          currentValue: nodes[current].value,
          currentNode: current,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "move-next",
          codeLine: 22,
        });
      }
    }

    // Traversal complete
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      current: null,
      description: `Traversal complete: visited all ${arr.length} nodes`,
      currentNode: null,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "traverse-complete",
      codeLine: -1,
    });

    return steps;
  },
  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "// Part 1: Create the linked list", // 0
        "function createSLL(arr) {", // 1
        "  let head = null, tail = null;", // 2
        "  if (arr.length === 0) return null;", // 3
        "  for (let i = 0; i < arr.length; i++) {", // 4
        "    const newNode = new Node(arr[i]);", // 5
        "    if (head === null) {", // 6
        "      head = newNode;", // 7
        "      tail = newNode;", // 8
        "    } else {", // 9
        "      tail.next = newNode;", // 10
        "      tail = newNode;", // 11
        "    }", // 12
        "  }", // 13
        "  return head;", // 14
        "}", // 15
        "", // 16
        "// Part 2: Traverse the linked list", // 17
        "function traverseSLL(head) {", // 18
        "  let current = head;", // 19
        "  while (current !== null) {", // 20
        "    console.log(current.value);", // 21
        "    current = current.next;", // 22
        "  }", // 23
        "}", // 24
        "", // 25
        "// Node constructor", // 26
        "class Node {", // 27
        "  constructor(value) {", // 28
        "    this.value = value;", // 29
        "    this.next = null;", // 30
        "  }", // 31
        "}", // 32
      ],

      python: [
        "# Part 1: Create the linked list", // 0
        "def create_sll(arr):", // 1
        "    head, tail = None, None", // 2
        "    if len(arr) == 0:", // 3
        "        return None", // 4
        "    for value in arr:", // 5
        "        new_node = Node(value)", // 6
        "        if head is None:", // 7
        "            head = new_node", // 8
        "            tail = new_node", // 9
        "        else:", // 10
        "            tail.next = new_node", // 11
        "            tail = new_node", // 12
        "    return head", // 13
        "", // 14
        "", // 15
        "", //16
        "# Part 2: Traverse the linked list", // 17
        "def traverse_sll(head):", // 18
        "    current = head", // 19
        "    while current is not None:", // 20
        "        print(current.value)", // 21
        "        current = current.next", // 22
        "", // 23
        "# Node class", // 24
        "class Node:", // 25
        "    def __init__(self, value):", // 26
        "        self.value = value", // 27
        "        self.next = None", // 28
      ],

      java: [
        "// Part 1: Create the linked list", // 0
        "public Node createSLL(int[] arr) {", // 1
        "    Node head = null, tail = null;", // 2
        "    if (arr.length == 0) return null;", // 3
        "    for (int i = 0; i < arr.length; i++) {", // 4
        "        Node newNode = new Node(arr[i]);", // 5
        "        if (head == null) {", // 6
        "            head = newNode;", // 7
        "            tail = newNode;", // 8
        "        } else {", // 9
        "            tail.next = newNode;", // 10
        "            tail = newNode;", // 11
        "        }", // 12
        "    }", // 13
        "    return head;", // 14
        "}", // 15
        "", // 16
        "// Part 2: Traverse the linked list", // 17
        "public void traverseSLL(Node head) {", // 18
        "    Node current = head;", // 19
        "    while (current != null) {", // 20
        "        System.out.println(current.value);", // 21
        "        current = current.next;", // 22
        "    }", // 23
        "}", // 24
        "", // 25
        "// Node class", // 26
        "class Node {", // 27
        "    int data;", // 28
        "    Node next;", // 29
        "    Node(int data) {", // 30
        "        this.data = data;", // 31
        "        this.next = null;", // 32
        "    }", // 33
        "}", // 34
      ],

      csharp: [
        "// Part 1: Create the linked list", // 0
        "public Node CreateSLL(int[] arr) {", // 1
        "    Node head = null, tail = null;", // 2
        "    if (arr.Length == 0) return null;", // 3
        "    for (int i = 0; i < arr.Length; i++) {", // 4
        "        Node newNode = new Node(arr[i]);", // 5
        "        if (head == null) {", // 6
        "            head = newNode;", // 7
        "            tail = newNode;", // 8
        "        } else {", // 9
        "            tail.Next = newNode;", // 10
        "            tail = newNode;", // 11
        "        }", // 12
        "    }", // 13
        "    return head;", // 14
        "}", // 15
        "", // 16
        "// Part 2: Traverse the linked list", // 17
        "public void TraverseSLL(Node head) {", // 18
        "    Node current = head;", // 19
        "    while (current != null) {", // 20
        "        Console.WriteLine(current.Value);", // 21
        "        current = current.Next;", // 22
        "    }", // 23
        "}", // 24
        "", // 25
        "// Node class", // 26
        "public class Node {", // 27
        "    public int Value;", // 28
        "    public Node Next;", // 29
        "    public Node(int value) {", // 30
        "        this.Value = value;", // 31
        "        this.Next = null;", // 32
        "    }", // 33
        "}", // 34
      ],

      cpp: [
        "// Part 1: Create the linked list", // 0
        "Node* createSLL(int arr[], int size) {", // 1
        "    Node* head = nullptr, *tail = nullptr;", // 2
        "    if (size == 0) return nullptr;", // 3
        "    for (int i = 0; i < size; i++) {", // 4
        "        Node* newNode = new Node(arr[i]);", // 5
        "        if (head == nullptr) {", // 6
        "            head = newNode;", // 7
        "            tail = newNode;", // 8
        "        } else {", // 9
        "            tail->next = newNode;", // 10
        "            tail = newNode;", // 11
        "        }", // 12
        "    }", // 13
        "    return head;", // 14
        "}", // 15
        "", // 16
        "// Part 2: Traverse the linked list", // 17
        "void traverseSLL(Node* head) {", // 18
        "    Node* current = head;", // 19
        "    while (current != nullptr) {", // 20
        "        cout << current->value << \" \";", // 21
        "        current = current->next;", // 22
        "    }", // 23
        "}", // 24
        "", // 25
        "// Node struct", // 26
        "struct Node {", // 27
        "    int value;", // 28
        "    Node* next;", // 29
        "    Node(int value) {", // 30
        "        this->value = value;", // 31
        "        this->next = nullptr;", // 32
        "    }", // 33
        "};", // 34
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: function (language) {
    return sllTraversal.getCodeLines(language).join("\n");
  },
};

export default sllTraversal;
