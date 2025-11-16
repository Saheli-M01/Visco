import React, { useState, useEffect } from "react";

const HISTORY_KEY = "visco_linkedlist_history_v1";

const LinkedListInputCard = ({
  handleGo,
  selectedAlgorithm,
}) => {
  const [listInput, setListInput] = useState("");
  const [operationValue, setOperationValue] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationError, setValidationError] = useState("");
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

  const validateAndParse = (input) => {
    if (!input || input.trim() === "")
      return { error: "List cannot be empty" };
    const parts = input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    if (parts.length === 0) return { error: "List cannot be empty" };
    if (parts.length > 10) return { error: "Maximum 10 nodes allowed" };
    const nums = [];
    for (let p of parts) {
      const n = Number(p);
      if (Number.isNaN(n)) return { error: `Invalid number: ${p}` };
      nums.push(n);
    }
    return { value: nums };
  };

  // Auto-close validation popup after 5 seconds
  useEffect(() => {
    if (!showValidationPopup) return;
    const t = setTimeout(() => setShowValidationPopup(false), 5000);
    return () => clearTimeout(t);
  }, [showValidationPopup]);

  const onGo = () => {
    const res = validateAndParse(listInput);
    if (res.error) {
      setValidationError(res.error);
      setShowValidationPopup(true);
      return;
    }

    // Check if operation requires a value
    const normalizedAlgoName = (selectedAlgorithm?.name || "").toLowerCase();
    let operationVal = null;
    const needsValue = normalizedAlgoName.includes("insert") || normalizedAlgoName.includes("delete") || normalizedAlgoName.includes("search");
    
    if (needsValue && operationValue) {
      const val = Number(operationValue);
      if (Number.isNaN(val)) {
        setValidationError(`Invalid operation value: ${operationValue}`);
        setShowValidationPopup(true);
        return;
      }
      operationVal = val;
    }

    console.debug("LinkedListInputCard.onGo", { parsedList: res.value, operationValue: operationVal });
    setShowValidationPopup(false);

    // Save to history
    const trimmed = listInput.trim();
    let updated = [trimmed, ...history.filter((x) => x !== trimmed)].slice(0, 20);
    setHistory(updated);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    } catch (e) {
      // ignore
    }

    // Call parent handler with parsed list and optional operation value
    // also pass the raw trimmed input string as the third arg so parent can display it
    handleGo(res.value, operationVal, trimmed);
  };

  const onHistorySelect = (item) => {
    setListInput(item);
  };

  return (
    <div className="bg-white  rounded-xl p-2">
      <h3 className="text-md font-semibold text-gray-900 mb-3">Linked List Input</h3>
      <div className="space-y-3">
        <div className="relative flex gap-1">
          <textarea
            value={listInput}
            onChange={(e) => {
              setListInput(e.target.value);
              if (showValidationPopup) setShowValidationPopup(false);
            }}
            placeholder="Enter comma-separated numbers — Maximum 10 values"
            className="w-full h-15 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.75rem] px-2 py-1 transition-all duration-200"
          />

          {/* Operation input (for insert/delete/search) */}
          {selectedAlgorithm && (selectedAlgorithm.name.toLowerCase().includes("insert") ||
            selectedAlgorithm.name.toLowerCase().includes("delete") ||
            selectedAlgorithm.name.toLowerCase().includes("search")) && (
            <textarea
              value={operationValue}
              onChange={(e) => setOperationValue(e.target.value)}
              placeholder="Operation value"
              className="w-[200px] rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 resize-none focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.75rem] px-2 py-1 transition-all duration-200"
            />
          )}

          <button
            onClick={onGo}
            className={
              ("px-4 py-2 rounded-lg transition-all shadow-md text-sm font-medium border ") +
              (showValidationPopup
                ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                : "bg-gray-800 text-white hover:bg-gray-700 border-gray-600")
            }
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
                onClick={() => setListInput(h)}
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

export default LinkedListInputCard;
