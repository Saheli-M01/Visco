// Copyright (c) 2026 Saheli Mondal.

import React, { useEffect, useMemo, useRef, useState } from "react";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function getRects(selectors = []) {
  const rects = [];
  const elements = [];
  selectors.forEach((sel) => {
    const el = typeof sel === "string" ? document.querySelector(sel) : null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rects.push(r);
    elements.push(el);
  });
  return { rects, elements };
}

function mergeRects(rects) {
  if (!rects.length) return null;
  const left = Math.min(...rects.map((r) => r.left));
  const top = Math.min(...rects.map((r) => r.top));
  const right = Math.max(...rects.map((r) => r.right));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  return {
    left,
    top,
    right,
    bottom,
    width: right - left,
    height: bottom - top,
  };
}

const DEFAULT_STEPS = [
  {
    key: "array",
    title: "Step 1: Array Input",
    description:
      "Start here: enter your array values and click Go to generate visualization steps.",
    selectors: ["#tour-array-card"],
  },
  {
    key: "controls",
    title: "Step 2: Controls",
    description:
      "Use manual or automatic controls to play/pause, step through, reset, and change speed.",
    selectors: ["#tour-controls-panel"],
  },
  {
    key: "panels",
    title: "Step 3: Display, History, Code",
    description:
      "Watch the visualization, review step history, and follow along with the highlighted code.",
    selectors: ["#tour-display", "#tour-step-history", "#tour-code-preview"],
  },
];

const UserGuideTour = ({
  isOpen,
  stepIndex,
  setStepIndex,
  onClose,
  steps = DEFAULT_STEPS,
}) => {
  const [overlayRect, setOverlayRect] = useState(null);
  const [popoverPos, setPopoverPos] = useState({ top: 80, left: 24 });
  const popoverRef = useRef(null);

  const step = useMemo(
    () => steps[clamp(stepIndex ?? 0, 0, steps.length - 1)],
    [stepIndex, steps]
  );

  useEffect(() => {
    if (!isOpen) return;

    const update = () => {
      const { rects } = getRects(step?.selectors || []);
      const merged = mergeRects(rects);
      setOverlayRect(merged);

      // Position popover near the merged rect; prefer below/above (keeps it out of code panel),
      // fallback to right/left, then clamp to viewport.
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      if (!merged) {
        setPopoverPos({ top: 80, left: 24 });
        return;
      }

      const margin = 14;
      const measured = popoverRef.current?.getBoundingClientRect?.();
      const popoverWidth = measured?.width ?? 340;
      const popoverHeight = measured?.height ?? 170;

      const candidates = [
        // below
        { top: merged.bottom + margin, left: merged.left },
        // above
        { top: merged.top - popoverHeight - margin, left: merged.left },
        // right
        { top: merged.top, left: merged.right + margin },
        // left
        { top: merged.top, left: merged.left - popoverWidth - margin },
      ];

      // pick first candidate that fits "well" (fully in viewport with padding)
      const pad = 16;
      const fits = (p) =>
        p.left >= pad &&
        p.top >= pad &&
        p.left + popoverWidth <= vw - pad &&
        p.top + popoverHeight <= vh - pad;

      const chosen = candidates.find(fits) || candidates[0];
      const left = clamp(chosen.left, pad, Math.max(pad, vw - popoverWidth - pad));
      const top = clamp(chosen.top, pad, Math.max(pad, vh - popoverHeight - pad));
      setPopoverPos({ top, left });
    };

    update();

    const onResize = () => update();
    const onScroll = () => update();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [isOpen, step?.key, step?.selectors]);

  useEffect(() => {
    if (!isOpen) return;
    const { elements } = getRects(step?.selectors || []);
    const first = elements[0];
    if (first?.scrollIntoView) {
      first.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [isOpen, step?.key]);

  if (!isOpen) return null;

  const isFirst = (stepIndex ?? 0) <= 0;
  const isLast = (stepIndex ?? 0) >= steps.length - 1;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* dark overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        role="button"
        tabIndex={-1}
        aria-label="Close user guide"
      />

      {/* highlight box */}
      {overlayRect && (
        <div
          className="absolute rounded-xl ring-2 ring-blue-500/70 shadow-[0_0_0_9999px_rgba(0,0,0,0.40)] pointer-events-none"
          style={{
            left: overlayRect.left - 6,
            top: overlayRect.top - 6,
            width: overlayRect.width + 12,
            height: overlayRect.height + 12,
          }}
        />
      )}

      {/* popover */}
      <div
        ref={popoverRef}
        className="absolute w-[340px] max-w-[calc(100vw-32px)] bg-white rounded-xl border border-gray-200 shadow-xl p-4"
        style={{ top: popoverPos.top, left: popoverPos.left }}
        role="dialog"
        aria-modal="true"
        aria-label="User guide"
      >
        <div className="text-xs text-gray-500">
          {clamp((stepIndex ?? 0) + 1, 1, steps.length)} / {steps.length}
        </div>
        <div className="mt-1 text-sm font-semibold text-gray-900">
          {step?.title}
        </div>
        <div className="mt-1 text-sm text-gray-700">{step?.description}</div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            className="text-sm text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            Skip
          </button>

          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                isFirst
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-gray-700 border-gray-300 hover:bg-gray-50"
              }`}
              onClick={() => !isFirst && setStepIndex((i) => Math.max(0, i - 1))}
              disabled={isFirst}
            >
              Prev
            </button>
            <button
              className={`px-3 py-1.5 rounded-lg text-sm border ${
                isLast
                  ? "text-white bg-gray-900 border-gray-900 hover:bg-gray-800"
                  : "text-white bg-blue-600 border-blue-600 hover:bg-blue-500"
              }`}
              onClick={() => {
                if (isLast) onClose?.();
                else setStepIndex((i) => Math.min(steps.length - 1, i + 1));
              }}
            >
              {isLast ? "Done" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuideTour;


