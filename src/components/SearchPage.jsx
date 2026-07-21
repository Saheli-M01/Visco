// Copyright (c) 2026 Saheli Mondal.

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import categories from "@/data/categories";
import { ChevronLeft, BarChart3 } from "lucide-react";
import { Navigation } from "@/components/landing";
import { useLocation } from "react-router-dom";
import AlgorithmCard from "@/components/algorithm-visualizer-details/AlgorithmCard";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { getAlgorithmPath } from "@/utils/algorithmRoutes";

const flattenAlgorithms = () => {
  const list = [];
  Object.entries(categories).forEach(([catId, cat]) => {
    (cat.algorithms || []).forEach((alg) => list.push({ ...alg, catId }));
  });
  return list;
};

const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const queryFromUrl = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return (params.get("q") || "").trim().toLowerCase();
  }, [location.search]);

  const [query, setQuery] = useState(queryFromUrl);
  const handleAlgorithmClick = (algorithm, view = "details") => {
    const path = getAlgorithmPath(algorithm.catId, algorithm.name);
    if (path) navigate(`${path}/${view}`);
  };
  useEffect(() => setQuery(queryFromUrl), [queryFromUrl]);

  useEffect(() => {
    const handler = (e) => setQuery((e?.detail?.query || "").toLowerCase());
    window.addEventListener("algorithmSearch", handler);
    return () => window.removeEventListener("algorithmSearch", handler);
  }, []);

  const algorithms = useMemo(() => {
    const all = flattenAlgorithms();
    // if query is empty, show no results (user expectation)
    if (!query) return [];
    return all.filter((a) => a.name.toLowerCase().includes(query));
  }, [query]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-sky-50 to-indigo-50 text-slate-900">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <motion.div
          aria-hidden
          className="absolute -left-16 top-6 h-72 w-72 rounded-full bg-gradient-to-br from-sky-300 via-indigo-200 to-rose-200 blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          aria-hidden
          className="absolute right-0 bottom-10 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-200 via-cyan-200 to-blue-200 blur-3xl"
          animate={{ y: [0, -25, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <Navigation />

      <div className="relative max-w-6xl mx-auto px-4 py-10">
        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200/60 bg-white/70 p-6 shadow-xl backdrop-blur">
        
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/")}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:-translate-x-0.5 hover:border-slate-300 hover:bg-slate-50"
              >
                <ChevronLeft className="w-5" />
                Back to home
              </button>
              <div className="h-10 w-px bg-slate-200/80" />
              <h2 className="text-2xl font-semibold text-slate-900">
                Search Results
              </h2>
            </div>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.length > 0 ? (
            algorithms.map((alg, idx) => (
              <AlgorithmCard
                key={`${alg.catId}-${alg.name}`}
                algorithm={alg}
                index={idx}
                onDetails={(item) => handleAlgorithmClick(item)}
                onVisualize={(item) => handleAlgorithmClick(item, "visualize")}
              />
            ))
          ) : query ? (
            <div className="col-span-full flex flex-col items-center justify-center gap-3 py-12 min-h-[60vh]">
              <div className="w-auto h-[40vh] max-h-[320px] drop-shadow-2xl flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/ac704642-0b9c-4379-a75e-6945a81d169b/RJdqSPDoMQ.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className="mt-2 text-slate-800 text-lg font-semibold text-center">
                No algorithms found for “{query}”
              </p>
              <p className="text-slate-600 text-sm text-center">
                Try a different keyword or explore popular topics.
              </p>
            </div>
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-10 text-center shadow-xl backdrop-blur min-h-[60vh]">
              <p className="text-lg font-semibold text-slate-900">Start typing to uncover algorithms</p>
              <p className="text-slate-600 text-sm">
                Live results will appear here. Tip: search by topic like “sort” or “graph”.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
