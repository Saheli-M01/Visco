import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import categories from "@/data/categories";
import { ChevronRight, BarChart3 } from "lucide-react";
import { Navigation } from "@/components/landing";
import { useLocation } from "react-router-dom";
import AlgorithmCard from "@/components/common/AlgorithmCard";
import { FullScreenModalSorting } from "@/components/algorithm-visualizer-details";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAlgorithmClick = (algorithm) => {
    const topic = categories[algorithm.catId] || null;
    setSelectedAlgorithm({ algorithm, topic });
    setIsModalOpen(true);
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Search Results</h2>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {algorithms.length > 0 ? (
            algorithms.map((alg, idx) => (
              <AlgorithmCard
                key={`${alg.catId}-${alg.name}`}
                algorithm={alg}
                index={idx}
                isInteractive={true}
                onClick={handleAlgorithmClick}
              />
            ))
          ) : (
            query ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <div className="w-[500px] h-[500px]">
                  <DotLottieReact
                    src="https://lottie.host/ac704642-0b9c-4379-a75e-6945a81d169b/RJdqSPDoMQ.lottie"
                    loop
                    autoplay
                    style={{ width: "100%", height: "100%" }}
                  />
                </div>
                <p className="mt-6 text-gray-700 text-lg font-medium">Not available</p>
              </div>
            ) : null
          )}
        </div>
      </div>
      <FullScreenModalSorting
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedAlgorithm(null);
        }}
        algorithm={selectedAlgorithm?.algorithm}
        topic={selectedAlgorithm?.topic}
      />
    </div>
  );
};

export default SearchPage;
