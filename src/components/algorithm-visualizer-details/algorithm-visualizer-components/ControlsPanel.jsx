import React from "react";
import { Slider } from "@mui/material";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const ControlsPanel = ({
  isAutomatic,
  setIsAutomatic,
  isPlaying,
  handlePlay,
  handlePause,
  handleReset,
  speed,
  setSpeed,
  isVisualizationActive,
  currentStepIndex,
  sortingSteps,
  handleFirstStep,
  handleLastStep,
  handleStepBackward,
  handleStepForward,
  isExecuting,
}) => {
  return (
    <div className="bg-white flex flex-col justify-between rounded-xl h-full p-2 min-h-[140px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-md font-semibold text-gray-900">Controls</h3>

        {/* Mode Toggle */}
        <div className="flex bg-white/20 rounded-lg gap-2 shadow-inner">
          <button
            onClick={() => setIsAutomatic(false)}
            className={`flex-1 py-1 px-2 rounded-md text-sm font-medium transition-all ${
              !isAutomatic
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-white/20"
            }`}
          >
            Manual
          </button>
          <button
            onClick={() => setIsAutomatic(true)}
            className={`flex-1 py-1 px-2 rounded-md text-sm font-medium transition-all ${
              isAutomatic
                ? "bg-gray-800 text-white shadow-md"
                : "text-gray-700 hover:bg-white/20"
            }`}
          >
            Automatic
          </button>
        </div>
      </div>

      {/* Fixed-height content container */}
      <div className="flex-1 flex items-center justify-center">
        {isAutomatic ? (
          <div className="flex gap-6 items-center w-full p-2">
            {/* Play / Pause */}
            <button
              onClick={isPlaying ? handlePause : handlePlay}
              className="p-2 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition-all shadow-lg border border-gray-600"
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </button>

            {/* Speed Control */}
            <div className="w-full">
              <span className="text-sm font-medium text-gray-700">Speed</span>
              <Slider
                value={speed}
                onChange={(_, newValue) => setSpeed(newValue)}
                min={0}
                max={10}
                step={0.1}
                marks={[
                  { value: 0, label: "0x" },
                  { value: 2, label: "2x" },
                  { value: 4, label: "4x" },
                  { value: 6, label: "6x" },
                  { value: 8, label: "8x" },
                  { value: 10, label: "10x" },
                ]}
                size="small"
                sx={{
                  color: "#374151",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#374151",
                    width: 16,
                    height: 16,
                    "&:hover": { boxShadow: "0 0 0 8px rgba(55,65,81,0.16)" },
                  },
                  "& .MuiSlider-track": { backgroundColor: "#374151", height: 4 },
                  "& .MuiSlider-rail": {
                    backgroundColor: "rgba(156,163,175,0.5)",
                    height: 4,
                  },
                }}
              />
            </div>
          </div>
        ) : (
          // Manual Mode
          <div className="flex flex-col gap-2 w-full">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleFirstStep}
                disabled={!isVisualizationActive || currentStepIndex === 0}
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
              >
                <SkipBack className="h-3 w-3" />
                First
              </button>
              <button
                onClick={handleLastStep}
                disabled={
                  !isVisualizationActive ||
                  currentStepIndex >= sortingSteps.length - 1
                }
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
              >
                <SkipForward className="h-3 w-3" />
                Last
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleStepBackward}
                disabled={!isVisualizationActive || currentStepIndex === 0}
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
              >
                <ChevronLeft className="h-3 w-3" />
                Prev
              </button>
              <button
                onClick={handleStepForward}
                disabled={
                  !isVisualizationActive ||
                  currentStepIndex >= sortingSteps.length - 1
                }
                className="flex items-center justify-center gap-1 p-2 rounded-lg bg-white/30 border border-gray-600/40 hover:bg-white/40 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-xs font-medium"
              >
                <ChevronRight className="h-3 w-3" />
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;
