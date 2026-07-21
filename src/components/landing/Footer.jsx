// Copyright (c) 2026 Saheli Mondal.

import { Mail } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="group bg-gradient-to-br from-blue-50 via-red-50 to-yellow-50 hover:from-blue-100 hover:via-pink-50 hover:to-yellow-100 border-t border-border/50 transition-colors duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-6 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Left Side: Brand & Description */}
        <div className="max-w-2xl">
          <div className="flex items-center mb-4">
            <img
              src="/assets/brand.png"
              alt="Visco logo"
              className=" h-[2.5rem]"
            />
          </div>

          <p className="text-gray-700 leading-relaxed">
            Making algorithm learning accessible through interactive
            visualizations. Master data structures and algorithms with
            confidence.
          </p>
        </div>

        {/* Right Side: Email */}
        <div className="flex flex-col items-start md:items-end ">
          <p className="text-sm text-gray-700 mb-2">Reach out to us:</p>

          {/* Gradient Border Wrapper */}
          <div className="p-[2px] rounded-xl bg-gradient-to-r from-red-300 via-blue-300 to-yellow-400 hover:from-yellow-200 hover:via-red-200 hover:to-blue-300 transition-all duration-300">
            <a
              href="mailto:visualizecode.official@gmail.com"
              aria-label="Email"
              className="group inline-flex items-center space-x-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-900/60 border border-transparent text-slate-700 shadow-sm hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-300 ring-offset-2 ring-offset-white"
            >
              <Mail className="h-4 w-4 text-slate-600 transition-colors duration-200 group-hover:text-gray-800" />
              <span className="text-[0.9rem] truncate max-w-[20rem]">
                visualizecode.official@gmail.com
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 text-sm text-gray-700 text-center py-4 mt-8">
        © {currentYear} Visco. Made for algorithm learners by <a href="https://sahelimondal.in">Saheli</a>
      </div>
    </footer>
  );
};
