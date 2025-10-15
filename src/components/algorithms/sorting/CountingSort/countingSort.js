// Counting Sort visualization - assumes non-negative integer inputs
export const countingSort = {
  name: "Counting Sort",

  generateSteps: (arr, language = "javascript") => {
    const steps = [];
    if (arr.length === 0) return steps;
    const a = [...arr].map((v) => Math.floor(v));
    const max = Math.max(...a);
    const count = new Array(max + 1).fill(0);

    for (let i = 0; i < a.length; i++) {
      count[a[i]]++;
      steps.push({
        array: [...a],
        comparing: [i],
        swapped: [],
        description: `Increment count[${a[i]}] to ${count[a[i]]}`,
        codeLine: 2,
        phase: "count",
      });
    }

    let idx = 0;
    for (let v = 0; v < count.length; v++) {
      while (count[v] > 0) {
        a[idx++] = v;
        count[v]--;
        steps.push({
          array: [...a],
          comparing: [],
          swapped: [idx - 1],
          description: `Place ${v} into array at ${idx - 1}`,
          codeLine: 3,
          phase: "reconstruct",
        });
      }
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
      cpp: [
        "vector<int> countsort(vector<int>& arr, int n) {", //1
        "        int maxval = 0;", //2
        "        for (int i = 0; i < n; i++){", //3
        "             maxval = max(maxval, arr[i]);", //4
        "        }", //5
        "        vector<int> cntArr(maxval + 1, 0);", //6
        "        for (int i = 0; i < n; i++){", //7
        "             cntArr[arr[i]]++;", //8
        "        }", //9
        "        for (int i = 1; i <= maxval; i++){", //10
        "             cntArr[i] += cntArr[i - 1];", //11
        "        }", //12
        "        vector<int> ans(n);", //13
        "        for (int i = n - 1; i >= 0; i--) {", //14
        "             ans[cntArr[arr[i]] - 1] = arr[i];", //15
        "             cntArr[arr[i]]--;", //16
        "        }", //17
        "       return ans;", //18
        "}", //19
      ],
      csharp: [
        "public static int[] countsort(int[] arr, int n) {", //1
        "    int maxval = 0;", //2
        "    for (int i = 0; i < n; i++) {", //3
        "        maxval = Math.Max(maxval, arr[i]);", //4
        "    }", //5
        "    int[] cntArr = new int[maxval + 1];", //6
        "    for (int i = 0; i < n; i++) {", //7
        "        cntArr[arr[i]]++;", //8
        "    }", //9
        "    for (int i = 1; i <= maxval; i++) {", //10
        "        cntArr[i] += cntArr[i - 1];", //11
        "    }", //12
        "    int[] ans = new int[n];", //13
        "    for (int i = n - 1; i >= 0; i--) {", //14
        "        ans[cntArr[arr[i]] - 1] = arr[i];", //15
        "        cntArr[arr[i]]--;", //16
        "    }", //17
        "    return ans;", //18
        "}", //19
      ],

      javascript: [
        "function countsort(arr, n) {", //1
        "    let maxval = 0;", //2
        "    for (let i = 0; i < n; i++) {", //3
        "        maxval = Math.max(maxval, arr[i]);", //4
        "    }", //5
        "    const cntArr = new Array(maxval + 1).fill(0);", //6
        "    for (let i = 0; i < n; i++) {", //7
        "        cntArr[arr[i]]++;", //8
        "    }", //9
        "    for (let i = 1; i <= maxval; i++) {", //10
        "        cntArr[i] += cntArr[i - 1];", //11
        "    }", //12
        "    const ans = new Array(n);", //13
        "    for (let i = n - 1; i >= 0; i--) {", //14
        "        ans[cntArr[arr[i]] - 1] = arr[i];", //15
        "        cntArr[arr[i]]--;", //16
        "    }", //17
        "    return ans;", //18
        "}", //19
      ],

      java: [
        "public static int[] countsort(int[] arr, int n) {", //1
        "    int maxval = 0;", //2
        "    for (int i = 0; i < n; i++) {", //3
        "        maxval = Math.max(maxval, arr[i]);", //4
        "    }", //5
        "    int[] cntArr = new int[maxval + 1];", //6
        "    for (int i = 0; i < n; i++) {", //7
        "        cntArr[arr[i]]++;", //8
        "    }", //9
        "    for (int i = 1; i <= maxval; i++) {", //10
        "        cntArr[i] += cntArr[i - 1];", //11
        "    }", //12
        "    int[] ans = new int[n];", //13
        "    for (int i = n - 1; i >= 0; i--) {", //14
        "        ans[cntArr[arr[i]] - 1] = arr[i];", //15
        "        cntArr[arr[i]]--;", //16
        "    }", //17
        "    return ans;", //18
        "}", //19
      ],

      python: [
        "def countsort(arr, n):", //1
        "    maxval = 0", //2
        "    for i in range(n):", //3
        "        maxval = max(maxval, arr[i])", //4
        "", //5
        "    cntArr = [0] * (maxval + 1)", //6
        "    for i in range(n):", //7
        "        cntArr[arr[i]] += 1", //8
        "", //9
        "    for i in range(1, maxval + 1):", //10
        "        cntArr[i] += cntArr[i - 1]", //11
        "", //12
        "    ans = [0] * n", //13
        "    for i in range(n - 1, -1, -1):", //14
        "        ans[cntArr[arr[i]] - 1] = arr[i]", //15
        "        cntArr[arr[i]] -= 1", //16
        "", //17
        "    return ans", //18
        "", //19
      ],
      
    };

    return lines[language] || lines.javascript;
  },
 getCode: (language) => {
    const lines = countingSort.getCodeLines(language);
    return lines.join("\n");
  },
};
