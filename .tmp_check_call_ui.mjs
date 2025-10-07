import { mergeSort } from './src/components/algorithms/sorting/Visualizer/mergeSort.js';

const arr = [5,3,8,1,2];
const steps = mergeSort.generateSteps(arr, 'javascript');

function computeActiveCallFrames(steps, uptoIndex) {
  const activeCallFrames = [];
  for (let i = 0; i <= Math.min(uptoIndex, steps.length - 1); i++) {
    const st = steps[i];
    if (!st || !st.phase) continue;
    if (st.phase === 'start' || st.phase === 'call-left' || st.phase === 'call-right') {
      activeCallFrames.push({ kind: st.phase, low: st.low, mid: st.mid || null, high: st.high });
    } else if (st.phase === 'left-complete') {
      for (let p = activeCallFrames.length - 1; p >= 0; p--) {
        if (activeCallFrames[p].kind === 'call-left') { activeCallFrames.splice(p, 1); break; }
      }
    } else if (st.phase === 'right-complete') {
      for (let p = activeCallFrames.length - 1; p >= 0; p--) {
        if (activeCallFrames[p].kind === 'call-right') { activeCallFrames.splice(p, 1); break; }
      }
    }
  }
  return activeCallFrames;
}

for (let idx = 0; idx < Math.min(10, steps.length); idx++) {
  const step = steps[idx];
  const frames = computeActiveCallFrames(steps, idx);
  const showCallUI = frames.length > 0 && !(step && step.phase === 'completed');
  console.log(`step ${idx} phase=${step.phase} desc=${step.description || ''} => frames=${frames.length} showCallUI=${showCallUI}`);
  if (frames.length > 0) {
    frames.forEach((f, i) => console.log(`  frame ${i+1}: kind=${f.kind} low=${f.low} mid=${f.mid?f.mid.value:'-'} high=${f.high}`));
  }
}

console.log('total steps:', steps.length);
