// Quick Sort Algorithm Implementation (Lomuto partition) with visualization steps
export const quickSort = {
  name: "Quick Sort",

  generateSteps: (arr, language = "javascript", pivotStrategy = "random") => {
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
      let randomIndex = null;

      // If caller requests a random pivot, compute randomIndex
      if (pivotStrategy === "random") {
        randomIndex = low + Math.floor(Math.random() * (high - low + 1));
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

      // Return both the partition index and randomIndex (if any)
      return { pIndex: pivotIdx, randomIndex };
    }

    // Line-numbered steps for call-card and base-case check
    // Keep these in sync with getCodeLines(language): function quickSort starts at line 21
    const FUNC_ENTRY_LINE = 20; // call quickSort highlight
    const COND_LINE = 21; // base-case check highlight
    const PINDEX_LINE = 22; // pIndex = partition line

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
        pIndex: null,
      });

     
      const partitionResult = partition(low, high);
      const pIndex = partitionResult.pIndex;
      const randomIndex = partitionResult.randomIndex;

      // STEP 4: Enter partition function (line 1)
      if (randomIndex !== null) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Enter partition: randomIndex = ${low} + Math.floor(Math.random() * (${high} - ${low} + 1)) => ${randomIndex}`,
          codeLine: 1,
          phase: "partition-entry",
          partitionRange: [low, high],
          randomIndex, // Include randomIndex here so ArrayDisplay can show it
        });
      } else {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Enter partition(arr, ${low}, ${high})`,
          codeLine: 1,
          phase: "partition-entry",
          partitionRange: [low, high],
        });
      }

      // Stop here - no more steps
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
