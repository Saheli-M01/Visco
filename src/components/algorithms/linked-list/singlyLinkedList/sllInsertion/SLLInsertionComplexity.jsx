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
    // Insertion at head: O(1)
    // Insertion at tail: O(n) - need to traverse to end
    // Insertion at kth position: O(k) ≈ O(n) worst case
    data.push({ 
      n, 
      best: 1,        // Insert at head
      average: n/2,   // Insert at middle position
      worst: n        // Insert at tail or end position
    });
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

export default function SLLInsertionComplexity() {
  const breakdownData = useMemo(() => generateBreakdownData(), []);

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-4">
      <motion.div
        variants={itemVariants}
        className="backdrop-blur-sm bg-gray-900 border border-gray-700 rounded-2xl px-4 py-3 shadow-xl"
      >
        <h3 className="text-lg font-bold text-white mb-1">SLL Insertion - Complexity Breakdown</h3>
        <div className="text-sm text-gray-300 mb-3">
          Operations vs input size for inserting a node at different positions
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={breakdownData} margin={{ top: 10, right: 30, left: 70, bottom: 10 }}>
            <defs>
              <linearGradient id="colorBestInsertion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorAverageInsertion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#eab308" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorWorstInsertion" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="n"
              label={{ value: "List Size (n)", position: "bottom", offset: 10 }}
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
              formatter={(val, name) => [Number(val).toFixed(0), name]}
            />
            <Legend wrapperStyle={{ paddingTop: "30px" }} />
            <Area 
              type="monotone" 
              dataKey="best" 
              stackId="1" 
              stroke="#22c55e" 
              fillOpacity={1} 
              fill="url(#colorBestInsertion)" 
              isAnimationActive 
              animationDuration={900} 
              name="Best (Head)"
            />
            <Area 
              type="monotone" 
              dataKey="average" 
              stackId="1" 
              stroke="#eab308" 
              fillOpacity={1} 
              fill="url(#colorAverageInsertion)" 
              isAnimationActive 
              animationDuration={900} 
              name="Average (Middle)"
            />
            <Area 
              type="monotone" 
              dataKey="worst" 
              stackId="1" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorWorstInsertion)" 
              isAnimationActive 
              animationDuration={900} 
              name="Worst (Tail)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="backdrop-blur-sm bg-gradient-to-br from-blue-900/90 to-purple-900/90 border border-blue-400/30 rounded-2xl px-4 py-3 shadow-xl"
      >
        <h4 className="text-md font-bold text-white mb-2">Position-Based Complexity</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-200">
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-semibold text-green-400">Insert at Head: O(1)</div>
            <div className="text-xs text-gray-300 mt-1">
              Direct pointer update, no traversal needed
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-semibold text-red-400">Insert at Tail: O(n)</div>
            <div className="text-xs text-gray-300 mt-1">
              Must traverse entire list to reach end
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-semibold text-yellow-400">Insert at Middle: O(n/2)</div>
            <div className="text-xs text-gray-300 mt-1">
              Traverse to middle position, average case
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="font-semibold text-orange-400">Insert at Kth: O(k)</div>
            <div className="text-xs text-gray-300 mt-1">
              Traverse k nodes, worst case O(n)
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
