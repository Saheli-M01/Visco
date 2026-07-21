// Copyright (c) 2026 Saheli Mondal.

import React from 'react';

const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-black">
      <div className="flex flex-col items-center gap-4 p-6 rounded-lg">
        <div className="w-20 h-20 inline-block animate-spin rounded-full border-4 border-t-transparent border-primary"></div>
        <div className="text-center">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-200">{message}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Preparing visualizers and assets</p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
