// Singly Linked List Insertion

export const sllInsertion = {
  name: "Singly Linked List - Insertion",

  generateSteps: (arr, language = "javascript", operationValue = null) => {
    const steps = [];
    const input = Array.isArray(arr) ? arr.join(",") : String(arr || "");

    // Parse operation value: { position: 'head'|'tail'|'middle'|'kth', value: number, kthPosition?: number }
    const operation = operationValue || { position: "tail", value: 1 };
    const { position, value: insertValue, kthPosition } = operation;

    // Build initial linked list
    let nodes = [];
    if (!Array.isArray(arr) || arr.length === 0) {
      arr = [];
    }

    // Validate max 9 values
    if (arr.length > 9) {
      steps.push({
        array: arr,
        input,
        description: `Maximum 9 nodes allowed. Cannot insert.`,
        phase: "error-max-limit",
        codeLine: -1,
      });
      return steps;
    }

    // Build nodes from array
    for (let i = 0; i < arr.length; i++) {
      nodes.push({ value: arr[i], next: i < arr.length - 1 ? i + 1 : null });
    }

    const initialHead = arr.length > 0 ? 0 : null;
    const initialTail = arr.length > 0 ? arr.length - 1 : null;

    // Show initial linked list
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: initialHead,
      tail: initialTail,
      description: `Initial linked list with ${arr.length} nodes`,
      nodes: JSON.parse(JSON.stringify(nodes)),
      phase: "initial-state",
      codeLine: 0,
    });

    // Create new node
    const newNode = { value: insertValue, next: null };
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: initialHead,
      tail: initialTail,
      newNode: { ...newNode },
      description: `Create new node with value = ${insertValue}`,
      // Preview the newly created node in the visualization without mutating the actual list yet
      nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
      phase: "create-new-node",
      codeLine: 1,
    });

    // Insertion logic based on position
    if (position === "head") {
      // Insert at head
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        newNode: { ...newNode },
        description: `Inserting at HEAD position`,
        // Persist preview of new node throughout pre-link phases
        nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
        phase: "insert-position-head",
        codeLine: 2,
      });

      // Link new node to current head
      newNode.next = initialHead;
      const newNodeIndex = nodes.length;
      nodes.push(newNode);

      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        newNode: { ...newNode },
        description: `Link newNode.next = head`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "link-to-head",
        codeLine: 3,
      });

      // Update head
      const newHead = newNodeIndex;
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: newHead,
        tail: initialTail !== null ? initialTail : newHead,
        description: `Update head = newNode`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "update-head",
        codeLine: 4,
      });

      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: newHead,
        tail: initialTail !== null ? initialTail : newHead,
        description: `Insertion at head complete`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "insert-complete",
        codeLine: -1,
      });
    } else if (position === "tail") {
      // Stage: set current = head (no linking yet)
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current: initialHead,
        newNode: { ...newNode },
        description: `Current = head`,
        nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
        phase: "create-current",
        codeLine: 6,
      });
      // Traverse to tail following while (current.next !== null)
      let traverseCurrent = initialHead;
      while (traverseCurrent !== null && nodes[traverseCurrent]?.next !== null) {
        // while condition check
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current: traverseCurrent,
          newNode: { ...newNode },
          description: `while (current.next !== null)`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "tail-while-check",
          codeLine: 7,
        });

        // move current = current.next
        traverseCurrent = nodes[traverseCurrent].next;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current: traverseCurrent,
          newNode: { ...newNode },
          description: `current = current.next`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "tail-move-current",
          codeLine: 8,
        });
      }

      // Exit while loop (current at last node)
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current: traverseCurrent,
        newNode: { ...newNode },
        description: `current.next is null, stop`,
        nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
        phase: "tail-while-exit",
        codeLine: 9,
      });

      // Link tail.next = newNode
      const newNodeIndex = nodes.length;
      nodes[traverseCurrent].next = newNodeIndex;
      nodes.push(newNode);
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current: traverseCurrent,
        newNode: { ...newNode },
        description: `Link current.next = newNode`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "link-current-to-new",
        codeLine: 10,
      });

      // Update tail
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead !== null ? initialHead : newNodeIndex,
        tail: newNodeIndex,
        description: `Update tail = newNode`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "update-tail",
        codeLine: 11,
      });

      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead !== null ? initialHead : newNodeIndex,
        tail: newNodeIndex,
        description: `Insertion at tail complete`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "insert-complete",
        codeLine: -1,
      });
    } else if (position === "middle") {
      // Insert at middle
      const middlePos = Math.floor(arr.length / 2);
      
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        newNode: { ...newNode },
        description: `Inserting at MIDDLE position (index ${middlePos})`,
        nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
        phase: "insert-position-middle",
        codeLine: 8,
      });

      if (middlePos === 0) {
        // Same as head insertion
        newNode.next = initialHead;
        const newNodeIndex = nodes.length;
        nodes.push(newNode);

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: newNodeIndex,
          tail: initialTail !== null ? initialTail : newNodeIndex,
          description: `Middle is at head, insert at head`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "insert-complete",
          codeLine: -1,
        });
      } else {
        // Traverse to position before middle
        let current = initialHead;
        for (let i = 0; i < middlePos - 1; i++) {
          current = nodes[current].next;
        }

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Navigate to node before middle (index ${middlePos - 1})`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "navigate-to-position",
          codeLine: 9,
        });

        // Link new node
        newNode.next = nodes[current].next;
        const newNodeIndex = nodes.length;
        nodes.push(newNode);

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Link newNode.next = current.next`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "link-new-node",
          codeLine: 10,
        });

        nodes[current].next = newNodeIndex;

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Link current.next = newNode`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "update-link",
          codeLine: 11,
        });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Insertion at middle complete`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "insert-complete",
          codeLine: -1,
        });
      }
    } else if (position === "kth" && kthPosition !== undefined) {
      // Insert at kth position
      const k = parseInt(kthPosition);

      // Validate kth position
      if (k < 0 || k > arr.length) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Invalid position ${k}. Must be between 0 and ${arr.length}`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "error-invalid-position",
          codeLine: -1,
        });
        return steps;
      }

      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        newNode: { ...newNode },
        description: `Inserting at position ${k}`,
        nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
        phase: "insert-position-kth",
        codeLine: 12,
      });

      if (k === 0) {
        // Insert at head
        newNode.next = initialHead;
        const newNodeIndex = nodes.length;
        nodes.push(newNode);

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: newNodeIndex,
          tail: initialTail !== null ? initialTail : newNodeIndex,
          description: `Position 0 is head, insert at head`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "insert-complete",
          codeLine: -1,
        });
      } else {
        // Traverse to position k-1
        let current = initialHead;
        for (let i = 0; i < k - 1; i++) {
          current = nodes[current].next;
          steps.push({
            array: nodes.map((n) => n.value),
            input,
            head: initialHead,
            tail: initialTail,
            current,
            newNode: { ...newNode },
            description: `Traverse to position ${i + 1}`,
            nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
            phase: "traverse-to-position",
            codeLine: 13,
          });
        }

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Reached position ${k - 1}, ready to insert`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "navigate-to-position",
          codeLine: 14,
        });

        // Link new node
        newNode.next = nodes[current].next;
        const newNodeIndex = nodes.length;
        nodes.push(newNode);

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Link newNode.next = current.next`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "link-new-node",
          codeLine: 15,
        });

        nodes[current].next = newNodeIndex;

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: k === arr.length ? newNodeIndex : initialTail,
          description: `Link current.next = newNode`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "update-link",
          codeLine: 16,
        });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: k === arr.length ? newNodeIndex : initialTail,
          description: `Insertion at position ${k} complete`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "insert-complete",
          codeLine: -1,
        });
      }
    }

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function insertNode(head, value, position) {",
        "  const newNode = new Node(value);",
        "  if (position === 'head') {",
        "    newNode.next = head;",
        "    return newNode;",
        "  } else if (position === 'tail') {",
       
        "    let current = head;",
        "    while (current.next !== null) {",
        "      current = current.next;",
        "    }",
        "    current.next = newNode;",
        "    tail = newNode;",
        "    return head;",
        "  } else {",
        "    // Insert at specific position",
        "    let current = head;",
        "    for (let i = 0; i < position - 1; i++) {",
        "      current = current.next;",
        "    }",
        "    newNode.next = current.next;",
        "    current.next = newNode;",
        "    return head;",
        "  }",
        "}",
      ],
      python: [
        "def insert_node(head, value, position):",
        "    new_node = Node(value)",
        "    if position == 'head':",
        "        new_node.next = head",
        "        return new_node",
        "    elif position == 'tail':",
    
        "        current = head",
        "        while current.next is not None:",
        "            current = current.next",
        "        current.next = new_node",
        "        tail = new_node",
        "        return head",
        "    else:",
        "        current = head",
        "        for i in range(position - 1):",
        "            current = current.next",
        "        new_node.next = current.next",
        "        current.next = new_node",
        "        return head",
      ],
      java: [
        "public Node insertNode(Node head, int value, String position) {",
        "    Node newNode = new Node(value);",
        "    if (position.equals(\"head\")) {",
        "        newNode.next = head;",
        "        return newNode;",
        "    } else if (position.equals(\"tail\")) {",
      
        "        Node current = head;",
        "        while (current.next != null) {",
        "            current = current.next;",
        "        }",
        "        current.next = newNode;",
        "        tail = newNode;",
        "        return head;",
        "    } else {",
        "        Node current = head;",
        "        for (int i = 0; i < position - 1; i++) {",
        "            current = current.next;",
        "        }",
        "        newNode.next = current.next;",
        "        current.next = newNode;",
        "        return head;",
        "    }",
        "}",
      ],
      cpp: [
        "Node* insertNode(Node* head, int value, string position) {",
        "    Node* newNode = new Node(value);",
        "    if (position == \"head\") {",
        "        newNode->next = head;",
        "        return newNode;",
        "    } else if (position == \"tail\") {",
       
        "        Node* current = head;",
        "        while (current->next != nullptr) {",
        "            current = current->next;",
        "        }",
        "        current->next = newNode;",
        "        tail = newNode;",
        "        return head;",
        "    } else {",
        "        Node* current = head;",
        "        for (int i = 0; i < position - 1; i++) {",
        "            current = current->next;",
        "        }",
        "        newNode->next = current->next;",
        "        current->next = newNode;",
        "        return head;",
        "    }",
        "}",
      ],
      csharp: [
        "public Node InsertNode(Node head, int value, string position) {",
        "    Node newNode = new Node(value);",
        "    if (position == \"head\") {",
        "        newNode.next = head;",
        "        return newNode;",
        "    } else if (position == \"tail\") {",
       
        "        Node current = head;",
        "        while (current.next != null) {",
        "            current = current.next;",
        "        }",
        "        current.next = newNode;",
        "        tail = newNode;",
        "        return head;",
        "    } else {",
        "        Node current = head;",
        "        for (int i = 0; i < position - 1; i++) {",
        "            current = current.next;",
        "        }",
        "        newNode.next = current.next;",
        "        current.next = newNode;",
        "        return head;",
        "    }",
        "}",
      ],
    };
    return lines[language] || lines.javascript;
  },
};
