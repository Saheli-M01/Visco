import {
  addAlgorithm as _addAlgorithm,
  removeAlgorithm as _removeAlgorithm,
  getAlgorithmCount as _getAlgorithmCount,
  getAlgorithms as _getAlgorithms,
  updateAlgorithm as _updateAlgorithm,
  getTotalAlgorithmCount as _getTotalAlgorithmCount,
  examples as _examples,
  logAlgorithmCounts as _logAlgorithmCounts,
} from '../hooks/algorithmAPI.js';

// Re-export functions under src/data for compatibility with components
export const addAlgorithm = _addAlgorithm;
export const removeAlgorithm = _removeAlgorithm;
export const getAlgorithmCount = _getAlgorithmCount;
export const getAlgorithms = _getAlgorithms;
export const updateAlgorithm = _updateAlgorithm;
export const getTotalAlgorithmCount = _getTotalAlgorithmCount;
export const examples = _examples;
export const logAlgorithmCounts = _logAlgorithmCounts;

export default {
  addAlgorithm,
  removeAlgorithm,
  getAlgorithmCount,
  getAlgorithms,
  updateAlgorithm,
  getTotalAlgorithmCount,
  examples,
  logAlgorithmCounts,
};
