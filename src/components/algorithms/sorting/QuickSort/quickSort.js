// Quick Sort Algorithm Implementation (Lomuto partition) with visualization steps
export const quickSort = {
  name: "Quick Sort",

  generateSteps: (arr, language = "javascript", pivotStrategy = "random") => {
    const steps = [];
    const a = [...arr];

    // robust random int generator: prefer Node crypto.randomInt, then browser crypto.getRandomValues, then Math.random
    const getRandomInt = (min, max) => {
      try {
        // Node.js environment

        const crypto = require && require("crypto");
        if (crypto && typeof crypto.randomInt === "function") {
          return crypto.randomInt(min, max + 1);
        }
      } catch (e) {}

      if (
        typeof globalThis !== "undefined" &&
        globalThis.crypto &&
        typeof globalThis.crypto.getRandomValues === "function"
      ) {
        const range = max - min + 1;
        const u = new Uint32Array(1);
        globalThis.crypto.getRandomValues(u);
        return min + (u[0] % range);
      }

      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

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
      let randomIndex = null;

      // If caller requests a random pivot, compute randomIndex
      if (pivotStrategy === "random") {
        randomIndex = getRandomInt(low, high);
        // guard: ensure within bounds and integer
        if (
          !Number.isFinite(randomIndex) ||
          randomIndex < low ||
          randomIndex > high
        ) {
          randomIndex = low;
        }
        pivotIdx = randomIndex;
      } else if (pivotStrategy === "first") {
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

      // Return both the partition index and randomIndex.
      // If randomIndex wasn't explicitly chosen (non-random strategy), return the pivot index
      // as randomIndex so consumers always see a numeric value.
      const returnedRandomIndex =
        randomIndex !== null && randomIndex !== undefined
          ? randomIndex
          : pivotIdx;
      return { pIndex: pivotIdx, randomIndex: returnedRandomIndex };
    }

    // Line-numbered steps for call-card and base-case check
    // Keep these in sync with getCodeLines(language): function quickSort starts at line 21
    const FUNC_ENTRY_LINE = 20; // call quickSort highlight
    const COND_LINE = 21; // base-case check highlight
    const PINDEX_LINE = 22; // pIndex = partition line
    const RANDOM_LINE = 1;
    const FIRST_SWAP_LINE = RANDOM_LINE + 1;
    const WHILE_ENTRY_LINE = 6;
    const FIRST_INNER_WHILE_LINE = 7;
    const SECOND_INNER_WHILE_LINE = 10;
    const COND_I_J_LINE = 13;
    const FINAL_SWAP_LINE = 17;
    const RETURN_J_LINE = FINAL_SWAP_LINE + 1;

    function quickRec(low, high) {
      // STEP 1: Emit function-entry (call) step highlighting line 20
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call quickSort(arr, low=${low}, high=${high})`,
        codeLine: FUNC_ENTRY_LINE,
        phase: "start",
        low,
        high,
      });

      // STEP 2: Emit condition-check step highlighting line 21
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

      // Base case check
      if (low >= high) {
        return;
      }
      // STEP 3: Call partition and emit pIndex step highlighting line 22
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `pIndex = partition(arr, ${low}, ${high})`,
        codeLine: PINDEX_LINE,
        phase: "pindex",
        low,
        high,
      });

      const partitionResult = partition(low, high);

      // Ensure randomIndex is numeric (partition now guarantees a numeric value)
      const randomIndex = partitionResult.randomIndex;

      // STEP 4: Enter partition function (line 1)
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        // Keep the description concise: show final randomIndex only so parsers don't pick up the formula's low value
        description:
          randomIndex !== null
            ? `Enter partition: randomIndex => ${randomIndex}`
            : `Enter partition(arr, ${low}, ${high})`,
        codeLine: RANDOM_LINE,
        phase: "partition-entry",
        partitionRange: [low, high],
        randomIndex: randomIndex, // numeric; include so ArrayDisplay can show it
      });

      // Emit partition-internal steps: swap (line 2), pivot assign (line 3), i-init (line 4), j-init (line 5)
      // If randomIndex exists and differs from low, perform the swap on the working array and emit a swap step
      if (
        randomIndex !== null &&
        randomIndex !== undefined &&
        randomIndex !== low
      ) {
        const tmp = a[low];
        a[low] = a[randomIndex];
        a[randomIndex] = tmp;

        steps.push({
          array: [...a],
          comparing: [],
          swapped: [low, randomIndex],
          description: `swap(arr, ${low}, ${randomIndex})`,
          codeLine: FIRST_SWAP_LINE,
          phase: "swap",
          low,
          high,
          randomIndex,
        });
      } else {
        // Even if no swap is needed (randomIndex === low or no random pivot), emit a no-op swap step for consistency
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `swap(arr, ${low}, ${randomIndex})`,
          codeLine: 2,
          phase: "swap",
          low,
          high,
          randomIndex: randomIndex ?? null,
        });
      }

      // pivot assignment (include actual pivot value)
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `let pivot = arr[${low}] = ${a[low]}`,
        codeLine: 3,
        phase: "pivot-assign",
        low,
        high,
        pivotValue: a[low],
      });

      // i init
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `i = ${low}`,
        codeLine: 4,
        phase: "i-init",
        low,
        high,
        i: low,
      });

      // j init
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `j = ${high}`,
        codeLine: 5,
        phase: "j-init",
        low,
        high,
        j: high,
      });

      // Simulate the full partition loop (while i < j) by repeating scanning and swaps until i >= j
      let iPtr = low;
      let jPtr = high;
      const pivotVal = a[low];

      while (iPtr < jPtr) {
        // Outer while entry
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `while (i < j)`,
          codeLine: WHILE_ENTRY_LINE,
          phase: "while-entry",
          low,
          high,
          conditionResult: true,
        });

        // inner while entry
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `while (arr[i] <= pivot && i <= high - 1)`,
          codeLine: FIRST_INNER_WHILE_LINE,
          phase: "inner-while-i-entry",
          low,
          high,
          pivotValue: pivotVal,
          i: iPtr,
        });

        // advance i
        while (iPtr <= high - 1 && a[iPtr] <= pivotVal) {
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `(${a[iPtr]} <= ${pivotVal} && ${iPtr} <= ${high - 1}  )`,
            codeLine: FIRST_INNER_WHILE_LINE,
            phase: "inner-while-i-cond-true",
            i: iPtr,
            pivotValue: pivotVal,
            low,
            high,
          });

          iPtr += 1;
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `i++ -> ${iPtr}`,
            codeLine: FIRST_INNER_WHILE_LINE + 1,
            phase: "i-inc",
            i: iPtr,
            low,
            high,
          });
        }

        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `arr[i] <= pivot failed (i=${iPtr})`,
          codeLine: FIRST_INNER_WHILE_LINE,
          phase: "inner-while-i-cond-false",
          i: iPtr,
          pivotValue: pivotVal,
          low,
          high,
        });

        // advance j
        // Emit a j-loop entry step (mirror of inner-while-i-entry) so UI can show the j-loop condition
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `while (arr[j] > pivot && j >= low + 1)`,
          codeLine: SECOND_INNER_WHILE_LINE,
          phase: "inner-while-j-entry",
          low,
          high,
          pivotValue: pivotVal,
          j: jPtr,
        });

        while (jPtr >= low + 1 && a[jPtr] > pivotVal) {
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `(${a[jPtr]} > ${pivotVal} && ${jPtr} >= ${low + 1})`,
            codeLine: SECOND_INNER_WHILE_LINE,
            phase: "inner-while-j-cond-true",
            j: jPtr,
            pivotValue: pivotVal,
            low,
            high,
          });

          jPtr -= 1;
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `j-- -> ${jPtr}`,
            codeLine: SECOND_INNER_WHILE_LINE + 1,
            phase: "j-dec",
            j: jPtr,
            low,
            high,
          });
        }

        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `arr[j] > pivot failed (j=${jPtr})`,
          codeLine: SECOND_INNER_WHILE_LINE ,
          phase: "j-cond-false",
          j: jPtr,
          pivotValue: pivotVal,
          low,
          high,
        });

        // Check if we should swap arr[i], arr[j]
        steps.push({
          array: [...a],
          comparing: [iPtr, jPtr],
          swapped: [],
          description: `if (i < j) -> ${iPtr < jPtr}`,
          codeLine: COND_I_J_LINE,
          phase: "if-i-less-j",
          i: iPtr,
          j: jPtr,
          low,
          high,
          conditionResult: iPtr < jPtr,
        });

        if (iPtr < jPtr) {
          const tmp2 = a[iPtr];
          a[iPtr] = a[jPtr];
          a[jPtr] = tmp2;
          steps.push({
            array: [...a],
            comparing: [iPtr, jPtr],
            swapped: [iPtr, jPtr],
            description: `swap(arr, ${iPtr}, ${jPtr})`,
            codeLine: COND_I_J_LINE + 1,
            phase: "inner-swap",
            i: iPtr,
            j: jPtr,
            low,
            high,
          });
          // continue looping
          continue;
        }

        // if not swapped, loop will end; break to do final swap
        break;
      }

      // loop ended: perform final swap arr[low], arr[jPtr] (codeLine 17)
      const tmp3 = a[low];
      a[low] = a[jPtr];
      a[jPtr] = tmp3;
      steps.push({
        array: [...a],
        comparing: [low, jPtr],
        swapped: [low, jPtr],
        description: `swap(arr, ${low}, ${jPtr})`,
        codeLine: FINAL_SWAP_LINE,
        phase: "final-swap",
        low,
        high,
        j: jPtr,
      });

      // Return from partition: return j (codeLine 18) and emit pIndex result
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `return ${jPtr}`,
        codeLine: RETURN_J_LINE,
        phase: "partition-return",
        low,
        high,
        pIndex: jPtr,
      });

      // Also show a pIndex-result step to match previous UI expectations
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `partition returned pIndex = ${jPtr}`,
        codeLine: PINDEX_LINE,
        phase: "",
        low,
        high,
        pIndex: jPtr,
      });

      // Stop here - partition completed and returned pIndex
      return;
    }

    quickRec(0, a.length - 1);

    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: "Sorting visualization stopped at partition entry",
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
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = quickSort.getCodeLines(language);
    return lines.join("\n");
  },
};
