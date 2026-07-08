import React from "react";
import NoteTable from "../../shared/NoteTable";

const DataTypes = () => {
  const tableHeaders = ["Category", "Type Name", "Simple Examples"];
  const tableRows = [
    [
      <strong>Text Type</strong>,
      <code>str</code>,
      <code>"Pixel", "Coding"</code>,
    ],
    [
      <strong>Numeric Types</strong>,
      <code>int, float, complex</code>,
      <code>42, 3.14, 5 + 2j</code>,
    ],
    [
      <strong>Boolean Type</strong>,
      <code>bool</code>,
      <code>True, False</code>,
    ],
    [
      <strong>Sequence Types</strong>,
      <code>list, tuple, range</code>,
      <code>[1, 2, 3], (10, 20)</code>,
    ],
  ];

  return (
    <section id="data-types" className="scroll-mt-20 space-y-4">
      <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 border-b pb-2">
        5. Data Types
      </h1>

      <NoteTable headers={tableHeaders} rows={tableRows} />

      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
          Integer vs. Whole Numbers
        </h3>
        <ul className="list-disc pl-6 space-y-1.5 text-slate-600 dark:text-slate-350 leading-relaxed">
          <li>
            <strong>Integers (<code>int</code>):</strong> Include all negative
            numbers, zero, and positive numbers (e.g., ..., -2, -1, 0, 1, 2, ...).
          </li>
          <li>
            <strong>Whole Numbers:</strong> Start strictly at zero and only go up
            positively (0, 1, 2, 3, ...). No negatives!
          </li>
        </ul>
      </div>
    </section>
  );
};

export default DataTypes;
