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
    handleGo(res.value, operationVal);
  };

  const onHistorySelect = (item) => {
    setListInput(item);
  };

  return (
    <div className="relative mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 shadow-lg">
        <h3 className="text-lg font-semibold text-white mb-3">
          Configure Linked List
        </h3>

        {/* List Input */}
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Enter node values (comma-separated, max 10):
            </label>
            <input
              type="text"
              value={listInput}
              onChange={(e) => {
                setListInput(e.target.value);
                if (showValidationPopup) setShowValidationPopup(false);
              }}
              placeholder="e.g., 1, 2, 3, 4, 5"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Operation Value Input (for insert, delete, search) */}
          {selectedAlgorithm && (selectedAlgorithm.name.toLowerCase().includes("insert") || 
            selectedAlgorithm.name.toLowerCase().includes("delete") || 
            selectedAlgorithm.name.toLowerCase().includes("search")) && (
            <div>
              <label className="block text-sm text-gray-300 mb-2">
                Operation Value:
              </label>
              <input
                type="text"
                value={operationValue}
                onChange={(e) => setOperationValue(e.target.value)}
                placeholder="e.g., 3"
                className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Go Button */}
          <button
            onClick={onGo}
            className="w-full px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            Visualize
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-700">
            <label className="block text-sm text-gray-300 mb-2">
              Recent Inputs:
            </label>
            <div className="flex flex-wrap gap-2">
              {history.slice(0, 5).map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => onHistorySelect(item)}
                  className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 text-sm rounded-lg transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Validation Popup */}
      {showValidationPopup && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50">
          <div className="bg-red-500/90 backdrop-blur-sm border border-red-700 rounded-lg p-3 shadow-xl animate-shake">
            <p className="text-white text-sm font-medium">{validationError}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LinkedListInputCard;
