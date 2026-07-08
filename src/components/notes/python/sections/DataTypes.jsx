import React from "react";
import NoteTable from "../../shared/NoteTable";
import { Boxes, Type, Hash, ToggleLeft, ListOrdered, Scale } from "lucide-react";

const DataTypes = () => {
  const tableHeaders = ["Category", "Type Name", "Simple Examples"];
  const tableRows = [
    [
      <strong className="inline-flex items-center gap-1.5">
        <Type className="w-4 h-4 text-sky-500" /> Text Type
      </strong>,
      <code>str</code>,
      <code>"Pixel", "Coding"</code>,
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        <Hash className="w-4 h-4 text-purple-500" /> Numeric Types
      </strong>,
      <code>int, float, complex</code>,
      <code>42, 3.14, 5 + 2j</code>,
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        <ToggleLeft className="w-4 h-4 text-emerald-500" /> Boolean Type
      </strong>,
      <code>bool</code>,
      <code>True, False</code>,
    ],
    [
      <strong className="inline-flex items-center gap-1.5">
        <ListOrdered className="w-4 h-4 text-amber-500" /> Sequence Types
      </strong>,
      <code>list, tuple, range</code>,
      <code>[1, 2, 3], (10, 20)</code>,
    ],
  ];

  return (
    <section id="data-types" className="scroll-mt-20 space-y-6">
      {/* Header banner */}
      <div className="rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 p-6 shadow-lg">
        <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
          <Boxes className="w-8 h-8" /> Data Types
        </h1>
        <p className="text-purple-50 mt-1 text-sm">
          Every value in Python belongs to one of these families.
        </p>
      </div>

      <div className="rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 shadow-sm">
        <NoteTable headers={tableHeaders} rows={tableRows} />
      </div>

      <div className="rounded-xl border-2 border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-slate-800 p-5 space-y-3 shadow-sm">
        <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 flex items-center gap-2">
          <Scale className="w-5 h-5" /> Integer vs. Whole Numbers
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