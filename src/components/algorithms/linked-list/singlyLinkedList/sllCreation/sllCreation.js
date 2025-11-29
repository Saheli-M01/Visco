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
      codeLine: 4,
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
        codeLine: 8,
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
        "function createSLL(arr) {", // 0 - Function/Class declaration
        "  let head = null, tail = null;", // 1 - Initialize head and tail
        "  if (arr.length === 0) return null;", // 2 - Check empty array
        "  for (let i = 0; i < arr.length; i++) {", // 3 - Loop through array
        "    const newNode = new Node(arr[i]);", // 4 - Create new node
        "    if (head === null) {", // 5 - Check if first node
        "      head = tail = newNode;", // 6 - Set first node
        "    } else {", // 7 - Else block
        "      tail.next = newNode;", // 8 - Link to tail
        "      tail = newNode;", // 9 - Update tail
        "    }", // 10 - Close else
        "  }", // 11 - Close loop
        "  return head;", // 12 - Return head
        "}", // 13 - Close function
      ],

      python: [
        "def create_sll(arr):", // 0 - Function/Class declaration
        "    head = None", // 1 - Initialize head and tail
        "    tail = None", // 1 (cont.) - Initialize tail
        "    if len(arr) == 0:", // 2 - Check empty array
        "        return None", // 2 (cont.) - Return None
        "    for value in arr:", // 3 - Loop through array
        "        new_node = Node(value)", // 4 - Create new node
        "        if head is None:", // 5 - Check if first node
        "            head = new_node", // 6 - Set first node
        "            tail = new_node", // 6 (cont.) - Set tail
        "        else:", // 7 - Else block
        "            tail.next = new_node", // 8 - Link to tail
        "            tail = new_node", // 9 - Update tail
        "    return head", // 12 - Return head
      ],

      java: [
        "public Node createSLL(int[] arr) {", // 0 - Function/Class declaration
        "    Node head = null;", // 1 - Initialize head and tail
        "    Node tail = null;", // 1 (cont.) - Initialize tail
        "    if (arr.length == 0) return null;", // 2 - Check empty array
        "", // 3 - Loop through array (placeholder)
        "    for (int i = 0; i < arr.length; i++) {", // 3 - Loop through array
        "        Node newNode = new Node(arr[i]);", // 4 - Create new node
        "        if (head == null) {", // 5 - Check if first node
        "            head = newNode;", // 6 - Set first node
        "            tail = newNode;", // 6 (cont.) - Set tail
        "        } else {", // 7 - Else block
        "            tail.next = newNode;", // 8 - Link to tail
        "            tail = newNode;", // 9 - Update tail
        "        }", // 10 - Close else
        "    }", // 11 - Close loop
        "    return head;", // 12 - Return head
        "}", // 13 - Close function
      ],

      csharp: [
        "public Node CreateSLL(int[] arr) {", // 0 - Function/Class declaration
        "    Node head = null;", // 1 - Initialize head and tail
        "    Node tail = null;", // 1 (cont.) - Initialize tail
        "    if (arr.Length == 0) return null;", // 2 - Check empty array
        "", // 3 - Loop through array (placeholder)
        "    for (int i = 0; i < arr.Length; i++) {", // 3 - Loop through array
        "        Node newNode = new Node(arr[i]);", // 4 - Create new node
        "        if (head == null) {", // 5 - Check if first node
        "            head = newNode;", // 6 - Set first node
        "            tail = newNode;", // 6 (cont.) - Set tail
        "        } else {", // 7 - Else block
        "            tail.Next = newNode;", // 8 - Link to tail
        "            tail = newNode;", // 9 - Update tail
        "        }", // 10 - Close else
        "    }", // 11 - Close loop
        "    return head;", // 12 - Return head
        "}", // 13 - Close function
      ],

      cpp: [
        "Node* createSLL(int arr[], int size) {", // 0 - Function/Class declaration
        "    Node* head = nullptr;", // 1 - Initialize head and tail
        "    Node* tail = nullptr;", // 1 (cont.) - Initialize tail
        "    if (size == 0) return nullptr;", // 2 - Check empty array
        "", // 3 - Loop through array (placeholder)
        "    for (int i = 0; i < size; i++) {", // 3 - Loop through array
        "        Node* newNode = new Node(arr[i]);", // 4 - Create new node
        "        if (head == nullptr) {", // 5 - Check if first node
        "            head = newNode;", // 6 - Set first node
        "            tail = newNode;", // 6 (cont.) - Set tail
        "        } else {", // 7 - Else block
        "            tail->next = newNode;", // 8 - Link to tail
        "            tail = newNode;", // 9 - Update tail
        "        }", // 10 - Close else
        "    }", // 11 - Close loop
        "    return head;", // 12 - Return head
        "}", // 13 - Close function
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: function (language) {
    return sllCreation.getCodeLines(language).join("\n");
  },
};

export default sllCreation;
