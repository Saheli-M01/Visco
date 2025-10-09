import { quickSort } from './src/components/algorithms/sorting/Visualizer/quickSort.js';

// Request a random pivot so the generator will produce a randomIndex step
const steps = quickSort.generateSteps([4, 3, 2, 1], 'javascript', 'random');
console.log('total steps:', steps.length);

// Find and print any randomize steps (or steps that include randomIndex)
const randomSteps = steps
	.map((s, idx) => ({ s, idx }))
	.filter(({ s }) => s && (s.randomIndex !== undefined || s.phase === 'randomize'));

console.log('randomize steps found:', randomSteps.length);
randomSteps.forEach(({ s, idx }) => {
	console.log('randomize step index=', idx, 'step=', s);
});

const pidx = steps.findIndex((s) => s && s.phase === 'pindex');
console.log('pindex idx=', pidx);
if (pidx !== -1) {
	console.log('pindex step=', steps[pidx]);
	// print a few steps around pindex for context
	const start = Math.max(0, pidx - 3);
	const end = Math.min(steps.length - 1, pidx + 3);
	console.log('steps around pindex:');
	for (let i = start; i <= end; i++) console.log(i, steps[i] && steps[i].phase, steps[i]);
} else console.log('no pindex step found');

const startIdx = steps.findIndex((s) => s && s.phase === 'start');
console.log('start idx=', startIdx, 'start step=', steps[startIdx]);
