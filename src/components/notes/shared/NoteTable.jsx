// Copyright (c) 2026 Saheli Mondal.

import React from "react";

const NoteTable = ({ headers, rows }) => {
  return (
    <div className="my-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 font-semibold text-slate-700 dark:text-slate-300">
              {headers.map((header, idx) => (
                <th key={idx} className="px-4 py-3">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="hover:bg-slate-50/40 dark:hover:bg-slate-900/20 transition-colors text-slate-600 dark:text-slate-400"
              >
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} className="px-4 py-3 align-top leading-relaxed">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NoteTable;
