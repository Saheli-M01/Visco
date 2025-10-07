import { mergeSort } from './src/components/algorithms/sorting/Visualizer/mergeSort.js';
const steps = mergeSort.generateSteps([8,6,99,42,424,21,1,22,12,4],'javascript');
for (let i=0;i<8;i++){
  const s = steps[i];
  console.log(i, s.phase, s.description, 'mid=', s.mid ? JSON.stringify(s.mid) : '-')
}
console.log('--- next few ---')
for (let i=3;i<10;i++){
  const s=steps[i];
  console.log(i, s.phase, s.description, 'mid=', s.mid ? JSON.stringify(s.mid) : '-')
}
console.log('total steps', steps.length)
