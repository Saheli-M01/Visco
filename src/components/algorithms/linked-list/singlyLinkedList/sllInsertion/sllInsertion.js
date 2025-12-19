// Singly Linked List Insertion

export const sllInsertion = {
  name: "Singly Linked List - Insertion",

  generateSteps: (arr, language = "javascript", operationValue = null) => {
    const steps = [];
    const input = Array.isArray(arr) ? arr.join(",") : String(arr || "");

    const reorderNodes = (nodesArr, headIdx) => {
      if (headIdx === null || headIdx === undefined) {
        return JSON.parse(JSON.stringify(nodesArr));
      }
      const ordered = [];
      const seen = new Set();
      let curr = headIdx;
      while (
        curr !== null &&
        curr !== undefined &&
        !seen.has(curr) &&
        nodesArr[curr]
      ) {
        ordered.push({ ...nodesArr[curr] });
        seen.add(curr);
        curr = nodesArr[curr].next;
      }
      return JSON.parse(JSON.stringify(ordered));
    };

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
    const previewNodesForCreate =
      position === "head"
        ? [{ ...newNode }, ...nodes]
        : [...nodes, { ...newNode }];
    steps.push({
      array: nodes.map((n) => n.value),
      input,
      head: initialHead,
      tail: initialTail,
      newNode: { ...newNode },
      description: `Create new node with value = ${insertValue}`,
      // Preview the newly created node in the visualization without mutating the actual list yet
      nodes: JSON.parse(JSON.stringify(previewNodesForCreate)),
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
        nodes: JSON.parse(JSON.stringify([{ ...newNode }, ...nodes])),
        phase: "insert-position-head",
        codeLine: 2,
      });

      // Link new node to current head (preview first, then commit)
      newNode.next = initialHead;
      const newNodeIndex = nodes.length;

      // Preview the linking with newNode shown at the front pointing to old head
      const previewLinkNodes = [
        { ...newNode },
        ...reorderNodes(nodes, initialHead),
      ];
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        newNode: { ...newNode },
        description: `Link newNode.next = head`,
        nodes: JSON.parse(JSON.stringify(previewLinkNodes)),
        phase: "link-to-head",
        codeLine: 3,
      });

      // Commit the new node into the nodes array so subsequent steps operate on the real list
      nodes.push({ ...newNode });

      // Update head
      const newHead = newNodeIndex;
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: newHead,
        tail: initialTail !== null ? initialTail : newHead,
        description: `Update head = newNode`,
        nodes: reorderNodes(nodes, newHead),
        phase: "update-head",
        codeLine: 4,
      });

      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: newHead,
        tail: initialTail !== null ? initialTail : newHead,
        description: `Insertion at head complete`,
        nodes: reorderNodes(nodes, newHead),
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
      while (
        traverseCurrent !== null &&
        nodes[traverseCurrent]?.next !== null
      ) {
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
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Current = head`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "create-current",
          codeLine: 15,
        });
        for (let i = 0; i < k - 1; i++) {
          // Show for-loop iteration/check before advancing
          steps.push({
            array: nodes.map((n) => n.value),
            input,
            head: initialHead,
            tail: initialTail,
            current,
            i,
            newNode: { ...newNode },
            description: `for-loop check: i = ${i}, continue while i < ${
              k - 1
            }`,
            nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
            phase: "traverse-for-check",
            codeLine: 16,
          });

          // Advance current = current.next
          current = nodes[current].next;
          steps.push({
            array: nodes.map((n) => n.value),
            input,
            head: initialHead,
            tail: initialTail,
            current,
            i: i + 1,
            newNode: { ...newNode },
            description: `current = current.next (moved to index ${current})`,
            nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
            phase: "traverse-move-current",
            codeLine: 17,
          });
        }

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
          codeLine: 19,
        });

        nodes[current].next = newNodeIndex;

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: k === arr.length ? newNodeIndex : initialTail,
          current,
          newNode: { ...newNode },
          description: `Link current.next = newNode`,
          nodes: reorderNodes(nodes, initialHead),
          phase: "current-update",
          codeLine: 20,
        });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: k === arr.length ? newNodeIndex : initialTail,
          description: `Insertion at position ${k} complete`,
          nodes: reorderNodes(nodes, initialHead),
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
        "function insertNode(head, value, position) {", //0
        "  const newNode = new Node(value);", // 1
        "  if (position === 'head') {", //2
        "    newNode.next = head;", // 3
        "    return newNode;", // 4
        "  } else if (position === 'tail') {", //5
        "    let current = head;", //6
        "    while (current.next !== null) {", //7
        "      current = current.next;", //8
        "    }", //9
        "    current.next = newNode;", // 10
        "    tail = newNode;", //11
        "    return head;", //12
        "  } else {", //13
        "    // Insert at specific position", //14
        "    let current = head;", //15,
        "    for (let i = 0; i < position - 1; i++) {", //16
        "      current = current.next;", //17
        "    }", //18
        "    newNode.next = current.next;", //19
        "    current.next = newNode;", //20
        "    return head;", //21
        "  }",
        "}",
      ],
      python: [
        "def insert_node(head, value, position):", //0
        "    new_node = Node(value)", // 1
        "    if position == 'head':", // 2
        "        new_node.next = head", //3
        "        return new_node", //4
        "    elif position == 'tail':", //5

        "        current = head", //6
        "        while current.next is not None:", //7
        "            current = current.next", //8
        "", //9
        "        current.next = new_node", //10
        "        tail = new_node", //1
        "        return head", //12
        "    else:", //13
        "    # Insert at specific position", //14
        "        current = head", //15
        "        for i in range(position - 1):", //16
        "            current = current.next", //17
        "", //18
        "        new_node.next = current.next", //19
        "        current.next = new_node", //20
        "        return head", //21
      ],
      java: [
        "public Node insertNode(Node head, int value, String position) {", //0
        "    Node newNode = new Node(value);", // 1
        '    if (position.equals("head")) {', //2
        "        newNode.next = head;", //3
        "        return newNode;", //4
        '    } else if (position.equals("tail")) {', //5
        "        Node current = head;", //6
        "        while (current.next != null) {", //7
        "            current = current.next;", //8
        "        }", //9
        "        current.next = newNode;", //10
        "        tail = newNode;", //11
        "        return head;", //12
        "    } else {", //13
        "    // Insert at specific position", //14
        "        Node current = head;", //15
        "        for (int i = 0; i < position - 1; i++) {", //16
        "            current = current.next;", //17
        "        }", //18
        "        newNode.next = current.next;", //19
        "        current.next = newNode;", //20
        "        return head;", //21
        "    }",
        "}",
      ],
      cpp: [
        "Node* insertNode(Node* head, int value, string position) {", //0
        "    Node* newNode = new Node(value);", // 1
        '    if (position == "head") {', //2
        "        newNode->next = head;", //3
        "        return newNode;", // 4
        '    } else if (position == "tail") {', //5

        "        Node* current = head;", //6
        "        while (current->next != nullptr) {", //7
        "            current = current->next;", //8
        "        }", //9
        "        current->next = newNode;", //10
        "        tail = newNode;", //11
        "        return head;", //12
        "    } else {", //13
        "    // Insert at specific position", //14
        "        Node* current = head;", //15
        "        for (int i = 0; i < position - 1; i++) {", //16
        "            current = current->next;", //17
        "        }", //18
        "        newNode->next = current->next;", //19
        "        current->next = newNode;", //20
        "        return head;", //21
        "    }",
        "}",
      ],
      csharp: [
        "public Node InsertNode(Node head, int value, string position) {", //0
        "    Node newNode = new Node(value);", // 1
        '    if (position == "head") {', //2
        "        newNode.next = head;", //3
        "        return newNode;", //4
        '    } else if (position == "tail") {', //5

        "        Node current = head;", //6
        "        while (current.next != null) {", //7
        "            current = current.next;", //8
        "        }", //9
        "        current.next = newNode;", //10
        "        tail = newNode;", //11
        "        return head;", //12
        "    } else {", //13
        "    // Insert at specific position", //14
        "        Node current = head;", //15
        "        for (int i = 0; i < position - 1; i++) {", //16
        "            current = current.next;", //17
        "        }", //18
        "        newNode.next = current.next;", //19
        "        current.next = newNode;", //20
        "        return head;", //21
        "    }",
        "}",
      ],
    };
    return lines[language] || lines.javascript;
  },
};
