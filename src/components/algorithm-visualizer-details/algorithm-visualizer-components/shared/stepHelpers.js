// Shared helper utilities for algorithm visualizers
export const safeValue = (v) => (v != null ? v : "-");

export const rangeMatches = (a, b) =>
  Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1];

export const parseIndexFromDesc = (desc, key) => {
  if (!desc || typeof desc !== "string") return null;
  // Try a few patterns: 'key => number', 'key = number', or 'key:number' and return the last numeric match if any.
  const arrowPattern = new RegExp(`${key}\\s*=>\\s*(\\d+)`);
  const eqPattern = new RegExp(`${key}\\s*=\\s*(\\d+)`);
  const colonPattern = new RegExp(`${key}\\s*:\\s*(\\d+)`);

  let m = desc.match(arrowPattern);
  if (m) return Number(m[1]);
  m = desc.match(eqPattern);
  if (m) return Number(m[1]);
  m = desc.match(colonPattern);
  if (m) return Number(m[1]);

  // Fallback: find all numbers and return the last one (useful if description contains '... => 0  randomIndex=4' style)
  const allNums = desc.match(/(\d+)/g);
  if (allNums && allNums.length) return Number(allNums[allNums.length - 1]);
  return null;
};

// Generic function to find persisted value from earlier steps
export const findPersistedValue = (
  sortingSteps,
  startIndex,
  fieldNames,
  scopeCheck = null
) => {
  const fields = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
  for (let s = startIndex; s >= 0; s--) {
    const st = sortingSteps[s];
    if (!st) continue;
    if (scopeCheck && !scopeCheck(st)) break;
    for (const f of fields) {
      if (st[f] !== undefined && st[f] !== null) return st[f];
    }
  }
  return null;
};
