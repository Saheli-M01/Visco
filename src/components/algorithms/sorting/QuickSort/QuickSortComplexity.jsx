// Copyright (c) 2026 Saheli Mondal.

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Compute complexity curves
const calculateComplexity = (n, type) => {
  switch (type) {
    case "n":
      return n;
    case "n^2":
      return n * n;
    case "n log n":
      return n * Math.log2(n);
    default:
      return n;
  }
};

// Quick Sort: best/avg O(n log n), worst O(n^2)
const generateBreakdownData = () => {
  const data = [];
  for (let n = 1; n <= 50; n += 2) {
    data.push({
      n,
      best: calculateComplexity(n, "n log n"),
      average: calculateComplexity(n, "n log n"),
      worst: calculateComplexity(n, "n^2"),
    });
  }
  return data;
};

const QuickSortComplexity = () => {
  const breakdownData = useMemo(() => generateBreakdownData(), []);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-sm bg-gray-900 border border-gray-700 rounded-2xl px-4 py-2 shadow-xl"
      >
        <h3 className="text-lg font-bold text-white mb-2">
          Quick Sort - Complexity Breakdown
        </h3>
        <div className="text-sm text-gray-300 mb-4">
          Best, Average, and Worst case scenarios for Quick Sort
        </div>
        <ResponsiveContainer width="100%" height={380}>
          <AreaChart data={breakdownData} margin={{ top: 10, right: 30, left: 70, bottom: 20 }}>
            <defs>
              <linearGradient id="colorBest" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAverage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWorst" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="n"
              label={{ value: "Input Size (n)", position: "bottom", offset: 20 }}
              angle={0}
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <YAxis
              label={{ value: "Operations", angle: -90, position: "left", offset: 10, fill: "rgba(255,255,255,0.7)" }}
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55, 0.95)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: "8px",
                color: "rgba(255, 255, 255, 0.9)",
              }}
            />
            <Legend wrapperStyle={{ paddingTop: "50px" }} />
            <Area
              type="monotone"
              dataKey="best"
              stackId="1"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorBest)"
              isAnimationActive={true}
              animationDuration={1000}
              name="Best"
            />
            <Area
              type="monotone"
              dataKey="average"
              stackId="1"
              stroke="#eab308"
              fillOpacity={1}
              fill="url(#colorAverage)"
              isAnimationActive={true}
              animationDuration={1000}
              name="Average"
            />
            <Area
              type="monotone"
              dataKey="worst"
              stackId="1"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorWorst)"
              isAnimationActive={true}
              animationDuration={1000}
              name="Worst"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
};

export default QuickSortComplexity;
