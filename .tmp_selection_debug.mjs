import { selectionSort } from './src/components/algorithms/sorting/Visualizer/selectionSort.js';

const arr = [4,3,2,1];
const steps = selectionSort.generateSteps(arr, 'csharp');
console.log('[selectionSort debug] language=csharp array=', arr);
console.log('total steps:', steps.length);
steps.forEach((s, i) => {
  const min = s.min ? `${s.min.value}@${s.min.index}` : null;
  const j = s.j ? `${s.j.value}` : null;
  console.log(`idx=${i} phase=${s.phase} codeLine=${s.codeLine} min=${min} j=${j} description=${s.description}`);
});
