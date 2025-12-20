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

    // Parse operation value: { position: 'head'|'tail'|'middle'|'kth'|'before', value: number, kthPosition?: number, beforeValue?: number }
    const operation = operationValue || { position: "tail", value: 1 };
    const {
      position,
      value: insertValue,
      kthPosition,
      beforeValue,
    } = operation;

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
        codeLine: 7,
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
          phase: "while-check",
          codeLine: 8,
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
          phase: "move-current",
          codeLine: 9,
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
        phase: "while-exit",
        codeLine: 10,
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
        codeLine: 11,
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
        codeLine: 12,
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
    } else if (position === "before" && beforeValue !== undefined) {
      // Insert before the first node matching beforeValue
      const targetIndex = nodes.findIndex((n) => n.value === beforeValue);
      if (targetIndex === -1) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Value ${beforeValue} not found in the list. Cannot insert before it.`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "error-before-not-found",
          codeLine: -1,
        });
        return steps;
      }

      // If target is head, insert at head (explicit link + head update steps)
      if (targetIndex === 0) {
        // Link newNode.next = head (preview)
        newNode.next = initialHead;
        const previewLinkNodes = [{ ...newNode }, ...reorderNodes(nodes, initialHead)];
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          newNode: { ...newNode },
          description: `Target value at head; link newNode.next = head (preview)`,
          nodes: JSON.parse(JSON.stringify(previewLinkNodes)),
          phase: "link-new-node",
          codeLine: 19,
        });

        // Commit the new node and update head
        const newNodeIndex = nodes.length;
        nodes.push(newNode);
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: newNodeIndex,
          tail: initialTail !== null ? initialTail : newNodeIndex,
          description: `Update head = newNode`,
          nodes: reorderNodes(nodes, newNodeIndex),
          phase: "insert-complete",
          codeLine: 20,
        });
      } else {
        // Traverse to node just before targetIndex
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
          codeLine: 23,
        });

        // Traverse using while loop to match code lines (no for-loop / no `i`)
        while (
          current !== null &&
          nodes[current]?.next !== null &&
          nodes[nodes[current].next] &&
          nodes[nodes[current].next].value !== beforeValue
        ) {
          // while condition check
          steps.push({
            array: nodes.map((n) => n.value),
            input,
            head: initialHead,
            tail: initialTail,
            current,
            newNode: { ...newNode },
            description: `while (current.next !== null && current.next.value !== ${beforeValue})`,
            nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
            phase: "while-check",
            codeLine: 24,
          });

          // Advance current = current.next
          current = nodes[current].next;
          steps.push({
            array: nodes.map((n) => n.value),
            input,
            head: initialHead,
            tail: initialTail,
            current,
            newNode: { ...newNode },
            description: `current = current.next (moved to index ${current})`,
            nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
            phase: "move-current",
            codeLine: 25,
          });
        }

        // Link new node before target
        // Set newNode.next to point to the target (current.next)
        newNode.next = nodes[current].next;
        const newNodeIndex = nodes.length;

        // Preview the linking: newNode.next points to target index
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Link newNode.next = current.next (inserting before target)`,
          nodes: JSON.parse(JSON.stringify([...nodes, { ...newNode }])),
          phase: "link-new-node",
          codeLine: 30,
        });

        // Commit the new node and then update the previous node's next to point to it
        nodes.push(newNode);
        nodes[current].next = newNodeIndex;

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          newNode: { ...newNode },
          description: `Link current.next = newNode`,
          nodes: reorderNodes(nodes, initialHead),
          phase: "current-update",
          codeLine: 31,
        });

        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Insertion before value ${beforeValue} complete`,
          nodes: reorderNodes(nodes, initialHead),
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
          codeLine: 35,
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
            codeLine: 36,
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
            codeLine: 37,
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
          codeLine: 39,
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
          codeLine: 40,
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
        "function insertNode(head, value, position, beforeValue) {", //0
        "  const newNode = new Node(value);", //1

        "  if (position === 'head') {", //2
        "    newNode.next = head;", //3
        "    head = newNode;", //4   // ← explicit head update
        "    return head;", //5

        "  } else if (position === 'tail') {", //6
        "    let current = head;", //7
        "    while (current.next !== null) {", //8
        "      current = current.next;", //9
        "    }", //10
        "    current.next = newNode;", //11
        "    tail = newNode;", //12
        "    return head;", //13

        "  } else if (position === 'before') {", //14
        "    // Insert before the first node with value == beforeValue", //15
        "    if (!head)", //16
        "      return head;", //17

        "    if (head.value === beforeValue) {", //18
        "      newNode.next = head;", //19
        "      head = newNode;", //20
        "      return head;", //21
        "    }", //22

        "    let current = head;", //23
        "    while (current.next !== null && current.next.value !== beforeValue) {", //24
        "      current = current.next;", //25
        "    }", //26

        "    if (current.next === null) {", //27
        "      return head;", //28
        "    }", //29

        "    newNode.next = current.next;", //30
        "    current.next = newNode;", //31
        "    return head;", //32

        "  } else {", //33
        "    // Insert at specific position", //34
        "    let current = head;", //35
        "    for (let i = 0; i < position - 1; i++) {", //36
        "      current = current.next;", //37
        "    }", //38
        "    newNode.next = current.next;", //39
        "    current.next = newNode;", //40
        "    return head;", //41
        "  }", //42
        "}", //43
      ],
      python: [
        "def insert_node(head, value, position, beforeValue=None):", //0
        "    new_node = Node(value)", //1

        "    if position == 'head':", //2
        "        new_node.next = head", //3
        "        head = new_node", //4   # ← explicit head update
        "        return head", //5

        "    elif position == 'tail':", //6
        "        current = head", //7
        "        while current.next is not None:", //8
        "            current = current.next", //9
        "", //10
        "        current.next = new_node", //11
        "        tail = new_node", //12
        "        return head", //13

        "    elif position == 'before':", //14
        "        # Insert before the first node with value == beforeValue", //15
        "        if head is None:", //16
        "            return head", //17

        "        if head.value == beforeValue:", //18
        "            new_node.next = head", //19
        "            head = new_node", //20
        "            return head", //21
        "", //22

        "        current = head", //23
        "        while current.next is not None and current.next.value != beforeValue:", //24
        "            current = current.next", //25
        "", //26

        "        if current.next is None:", //27
        "            return head", //28
        "", //29

        "        new_node.next = current.next", //30
        "        current.next = new_node", //31
        "        return head", //32

        "    else:", //33
        "        # Insert at specific position", //34
        "        current = head", //35
        "        for i in range(position - 1):", //36
        "            current = current.next", //37
        "", //38
        "        new_node.next = current.next", //39
        "        current.next = new_node", //40
        "        return head", //41
      ],
      java: [
        "public Node insertNode(Node head, int value, String position, int beforeValue) {", //0
        "    Node newNode = new Node(value);", //1

        '    if (position.equals("head")) {', //2
        "        newNode.next = head;", //3
        "        head = newNode;", //4   // ← explicit head update
        "        return head;", //5

        '    } else if (position.equals("tail")) {', //6
        "        Node current = head;", //7
        "        while (current.next != null) {", //8
        "            current = current.next;", //9
        "        }", //10
        "        current.next = newNode;", //11
        "        tail = newNode;", //12
        "        return head;", //13

        '    } else if (position.equals("before")) {', //14
        "        // Insert before the first node with value == beforeValue", //15
        "        if (head == null)", //16
        "            return head;", //17

        "        if (head.value == beforeValue) {", //18
        "            newNode.next = head;", //19
        "            head = newNode;", //20
        "            return head;", //21
        "        }", //22

        "        Node current = head;", //23
        "        while (current.next != null && current.next.value != beforeValue) {", //24
        "            current = current.next;", //25
        "        }", //26

        "        if (current.next == null) {", //27
        "            return head;", //28
        "        }", //29

        "        newNode.next = current.next;", //30
        "        current.next = newNode;", //31
        "        return head;", //32

        "    } else {", //33
        "        // Insert at specific position", //34
        "        Node current = head;", //35
        "        for (int i = 0; i < position - 1; i++) {", //36
        "            current = current.next;", //37
        "        }", //38
        "        newNode.next = current.next;", //39
        "        current.next = newNode;", //40
        "        return head;", //41
        "    }", //42
        "}", //43
      ],
      cpp: [
        "Node* insertNode(Node* head, int value, string position, int beforeValue) {", //0
        "    Node* newNode = new Node(value);", //1

        '    if (position == "head") {', //2
        "        newNode->next = head;", //3
        "        head = newNode;", //4  ← added line (explicit head update)
        "        return head;", //5
        '    } else if (position == "tail") {', //6

        "        Node* current = head;", //7
        "        while (current->next != nullptr) {", //8
        "            current = current->next;", //9
        "        }", //10
        "        current->next = newNode;", //11
        "        tail = newNode;", //12
        "        return head;", //13

        '    } else if (position == "before") {', //14
        "        // Insert before the first node with value == beforeValue", //15
        "        if (head == nullptr)", //16
        "            return head;", //17

        "        if (head->value == beforeValue) {", //18
        "            newNode->next = head;", //19
        "            head = newNode;", //20
        "            return head;", //21
        "        }", //22

        "        Node* current = head;", //23
        "        while (current->next != nullptr && current->next->value != beforeValue) {", //24
        "            current = current->next;", //25
        "        }", //26

        "        if (current->next == nullptr) {", //27
        "            return head;", //28
        "        }", //29

        "        newNode->next = current->next;", //30
        "        current->next = newNode;", //31
        "        return head;", //32

        "    } else {", //33
        "        // Insert at specific position", //34
        "        Node* current = head;", //35
        "        for (int i = 0; i < position - 1; i++) {", //36
        "            current = current->next;", //37
        "        }", //38
        "        newNode->next = current->next;", //39
        "        current->next = newNode;", //40
        "        return head;", //41
        "    }", //42
        "}", //43
      ],
      csharp: [
        "public Node InsertNode(Node head, int value, string position, int beforeValue) {", //0
        "    Node newNode = new Node(value);", //1

        '    if (position == "head") {', //2
        "        newNode.next = head;", //3
        "        head = newNode;", //4   // ← added explicit head update
        "        return head;", //5

        '    } else if (position == "tail") {', //6
        "        Node current = head;", //7
        "        while (current.next != null) {", //8
        "            current = current.next;", //9
        "        }", //10
        "        current.next = newNode;", //11
        "        tail = newNode;", //12
        "        return head;", //13

        '    } else if (position == "before") {', //14
        "        // Insert before the first node with value == beforeValue", //15
        "        if (head == null)", //16
        "            return head;", //17

        "        if (head.value == beforeValue) {", //18
        "            newNode.next = head;", //19
        "            head = newNode;", //20
        "            return head;", //21
        "        }", //22

        "        Node current = head;", //23
        "        while (current.next != null && current.next.value != beforeValue) {", //24
        "            current = current.next;", //25
        "        }", //26

        "        if (current.next == null) {", //27
        "            return head;", //28
        "        }", //29

        "        newNode.next = current.next;", //30
        "        current.next = newNode;", //31
        "        return head;", //32

        "    } else {", //33
        "        // Insert at specific position", //34
        "        Node current = head;", //35
        "        for (int i = 0; i < position - 1; i++) {", //36
        "            current = current.next;", //37
        "        }", //38
        "        newNode.next = current.next;", //39
        "        current.next = newNode;", //40
        "        return head;", //41
        "    }", //42
        "}", //43
      ],
    };
    return lines[language] || lines.javascript;
  },
};
