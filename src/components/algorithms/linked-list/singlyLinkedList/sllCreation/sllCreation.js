// Singly Linked List Implementation

export const sllCreation = {
  name: "Singly Linked List Creation",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const snapshot = [...arr];

    // Line 0: Start
    steps.push({
      array: snapshot,
      description: `Start creating Singly Linked List`,
      head: null,
      tail: null,
      phase: "start",
      codeLine: 0,
    });

    // Line 1: Initialize head and tail
    let head = null;
    let tail = null;
    steps.push({
      array: snapshot,
      description: `Initialize head = null, tail = null`,
      head,
      tail,
      phase: "initialize",
      codeLine: 1,
    });

    // Line 2: Check if array is empty
    steps.push({
      array: snapshot,
      description: `Check if array is empty`,
      head,
      tail,
      phase: "check-empty",
      codeLine: 2,
    });

    if (!Array.isArray(arr) || arr.length === 0) {
      steps.push({
        array: snapshot,
        description: `Array is empty, return empty list`,
        head,
        tail,
        phase: "return-empty",
        codeLine: 3,
      });
      return steps;
    }

    // Build linked list structure for visualization
    let nodes = [];

    // Iterate through array and create nodes
    for (let i = 0; i < arr.length; i++) {
      const val = arr[i];

      // Line 4: Enter loop
      steps.push({
        array: snapshot,
        description: `Enter loop: i = ${i}`,
        i,
        currentValue: val,
        head,
        tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "for-loop",
        codeLine: 4,
      });

      // Line 5: Create new node
      const newNode = { value: val, next: null };
      steps.push({
        array: snapshot,
        description: `Create new Node with value = ${val}`,
        i,
        currentValue: val,
        newNode: { value: val, next: null },
        head,
        tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "create-node",
        codeLine: 5,
      });

      // Line 6: Check if head is null
      steps.push({
        array: snapshot,
        description: `Check if head is null (list is empty)`,
        i,
        currentValue: val,
        newNode: { value: val, next: null },
        head,
        tail,
        nodes: JSON.parse(JSON.stringify(nodes)),
        currentIndex: i,
        phase: "check-head",
        codeLine: 6,
      });

      if (head === null) {
        // Line 7: First node - set both head and tail
        head = 0; // Store index for visualization
        tail = 0;
        nodes.push({ value: val, next: null });
        
        steps.push({
          array: snapshot,
          description: `First node: set head = tail = node(${val})`,
          i,
          currentValue: val,
          head,
          tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "first-node",
          codeLine: 7,
        });
      } else {
        // Line 9: Append to tail
        steps.push({
          array: snapshot,
          description: `Link tail->next to new node`,
          i,
          currentValue: val,
          head,
          tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "link-tail",
          codeLine: 9,
        });

        // Update the previous tail's next pointer
        nodes[tail].next = nodes.length;
        nodes.push({ value: val, next: null });

        steps.push({
          array: snapshot,
          description: `Node linked: tail(${nodes[tail - 1]?.value || nodes[0].value})->next = node(${val})`,
          i,
          currentValue: val,
          head,
          tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "node-linked",
          codeLine: 10,
        });

        // Line 10: Update tail
        tail = nodes.length - 1;
        steps.push({
          array: snapshot,
          description: `Update tail = node(${val})`,
          i,
          currentValue: val,
          head,
          tail,
          nodes: JSON.parse(JSON.stringify(nodes)),
          currentIndex: i,
          phase: "update-tail",
          codeLine: 11,
        });
      }
    }

    // Line 12: Loop exit
    steps.push({
      array: snapshot,
      description: `Exit loop - all nodes created`,
      head,
      tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "loop-exit",
      codeLine: 12,
    });

    // Final step
    steps.push({
      array: snapshot,
      description: `Completed: Linked list created with ${nodes.length} node(s)`,
      head,
      tail,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "completed",
      codeLine: -1,
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
     javascript: [
        "function createSLL(arr) {",           // 0 - Function declaration
        "  let head = null, tail = null;",     // 1 - Variable initialization
        "  if (arr.length === 0) return null;",// 2 - Check empty condition
        "  for (let i = 0; i < arr.length; i++) {", // 3 - Loop (not used in steps but consistent)
        "  for (let i = 0; i < arr.length; i++) {", // 4 - Loop start
        "    const newNode = new Node(arr[i]);",    // 5 - Create node
        "    if (head === null) {",                 // 6 - Check if first node
        "      head = tail = newNode;",             // 7 - Set first node
        "    } else {",                             // 8 - Else block
        "      tail.next = newNode;",               // 9 - Link to tail
        "      tail = newNode;",                    // 10 - Update tail (not used in steps but consistent)
        "      tail = newNode;",                    // 11 - Update tail
        "    }",                                    // 12 - Close else
        "  }",                                      // 13 - Close loop (not used in steps but consistent)
        "  return head;",                           // 14 - Return (not used in steps but consistent)
        "}",                                        // 15 - Close function
      ],
      python: [
        "class Node:",
        "    def __init__(self, value):",
        "        self.value = value",
        "        self.next = None",
        "",
        "class SinglyLinkedList:",
        "    def __init__(self):",
        "        self.head = None",
        "        self.tail = None",
        "",
        "    def append(self, value):",
        "        new_node = Node(value)",
        "        if self.head is None:",
        "            self.head = new_node",
        "            self.tail = new_node",
        "        else:",
        "            self.tail.next = new_node",
        "            self.tail = new_node",
      ],
      java: [
        "class Node {",
        "    int value;",
        "    Node next;",
        "    Node(int value) {",
        "        this.value = value;",
        "        this.next = null;",
        "    }",
        "}",
        "",
        "class SinglyLinkedList {",
        "    Node head;",
        "    Node tail;",
        "",
        "    SinglyLinkedList() {",
        "        this.head = null;",
        "        this.tail = null;",
        "    }",
        "",
        "    void append(int value) {",
        "        Node newNode = new Node(value);",
        "        if (head == null) {",
        "            head = newNode;",
        "            tail = newNode;",
        "        } else {",
        "            tail.next = newNode;",
        "            tail = newNode;",
        "        }",
        "    }",
        "}",
      ],
      csharp: [
        "class Node {",
        "    public int Value;",
        "    public Node Next;",
        "    public Node(int value) {",
        "        Value = value;",
        "        Next = null;",
        "    }",
        "}",
        "",
        "class SinglyLinkedList {",
        "    public Node Head;",
        "    public Node Tail;",
        "",
        "    public SinglyLinkedList() {",
        "        Head = null;",
        "        Tail = null;",
        "    }",
        "",
        "    public void Append(int value) {",
        "        Node newNode = new Node(value);",
        "        if (Head == null) {",
        "            Head = newNode;",
        "            Tail = newNode;",
        "        } else {",
        "            Tail.Next = newNode;",
        "            Tail = newNode;",
        "        }",
        "    }",
        "}",
      ],
      cpp: [
        "class Node {",
        "public:",
        "    int value;",
        "    Node* next;",
        "    Node(int v) {",
        "        value = v;",
        "        next = nullptr;",
        "    }",
        "};",
        "",
        "class SinglyLinkedList {",
        "public:",
        "    Node* head;",
        "    Node* tail;",
        "    SinglyLinkedList() {",
        "        head = tail = nullptr;",
        "    }",
        "    void append(int v) {",
        "        Node* node = new Node(v);",
        "        if (head == nullptr) {",
        "            head = tail = node;",
        "        } else {",
        "            tail->next = node;",
        "            tail = node;",
        "        }",
        "    }",
        "};",
      ],
    };
    return lines[language] || lines.javascript;
  },

  getCode: function (language) {
    return sllCreation.getCodeLines(language).join("\n");
  },
};

export default sllCreation;