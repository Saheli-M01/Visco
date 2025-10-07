// Merge Sort Algorithm Implementation (instrumented for visualization)
export const mergeSort = {
  name: "Merge Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];
    
    // Get code lines for proper line number mapping
    const codePreviewLines = mergeSort.getCodeLines(language);
    
    // Find the mergeSort function header line (1-indexed for display)
    const headerIdx0 = codePreviewLines.findIndex((ln) => /mergeSort\s*\(/.test(ln));
    const HEADER_LINE = 28;
    const COND_LINE = HEADER_LINE + 1; // if (low >= high)
    const RETURN_LINE = HEADER_LINE + 2; // return;
    const MID_LINE = HEADER_LINE + 3; // mid calculation
    const LEFT_CALL_LINE = HEADER_LINE + 4; // mergeSort(arr, low, mid)
    const RIGHT_CALL_LINE = HEADER_LINE + 5; // mergeSort(arr, mid + 1, high)
    const MERGE_CALL_LINE = HEADER_LINE + 6; // merge(arr, low, mid, high)

    // Find merge function lines
    const mergeHeaderIdx0 = codePreviewLines.findIndex((ln) => /merge\s*\(/.test(ln));
    const MERGE_HEADER_LINE = mergeHeaderIdx0 >= 0 ? mergeHeaderIdx0 + 1 : 1;
    const MERGE_COMPARE_LINE = MERGE_HEADER_LINE + 6; // comparison line
    const MERGE_WRITE_LINE = MERGE_HEADER_LINE + 7; // write operations

    // Merge helper that records step-by-step actions for visualization
    function merge(left, mid, right) {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = new Array(n1);
      const R = new Array(n2);
      
      for (let i = 0; i < n1; i++) L[i] = a[left + i];
      for (let j = 0; j < n2; j++) R[j] = a[mid + 1 + j];

      let i = 0, j = 0, k = left;

      // Visualize the ranges being merged
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Merging ranges [${left}-${mid}] and [${mid + 1}-${right}]`,
        codeLine: MERGE_HEADER_LINE,
        phase: "merge-start",
        mergeRange: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });

      // Merge while both have elements
      while (i < n1 && j < n2) {
        steps.push({
          array: [...a],
          comparing: [left + i, mid + 1 + j],
          swapped: [],
          description: `Compare ${L[i]} and ${R[j]}`,
          codeLine: MERGE_COMPARE_LINE,
          phase: "comparison",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });

        if (L[i] <= R[j]) {
          a[k] = L[i];
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [k],
            description: `Write ${L[i]} to index ${k}`,
            codeLine: MERGE_WRITE_LINE,
            phase: "write",
            mid: { value: mid, leftIndex: left, rightIndex: right },
          });
          i++;
        } else {
          a[k] = R[j];
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [k],
            description: `Write ${R[j]} to index ${k}`,
            codeLine: MERGE_WRITE_LINE,
            phase: "write",
            mid: { value: mid, leftIndex: left, rightIndex: right },
          });
          j++;
        }
        k++;
      }

      // Remaining elements from left
      while (i < n1) {
        a[k] = L[i];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${L[i]} from left to index ${k}`,
          codeLine: MERGE_WRITE_LINE + 9,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        i++;
        k++;
      }

      // Remaining elements from right
      while (j < n2) {
        a[k] = R[j];
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${R[j]} from right to index ${k}`,
          codeLine: MERGE_WRITE_LINE + 12,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        j++;
        k++;
      }

      // Mark the merged range as completed
      const mergedIndices = [];
      for (let idx = left; idx <= right; idx++) mergedIndices.push(idx);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: mergedIndices,
        description: `Merged [${left}-${right}]`,
        codeLine: MERGE_CALL_LINE,
        phase: "merge-complete",
        mergeRange: [left, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });
    }

    function mergeSortRec(l, r) {
      // Entry to recursion - highlight function header
      // steps.push({
      //   array: [...a],
      //   comparing: [],
      //   swapped: [],
      //   description: `Enter mergeSort(arr, low=${l}, high=${r})`,
      //   codeLine: HEADER_LINE,
      //   phase: "function-entry",
      //   low: l,
      //   high: r,
      // });

      // Base-case check
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Check base case: is low (${l}) >= high (${r})?`,
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
      const leftCallLow = l;
      const leftCallHigh = m;
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call mergeSort(arr, low=${leftCallLow}, mid=${leftCallHigh})`,
        codeLine: LEFT_CALL_LINE,
        phase: "call-left",
        low: leftCallLow,
        high: leftCallHigh,
      });

      mergeSortRec(leftCallLow, leftCallHigh);

      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Left complete: [${l}-${m}]`,
        codeLine: LEFT_CALL_LINE - 2,
        phase: "left-complete",
      });

      // Right recursive call
      const rightCallLow = m + 1;
      const rightCallHigh = r;
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Call mergeSort(arr, mid + 1 =${rightCallLow}, high=${rightCallHigh})`,
        codeLine: RIGHT_CALL_LINE,
        phase: "call-right",
        low: rightCallLow,
        high: rightCallHigh,
      });

      mergeSortRec(rightCallLow, rightCallHigh);

      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Right complete: [${m + 1}-${r}]`,
        codeLine: RIGHT_CALL_LINE - 3,
        phase: "right-complete",
      });

      // Merge call
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Conquer: merge [${l}-${m}] & [${m + 1}-${r}]`,
        codeLine: MERGE_CALL_LINE,
        phase: "conquer",
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
        "        const tempArrayArray = [];", //2
        "        let left = low;", //3
        "        let right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                tempArrayArray.push(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArrayArray.push(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArrayArray.push(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArrayArray.push(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (let i = low; i <= high; i++) {", //24
        "            arr[i] = tempArrayArray[i - low];", //25
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
        "        tempArrayArray = []", //2
        "        left = low", //3
        "        right = mid + 1", //4
        "", //5
        "        while left <= mid and right <= high:", //6
        "            if arr[left] <= arr[right]:", //7
        "                tempArrayArray.append(arr[left])", //8
        "                left += 1", //9
        "", //10
        "            else:", //11
        "                tempArrayArray.append(arr[right])", //12
        "                right += 1", //13
        "        ", //14
        "", //15
        "        while left <= mid:", //16
        "            tempArrayArray.append(arr[left])", //17
        "            left += 1", //18
        "        ", //19
        "        while right <= high:", //20
        "            tempArrayArray.append(arr[right])", //21
        "            right += 1", //22
        "        ", //23
        "        for i in range(low, high+1):", //24
        "            arr[i] = tempArrayArray[i - low]", //25
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
        "        vector<int> tempArrayArray;", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high){", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                tempArrayArray.push_back(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArrayArray.push_back(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArrayArray.push_back(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArrayArray.push_back(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArrayArray[i - low];", //25
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
        "        List<int> tempArrayArray = new List<int>();", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               tempArrayArray.Add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArrayArray.Add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArrayArray.Add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArrayArray.Add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArrayArray[i - low];", //25
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
        "        int[] tempArrayArray = new int[high - low + 1];", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               tempArrayArray.add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                tempArrayArray.add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            tempArrayArray.add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            tempArrayArray.add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = tempArrayArray[i - low];", //25
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
    // Build the preview code by joining the code lines defined in getCodeLines
    // This ensures the preview text exactly matches the per-line highlighting
    // and avoids duplication between getCodeLines and getCode.
    const lines = (typeof mergeSort !== 'undefined' && mergeSort.getCodeLines)
      ? mergeSort.getCodeLines(language)
      : null;

    const fallback = (typeof mergeSort !== 'undefined' && mergeSort.getCodeLines)
      ? mergeSort.getCodeLines('javascript')
      : [];

    const chosen = (lines && lines.length) ? lines : fallback;
    return chosen.join('\n');
  },
};
