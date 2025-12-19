
import React, { useState, useEffect, useRef } from "react";
import Select from "../../ui/select";
import ConfirmModal from "../Modal";


const HISTORY_KEY = "visco_array_history_v1";

const ArrayInputCard = ({
  handleGo,
  selectedAlgorithm,
  pivotStrategy,
  setPivotStrategy,
  isVisualizationActive = false,
}) => {
  const [arrayInput, setArrayInput] = useState("");
  const [targetInput, setTargetInput] = useState("");
  const [showValidationPopup, setShowValidationPopup] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [currentArrayLength, setCurrentArrayLength] = useState(0);
  const [history, setHistory] = useState([]);
  const [showHistoryDropdown, setShowHistoryDropdown] = useState(false);
  const inputRef = useRef(null);
  
  // Insertion-specific states
  const [insertPosition, setInsertPosition] = useState("tail");
  const [insertValue, setInsertValue] = useState("");
  const [kthPosition, setKthPosition] = useState("");

  // Position change confirmation modal state
  const [showPositionChangeConfirm, setShowPositionChangeConfirm] = useState(false);
  const [pendingInsertPosition, setPendingInsertPosition] = useState(null);

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
    
    // Check if it's an insertion algorithm
    const normalizedAlgoName = (selectedAlgorithm?.name || "").toLowerCase();
    const isInsertion = normalizedAlgoName.includes("insertion");
    const maxAllowed = isInsertion ? 9 : 10;
    
    if (parts.length > maxAllowed) return { error: `Maximum ${maxAllowed} numbers allowed` };
    const nums = [];
    for (let p of parts) {
      const n = Number(p);
      if (Number.isNaN(n)) return { error: `Invalid number: ${p}` };
      nums.push(n);
    }
    // Additional validation for Dutch Flag: only allow 0,1,2
    const isDutch = normalizedAlgoName.includes("dutch");
    if (isDutch) {
      for (let i = 0; i < nums.length; i++) {
        const v = nums[i];
        if (v !== 0 && v !== 1 && v !== 2) {
          return { error: `Dutch Flag requires values 0,1,2 only. Found: ${v} at position ${i}` };
        }
      }
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

  // Quick check if current array is valid for Dutch Flag (only 0,1,2)
  const isDutchAlgorithm = (selectedAlgorithm?.name || "").toLowerCase().includes("dutch");
  const currentDutchInvalid = (() => {
    if (!isDutchAlgorithm) return false;
    if (!arrayInput || arrayInput.trim() === "") return false;
    const parts = arrayInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
    for (let p of parts) {
      const n = Number(p);
      if (Number.isNaN(n)) return true;
      if (n !== 0 && n !== 1 && n !== 2) return true;
    }
    return false;
  })();

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
    const isBinary = normalizedAlgoName.includes("binary search") || normalizedAlgoName.includes("binarysearch") || normalizedAlgoName.includes("binary");
    const isInsertion = normalizedAlgoName.includes("insertion");
    
    if (isBinary) {
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
      // For binary search, ensure the parsed array is sorted in non-decreasing order.
      const a = res.value || [];
      for (let i = 1; i < a.length; i++) {
        if (a[i - 1] > a[i]) {
          setValidationError("Binary Search requires the input array to be sorted in ascending order.");
          setShowValidationPopup(true);
          return;
        }
      }
    }
    
    // Handle insertion-specific validation and operation value
    if (isInsertion) {
      // Validate insert value
      if (insertValue === "" || insertValue == null) {
        setValidationError("Please enter a value to insert");
        setShowValidationPopup(true);
        return;
      }
      const insertNum = Number(insertValue);
      if (Number.isNaN(insertNum)) {
        setValidationError(`Invalid insert value: ${insertValue}`);
        setShowValidationPopup(true);
        return;
      }
      
      // Validate kth position if needed
      if (insertPosition === "kth") {
        if (kthPosition === "" || kthPosition == null) {
          setValidationError("Please enter the position for insertion");
          setShowValidationPopup(true);
          return;
        }
        const kthNum = parseInt(kthPosition);
        if (Number.isNaN(kthNum) || kthNum < 0 || kthNum > res.value.length) {
          setValidationError(`Position must be between 0 and ${res.value.length}`);
          setShowValidationPopup(true);
          return;
        }
        
        targetValue = {
          position: "kth",
          value: insertNum,
          kthPosition: kthNum
        };
      } else {
        targetValue = {
          position: insertPosition,
          value: insertNum
        };
      }
    }

    // call parent with parsed array and optional target
    // debug: log values passed to parent
    try {
      // eslint-disable-next-line no-console
      console.debug("ArrayInputCard.onGo", { parsedArray: res.value, targetValue });
    } catch (e) {}
    handleGo(res.value, targetValue, arrayInput);
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

  
  // Determine if this is an insertion algorithm
  const normalizedAlgoName = (selectedAlgorithm?.name || "").toLowerCase();
  const isInsertionAlgo = normalizedAlgoName.includes("insertion");

  return (
    <div className="bg-white rounded-xl px-2">
      <div className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <h3 className="text-md font-semibold text-gray-900 sm:whitespace-nowrap">Input: </h3>
          <div className="flex w-full items-start sm:items-center gap-2">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={arrayInput}
                onChange={(e) => {
                  setArrayInput(e.target.value);
                  if (showValidationPopup) setShowValidationPopup(false);
                }}
                onFocus={() => setShowHistoryDropdown(true)}
                onBlur={() => setTimeout(() => setShowHistoryDropdown(false), 150)}
                placeholder={isInsertionAlgo ? "Enter comma-separated numbers (Maximum 9 values)" : "Enter comma-separated numbers (Maximum 10 values)"}
                className="w-full h-10 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.7rem] px-3 transition-all duration-200"
              />
              {/* History dropdown */}
              {showHistoryDropdown && history.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {history.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setArrayInput(item);
                        setShowHistoryDropdown(false);
                        inputRef.current?.focus();
                      }}
                      className="w-full text-left px-3 py-2 text-sm text-gray-800 hover:bg-gray-100 border-b border-gray-100 last:border-0 truncate"
                      title={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {/* Insertion position dropdown */}
            {isInsertionAlgo && (
              <Select
                value={insertPosition}
                onChange={(val) => {
                  if (isVisualizationActive) {
                    // warn that changing position will restart
                    setPendingInsertPosition(val);
                    setShowPositionChangeConfirm(true);
                  } else {
                    setInsertPosition(val);
                  }
                }}
                options={[
                  { value: "head", label: "Head" },
                  { value: "tail", label: "Tail" },
                  { value: "kth", label: "Kth Position" }
                ]}
                className="w-32 h-10"
                color="#6366f1"
                compact={false}
              />
            )}
            {/* Insert value input */}
            {isInsertionAlgo && (
              <input
                type="text"
                value={insertValue}
                onChange={(e) => setInsertValue(e.target.value)}
                placeholder="Value"
                className="w-28 h-10 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.85rem] px-3 transition-all duration-200"
              />
            )}
            {/* Kth position input (only for kth option) */}
            {isInsertionAlgo && insertPosition === "kth" && (
              <input
                type="text"
                value={kthPosition}
                onChange={(e) => setKthPosition(e.target.value)}
                placeholder="Position"
                className="w-28 h-10 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.85rem] px-3 transition-all duration-200"
              />
            )}
            {/* Target input for Binary Search */}
            {(selectedAlgorithm?.name || "").toLowerCase().includes("binary") && (
              <input
                type="text"
                value={targetInput}
                onChange={(e) => setTargetInput(e.target.value)}
                placeholder="Target value"
                className="w-40 h-10 rounded-lg backdrop-blur-sm bg-white/30 border-2 border-gray-500/50 text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500/50 focus:border-gray-500/50 shadow-inner text-[0.85rem] px-3 transition-all duration-200"
              />
            )}
            <button
              onClick={onGo}
              disabled={currentDutchInvalid}
              className={
                ("h-10 px-4 rounded-lg transition-all shadow-md text-sm font-medium border ") +
                (currentDutchInvalid
                  ? "bg-gray-300 text-gray-600 border-gray-300 cursor-not-allowed"
                  : "bg-gray-800 text-white hover:bg-gray-700 border-gray-600")
              }
            >
              Go
            </button>
          </div>
        </div>
        {/* Dutch Flag validation warning */}
        {isDutchAlgorithm && currentDutchInvalid && (
          <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md text-yellow-800 text-sm">
            Dutch Flag input supports only values 0, 1 and 2. Please correct your input to enable Go.
          </div>
        )}
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
      </div>
      {/* Confirm restart modal when changing insertion dropdown mid-visualization */}
      <ConfirmModal
        isOpen={showPositionChangeConfirm}
        title="Restart visualization?"
        message="Changing the insertion position will restart the visualization from the beginning. Continue?"
        onCancel={() => {
          setShowPositionChangeConfirm(false);
          setPendingInsertPosition(null);
        }}
        onConfirm={() => {
          setShowPositionChangeConfirm(false);
          if (pendingInsertPosition) {
            // apply new position and restart by invoking onGo with current inputs
            const prevPos = insertPosition;
            setInsertPosition(pendingInsertPosition);
            setPendingInsertPosition(null);
            // Re-run with current array and inputs
            const res = validateAndParse(arrayInput);
            if (res.error) {
              setValidationError(res.error);
              setShowValidationPopup(true);
              // revert position if invalid input
              setInsertPosition(prevPos);
              return;
            }
            const insertNum = Number(insertValue);
            if (Number.isNaN(insertNum)) {
              setValidationError(`Invalid insert value: ${insertValue}`);
              setShowValidationPopup(true);
              setInsertPosition(prevPos);
              return;
            }
            let op = null;
            if (pendingInsertPosition === "kth") {
              const kthNum = parseInt(kthPosition);
              if (Number.isNaN(kthNum) || kthNum < 0 || kthNum > res.value.length) {
                setValidationError(`Position must be between 0 and ${res.value.length}`);
                setShowValidationPopup(true);
                setInsertPosition(prevPos);
                return;
              }
              op = { position: "kth", value: insertNum, kthPosition: kthNum };
            } else {
              op = { position: pendingInsertPosition || insertPosition, value: insertNum };
            }
            try {
              // eslint-disable-next-line no-console
              console.debug("ArrayInputCard.restartOnPositionChange", { parsedArray: res.value, op });
            } catch (e) {}
            handleGo(res.value, op, arrayInput);
          }
        }}
        confirmLabel="Restart"
        cancelLabel="Cancel"
      />
    </div>
  );
};

export default ArrayInputCard;
