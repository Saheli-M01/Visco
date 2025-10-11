// Heap Sort Algorithm Implementation (visualized)
export const heapSort = {
  name: "Heap Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    function heapify(n, i) {
      let largest = i;
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      if (l < n)
        steps.push({
          array: [...a],
          comparing: [i, l],
          swapped: [],
          description: `Compare parent ${a[i]} with left ${a[l]}`,
          codeLine: 3,
          phase: "comparison",
        });
      if (r < n)
        steps.push({
          array: [...a],
          comparing: [i, r],
          swapped: [],
          description: `Compare parent ${a[i]} with right ${a[r]}`,
          codeLine: 3,
          phase: "comparison",
        });
      if (l < n && a[l] > a[largest]) largest = l;
      if (r < n && a[r] > a[largest]) largest = r;
      if (largest !== i) {
        const t1 = a[i],
          t2 = a[largest];
        if (language === "c" || language === "java" || language === "csharp") {
          steps.push({
            array: [...a],
            comparing: [i, largest],
            swapped: [],
            description: `temp = ${t1}`,
            temp: { value: t1, index: i },
            codeLine: 3,
            phase: "swap_step",
          });
          a[i] = t2;
          steps.push({
            array: [...a],
            comparing: [i, largest],
            swapped: [i, largest],
            description: `arr[${i}] = ${t2}`,
            temp: { value: t1, index: i },
            codeLine: 4,
            phase: "swap_step",
          });
          a[largest] = t1;
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [i, largest],
            description: `arr[${largest}] = ${t1}`,
            temp: { value: t1, index: i },
            codeLine: 5,
            phase: "swap",
          });
        } else {
          [a[i], a[largest]] = [a[largest], a[i]];
          steps.push({
            array: [...a],
            comparing: [i, largest],
            swapped: [i, largest],
            description: `Swap ${t1} ↔ ${t2}`,
            codeLine: 4,
            phase: "swap",
          });
        }
        heapify(n, largest);
      }
    }

    // Emit a function-entry (call) step so the visualizer shows a call frame for heapSort
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Call heapSort(arr, n=${n})`,
      codeLine: 17,
      phase: "start",
      low: 0,
      high: n - 1,
    });


    // For now, only emit i-init steps for the build-max-heap loop so the visualizer shows the
    // current 'i' for each iteration of: for (let i = Math.floor(n / 2) - 1; i >= 0; i--)
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Starting for loop, i = ${i}`,
        codeLine: 18,
        phase: "i-init",
        i,
      });
    }

    // NOTE: other internal heapify and swap steps removed temporarily as requested.

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
        "static void Heapify(int[] arr, int n, int i) {", //1
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
