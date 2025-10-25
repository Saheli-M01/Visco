import React, { useState, useEffect } from "react";
import Select from "../../ui/select";

const HISTORY_KEY = "visco_array_history_v1";

const ArrayInputCard = ({
  handleGo,
  selectedAlgorithm,
  pivotStrategy,
  setPivotStrategy,
}) => {
  const [arrayInput, setArrayInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [currentArrayLength, setCurrentArrayLength] = useState(0);
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setHistory(parsed.slice(0, 20));
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // Keep the validation popup visible until the user edits the input

  const validateAndParse = (input) => {
    if (!input || input.trim() === "")
      return { error: "Array cannot be empty" };
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return { error: "Array cannot be empty" };
    if (parts.length > 10) return { error: "Maximum 10 numbers allowed" };
    const nums = [];
    for (let p of parts) {
      const n = Number(p);
      if (Number.isNaN(n)) return { error: `Invalid number: ${p}` };
      nums.push(n);
    }
    return { value: nums };
  };

  // Parse array in real-time to update pivot range
  const parseArrayForLength = (input) => {
    if (!input || input.trim() === "") return 0;
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    let validCount = 0;
    for (let p of parts) {
      const n = Number(p);
      if (!Number.isNaN(n)) validCount++;
    }
    return validCount;
  };

  // Update array length and adjust pivot strategy when input changes
  useEffect(() => {
    const length = parseArrayForLength(arrayInput);
    setCurrentArrayLength(length);

    // If using index-based pivot and current index is out of bounds, adjust it
    if (
      typeof pivotStrategy === "number" &&
      pivotStrategy >= length &&
      length > 0
    ) {
      setPivotStrategy(length - 1);
    }
  }, [arrayInput, pivotStrategy, setPivotStrategy]);

  // Auto-close validation popup after 5 seconds when shown
  useEffect(() => {
    if (!showValidationPopup) return;
    const t = setTimeout(() => setShowValidationPopup(false), 5000);
    return () => clearTimeout(t);
  }, [showValidationPopup]);

  const onGo = () => {
    const res = validateAndParse(arrayInput);
    if (res.error) {
      setValidationError(res.error);
      setShowValidationPopup(true);
      return;
    }
    // parse target if provided (for Binary Search)
    const normalizedAlgoName = (selectedAlgorithm?.name || "").toLowerCase();
    let targetValue = null;
    if (normalizedAlgoName.includes("binary search") || normalizedAlgoName.includes("binarysearch")) {
      if (targetInput == null || targetInput === "") {
        setValidationError("Please enter a target value for Binary Search");
        setShowValidationPopup(true);
        return;
      }
      const tn = Number(targetInput);
      if (Number.isNaN(tn)) {
        setValidationError(`Invalid target: ${targetInput}`);
        setShowValidationPopup(true);
        return;
      }
      targetValue = tn;
    }

    // call parent with parsed array and optional target
    // debug: log values passed to parent
    try {
      // eslint-disable-next-line no-console
      console.debug("ArrayInputCard.onGo", { parsedArray: res.value, targetValue });
    } catch (e) {}
    handleGo(res.value, targetValue);
    // Save to history (keep most recent first, dedupe)
    try {
      const trimmed = arrayInput.trim();
      if (trimmed) {
        const next = [trimmed, ...history.filter((h) => h !== trimmed)].slice(
          0,
          20
        );
        setHistory(next);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
      }
    } catch (e) {
      // ignore storage errors
    }
  };

  return (
    <div className="bg-white  rounded-xl p-2">
      <h3 className="text-md font-semibold text-gray-900 mb-3">Array Input</h3>
      <div className="space-y-3">
        <div className="relative flex gap-1">
          <textarea
            value={arrayInput}
            onChange={(e) => {
              setArrayInput(e.target.value);
              // hide popup as soon as user modifies the input
              if (showValidationPopup) setShowValidationPopup(false);
            }}
            placeholder="Enter comma-separated numbers — Maximum 10 values"
            className="w-full h-15 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.75rem] px-2 py-1 transition-all duration-200"
          />
          {/* Target input for Binary Search */}
          {(selectedAlgorithm?.name || "").toLowerCase().includes("binary") && (
            <textarea
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="Target value to search"
              className="w-[200px] rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.75rem] px-2 py-1 transition-all duration-200"
            />
          )}
          <button
            onClick={onGo}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all shadow-md text-sm font-medium border border-gray-600"
          >
            Go
          </button>
        </div>
        {showValidationPopup && (
          <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg w-full">
            <div className="flex items-start justify-between gap-2">
              <div className="text-red-700 text-sm">{validationError}</div>
              <button
                onClick={() => setShowValidationPopup(false)}
                aria-label="Close validation"
                className="text-red-700 hover:text-red-800 ml-2 font-semibold"
              >
                ×
              </button>
            </div>
          </div>
        )}
        {/* history chips */}
        {history && history.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {history.slice(0, 2).map((h, idx) => (
              <button
                key={h + idx}
                onClick={() => setArrayInput(h)}
                className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-sm text-gray-800 hover:bg-gray-200"
                title={`Restore: ${h}`}
              >
                {h.length > 24 ? h.slice(0, 22) + "…" : h}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrayInputCard;
