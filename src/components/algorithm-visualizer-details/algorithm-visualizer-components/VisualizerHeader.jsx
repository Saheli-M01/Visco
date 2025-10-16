import React from "react";
import { X, RefreshCw, Eye, Info } from "lucide-react";
import Select from "../../ui/select";

const VisualizerHeader = ({
  sortingAlgorithms,
  selectedAlgorithm,
  handleAlgorithmChange,
  activeTab,
  handleTabChange,
  handleRefresh,
  onClose,
}) => {
  return (
    <div className="visualizer-header flex items-center justify-between px-4 py-1 border-b border-white/20 backdrop-blur-md bg-white shadow-lg h-12">
      <div className="flex items-center gap-6">
        
        {/* Visualization / Details toggle buttons (replaces Tabs) */}
        <div className="flex bg-white/20 rounded-lg p-1 border border-gray-400/50 shadow-inner">
          <button
            onClick={(e) => handleTabChange(e, 0)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
              activeTab === 0
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-white/20"
            }`}
          >
            <Eye className="h-4 w-4" />
            <span>Visualization</span>
          </button>

          <button
            onClick={(e) => handleTabChange(e, 1)}
            className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm font-medium transition-all ${
              activeTab === 1
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-white/20"
            }`}
          >
            <Info className="h-4 w-4" />
            <span>Details</span>
          </button>
        </div>

        <button
          onClick={handleRefresh}
          className="p-1 rounded-md bg-red-400/20 backdrop-blur-sm bg-white/20 border border-white/30 transition-all text-red-500 hover:text-red-600"
          title="Refresh and Reset"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      <button
        onClick={onClose}
        className="flex items-center justify-center rounded-full backdrop-blur-sm bg-red-400/20 border border-white/30  transition-all text-red-500 hover:text-red-600 h-6 w-6"
        aria-label="Close modal"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default VisualizerHeader;
