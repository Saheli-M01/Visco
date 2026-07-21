// Copyright (c) 2026 Saheli Mondal.

import React, { useEffect, useRef } from "react";
import Select from "../../ui/select";

const CodePreview = ({
  selectedLanguage,
  requestLanguageChange,
  getCodeLines,
  selectedAlgorithm,
  currentCodeLine,
}) => {
  const highlightedLineRef = useRef(null);
  const codeContainerRef = useRef(null);

  // Auto-scroll to highlighted line when currentCodeLine changes
  useEffect(() => {
    if (
      highlightedLineRef.current &&
      codeContainerRef.current &&
      currentCodeLine !== -1
    ) {
      const container = codeContainerRef.current;
      const highlighted = highlightedLineRef.current;

      // Calculate the position to scroll to (center the highlighted line)
      const containerHeight = container.clientHeight;
      const highlightedTop = highlighted.offsetTop;
      const highlightedHeight = highlighted.clientHeight;

      const scrollTop =
        highlightedTop - containerHeight / 2 + highlightedHeight / 2;

      container.scrollTo({
        top: Math.max(0, scrollTop),
        behavior: "smooth",
      });
    }
  }, [currentCodeLine]);

  const languages = [
    { value: "csharp", label: "C#" },
    { value: "cpp", label: "C++" },
    { value: "java", label: "Java" },
    { value: "javascript", label: "JavaScript" },
    { value: "python", label: "Python" },
  ];

  return (
    <div className="flex flex-col gap-2 h-full pb-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Code Preview</h3>
        <Select
          value={selectedLanguage}
          onChange={(val) => requestLanguageChange(val)}
          options={languages.map((l) => ({ value: l.value, label: l.label }))}
          className=""
          ariaLabel="Select language"
          color="#346cd3ff"
        />
      </div>
      <div className="flex flex-1 bg-gray-900 rounded-lg overflow-hidden">
        <pre
          ref={codeContainerRef}
          className="text-green-400 px-3 py-2 text-[0.9rem] overflow-auto custom-scrollbar flex-1 w-full font-mono"
          style={{
            // Disable ligatures so operators like <= and >= render as
            // literal characters instead of being merged into ≤ / ≥ glyphs
            fontVariantLigatures: "none",
            WebkitFontVariantLigatures: "none",
            fontFeatureSettings: '"liga" 0, "calt" 0',
          }}
        >
          <code>
            {getCodeLines(selectedLanguage, selectedAlgorithm?.name).map(
              (line, index) => (
                <div
                  key={index}
                  ref={currentCodeLine === index ? highlightedLineRef : null}
                  className={`${
                    currentCodeLine === index
                      ? "bg-indigo-300/70 text-yellow-100 border-l-4 border-indigo-600 pl-2"
                      : ""
                  } ${
                    currentCodeLine !== -1 && currentCodeLine !== index
                      ? "text-gray-500"
                      : "text-gray-100"
                  }`}
                >
                  {line}
                </div>
              ),
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodePreview;
