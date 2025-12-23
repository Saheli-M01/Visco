// Singly Linked List Deletion

export const sllDeletion = {
  name: "Singly Linked List - Deletion",

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

    // operationValue: { position: 'head'|'tail'|'kth'|'before', kthPosition?: number, beforeValue?: number }
    const operation = operationValue || { position: "head" };
    const { position, kthPosition, beforeValue } = operation;

    // Build initial linked list
    let nodes = [];
    if (!Array.isArray(arr) || arr.length === 0) {
      arr = [];
    }

    if (arr.length > 9) {
      steps.push({
        array: arr,
        input,
        description: `Maximum 9 nodes allowed. Cannot delete.`,
        phase: "error-max-limit",
        codeLine: -1,
      });
      return steps;
    }

    for (let i = 0; i < arr.length; i++) {
      nodes.push({ value: arr[i], next: i < arr.length - 1 ? i + 1 : null });
    }

    const initialHead = arr.length > 0 ? 0 : null;
    const initialTail = arr.length > 0 ? arr.length - 1 : null;

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

    if (arr.length === 0) {
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        description: `List is empty. Nothing to delete.`,
        phase: "error-empty",
        codeLine: -1,
      });
      return steps;
    }

    // Delete at head
    if (position === "head") {
      const deleteIdx = initialHead;
      const deletedValue = nodes[deleteIdx].value;

      // Preview deletion (highlight the node to be removed)
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        deleteNode: { value: deletedValue },
        description: `Deleting head node with value = ${deletedValue}`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "preview-delete-head",
        codeLine: 1,
      });

      // Commit deletion: new head is old head.next
      const newHead = nodes[initialHead].next;
      // Rebuild nodes array to remove the first element
      const newNodes = nodes.slice();
      newNodes.splice(deleteIdx, 1);
      // Reindex next pointers
      for (let i = 0; i < newNodes.length; i++) {
        newNodes[i].next = i < newNodes.length - 1 ? i + 1 : null;
      }

      steps.push({
        array: newNodes.map((n) => n.value),
        input,
        head: newHead === null ? null : 0,
        tail: newNodes.length > 0 ? newNodes.length - 1 : null,
        description: `Head deleted; updated head`,
        nodes: JSON.parse(JSON.stringify(newNodes)),
        phase: "delete-complete",
        codeLine: -1,
      });

      return steps;
    }

    // Delete at tail
    if (position === "tail") {
      // Traverse to tail
      let current = initialHead;
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current,
        description: `Current = head`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "create-current",
        codeLine: 7,
      });

      while (current !== null && nodes[current] && nodes[current].next !== null) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          description: `while (current.next !== null)`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "while-check",
          codeLine: 8,
        });

        current = nodes[current].next;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          description: `current = current.next`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "move-current",
          codeLine: 9,
        });
      }

      // current is tail
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current,
        description: `current is tail (to be deleted)`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "tail-delete-preview",
        codeLine: 10,
      });

      // Remove tail: pop
      const newNodes = nodes.slice();
      newNodes.pop();

      steps.push({
        array: newNodes.map((n) => n.value),
        input,
        head: initialHead !== null ? initialHead : null,
        tail: newNodes.length > 0 ? newNodes.length - 1 : null,
        description: `Tail deleted`,
        nodes: JSON.parse(JSON.stringify(newNodes)),
        phase: "delete-complete",
        codeLine: -1,
      });

      return steps;
    }

    // Delete before a value
    if (position === "before" && beforeValue !== undefined) {
      const targetIndex = nodes.findIndex((n) => n.value === beforeValue);
      if (targetIndex === -1) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Value ${beforeValue} not found in the list. Cannot delete before it.`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "error-before-not-found",
          codeLine: -1,
        });
        return steps;
      }

      if (targetIndex === 0) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `No node exists before head; cannot delete before ${beforeValue}`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "error-no-before",
          codeLine: -1,
        });
        return steps;
      }

      // Find the index of the node before the target
      let prev = initialHead;
      while (prev !== null && nodes[prev] && nodes[prev].next !== targetIndex) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current: prev,
          description: `while (current.next !== target)`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "while-check",
          codeLine: 24,
        });
        prev = nodes[prev].next;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current: prev,
          description: `current = current.next`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "move-current",
          codeLine: 25,
        });
      }

      // Preview the node to be deleted (prev)
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current: prev,
        deleteNode: { value: nodes[prev].value },
        description: `Deleting node before ${beforeValue} (value = ${nodes[prev].value})`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "preview-delete-before",
        codeLine: 30,
      });

      // Commit deletion: remove prev
      const newNodes = nodes.slice();
      newNodes.splice(prev, 1);
      for (let i = 0; i < newNodes.length; i++) {
        newNodes[i].next = i < newNodes.length - 1 ? i + 1 : null;
      }

      steps.push({
        array: newNodes.map((n) => n.value),
        input,
        head: newNodes.length > 0 ? 0 : null,
        tail: newNodes.length > 0 ? newNodes.length - 1 : null,
        description: `Deletion before ${beforeValue} complete`,
        nodes: JSON.parse(JSON.stringify(newNodes)),
        phase: "delete-complete",
        codeLine: -1,
      });

      return steps;
    }

    // Delete at kth position
    if (position === "kth" && kthPosition !== undefined) {
      const k = parseInt(kthPosition);
      if (isNaN(k) || k < 0 || k >= arr.length) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          description: `Invalid position ${k}. Must be between 0 and ${arr.length - 1}`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "error-invalid-position",
          codeLine: -1,
        });
        return steps;
      }

      if (k === 0) {
        // same as head
        const deletedValue = nodes[0].value;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          deleteNode: { value: deletedValue },
          description: `Deleting head (position 0) value = ${deletedValue}`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "preview-delete-head",
          codeLine: 1,
        });

        const newNodes = nodes.slice();
        newNodes.splice(0, 1);
        for (let i = 0; i < newNodes.length; i++) {
          newNodes[i].next = i < newNodes.length - 1 ? i + 1 : null;
        }

        steps.push({
          array: newNodes.map((n) => n.value),
          input,
          head: newNodes.length > 0 ? 0 : null,
          tail: newNodes.length > 0 ? newNodes.length - 1 : null,
          description: `Deletion at position 0 complete`,
          nodes: JSON.parse(JSON.stringify(newNodes)),
          phase: "delete-complete",
          codeLine: -1,
        });

        return steps;
      }

      // Traverse to k-1
      let current = initialHead;
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current,
        description: `Current = head`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "create-current",
        codeLine: 35,
      });

      for (let i = 0; i < k - 1; i++) {
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          i,
          description: `for-loop check: i = ${i}, continue while i < ${k - 1}`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "traverse-for-check",
          codeLine: 36,
        });
        current = nodes[current].next;
        steps.push({
          array: nodes.map((n) => n.value),
          input,
          head: initialHead,
          tail: initialTail,
          current,
          i: i + 1,
          description: `current = current.next (moved to index ${current})`,
          nodes: JSON.parse(JSON.stringify(nodes)),
          phase: "traverse-move-current",
          codeLine: 37,
        });
      }

      // current is node at k-1, remove current.next
      const deleteIndex = nodes[current].next;
      steps.push({
        array: nodes.map((n) => n.value),
        input,
        head: initialHead,
        tail: initialTail,
        current,
        deleteNode: { value: nodes[deleteIndex].value },
        description: `Deleting node at position ${k} (value = ${nodes[deleteIndex].value})`,
        nodes: JSON.parse(JSON.stringify(nodes)),
        phase: "preview-delete-kth",
        codeLine: 39,
      });

      const finalNodes = nodes.slice();
      finalNodes.splice(deleteIndex, 1);
      for (let i = 0; i < finalNodes.length; i++) {
        finalNodes[i].next = i < finalNodes.length - 1 ? i + 1 : null;
      }

      steps.push({
        array: finalNodes.map((n) => n.value),
        input,
        head: finalNodes.length > 0 ? 0 : null,
        tail: finalNodes.length > 0 ? finalNodes.length - 1 : null,
        description: `Deletion at position ${k} complete`,
        nodes: JSON.parse(JSON.stringify(finalNodes)),
        phase: "delete-complete",
        codeLine: -1,
      });

      return steps;
    }

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function deleteNode(head, position, beforeValue) {", //0
        "  if (!head) return null;", //1
        "  if (position === 'head') {", //2
        "    return head.next;", //3
        "  } else if (position === 'tail') {", //4
        "    let current = head;", //5
        "    while (current.next !== null && current.next.next !== null) {", //6
        "      current = current.next;", //7
        "    }", //8
        "    current.next = null;", //9
        "    return head;", //10
        "  } else if (position === 'before') {", //11
        "    // delete the node before the first node with value == beforeValue", //12
        "    if (!head) return head;", //13
        "    if (head.value === beforeValue) return head;", //14
        "    let current = head;", //15
        "    while (current.next !== null && current.next.value !== beforeValue) {", //16
        "      current = current.next;", //17
        "    }", //18
        "    if (current.next === null) return head;", //19
        "    // delete current (node before target) requires tracking prev; simplified here", //20
        "  } else {", //21
        "    // delete at specific kth position (0-based)", //22
        "    // implementation depends on caller", //23
        "  }", //24
        "}", //25
      ],
      python: [
        "def delete_node(head, position, beforeValue=None):", //0
        "    if not head: return None", //1
        "    if position == 'head':", //2
        "        return head.next", //3
        "    elif position == 'tail':", //4
        "        current = head", //5
        "        while current.next is not None and current.next.next is not None:", //6
        "            current = current.next", //7
        "        current.next = None", //8
        "        return head", //9
        "    elif position == 'before':", //10
        "        # delete node before the first node with value == beforeValue", //11
        "        return head", //12
        "    else:", //13
        "        # delete at specific kth position (0-based)", //14
        "        return head", //15
      ],
    };
    return lines[language] || lines.javascript;
  },
};
