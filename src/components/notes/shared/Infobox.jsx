// Copyright (c) 2026 Saheli Mondal.

import React from "react";
import { Info, AlertTriangle, CheckCircle, HelpCircle } from "lucide-react";

const Infobox = ({ type = "info", title, children }) => {
  const configs = {
    info: {
      bg: "bg-blue-50/70 border-blue-200 dark:bg-blue-950/20 dark:border-blue-900/30",
      text: "text-blue-800 dark:text-blue-300",
      icon: <Info className="h-5 w-5 text-blue-500" />,
    },
    warning: {
      bg: "bg-amber-50/70 border-amber-200 dark:bg-amber-950/20 dark:border-amber-900/30",
      text: "text-amber-800 dark:text-amber-300",
      icon: <AlertTriangle className="h-5 w-5 text-amber-500" />,
    },
    success: {
      bg: "bg-emerald-50/70 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-900/30",
      text: "text-emerald-800 dark:text-emerald-300",
      icon: <CheckCircle className="h-5 w-5 text-emerald-500" />,
    },
    tip: {
      bg: "bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/20 dark:border-indigo-900/30",
      text: "text-indigo-800 dark:text-indigo-300",
      icon: <HelpCircle className="h-5 w-5 text-indigo-500" />,
    },
  };

  const config = configs[type] || configs.info;

  return (
    <div className={`my-6 flex gap-4 rounded-xl border p-4 backdrop-blur-sm ${config.bg}`}>
      <div className="flex-shrink-0 mt-0.5">{config.icon}</div>
      <div className="flex-1">
        {title && (
          <h4 className={`text-sm font-semibold mb-1 ${config.text}`}>
            {title}
          </h4>
        )}
        <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Infobox;
