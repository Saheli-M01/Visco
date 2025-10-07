// Merge Sort Algorithm Implementation (instrumented for visualization)
export const mergeSort = {
  name: "Merge Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    
    // Direct line number constants (no calculation needed)
    const HEADER_LINE = 28;
    const COND_LINE = 29;
    const RETURN_LINE = 30;
    const MID_LINE = 31;
    const LEFT_CALL_LINE = 32;
    const RIGHT_CALL_LINE = 33;
    const MERGE_CALL_LINE = 34;
    const WHILE_END_LINE = 14;

    // Merge function lines (fixed)
    const MERGE_HEADER_LINE = 1;
    const MERGE_COMPARE_LINE = 5;
    const MERGE_WRITE_LINE = 7;
    const MERGE_WHILE_END_LINE = 14;

    // Merge helper that records step-by-step actions for visualization
    function merge(low, mid, high) {
      const n1 = mid - low + 1;
      const n2 = high - mid;
      const L = new Array(n1);
      const R = new Array(n2);

      for (let ii = 0; ii < n1; ii++) L[ii] = a[low + ii];
      for (let jj = 0; jj < n2; jj++) R[jj] = a[mid + 1 + jj];

      let i = 0, j = 0, k = low;
      const tempArray = [];

      // Visualize the ranges being merged
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Forming Temp array or list`,
        codeLine: MERGE_HEADER_LINE,
        phase: "form-temp",
        mergeRange: [low, high],
        leftRange: [low, mid],
        rightRange: [mid + 1, high],
        mid: { value: mid, leftIndex: low, rightIndex: high },
      });

      // Expose the left variable right after temp is formed
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `int left = ${low}`,
        codeLine: MERGE_HEADER_LINE + 1,
        phase: "set-left",
        leftVar: { value: low },
        mergeRange: [low, high],
        mid: { value: mid, leftIndex: low, rightIndex: high },
      });

      // Expose the right pointer start after left initialization
      const rightPtrStart = mid + 1;
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `int right = ${rightPtrStart}`,
        codeLine: MERGE_HEADER_LINE + 2,
        phase: "set-right",
        rightVar: { value: rightPtrStart },
        mergeRange: [low, high],
        mid: { value: mid, leftIndex: low, rightIndex: high },
      });

      // Merge while both have elements
      for (;;) {
        const leftPtr = low + i;
        const rightPtr = mid + 1 + j;

        // Check while condition
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `while (${leftPtr} <= ${mid} && ${rightPtr} <= ${high})`,
          codeLine: MERGE_COMPARE_LINE,
          phase: "while-check",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr,
          rightPtr,
          leftVar: { value: leftPtr },
          rightVar: { value: rightPtr },
          tempArray: [...tempArray],
        });

        // If the while condition is false, exit
        if (!(i < n1 && j < n2)) {
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `While condition false - exit loop`,
            codeLine: WHILE_END_LINE,
            phase: "while-exit",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i,
            rightPtr: mid + 1 + j,
            leftVar: { value: low + i },
            rightVar: { value: mid + 1 + j },
            tempArray: [...tempArray],
          });

          // Check remaining left elements
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `check while (${low + i} <= ${mid})`,
            codeLine: 15,
            phase: "while-left-check",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i,
            rightPtr: mid + 1 + j,
            leftVar: { value: low + i },
            rightVar: { value: mid + 1 + j },
            tempArray: [...tempArray],
          });

          // If no remaining left, we will handle the right remainder after
          // the left remainder loop completes — do not emit the right-check
          // here to avoid creating a duplicate check step.

          break;
        }

        // Check if-statement
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `Check if ${L[i]} <= ${R[j]}`,
          codeLine: 6,
          phase: "if-check",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr: low + i,
          rightPtr: mid + 1 + j,
          leftVar: { value: low + i },
          rightVar: { value: mid + 1 + j },
          tempArray: [...tempArray],
        });

        if (L[i] <= R[j]) {
          tempArray.push(L[i]);
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `tempArray.push(${L[i]})`,
            codeLine: 7,
            phase: "push-temp",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i,
            rightPtr: mid + 1 + j,
            leftVar: { value: low + i },
            rightVar: { value: mid + 1 + j },
            tempArray: [...tempArray],
          });

          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `left++ (move left pointer)`,
            codeLine: 8,
            phase: "increment-left",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i + 1,
            leftVar: { value: low + i + 1 },
            rightPtr: mid + 1 + j,
            rightVar: { value: mid + 1 + j },
            tempArray: [...tempArray],
          });

          i++;
        } else {
          tempArray.push(R[j]);
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `tempArray.push(${R[j]})`,
            codeLine: 11,
            phase: "push-temp",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i,
            rightPtr: mid + 1 + j,
            leftVar: { value: low + i },
            rightVar: { value: mid + 1 + j },
            tempArray: [...tempArray],
          });

          steps.push({
            array: [...a],
            comparing: [],
            swapped: [],
            description: `right++ (move right pointer)`,
            codeLine: 12,
            phase: "increment-right",
            mid: { value: mid, leftIndex: low, rightIndex: high },
            leftPtr: low + i,
            leftVar: { value: low + i },
            rightPtr: mid + 1 + j + 1,
            rightVar: { value: mid + 1 + j + 1 },
            tempArray: [...tempArray],
          });

          j++;
        }
        k++;
      }

      // Remaining elements from left
      while (i < n1) {
        tempArray.push(L[i]);
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `tempArray.push(${L[i]}) (remainder from left)`,
          codeLine: 16,
          phase: "push-temp",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr: low + i,
          rightPtr: mid + 1 + j,
          leftVar: { value: low + i },
          rightVar: { value: mid + 1 + j },
          tempArray: [...tempArray],
        });
        // highlight the left++ line (pointer move) as a separate step
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `left++ (move left pointer)`,
          codeLine: 17,
          phase: "increment-left",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr: low + i + 1,
          leftVar: { value: low + i + 1 },
          rightPtr: mid + 1 + j,
          rightVar: { value: mid + 1 + j },
          tempArray: [...tempArray],
        });
        i++;
        k++;
      }
      // When left remainder loop completes, emit an explicit exit step so the
      // UI highlights the post-while line (failure) — align to the left++ line
      // index so users see the correct highlighted line when the loop ends.
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Left remainder finished`,
        codeLine: 18,
        phase: "while-left-exit",
        mid: { value: mid, leftIndex: low, rightIndex: high },
        leftPtr: low + i,
        rightPtr: mid + 1 + j,
        leftVar: { value: low + i },
        rightVar: { value: mid + 1 + j },
        tempArray: [...tempArray],
      });

      // Next while loop: Remaining elements from right — emit an explicit
      // check before entering the loop so it mirrors the left remainder
      // behavior (check -> push-temp -> increment -> repeat -> exit).
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `check while (${mid + 1 + j} <= ${high})`,
        codeLine: 19,
        phase: "while-right-check",
        mid: { value: mid, leftIndex: low, rightIndex: high },
        leftPtr: low + i,
        rightPtr: mid + 1 + j,
        leftVar: { value: low + i },
        rightVar: { value: mid + 1 + j },
        tempArray: [...tempArray],
      });

      // Remaining elements from right
      while (j < n2) {
        tempArray.push(R[j]);
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `tempArray.push(${R[j]}) (remainder from right)`,
          codeLine: 20,
          phase: "push-temp",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr: low + i,
          rightPtr: mid + 1 + j,
          leftVar: { value: low + i },
          rightVar: { value: mid + 1 + j },
          tempArray: [...tempArray],
        });
        // highlight the right++ line (pointer move) as a separate step
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `right++ (move right pointer)`,
          codeLine: 21,
          phase: "increment-right",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          leftPtr: low + i,
          leftVar: { value: low + i },
          rightPtr: mid + 1 + j + 1,
          rightVar: { value: mid + 1 + j + 1 },
          tempArray: [...tempArray],
        });
        j++;
        k++;
      }
      // Emit an explicit exit step for the right remainder loop as well so the
      // UI highlights the post-while failure line (align with right++ line).
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Right remainder finished`,
        codeLine: 22,
        phase: "while-right-exit",
        mid: { value: mid, leftIndex: low, rightIndex: high },
        leftPtr: low + i,
        rightPtr: mid + 1 + j,
        leftVar: { value: low + i },
        rightVar: { value: mid + 1 + j },
        tempArray: [...tempArray],
      });

      // Copy tempArray back into the original array
      for (let t = low; t <= high; t++) {
        // Emit a for-iteration step first (highlight the for-loop header)
        // so the UI shows i before the write happens.
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [],
          description: `for (i = ${t}; i <= ${high}; i++)`,
          codeLine: 23,
          phase: "for-iteration",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          iVar: { value: t },
          tempArray: [...tempArray],
        });

        // Now perform the write and emit the write step which shows the
        // array element changing while the write line (codeLine 25) is highlighted.
        a[t] = tempArray[t - low];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [t],
          description: `Write ${tempArray[t - low]} to index ${t}`,
          codeLine: 24,
          phase: "write",
          mid: { value: mid, leftIndex: low, rightIndex: high },
          iVar: { value: t },
          tempArray: [...tempArray],
        });
      }

      // Mark the merged range as completed
      const mergedIndices = [];
      for (let idx = low; idx <= high; idx++) mergedIndices.push(idx);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: mergedIndices,
        description: `Merged [${low}-${high}]`,
        codeLine: MERGE_CALL_LINE - 1,
        phase: "merge-complete",
        mergeRange: [low, high],
        mid: { value: mid, leftIndex: low, rightIndex: high },
        leftVar: { value: low },
        rightVar: { value: high },
        tempArray: [...tempArray],
      });
    }

    function mergeSortRec(l, r) {
      // Base-case check
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Check base case: is (low = ${l} >= high = ${r})?`,
        codeLine: COND_LINE,
        phase: "condition-check",
        low: l,
        high: r,
      });

      if (l >= r) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [l],
          description: `Base case: single element at ${l}`,
          codeLine: RETURN_LINE,
          phase: "base",
        });
        return;
      }

      // Calculate mid
      const m = Math.floor((l + r) / 2);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Calculate mid: ${l} + (${r} - ${l}) / 2 = ${m}`,
        codeLine: MID_LINE,
        phase: "calculate-mid",
        low: l,
        high: r,
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      // Left recursive call
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call mergeSort(arr, low=${l}, mid=${m})`,
        codeLine: LEFT_CALL_LINE,
        phase: "call-left",
        low: l,
        high: m,
      });

      mergeSortRec(l, m);


      // Right recursive call
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call mergeSort(arr, mid + 1 =${m + 1}, high=${r})`,
        codeLine: RIGHT_CALL_LINE,
        phase: "call-right",
        low: m + 1,
        high: r,
      });

      mergeSortRec(m + 1, r);

     

      // Announce the merge call
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call merge: (arr, ${l}, ${m}, ${r})`,
        codeLine: MERGE_CALL_LINE,
        phase: "conquer",
        mergeRange: [l, r],
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      merge(l, m, r);

      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Subarray sorted: [${l}-${r}]`,
        codeLine: MERGE_CALL_LINE,
        phase: "subarray-sorted",
      });
    }

    // Initial call
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Initial call: mergeSort(arr, 0, ${a.length - 1})`,
      codeLine: HEADER_LINE,
      phase: "start",
      low: 0,
      high: a.length - 1,
    });

    mergeSortRec(0, a.length - 1);

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
        "function merge(arr, low, mid, high) {", //1
        "        const tempArray = [];", //2
        "        let left = low;", //3
        "        let right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                tempArray.push(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArray.push(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArray.push(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArray.push(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (let i = low; i <= high; i++) {", //24
        "            arr[i] = tempArray[i - low];", //25
        "        }", //26
        "    }", //27
        "", //28
        "    function mergeSort(arr, low, high){", //29
        "        if (low >= high)", //30
        "            return;", //31
        "        let mid = low+ Math.floor((high - low) / 2);", //32
        "        mergeSort(arr, low, mid);", //33
        "        mergeSort(arr, mid + 1, high);", //34
        "        merge(arr, low, mid, high);", //35
        "    }", //36
      ],
      python: [
        "def merge(arr, low, mid, high):", //1
        "        tempArray = []", //2
        "        left = low", //3
        "        right = mid + 1", //4
        "", //5
        "        while left <= mid and right <= high:", //6
        "            if arr[left] <= arr[right]:", //7
        "                tempArray.append(arr[left])", //8
        "                left += 1", //9
        "", //10
        "            else:", //11
        "                tempArray.append(arr[right])", //12
        "                right += 1", //13
        "        ", //14
        "", //15
        "        while left <= mid:", //16
        "            tempArray.append(arr[left])", //17
        "            left += 1", //18
        "        ", //19
        "        while right <= high:", //20
        "            tempArray.append(arr[right])", //21
        "            right += 1", //22
        "        ", //23
        "        for i in range(low, high+1):", //24
        "            arr[i] = tempArray[i - low]", //25
        "", //26
        "", //27
        "", //28
        "def mergeSort(arr, low, high):", //29
        "    if low >= high:", //30
        "        return", //31
        "    mid = low + (high - low) // 2", //32
        "    mergeSort(arr, low, mid)", //33
        "    mergeSort(arr, mid + 1, high)", //34
        "    merge(arr, low, mid, high)", //35
        "", //36
      ],
      cpp: [
        "void merge(vector<int> &arr, int low, int mid, int high) {", //1
        "        vector<int> tempArray;", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high){", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                tempArray.push_back(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArray.push_back(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArray.push_back(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArray.push_back(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArray[i - low];", //25
        "        }", //26
        "    }", //27
        "", //28
        "    void mergeSort(vector<int> &arr, int low, int high){", //29
        "        if (low >= high)", //30
        "            return;", //31
        "        int mid = low + (high - low) / 2;", //32
        "        mergeSort(arr, low, mid);", //33
        "        mergeSort(arr, mid + 1, high);", //34
        "        merge(arr, low, mid, high);", //35
        "    }", //36
      ],
      csharp: [
        "void merge(int[] arr, int low, int mid, int high) {", //1
        "        List<int> tempArray = new List<int>();", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               tempArray.Add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArray.Add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArray.Add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArray.Add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArray[i - low];", //25
        "        }", //26
        "    }", //27
        "", //28
        "    void mergeSort(int[] arr, int low, int high){", //29
        "        if (low >= high)", //30
        "            return;", //31
        "        int mid = low + (high - low) / 2;", //32
        "        this.mergeSort(arr, low, mid);", //33
        "        this.mergeSort(arr, mid + 1, high)", //34
        "        this.merge(arr, low, mid, high);", //35
        "    }", //36
      ],
      java: [
        "void merge(int[] arr, int low, int mid, int high) {", //1
        "        int[] tempArray = new int[high - low + 1];", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               tempArray.add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArray.add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArray.add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArray.add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArray[i - low];", //25
        "        }", //26
        "    }", //27
        "", //28
        "    void mergeSort(int[] arr, int low, int high){", //29
        "        if (low >= high)", //30
        "            return;", //31
        "        int mid = low+ (high - low) / 2;", //32
        "        mergeSort(arr, low, mid);", //33
        "        mergeSort(arr, mid + 1, high);", //34
        "        merge(arr, low, mid, high);", //35
        "    }", //36
      ],
    };

    return lines[language] || lines.javascript;
  },

  getCode: (language) => {
    const lines = mergeSort.getCodeLines(language);
    return lines.join('\n');
  },
};