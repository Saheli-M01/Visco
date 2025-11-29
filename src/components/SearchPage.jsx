import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import categories from "@/data/categories";
import { ChevronLeft, BarChart3 } from "lucide-react";
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
        <div className="mb-4">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
          >
            <ChevronLeft className="w-5"/>
            Back to home
          </button>
          <h2 className="text-2xl font-bold text-gray-900 text-center">
            Search Results
          </h2>
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
          ) : query ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <div className="w-auto h-[50vh]">
                <DotLottieReact
                  src="https://lottie.host/ac704642-0b9c-4379-a75e-6945a81d169b/RJdqSPDoMQ.lottie"
                  loop
                  autoplay
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <p className="mt-6 text-gray-700 text-lg font-medium">
                Not available
              </p>
            </div>
          ) : null}
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
