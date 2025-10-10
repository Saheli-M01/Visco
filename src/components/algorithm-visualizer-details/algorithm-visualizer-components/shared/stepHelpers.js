// Shared helper utilities for algorithm visualizers
export const safeValue = (v) => (v != null ? v : "-");

export const rangeMatches = (a, b) =>
  Array.isArray(a) && Array.isArray(b) && a[0] === b[0] && a[1] === b[1];

export const parseIndexFromDesc = (desc, key) => {
  if (!desc || typeof desc !== "string") return null;
  // Use escaped backslashes so the RegExp receives the proper pattern: e.g. /i\s*=\s*(\d+)/
  const pattern = `${key}\\s*=\\s*(\\d+)`;
  const match = desc.match(new RegExp(pattern));
  return match ? Number(match[1]) : null;
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
