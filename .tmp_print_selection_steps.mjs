import { selectionSort } from './src/components/algorithms/sorting/Visualizer/selectionSort.js';

const arr = [5, 1, 4, 2, 8];
const steps = selectionSort.generateSteps(arr, 'csharp');
console.log('Total steps:', steps.length);
for (let i = 0; i < steps.length; i++) {
  const s = steps[i];
  if (['outer_loop','min_update','swap_step','swap','no_swap','no_change'].includes(s.phase)) {
    console.log(i, s.phase, 'desc=', s.description, 'min=', s.min ? JSON.stringify(s.min) : (s.comparing ? JSON.stringify(s.comparing) : ''), 'temp=', s.temp ? JSON.stringify(s.temp) : '');
  }
}
