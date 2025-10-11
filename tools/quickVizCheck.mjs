import { quickSort } from '../src/components/algorithms/sorting/QuickSort/quickSort.js';
import { findPersistedValue, parseIndexFromDesc } from '../src/components/algorithm-visualizer-details/algorithm-visualizer-components/shared/stepHelpers.js';

const arr = [5,3,8,1,4];
const steps = quickSort.generateSteps(arr, 'javascript', 'random');
console.log('Generated steps:', steps.length);
steps.forEach((s, i) => {
  console.log(i, s.phase, s.description, s.pIndex !== undefined ? `pIndex=${s.pIndex}` : '', s.randomIndex !== undefined ? `randomIndex=${s.randomIndex}` : '');
});

const idx = steps.findIndex(s => s.phase === 'partition-entry');
console.log('\npartition-entry index (first):', idx);
const currentStepIndex = idx;
const currentStep = steps[currentStepIndex];

const backward = findPersistedValue(steps, currentStepIndex, ['randomIndex']);
console.log('findPersistedValue backward ->', backward);

let forwardFound = null;
for (let s = currentStepIndex + 1; s < Math.min(steps.length, currentStepIndex + 6); s++) {
  const st = steps[s];
  if (st && st.randomIndex !== undefined && st.randomIndex !== null) {
    forwardFound = st.randomIndex;
    break;
  }
}
console.log('forwardFound ->', forwardFound);

let parsed = null;
if (backward == null && forwardFound == null) {
  for (let s = Math.max(0, currentStepIndex - 3); s < Math.min(steps.length, currentStepIndex + 6); s++) {
    const st = steps[s];
    if (!st) continue;
    const p = parseIndexFromDesc(st.description, 'randomIndex');
    if (p != null) {
      parsed = p;
      break;
    }
  }
}
console.log('parsed from desc ->', parsed);

console.log('\ncurrentStep:', currentStep);
console.log('\nNearby steps:');
for (let s = Math.max(0, currentStepIndex-3); s < Math.min(steps.length, currentStepIndex+6); s++) {
  console.log(s, steps[s] && {phase: steps[s].phase, randomIndex: steps[s].randomIndex, description: steps[s].description});
}
