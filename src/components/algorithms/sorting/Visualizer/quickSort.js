// Quick Sort Algorithm Implementation (Lomuto partition) with visualization steps
export const quickSort = {
  name: "Quick Sort",

  generateSteps: (arr, language = "javascript", pivotStrategy = "last") => {
    const steps = [];
    const a = [...arr];
    // Debug: log incoming pivotStrategy
    try {
      console.debug(
        "[quickSort] generateSteps pivotStrategy:",
        pivotStrategy,
        "array:",
        a
      );
    } catch (e) {}

    function partition(low, high) {
      // Choose pivot based on strategy
      let pivotIdx = high; // default: last element

      if (pivotStrategy === "first") {
        pivotIdx = low;
      } else if (pivotStrategy === "middle") {
        pivotIdx = Math.floor((low + high) / 2);
      } else if (typeof pivotStrategy === "number") {
        // Index-based pivot selection - only use the exact index if it's within the current partition
        if (pivotStrategy >= low && pivotStrategy <= high) {
          pivotIdx = pivotStrategy;
        } else {
          // If specified index is outside current partition, use last element of partition
          pivotIdx = high;
        }
      }
      // For 'last', pivotIdx remains high

      // Debug: show chosen pivot index before swap
      try {
        console.debug(
          "[quickSort] partition choose pivotIdx=",
          pivotIdx,
          "low=",
          low,
          "high=",
          high,
          "pivotStrategy=",
          pivotStrategy
        );
      } catch (e) {}
      // Move chosen pivot to last position if not already there
      if (pivotIdx !== high) {
        // swap a[pivotIdx] and a[high]
        const temp = a[pivotIdx];
        a[pivotIdx] = a[high];
        a[high] = temp;

        steps.push({
          array: [...a],
          comparing: [],
          swapped: [pivotIdx, high],
          description: `Move pivot from position ${pivotIdx} to end (position ${high})`,
          codeLine: 7,
          phase: "pivot-move",
          pivotIndex: high,
          partitionRange: [low, high],
        });
      }

      const pivot = a[high];
      let i = low - 1;

      // Show pivot selection
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Select pivot (${
          typeof pivotStrategy === "number"
            ? `index ${pivotStrategy}, using arr[${pivotIdx}]`
            : pivotStrategy
        }): arr[${high}] = ${pivot}`,
        codeLine: 7,
        phase: "pivot-selection",
        pivotIndex: high,
        partitionRange: [low, high],
        pivotStrategy: pivotStrategy,
      });

      // Show partition start
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Partitioning range [${low}-${high}], i = ${i}`,
        codeLine: 8,
        phase: "partition-start",
        pivotIndex: high,
        partitionRange: [low, high],
      });

      for (let j = low; j <= high - 1; j++) {
        steps.push({
          array: [...a],
          comparing: [j, high],
          swapped: [],
          description: `Compare arr[${j}] (${a[j]}) with pivot ${pivot}`,
          codeLine: 10,
          phase: "comparison",
          pivotIndex: high,
          partitionRange: [low, high],
        });

        if (a[j] < pivot) {
          i++;
          const t1 = a[i],
            t2 = a[j];

          if (
            language === "c" ||
            language === "java" ||
            language === "csharp"
          ) {
            steps.push({
              array: [...a],
              comparing: [i, j],
              swapped: [],
              description: `arr[${j}] < pivot, increment i to ${i}, temp = ${t1}`,
              temp: { value: t1, index: i },
              codeLine: 12,
              phase: "swap_step",
              pivotIndex: high,
              partitionRange: [low, high],
            });
            a[i] = t2;
            steps.push({
              array: [...a],
              comparing: [i, j],
              swapped: [i],
              description: `arr[${i}] = ${t2}`,
              temp: { value: t1, index: i },
              codeLine: 13,
              phase: "swap_step",
              pivotIndex: high,
              partitionRange: [low, high],
            });
            a[j] = t1;
            steps.push({
              array: [...a],
              comparing: [i, j],
              swapped: [i, j],
              description: `arr[${j}] = ${t1}`,
              temp: { value: t1, index: i },
              codeLine: 14,
              phase: "swap",
              pivotIndex: high,
              partitionRange: [low, high],
            });
          } else {
            steps.push({
              array: [...a],
              comparing: [i, j],
              swapped: [],
              description: `arr[${j}] < pivot, increment i to ${i}`,
              codeLine: 12,
              phase: "increment",
              pivotIndex: high,
              partitionRange: [low, high],
            });
            [a[i], a[j]] = [a[j], a[i]];
            steps.push({
              array: [...a],
              comparing: [i, j],
              swapped: [i, j],
              description: `Swap arr[${i}] and arr[${j}]: ${t1} ↔ ${t2}`,
              codeLine: 13,
              phase: "swap",
              pivotIndex: high,
              partitionRange: [low, high],
            });
          }
        }
      }

      // Place pivot in correct position
      const t = a[i + 1];
      const pivotPos = i + 1;

      if (language === "c" || language === "java" || language === "csharp") {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Place pivot at position ${pivotPos}, temp = ${t}`,
          temp: { value: t, index: pivotPos },
          codeLine: 16,
          phase: "pivot_placement",
          pivotIndex: high,
          partitionRange: [low, high],
        });
        a[i + 1] = a[high];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [pivotPos],
          description: `arr[${pivotPos}] = ${a[pivotPos]}`,
          temp: { value: t, index: pivotPos },
          codeLine: 17,
          phase: "pivot_placement",
          pivotIndex: pivotPos,
          partitionRange: [low, high],
        });
        a[high] = t;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [pivotPos, high],
          description: `arr[${high}] = ${t}`,
          temp: { value: t, index: pivotPos },
          codeLine: 18,
          phase: "pivot_placed",
          pivotIndex: pivotPos,
          partitionRange: [low, high],
        });
      } else {
        [a[i + 1], a[high]] = [a[high], a[i + 1]];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [pivotPos, high],
          description: `Place pivot ${pivot} at position ${pivotPos}`,
          codeLine: 16,
          phase: "pivot_placed",
          pivotIndex: pivotPos,
          partitionRange: [low, high],
        });
      }

      return i + 1;
    }

    // Line-numbered steps for call-card and base-case check
    const FUNC_ENTRY_LINE = 20; // call quickSort highlight
    const COND_LINE = 21; // base-case check highlight

    function quickRec(low, high) {
      // Emit only a function-entry (call) step highlighting line 20
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call quickSort:(arr, low=${low}, high=${high})`,
        codeLine: FUNC_ENTRY_LINE,
        phase: "start",
        low,
        high,
      });

      // Emit condition-check step highlighting line 21
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Check base case: is low (${low}) < high (${high})?`,
        codeLine: COND_LINE,
        phase: "condition-check",
        low,
        high,
      });

      // Compute partition index but avoid emitting partition's internal steps.
      // We'll call the partition helper, then remove any steps it added so
      // the UI receives only a single pIndex step.
      const beforeCount = steps.length;
      const pIndex = partition(low, high);
      const afterCount = steps.length;
      if (afterCount > beforeCount) {
        // remove steps emitted by partition
        steps.splice(beforeCount, afterCount - beforeCount);
      }

      // Emit a single pIndex step highlighting the line where pIndex is computed
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `pIndex = partition(arr, ${low}, ${high}) `,
        codeLine: 22, // highlight the pIndex assignment line
        phase: "pindex",
        low,
        high,
        pIndex,
      });

      // Stop here for now (no recursion)
      return;
    }

   

    quickRec(0, a.length - 1);

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Array sorted!",
      codeLine: -1,
      phase: "completed",
    });

    return steps;
  },

  getCodeLines: (language) => {
    const lines = {
      javascript: [
        "function partition(arr, low, high) {", //1
        "    let randomIndex = low + Math.floor(Math.random() * (high - low + 1));", //2
        "    [arr[low], arr[randomIndex]] = [arr[randomIndex], arr[low]];", //3

        "    let pivot = arr[low];", //4
        "    let i = low;", //5
        "    let j = high;", //6

        "    while (i < j) {", //7
        "        while (arr[i] <= pivot && i <= high - 1) {", //8
        "            i++;", //9
        "        }", //10
        "        while (arr[j] > pivot && j >= low + 1) {", //11
        "            j--;", //12
        "        }", //13
        "        if (i < j) {", //14
        "            [arr[i], arr[j]] = [arr[j], arr[i]];", //15
        "        }", //16
        "    }", //17
        "    [arr[low], arr[j]] = [arr[j], arr[low]];", //18
        "    return j;", //19
        "}", //20

        "function quickSort(arr, low, high) {", //21
        "    if (low < high) {", //22
        "        let pIndex = this.partition(arr, low, high);", //23
        "        this.quickSort(arr, low, pIndex - 1);", //24
        "        this.quickSort(arr, pIndex + 1, high);", //25
        "    }", //26
        "}", //27
          "", //28
        "", //29
        "", //30
        "", //31
        "", //32
      ],
      python: [
        "def partition(self, arr, low, high):", //1
        "    randomIndex = low + random.randint(0, high - low)", //2
        "    arr[low], arr[randomIndex] = arr[randomIndex], arr[low]", //3

        "    pivot = arr[low]", //4
        "    i = low", //5
        "    j = high", //6

        "    while i < j:", //7
        "        while arr[i] <= pivot and i <= high - 1:", //8
        "            i += 1", //9
        "", //10
        "        while arr[j] > pivot and j >= low + 1:", //11
        "            j -= 1", //12
        "", //13
        "        if i < j:", //14
        "            arr[i], arr[j] = arr[j], arr[i]", //15
        "", //16
        "", //17
        "    arr[low], arr[j] = arr[j], arr[low]", //18
        "    return j", //19
        "", //20
        "def quickSort(self, arr, low, high):", //21
        "    if low < high:", //22
        "        pIndex = self.partition(arr, low, high)", //23
        "        self.quickSort(arr, low, pIndex - 1)", //24
        "        self.quickSort(arr, pIndex + 1, high)", //25
        "", //26
        "", //27
        "", //28
        "", //29
        "", //30
        "", //31
        "", //32
      ],
      java: [
        "public int partition(int[] arr, int low, int high) {", //1
        "    int randomIndex = low + new Random().nextInt(high - low + 1);", //2
        "    swap(arr, low, randomIndex);", //3
        "    int pivot = arr[low];", //4
        "    int i = low;", //5
        "    int j = high;", //6
        "    while (i < j) {", //7
        "        while (arr[i] <= pivot && i <= high - 1) {", //8
        "            i++;", //9
        "        }", //10
        "        while (arr[j] > pivot && j >= low + 1) {", //11
        "            j--;", //12
        "        }", //13
        "        if (i < j) {", //14
        "            swap(arr, i, j);", //15
        "        }", //16
        "    }", //17
        "    swap(arr, low, j);", //18
        "    return j;", //19
        "}", //20
        "public void quickSort(int[] arr, int low, int high) {", //21
        "    if (low < high) {", //22
        "        int pIndex = partition(arr, low, high);", //23
        "        quickSort(arr, low, pIndex - 1);", //24
        "        quickSort(arr, pIndex + 1, high);", //25
        "    }", //26
        "}", //27
        "private void swap(int[] arr, int i, int j) {", //28
        "    int temp = arr[i];", //29
        "    arr[i] = arr[j];", //30
        "    arr[j] = temp;", //31
        "}", //32
      ],
      cpp: [
        "int partition(vector<int>& arr, int low, int high) {", //1
        "    int randomIndex = low + rand() % (high - low + 1);", //2
        "    swap(arr[low], arr[randomIndex]);", //3
        "    int pivot = arr[low];", //4
        "    int i = low;", //5
        "    int j = high;", //6
        "    while (i < j) {", //7
        "        while (arr[i] <= pivot && i <= high - 1) {", //8
        "            i++;", //9
        "        }", //10
        "        while (arr[j] > pivot && j >= low + 1) {", //11
        "            j--;", //12
        "        };", //13
        "        if (i < j) {", //14
        "            swap(arr[i], arr[j]);", //15
        "        }", //16
        "    }", //17
        "    swap(arr[low], arr[j]);", //18
        "    return j;", //19
        "}", //20
        "void quickSort(vector<int>& arr, int low, int high) {", //21
        "    if (low < high) {", //22
        "        int pIndex = partition(arr, low, high);", //23
        "        quickSort(arr, low, pIndex - 1);", //24
        "        quickSort(arr, pIndex + 1, high);", //25
        "    }", //26
        "}", //27
        "", //28
        "", //29
        "", //30
        "", //31
        "", //32
      ],
      csharp: [
        "private int partition(int[] arr, int low, int high){", //1
        "    int randomIndex = low + _random.Next(high - low + 1);", //2
        "    swap(arr, low, randomIndex);", //3
        "    int pivot = arr[low];", //4
        "    int i = low;", //5
        "    int j = high;", //6
        "    while (i < j){", //7
        "        while (arr[i] <= pivot && i <= high - 1){", //8
        "            i++;", //9
        "        }", //10
        "        while (arr[j] > pivot && j >= low + 1){", //11
        "            j--;", //12
        "        }", //13
        "        if (i < j){", //14
        "           swap(arr, arr[i], arr[j]);", //15
        "        }", //16
        "    }", //17
        "    swap(arr, low, j);", //18
        "    return j;", //19
        "}", //20
        "private void quickSort(int[] arr, int low, int high){", //21
        "    if (low < high){", //22
        "        int pIndex = this.partition(arr, low, high);", //23
        "        this.quickSort(arr, low, pIndex - 1);", //24
        "        this.quickSort(arr, pIndex + 1, high);", //25
        "    }", //26
        "}", //27
        "private void swap(int[] arr, int i, int j) {", //28
        "    int temp = arr[i];", //29
        "    arr[i] = arr[j];", //30
        "    arr[j] = temp;", //31
        "}", //32
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = quickSort.getCodeLines(language);
    return lines.join("\n");
  },
};
