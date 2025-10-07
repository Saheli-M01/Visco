import { mergeSort } from "./src/components/algorithms/sorting/Visualizer/mergeSort.js";
const steps = mergeSort.generateSteps(
  [8, 6, 99, 42, 424, 21, 1, 22, 12, 4],
  "javascript"
);

const formTempIndices = [];
for (let i = 0; i < steps.length; i++) {
  if (steps[i] && steps[i].phase === 'form-temp') formTempIndices.push(i);
}
console.log('found form-temp at indices:', formTempIndices);
if (formTempIndices.length >= 2) {
  const idx = formTempIndices[1];
  console.log('\n--- dumping full steps from', idx - 5, 'to', idx + 20, '---');
  for (let i = Math.max(0, idx - 5); i <= Math.min(steps.length - 1, idx + 20); i++) {
    console.log('\nSTEP', i);
    console.log(JSON.stringify(steps[i], null, 2));
  }
} else {
  console.log('not enough form-temp steps to inspect');
}
console.log('\nTOTAL STEPS', steps.length);
