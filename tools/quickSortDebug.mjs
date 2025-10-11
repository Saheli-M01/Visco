import { quickSort } from '../src/components/algorithms/sorting/QuickSort/quickSort.js';

const arr = [5,3,8,8,1,4];
const steps = quickSort.generateSteps(arr, 'javascript', 'random');

console.log('Generated steps:', steps.length);
steps.forEach((s, i) => {
  console.log(i + 1, s.phase, s.description, s.pIndex !== undefined ? `pIndex=${s.pIndex}` : '', s.randomIndex !== undefined ? `randomIndex=${s.randomIndex}` : '');
});
