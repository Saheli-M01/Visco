// When the button is clicked it will go to the topic section
export function showtopic() {
  const homeSection = document.getElementById("topic");
  if (homeSection.style.display === "none") {
    homeSection.style.display = "block";
  } else {
    homeSection.style.display = "none";
  }
}

// Code snippet animation
const codeSnippets = [
  // Merge Sort in Python
  {
    code: [
      "def merge_sort(arr):",
      "    if len(arr) > 1:",
      "        mid = len(arr) // 2",
      "        left_half = arr[:mid]",
      "        right_half = arr[mid:]",
      "",
      "        merge_sort(left_half)",
      "        merge_sort(right_half)",
      "",
      "        i = j = k = 0",
      "        while i < len(left_half) and j < len(right_half):",
      "            if left_half[i] < right_half[j]:",
      "                arr[k] = left_half[i]",
      "                i += 1",
      "            else:",
      "                arr[k] = right_half[j]",
      "                j += 1",
      "            k += 1",
      "",
      "        while i < len(left_half):",
      "            arr[k] = left_half[i]",
      "            i += 1",
      "            k += 1",
      "",
      "        while j < len(right_half):",
      "            arr[k] = right_half[j]",
      "            j += 1",
      "            k += 1",
      "",
      "    return arr",
    ],
    color: "#adff2f", // Green for Python
  },
  // Linked List in C
  {
    code: [
      "struct Node {",
      "    int data;",
      "    struct Node* next;",
      "};",
      "",
      "void printList(struct Node* n) {",
      "    while (n != NULL) {",
      '        printf("%d -> ", n->data);',
      "        n = n->next;",
      "    }",
      '    printf("NULL\\n");',
      "}",
      "",
      "int main() {",
      "    struct Node* head = NULL;",
      "    struct Node* second = NULL;",
      "    struct Node* third = NULL;",
      "",
      "    head = (struct Node*) malloc(sizeof(struct Node));",
      "    second = (struct Node*) malloc(sizeof(struct Node));",
      "    third = (struct Node*) malloc(sizeof(struct Node));",
      "",
      "    head->data = 1;",
      "    head->next = second;",
      "    second->data = 2;",
      "    second->next = third;",
      "    third->data = 3;",
      "    third->next = NULL;",
      "",
      "    printList(head);",
      "    return 0;",
      "}",
    ],
    color: "#ffa089", // Orange for C
  },

  // BFS in C++
  {
    code: [
      "void BFS(int start, vector<vector<int>>& adj) {",
      "    vector<bool> visited(adj.size(), false);",
      "    queue<int> q;",
      "    visited[start] = true;",
      "    q.push(start);",
      "",
      "    while (!q.empty()) {",
      "        int node = q.front();",
      "        q.pop();",
      '        cout << node << " ";',
      "",
      "        for (int neighbor : adj[node]) {",
      "            if (!visited[neighbor]) {",
      "                visited[neighbor] = true;",
      "                q.push(neighbor);",
      "            }",
      "        }",
      "    }",
      "}",
      "",
      "int main() {",
      "    int V = 5;",
      "    vector<vector<int>> adj(V);",
      "    adj[0].push_back(1); adj[0].push_back(2);",
      "    adj[1].push_back(3); adj[1].push_back(4);",
      "    adj[2].push_back(4);",
      "",
      "    BFS(0, adj);",
      "    return 0;",
      "}",
    ],
    color: "#ffc40c", // Yellow for C++
  },

  // Stack in JavaScript
  {
    code: [
      "class Stack {",
      "    constructor() {",
      "        this.items = [];",
      "    }",
      "",
      "    push(element) {",
      "        this.items.push(element);",
      "    }",
      "",
      "    pop() {",
      "        if (this.isEmpty())",
      "            return 'Underflow';",
      "        return this.items.pop();",
      "    }",
      "",
      "    peek() {",
      "        return this.items[this.items.length - 1];",
      "    }",
      "",
      "    isEmpty() {",
      "        return this.items.length === 0;",
      "    }",
      "",
      "    size() {",
      "        return this.items.length;",
      "    }",
      "}",
      "",
      "const stack = new Stack();",
      "stack.push(10);",
      "stack.push(20);",
      "stack.push(30);",
      "console.log(stack.pop());",
      "console.log(stack.peek());",
    ],
    color: "#ff1493", // Deep pink for JS
  },

  // Bubble Sort in Java
  {
    code: [
      "public class BubbleSort {",
      "    public static void bubbleSort(int[] arr) {",
      "        int n = arr.length;",
      "        for (int i = 0; i < n - 1; i++) {",
      "            for (int j = 0; j < n - i - 1; j++) {",
      "                if (arr[j] > arr[j + 1]) {",
      "                    int temp = arr[j];",
      "                    arr[j] = arr[j + 1];",
      "                    arr[j + 1] = temp;",
      "                }",
      "            }",
      "        }",
      "    }",
      "",
      "    public static void main(String[] args) {",
      "        int[] arr = {64, 34, 25, 12, 22, 11, 90};",
      "        bubbleSort(arr);",
      "        for (int num : arr) {",
      '            System.out.print(num + " ");',
      "        }",
      "    }",
      "}",
    ],
    color: "#9370db", // Purple for Java
  },
];

const codeOutput = document.getElementById("code-output");
const cursor = document.getElementById("cursor");
let snippetIndex = 0;
let lineIndex = 0;
let isAnimating = true;  // Track if the animation is playing or paused

// Function to automatically scroll the container to the bottom
function autoScroll() {
  codeOutput.scrollTop = codeOutput.scrollHeight;
}

function typeLineByLine() {
  if (lineIndex < codeSnippets[snippetIndex].code.length && isAnimating) {
    const line = codeSnippets[snippetIndex].code[lineIndex];
    const color = codeSnippets[snippetIndex].color;
    codeOutput.style.color = color; // Change color for each snippet
    codeOutput.textContent += line + "\n"; // Add the line to the output
    lineIndex++;

    autoScroll(); // Automatically scroll after adding a new line

    setTimeout(typeLineByLine, 500); // Adjust typing speed here (500ms per line)
  } else if (!isAnimating) {
    // When animation is paused, reset and stop typing
    return;
  } else {
    setTimeout(resetAndNextSnippet, 1000); // Wait a bit before moving to the next snippet
  }
}

function resetAndNextSnippet() {
  // Clear the previous code and start typing the next snippet
  codeOutput.textContent = "";
  lineIndex = 0;
  snippetIndex = (snippetIndex + 1) % codeSnippets.length; // Loop back to the first snippet after the last
  typeLineByLine();
}


function toggleAnimation() {
  isAnimating = !isAnimating; // Toggle animation status

  // Toggle button icon
  const toggleIcon = document.getElementById("toggleIcon");
  if (isAnimating) {
    toggleIcon.classList.remove("fa-play");
    toggleIcon.classList.add("fa-pause");
    typeLineByLine(); // Resume animation
  } else {
    toggleIcon.classList.remove("fa-pause");
    toggleIcon.classList.add("fa-play");
  }
}

// Start the typing animation automatically when the page loads
window.onload = function() {
  typeLineByLine();  // Start the animation when page loads
};

// Handle play/pause button click
document.getElementById("toggleAnimation").addEventListener("click", toggleAnimation);
