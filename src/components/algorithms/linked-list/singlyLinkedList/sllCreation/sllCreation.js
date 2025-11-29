// Singly Linked List Implementation

export const sllCreation = {
  name: "Singly Linked List Creation",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];

    // keep original input text available on every step
    const inputArray = Array.isArray(arr) ? [...arr] : [];
    const input = Array.isArray(arr) ? arr.join(",") : String(arr || "");

    // Build linked list structure for visualization (nodes is internal representation)
    let nodes = [];

    // Line 0: Function declaration (empty list)
    steps.push({
      array: [],
      input,
      head: null,
      tail: null,
      description: `Start function: createSLL(arr)`,
      headNode: null,
      tailNode: null,
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Initialize head and tail
    let head = null;
    let tail = null;
    steps.push({
      array: [],
      input,
      head: head,
      tail: tail,
      description: `Initialize: head = null, tail = null`,
      headNode: head,
      tailNode: tail,
      phase: "initialize",
      codeLine: 1,
    });

    // Line 2: Check if array is empty
    steps.push({
      array: [],
      input,
      head: head,
      tail: tail,
      description: `Check: if (arr.length === 0)`,
      headNode: head,
      tailNode: tail,
      phase: "check-empty",
      codeLine: 2,
    });

    if (!Array.isArray(arr) || arr.length === 0) {
      steps.push({
        array: [],
        input,
        head: head,
        tail: tail,
        description: `Array is empty, return null`,
        headNode: head,
        tailNode: tail,
        phase: "return-empty",
        codeLine: 2,
      });
      return steps;
    }

    // Line 3: Start for loop
    steps.push({
      array: [],
      input,
      head: head,
      tail: tail,
      description: `Start loop: for (let i = 0; i < ${arr.length}; i++)`,
      headNode: head,
      tailNode: tail,
      phase: "loop-start",
      codeLine: 3,
    });

    // Iterate through array and create nodes
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];

      // Line 4: Loop iteration (show which value we're processing)
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: head,
        tail: tail,
        description: `Loop iteration: i = ${i}, arr[${i}] = ${val}`,
        i,
        currentNode: null,
        currentValue: val,
        headNode: head,
        tailNode: tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "loop-iteration",
        codeLine: 3,
      });

      // Line 5: Create new node (show node being created)
     // Line 5: Create new node (show node being created)
    const newNode = { value: val, next: null };
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Create new Node(${val})`,
      i,
      currentNode: null,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "create-node",
      codeLine: 5,
    });

    // CONSTRUCTOR EXECUTION STEPS START HERE

    // Line 17: Enter Node class
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Enter Node class`,
      i,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "constructor-class",
      codeLine: 17,
    });

    // Line 20: Constructor function declaration
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Constructor: constructor(${val})`,
      i,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "constructor-signature",
      codeLine: 20,
    });

    // Line 21: Set this.value = value
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Set: this.value = ${val}`,
      i,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "constructor-set-value",
      codeLine: 21,
    });

    // Line 22: Set this.next = null
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Set: this.next = null`,
      i,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "constructor-set-next",
      codeLine: 22,
    });

    // Line 23: Exit constructor
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Exit constructor, return Node(${val})`,
      i,
      currentValue: val,
      newNode: { value: val, next: null },
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      currentIndex: i,
      phase: "constructor-exit",
      codeLine: 23,
    });


      // Line 6: Check if head is null
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: head,
        tail: tail,
        description: `Check: if (head === null)`,
        i,
        currentValue: val,
        newNode: { value: val, next: null },
        headNode: head,
        tailNode: tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "check-head",
        codeLine: 5,
      });

      if (head === null) {
        // Line 7: First node - set both head and tail
        head = 0; // Store index for visualization
        tail = 0;
        nodes.push({ value: val, next: null });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: tail,
          description: `First node: head = tail = Node(${val})`,
          i,
          currentNode: 0,
          currentValue: val,
          headNode: head,
          tailNode: tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "first-node",
          codeLine: 6,
        });
      } else {
        // Line 8: Else block
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: tail,
          description: `Else: head is not null, append to tail`,
          i,
          currentValue: val,
          previousNode: tail,
          headNode: head,
          tailNode: tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "else-block",
          codeLine: 7,
        });

        // Line 9: Link tail->next to new node
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: tail,
          description: `Link: tail.next = Node(${val})`,
          i,
          currentValue: val,
          previousNode: tail,
          headNode: head,
          tailNode: tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "link-tail",
          codeLine: 8,
        });

        // Update the previous tail's next pointer and append new node
        nodes[tail].next = nodes.length;
        nodes.push({ value: val, next: null });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: nodes.length - 1,
          description: `Linked: tail(${nodes[tail].value}).next → Node(${val})`,
          i,
          currentValue: val,
          previousNode: tail,
          headNode: head,
          tailNode: nodes.length - 1, // new node index
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "node-linked",
          codeLine: 9,
        });

        // Line 10: Update tail
        tail = nodes.length - 1;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: head,
          tail: tail,
          description: `Update: tail = Node(${val})`,
          i,
          currentValue: val,
          headNode: head,
          tailNode: tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "update-tail",
          codeLine: 9,
        });
      }

      // Line 11: Close else/if block
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: head,
        tail: tail,
        description: `Close if-else block for iteration ${i}`,
        i,
        currentValue: val,
        headNode: head,
        tailNode: tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "close-block",
        codeLine: 10,
      });
    }

    // Line 12: Close loop
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Exit loop: all ${arr.length} elements processed`,
      i: arr.length,
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "loop-exit",
      codeLine: 11,
    });

    // Line 13: Return head
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Return head: Linked list with ${nodes.length} node(s)`,
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "return-head",
      codeLine: 12,
    });

    // Line 14: Function end
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: head,
      tail: tail,
      description: `Function completed successfully`,
      headNode: head,
      tailNode: tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "completed",
      codeLine: 13,
    });

    return steps;
  },
  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function createSLL(arr) {", // 0 
        "  let head = null, tail = null;", // 1 
        "  if (arr.length === 0)", // 2 
        "    return null;", //3
        "  for (let i = 0; i < arr.length; i++) {", // 4 
        "    const newNode = new Node(arr[i]);", // 5 
        "    if (head === null) {", // 6 
        "      head = newNode;", // 7 
        "      tail = newNode", // 8
        "    } else {", // 9 
        "      tail.next = newNode;", // 10 
        "      tail = newNode;", // 11
        "    }", // 12
        "  }", // 13
        "  return head;", // 14 
        "}", // 15 
        "// Node constructor", //16
        "class Node {", // 17
        "  value;", // 18
        "  next;", // 19
        "  constructor(value) {", // 20
        "    this.value = value;", // 21
        "    this.next = null;", // 22
        "  }", // 23
        "}", // 24
      ],

      python: [
        "def create_sll(arr):", // 0 
        "    head, tail = None, None", // 1 
        "    if len(arr) == 0:", // 2 
        "        return None", // 3
        "    for value in arr:", // 4
        "        new_node = Node(value)", // 5 
        "        if head is None:", // 6 
        "            head = new_node", // 7 
        "            tail = new_node", // 8 
        "        else:", // 9 
        "            tail.next = new_node", // 10 
        "            tail = new_node", // 11 
        "", // 12
        "", // 13
        "    return head", // 14 
        "", // 15
        "# Node constructor", // 16
        "class Node:", // 17
        "    value: int", // 18
        `    next: "Node" | None`, // 19
        "    def __init__(self, value):", // 20
        "        self.value = value", //21
        "        self.next = None", //22
      ],

      java: [
        "public Node createSLL(int[] arr) {", // 0 
        "    Node head = null, tail = null;", // 1 
        "    if (arr.length == 0)", // 2 
        "       return null;", // 3 
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
        "// Node class", //16
        "class Node {", // 17
        "    int data;", //18
        "    Node next;", //19
        "    Node(int data) {", //20
        "        this.data = data;", //21
        "        this.next = null;", //22
        "    }", //23
        "}", //24
      ],

      csharp: [
        "public Node CreateSLL(int[] arr) {", // 0 
        "    Node head = null, tail = null;", // 1 
        "    if (arr.Length == 0)", // 2  
        "       return null;", // 3 
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
        "// Node class", //16
        "public class Node {", //17
        "    public int Value;", //18
        "    public Node Next;", // 19
        "    public Node(int value) {", //20
        "        this.Value = value;", //21
        "        this.Next = null;", //22
        "    }", //23
        "}", //24
      ],

      cpp: [
        "Node* createSLL(int arr[], int size) {", // 0 
        "   Node* head = nullptr, *tail = nullptr;", // 1 
        "    if (size == 0) ", // 2
        "       return nullptr;", // 3 
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
        "// Node struct", // 16
        "struct Node {", // 17
        "    int value;", //18
        "    Node* next;", //19
        "    Node(int value) {", // 20
        "        this->value = value;", //21
        "        this->next = nullptr;", // 22
        "    }", // 23
        "};", // 24
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: function (language) {
    return sllCreation.getCodeLines(language).join("\n");
  },
};

export default sllCreation;
