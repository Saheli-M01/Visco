import { quickSort } from './src/components/algorithms/sorting/Visualizer/quickSort.js';

const steps = quickSort.generateSteps([4,3,2,1], 'javascript');
console.log('total steps:', steps.length);
const pidx = steps.findIndex(s=>s && s.phase === 'pindex');
console.log('pindex idx=', pidx);
if(pidx!==-1) console.log('pindex step=', steps[pidx]);
else console.log('no pindex step found');

const startIdx = steps.findIndex(s=>s && s.phase === 'start');
console.log('start idx=', startIdx, 'start step=', steps[startIdx]);
