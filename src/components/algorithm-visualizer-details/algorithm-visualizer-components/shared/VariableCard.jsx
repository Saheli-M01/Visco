import React from "react";
import { safeValue } from "./stepHelpers";

export default function VariableCard({ label, value, bgColor = "bg-yellow-300", valueClassName = "text-lg font-bold" }) {
  return (
    <div
      className={`h-12 w-28 rounded-lg flex items-center justify-center font-medium ${bgColor} text-gray-900 shadow-md`}
    >
      <div className="text-center">
        <div className="text-xs text-gray-700">{label}</div>
        <div className={valueClassName}>{safeValue(value)}</div>
      </div>
    </div>
  );
}
