import React from "react";
import { motion } from "framer-motion";
import { GraduationCap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Courses = () => {
  const navigate = useNavigate();

  const handleOpenCourse = () => navigate("/dsa");

  return (
    <section className="relative px-4 py-6 md:py-16 md:px-6 bg-white overflow-hidden">
      {/* Subtle background grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.10) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(0,0,0,0.10) 1px, transparent 1px)`,
            backgroundSize: "3vw 3vw",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="border border-white/20 rounded-3xl mb-4 md:mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
              Level Up With <span className="text-gray-700">Courses</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto font-medium leading-relaxed">
              Start with our guided DSA course — concepts, patterns, and practice.
            </p>
          </div>
        </motion.div>

        {/* Single course card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1"
        >
          <button
            onClick={handleOpenCourse}
            className="group text-left"
            aria-label="Open DSA Course"
          >
            <div className="relative rounded-3xl p-[2px] bg-gradient-to-br from-emerald-200 via-teal-200 to-white">
              <div className="relative rounded-3xl p-8 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-xl overflow-hidden">
                {/* light glow */}
                <div className="absolute -top-14 -right-14 w-52 h-52 rounded-full pointer-events-none">
                  <div
                    className="w-full h-full blur-lg"
                    style={{
                      background: "radial-gradient(circle at top right, rgba(16,185,129,0.25), rgba(13,148,136,0.15), transparent)",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-2 rounded-md shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600">
                      <GraduationCap className="w-7 h-7 text-white" />
                    </div>
                    <span className="px-3 py-1.5 text-xs font-bold rounded-full bg-gray-900 text-white shadow-md">
                      New
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Data Structures & Algorithms</h3>
                  </div>

                  <p className="text-sm mb-6 leading-relaxed text-gray-700 max-w-3xl">
                    A practical, beginner‑friendly path to mastering core DSA topics.
                    Learn the big ideas, common patterns, and how to reason about
                    time & space complexity — with visuals and hands‑on exercises.
                  </p>

                  <div className="pt-5 border-t border-gray-900/10 flex items-center gap-2">
                    <span className="text-sm font-semibold text-emerald-700 group-hover:underline">
                      Start the course
                    </span>
                    <ChevronRight className="w-4 h-4 text-emerald-700 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>

                {/* shine */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
                </div>
              </div>
            </div>
          </button>
        </motion.div>
      </div>
    </section>
  );
};
