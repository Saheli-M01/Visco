import { mergeSort } from './src/components/algorithms/sorting/Visualizer/mergeSort.js';

const arr = [5,3,1];
const steps = mergeSort.generateSteps(arr, 'javascript');

console.log('Total steps:', steps.length);
for (let i = 0; i < steps.length; i++) {
  const s = steps[i];
  if (s.phase === 'call-left' || s.phase === 'call-right') {
    console.log(i, s.phase, 'low=', s.low, 'high=', s.high, 'desc=', s.description);
  }
}

// Print last few steps for inspection
console.log('Last 10 steps:');
steps.slice(-10).forEach((s, idx) => console.log(steps.length-10+idx, s.phase, s.low, s.high, s.description));
