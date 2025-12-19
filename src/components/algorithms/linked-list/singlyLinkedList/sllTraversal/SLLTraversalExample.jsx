import React from "react";
import { motion } from "framer-motion";

const SLLTraversalExample = ({ examplePasses }) => {
  return examplePasses.map((pass, passIdx) => (
    <div
      key={passIdx}
      className="border border-blue-200 rounded-lg px-3 py-2 min-w-max"
    >
      <div className="flex items-center gap-3 mb-1.5">
        <h5 className="text-xs sm:text-sm font-bold text-blue-700">
          Pass {pass.passNumber}:
        </h5>
        {pass.steps && pass.steps[0] && (
          <span className="text-xs font-medium text-gray-600">
            {pass.steps[0].swapText}
          </span>
        )}
      </div>

      {pass.steps.map((step, stepIdx) => (
        <motion.div
          key={stepIdx}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.3,
            delay: passIdx * 0.1 + stepIdx * 0.05,
          }}
          className="flex items-center gap-1.5 mb-1.5 ml-1"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1">
              {step.array.map((txt, idx) => {
                const match =
                  typeof txt === "string" &&
                  txt.match(/^(\d+)\s*\(next:\s*([^\)]+)\)/);
                const val = match ? match[1] : txt;
                const nextDisp = match ? match[2] : "null";
                const isVisited = step.swapped.includes(idx);
                const addr = (() => {
                  const base = 0xa0b000 + idx * 0x101;
                  return "0x" + base.toString(16).toUpperCase();
                })();

                return (
                  <React.Fragment key={idx}>
                    <motion.div
                      animate={isVisited ? { scale: [1, 1.08, 1], backgroundColor: ["rgb(148, 163, 184)", "rgb(34, 197, 94)", "rgb(148, 163, 184)"] } : {}}
                      transition={{ duration: 0.4 }}
                      className={`flex items-stretch overflow-hidden rounded-md border ${isVisited ? "border-green-600 shadow-lg" : "border-gray-600 shadow-sm"}`}
                    >
                      <div className={`p-1 text-xs sm:text-sm font-bold flex flex-col justify-center ${isVisited ? "bg-green-500 text-white" : "bg-teal-500 text-white"}`}>
                        <div>{val}</div>
                        <div className="mt-0.5 text-[12px] sm:text-[11px] font-medium opacity-90 text-gray-700">{addr}</div>
                      </div>
                      <span className={`p-1 text-[12px] sm:text-xs border-l flex items-center justify-center ${isVisited ? "bg-green-300 text-gray-900 border-green-700" : "bg-amber-300 text-gray-800 border-teal-700"}`}>
                        next: {nextDisp}
                      </span>
                    </motion.div>
                    {idx < step.array.length - 1 && (
                      <span className="flex items-center mx-1 text-gray-700">
                        <span className="h-[2px] w-6 bg-gray-700 inline-block" />
                        <span className="w-2 h-2 border-t-2 border-r-2 border-gray-700 rotate-45 -ml-1 inline-block" />
                      </span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  ));
};

export default SLLTraversalExample;
