// Merge Sort Algorithm Implementation (instrumented for visualization)
export const mergeSort = {
  name: "Merge Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    const a = [...arr];

    // Merge helper that records step-by-step actions for visualization
    function merge(left, mid, right) {
      const n1 = mid - left + 1;
      const n2 = right - mid;
      const L = new Array(n1);
      const R = new Array(n2);
      for (let i = 0; i < n1; i++) L[i] = a[left + i];
      for (let j = 0; j < n2; j++) R[j] = a[mid + 1 + j];

      // pointers into L, R and the main array
      let i = 0,
        j = 0,
        k = left;

      // Visualize the ranges being merged with mid information
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Merging ranges [${left}-${mid}] and [${
          mid + 1
        }-${right}]`,
        codeLine: 7,
        phase: "merge-start",
        mergeRange: [left, right],
        leftRange: [left, mid],
        rightRange: [mid + 1, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });

      // merge while both have elements
      while (i < n1 && j < n2) {
        // show comparison between the two candidates
        steps.push({
          array: [...a],
          comparing: [left + i, mid + 1 + j],
          swapped: [],
          description: `Compare ${L[i]} and ${R[j]}`,
          codeLine: 10,
          phase: "comparison",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });

        if (L[i] <= R[j]) {
          a[k] = L[i];
          // highlight the index written to and the source
          steps.push({
            array: [...a],
            comparing: [],
            swapped: [k],
            description: `Write ${L[i]} to index ${k}`,
            codeLine: 11,
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
            codeLine: 11,
            phase: "write",
            mid: { value: mid, leftIndex: left, rightIndex: right },
          });
          j++;
        }
        k++;
      }

      // remaining elements from left
      while (i < n1) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${L[i]} from left to index ${k}`,
          codeLine: 13,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        a[k] = L[i];
        i++;
        k++;
      }

      // remaining elements from right
      while (j < n2) {
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [k],
          description: `Write remainder ${R[j]} from right to index ${k}`,
          codeLine: 14,
          phase: "write",
          mid: { value: mid, leftIndex: left, rightIndex: right },
        });
        a[k] = R[j];
        j++;
        k++;
      }

      // mark the merged range as completed (for coloration)
      const mergedIndices = [];
      for (let idx = left; idx <= right; idx++) mergedIndices.push(idx);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: mergedIndices,
        description: `Merged [${left}-${right}]`,
        codeLine: 15,
        phase: "merge-complete",
        mergeRange: [left, right],
        mid: { value: mid, leftIndex: left, rightIndex: right },
      });
    }

    function mergeSortRec(l, r) {
      if (l >= r) {
        // single element - base case (visualize as a completed single-item range)
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [l],
          description: `Base case: single element at ${l}`,
          codeLine: 0,
          phase: "base",
        });
        return;
      }

      const m = Math.floor((l + r) / 2);

      // Show the mid calculation step
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Calculate mid: (${l} + ${r}) / 2 = ${m}`,
        codeLine: 1,
        phase: "mid-calculation",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      // Show the divide operation
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Divide [${l}-${r}] -> [${l}-${m}] & [${m + 1}-${r}]`,
        codeLine: 1,
        phase: "divide",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });

      // Enter left recursion
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Enter left: [${l}-${m}]`,
        codeLine: 2,
        phase: "divide-enter",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      mergeSortRec(l, m);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Left complete: [${l}-${m}]`,
        codeLine: 2,
        phase: "divide-done",
      });

      // Enter right recursion
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Enter right: [${m + 1}-${r}]`,
        codeLine: 2,
        phase: "divide-enter",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      mergeSortRec(m + 1, r);
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Right complete: [${m + 1}-${r}]`,
        codeLine: 2,
        phase: "divide-done",
      });

      // Conquer: about to merge the two halves
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Conquer: merge [${l}-${m}] & [${m + 1}-${r}]`,
        codeLine: 1,
        phase: "conquer",
        mid: { value: m, leftIndex: l, rightIndex: r },
      });
      merge(l, m, r);

      // Subarray sorted
      steps.push({
        array: [...a],
        comparing: [],
        swapped: [],
        description: `Subarray sorted: [${l}-${r}]`,
        codeLine: 6,
        phase: "subarray-sorted",
      });
    }

    // Top-level call to mergeSort: show the initial call with low=0 and high=n-1 (line 29)
    steps.push({
      array: [...a],
      comparing: [],
      swapped: [],
      description: `Call mergeSort(arr, low=${0}, high=${a.length - 1})`,
      codeLine: 28,
      phase: "call",
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
        "        const temp = [];", //2
        "        let left = low;", //3
        "        let right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                temp.push(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                temp.push(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            temp.push(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            temp.push(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (let i = low; i <= high; i++) {", //24
        "            arr[i] = temp[i - low];", //25
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
        "        temp = []", //2
        "        left = low", //3
        "        right = mid + 1", //4
        "", //5
        "        while left <= mid and right <= high:", //6
        "            if arr[left] <= arr[right]:", //7
        "                temp.append(arr[left])", //8
        "                left += 1", //9
        "", //10
        "            else:", //11
        "                temp.append(arr[right])", //12
        "                right += 1", //13
        "        ", //14
        "", //15
        "        while left <= mid:", //16
        "            temp.append(arr[left])", //17
        "            left += 1", //18
        "        ", //19
        "        while right <= high:", //20
        "            temp.append(arr[right])", //21
        "            right += 1", //22
        "        ", //23
        "        for i in range(low, high+1):", //24
        "            arr[i] = temp[i - low]", //25
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
        "        vector<int> temp;", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high){", //6
        "            if (arr[left] <= arr[right]) {", //7
        "                temp.push_back(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                temp.push_back(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            temp.push_back(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            temp.push_back(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = temp[i - low];", //25
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
        "        List<int> temp = new List<int>();", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               temp.Add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                temp.Add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            temp.Add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            temp.Add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = temp[i - low];", //25
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
        "        int[] temp = new int[high - low + 1];", //2
        "        int left = low;", //3
        "        int right = mid + 1;", //4
        "", //5
        "        while (left <= mid && right <= high) {", //6
        "            if (arr[left] <= arr[right]) {", //7
        "               temp.add(arr[left]);", //8
        "                left++;", //9
        "            }", //10
        "            else {", //11
        "                temp.add(arr[right]);", //12
        "                right++;", //13
        "            }", //14
        "        }", //15
        "        while (left <= mid) {", //16
        "            temp.add(arr[left]);", //17
        "            left++;", //18
        "        }", //19
        "        while (right <= high) {", //20
        "            temp.add(arr[right]);", //21
        "            right++;", //22
        "        }", //23
        "        for (int i = low; i <= high; i++) {", //24
        "            arr[i] = temp[i - low];", //25
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
