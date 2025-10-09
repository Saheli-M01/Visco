import { quickSort } from './src/components/algorithms/sorting/Visualizer/quickSort.js';

const steps = quickSort.generateSteps([5, 3, 7, 1], 'javascript', 'random');

for (let idx = 0; idx < steps.length; idx++) {
  const sortingSteps = steps;
  const currentStepIndex = idx;
  const currentStep = sortingSteps[currentStepIndex] || {};
  const isDone = currentStep && currentStep.phase === 'completed';

  let randomIndexObj = null;
  if (currentStep && currentStep.randomIndex !== undefined) {
    randomIndexObj = { value: currentStep.randomIndex };
  }
  if (!randomIndexObj && sortingSteps && sortingSteps.length > 0) {
    for (let s = currentStepIndex; s >= 0; s--) {
      const st = sortingSteps[s];
      if (!st) continue;
      if (st.randomIndex !== undefined && st.phase === 'partition-entry') {
        randomIndexObj = { value: st.randomIndex };
        break;
      }
    }
  }

  const showRandomIndexUI = !isDone && !!randomIndexObj && currentStep && currentStep.phase === 'partition-entry';

  console.log('step', idx, 'phase=', currentStep.phase, 'randomIndexObj=', randomIndexObj, 'showRandomIndexUI=', showRandomIndexUI);
}
