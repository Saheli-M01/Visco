// Heap Sort Algorithm Implementation (visualized)
export const heapSort = {
  name: "Heap Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    const START_LINE = 16;

    function heapify(n, i) {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;

      // Emit separate steps for largest, l, and r so the UI can render them individually
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `largest = ${largest}`,
        codeLine: 1,
        phase: "var-largest",
        largest,
      });

      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `l = ${l}`,
        codeLine: 2,
        phase: "var-l",
        l,
      });

      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `r = ${r}`,
        codeLine: 3,
        phase: "var-r",
        r,
      });
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Compare (${l} < ${n}) && (${a[l]} > ${a[largest]})`,
        codeLine: 5,
        phase: "if-check",
      });

      // Update largest if left child is greater
      if (l < n && a[l] > a[largest]) {
        largest = l;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `largest updated to left index ${largest}`,
          codeLine: 6,
          phase: "var-largest",
          largest,
          l,
          r,
        });
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `if-condition fails`,
          codeLine: 7,
          phase: "if-exit",
          largest,
          l,
          r,
        });
      }
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Compare (${r} < ${n}) && (${a[r]} > ${a[largest]})`,
        codeLine: 8,
        phase: "if-check",
      });
      // Update largest if right child is greater
      if (r < n && a[r] > a[largest]) {
        largest = r;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `largest updated to right index ${largest}`,
          codeLine: 9,
          phase: "var-largest",
          largest,
          l,
          r,
        });
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `if-condition fails`,
          codeLine: 10,
          phase: "if-exit",
          largest,
          l,
          r,
        });
      }
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Check (${largest} != ${i})`,
        codeLine: 11,
        phase: "if-check",
        largest,
        l,
        r,
      });
      if (largest !== i) {
        const t1 = a[i],
          t2 = a[largest];

        [a[i], a[largest]] = [a[largest], a[i]];
        steps.push({
          array: [...a],
          comparing: [i, largest],
          swapped: [i, largest],
          description: `Swap ${t1} ↔ ${t2}`,
          codeLine: 12,
          phase: "swap",
        });
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `heapify(arr, ${n}, ${largest})`,
          codeLine: 13,
          phase: "call-heapify",
        });

        heapify(n, largest);
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `if condition fails`,
          codeLine: 14,
          phase: "if-exit",
        });
      }
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `heapify-exits`,
        codeLine: 15,
        phase: "heapify-exits",
      });
    }

    // Emit a function-entry (call) step so the visualizer shows a call frame for heapSort
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Call heapSort(arr, n=${n})`,
      codeLine: START_LINE,
      phase: "start",
    });

    // For now, only emit i-init steps for the build-max-heap loop so the visualizer shows the
    // current 'i' for each iteration of: for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `For loop, i = ${i}`,
        codeLine: START_LINE + 2,
        phase: "i-init",
        i,
      });
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `heapify(arr, ${n}, ${i})`,
        codeLine: START_LINE + 3,
        phase: "call-heapify",
      });
      // Execute heapify for the current partition (heapify expects (n, i))
      heapify(n, i);
    }
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `for loop exits`,
      codeLine: START_LINE + 4,
      phase: "for-exit",
    });

    for (let i = n - 1; i > 0; i--) {
       steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `For loop, i = ${i}`,
        codeLine: 21,
        phase: "i-init",
        i,
      });
      const t1 = a[0],
        t2 = a[i];

      [a[i], a[0]] = [a[0], a[i]];
      steps.push({
        array: [...a],
        comparing: [0, i],
        swapped: [0, i],
        description: `Swap ${t1} ↔ ${t2}`,
        codeLine: 22,
        phase: "swap",
        i,
      });
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `heapify(arr, ${i}, 0)`,
        codeLine: 23,
        phase: "call-heapify",
      });
      // Execute heapify for the current partition (heapify expects (n, i))
      heapify(i, 0);
       steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `for loop exits`,
        codeLine: 24,
        phase: "for-exit",
        i,
      });
    }

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Array sorted",
      codeLine: -1,
      phase: "completed",
    });
    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function heapify(arr, n, i) {", //1
        "        let largest = i;", //2
        "        let l = 2 * i + 1;", //3
        "        let r = 2 * i + 2;", //4
        "", //5
        "         if (l < n && arr[l] > arr[largest]){", //6
        "              largest = l;", //7
        "         }", //8
        "         if (r < n && arr[r] > arr[largest]){", //9
        "              largest = r;", //10
        "         }", //11
        "         if (largest != i) {", //12
        "               [arr[i], arr[largest]] = [arr[largest], arr[i]];", //13
        "               heapify(arr, n, largest);", //14
        "        }", //15
        "}", //16
        "void heapSort(arr, n){", //17
        "       // n = size of array", //18
        "        for (let i = Math.floor(n / 2) - 1; i >= 0; i--){", //19
        "           heapify(arr, n, i);", //20
        "       }", //21
        "       for (int i = n - 1; i > 0; i--) {", //22
        "           [arr[i], arr[0]] = [arr[0], arr[i]];", //23
        "           heapify(arr, i, 0);", //24
        "       }", //25
        "}", //26
      ],
      python: [
        "def heapify(arr, n, i):", //1
        "    largest = i ", //2
        "    l = 2 * i + 1;", //3
        "    r = 2 * i + 2;", //4
        "", //5
        "    if l < n and arr[l] > arr[largest]:", //6
        "         largest = l", //7
        "", //8
        "    if r < n and arr[r] > arr[largest]:", //9
        "         largest = r;", //10
        "", //11
        "    if largest != i:", //12
        "          arr[i], arr[largest] = arr[largest], arr[i]", //13
        "          heapify(arr, n, largest)", //14
        "", //15
        "", //16
        "def heapSort(arr, n):", //17
        "    # n = size of array", //18
        "    for i in range(n // 2 - 1, -1, -1):", //19
        "         heapify(arr, n, i)", //20
        "", //21
        "     for i in range(n - 1, 0, -1):", //22
        "         arr[0], arr[i] = arr[i], arr[0]", //23
        "         heapify(arr, i, 0)", //24
        "", //25
        "", //26
      ],
      cpp: [
        "void heapify(vector<int>& arr, int n, int i){", //1
        "        int largest = i;", //2
        "        int l = 2 * i + 1;", //3
        "        int r = 2 * i + 2;", //4
        "", //5
        "         if (l < n && arr[l] > arr[largest]){", //6
        "              largest = l;", //7
        "         }", //8
        "         if (r < n && arr[r] > arr[largest]){", //9
        "              largest = r;", //10
        "         }", //11
        "         if (largest != i) {", //12
        "               swap(arr[i], arr[largest])", //13
        "               heapify(arr, n, largest);", //14
        "        }", //15
        "}", //16
        "void heapSort(vector<int>& arr, int n){", //17
        "       // n = size of array", //18
        "       for (int i = n / 2 - 1; i >= 0; i--){", //19
        "           heapify(arr, n, i);", //20
        "       }", //21
        "       for (int i = n - 1; i > 0; i--) {", //22
        "           swap(arr[0], arr[i]);", //23
        "           heapify(arr, i, 0);", //24
        "       }", //25
        "}", //26
      ],
      csharp: [
        "static void heapify(int[] arr, int n, int i) {", //1
        "        int largest = i;", //2
        "        int l = 2 * i + 1;", //3
        "        int r = 2 * i + 2;", //4
        "", //5
        "        if (l < n && arr[l] > arr[largest]) {", //6
        "             largest = l;", //7
        "        }", //8
        "        if (r < n && arr[r] > arr[largest]) {", //9
        "             largest = r;", //10
        "        }", //11
        "        if (largest != i) {", //12
        "             swap(arr[i], arr[largest])", //13
        "             heapify(arr, n, largest);", //14
        "        }", //15
        "}", //16
        "static void heapSortArray(int[] arr, int n) {", //17
        "       // n = size of array", //18
        "       for (int i = n / 2 - 1; i >= 0; i--){", //19
        "           heapify(arr, n, i);", //20
        "       }", //21
        "       for (int i = n - 1; i > 0; i--) {", //22
        "           swap(arr[0], arr[i]);", //23
        "           heapify(arr, i, 0);", //24
        "       }", //25
        "}", //26
        "static void swap (int[] arr, int i, int j){",
        "        int temp = arr[i];",
        "        arr[i] = arr[j];",
        "        arr[j] = temp;",
        "}",
      ],
      java: [
        "static void heapify(int arr[], int n, int i) {", //1
        "        int largest = i;", //2
        "        int l = 2 * i + 1;", //3
        "        int r = 2 * i + 2;", //4
        "", //5
        "         if (l < n && arr[l] > arr[largest]) {", //6
        "              largest = l;", //7
        "         }", //8
        "         if (r < n && arr[r] > arr[largest]) {", //9
        "              largest = r;", //10
        "         }", //11
        "         if (largest != i) {", //12
        "              swap(arr[i], arr[largest])", //13
        "              heapify(arr, n, largest);", //14
        "         }", //15
        "}", //16
        "static void heapSort(int arr[], int n) {", //17
        "       // n = size of array", //18
        "       for (int i = n / 2 - 1; i >= 0; i--) {", //19
        "            heapify(arr, n, i);", //20
        "       }", //21
        "       for (int i = n - 1; i > 0; i--) {", //22
        "           swap(arr[0], arr[i]);", //23
        "           heapify(arr, i, 0);", //24
        "       }", //25
        "}", //26
        "static void swap (int[] arr, int i, int j){",
        "        int temp = arr[i];",
        "        arr[i] = arr[j];",
        "        arr[j] = temp;",
        "}",
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = heapSort.getCodeLines(language);
    return lines.join("\n");
  },
};
