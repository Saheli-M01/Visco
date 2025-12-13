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

const generateBreakdownData = () => {
  const data = [];
  for (let n = 2; n <= 128; n *= 2) {
    data.push({ n, best: n, average: n, worst: n });
  }
  return data;
};

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

export default function NextPermutationComplexity() {
  const breakdownData = useMemo(() => generateBreakdownData(), []);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      

      <motion.div
        variants={itemVariants}
        className="backdrop-blur-sm bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3 shadow-xl"
      >
        <h3 className="text-lg font-bold text-white mb-1">
          Next Permutation - Complexity Breakdown
        </h3>
        <div className="text-sm text-gray-300 mb-3">
          Best, Average, and Worst case comparisons across input sizes
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={breakdownData}
            margin={{ top: 10, right: 30, left: 70, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorBestNP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAverageNP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWorstNP" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="n"
              label={{ value: "Input Size (n)", position: "bottom", offset: 10 }}
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
            />
            <YAxis
              label={{
                value: "Operations",
                angle: -90,
                position: "left",
                offset: 10,
                fill: "rgba(255,255,255,0.7)",
              }}
              stroke="rgba(255,255,255,0.5)"
              tick={{ fill: "rgba(255,255,255,0.7)" }}
              domain={[0, "dataMax + 1"]}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41,55,0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "rgba(255,255,255,0.9)",
              }}
              formatter={(val, name) => [val.toFixed(0), name]}
            />
            <Legend wrapperStyle={{ paddingTop: "30px" }} />
            <Area
              type="monotone"
              dataKey="best"
              stackId="1"
              stroke="#22c55e"
              fillOpacity={1}
              fill="url(#colorBestNP)"
              isAnimationActive
              animationDuration={900}
              name="Best"
            />
            <Area
              type="monotone"
              dataKey="average"
              stackId="1"
              stroke="#eab308"
              fillOpacity={1}
              fill="url(#colorAverageNP)"
              isAnimationActive
              animationDuration={900}
              name="Average"
            />
            <Area
              type="monotone"
              dataKey="worst"
              stackId="1"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#colorWorstNP)"
              isAnimationActive
              animationDuration={900}
              name="Worst"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </motion.div>
  );
}
